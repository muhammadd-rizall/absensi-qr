import React from 'react';

export default function AcademicYearTable({ dataList, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto -mx-8">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50">
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Tahun Ajaran</th>
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-center">Status</th>
                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {dataList.length > 0 ? (
                        dataList.map((ay) => (
                            <tr key={ay.id} className="group hover:bg-indigo-50/30 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">{ay.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    {ay.is_active ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700 ring-4 ring-green-50">
                                            Aktif
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500">
                                            Tidak Aktif
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => onEdit(ay)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => onDelete(ay.id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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
                            <td colSpan="3" className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                                        <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Belum ada data tersedia</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
