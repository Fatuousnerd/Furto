import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const Cart = () => {
  const [cart, setCart] = useState<Array<any>>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleFetch = async () => {
    try {
      const userId = user?._id;
      const res = await axiosInstance.get(`/shop/get-cart/${userId}`);
      console.log(res?.data?.cart);
      setCart(res?.data?.cart || []);
    } catch (err: any) {
      console.error(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [user?._id]);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const total = cart.reduce(
    (acc, item) =>
      acc + parseFloat(item?.product?.price?.$numberDecimal) * item.quantity,
    0
  );
  return (
    <>
      <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
        <h1 style={{ textAlign: "center" }}>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty.</p>
        ) : (
          cart?.map(({ product, quantity }) => (
            <div
              key={product._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "1rem",
              }}
            >
              <img
                src={product?.image}
                alt={product?.name}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <div style={{ flex: 1, marginLeft: "1rem" }}>
                <h3 style={{ margin: 0 }}>{product?.name}</h3>
                <p style={{ fontSize: 14, color: "#555" }}>{product?.desc}</p>
                <p style={{ fontWeight: "bold" }}>
                  ${product?.price?.$numberDecimal}
                </p>
              </div>
              {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div>
                                    <button onClick={() => updateQuantity(product._id, -1)}>-</button>
                                    <span style={{ margin: "0 10px" }}>{quantity}</span>
                                    <button onClick={() => updateQuantity(product._id, 1)}>+</button>
                                </div>
                                <button
                                    onClick={() => removeItem(product._id)}
                                    style={{ marginTop: 10, color: "red", background: "none", border: "none", cursor: "pointer" }}
                                >
                                    Remove
                                </button>
                            </div> */}
            </div>
          ))
        )}

        <hr />
        <h2 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h2>
      </div>
    </>
  );
};

export default Cart;
