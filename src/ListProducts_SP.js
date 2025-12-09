import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <h3>Đang tải dữ liệu...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {listProduct.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div
              onClick={() => navigate(`/detail/${p.id}`)}
              style={{
                width: "100%",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
              }}
            >
              <img
                src={p.image || "https://via.placeholder.com/200"}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <h4 style={{ margin: "10px 0 5px", fontSize: "1rem" }}>
              {p.title}
            </h4>

            {/* --- FORMAT GIÁ VNĐ --- */}
            <p style={{ color: "#e63946", fontWeight: "bold", margin: "0" }}>
              {p.price.toLocaleString("vi-VN")} VNĐ
            </p>

            <small style={{ color: "#555" }}>
              ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
            </small>

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

export default ListProducts_SP;
