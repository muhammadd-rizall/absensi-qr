import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, teachings }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Dashboard Guru</h2>}
        >
            <Head title="Teacher Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachings.length > 0 ? (
                    teachings.map((teaching) => (
                        <div key={teaching.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded">
                                        {teaching.class?.name}
                                    </span>
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-1">{teaching.subject?.name}</h3>
                                <p className="text-sm text-gray-500 font-medium mb-6">Jadwal: {teaching.day}, {teaching.start_time} - {teaching.end_time}</p>
                                
                                <div className="flex gap-2">
                                    <Link 
                                        href={route('teacher.class.detail', teaching.class_id)}
                                        className="flex-1 text-center py-2.5 bg-gray-50 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        Daftar Siswa
                                    </Link>
                                    <Link 
                                        href={route('teacher.scan', { teaching_id: teaching.id })}
                                        className="flex-1 text-center py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors"
                                    >
                                        Mulai Scan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Belum Ada Jadwal</h3>
                        <p className="text-sm text-gray-500">Anda belum memiliki jadwal mengajar yang terdaftar di sistem.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
