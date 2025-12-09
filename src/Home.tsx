import React, { useEffect, useState } from "react";
import "./assets/css/home.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating_rate?: number;
  rating_count?: number;
  description?: string;
};

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [topSold, setTopSold] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotDeals, setHotDeals] = useState<Product[]>([]);

  useEffect(() => {
    fetchTopSold();
    fetchNewProducts();
    fetchHotDeals();
  }, []);

  // 🔥 Bán chạy
  const fetchTopSold = async () => {
    const { data } = await supabase
      .from("product1")
      .select("*")
      .order("rating_count", { ascending: false })
      .limit(4);

    if (data) setTopSold(data);
  };

  // 🆕 Sản phẩm mới
  const fetchNewProducts = async () => {
    const { data } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: false })
      .limit(4);

    if (data) setNewProducts(data);
  };

  // 🔥 Khuyến mãi HOT
  const fetchHotDeals = async () => {
    const { data } = await supabase
      .from("product1")
      .select("*")
      .order("rating_rate", { ascending: false })
      .limit(4);

    if (data && data.length > 0) setHotDeals(data);
    else setHotDeals(topSold);
  };

  const handleSearch = () => {
    navigate(`/sanpham?search=${encodeURIComponent(search)}&page=1`);
  };

  // 👉 Điều hướng đúng sang ProductDetail
  const goDetail = (id: number) => navigate(`/detail/${id}`);

  const renderProducts = (items: Product[]) =>
    items.map((p) => (
      <div className="product-card" key={p.id} onClick={() => goDetail(p.id)}>
        <img src={p.image} alt={p.title} />
        <h4>{p.title}</h4>
        <p className="price">{p.price.toLocaleString()} đ</p>
      </div>
    ));

  return (
    <div className="home-wrapper">
      <section className="banner">
        <div className="banner-text">
          <h1>Laptop Chính Hãng – Giá Tốt Nhất</h1>
          <p>Hàng mới 100%, bảo hành toàn quốc, hỗ trợ trả góp 0%</p>
          <button onClick={() => navigate("/sanpham")} className="btn-banner">
            Mua ngay
          </button>
        </div>
        <div className="banner-img"></div>
      </section>

      <div className="search-bar">
        <input
          placeholder="🔍 Tìm laptop theo tên, hãng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      <section className="home-section">
        <h2>🔥 Khuyến Mãi HOT</h2>
        <div className="product-row">{renderProducts(hotDeals)}</div>
      </section>

      <section className="home-section">
        <h2>💻 Laptop Bán Chạy</h2>
        <div className="product-row">{renderProducts(topSold)}</div>
      </section>

      <section className="home-section">
        <h2>🆕 Sản phẩm mới</h2>
        <div className="product-row">{renderProducts(newProducts)}</div>
      </section>
    </div>
  );
}
