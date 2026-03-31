import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { DangerButton, InputError, InputLabel, Modal, PrimaryButton, SecondaryButton, TextInput } from '@/Components';
import { useState } from 'react';

export default function Index({ auth, teachings, teachers, subjects, classes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const dataList = teachings.data || [];

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        teacher_id: '',
        subject_id: '',
        class_id: '',
        day: 'Senin',
        start_time: '',
        end_time: '',
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setEditData(item);
            setData({
                teacher_id: item.teacher?.id || '',
                subject_id: item.subject?.id || '',
                class_id: item.class?.id || '',
                day: item.day || 'Senin',
                start_time: item.start_time || '',
                end_time: item.end_time || '',
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
            put(route('teachings.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('teachings.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteItem = () => {
        destroy(route('teachings.destroy', deleteId), {
            onSuccess: () => setIsDeleting(false),
            onFinish: () => setDeleteId(null),
        });
    };

    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Jadwal Mengajar</h2>}
        >
            <Head title="Jadwal Mengajar" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Pengaturan Jadwal</h3>
                            <p className="text-sm text-gray-500 font-medium">Atur jam pelajaran untuk setiap kelas dan guru</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Jadwal
                        </PrimaryButton>
                    </div>

                    <div className="overflow-x-auto -mx-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Hari & Waktu</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Guru / Mapel</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Kelas</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dataList.length > 0 ? (
                                    dataList.map((item) => (
                                        <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-indigo-600 uppercase tracking-wider">{item.day}</span>
                                                    <span className="text-xs font-bold text-gray-500">{item.start_time} - {item.end_time}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900">{item.teacher?.name}</span>
                                                    <span className="text-xs font-medium text-gray-500 italic">{item.subject?.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-200">
                                                    {item.class?.name}
                                                </span>
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
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Belum ada jadwal mengajar</p>
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
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={submit} className="p-8">
                    <h2 className="text-xl font-black text-gray-900 mb-8">{editData ? 'Edit Jadwal' : 'Tambah Jadwal'}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel value="Guru" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select
                                value={data.teacher_id}
                                onChange={e => setData('teacher_id', e.target.value)}
                                className="w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                            >
                                <option value="">Pilih Guru</option>
                                {teachers.data?.map(t => <option key={p.id} value={t.id}>{t.name}</option>)}
                            </select>
                            <InputError message={errors.teacher_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Mata Pelajaran" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select
                                value={data.subject_id}
                                onChange={e => setData('subject_id', e.target.value)}
                                className="w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                            >
                                <option value="">Pilih Mapel</option>
                                {subjects.data?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <InputError message={errors.subject_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Kelas" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select
                                value={data.class_id}
                                onChange={e => setData('class_id', e.target.value)}
                                className="w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                            >
                                <option value="">Pilih Kelas</option>
                                {classes.data?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <InputError message={errors.class_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Hari" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select
                                value={data.day}
                                onChange={e => setData('day', e.target.value)}
                                className="w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                            >
                                {days.map(day => <option key={day} value={day}>{day}</option>)}
                            </select>
                            <InputError message={errors.day} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Jam Mulai" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                type="time"
                                value={data.start_time}
                                onChange={e => setData('start_time', e.target.value)}
                                className="w-full !rounded-xl"
                            />
                            <InputError message={errors.start_time} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Jam Selesai" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                type="time"
                                value={data.end_time}
                                onChange={e => setData('end_time', e.target.value)}
                                className="w-full !rounded-xl"
                            />
                            <InputError message={errors.end_time} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3">
                        <SecondaryButton onClick={closeModal} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="flex-1 !rounded-xl py-3 justify-center">Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
