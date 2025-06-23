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
import { useState, useEffect } from "react";
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

export default function CrudAdmins() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [nextId, setNextId] = useState(1);
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
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "admin",
    };

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/crud-admins/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();

      if (!res.ok) {
        const errors = Object.entries(data)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        alert(`Failed to add admin:\n${errors}`);
        return;
      }

      setAdmins((prev) => [...prev, { ...data, password: undefined }]);
      setNextId((prev) => prev + 1);

      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setSuccessMessage("Admin added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(error);
      alert("Error adding admin");
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/crud-admins/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setAdmins(data);
          setNextId(data.length > 0 ? Math.max(...data.map((a) => a.id)) + 1 : 1);
        } else {
          console.error("Failed to fetch admins", data);
        }
      } catch (error) {
        console.error("Fetch Admins Error:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleEdit = (adminId) => {
    console.log("Editing admin:", adminId);
    // Implement edit logic here
  };

  const handleDelete = (adminId) => {
    setAdmins(admins.filter((admin) => admin.id !== adminId));
    // Implement backend delete logic if needed
  };

  return (
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold text-blue-600">CRUD Admins</h1>

      {successMessage && (
        <div className="text-green-600 font-medium bg-green-100 border border-green-300 rounded p-3 w-fit">
          {successMessage}
        </div>
      )}

      {/* Add Admin Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleAddAdmin} className="flex justify-between items-start">
            <div className="flex gap-6 flex-1">
              <div className="space-y-2">
                <Label htmlFor="adminUsername" className="text-gray-700">Username</Label>
                <Input
                  id="adminUsername"
                  required
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="text-gray-700">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-48"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword" className="text-gray-700">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-40"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="relative self-center m-4 text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Admin
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Admins Table */}
      <Card className="p-3">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold text-gray-700">Username</TableHead>
              <TableHead className="font-semibold text-gray-700">Email</TableHead>
              <TableHead className="font-semibold text-gray-700">Role</TableHead>
              <TableHead className="font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.username}</TableCell>
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