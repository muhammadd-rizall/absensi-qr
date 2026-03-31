import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ClassDetail({ auth, class: schoolClass, students }) {
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
                    <h2 className="font-bold text-2xl text-gray-800 leading-tight">Detail Kelas {schoolClass.name}</h2>
                </div>
            }
        >
            <Head title={`Kelas ${schoolClass.name}`} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-black text-gray-900">Daftar Siswa</h3>
                        <p className="text-sm text-gray-500 font-medium">Tahun Ajaran: {schoolClass.academic_year?.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100">
                            Total: {students.length} Siswa
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Siswa</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">NIS</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">JK</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 shadow-sm border border-white ${student.gender === 'Laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                                    {student.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-mono font-bold text-gray-500">{student.nis}</span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="text-xs font-bold text-gray-600">{student.gender === 'Laki-laki' ? 'L' : 'P'}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                {student.status || 'Aktif'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Tidak ada siswa di kelas ini</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
