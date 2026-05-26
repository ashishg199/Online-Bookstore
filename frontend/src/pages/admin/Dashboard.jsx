import { useEffect, useState } from "react";

import AdminSidebar from "../../components/AdminSidebar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            title="Total Books"
            value={stats.totalBooks}
          />

          <Card
            title="Customers"
            value={stats.totalCustomers}
          />

          <Card
            title="Orders"
            value={stats.totalOrders}
          />

          <Card
            title="Revenue"
            value={`₹${stats.totalRevenue}`}
          />
        </div>
      </main>
    </div>
  );
}

function Card({
  title,
  value
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h3 className="text-gray-500 text-sm mb-3">
        {title}
      </h3>

      <p className="text-4xl font-bold text-indigo-600">
        {value}
      </p>
    </div>
  );
}
