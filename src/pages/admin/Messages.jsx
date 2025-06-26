// File: Messages.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig.js'; // Menggunakan instance axios yang konsisten
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown, FaTasks, FaTrash, FaTimes, FaReply } from 'react-icons/fa';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest');

    // Fetch messages on component mount
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Gunakan apiClient yang sudah dikonfigurasi
                const response = await apiClient.get('/messages');
                // Urutkan data saat pertama kali diambil
                const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setMessages(sortedData);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, []);

    // Toggle select mode
    const handleSelectToggle = () => {
        setIsSelecting(!isSelecting);
        setSelectedMessages([]); // Reset pilihan saat mode diubah
    };

    // Handle individual message selection
    const handleCheckboxToggle = (id) => {
        setSelectedMessages(prev =>
            prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
        );
    };

    // Handle message deletion
    const handleDelete = async () => {
        if (selectedMessages.length === 0) {
            alert("Please select messages to delete first.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete ${selectedMessages.length} message(s)?`)) {
            try {
                await apiClient.post('/messages/delete', { ids: selectedMessages });
                setMessages(prev => prev.filter(msg => !selectedMessages.includes(msg.id)));
                setSelectedMessages([]);
                setIsSelecting(false);
            } catch (error) {
                console.error('Error deleting messages:', error);
            }
        }
    };

    // Handle sorting
    const handleSort = (order) => {
        setSortOrder(order);
        const sortedMessages = [...messages].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setMessages(sortedMessages);
    };

    return (
        <div className="p-8 font-sans">
            {/* Header Halaman */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                    <p className="text-gray-500 mt-1">Review and respond to user inquiries.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Tombol Aksi saat mode Select aktif */}
                    <AnimatePresence>
                        {isSelecting && (
                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="flex items-center gap-4">
                                <button onClick={handleSelectToggle} className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                                    <FaTimes /> Cancel
                                </button>
                                <button onClick={handleDelete} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-700 transition-colors" disabled={selectedMessages.length === 0}>
                                    <FaTrash /> Delete ({selectedMessages.length})
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* Tombol Aksi Utama */}
                    {!isSelecting && (
                         <div className="flex items-center gap-4">
                            {/* Dropdown untuk Sorting */}
                            <Menu as="div" className="relative inline-block text-left">
                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Sort by: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                                    <FaChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                                <Transition as={React.Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>{({ active }) => (<a href="#" onClick={() => handleSort('newest')} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>Newest First</a>)}</Menu.Item>
                                            <Menu.Item>{({ active }) => (<a href="#" onClick={() => handleSort('oldest')} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>Oldest First</a>)}</Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button onClick={handleSelectToggle} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition-colors">
                                <FaTasks /> Select
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Daftar Pesan */}
            <div className="space-y-4">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <motion.div 
                            key={msg.id} 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: index * 0.05 }}
                            className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 ${selectedMessages.includes(msg.id) ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-gray-200'}`}
                        >
                            {isSelecting && (
                                <input
                                    type="checkbox"
                                    checked={selectedMessages.includes(msg.id)}
                                    onChange={() => handleCheckboxToggle(msg.id)}
                                    className="h-5 w-5 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                            )}
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{msg.name}</h4>
                                        <p className="text-sm text-gray-500">{msg.email}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 flex-shrink-0 ml-4">
                                        {new Date(msg.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                                    </p>
                                </div>
                                <p className="mt-3 text-gray-700">{msg.message}</p>
                            </div>
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}&su=Reply to your message&body=Hello ${msg.name},`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                                title="Reply via Email"
                            >
                                <FaReply size={16} />
                            </a>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">No Messages Yet</h3>
                        <p className="text-gray-500 mt-1">When new messages arrive, they will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;