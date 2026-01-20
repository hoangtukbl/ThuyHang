// Sample services data
const servicesData = [
    {
        id: 1,
        name: 'Spa & Grooming cao cấp',
        type: 'grooming',
        typeName: 'Spa & Grooming',
        price: 350000,
        location: 'Nha Trang, Khánh Hòa',
        description: 'Dịch vụ spa và tắm gội chuyên nghiệp cho thú cưng với các sản phẩm cao cấp, an toàn',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400',
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: 'Khách sạn thú cưng 5 sao',
        type: 'hotel',
        typeName: 'Khách sạn',
        price: 200000,
        location: 'TP. Nha Trang',
        description: 'Dịch vụ lưu trú cho thú cưng với không gian rộng rãi, sạch sẽ và được chăm sóc 24/7',
        image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400',
        rating: 4.9,
        reviews: 89
    },
    {
        id: 3,
        name: 'Phòng khám thú y Petcare',
        type: 'veterinary',
        typeName: 'Thú y',
        price: 150000,
        location: 'Cam Ranh, Khánh Hòa',
        description: 'Khám sức khỏe tổng quát, tiêm phòng, điều trị bệnh với đội ngũ bác sĩ giàu kinh nghiệm',
        image: 'https://images.unsplash.com/photo-1530041539828-114de669390e?w=400',
        rating: 4.7,
        reviews: 156
    },
    {
        id: 4,
        name: 'Huấn luyện chó chuyên nghiệp',
        type: 'training',
        typeName: 'Huấn luyện',
        price: 500000,
        location: 'Nha Trang, Khánh Hòa',
        description: 'Khóa học huấn luyện cơ bản và nâng cao cho chó, giúp thú cưng ngoan ngoãn và thông minh hơn',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
        rating: 4.6,
        reviews: 78
    },
    {
        id: 5,
        name: 'Cắt tỉa lông chuyên nghiệp',
        type: 'grooming',
        typeName: 'Spa & Grooming',
        price: 250000,
        location: 'Cam Ranh, Khánh Hòa',
        description: 'Dịch vụ cắt tỉa lông theo yêu cầu, tạo kiểu đẹp mắt cho thú cưng của bạn',
        image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=400',
        rating: 4.5,
        reviews: 92
    },
    {
        id: 6,
        name: 'Khách sạn mèo Pet Paradise',
        type: 'hotel',
        typeName: 'Khách sạn',
        price: 180000,
        location: 'Nha Trang, Khánh Hòa',
        description: 'Không gian riêng biệt dành cho mèo, yên tĩnh và thoải mái, có camera theo dõi 24/7',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
        rating: 4.8,
        reviews: 67
    }
];

// Sample bookings data
const bookingsData = [
    {
        id: 'BK001',
        customerName: 'Nguyễn Văn A',
        phone: '0912345678',
        email: 'nguyenvana@email.com',
        service: 'Spa & Grooming cao cấp',
        date: '2026-01-25',
        time: '10:00',
        petName: 'Milo',
        petType: 'Chó',
        petWeight: 5,
        note: 'Chó hay sợ người lạ',
        status: 'confirmed',
        total: 350000
    },
    {
        id: 'BK002',
        customerName: 'Trần Thị B',
        phone: '0987654321',
        email: 'tranthib@email.com',
        service: 'Khách sạn thú cưng 5 sao',
        date: '2026-01-25',
        time: '14:00',
        petName: 'Lucy',
        petType: 'Mèo',
        petWeight: 3,
        note: '',
        status: 'pending',
        total: 200000
    }
];

// Discount codes
const discountCodes = {
    'PETHUB10': { type: 'percent', value: 10, description: 'Giảm 10%' },
    'WELCOME': { type: 'fixed', value: 50000, description: 'Giảm 50,000đ' },
    'VIP20': { type: 'percent', value: 20, description: 'Giảm 20% cho VIP' }
};

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount).replace('₫', 'đ');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Get service by ID
function getServiceById(id) {
    return servicesData.find(service => service.id === id);
}

// Get bill by ID
function getBillById(billId) {
    const bills = loadFromLocalStorage('bills') || [];
    return bills.find(bill => bill.billId === billId);
}

// Get booking by bill ID
function getBookingByBillId(billId) {
    const bills = loadFromLocalStorage('bills') || [];
    const bill = bills.find(b => b.billId === billId);
    if (!bill) return null;
    
    const bookings = loadFromLocalStorage('bookings') || [];
    return bookings.find(booking => booking.id === bill.bookingId);
}

// Save to localStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load from localStorage
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Initialize data in localStorage if not exists
if (!loadFromLocalStorage('services')) {
    saveToLocalStorage('services', servicesData);
}

if (!loadFromLocalStorage('bookings')) {
    saveToLocalStorage('bookings', bookingsData);
}
