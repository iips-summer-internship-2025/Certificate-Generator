import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Top Bar for Mobile */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow z-40">
        <button
          className="bg-sky-900 text-white p-2 rounded-md"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle Sidebar"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-sky-900">Admin Panel</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 h-full w-full md:w-[30dvh] bg-sky-950 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:rounded-none rounded-tr-3xl rounded-br-3xl`}
      >
        <Sidebar onLinkClick={() => setSidebarOpen(false)} />
      </div>


      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="relative flex-1 p-4 sm:p-6 md:p-8 overflow-auto mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};
