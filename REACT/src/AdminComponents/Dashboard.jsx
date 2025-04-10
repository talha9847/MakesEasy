import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Activity,
  PieChart,
  TrendingUp,
} from "lucide-react"

export const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 mt-16">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 pt-20 ml-64 ">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your statistics</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Home className="h-6 w-6 text-black" />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  12%
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500">Total Houses</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">88</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  8%
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500">Members</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">88</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black/5 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-black" />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  3%
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500">Students</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">88</h3>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Calendar className="h-6 w-6 text-black" />
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500">4 Month</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">88</h3>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Clock className="h-6 w-6 text-black" />
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500">40 Days</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">88</h3>
              </div>
            </div>
          </div>

          {/* Charts and Calendar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chart 1 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Monthly Overview</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium bg-black text-white rounded-md">Month</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                    Year
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="flex items-center space-x-2 text-gray-400">
                  <BarChart3 className="h-10 w-10" />
                  <span>Chart visualization would appear here</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Community Meeting</p>
                    <p className="text-sm text-gray-500">01/01/01</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Property Inspection</p>
                    <p className="text-sm text-gray-500">02/01/01</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Maintenance Day</p>
                    <p className="text-sm text-gray-500">03/01/01</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities and Upcoming Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Recent Activities</h3>
                <button className="text-sm text-black hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">New member joined</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Monthly report generated</p>
                    <p className="text-sm text-gray-500">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Property value increased</p>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Important Dates</h3>
                <button className="text-sm text-black hover:underline">View Calendar</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <h4 className="font-medium mb-2">Next 3 Days</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Meeting</span>
                      <span>01/01/01</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Inspection</span>
                      <span>02/01/01</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Payment Due</span>
                      <span>03/01/01</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <h4 className="font-medium mb-2">Upcoming</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Maintenance</span>
                      <span>01/01/01</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Community Event</span>
                      <span>02/01/01</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Board Meeting</span>
                      <span>03/01/01</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

