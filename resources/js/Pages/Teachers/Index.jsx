import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Index({ auth, teachers }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const dataList = teachers.data || [];

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nip: '',
        name: '',
        phone: '',
        address: '',
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setEditData(item);
            setData({
                nip: item.nip || '',
                name: item.name || '',
                phone: item.phone || '',
                address: item.address || '',
            });
        } else {
            setEditData(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editData) {
            put(route('teachers.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('teachers.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteItem = () => {
        destroy(route('teachers.destroy', deleteId), {
            onSuccess: () => setIsDeleting(false),
            onFinish: () => setDeleteId(null),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Data Guru</h2>}
        >
            <Head title="Guru" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Daftar Guru</h3>
                            <p className="text-sm text-gray-500 font-medium">Kelola tenaga pendidik dan informasi kontak</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Guru
                        </PrimaryButton>
                    </div>

                    <div className="overflow-x-auto -mx-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Informasi Guru</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">NIP</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">No. HP</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dataList.length > 0 ? (
                                    dataList.map((item) => (
                                        <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mr-4 shadow-sm border border-white ring-4 ring-indigo-50/50">
                                                        {item.name?.charAt(0) ?? "-".toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{item.name} </p>
                                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Tenaga Pendidik</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                                                    {item.nip}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-sm font-medium text-gray-600">{item.phone || '-'}</span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openModal(item)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDelete(item.id)}
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
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="p-4 bg-gray-50 rounded-full mb-4">
                                                    <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Belum ada data guru</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={submit} className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">
                            {editData ? 'Edit Data Guru' : 'Tambah Data Guru'}
                        </h2>
                        <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="nip" value="NIP" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="nip"
                                type="text"
                                name="nip"
                                value={data.nip}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="off"
                                isFocused={true}
                                onChange={(e) => setData('nip', e.target.value)}
                                placeholder="Masukkan NIP"
                            />
                            <InputError message={errors.nip} className="mt-2" />
                        </div>

                        <div className="md:col-span-1">
                            <InputLabel htmlFor="name" value="Nama Lengkap" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="off"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan Nama Lengkap"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="md:col-span-1">
                            <InputLabel htmlFor="phone" value="No. HP" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="off"
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Masukkan No. HP"
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel htmlFor="address" value="Alamat" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <textarea
                                id="address"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                rows="3"
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Masukkan Alamat Lengkap"
                            ></textarea>
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3">
                        <SecondaryButton onClick={closeModal} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-indigo-100">
                            {editData ? 'Simpan' : 'Tambah'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleting} onClose={() => setIsDeleting(false)} maxWidth="sm">
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50/50">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Konfirmasi Hapus</h2>
                    <p className="text-sm font-medium text-gray-500 mb-8">
                        Apakah Anda yakin ingin menghapus data guru ini?
                    </p>
                    <div className="flex gap-3">
                        <SecondaryButton onClick={() => setIsDeleting(false)} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                        <DangerButton onClick={deleteItem} disabled={processing} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-red-100">
                            Hapus
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
