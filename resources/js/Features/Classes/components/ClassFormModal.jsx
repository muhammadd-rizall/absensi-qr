import React from 'react';
import { Modal, InputLabel, TextInput, InputError, SecondaryButton, PrimaryButton } from '@/Components';

export default function ClassFormModal({ 
    show, 
    onClose, 
    onSubmit, 
    data, 
    setData, 
    errors, 
    processing, 
    editData,
    academicYears,
    teachers
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <form onSubmit={onSubmit} className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">
                        {editData ? 'Edit Data Kelas' : 'Tambah Data Kelas'}
                    </h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nama Kelas" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                        <TextInput
                            id="name"
                            value={data.name}
                            className="mt-1 block w-full !rounded-xl"
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Contoh: XII RPL 1"
                            isFocused={true}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="level" value="Tingkat" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                        <select
                            id="level"
                            value={data.level}
                            className="mt-1 block w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm font-bold text-gray-700"
                            onChange={(e) => setData('level', e.target.value)}
                        >
                            <option value="">Pilih Tingkat</option>
                            <option value="X">Kelas X</option>
                            <option value="XI">Kelas XI</option>
                            <option value="XII">Kelas XII</option>
                        </select>
                        <InputError message={errors.level} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="room" value="Ruang Kelas" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                        <TextInput
                            id="room"
                            value={data.room}
                            className="mt-1 block w-full !rounded-xl"
                            onChange={(e) => setData('room', e.target.value)}
                            placeholder="Contoh: Lab 1 atau R.01"
                        />
                        <InputError message={errors.room} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="homeroom_teacher_id" value="Wali Kelas" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                        <select
                            id="homeroom_teacher_id"
                            value={data.homeroom_teacher_id}
                            className="mt-1 block w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm font-bold text-gray-700"
                            onChange={(e) => setData('homeroom_teacher_id', e.target.value)}
                        >
                            <option value="">Pilih Wali Kelas (Opsional)</option>
                            {teachers.data?.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.homeroom_teacher_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="academic_year_id" value="Tahun Ajaran" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                        <select
                            id="academic_year_id"
                            value={data.academic_year_id}
                            className="mt-1 block w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm font-bold text-gray-700"
                            onChange={(e) => setData('academic_year_id', e.target.value)}
                        >
                            <option value="">Pilih Tahun Ajaran</option>
                            {academicYears.map((ay) => (
                                <option key={ay.id} value={ay.id}>{ay.name} {ay.is_active ? '(Aktif)' : ''}</option>
                            ))}
                        </select>
                        <InputError message={errors.academic_year_id} className="mt-2" />
                    </div>
                </div>

                <div className="mt-10 flex gap-3">
                    <SecondaryButton onClick={onClose} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                    <PrimaryButton disabled={processing} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-indigo-100">
                        {editData ? 'Simpan' : 'Tambah'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
