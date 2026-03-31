import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DangerButton, Modal, PrimaryButton, SecondaryButton } from '@/Components';
import { useClass } from './hooks/useClass';
import ClassStats from './components/ClassStats';
import ClassTable from './components/ClassTable';
import ClassFormModal from './components/ClassFormModal';

export default function ClassFeature({ auth, classes, academicYears, teachers, stats }) {
    const {
        isModalOpen,
        editData,
        isDeleting,
        data,
        setData,
        processing,
        errors,
        openModal,
        closeModal,
        submit,
        confirmDelete,
        deleteItem,
        setIsDeleting,
    } = useClass();

    const dataList = classes.data || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Manajemen Kelas</h2>}
        >
            <Head title="Kelas" />

            {/* Stats Section */}
            <ClassStats stats={stats} />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                <div className="p-8">
                    <div className="flex flex-col md:flex-col lg:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Daftar Kelas</h3>
                            <p className="text-sm text-gray-500 font-medium">Kelola grup belajar, tingkat, dan wali kelas</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Kelas
                        </PrimaryButton>
                    </div>

                    <ClassTable 
                        dataList={dataList} 
                        onEdit={openModal} 
                        onDelete={confirmDelete} 
                    />
                </div>
            </div>

            {/* Create/Edit Modal */}
            <ClassFormModal
                show={isModalOpen}
                onClose={closeModal}
                onSubmit={submit}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                editData={editData}
                academicYears={academicYears}
                teachers={teachers}
            />

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
                        Apakah Anda yakin ingin menghapus data kelas ini? Tindakan ini tidak dapat dibatalkan.
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
