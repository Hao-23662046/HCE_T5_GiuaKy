const LienHe = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Liên hệ</h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Thông tin cửa hàng</h3>
        <p>
          <strong>Địa chỉ:</strong> 123 Nguyễn Văn Linh, Đà Nẵng
        </p>
        <p>
          <strong>Hotline:</strong> 0905 123 456
        </p>
        <p>
          <strong>Email:</strong> shop@gmail.com
        </p>

        <hr style={{ margin: "20px 0" }} />

        <h3>Gửi liên hệ</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Gửi thông tin liên hệ thành công!");
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <label>Họ tên:</label>
            <input type="text" required style={styles.input} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Email:</label>
            <input type="email" required style={styles.input} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Nội dung:</label>
            <textarea required rows={4} style={styles.textarea}></textarea>
          </div>

          <button type="submit" style={styles.button}>
            Gửi ngay
          </button>
        </form>
      </div>

      <div style={{ marginTop: "30px" }}>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.916296517434!2d108.22086547491677!3d16.07176398888137!2m3!1f0!2f0!3f0!3m2!
          1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c3e4adba6f%3A0xdade517693c54dae!
          2zMTIzIE5ndXnhu4VuIFbEg24gTGluaCwgVGjDoG5oIEtow6osIMSQw6AgTuG6tW5n!5e0!
          3m2!1svi!2s!4v1703749842141!5m2!1svi!2s"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginTop: 5,
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: 5,
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px 24px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: 10,
  },
};

export default LienHe;
