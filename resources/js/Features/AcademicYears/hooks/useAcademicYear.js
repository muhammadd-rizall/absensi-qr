import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export const useAcademicYear = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        is_active: false,
    });

    const openModal = (ay = null) => {
        clearErrors();
        if (ay) {
            setEditData(ay);
            setData({
                name: ay.name,
                is_active: ay.is_active,
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
            put(route('academic-years.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('academic-years.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteAcademicYear = () => {
        destroy(route('academic-years.destroy', deleteId), {
            onSuccess: () => setIsDeleting(false),
            onFinish: () => setDeleteId(null),
        });
    };

    return {
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
    };
};
