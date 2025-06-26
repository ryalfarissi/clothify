import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layouts/Sidebar';

const AdminLayout = () => {
    return (
        <section className="bg-gray-50 w-full min-h-screen">
            <Sidebar />
            <main className="ml-72 flex-1 p-8"> 
                <Outlet />
            </main>
        </section>
    );
};

export default AdminLayout;