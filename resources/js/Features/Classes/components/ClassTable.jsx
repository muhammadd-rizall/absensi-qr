import React from 'react';
import { Link } from '@inertiajs/react';

export default function ClassTable({ dataList, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto -mx-8">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50">
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Kelas</th>
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-center">Tingkat</th>
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Wali Kelas</th>
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-center">Siswa</th>
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Ruang</th>
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {dataList.length > 0 ? (
                        dataList.map((item) => (
                            <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                                <td className="px-8 py-5">
                                    <span className="text-sm font-black text-gray-900">{item.name}</span>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        item.level === 'X' ? 'bg-blue-100 text-blue-700' :
                                        item.level === 'XI' ? 'bg-purple-100 text-purple-700' :
                                        'bg-pink-100 text-pink-700'
                                    }`}>
                                        {item.level}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black mr-3 ring-2 ring-white">
                                            {item.homeroom_teacher?.name?.charAt(0) || '?'}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{item.homeroom_teacher?.name || 'Belum diatur'}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <span className="text-sm font-black text-indigo-600">{item.students_count}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-sm font-bold text-gray-500">{item.room || '-'}</span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link 
                                            href={route('classes.show', item.id)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Manajemen Siswa"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </Link>
                                        <button 
                                            onClick={() => onEdit(item)}
                                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                            title="Edit Kelas"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => onDelete(item.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-8 py-20 text-center">
                                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Belum ada data kelas</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
