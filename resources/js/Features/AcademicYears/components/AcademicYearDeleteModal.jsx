import React from 'react';
import { Modal, SecondaryButton, DangerButton } from '@/Components';

export default function AcademicYearDeleteModal({ show, onClose, onConfirm, processing }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-8 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50/50">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Konfirmasi Hapus</h2>
                <p className="text-sm font-medium text-gray-500 mb-8">
                    Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3">
                    <SecondaryButton onClick={onClose} className="flex-1 !rounded-xl py-3 justify-center">Batal</SecondaryButton>
                    <DangerButton onClick={onConfirm} disabled={processing} className="flex-1 !rounded-xl py-3 justify-center shadow-lg shadow-red-100">
                        Hapus
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
