// File: Accounts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from 'react-icons/fa';

const Accounts = () => {
    // State utama
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    // State untuk mengelola modal (lebih efisien daripada state boolean terpisah)
    const [modal, setModal] = useState({ isOpen: false, mode: 'add', currentUser: null });
    
    // State untuk form (digunakan untuk 'add' dan 'edit')
    const [formState, setFormState] = useState({ name: '', email: '', password: '' });

    // Fetch data pengguna dengan polling
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Gunakan apiClient jika sudah dikonfigurasi, jika tidak axios juga bisa
                const response = await axios.get('http://localhost:7000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
        const interval = setInterval(fetchUsers, 5000); // Polling setiap 5 detik
        return () => clearInterval(interval);
    }, []);

    // Fungsi untuk membuka modal
    const openModal = (mode, user = null) => {
        setModal({ isOpen: true, mode, currentUser: user });
        if (mode === 'edit' && user) {
            setFormState({ name: user.name, email: user.email, password: '' }); // Kosongkan password demi keamanan
        } else {
            setFormState({ name: '', email: '', password: '' });
        }
    };

    // Fungsi untuk menutup modal dan mereset form
    const closeModal = () => {
        setModal({ isOpen: false, mode: 'add', currentUser: null });
        // Reset form setelah animasi selesai
        setTimeout(() => setFormState({ name: '', email: '', password: '' }), 300);
    };
    
    // Handler untuk perubahan input form
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    // Handler untuk submit form (menangani 'add' dan 'edit')
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = modal.mode === 'edit' 
            ? `http://localhost:7000/api/users/${modal.currentUser.id}`
            : 'http://localhost:7000/api/users';
        const method = modal.mode === 'edit' ? 'put' : 'post';

        try {
            await axios[method](url, formState);
            alert(`Akun berhasil di${modal.mode === 'edit' ? 'ubah' : 'tambahkan'}!`);
            closeModal();
            // Data akan diperbarui otomatis oleh polling
        } catch (error) {
            console.error(`Error ${modal.mode}ing user:`, error);
            alert(`Gagal ${modal.mode} akun`);
        }
    };

    // Handler untuk menghapus pengguna
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this account?')) return;
        try {
            await axios.delete(`http://localhost:7000/api/users/${id}`);
            alert('Akun Berhasil di Hapus');
            // Data akan diperbarui otomatis oleh polling
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete the account');
        }
    };
    
    // Filter pengguna berdasarkan pencarian
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 font-sans">
            {/* Header halaman yang modern */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
                    <p className="text-gray-500 mt-1">Manage all user accounts in the system.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Search Bar Modern */}
                    <div className="relative w-full sm:w-64">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder="Search accounts..." 
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        />
                    </div>
                    {/* Tombol Add Account */}
                    <motion.button 
                        className="flex-shrink-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal('add')}
                    >
                        <FaPlus />
                        <span className="hidden sm:inline">Add Account</span>
                    </motion.button>
                </div>
            </header>

            {/* Tabel data pengguna yang diperbarui */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Password Hash (Partial)</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-gray-900">{user.name}</div>
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs">{user.password.substring(0, 20)}...</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-yellow-500" onClick={() => openModal('edit', user)}>
                                            <FaEdit />
                                        </button>
                                        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500" onClick={() => handleDelete(user.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal untuk Add/Edit menggunakan Headless UI & Framer Motion */}
            <AnimatePresence>
                {modal.isOpen && (
                    <Dialog static as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} open={modal.isOpen} onClose={closeModal} className="relative z-50">
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel as={motion.div} 
                                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                                className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl"
                            >
                                <Dialog.Title className="text-xl font-bold text-gray-900 mb-6">
                                    {modal.mode === 'edit' ? 'Edit Account' : 'Create New Account'}
                                </Dialog.Title>
                                <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input type="text" name="name" id="name" value={formState.name} onChange={handleFormChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" name="email" id="email" value={formState.email} onChange={handleFormChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input type="password" name="password" id="password" value={formState.password} onChange={handleFormChange} placeholder={modal.mode === 'edit' ? 'Leave blank to keep current password' : ''} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required={modal.mode === 'add'} />
                                    </div>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700">{modal.mode === 'edit' ? 'Update' : 'Create'}</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accounts;