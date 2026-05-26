import {
  useEffect,
  useState
} from "react";

import AdminSidebar from "../../components/AdminSidebar";

export default function Orders() {
  const [orders,
    setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          "http://localhost:5000/api/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      const data =
        await res.json();

      setOrders(
        data.orders
      );
    };

  const updateStatus =
    async (
      id,
      status
    ) => {
      const token =
        localStorage.getItem(
          "token"
        );

      await fetch(
        `http://localhost:5000/api/admin/orders/${id}`,
        {
          method:
            "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`
          },

          body:
            JSON.stringify(
              {
                status
              }
            )
        }
      );

      fetchOrders();
    };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Orders
        </h1>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                <th className="p-4">
                  Customer
                </th>

                <th className="p-4">
                  Amount
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map(
                (
                  order
                ) => (
                  <tr
                    key={
                      order._id
                    }
                    className="border-b"
                  >
                    <td className="p-4">
                      {
                        order
                          .userId
                          ?.name
                      }
                    </td>

                    <td className="p-4">
                      ₹
                      {
                        order.totalAmount
                      }
                    </td>

                    <td className="p-4">
                      {
                        order.orderStatus
                      }
                    </td>

                    <td className="p-4">
                      <select
                        onChange={(
                          e
                        ) =>
                          updateStatus(
                            order._id,
                            e
                              .target
                              .value
                          )
                        }
                        className="border p-2 rounded"
                      >
                        <option>
                          Select
                        </option>

                        <option>
                          processing
                        </option>

                        <option>
                          shipped
                        </option>

                        <option>
                          delivered
                        </option>

                        <option>
                          cancelled
                        </option>
                      </select>
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