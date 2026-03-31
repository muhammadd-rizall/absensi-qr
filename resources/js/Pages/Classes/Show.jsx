import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PrimaryButton, SecondaryButton, Modal, InputLabel, TextInput } from '@/Components';

export default function Show({ auth, class: classData, studentsInClass, availableStudents }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const { data, setData, post, processing, reset } = useForm({
        student_ids: [],
    });

    const toggleStudentSelection = (studentId) => {
        const currentIds = [...data.student_ids];
        if (currentIds.includes(studentId)) {
            setData('student_ids', currentIds.filter(id => id !== studentId));
        } else {
            setData('student_ids', [...currentIds, studentId]);
        }
    };

    const submitAddStudents = (e) => {
        e.preventDefault();
        post(route('classes.students.add', classData.data.id), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
            },
        });
    };

    const filteredAvailableStudents = availableStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('classes.index')} className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h2 className="font-bold text-2xl text-gray-800 leading-tight">Detail Kelas: {classData.data.name}</h2>
                </div>
            }
        >
            <Head title={`Kelas ${classData.data.name}`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Class Info Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                        <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest">Informasi Kelas</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Kelas</p>
                                <p className="text-sm font-bold text-gray-900">{classData.data.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tahun Ajaran</p>
                                <p className="text-sm font-bold text-gray-900">{classData.data.academic_year?.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Wali Kelas</p>
                                <p className="text-sm font-bold text-gray-900">{classData.data.homeroom_teacher?.name || 'Belum Ditentukan'}</p>
                            </div>
                            <div className="pt-4 border-t border-gray-50">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Siswa</p>
                                <p className="text-2xl font-black text-indigo-600">{studentsInClass.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Daftar Siswa</h3>
                                <p className="text-sm text-gray-500 font-medium">Siswa yang terdaftar di kelas ini</p>
                            </div>
                            <PrimaryButton onClick={() => setIsAddModalOpen(true)} className="!rounded-xl px-6">
                                Tambah Siswa
                            </PrimaryButton>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">NIS</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Nama Siswa</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {studentsInClass.length > 0 ? (
                                        studentsInClass.map((item) => (
                                            <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                                                <td className="px-8 py-5 text-sm font-mono text-gray-500">{item.student?.nis}</td>
                                                <td className="px-8 py-5">
                                                    <span className="text-sm font-bold text-gray-900">{item.student?.name}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <Link
                                                        href={route('classes.students.remove', { class: classData.data.id, student: item.student_id })}
                                                        method="delete"
                                                        as="button"
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus dari Kelas"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-20 text-center">
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Belum ada siswa di kelas ini</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Students Modal */}
            <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} maxWidth="2xl">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Tambah Siswa ke Kelas</h2>
                        <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-6">
                        <TextInput
                            type="text"
                            placeholder="Cari Nama atau NIS Siswa..."
                            className="w-full !rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <form onSubmit={submitAddStudents}>
                        <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                            {filteredAvailableStudents.length > 0 ? (
                                filteredAvailableStudents.map((student) => (
                                    <label 
                                        key={student.id} 
                                        className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer ${
                                            data.student_ids.includes(student.id)
                                            ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200'
                                            : 'bg-gray-50 border-gray-100 hover:border-indigo-100'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            checked={data.student_ids.includes(student.id)}
                                            onChange={() => toggleStudentSelection(student.id)}
                                        />
                                        <div className="ml-4">
                                            <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                            <p className="text-xs font-medium text-gray-500">NIS: {student.nis}</p>
                                        </div>
                                    </label>
                                ))
                            ) : (
                                <p className="text-center py-8 text-gray-400 font-bold uppercase tracking-widest text-xs">
                                    {searchTerm ? 'Siswa tidak ditemukan' : 'Semua siswa sudah masuk kelas'}
                                </p>
                            )}
                        </div>

                        <div className="mt-8 flex gap-3">
                            <SecondaryButton onClick={() => setIsAddModalOpen(false)} className="flex-1 !rounded-xl justify-center py-3">Batal</SecondaryButton>
                            <PrimaryButton 
                                disabled={processing || data.student_ids.length === 0} 
                                className="flex-1 !rounded-xl justify-center py-3"
                            >
                                Tambahkan {data.student_ids.length > 0 && `(${data.student_ids.length})`} Siswa
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
