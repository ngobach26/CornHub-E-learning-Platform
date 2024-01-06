import React from 'react';
import AdminNavbar from "../AdminNavbar";
import AdminMenu from "../AdminMenu";
import AdminFooter from "../AdminFooter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

const AdminLayout = () => {
    return (
        <div className="font-sans text-white bg-slate-800">
        <AdminNavbar />
        <div className="flex">
            <div className="w-64 px-5 py-1.5 border-r-[2px] border-solid">
            <AdminMenu />
            </div>
            <div className="px-5 py-1.25 w-full">
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
            </div>
        </div>
        <AdminFooter />
        </div>
    );
};

export default AdminLayout;