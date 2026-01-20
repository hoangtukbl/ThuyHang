# PetHub - Website Thương Mại Điện Tử

Website kết nối giữa những nhà cung cấp dịch vụ chăm sóc thú cưng với chủ thú cưng.

## Tính năng chính

### Người dùng
- ✅ Xem danh sách dịch vụ chăm sóc thú cưng
- ✅ Lọc và sắp xếp dịch vụ theo loại, giá
- ✅ Đăng nhập với Google (mô phỏng)
- ✅ Đặt lịch sử dụng dịch vụ
- ✅ Thanh toán online (mô phỏng)
- ✅ Áp dụng mã giảm giá

### Admin
- ✅ Dashboard tổng quan
- ✅ Quản lý dịch vụ (thêm, sửa, xóa)
- ✅ Quản lý lịch đặt
- ✅ Xác nhận/Hủy lịch đặt
- ✅ Thống kê doanh thu, khách hàng

## Cấu trúc thư mục

```
PetHub/
├── index.html          # Trang chủ
├── services.html       # Danh sách dịch vụ
├── booking.html        # Đặt lịch
├── payment.html        # Thanh toán
├── about.html          # Giới thiệu
├── contact.html        # Liên hệ
├── admin/
│   └── admin.html      # Trang quản trị
├── css/
│   ├── style.css       # CSS chính
│   └── admin.css       # CSS admin
└── js/
    ├── data.js         # Dữ liệu mẫu
    ├── auth.js         # Xác thực
    ├── main.js         # Trang chủ
    ├── services.js     # Dịch vụ
    ├── booking.js      # Đặt lịch
    ├── payment.js      # Thanh toán
    └── admin.js        # Admin panel
```

## Hướng dẫn sử dụng

### Chạy website
1. Mở file `index.html` bằng trình duyệt
2. Hoặc sử dụng Live Server trong VS Code

### Tài khoản Admin
- Truy cập: Click nút "Admin" hoặc vào `admin/admin.html`
- Không cần đăng nhập (demo)

### Tính năng đã triển khai

#### 1. Đăng nhập Google (Mô phỏng)
- Click "Đăng nhập" 
- Chọn "Đăng nhập với Google"
- Tự động tạo tài khoản demo

#### 2. Đặt lịch
- Chọn dịch vụ từ trang chủ hoặc trang dịch vụ
- Điền thông tin: ngày, giờ, thú cưng, liên hệ
- Xác nhận đặt lịch
- Chọn thanh toán ngay hoặc tiếp tục

#### 3. Thanh toán
- Chọn phương thức: MoMo, Banking, Card, COD
- Nhập mã giảm giá (nếu có)
  - `PETHUB10` - Giảm 10%
  - `WELCOME` - Giảm 50,000đ
  - `VIP20` - Giảm 20%
- Xác nhận thanh toán

#### 4. Quản trị (Admin)
- Xem dashboard với thống kê
- Thêm/Sửa/Xóa dịch vụ
- Xem danh sách lịch đặt
- Xác nhận hoặc hủy lịch

## Công nghệ sử dụng

- **HTML5** - Cấu trúc
- **CSS3** - Giao diện, responsive
- **JavaScript (Vanilla)** - Logic
- **LocalStorage** - Lưu trữ dữ liệu
- **Font Awesome** - Icons

## Lưu ý

- Website sử dụng LocalStorage để lưu dữ liệu
- Đăng nhập Google chỉ là mô phỏng
- Thanh toán chỉ là demo, không thực
- Dữ liệu sẽ mất khi xóa cache trình duyệt

## Mã giảm giá có sẵn

- `PETHUB10` - Giảm 10%
- `WELCOME` - Giảm 50,000đ
- `VIP20` - Giảm 20%

## Màu sắc chính

- Primary: #ff6b6b (Đỏ cam)
- Secondary: #4ecdc4 (Xanh ngọc)
- Dark: #2c3e50 (Xám đen)
- Success: #2ecc71 (Xanh lá)
- Warning: #f39c12 (Cam)
- Danger: #e74c3c (Đỏ)

## Phát triển tiếp

Bạn có thể mở rộng với:
- Kết nối backend thật (Node.js, PHP, etc.)
- Database (MySQL, MongoDB)
- Google OAuth thực tế
- Payment gateway thực (MoMo, VNPay)
- Upload ảnh dịch vụ
- Chat trực tuyến
- Đánh giá & nhận xét
- Gửi email xác nhận
- Responsive tốt hơn

## Liên hệ

Nếu cần hỗ trợ thêm, hãy cho tôi biết!
