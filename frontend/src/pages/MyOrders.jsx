import {
  useEffect,
  useState
} from "react";

import {
  useAuth
} from "../context/AuthContext";

export default function MyOrders() {
  const {
    token
  } = useAuth();

  const [orders,
    setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      const res =
        await fetch(
          "http://localhost:5000/api/orders/my-orders",
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

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="grid gap-6">
        {orders.map(
          (order) => (
            <div
              key={
                order._id
              }
              className="bg-white p-6 rounded-2xl shadow"
            >
              <div className="flex justify-between mb-5">
                <h2 className="font-bold text-lg">
                  Order #
                  {order._id.slice(
                    -8
                  )}
                </h2>

                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full">
                  {
                    order.orderStatus
                  }
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="flex justify-between"
                    >
                      <p>
                        {
                          item.title
                        }
                        ×
                        {
                          item.quantity
                        }
                      </p>

                      <p>
                        ₹
                        {
                          item.price
                        }
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="border-t mt-5 pt-5 font-bold text-right">
                ₹
                {
                  order.totalAmount
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}