import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import { useAsyncError } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignOne = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Check if all required fields are filled
    if (
      !data.FirstName ||
      !data.LastName ||
      !data.Email ||
      !data.Mobile ||
      !data.password
    ) {
      console.error("Required fields are missing.");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5169/api/User/Register",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("lhlloo")

      if (result.status === 200) {
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        // ✅ Clear the form here after success
        reset({
          FirstName: "",
          LastName: "",
          Email: "",
          Mobile: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else if (result.status == 356) {
        toast.warning("Email or Mobile number already exists");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const password = watch("password"); // Watch password field

  useEffect(() => {
    fetch("http://localhost:5169/Location/GetCountries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countryModel);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`http://localhost:5169/Location/GetStates/${selectedCountry}`)
        .then((res) => res.json())
        .then((data) => {
          setStates(data.stateModel);
        })
        .catch((error) => {
          console.error("Error fetching states: ", error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetch(`http://localhost:5169/Location/GetDistricts/${selectedState}`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data.distModel);
        });
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`http://localhost:5169/Location/GetTalukas/${selectedDistrict}`)
        .then((res) => res.json())
        .then((data) => {
          setTalukas(data.talukaModel);
        });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedTaluka) {
      fetch(`http://localhost:5169/Location/GetVillages/${selectedTaluka}`)
        .then((res) => res.json())
        .then((data) => {
          setVillages(data.villageModel);
        });
    }
  }, [selectedTaluka]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className=" bg-black px-6 py-8 sm:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Create Your Account
              </h2>
              <p className="text-gray-300 text-center mt-2 text-sm sm:text-base">
                Join us today and get started
              </p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* First Name */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("FirstName", {
                          required: "First name is required",
                        })}
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        placeholder="Enter your first name"
                      />
                      {errors.FirstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.FirstName?.message}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("LastName", { required: "Last name is required" })}
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        placeholder="Enter your last name"
                      />
                      {errors.LastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.LastName?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("Email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid Email Format",
                          },
                        })}
                        type="email"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        placeholder="Enter your email address"
                      />
                      {errors.Email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.Email?.message}
                        </p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("Mobile", {
                          required: "Mobile is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Mobile number is not valid",
                          },
                        })}
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        placeholder="Enter 10-digit mobile number"
                      />
                      {errors.Mobile && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.Mobile?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Location Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Country */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("countryId", {
                          required: "Please select country",
                        })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        value={selectedCountry}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                          clearErrors("countryId");
                        }}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => {
                          return (
                            <option key={country.countryId} value={country.countryId}>
                              {country.countryName}
                            </option>
                          );
                        })}
                      </select>
                      {errors.countryId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.countryId?.message}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("stateId", { required: "Please select state" })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          clearErrors("stateId");
                        }}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.stateId} value={state.stateId}>
                            {state.stateName}
                          </option>
                        ))}
                      </select>
                      {errors.stateId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.stateId?.message}
                        </p>
                      )}
                    </div>

                    {/* District */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        District <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("distId", { required: "Please select district" })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        value={selectedDistrict}
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          clearErrors("distId");
                        }}
                      >
                        <option value="">Select District</option>
                        {districts.map((dist) => (
                          <option key={dist.distId} value={dist.distId}>
                            {dist.distName}
                          </option>
                        ))}
                      </select>
                      {errors.distId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.distId?.message}
                        </p>
                      )}
                    </div>

                    {/* Taluka */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Taluka <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("talukaId", { required: "Please select taluka" })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        value={selectedTaluka}
                        onChange={(e) => {
                          setSelectedTaluka(e.target.value);
                          clearErrors("talukaId");
                        }}
                      >
                        <option value="">Select Taluka</option>
                        {talukas.map((taluka) => (
                          <option key={taluka.talukaId} value={taluka.talukaId}>
                            {taluka.talukaName}
                          </option>
                        ))}
                      </select>
                      {errors.talukaId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.talukaId?.message}
                        </p>
                      )}
                    </div>

                    {/* Village */}
                    <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Village <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("villageId", {
                          required: "Please select village",
                        })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        value={selectedVillage}
                        onChange={(e) => {
                          setSelectedVillage(e.target.value);
                          clearErrors("villageId");
                        }}
                      >
                        <option value="">Select Village</option>
                        {villages.map((village) => (
                          <option key={village.villageId} value={village.villageId}>
                            {village.villageName}
                          </option>
                        ))}
                      </select>
                      {errors.villageId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.villageId?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Security Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Password */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be 6 character long",
                            },
                          })}
                          type={showPassword ? "text" : "password"}
                          className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password?.message}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                          type={showCnfPassword ? "text" : "password"}
                          className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCnfPassword(!showCnfPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {showCnfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.confirmPassword?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:from-gray-800 hover:to-gray-600 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignOne;