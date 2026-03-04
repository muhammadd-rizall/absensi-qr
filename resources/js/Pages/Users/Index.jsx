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

export default function Index({ auth, users, roles }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const dataList = users.data || [];

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setEditData(item);
            setData({
                name: item.name || '',
                email: item.email || '',
                password: '',
                password_confirmation: '',
                roles: item.roles?.map(r => r.id) || [],
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
            put(route('users.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteItem = () => {
        destroy(route('users.destroy', deleteId), {
            onSuccess: () => setIsDeleting(false),
            onFinish: () => setDeleteId(null),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Manajemen Pengguna</h2>}
        >
            <Head title="Pengguna" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Daftar Pengguna</h3>
                            <p className="text-sm text-gray-500 font-medium">Kelola hak akses dan akun sistem</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Tambah Pengguna
                        </PrimaryButton>
                    </div>

                    <div className="overflow-x-auto -mx-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">User</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Email</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Peran</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dataList.length > 0 ? (
                                    dataList.map((item) => (
                                        <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mr-4 shadow-md">
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-900">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-sm font-medium text-gray-600">{item.email}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.roles?.map(role => (
                                                        <span key={role.id} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase border border-indigo-100">
                                                            {role.name}
                                                        </span>
                                                    )) || <span className="text-gray-400 text-xs italic">No Role</span>}
                                                </div>
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
                                                    {auth.user.id !== item.id && (
                                                        <button 
                                                            onClick={() => confirmDelete(item.id)}
                                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    )}
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
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Belum ada data pengguna</p>
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
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <form onSubmit={submit} className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">
                            {editData ? 'Edit Data Pengguna' : 'Tambah Data Pengguna'}
                        </h2>
                        <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan Nama"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Alamat Email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Masukkan Email"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value={editData ? "Password Baru (Opsional)" : "Password"} className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder={editData ? "Kosongkan jika tidak ingin mengubah" : "Masukkan Password"}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {!editData && (
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Konfirmasi Password"
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        )}

                        <div>
                            <InputLabel value="Pilih Peran (Role)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                {roles.data?.map(role => (
                                    <label key={role.id} className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-indigo-50 hover:border-indigo-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            value={role.id}
                                            checked={data.roles.includes(role.id)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setData('roles', checked ? [...data.roles, role.id] : data.roles.filter(id => id !== role.id));
                                            }}
                                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-3 text-xs font-bold text-gray-700">{role.name}</span>
                                    </label>
                                ))}
                            </div>
                            <InputError message={errors.roles} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3">
                        <SecondaryButton onClick={closeModal} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-indigo-100">
                            {editData ? 'Simpan Perubahan' : 'Tambah User'}
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
                        Apakah Anda yakin ingin menghapus pengguna ini?
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
