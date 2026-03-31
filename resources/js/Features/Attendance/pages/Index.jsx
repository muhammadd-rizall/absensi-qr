import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { DangerButton, InputError, InputLabel, Modal, PrimaryButton, SecondaryButton, TextInput } from '@/Components';
import { useState } from 'react';

export default function Index({ auth, attendances, students, teachings }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const dataList = attendances.data || [];

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        student_id: '',
        teaching_id: '',
        attendance_date: new Date().toISOString().split('T')[0],
        status: 'hadir',
        check_in: '',
        late_minutes: 0,
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setEditData(item);
            setData({
                student_id: item.student?.id || '',
                teaching_id: item.teaching_id || '',
                attendance_date: item.attendance_date || '',
                status: item.status || 'hadir',
                check_in: item.check_in || '',
                late_minutes: item.late_minutes || 0,
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
            put(route('attendance.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('attendance.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteItem = () => {
        destroy(route('attendance.destroy', deleteId), {
            onSuccess: () => setIsDeleting(false),
            onFinish: () => setDeleteId(null),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Data Presensi</h2>}
        >
            <Head title="Presensi" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Log Kehadiran</h3>
                            <p className="text-sm text-gray-500 font-medium">Pantau dan kelola kehadiran siswa secara manual</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Catat Presensi
                        </PrimaryButton>
                    </div>

                    <div className="overflow-x-auto -mx-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Siswa</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Tanggal & Waktu</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-center">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dataList.length > 0 ? (
                                    dataList.map((item) => (
                                        <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs mr-4">
                                                        {item.student?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{item.student?.name}</p>
                                                        <p className="text-[10px] font-medium text-gray-400">NIS: {item.student?.nis}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-700">{item.attendance_date}</span>
                                                    <span className="text-xs font-medium text-gray-400">{item.check_in ? item.check_in : '--:--'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                                    item.status === 'hadir' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'telat' ? 'bg-orange-100 text-orange-700' :
                                                    item.status === 'izin' ? 'bg-blue-100 text-blue-700' :
                                                    item.status === 'sakit' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => openModal(item)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => confirmDelete(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
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
                                        <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Belum ada data presensi</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={submit} className="p-8">
                    <h2 className="text-xl font-black text-gray-900 mb-8">{editData ? 'Edit Presensi' : 'Catat Presensi'}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel value="Siswa" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select value={data.student_id} onChange={e => setData('student_id', e.target.value)} className="w-full rounded-xl border-gray-200">
                                <option value="">Pilih Siswa</option>
                                {students.data?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <InputError message={errors.student_id} />
                        </div>
                        <div>
                            <InputLabel value="Status" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full rounded-xl border-gray-200">
                                <option value="hadir">Hadir</option>
                                <option value="izin">Izin</option>
                                <option value="sakit">Sakit</option>
                                <option value="telat">Telat</option>
                                <option value="alfa">Alfa</option>
                            </select>
                            <InputError message={errors.status} />
                        </div>
                        <div>
                            <InputLabel value="Tanggal" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput type="date" value={data.attendance_date} onChange={e => setData('attendance_date', e.target.value)} className="w-full !rounded-xl" />
                            <InputError message={errors.attendance_date} />
                        </div>
                        <div>
                            <InputLabel value="Check In" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput type="time" value={data.check_in} onChange={e => setData('check_in', e.target.value)} className="w-full !rounded-xl" />
                            <InputError message={errors.check_in} />
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
