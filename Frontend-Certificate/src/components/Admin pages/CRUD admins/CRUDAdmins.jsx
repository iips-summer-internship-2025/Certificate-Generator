// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// // Mock data for admins
// const mockAdmins = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     role: "Admin",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     role: "Super Admin",
//   },
// ];

// export default function CrudAdmins() {
//   const [admins, setAdmins] = useState(mockAdmins);
//   const [formData, setFormData] = useState({
//     name: "Admin Name",
//     email: "admin@email.com",
//     password: "Password",
//   });
//   const [nextId, setNextId] = useState(Math.max(...mockAdmins.map(admin => admin.id)) + 1);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleAddAdmin = (e) => {
//     e.preventDefault();
//     const newAdmin = {
//       id: nextId,
//       name: formData.name,
//       email: formData.email,
//       role: "Admin",
//     };
//     setAdmins([...admins, newAdmin]);
//     setNextId(nextId + 1);
//     // Reset form
//     setFormData({
//       name: "Admin Name",
//       email: "admin@email.com",
//       password: "Password",
//     });
//   };

//   const handleEdit = (adminId) => {
//     console.log("Editing admin:", adminId);
//   };

//   const handleDelete = (adminId) => {
//     setAdmins(admins.filter(admin => admin.id !== adminId));
//   };

//   return (
//     <div className=" flex flex-col gap-10 p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-blue-600">CRUD Admins</h1>
//       </div>

//       {/* Add Admin Form */}
//       <Card className="mb-8">
//         <CardContent className="p-6">
//           <div className="flex justify-between items-start ">
//             <form onSubmit={handleAddAdmin} className="flex gap-6 p-4 flex-1">
//               <div className="space-y-2">
//                 <Label htmlFor="adminName" className="text-gray-700">Name</Label>
//                 <Input
//                   id="adminName"
//                   placeholder={formData.name}
//                   // placeHolder={formData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   className="w-40"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="adminEmail" className="text-gray-700">Email</Label>
//                 <Input
//                   id="adminEmail"
//                   type="email"
//                   placeholder="Email"
//                   // value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="w-48"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="adminPassword" className="text-gray-700">Password</Label>
//                 <Input
//                   id="adminPassword"
//                   type="password"
//                   placeholder={formData.password}
//                   onChange={(e) => handleInputChange("password", e.target.value)}
//                   className="w-40"
//                 />
//               </div>
//             </form>

//             <Button 
//               onClick={handleAddAdmin}
//               className=" relative self-center m-4 text-white  bg-blue-600 hover:bg-blue-700"
//             >
//               Add Admin
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Admins Table */}
//       <Card className=' p-3'>
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-blue-50">
//                 <TableHead className="font-semibold text-gray-700">Name</TableHead>
//                 <TableHead className="font-semibold text-gray-700">Email</TableHead>
//                 <TableHead className="font-semibold text-gray-700">Role</TableHead>
//                 <TableHead className="font-semibold text-gray-700">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {admins.map((admin) => (
//                 <TableRow key={admin.id}>
//                   <TableCell>{admin.name}</TableCell>
//                   <TableCell>{admin.email}</TableCell>
//                   <TableCell>{admin.role}</TableCell>
//                   <TableCell>
//                     <div className="flex gap-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
//                         onClick={() => handleEdit(admin.id)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleDelete(admin.id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockAdmins = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Super Admin",
  },
];

export default function CrudAdmins() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [formData, setFormData] = useState({
    name: "Admin Name",
    email: "admin@email.com",
    password: "Password",
  });
  const [nextId, setNextId] = useState(Math.max(...mockAdmins.map((a) => a.id)) + 1);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    const newAdmin = {
      id: nextId,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "Admin",
    };
    // After successful login, for example after fetching the token from your backend:
    const token = response.token; // or response.access if using JWT
    localStorage.setItem('token', token);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/crud-admins/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAdmin),
      });

      if (!res.ok) throw new Error("Failed to add admin");

      // Update frontend immediately
      setAdmins((prev) => [...prev, { ...newAdmin, password: undefined }]);
      setNextId(nextId + 1);

      // Reset form and show message
      setFormData({
        name: "Admin Name",
        email: "admin@email.com",
        password: "Password",
      });
      setSuccessMessage("Admin added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(error);
      alert("Error adding admin");
    }
  };

  const handleEdit = (adminId) => {
    console.log("Editing admin:", adminId);
  };

  const handleDelete = (adminId) => {
    setAdmins(admins.filter((admin) => admin.id !== adminId));
  };

  return (
    <div className="flex flex-col gap-10 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">CRUD Admins</h1>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="text-green-600 font-medium bg-green-100 border border-green-300 rounded p-3 w-fit">
          {successMessage}
        </div>
      )}

      {/* Add Admin Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-start ">
            <form onSubmit={handleAddAdmin} className="flex gap-6 p-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor="adminName" className="text-gray-700">Name</Label>
                <Input
                  id="adminName"
                  placeholder={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="text-gray-700">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-48"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword" className="text-gray-700">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-40"
                />
              </div>
            </form>

            <Button
              onClick={handleAddAdmin}
              className="relative self-center m-4 text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Admin
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admins Table */}
      <Card className="p-3">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Email</TableHead>
              <TableHead className="font-semibold text-gray-700">Role</TableHead>
              <TableHead className="font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
                      onClick={() => handleEdit(admin.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
