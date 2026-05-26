import {
  useEffect,
  useState
} from "react";

import AdminSidebar from "../../components/AdminSidebar";

export default function Customers() {
  const [customers,
    setCustomers] =
    useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers =
    async () => {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          "http://localhost:5000/api/admin/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      const data =
        await res.json();

      setCustomers(
        data.customers
      );
    };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Customers
        </h1>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Phone
                </th>

                <th className="p-4">
                  Address
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map(
                (
                  customer
                ) => (
                  <tr
                    key={
                      customer._id
                    }
                    className="border-b"
                  >
                    <td className="p-4">
                      {
                        customer.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        customer.email
                      }
                    </td>

                    <td className="p-4">
                      {
                        customer.phone
                      }
                    </td>

                    <td className="p-4">
                      {
                        customer.address
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}