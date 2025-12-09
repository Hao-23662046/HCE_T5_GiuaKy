import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // Trạng thái hiển thị form thanh toán
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Thông tin khách hàng
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Khi đơn hàng trống
  if (cartItems.length === 0)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Giỏ hàng trống</h3>
        <button onClick={() => navigate("/")} style={styles.secondaryButton}>
          ⬅ Quay lại mua hàng
        </button>
      </div>
    );

  // Xác nhận đặt hàng
  const handleConfirmOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ!");
      return;
    }

    const order = {
      id: Date.now(),
      cartItems,
      customerInfo,
      totalPrice,
      date: new Date().toLocaleString(),
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    savedOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    clearCart();
    navigate("/success");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Giỏ hàng ({cartItems.length})</h2>

      {/* Bảng giỏ hàng */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}
        border={1}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>SL</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product.id}>
              <td style={{ padding: 10 }}>
                <img
                  src={item.product.image}
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                />
                <span style={{ marginLeft: 10 }}>{item.product.title}</span>
              </td>

              <td style={{ textAlign: "center" }}>${item.product.price}</td>

              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => decreaseQuantity(item.product.id)}
                  style={styles.qtyBtn}
                >
                  -
                </button>

                <span style={{ margin: "0 10px" }}>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.product.id)}
                  style={styles.qtyBtn}
                >
                  +
                </button>
              </td>

              <td style={{ textAlign: "center", fontWeight: "bold" }}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </td>

              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  style={{ color: "red", border: "none", background: "none" }}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút thanh toán hoặc form thanh toán */}
      {!showCheckoutForm ? (
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={() => navigate("/")} style={styles.secondaryButton}>
            ⬅ Tiếp tục mua sắm
          </button>

          <div style={{ textAlign: "right" }}>
            <h3>
              Tổng cộng:{" "}
              <span style={{ color: "#d32f2f" }}>${totalPrice.toFixed(2)}</span>
            </h3>

            {/* NHẤN VÀO MỚI HIỆN FORM */}
            <button
              onClick={() => setShowCheckoutForm(true)}
              style={styles.primaryButton}
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* FORM THANH TOÁN HIỆN RA  */}
          <h3 style={{ marginTop: 30 }}>Thông tin khách hàng</h3>

          <div style={{ maxWidth: 400 }}>
            <label>Họ tên:</label>
            <input
              name="name"
              className="form-control"
              value={customerInfo.name}
              onChange={handleChange}
            />

            <label style={{ marginTop: 10 }}>Số điện thoại:</label>
            <input
              name="phone"
              className="form-control"
              value={customerInfo.phone}
              onChange={handleChange}
            />

            <label style={{ marginTop: 10 }}>Địa chỉ:</label>
            <input
              name="address"
              className="form-control"
              value={customerInfo.address}
              onChange={handleChange}
            />

            <label style={{ marginTop: 10 }}>Email:</label>
            <input
              name="email"
              className="form-control"
              value={customerInfo.email}
              onChange={handleChange}
            />

            <label style={{ marginTop: 10 }}>Ghi chú:</label>
            <textarea
              name="note"
              className="form-control"
              value={customerInfo.note}
              onChange={handleChange}
            />
          </div>

          {/* Nút xác nhận */}
          <button
            onClick={handleConfirmOrder}
            style={{ ...styles.primaryButton, marginTop: 20 }}
          >
            Xác nhận đặt hàng
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  qtyBtn: {
    padding: "3px 8px",
    background: "#ddd",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "10px 20px",
    background: "white",
    border: "1px solid #ccc",
    cursor: "pointer",
    borderRadius: 6,
  },
  primaryButton: {
    padding: "12px 24px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
};
