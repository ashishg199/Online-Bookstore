import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RAZORPAY_KEY =
  process.env.REACT_APP_RAZORPAY_KEY_ID;

export default function Checkout() {
  const {
    cart,
    totalPrice,
    clearCart
  } = useCart();

  const { token } =
    useAuth();

  const navigate =
    useNavigate();

  const handlePayment =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/api/orders/payment",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`
              },

              body:
                JSON.stringify(
                  {
                    amount:
                      totalPrice *
                      100,

                    shippingAddress:
                      "Mumbai",

                    items:
                      cart.map(
                        (
                          item
                        ) => ({
                          bookId:
                            item._id,

                          title:
                            item.title,

                          quantity:
                            item.quantity,

                          price:
                            item.price
                        })
                      )
                  }
                )
            }
          );

        const data =
          await response.json();

        const options =
          {
            key: RAZORPAY_KEY,

            amount:
              data
                .razorpayOrder
                .amount,

            currency:
              "INR",

            name:
              "Book Store",

            description:
              "Book Purchase",

            order_id:
              data
                .razorpayOrder
                .id,

            handler:
              async (
                response
              ) => {
                const verifyRes =
                  await fetch(
                    "http://localhost:5000/api/orders/verify-payment",
                    {
                      method:
                        "POST",

                      headers:
                        {
                          "Content-Type":
                            "application/json",

                          Authorization: `Bearer ${token}`
                        },

                      body:
                        JSON.stringify(
                          {
                            ...response,

                            orderId:
                              data.orderId
                          }
                        )
                    }
                  );

                const verifyData =
                  await verifyRes.json();

                if (
                  verifyData.success
                ) {
                  clearCart();

                  alert(
                    "Payment successful"
                  );

                  navigate(
                    "/my-orders"
                  );
                }
              }
          };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();
      } catch (error) {
        console.error(
          error
        );

        alert(
          "Payment failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow w-[500px]">
        <h1 className="text-3xl font-bold mb-5">
          Checkout
        </h1>

        <div className="space-y-3 mb-6">
          {cart.map(
            (item) => (
              <div
                key={
                  item._id
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
                  {item.price *
                    item.quantity}
                </p>
              </div>
            )
          )}
        </div>

        <h2 className="text-2xl font-bold mb-5">
          Total:
          ₹
          {totalPrice}
        </h2>

        <button
          onClick={
            handlePayment
          }
          className="w-full bg-indigo-600 text-white p-4 rounded-xl"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}