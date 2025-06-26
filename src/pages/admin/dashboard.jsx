// File: dashboard.jsx

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // <-- Tambahkan Filler untuk area di bawah garis
} from "chart.js";

// Registrasi komponen Chart.js, termasuk Filler
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  // --- KONFIGURASI GRAFIK DENGAN TEMA BARU ---

  const themeColor = 'rgb(17, 24, 39)'; // Warna utama (abu-abu gelap/hitam)
  const themeColorTransparent = 'rgba(17, 24, 39, 0.1)';

  // Data utama tetap sama, hanya styling yang diubah
  const mainChartData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Website Visitors",
        data: [120, 200, 150, 220, 300, 250, 400],
        borderColor: themeColor,
        backgroundColor: themeColorTransparent,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const mainChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'rgb(107, 114, 128)' }, // text-gray-500
      },
      y: {
        grid: { color: 'rgba(229, 231, 235, 1)' }, // border-gray-200
        ticks: { color: 'rgb(107, 114, 128)' },
      },
    },
  };

  const smallChartData = {
    labels: Array(12).fill(""),
    datasets: [
      {
        data: [50, 45, 60, 75, 90, 85, 95, 100, 120, 110, 95, 70],
        borderColor: themeColor,
        backgroundColor: themeColorTransparent,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const smallChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { display: false } },
      y: { grid: { display: false }, ticks: { display: false } },
    },
    elements: { point: { radius: 0 } },
  };

  const [userName, setUserName] = useState("User");

  useEffect(() => {
    setUserName(localStorage.getItem("name") || "User");
  }, []);

  return (
    // Menggunakan Grid untuk layout utama yang responsif
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
      
      {/* Kolom Kiri & Tengah (Konten Utama) */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        
        {/* Header Sambutan */}
        <div>
          <p className="text-gray-500">Selamat Datang Kembali,</p>
          <h1 className="text-4xl font-bold text-gray-900">{userName}</h1>
        </div>

        {/* Kartu Grafik Utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-96">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pengunjung Minggu ini</h2>
          <div className="h-full w-full pb-8">
            <Line data={mainChartData} options={mainChartOptions} />
          </div>
        </div>

        {/* Kartu Statistik Kecil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Kartu: Hari Ini */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">Hari Ini</h3>
            <div className="flex-grow flex items-center mt-4">
              <div className="w-1/2">
                <p className="text-4xl font-bold text-gray-900">258</p>
                <p className="text-sm text-gray-500">Pengguna</p>
                <p className="text-sm text-green-500 mt-2">+10% dari kemarin</p>
              </div>
              <div className="w-1/2 h-20">
                <Line data={smallChartData} options={smallChartOptions} />
              </div>
            </div>
          </div>

          {/* Kartu: Total Pengunjung */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">Total Pengunjung</h3>
            <div className="flex-grow flex items-center mt-4">
              <div className="w-1/2">
                <p className="text-4xl font-bold text-gray-900">4,5K</p>
                <p className="text-sm text-gray-500">Pengguna</p>
                <p className="text-sm text-green-500 mt-2">+258 hari ini</p>
              </div>
              <div className="w-1/2 h-20">
                <Line data={{...smallChartData, datasets: [{...smallChartData.datasets[0], data: [5, 7, 8, 12, 15, 13, 11, 9, 10, 14, 16, 18]}]}} options={smallChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kolom Kanan (Side Panel) */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Paling Sering Dikunjungi
          </h2>
          <div className="flex flex-col divide-y divide-gray-200">
            {['Hero', 'Contacts', 'News', 'Projects', 'Services'].map((item, index) => (
              <div key={item} className="flex items-center justify-between py-4">
                <p className="text-gray-800">{`${index + 1}. ${item}`}</p>
                <p className="text-sm text-gray-500">{`${Math.floor(Math.random() * 500) + 100} views`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;