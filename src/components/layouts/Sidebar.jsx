import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const DashboardIcon = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z"/>
    </svg>
);

const ContentIcon = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd" />
    </svg>
);

const AccountIcon = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clipRule="evenodd" />
    </svg>
);

const MessageIcon = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
        <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
    </svg>
);

const BackIcon = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
    </svg>
);

const LogoutIcon = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
    </svg>
);

const adminNavLinks = [
    { to: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { to: '/content', label: 'Contents', Icon: ContentIcon, subPaths: ['/artikelberita', '/produkpopulercontent'] },
    { to: '/accounts', label: 'Accounts', Icon: AccountIcon },
    { to: '/messages', label: 'Messages', Icon: MessageIcon },
];

// --- Komponen Utama Sidebar ---
const Sidebar = () => {
    const location = useLocation();

    // Fungsi untuk memeriksa apakah link harus dianggap "aktif"
    const checkIsActive = (link) => {
        if (location.pathname === link.to) {
            return true;
        }
        if (link.subPaths && link.subPaths.some(path => location.pathname.startsWith(path))) {
            return true;
        }
        return false;
    };
    
    return (
        // Styling utama sidebar: latar putih, lebar tetap, posisi fixed, dan bayangan halus
        <aside className='bg-white w-72 flex flex-col h-screen fixed top-0 left-0 shadow-sm'>
            
            <div className='w-full p-8 mb-4 text-center'>
                <Link to="/dashboard" className='text-gray-900 font-montserrat font-bold text-3xl transition-colors hover:text-gray-700'>
                    <span>CV.KUN</span>
                </Link>
            </div>

            {/* Navigasi Utama dengan styling yang telah dirombak total */}
            <nav className='flex-grow flex flex-col'>
                <div className='flex flex-col w-full font-sans text-base gap-2 px-4'>
                    {adminNavLinks.map((link) => {
                        const isActive = checkIsActive(link);
                        // Kelas dasar untuk semua link
                        const baseClasses = 'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200';
                        // Kelas khusus untuk link aktif (latar hitam, teks putih)
                        const activeClasses = 'bg-gray-900 text-white font-semibold';
                        // Kelas untuk link tidak aktif (teks abu-abu, hover dengan latar)
                        const inactiveClasses = 'text-gray-500 hover:bg-gray-100 hover:text-gray-900';

                        return (
                            <NavLink
                                key={link.label}
                                to={link.to}
                                // Terapkan kelas secara dinamis berdasarkan status aktif/tidak aktif
                                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                            >
                                <link.Icon className="w-6 h-6 flex-shrink-0" />
                                <span>{link.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* Tautan Aksi di Bagian Bawah yang disesuaikan dengan desain baru */}
            <div className='mt-auto px-4 pt-3 pb-5'>
            <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200">
                    <BackIcon className="w-6 h-6 flex-shrink-0" />
                    <span className="font-sans text-base">Kembali</span>
            </Link>
            <Link
                    to="/login"
                    onClick={() => localStorage.clear()}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
            <LogoutIcon className="w-6 h-6 flex-shrink-0" />
            <span className="font-sans text-base">Sign Out</span>
            </Link>
            </div>
        </aside>
    );
};

export default Sidebar;