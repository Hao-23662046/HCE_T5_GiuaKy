import { products } from "./data/product";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // ⚠️ Quan trọng

const Trang1 = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ⚠️ Lấy hàm thêm vào giỏ hàng

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              background: "white",
            }}
          >
            <div
              onClick={() => navigate(`/sanpham/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{ height: "140px", objectFit: "contain" }}
              />
              <h4>{p.title}</h4>
              <p>${p.price}</p>
            </div>

            {/* --- NÚT THÊM VÀO GIỎ HÀNG --- */}
            <button
              onClick={() => addToCart(p)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🛒 Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trang1;
