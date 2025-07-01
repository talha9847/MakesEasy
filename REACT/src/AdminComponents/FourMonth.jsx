"use client";

import { Users, Edit, Trash2 } from "lucide-react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import axios from "axios";
export const FourMonth = () => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  const [students, setStudents] = useState([]);
  const [companion, setCompanion] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getCompanions = async () => {
    const result = await axios.get(
      "http://localhost:5169/api/FourMonth/GetFourMonth",
      { withCredentials: true }
    );
    if (result.status == 200) {
      console.log(result.data.result);
      setCompanion(result.data.result);
    }
  };

  useEffect(() => {
    getCompanions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="navbar border-2 border-red-400 h-12">
        <Navbar />
      </div>

      <div className="lg:mx-8 ml-0 px-3 sm:px-4 lg:px-6">
        {/* Header Section */}
        <div className="top flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl flex items-center gap-3 font-bold text-gray-800">
            <Users className="hover:scale-125 hover:cursor-pointer transition-transform duration-200 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            Companions Of 4-Month Khuruj
          </h1>
        </div>

        {/* Table Section */}
        <div className="table mt-4 sm:mt-6 lg:mt-8 w-full">
          <div className="head flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
            <h1 className="pl-4 sm:pl-6 text-lg sm:text-xl font-sans font-semibold py-4 bg-black text-white">
              List Of Companions
            </h1>

            <div className="hidden md:block overflow-x-auto">
              <div className="max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        No.
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Name
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Total
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Last Time
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {companion.map((c, ind) => (
                      <tr
                        key={c.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {ind + 1}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.name}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.total}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.lastTime}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditing(true);
                                editFunction(c);
                                setEditId(c.id);
                              }}
                              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Edit size={16} className="text-blue-700" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Mobile Card View */}
            <div className="md:hidden max-h-[450px] overflow-y-auto">
              {companion.map((c, ind) => (
                <div
                  key={c.id}
                  className="relative border-b border-gray-100 last:border-b-0 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300"
                >
                  {/* Card Number Badge */}
                  <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                    {ind + 1}
                  </div>

                  <div className="p-4 pl-12">
                    {/* Header with Name and Action */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base leading-tight">
                          {c.name}
                        </h3>
                        <div className="w-6 h-0.5 bg-black mt-1"></div>
                      </div>
                      <button
                        onClick={() => {
                          setEditing(true);
                          editFunction(c);
                          setEditId(c.id);
                        }}
                        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <Edit size={14} className="text-blue-700" />
                      </button>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 gap-2">
                      <div className=" rounded-lg p-2.5 border-l-4 border-black">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            Total Count
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {c.total}
                          </span>
                        </div>
                      </div>
                      
                      <div className=" rounded-lg p-2.5 border-l-4 border-black">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            Last Time
                          </span>
                          <span className="text-sm font-medium text-gray-800">
                            {c.lastTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty State */}
              {companion.length === 0 && (
                <div className="p-8 text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-sm">No companions found</p>
                </div>
              )}
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default FourMonth;