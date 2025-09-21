
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import {
  LayoutDashboard,
  Plus,
  Send,
  Eye,
  UsersRound,
  Lock,
  LogOut
} from "lucide-react";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "CRUD Admins", href: "/admin/crud-admins", icon: Plus },
  { name: "Send Certificate", href: "/upload", icon: Send },
  { name: "View Certificates", href: "/admin/view-certificates", icon: Eye },
  { name: "View Admins", href: "/admin/view-admins", icon: UsersRound },
  { name: "Change Password", href: "/admin/change-password", icon: Lock },
];

export const Sidebar = ({ onLinkClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or token here if using auth
    localStorage.removeItem("token"); // Example
    sessionStorage.clear();           // Optional
    if (onLinkClick) onLinkClick();   // Close sidebar if needed

    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="min-h-screen relative p-3 bg-sky-950 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl text-white font-bold">Admin</h1>
          <Badge className="text-white bg-sky-600 text-sm px-2 py-1">
            Super
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-colors",
                isActive
                  ? "bg-sky-600 text-white"
                  : "text-white hover:bg-sky-900 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-500">
        <Button
          variant="default"
          className="w-full bg-sky-700 hover:bg-blue-400 text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};


