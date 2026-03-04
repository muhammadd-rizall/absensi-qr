import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Scan({ auth, teachings }) {
    const [selectedTeaching, setSelectedTeaching] = useState('');
    const [lastScanned, setLastScanned] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isScanning, setIsSidebarOpen] = useState(true);
    const inputRef = useRef(null);

    const { data, setData, post, processing } = useForm({
        barcode_code: '',
        teaching_id: '',
    });

    useEffect(() => {
        if (selectedTeaching) {
            inputRef.current?.focus();
        }
    }, [selectedTeaching]);

    const handleScan = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!selectedTeaching) {
            setError('Pilih jadwal mengajar terlebih dahulu.');
            return;
        }

        try {
            const response = await axios.post(route('teacher.process-scan'), {
                barcode_code: data.barcode_code,
                teaching_id: selectedTeaching
            });

            if (response.data.success) {
                setSuccess(response.data.message);
                setLastScanned(response.data.student);
                setData('barcode_code', '');
                inputRef.current?.focus();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat memproses scan.');
            setData('barcode_code', '');
            inputRef.current?.focus();
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">Scan QR Presensi</h2>}
        >
            <Head title="Scan QR" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8 bg-indigo-600 text-white">
                        <h3 className="text-xl font-black mb-2">Pilih Jadwal Mengajar</h3>
                        <p className="text-indigo-100 text-sm font-medium">Pastikan jadwal yang dipilih sesuai dengan jam pelajaran saat ini.</p>
                        
                        <select 
                            value={selectedTeaching}
                            onChange={(e) => setSelectedTeaching(e.target.value)}
                            className="mt-6 w-full bg-indigo-700 border-indigo-500 text-white rounded-2xl py-4 focus:ring-white focus:border-white font-bold"
                        >
                            <option value="">-- Pilih Mata Pelajaran & Kelas --</option>
                            {teachings.map(t => (
                                <option key={t.id} value={t.id}>{t.subject?.name} - {t.class?.name} ({t.start_time})</option>
                            ))}
                        </select>
                    </div>

                    <div className="p-8">
                        {selectedTeaching ? (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-indigo-100 shadow-inner">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 11v1m5-10v1m0 8v1m-9-4h1m8 0h1m-10 0a2 2 0 012-2h8a2 2 0 012 2v3a2 2 0 01-2 2H7a2 2 0 01-2-2v-3a2 2 0 012-2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-black text-gray-900">Siap Menerima Scan</h4>
                                    <p className="text-sm text-gray-500 font-medium">Gunakan alat scanner atau ketik kode manual di bawah.</p>
                                </div>

                                <form onSubmit={handleScan} className="relative">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={data.barcode_code}
                                        onChange={e => setData('barcode_code', e.target.value)}
                                        className="w-full bg-gray-50 border-gray-200 rounded-2xl py-5 px-6 text-center text-2xl font-black tracking-widest focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300"
                                        placeholder="KODE BARCODE"
                                        autoComplete="off"
                                    />
                                    <button type="submit" className="hidden">Submit</button>
                                </form>

                                {/* Alerts */}
                                {success && (
                                    <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center animate-bounce">
                                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mr-4 shrink-0">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-bold text-green-800">{success}</p>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center animate-shake">
                                        <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center mr-4 shrink-0">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-bold text-red-800">{error}</p>
                                    </div>
                                )}

                                {/* Last Scanned Card */}
                                {lastScanned && (
                                    <div className="mt-8 border-t border-gray-100 pt-8">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Siswa Terakhir Discan</p>
                                        <div className="bg-gray-50 rounded-2xl p-4 flex items-center">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-indigo-600 mr-4 border border-gray-100">
                                                {lastScanned.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{lastScanned.name}</p>
                                                <p className="text-xs font-medium text-gray-500">NIS: {lastScanned.nis}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-green-100">
                                                    Hadir
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="p-6 bg-indigo-50 text-indigo-400 rounded-full inline-block mb-4">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Silakan Pilih Jadwal untuk Memulai</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
            `}} />
        </AuthenticatedLayout>
    );
}
