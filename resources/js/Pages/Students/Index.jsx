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
import { QRCodeSVG } from 'qrcode.react';

export default function Index({ auth, students }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const dataList = students.data || [];

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nis: '',
        name: '',
        gender: 'Laki-laki',
        barcode_code: '',
        status: 'Aktif',
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setEditData(item);
            setData({
                nis: item.nis || '',
                name: item.name || '',
                gender: item.gender || 'Laki-laki',
                barcode_code: item.barcode_code || '',
                status: item.status || 'Aktif',
            });
        } else {
            setEditData(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const openCardModal = (student) => {
        setSelectedStudent(student);
        setIsCardModalOpen(true);
    };

    const printCard = () => {
        window.print();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editData) {
            put(route('students.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('students.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteItem = () => {
        destroy(route('students.destroy', deleteId), {
            onSuccess: () => setIsDeleting(false),
            onFinish: () => setDeleteId(null),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Data Siswa</h2>}
        >
            <Head title="Siswa" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 print:hidden">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Daftar Siswa</h3>
                            <p className="text-sm text-gray-500 font-medium">Kelola data murid dan kartu identitas QR</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Siswa
                        </PrimaryButton>
                    </div>

                    <div className="overflow-x-auto -mx-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">Informasi Siswa</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100">NIS</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-center">Kartu</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-y border-gray-100 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dataList.length > 0 ? (
                                    dataList.map((item) => (
                                        <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 shadow-sm border border-white ring-4 ring-gray-50 ${item.gender === 'Laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">{item.status || 'Aktif'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                                    {item.nis}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <button 
                                                    onClick={() => openCardModal(item)}
                                                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105"
                                                >
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                                                    </svg>
                                                    Lihat QR
                                                </button>
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
                                        <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Belum ada data siswa</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* QR Card Modal */}
            <Modal show={isCardModalOpen} onClose={() => setIsCardModalOpen(false)} maxWidth="sm">
                <div className="p-8 text-center bg-white rounded-3xl">
                    <div id="student-card" className="border-4 border-indigo-600 rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white shadow-2xl mx-auto max-w-[280px]">
                        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                        <div className="mb-6">
                            <h4 className="text-xl font-black text-indigo-900 tracking-tight">KARTU PRESENSI</h4>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Absensi QR Digital</p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-2xl shadow-inner inline-block border-2 border-indigo-100 mb-6">
                            {selectedStudent && (
                                <QRCodeSVG 
                                    value={selectedStudent.barcode_code} 
                                    size={160}
                                    level="H"
                                    includeMargin={false}
                                />
                            )}
                        </div>

                        <div className="space-y-1">
                            <h5 className="text-lg font-black text-gray-900 uppercase truncate px-2">{selectedStudent?.name}</h5>
                            <p className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-full border border-indigo-100">
                                {selectedStudent?.nis}
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-indigo-100/50 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                            Berlaku Selama 3 Tahun Pelajaran
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3 print:hidden">
                        <SecondaryButton onClick={() => setIsCardModalOpen(false)} className="flex-1 !rounded-xl py-3 justify-center">Tutup</SecondaryButton>
                        <PrimaryButton onClick={printCard} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-indigo-100">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Cetak Kartu
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={submit} className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">
                            {editData ? 'Edit Data Siswa' : 'Tambah Data Siswa'}
                        </h2>
                        <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="nis" value="NIS" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="nis"
                                type="text"
                                name="nis"
                                value={data.nis}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="off"
                                isFocused={true}
                                onChange={(e) => setData('nis', e.target.value)}
                                placeholder="Masukkan NIS"
                            />
                            <InputError message={errors.nis} className="mt-2" />
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
                            <InputLabel htmlFor="gender" value="Jenis Kelamin" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select
                                id="gender"
                                name="gender"
                                value={data.gender}
                                className="mt-1 block w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                onChange={(e) => setData('gender', e.target.value)}
                            >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            <InputError message={errors.gender} className="mt-2" />
                        </div>

                        <div className="md:col-span-1">
                            <InputLabel htmlFor="barcode_code" value="Kode QR (Otomatis jika kosong)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <TextInput
                                id="barcode_code"
                                type="text"
                                name="barcode_code"
                                value={data.barcode_code}
                                className="mt-1 block w-full !rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="off"
                                onChange={(e) => setData('barcode_code', e.target.value)}
                                placeholder="Auto-generated"
                            />
                            <InputError message={errors.barcode_code} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel htmlFor="status" value="Status" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                            <select
                                id="status"
                                name="status"
                                value={data.status}
                                className="mt-1 block w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="Aktif">Aktif</option>
                                <option value="Lulus">Lulus</option>
                                <option value="Pindah">Pindah</option>
                                <option value="Keluar">Keluar</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
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
                        Apakah Anda yakin ingin menghapus data siswa ini?
                    </p>
                    <div className="flex gap-3">
                        <SecondaryButton onClick={() => setIsDeleting(false)} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                        <DangerButton onClick={deleteItem} disabled={processing} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-red-100">
                            Hapus
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #student-card, #student-card * {
                        visibility: visible;
                    }
                    #student-card {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%) scale(1.5);
                        border: 2px solid #4f46e5 !important;
                        box-shadow: none !important;
                    }
                }
            `}} />
        </AuthenticatedLayout>
    );
}
