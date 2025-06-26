// File: Content.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Content = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        setUserName(storedName || 'Admin'); 
    }, []);

    const contentItems = [
        {
            to: "/Artikelberita",
            title: "Artikel Berita",
            description: "Kelola, tulis, dan publikasikan artikel.",
        },
        {
            to: "/ProdukPopulerContent",
            title: "Produk Populer",
            description: "Atur produk yang tampil di halaman utama.",
        },
    ];

    return (
        <div className="w-full h-full p-8">
            
            {/* BAGIAN HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 font-sans">Content Management</h1>
                <p className="text-md text-gray-500 mt-1">
                    Selamat datang kembali, {userName}! Pilih konten yang ingin Anda kelola.
                </p>
            </div>

            {/* BAGIAN KONTEN (GRID KARTU) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {contentItems.map((item) => (
                    <Link 
                        key={item.title} 
                        to={item.to} 
                        // Styling kartu yang lebih modern dan bersih
                        className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-200 flex justify-between items-center"
                    >
                        <div>
                            <p className='text-xl font-sans font-bold text-gray-900'>{item.title}</p>
                            <p className='text-sm font-sans text-gray-500 mt-1'>{item.description}</p>
                        </div>
                        {/* Ikon panah yang lebih halus */}
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                        </svg>
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default Content;