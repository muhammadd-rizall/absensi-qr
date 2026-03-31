import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export const useClass = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        level: '',
        room: '',
        academic_year_id: '',
        homeroom_teacher_id: '',
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setEditData(item);
            setData({
                name: item.name || '',
                level: item.level || '',
                room: item.room || '',
                academic_year_id: item.academic_year?.id || '',
                homeroom_teacher_id: item.homeroom_teacher?.id || '',
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
            put(route('classes.update', editData.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('classes.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const deleteItem = () => {
        destroy(route('classes.destroy', deleteId), {
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
        deleteItem,
        setIsDeleting,
    };
};
