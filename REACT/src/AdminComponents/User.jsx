"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Search,
  UserCheck,
  UserX,
  Filter,
} from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const dummyData = {
  approved: [
    {
      id: 1,
      fname: "James",
      lname: "Smith",
      mobile: "1234567890",
      status: "approved",
      email: "james.smith@example.com",
      date: "2023-05-15",
    },
    {
      id: 5,
      fname: "Emily",
      lname: "Johnson",
      mobile: "3332221111",
      status: "approved",
      email: "emily.johnson@example.com",
      date: "2023-06-22",
    },
    {
      id: 8,
      fname: "William",
      lname: "Brown",
      mobile: "7778889999",
      status: "approved",
      email: "william.brown@example.com",
      date: "2023-07-10",
    },
  ],
  pending: [
    {
      id: 2,
      fname: "Charlotte",
      lname: "Davis",
      mobile: "9876543210",
      status: "pending",
      email: "charlotte.davis@example.com",
      date: "2023-08-05",
    },
    {
      id: 3,
      fname: "George",
      lname: "Wilson",
      mobile: "5555555555",
      status: "pending",
      email: "george.wilson@example.com",
      date: "2023-08-12",
    },
    {
      id: 6,
      fname: "Alice",
      lname: "Taylor",
      mobile: "1112223333",
      status: "pending",
      email: "alice.taylor@example.com",
      date: "2023-08-18",
    },
  ],
  rejected: [
    {
      id: 4,
      fname: "Daniel",
      lname: "Lee",
      mobile: "4444444444",
      status: "rejected",
      email: "daniel.lee@example.com",
      date: "2023-07-25",
    },
    {
      id: 7,
      fname: "Sophia",
      lname: "Walker",
      mobile: "6667778888",
      status: "rejected",
      email: "sophia.walker@example.com",
      date: "2023-08-01",
    },
  ],
};

const UserManagement = () => {
  const [status, setStatus] = useState("approved");
  const [users, setUsers] = useState([]);
  const [length, setLength] = useState({
    approved: [],
    pending: [],
    rejected: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   setUsers(dummyData[status]);
  // }, [status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(
          "http://localhost:5169/api/User/PendingUser/4"
        );
        var data = response.data;
        console.log(data);
        setLength({
          approved: data.approved,
          pending: data.pending,
          rejected: data.rejected,
        });

        console.log(length.approved.length);
        const talha = data[status];

        setUsers(talha);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [status]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600  text-white">
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgb(208,187,55)] text-white">
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Navbar />
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1 overflow-y-auto p-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-black">
                  User Management
                </h1>
                <p className="text-gray-600 mt-1">
                  View and manage user accounts
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 mr-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg leading-6 font-medium text-black">
                  Users
                </h3>

                <div className="relative mt-4 md:mt-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 h-9 w-full md:w-64 rounded-md border border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-4">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                      <button
                        onClick={() => {
                          setStatus("approved");
                        }}
                        className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                          status === "Approved"
                            ? "border-black text-black"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="hidden md:inline">Approved</span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                            {length.approved.length}
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setStatus("pending");
                        }}
                        className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                          status === "Pending"
                            ? "border-black text-black bg-black"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="hidden md:inline">Pending</span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                            {length.pending.length}
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => setStatus("rejected")}
                        className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                          status === "Rejected"
                            ? "border-black text-black"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          <span className="hidden md:inline">Rejected</span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                            {length.rejected.length}
                          </span>
                        </div>
                      </button>
                    </nav>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="overflow-x-auto rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-black">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Mobile
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Status
                          </th>
                          {status === "pending" && (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.length === 0 ? (
                          <tr>
                            <td
                              colSpan={status === "Pending" ? 6 : 5}
                              className="px-6 py-4 text-center text-sm text-gray-500 hover:text-black"
                            >
                              No users found
                            </td>
                          </tr>
                        ) : (
                          users.map((user) => (
                            <tr key={user.id} className="">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-800">
                                    <span className="font-medium">
                                      {user.name.charAt(0).toUpperCase()}
                                      {user.name.split(" ")[1][0].toUpperCase()}
                                      {/* {user.lname.charAt(0)} */}
                                    </span>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-black hover:text-black cursor-pointer">
                                      {user.name.toUpperCase()}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black hover:text-black cursor-pointer">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                {user.mobile}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                className="cursor-pointer"
                                  onClick={() => {
                                    console.log("talhaaamalekk");
                                  }}
                                >
                                  {getStatusBadge(user.status)}
                                </div>
                              </td>
                              {status === "pending" && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                    <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-black bg-white hover:bg-gray-100">
                                      <UserCheck className="h-4 w-4 mr-1" />
                                      <span className="hidden sm:inline">
                                        Approve
                                      </span>
                                    </button>
                                    <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-black bg-white hover:bg-gray-100">
                                      <UserX className="h-4 w-4 mr-1" />
                                      <span className="hidden sm:inline">
                                        Reject
                                      </span>
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
