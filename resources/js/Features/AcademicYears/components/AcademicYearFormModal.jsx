import React from 'react';
import { Modal, InputLabel, TextInput, InputError, SecondaryButton, PrimaryButton } from '@/Components';

export default function AcademicYearFormModal({ show, onClose, onSubmit, data, setData, errors, processing, editData }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <form onSubmit={onSubmit} className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">
                        {editData ? 'Edit Tahun Ajaran' : 'Tambah Tahun Ajaran'}
                    </h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Tahun Ajaran" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Contoh: 2023/2024 Ganjil"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center">
                        <input
                            id="is_active"
                            type="checkbox"
                            name="is_active"
                            checked={data.is_active}
                            className="w-5 h-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 transition-colors"
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        <label htmlFor="is_active" className="ml-3 text-sm font-bold text-indigo-700 cursor-pointer select-none">
                            Set sebagai Tahun Ajaran Aktif
                        </label>
                        <InputError message={errors.is_active} className="mt-2" />
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
