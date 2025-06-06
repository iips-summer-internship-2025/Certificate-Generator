import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";

export const AdminLayout = () => {
  return (
    <div className=" relative w-screen flex min-h-[100dvh] bg-gray-50">
      <Sidebar />
      <main className=" relative flex-1 m-4" >
        <Outlet />
      </main>
    </div>
  );
};