import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TeachingDetail({ auth, teaching, students }) {
    const { post, processing } = useForm();
    const [updatingId, setUpdatingId] = useState(null);

    const updateStatus = (studentId, status) => {
        setUpdatingId(studentId);
        post(route('teacher.quick-update', {
            student_id: studentId,
            teaching_id: teaching.id,
            status: status
        }), {
            preserveScroll: true,
            onFinish: () => setUpdatingId(null)
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'hadir':
                return <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm shadow-green-50">Hadir</span>;
            case 'telat':
                return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm shadow-yellow-50">Telat</span>;
            case 'izin':
                return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm shadow-blue-50">Izin</span>;
            case 'sakit':
                return <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm shadow-orange-50">Sakit</span>;
            case 'alfa':
                return <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm shadow-red-50">Alfa</span>;
            default:
                return <span className="px-3 py-1 bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-200/50">Belum Absen</span>;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('teacher.dashboard')} className="p-2 bg-white rounded-xl shadow-sm text-gray-400 hover:text-indigo-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h2 className="font-bold text-2xl text-gray-800 leading-tight">Presensi: {teaching.subject?.name}</h2>
                        <p className="text-sm text-gray-500 font-medium">{teaching.class?.name} | {teaching.day_of_week}, {teaching.start_time} - {teaching.end_time}</p>
                    </div>
                </div>
            }
        >
            <Head title={`Presensi ${teaching.subject?.name}`} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-black text-gray-900">Rekap Presensi Hari Ini</h3>
                        <p className="text-sm text-gray-500 font-medium">Tanggal: {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link 
                            href={route('teacher.scan', { teaching_id: teaching.id })}
                            className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                        >
                            Buka Scanner
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Siswa</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Waktu Scan</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ubah Status Manual</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 shadow-sm border border-white ${student.gender === 'Laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                                {student.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                <p className="text-[10px] font-mono font-black text-gray-400">{student.nis}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-xs font-mono font-bold text-gray-600">
                                            {student.attendance?.check_in ? new Date(student.attendance.check_in).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </span>
                                        {student.attendance?.late_minutes > 0 && (
                                            <p className="text-[9px] text-red-500 font-black mt-1 uppercase tracking-tighter">Telat {student.attendance.late_minutes}m</p>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        {getStatusBadge(student.attendance?.status)}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-1">
                                            {['hadir', 'izin', 'sakit', 'alfa'].map((status) => (
                                                <button
                                                    key={status}
                                                    disabled={processing || updatingId === student.id}
                                                    onClick={() => updateStatus(student.id, status)}
                                                    className={`px-2 py-1 text-[9px] font-black uppercase rounded-lg border transition-all ${
                                                        student.attendance?.status === status
                                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                                        : 'bg-white text-gray-400 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                                                    } disabled:opacity-50`}
                                                >
                                                    {status === 'hadir' ? 'H' : status.charAt(0).toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
