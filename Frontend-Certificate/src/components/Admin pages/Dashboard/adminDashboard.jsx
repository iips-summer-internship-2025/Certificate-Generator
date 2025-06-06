import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Send, 
  Eye, 
  UsersRound, 
  Lock 
} from "lucide-react";

const dashboardCards = [
  {
    title: "CRUD Admins",
    description: "Add, edit, or remove admins",
    icon: Plus,
    href: "/admin/crud-admins",
    linkText: "Go to CRUD Admins",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Send Certificate",
    description: "Issue certificates to users",
    icon: Send,
    href: "/admin/send-certificate",
    linkText: "Send Certificate",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "View Certificates",
    description: "See all issued certificates",
    icon: Eye,
    href: "/admin/view-certificates",
    linkText: "View Certificates",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "View Admins",
    description: "List of all admins",
    icon: UsersRound,
    href: "/admin/view-admins",
    linkText: "View Admins",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Change Password",
    description: "Update your password",
    icon: Lock,
    href: "/admin/change-password",
    linkText: "Change Password",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  }
];

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Welcome, Super Admin!
        </h1>
        <p className="text-gray-600">
          Manage admins, certificates, and your account easily.
        </p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          
          return (
            <Link 
                      to={card.href}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                   
            <Card key={index} className=" p-4 text-justify hover:shadow-md transition-shadow">
              <CardContent className="">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                  <div className="flex flex-col gap-4 "> 
                    <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                    
                  </div>
                </div>
              </CardContent>
            </Card>
             </Link>
          );
        })}
      </div>
    </div>
  );
}