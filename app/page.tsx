"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file) {
      setError("Vui lòng tải lên hình ảnh xác nhận chuyển khoản.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi gửi đăng ký.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="form-container">
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#4a8fcf', fontSize: '2.5rem', marginBottom: '20px' }}>Đăng Ký Thành Công! 🎉</h1>
          <p style={{ fontSize: '1.2rem', color: '#5c5c5c', marginBottom: '30px' }}>
            Cảm ơn ba mẹ đã đăng ký tham gia Workshop Mùa Hè. Art House's sẽ liên hệ qua Zalo để xác nhận thành công sớm nhất.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="submit-btn" 
            style={{ width: 'auto', padding: '15px 40px' }}
          >
            Đăng ký thêm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="glass-card">
        <div className="header">
          <img src="/logo.png" alt="Art House's Logo" className="logo" />
          <h1>Đăng Ký Workshop Mùa Hè</h1>
          <h2>🌊 Vỏ Sò Đã Quay Trở Lại 🐚</h2>
          <p className="intro">
            Cảm ơn ba mẹ đã quan tâm và lựa chọn Art House's làm nơi trải nghiệm sáng tạo mùa hè cho bé. Ba mẹ vui lòng điền đầy đủ thông tin dưới đây để Art House's chuẩn bị vỏ sò và dụng cụ tươm tất nhất cho con nhé!
          </p>
        </div>

        <div className="event-info">
          <h3>📌 Thông Tin Sự Kiện (Để ba mẹ lưu ý)</h3>
          <ul>
            <li>⏰ Thời gian: 9h00 sáng, Chủ Nhật ngày 28/06/2026.</li>
            <li>📍 Địa điểm: Art House's – 20 Nguyễn Khuyến, Phường 12, Quận Bình Thạnh, TP.HCM.</li>
            <li>👶 Độ tuổi: 4 - 12 tuổi.</li>
          </ul>
          <span className="highlight-text">Trải nghiệm bao gồm: Giao lưu, chia sẻ, làm quen với màu nước, thực hành trang trí vỏ sò và mang tác phẩm về.</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="section">
            <h3>1️⃣ Thông Tin Cơ Bản</h3>
            <div className="form-group">
              <label htmlFor="parentName">Họ và tên Phụ huynh <span className="required">*</span></label>
              <input type="text" id="parentName" name="parentName" placeholder="Nhập họ và tên ba/mẹ" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại Zalo <span className="required">*</span></label>
              <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại có Zalo để nhận thông báo" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email (Không bắt buộc)</label>
              <input type="email" id="email" name="email" placeholder="Nhập địa chỉ email" />
            </div>
          </div>

          <div className="section">
            <h3>2️⃣ Thông Tin Của Bé</h3>
            <div className="form-group">
              <label htmlFor="childName">Họ và tên Bé <span className="required">*</span></label>
              <input type="text" id="childName" name="childName" placeholder="Nhập họ và tên bé" required />
            </div>
            <div className="form-group">
              <label htmlFor="childAge">Tuổi của bé <span className="required">*</span></label>
              <input type="number" id="childAge" name="childAge" placeholder="Ví dụ: 6" min="4" max="15" required />
            </div>
            <div className="form-group">
              <label>Bé có dị ứng học liệu hay cần lưu ý đặc biệt không? <span className="required">*</span></label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="specialNeeds" value="no" defaultChecked onChange={(e) => {
                    const detail = document.getElementById('specialNeedsDetail');
                    if (detail) detail.style.display = 'none';
                  }} />
                  <span>Không</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="specialNeeds" value="yes" onChange={(e) => {
                    const detail = document.getElementById('specialNeedsDetail');
                    if (detail) detail.style.display = 'block';
                  }} />
                  <span>Có</span>
                </label>
              </div>
              <input type="text" id="specialNeedsDetail" name="specialNeedsDetail" className="hidden-input" placeholder="Vui lòng ghi rõ (VD: dị ứng màu acrylic, bé nhút nhát...)" />
            </div>
          </div>

          <div className="section">
            <h3>3️⃣ Xác Nhận Đăng Ký & Thanh Toán</h3>
            <div className="form-group">
              <label htmlFor="childCount">Số lượng bé tham gia <span className="required">*</span></label>
              <input type="number" id="childCount" name="childCount" min="1" defaultValue="1" required />
            </div>
            <div className="form-group">
              <label>Thông tin thanh toán chuyển khoản <span className="required">*</span></label>
              <div className="qr-container" style={{ marginLeft: 0 }}>
                <p className="qr-instruction">Vui lòng quét mã QR dưới đây để thanh toán chi phí tham gia:</p>
                <img src="/qr-code.png" alt="Mã QR thanh toán VietinBank" className="qr-image" />
                <div className="bank-info">
                  <p>Ngân hàng: <strong>VietinBank</strong></p>
                  <p>Chủ tài khoản: <strong>NGUYEN NGOC CAT TAM</strong></p>
                  <p>Số tài khoản: <strong>103877284725</strong></p>
                  <p>Chi nhánh: <strong>CN 4 - TP HCM - PGD PHAN VAN TRI</strong></p>
                  <p className="transfer-note">Nội dung CK: Tên Ba Mẹ + SĐT</p>
                </div>
                
                <div className="upload-bill-container">
                  <label htmlFor="billUpload" className="upload-label">
                    <div className="upload-icon">📸</div>
                    <span>Bấm vào đây để tải lên hình chụp màn hình bill chuyển khoản (Bắt buộc)</span>
                  </label>
                  <input type="file" id="billUpload" name="billUpload" accept="image/*" required className="file-input" onChange={handleFileChange} />
                  <div id="file-name" className="file-name-display" style={{ display: fileName ? 'block' : 'none' }}>
                    {fileName ? `✅ Đã tải lên: ${fileName}` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-note">
            Art House's sẽ gọi điện hoặc nhắn tin Zalo để xác nhận thành công ngay sau khi ba mẹ gửi form này!
            <div className="hotline">Hotline hỗ trợ: 0909 699 060</div>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Đang gửi...' : 'XÁC NHẬN ĐĂNG KÝ'}
          </button>
        </form>
      </div>
    </div>
  );
}
