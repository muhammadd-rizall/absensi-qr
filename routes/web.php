<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->roles()->where('slug', 'guru')->exists()) {
            return redirect()->route('teacher.dashboard');
        }
        
        $activeAcademicYear = \App\Models\AcademicYears::where('is_active', true)->first();
        
        return Inertia::render('Dashboard', [
            'stats' => [
                'students' => \App\Models\Students::count(),
                'students_male' => \App\Models\Students::where('gender', 'Laki-laki')->count(),
                'students_female' => \App\Models\Students::where('gender', 'Perempuan')->count(),
                'teachers' => \App\Models\Teachers::count(),
                'classes' => \App\Models\Classes::count(),
                'subjects' => \App\Models\Subjects::count(),
                'active_academic_year' => $activeAcademicYear ? $activeAcademicYear->name : 'Tidak Ada',
                'attendance_today' => [
                    'hadir' => \App\Models\Attendance::whereDate('attendance_date', now())->where('status', 'hadir')->count(),
                    'izin' => \App\Models\Attendance::whereDate('attendance_date', now())->where('status', 'izin')->count(),
                    'sakit' => \App\Models\Attendance::whereDate('attendance_date', now())->where('status', 'sakit')->count(),
                    'alfa' => \App\Models\Attendance::whereDate('attendance_date', now())->where('status', 'alfa')->count(),
                    'telat' => \App\Models\Attendance::whereDate('attendance_date', now())->where('status', 'telat')->count(),
                ],
                'recent_attendances' => \App\Models\Attendance::with(['student', 'teaching.subject', 'teaching.class'])
                    ->latest()
                    ->take(5)
                    ->get()
            ]
        ]);
    })->name('dashboard');

    // Teacher Routes
    Route::prefix('teacher')->name('teacher.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\TeacherDashboardController::class, 'index'])->name('dashboard');
        Route::get('/class/{classId}', [\App\Http\Controllers\TeacherDashboardController::class, 'showClass'])->name('class.detail');
        Route::get('/teaching/{teachingId}', [\App\Http\Controllers\TeacherDashboardController::class, 'teachingDetail'])->name('teaching.detail');
        Route::post('/quick-update', [\App\Http\Controllers\TeacherDashboardController::class, 'quickUpdate'])->name('quick-update');
        Route::get('/scan', [\App\Http\Controllers\TeacherDashboardController::class, 'scan'])->name('scan');
        Route::post('/process-scan', [\App\Http\Controllers\TeacherDashboardController::class, 'processScan'])->name('process-scan');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', \App\Http\Controllers\UserController::class)->middleware('permission:manage-users');
    Route::resource('roles', \App\Http\Controllers\RoleController::class)->middleware('permission:manage-roles');
    Route::resource('permissions', \App\Http\Controllers\PermissionController::class)->middleware('permission:manage-roles');
    Route::resource('academic-years', \App\Http\Controllers\AcademicYearController::class)->middleware('permission:manage-academic-years');
    Route::resource('classes', \App\Http\Controllers\ClassController::class)->middleware('permission:manage-classes');
    Route::resource('subjects', \App\Http\Controllers\SubjectController::class)->middleware('permission:manage-subjects');
    Route::resource('teachers', \App\Http\Controllers\TeacherController::class)->middleware('permission:manage-teachers');
    Route::resource('students', \App\Http\Controllers\StudentController::class)->middleware('permission:manage-students');
    Route::resource('teachings', \App\Http\Controllers\TeachingController::class)->middleware('permission:manage-classes');
    Route::resource('attendance', \App\Http\Controllers\AttendanceController::class)->middleware('permission:view-attendance-reports');
});

require __DIR__.'/auth.php';
