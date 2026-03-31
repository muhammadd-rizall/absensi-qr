import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export const useRole = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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
