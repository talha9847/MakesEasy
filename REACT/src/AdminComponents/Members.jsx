// "use client"

// import { useState, useEffect } from "react"
// import Navbar from "./Navbar"
// import Sidebar from "./Sidebar"

// export const Members = () => {
//   const [members, setMembers] = useState([])
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     age: "",
//     waqt: "",
//     occupation: "",
//   })
//   const [isEditing, setIsEditing] = useState(false)
//   const [editId, setEditId] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortField, setSortField] = useState("name")
//   const [sortDirection, setSortDirection] = useState("asc")
//   const [showModal, setShowModal] = useState(false)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteId, setDeleteId] = useState(null)

//   // Mock IDs from route params - in a real implementation, these would come from your router
//   const routeParams = {
//     vId: 1,
//     tId: 1,
//     dId: 1,
//     sId: 1,
//     cId: 1,
//   }

//   useEffect(() => {
//     // Fetch members data
//     fetchMembers()
//   }, [])

//   const fetchMembers = async () => {
//     try {
//       // Mock data for now - replace with actual API call
//       const mockData = [
//         { id: 1, name: "John Doe", mobile: "1234567890", age: 30, waqt: "Morning", occupation: "Engineer" },
//         { id: 2, name: "Jane Smith", mobile: "9876543210", age: 25, waqt: "Evening", occupation: "Doctor" },
//         { id: 3, name: "Robert Johnson", mobile: "5551234567", age: 45, waqt: "Afternoon", occupation: "Teacher" },
//         { id: 4, name: "Sarah Williams", mobile: "7778889999", age: 32, waqt: "Morning", occupation: "Designer" },
//         { id: 5, name: "Michael Brown", mobile: "3334445555", age: 28, waqt: "Evening", occupation: "Developer" },
//       ]
//       setMembers(mockData)
//     } catch (error) {
//       console.error("Error fetching members:", error)
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (isEditing) {
//       // Update existing member
//       try {
//         // API call would go here with route params
//         // const response = await fetch(`api/InsertPeople/${routeParams.vId}/${routeParams.tId}/${routeParams.dId}/${routeParams.sId}/${routeParams.cId}`, {
//         //   method: 'PUT',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(formData)
//         // });

//         const updatedMembers = members.map((member) => (member.id === editId ? { ...member, ...formData } : member))
//         setMembers(updatedMembers)
//         resetForm()
//         setShowModal(false)
//       } catch (error) {
//         console.error("Error updating member:", error)
//       }
//     } else {
//       // Add new member
//       try {
//         // API call would go here with route params
//         // const response = await fetch(`api/InsertPeople/${routeParams.vId}/${routeParams.tId}/${routeParams.dId}/${routeParams.sId}/${routeParams.cId}`, {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(formData)
//         // });

//         const newMember = {
//           id: members.length + 1,
//           ...formData,
//         }
//         setMembers([...members, newMember])
//         resetForm()
//         setShowModal(false)
//       } catch (error) {
//         console.error("Error adding member:", error)
//       }
//     }
//   }

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       mobile: "",
//       age: "",
//       waqt: "",
//       occupation: "",
//     })
//     setIsEditing(false)
//     setEditId(null)
//   }

//   const handleEdit = (member) => {
//     setFormData({
//       name: member.name,
//       mobile: member.mobile,
//       age: member.age,
//       waqt: member.waqt,
//       occupation: member.occupation,
//     })
//     setIsEditing(true)
//     setEditId(member.id)
//     setShowModal(true)
//   }

//   const handleDelete = async (id) => {
//     try {
//       // API call would go here
//       const filteredMembers = members.filter((member) => member.id !== id)
//       setMembers(filteredMembers)
//       setShowDeleteModal(false)
//     } catch (error) {
//       console.error("Error deleting member:", error)
//     }
//   }

//   const confirmDelete = (id) => {
//     setDeleteId(id)
//     setShowDeleteModal(true)
//   }

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortField(field)
//       setSortDirection("asc")
//     }
//   }

//   const getSortIcon = (field) => {
//     if (sortField !== field) return null
//     return sortDirection === "asc" ? "↑" : "↓"
//   }

//   const filteredMembers = members.filter((member) => {
//     return (
//       member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.mobile.includes(searchTerm) ||
//       member.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.waqt.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   const sortedMembers = [...filteredMembers].sort((a, b) => {
//     let aValue = a[sortField]
//     let bValue = b[sortField]

//     // Handle numeric fields
//     if (sortField === "age") {
//       aValue = Number(aValue)
//       bValue = Number(bValue)
//     } else {
//       // For string fields
//       aValue = String(aValue).toLowerCase()
//       bValue = String(bValue).toLowerCase()
//     }

//     if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
//     if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
//     return 0
//   })

//   const waqtOptions = ["Morning", "Afternoon", "Evening", "Night"]

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <div className="border-b border-gray-200 bg-white shadow-sm">
//         <Navbar />
//       </div>

//       <div className="flex flex-1">
//         <div className="w-64 border-r border-gray-200 bg-white shadow-sm">
//           <Sidebar />
//         </div>

//         <div className="flex-1 px-6 py-16 ">
//           <div className="mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="mr-3 h-8 w-8"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="9" cy="7" r="4"></circle>
//                     <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//                     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                   </svg>
//                   Members
//                 </h1>
//                 <p className="text-gray-600">Manage your members database</p>
//               </div>

//               <button
//                 onClick={() => {
//                   resetForm()
//                   setShowModal(true)
//                 }}
//                 className="px-4 py-2 bg-black text-white rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//                   <circle cx="9" cy="7" r="4"></circle>
//                   <path d="M19 8v6"></path>
//                   <path d="M16 11h6"></path>
//                 </svg>
//                 Add Member
//               </button>
//             </div>

//             <div className="mt-6 flex items-center gap-4">
//               <div className="relative flex-1 max-w-md">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <circle cx="11" cy="11" r="8"></circle>
//                   <path d="m21 21-4.3-4.3"></path>
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Search members..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M18 6 6 18"></path>
//                       <path d="m6 6 12 12"></path>
//                     </svg>
//                   </button>
//                 )}
//               </div>

//               <select
//                 value={sortField}
//                 onChange={(e) => {
//                   setSortField(e.target.value)
//                   setSortDirection("asc")
//                 }}
//                 className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//               >
//                 <option value="name">Sort by Name</option>
//                 <option value="age">Sort by Age</option>
//                 <option value="waqt">Sort by Waqt</option>
//                 <option value="occupation">Sort by Occupation</option>
//               </select>

//               <button
//                 onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
//                 className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                 title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}
//               >
//                 {sortDirection === "asc" ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="m18 15-6-6-6 6"></path>
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="m6 9 6 6 6-6"></path>
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800">Member List</h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 {filteredMembers.length === members.length
//                   ? `Showing all ${members.length} members`
//                   : `Found ${filteredMembers.length} of ${members.length} members`}
//               </p>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("name")}
//                     >
//                       <div className="flex items-center">Name {getSortIcon("name")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("mobile")}
//                     >
//                       <div className="flex items-center">Mobile {getSortIcon("mobile")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("age")}
//                     >
//                       <div className="flex items-center">Age {getSortIcon("age")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("waqt")}
//                     >
//                       <div className="flex items-center">Waqt {getSortIcon("waqt")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("occupation")}
//                     >
//                       <div className="flex items-center">Occupation {getSortIcon("occupation")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {sortedMembers.length > 0 ? (
//                     sortedMembers.map((member) => (
//                       <tr key={member.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.mobile}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.age}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                             {member.waqt}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.occupation}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               onClick={() => handleEdit(member)}
//                               className="text-gray-600 hover:text-gray-900"
//                               title="Edit"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
//                                 <path d="m15 5 4 4"></path>
//                               </svg>
//                             </button>

//                             <button
//                               onClick={() => confirmDelete(member.id)}
//                               className="text-red-500 hover:text-red-700"
//                               title="Delete"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M3 6h18"></path>
//                                 <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
//                                 <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
//                                 <line x1="10" x2="10" y1="11" y2="17"></line>
//                                 <line x1="14" x2="14" y1="11" y2="17"></line>
//                               </svg>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
//                         {searchTerm ? (
//                           <div className="flex flex-col items-center justify-center text-gray-500">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-8 w-8 mb-2 opacity-50"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <circle cx="11" cy="11" r="8"></circle>
//                               <path d="m21 21-4.3-4.3"></path>
//                             </svg>
//                             <p>No results found for "{searchTerm}"</p>
//                             <button
//                               onClick={() => setSearchTerm("")}
//                               className="mt-2 text-black underline hover:no-underline"
//                             >
//                               Clear search
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex flex-col items-center justify-center text-gray-500">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-8 w-8 mb-2 opacity-50"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//                               <circle cx="9" cy="7" r="4"></circle>
//                               <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//                               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                             </svg>
//                             <p>No members found</p>
//                             <button
//                               onClick={() => setShowModal(true)}
//                               className="mt-2 text-black underline hover:no-underline"
//                             >
//                               Add your first member
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {sortedMembers.length > 0 && (
//               <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
//                 <p className="text-sm text-gray-500">
//                   Showing {sortedMembers.length} {sortedMembers.length === 1 ? "member" : "members"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Member Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">{isEditing ? "Edit Member" : "Add New Member"}</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 {isEditing
//                   ? "Update the member's information below."
//                   : "Fill in the details to add a new member to the system."}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="p-6 space-y-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="name" className="text-sm font-medium text-gray-700 text-right">
//                     Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Full name"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="mobile" className="text-sm font-medium text-gray-700 text-right">
//                     Mobile
//                   </label>
//                   <input
//                     id="mobile"
//                     name="mobile"
//                     type="text"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Phone number"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="age" className="text-sm font-medium text-gray-700 text-right">
//                     Age
//                   </label>
//                   <input
//                     id="age"
//                     name="age"
//                     type="number"
//                     value={formData.age}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Age"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="waqt" className="text-sm font-medium text-gray-700 text-right">
//                     Waqt
//                   </label>
//                   <select
//                     id="waqt"
//                     name="waqt"
//                     value={formData.waqt}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                   >
//                     <option value="">Select time</option>
//                     {waqtOptions.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="occupation" className="text-sm font-medium text-gray-700 text-right">
//                     Occupation
//                   </label>
//                   <input
//                     id="occupation"
//                     name="occupation"
//                     type="text"
//                     value={formData.occupation}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Occupation"
//                   />
//                 </div>
//               </div>

//               <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     resetForm()
//                     setShowModal(false)
//                   }}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
//                 >
//                   {isEditing ? "Update Member" : "Add Member"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 Are you sure you want to delete this member? This action cannot be undone.
//               </p>
//             </div>

//             <div className="px-6 py-4 flex justify-end gap-2">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteId)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
