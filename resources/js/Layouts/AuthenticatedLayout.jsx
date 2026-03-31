import { ApplicationLogo, Dropdown } from '@/Components';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Helper to check permissions in frontend
    const can = (permission) => {
        if (user.roles.includes('super-admin')) return true;
        return user.permissions.includes(permission);
    };

    const navItems = [
        {
            label: 'Dashboard',
            href: route('dashboard'),
            active: route().current('dashboard'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            show: can('view-dashboard')
        },
        {
            label: 'Scan QR Presensi',
            href: route('teacher.scan'),
            active: route().current('teacher.scan'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 11v1m5-10v1m0 8v1m-9-4h1m8 0h1m-10 0a2 2 0 012-2h8a2 2 0 012 2v3a2 2 0 01-2 2H7a2 2 0 01-2-2v-3a2 2 0 012-2z" />
                </svg>
            ),
            show: can('scan-attendance')
        },
        { 
            type: 'divider', 
            label: 'Master Data', 
            show: can('manage-academic-years') || can('manage-classes') || can('manage-teachers') || can('manage-students') || can('manage-subjects')
        },
        {
            label: 'Tahun Ajaran',
            href: route('academic-years.index'),
            active: route().current('academic-years.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            show: can('manage-academic-years')
        },
        {
            label: 'Kelas',
            href: route('classes.index'),
            active: route().current('classes.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            show: can('manage-classes')
        },
        {
            label: 'Guru',
            href: route('teachers.index'),
            active: route().current('teachers.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            show: can('manage-teachers')
        },
        {
            label: 'Siswa',
            href: route('students.index'),
            active: route().current('students.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
            ),
            show: can('manage-students')
        },
        {
            label: 'Mata Pelajaran',
            href: route('subjects.index'),
            active: route().current('subjects.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            show: can('manage-subjects')
        },
        {
            label: 'Jadwal Mengajar',
            href: route('teachings.index'),
            active: route().current('teachings.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            show: can('manage-classes')
        },
        { type: 'divider', label: 'Kehadiran', show: can('view-attendance-reports') },
        {
            label: 'Presensi',
            href: route('attendance.index'),
            active: route().current('attendance.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            show: can('view-attendance-reports')
        },
        { type: 'divider', label: 'Sistem', show: can('manage-users') || can('manage-roles') },
        {
            label: 'Pengguna',
            href: route('users.index'),
            active: route().current('users.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            show: can('manage-users')
        },
        {
            label: 'Peran & Izin',
            href: route('roles.index'),
            active: route().current('roles.*'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            show: can('manage-roles')
        }
    ];

    const filteredNavItems = navItems.filter(item => item.show !== false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-indigo-800 text-white transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center h-16 px-6 bg-indigo-900/50 shrink-0">
                    <ApplicationLogo className="w-8 h-8 fill-current text-white shrink-0" />
                    {isSidebarOpen && (
                        <span className="ml-3 text-lg font-bold tracking-wider whitespace-nowrap overflow-hidden">ABSENSI QR</span>
                    )}
                </div>

                {/* Sidebar Nav */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1 custom-scrollbar">
                    {filteredNavItems.map((item, index) => {
                        if (item.type === 'divider') {
                            return isSidebarOpen ? (
                                <div key={index} className="px-3 pt-4 pb-2 text-xs font-semibold text-indigo-300 uppercase tracking-widest">
                                    {item.label}
                                </div>
                            ) : (
                                <div key={index} className="mx-2 my-4 border-t border-indigo-700"></div>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                                    item.active 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                                }`}
                                title={!isSidebarOpen ? item.label : ''}
                            >
                                <span className={`shrink-0 ${item.active ? 'text-white' : 'text-indigo-300 group-hover:text-white'}`}>
                                    {item.icon}
                                </span>
                                {isSidebarOpen && (
                                    <span className="ml-3 text-sm font-medium transition-opacity duration-300">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-indigo-700 bg-indigo-900/30">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex items-center justify-center w-full p-2 text-indigo-300 hover:text-white hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                        <svg className={`w-6 h-6 transition-transform duration-300 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between h-16 px-4 md:px-8 bg-white border-b border-gray-200 shrink-0 shadow-sm z-30">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        
                        {/* Dynamic Header Title */}
                        <div className="hidden md:block">
                           {header}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
                                        <div className="flex items-center">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-sm ring-2 ring-indigo-50">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="hidden sm:block ml-2 text-left leading-tight">
                                                <p className="text-sm font-bold text-gray-800 truncate max-w-[120px]">{user.name}</p>
                                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">Administrator</p>
                                            </div>
                                            <svg className="hidden sm:block w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <div className="py-1">
                                        <Dropdown.Link href={route('profile.edit')}>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profil Saya
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            <div className="flex items-center text-red-600">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Keluar
                                            </div>
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-gray-50 custom-scrollbar">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Mobile Header Title */}
                        <div className="md:hidden mb-6">
                            {header}
                        </div>
                        
                        <div className="animate-in fade-in duration-500">
                            {children}
                        </div>
                    </div>
                    
                    {/* Footer Content */}
                    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
                        <p className="text-xs text-gray-400 font-medium">
                            &copy; {new Date().getFullYear()} Absensi QR. All rights reserved.
                        </p>
                    </footer>
                </main>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                }
            `}} />
        </div>
    );
}
