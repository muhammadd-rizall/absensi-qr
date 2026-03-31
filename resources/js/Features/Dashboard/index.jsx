import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    const attendanceStatuses = [
        { label: 'Hadir', key: 'hadir', color: 'bg-green-500', text: 'text-green-600' },
        { label: 'Izin', key: 'izin', color: 'bg-blue-500', text: 'text-blue-600' },
        { label: 'Sakit', key: 'sakit', color: 'bg-yellow-500', text: 'text-yellow-600' },
        { label: 'Telat', key: 'telat', color: 'bg-orange-500', text: 'text-orange-600' },
        { label: 'Alfa', key: 'alfa', color: 'bg-red-500', text: 'text-red-600' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="font-bold text-2xl text-gray-800 leading-tight">Dashboard Overview</h2>
                    <div className="mt-2 md:mt-0 flex items-center bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mr-2">Tahun Ajaran:</span>
                        <span className="text-sm font-black text-indigo-800">{stats.active_academic_year}</span>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Students Stat */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Siswa</p>
                            <h3 className="text-3xl font-black text-gray-900">{stats.students}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex gap-4 text-[10px] font-bold uppercase tracking-tighter">
                        <span className="flex items-center text-blue-500">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                            {stats.students_male} Laki-laki
                        </span>
                        <span className="flex items-center text-pink-500">
                            <span className="w-2 h-2 rounded-full bg-pink-500 mr-1.5"></span>
                            {stats.students_female} Perempuan
                        </span>
                    </div>
                </div>

                {/* Teachers Stat */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Guru</p>
                            <h3 className="text-3xl font-black text-gray-900">{stats.teachers}</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 text-[10px] font-bold text-green-500 uppercase tracking-tighter">
                        Tenaga Pendidik Aktif
                    </div>
                </div>

                {/* Classes Stat */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Kelas</p>
                            <h3 className="text-3xl font-black text-gray-900">{stats.classes}</h3>
                        </div>
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 text-[10px] font-bold text-yellow-500 uppercase tracking-tighter">
                        Ruang Belajar Tersedia
                    </div>
                </div>

                {/* Subjects Stat */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Mata Pelajaran</p>
                            <h3 className="text-3xl font-black text-gray-900">{stats.subjects}</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">
                        Kurikulum Aktif
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Attendance Summary */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-gray-900 tracking-tight">Presensi Hari Ini</h4>
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase tracking-widest border border-indigo-100">Live</span>
                    </div>

                    <div className="space-y-4">
                        {attendanceStatuses.map((status) => {
                            const count = stats.attendance_today[status.key] || 0;
                            const total = Object.values(stats.attendance_today).reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? (count / total) * 100 : 0;

                            return (
                                <div key={status.key} className="relative">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${status.text}`}>{status.label}</span>
                                        <span className="text-sm font-black text-gray-900">{count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                        <div 
                                            className={`h-full ${status.color} transition-all duration-1000`} 
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                        {Object.values(stats.attendance_today).reduce((a, b) => a + b, 0) === 0 && (
                            <div className="py-10 text-center">
                                <svg className="w-12 h-12 text-gray-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Belum ada data presensi</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-gray-900 tracking-tight">Aktivitas Presensi Terakhir</h4>
                        <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800">Lihat Semua</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Siswa</th>
                                    <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Waktu</th>
                                    <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kelas</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats.recent_attendances.length > 0 ? (
                                    stats.recent_attendances.map((item) => (
                                        <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs ring-2 ring-white">
                                                        {item.student.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-bold text-gray-900 truncate max-w-[120px]">{item.student.name}</p>
                                                        <p className="text-[10px] font-medium text-gray-400 tracking-tighter">NIS: {item.student.nis}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-center">
                                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                                                    item.status === 'hadir' ? 'bg-green-100 text-green-700' : 
                                                    item.status === 'telat' ? 'bg-orange-100 text-orange-700' :
                                                    item.status === 'izin' ? 'bg-blue-100 text-blue-700' :
                                                    item.status === 'sakit' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <p className="text-xs font-bold text-gray-700">{new Date(item.check_in || item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                <p className="text-[10px] font-medium text-gray-400">{new Date(item.attendance_date).toLocaleDateString()}</p>
                                            </td>
                                            <td className="py-4">
                                                <p className="text-xs font-black text-indigo-600">{item.teaching.class.name}</p>
                                                <p className="text-[10px] font-medium text-gray-400 truncate max-w-[100px]">{item.teaching.subject.name}</p>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="p-3 bg-gray-50 rounded-full mb-3">
                                                    <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Belum ada aktivitas hari ini</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
