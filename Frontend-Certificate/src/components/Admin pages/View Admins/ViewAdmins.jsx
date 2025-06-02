import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for admins
const mockAdmins = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    dateCreated: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Super Admin",
    dateCreated: "2024-02-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Admin",
    dateCreated: "2024-03-10",
  },
];

export default function ViewAdmins() {
  const [admins] = useState(mockAdmins);

  return (
    <div className="p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">View Admins</h1>
        <p className="text-gray-600 mt-2">List of all administrators in the system</p>
      </div>

      {/* Admins Table */}
          <Table className=' relative border-2 border-slate-200 w-full rounded-xl'>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">Role</TableHead>
                <TableHead className="font-semibold text-gray-700">Date Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        admin.role === "Super Admin" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </TableCell>
                  <TableCell>{admin.dateCreated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className=" m-3 flex flex-col items-center gap-2">
            <div className="text-4xl font-bold text-blue-600">{admins.length}</div>
            <div className="text-gray-600">Total Admins</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className=" m-3 flex flex-col items-center gap-2">
            <div className="text-4xl font-bold text-purple-600">
              {admins.filter(admin => admin.role === "Super Admin").length}
            </div>
            <div className="text-gray-600">Super Admins</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className=" m-3 flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-green-600">
              {admins.filter(admin => admin.role === "Admin").length}
            </div>
            <div className="text-gray-600">Regular Admins</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}