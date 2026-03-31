import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { DangerButton, InputError, InputLabel, Modal, PrimaryButton, SecondaryButton, TextInput } from '@/Components';
import { useState } from 'react';

export default function Index({ auth, roles, permissions }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const dataList = roles.data || [];

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        slug: '',
        permissions: [],
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setEditData(item);
            setData({
                name: item.name || '',
                slug: item.slug || '',
                permissions: item.permissions?.map(p => p.id) || [],
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
            put(route('roles.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('roles.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteItem = () => {
        destroy(route('roles.destroy', deleteId), {
            onSuccess: () => setIsDeleting(false),
            onFinish: () => setDeleteId(null),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Peran & Hak Akses</h2>}
        >
            <Head title="Roles" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Daftar Peran</h3>
                            <p className="text-sm text-gray-500 font-medium">Atur tingkat akses pengguna sistem</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Peran
                        </PrimaryButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dataList.map((role) => (
                            <div key={role.id} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">{role.name}</h4>
                                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{role.slug}</p>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openModal(role)} className="p-1.5 text-indigo-600 hover:bg-white rounded-lg shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        {role.slug !== 'super-admin' && (
                                            <button onClick={() => confirmDelete(role.id)} className="p-1.5 text-red-600 hover:bg-white rounded-lg shadow-sm">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                                        <span>Izin Akses</span>
                                        <span>{role.permissions?.length || 0} Aktif</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions?.slice(0, 3).map(p => (
                                            <span key={p.id} className="px-2 py-0.5 bg-white text-[10px] font-bold text-gray-600 rounded border border-gray-100">
                                                {p.name}
                                            </span>
                                        ))}
                                        {(role.permissions?.length || 0) > 3 && (
                                            <span className="px-2 py-0.5 bg-indigo-50 text-[10px] font-bold text-indigo-600 rounded border border-indigo-100">
                                                +{(role.permissions?.length || 0) - 3} Lainnya
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={submit} className="p-8">
                    <h2 className="text-xl font-black text-gray-900 mb-8">{editData ? 'Edit Peran' : 'Tambah Peran'}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <InputLabel value="Nama Peran" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full !rounded-xl"
                                placeholder="Contoh: Administrator"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel value="Slug / Kode" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                                className="w-full !rounded-xl"
                                placeholder="Contoh: admin"
                            />
                            <InputError message={errors.slug} className="mt-2" />
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8">
                        <InputLabel value="Hak Akses (Permissions)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6" />
                        
                        <div className="space-y-8 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                            {Object.entries(permissions).map(([group, perms]) => (
                                <div key={group}>
                                    <h5 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center">
                                        <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                                        Modul {group}
                                    </h5>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {perms.map(p => (
                                            <label key={p.id} className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-white hover:border-indigo-200 transition-all">
                                                <input
                                                    type="checkbox"
                                                    checked={data.permissions.includes(p.id)}
                                                    onChange={e => {
                                                        const checked = e.target.checked;
                                                        setData('permissions', checked ? [...data.permissions, p.id] : data.permissions.filter(id => id !== p.id));
                                                    }}
                                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="ml-3 text-xs font-bold text-gray-700">{p.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3">
                        <SecondaryButton onClick={closeModal} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-indigo-100">Simpan</PrimaryButton>
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
                        Apakah Anda yakin ingin menghapus peran ini?
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
