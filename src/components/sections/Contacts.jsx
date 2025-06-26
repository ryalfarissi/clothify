import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Ikon SVG sebagai komponen untuk kebersihan kode
const LocationIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const MailIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const PhoneIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const Contacts = () => {
    // State untuk form
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ message: '', type: '' });

    // Daftar info kontak untuk mapping
    const contactDetails = [
        {
            icon: <LocationIcon />,
            title: "Alamat Kami",
            value: "Jl. Raya Ciawi, Ciawi, Tasikmalaya",
            link: "https://maps.app.goo.gl/VsLkWrKYBcGeK5VH6",
            aria: "Lihat lokasi di Google Maps"
        },
        {
            icon: <MailIcon />,
            title: "Email Kami",
            value: "abatasastore@gmail.com",
            link: "mailto:abatasastore@gmail.com",
            aria: "Kirim email ke abatasastore"
        },
        {
            icon: <PhoneIcon />,
            title: "Nomor Telepon",
            value: "0812-8623-7234",
            link: "https://wa.me/6281286237234", // Link ke WhatsApp
            aria: "Hubungi via WhatsApp"
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ message: '', type: '' });

        try {
            await axios.post('http://localhost:7000/api/messages', formData);
            setStatus({ message: 'Pesan berhasil terkirim! Terima kasih.', type: 'success' });
            setFormData({ name: '', email: '', message: '' }); // Kosongkan form
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ message: 'Gagal mengirim pesan. Silakan coba lagi.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contacts" className="w-full max-container lg:px-4 py-16 lg:py-24 scroll-mt-28">
            <div className="w-full">
                {/* --- Judul Section --- */}
                <motion.div 
                    className="mx-auto text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="font-bold uppercase text-3xl md:text-4xl text-slate-800 mb-4 font-montserrat">
                        Hubungi Kami
                    </h2>
                    <p className="font-medium text-slate-gray md:text-lg lg:max-w-3xl mx-auto font-montserrat">
                        Kami siap membantu Anda. Baik untuk pertanyaan, kolaborasi, atau sekadar menyapa, jangan ragu untuk menghubungi kami melalui form atau detail kontak di bawah.
                    </p>
                </motion.div>

                {/* --- Layout Utama: Info & Form --- */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
                    
                    {/* --- Kolom Kiri: Informasi Kontak --- */}
                    <motion.div 
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="bg-primary-kalia text-white p-8 rounded-2xl shadow-lg h-full">
                            <h3 className="font-bold font-montserrat text-2xl mb-6">Informasi Kontak</h3>
                            <div className="space-y-6">
                                {contactDetails.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold font-montserrat text-lg">{item.title}</h4>
                                            <a 
                                                href={item.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                aria-label={item.aria}
                                                className="font-montserrat break-words transition-opacity hover:opacity-80"
                                            >
                                                {item.value}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Kolom Kanan: Formulir Kontak --- */}
                    <motion.div 
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                            <h3 className="font-bold font-montserrat text-slate-800 text-2xl mb-6">Kirim Pesan</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="text-sm font-semibold text-slate-600">Nama Lengkap</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-2 w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-kalia focus:border-transparent transition" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-sm font-semibold text-slate-600">Alamat Email</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-2 w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-kalia focus:border-transparent transition" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-600">Pesan Anda</label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="mt-2 w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-kalia focus:border-transparent transition h-32 resize-none"></textarea>
                                </div>
                                <div>
                                    <button type="submit" disabled={isSubmitting} className="w-full text-base font-semibold text-white bg-primary-kalia px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait">
                                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                                    </button>
                                </div>
                                {status.message && (
                                    <p className={`text-center font-medium p-3 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {status.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* --- Peta Google --- */}
                <motion.div 
                    className="mt-16 lg:mt-24 h-96 rounded-2xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d710.3138666244054!2d106.87828601685506!3d-6.925853368381699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6837dc5d9f5d1b%3A0x863f73b6bfe0c67d!2sABATASA%20STORE!5e1!3m2!1sid!2sid!4v1736951761418!5m2!1sid!2sid" 
                        className="w-full h-full border-0" 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lokasi ABATASA STORE di Google Maps"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default Contacts;