import axios from 'axios';
import React, { useState } from 'react';

const Contacts = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:7000/api/messages', formData);
            setSuccessMessage('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' }); // Clear form
        } catch (error) {
            console.error('Error sending message:', error);
            setSuccessMessage('Failed to send message.');
        }
    };




    return (
        <section id="contacts" className="w-full max-container lg:px-4 pt-16 lg:pt-4 scroll-mt-28">
            <div className="w-full">
                <div className=" mx-auto text-center mb-16">
                    <h4 className="font-bold uppercase text-lg text-primary-kalia mb-3 font-montserrat">Contacts</h4>
                    <h2 className="font-bold uppercase text-[1.5rem] text-slate-800 mb-4 lg:text-[3rem] font-montserrat">Hubungi Kami Kapan Saja</h2>
                    <p className="font-medium text-slate-gray md:text-lg text-base lg:max-w-2xl mx-auto font-montserrat">Kami siap membantu Anda dengan pertanyaan atau kebutuhan kapan saja. Jangan ragu untuk menghubungi kami.</p>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center mb-16 ">
                    <a href="https://maps.app.goo.gl/VsLkWrKYBcGeK5VH6" target="_blank" rel="noopener noreferrer" className="bg-primary-kalia w-full text-white rounded-xl flex flex-col p-4 shadow-lg border  lg:w-72">
                        <svg className="self-center w-[50px] h-[50px] text-gray-800 dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                        </svg>
                        <h4 className="font-semibold font-montserrat text-center text-base">Our Location</h4>
                        <p className="font-normal font-montserrat text-center text-sm">Klik Disini</p>
                    </a>
                    <div className="bg-white w-[45%] text-primary-kalia rounded-xl flex flex-col p-4 shadow-lg border lg:w-72">
                        <svg className="self-center w-[50px] h-[50px] text-gray-800 dark:text-primary-kalia mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                        </svg>
                        <h4 className="font-semibold font-montserrat text-center text-base">Phone Number</h4>
                        <p className="font-normal font-montserrat text-center text-sm">0812-8623-7234</p>
                    </div>
                    <div className="bg-primary-kalia w-[45%] text-white rounded-xl flex flex-col p-4 shadow-lg border lg:w-72">
                        <svg className="self-center w-[50px] h-[50px] text-gray-800 dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                        </svg>

                        <h4 className="font-semibold font-montserrat text-center text-base">Email</h4>
                        <p className="font-normal font-montserrat text-center text-sm break-words">abatasastore@gmail.com</p>
                    </div>
                    <div className="bg-white w-full text-primary-kalia rounded-xl flex flex-col p-4 shadow-lg border  lg:w-72">
                        <svg className="self-center w-[50px] h-[50px] text-gray-800 dark:text-primary-kalia mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <h4 className="font-semibold font-montserrat text-center text-base">Working Hours</h4>
                        <p className="font-normal font-montserrat text-center text-sm">09.00 - 17.00</p>
                    </div>
                </div>
                <div className="items-center justify-center h-96 lg:w-1/2 mx-auto mb-20">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d710.3138666244054!2d106.87828601685506!3d-6.925853368381699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6837dc5d9f5d1b%3A0x863f73b6bfe0c67d!2sABATASA%20STORE!5e1!3m2!1sid!2sid!4v1736951761418!5m2!1sid!2sid" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="map w-full h-full rounded-xl shadow-lg"></iframe>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="w-full lg:w-2/3 lg:mx-auto">
                        <div className="w-full px-4 mb-8">
                            <label htmlFor="name" className="text-base text-primary-kalia font-semibold">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-slate-200 text-dark p-3 rounded-md border-1 border-slate-300 focus:outline-none focus:ring-primary-kalia focus:ring-1 focus:border-primary-kalia"
                                required
                            />
                        </div>
                        <div className="w-full px-4 mb-8">
                            <label htmlFor="email" className="text-base text-primary-kalia font-semibold">E-Mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-slate-200 text-dark p-3 rounded-md border-1 border-slate-300 focus:outline-none focus:ring-primary-kalia focus:ring-1 focus:border-primary-kalia"
                                required
                            />
                        </div>
                        <div className="w-full px-4 mb-8">
                            <label htmlFor="message" className="text-base text-primary-kalia font-semibold">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-slate-200 text-dark p-3 rounded-md border-1 border-slate-300 focus:outline-none focus:ring-primary-kalia focus:ring-1 focus:border-primary-kalia h-32"
                                required
                            />
                        </div>
                        <div className="w-full px-4">
                            <button
                                type="submit"
                                className="text-base font-semibold text-white bg-primary-kalia px-6 py-3 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-300">
                                Send
                            </button>
                        </div>
                        {successMessage && <p className="text-center text-green-500 mt-4">{successMessage}</p>}
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contacts