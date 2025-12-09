import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";

const ListProducts_SP_Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating_rate: "",
    rating_count: "",
  });

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error("Lỗi khi tải sản phẩm:", error.message);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("product1").insert([newProduct]);
    if (error) alert("❌ Lỗi khi thêm sản phẩm: " + error.message);
    else {
      alert("✅ Thêm sản phẩm thành công!");
      setNewProduct({
        title: "",
        price: "",
        image: "",
        rating_rate: "",
        rating_count: "",
      });
      fetchProducts();
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { id, ...updated } = editingProduct;
    const { error } = await supabase
      .from("product1")
      .update(updated)
      .eq("id", id);
    if (error) alert("❌ Lỗi khi cập nhật sản phẩm: " + error.message);
    else {
      alert("✅ Cập nhật sản phẩm thành công!");
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      const { error } = await supabase.from("product1").delete().eq("id", id);
      if (error) alert("❌ Lỗi khi xóa sản phẩm: " + error.message);
      else {
        alert("🗑️ Đã xóa sản phẩm!");
        fetchProducts();
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary">
        🛠️ Quản lý sản phẩm (Admin)
      </h2>

      <div className="card mb-5 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {editingProduct ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
          </h5>
          <form onSubmit={editingProduct ? handleEdit : handleAdd}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Tên sản phẩm"
                  value={
                    editingProduct ? editingProduct.title : newProduct.title
                  }
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Giá"
                  value={
                    editingProduct ? editingProduct.price : newProduct.price
                  }
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  placeholder="URL hình ảnh"
                  value={
                    editingProduct ? editingProduct.image : newProduct.image
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="number"
                  step="0.1"
                  name="rating_rate"
                  className="form-control"
                  placeholder="Đánh giá (0–5)"
                  value={
                    editingProduct
                      ? editingProduct.rating_rate
                      : newProduct.rating_rate
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="number"
                  name="rating_count"
                  className="form-control"
                  placeholder="Số lượt đánh giá"
                  value={
                    editingProduct
                      ? editingProduct.rating_count
                      : newProduct.rating_count
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-3 text-end">
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="btn btn-secondary me-2"
                >
                  Hủy
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* LIST GRID */}
      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={p.image}
                alt={p.title}
                className="card-img-top"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  margin: "10px auto 0",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate">{p.title}</h6>

                {/* GIÁ VNĐ */}
                <p className="text-danger fw-bold mb-1">
                  {p.price.toLocaleString("vi-VN")} VNĐ
                </p>

                <p className="text-muted mb-3">
                  ⭐ {p.rating_rate} ({p.rating_count})
                </p>

                <div className="mt-auto d-flex justify-content-end gap-2">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="btn btn-warning btn-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP_Admin;
