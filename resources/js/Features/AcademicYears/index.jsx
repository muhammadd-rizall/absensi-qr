import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PrimaryButton } from '@/Components';
import { useAcademicYear } from './hooks/useAcademicYear';
import AcademicYearTable from './components/AcademicYearTable';
import AcademicYearFormModal from './components/AcademicYearFormModal';
import AcademicYearDeleteModal from './components/AcademicYearDeleteModal';

export default function AcademicYearFeature({ auth, academicYears }) {
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
        setIsDeleting,
        deleteAcademicYear,
    } = useAcademicYear();

    const dataList = academicYears.data || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Manajemen Tahun Ajaran</h2>}
        >
            <Head title="Tahun Ajaran" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Daftar Tahun Ajaran</h3>
                            <p className="text-sm text-gray-500 font-medium">Kelola periode aktif kegiatan belajar mengajar</p>
                        </div>
                        <PrimaryButton onClick={() => openModal()} className="!rounded-xl px-6 py-3 shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Tahun Ajaran
                        </PrimaryButton>
                    </div>

                    <AcademicYearTable 
                        dataList={dataList} 
                        onEdit={openModal} 
                        onDelete={confirmDelete} 
                    />
                </div>
            </div>

            <AcademicYearFormModal
                show={isModalOpen}
                onClose={closeModal}
                onSubmit={submit}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                editData={editData}
            />

            <AcademicYearDeleteModal
                show={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={deleteAcademicYear}
                processing={processing}
            />
        </AuthenticatedLayout>
    );
}
