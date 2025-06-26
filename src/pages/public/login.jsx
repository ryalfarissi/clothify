import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Impor apiClient, bukan axios biasa
import apiClient from '../../api/axiosConfig'; // Pastikan path ini sesuai dengan struktur folder Anda

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [inputError, setInputError] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error setiap kali submit
        setInputError({ email: false, password: false }); // Reset error input

        try {
            // 2. Gunakan apiClient dan URL yang lebih pendek.
            //    Base URL ('http://localhost:7000/api') sudah diatur di dalam apiClient.
            const res = await apiClient.post("/auth/login", {
                email,
                password,
            });

            // 3. Simpan token dan nama pengguna dari respons server ke localStorage.
            //    Ini adalah praktik yang benar untuk menjaga sesi login.
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('name', res.data.name);

            // 4. Arahkan pengguna ke dashboard setelah login berhasil.
            navigate("/dashboard");

        } catch (err) {
            // Tangani error dari server atau jaringan
            const errorMessage = err.response?.data?.message || "Login gagal. Silakan coba lagi.";
            setError(errorMessage);
            
            // Tandai kedua input sebagai error untuk memberikan feedback visual
            setInputError({ email: true, password: true });
        }
    };

    // Fungsi untuk menghapus error pada input saat pengguna mulai mengetik
    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        if (error) {
            setError(""); // Hapus error utama jika ada
        }
        setInputError((prev) => ({ ...prev, [field]: false })); // Hapus highlight error pada input
    };

    // Struktur JSX tetap sama, tidak ada perubahan visual.
    return (
        <div className="relative overflow-hidden">
            <div className="absolute bg-[url('/src/assets/images/kalia1.png')] w-full h-full bg-cover bg-center bg-no-repeat blur-md inset-0 scale-105"></div>
            <div className="relative min-h-screen flex items-center justify-center">
                <Link to="/">
                    <button className='absolute top-10 left-10 py-3 px-5 bg-blue-500 rounded-xl text-white flex gap-2 hover:bg-blue-600'>
                        <svg className="w-5 h-5 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                        </svg>
                        <p className='font-montserrat'>Kembali</p>
                    </button>
                </Link>

                <div className="bg-white px-8 py-8 rounded-lg shadow-md w-full max-w-sm max-lg:w-[90%]">
                    <h2 className="text-2xl font-bold text-center mb-6 font-palanquin text-slate-800">Admin Login</h2>
                    {error && <p className="text-red-500 text-center mb-4 text-sm font-montserrat">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleInputChange(setEmail, 'email')}
                                required
                                className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-1 focus:outline-primary-kalia ${inputError.email ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>
                        <div className="relative mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={handleInputChange(setPassword, 'password')}
                                required
                                className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-1 focus:outline-primary-kalia ${inputError.password ? "border-red-500" : "border-gray-300"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-2/3 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <svg className="w-6 h-6 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;