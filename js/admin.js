// Admin panel functionality
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadDashboard();
    loadServices();
    loadBookings();
    initServiceModal();
});

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.admin-section');
    const pageTitle = document.getElementById('pageTitle');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.dataset.section;
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                
                // Update page title
                const titles = {
                    'dashboard': 'Dashboard',
                    'services': 'Quản lý dịch vụ',
                    'bookings': 'Quản lý lịch đặt',
                    'users': 'Quản lý khách hàng',
                    'settings': 'Cài đặt hệ thống'
                };
                pageTitle.textContent = titles[sectionId];
            }
        });
    });
}

// Dashboard
function loadDashboard() {
    const bookings = loadFromLocalStorage('bookings') || [];
    const recentBookings = bookings.slice(-5).reverse();
    
    const tbody = document.getElementById('recentBookings');
    if (tbody) {
        tbody.innerHTML = recentBookings.map(booking => `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.customerName}</td>
                <td>${booking.service}</td>
                <td>${formatDate(booking.date)} ${booking.time}</td>
                <td>${getStatusBadge(booking.status)}</td>
            </tr>
        `).join('');
    }
}

function getStatusBadge(status) {
    const badges = {
        'pending': '<span class="badge-warning">Chờ xác nhận</span>',
        'confirmed': '<span class="badge-success">Đã xác nhận</span>',
        'completed': '<span class="badge-success">Hoàn thành</span>',
        'cancelled': '<span class="badge-danger">Đã hủy</span>'
    };
    return badges[status] || badges['pending'];
}

// Services Management
function loadServices() {
    const services = loadFromLocalStorage('services') || servicesData;
    const tbody = document.getElementById('servicesTable');
    
    if (tbody) {
        tbody.innerHTML = services.map(service => `
            <tr>
                <td><img src="${service.image}" alt="${service.name}" class="service-thumb" onerror="this.src='https://via.placeholder.com/60'"></td>
                <td>${service.name}</td>
                <td>${service.typeName}</td>
                <td>${formatCurrency(service.price)}</td>
                <td>${service.rating} ⭐ (${service.reviews})</td>
                <td><span class="badge-success">Hoạt động</span></td>
                <td class="table-actions">
                    <button class="btn-edit" onclick="editService(${service.id})">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button class="btn-delete" onclick="deleteService(${service.id})">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function initServiceModal() {
    const addBtn = document.getElementById('addServiceBtn');
    const modal = document.getElementById('serviceModal');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = document.getElementById('cancelServiceBtn');
    const serviceForm = document.getElementById('serviceForm');
    
    addBtn.addEventListener('click', () => {
        document.getElementById('serviceModalTitle').textContent = 'Thêm dịch vụ mới';
        serviceForm.reset();
        modal.classList.add('show');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveService();
    });
}

function saveService() {
    const services = loadFromLocalStorage('services') || servicesData;
    
    const typeNames = {
        'grooming': 'Spa & Grooming',
        'hotel': 'Khách sạn',
        'veterinary': 'Thú y',
        'training': 'Huấn luyện'
    };
    
    const newService = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        name: document.getElementById('serviceName').value,
        type: document.getElementById('serviceType').value,
        typeName: typeNames[document.getElementById('serviceType').value],
        price: parseInt(document.getElementById('servicePrice').value),
        location: document.getElementById('serviceLocation').value || 'TP.HCM',
        description: document.getElementById('serviceDescription').value,
        image: document.getElementById('serviceImage').value || 'https://via.placeholder.com/400x200?text=Pet+Service',
        rating: 5.0,
        reviews: 0
    };
    
    services.push(newService);
    saveToLocalStorage('services', services);
    
    // Close modal and reload
    document.getElementById('serviceModal').classList.remove('show');
    loadServices();
    
    alert('Thêm dịch vụ thành công!');
}

function editService(id) {
    const services = loadFromLocalStorage('services') || servicesData;
    const service = services.find(s => s.id === id);
    
    if (service) {
        document.getElementById('serviceModalTitle').textContent = 'Chỉnh sửa dịch vụ';
        document.getElementById('serviceName').value = service.name;
        document.getElementById('serviceType').value = service.type;
        document.getElementById('servicePrice').value = service.price;
        document.getElementById('serviceLocation').value = service.location;
        document.getElementById('serviceDescription').value = service.description;
        document.getElementById('serviceImage').value = service.image;
        
        document.getElementById('serviceModal').classList.add('show');
    }
}

function deleteService(id) {
    if (confirm('Bạn có chắc muốn xóa dịch vụ này?')) {
        let services = loadFromLocalStorage('services') || servicesData;
        services = services.filter(s => s.id !== id);
        saveToLocalStorage('services', services);
        loadServices();
        alert('Đã xóa dịch vụ');
    }
}

// Bookings Management
function loadBookings() {
    const bookings = loadFromLocalStorage('bookings') || [];
    const tbody = document.getElementById('bookingsTable');
    
    if (tbody) {
        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.customerName}</td>
                <td>${booking.phone}</td>
                <td>${booking.service}</td>
                <td>${formatDate(booking.date)} ${booking.time}</td>
                <td>${booking.petName} (${booking.petType})</td>
                <td>${formatCurrency(booking.total)}</td>
                <td>${getStatusBadge(booking.status)}</td>
                <td class="table-actions">
                    <button class="btn-view" onclick="viewBooking('${booking.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${booking.status === 'pending' ? `
                    <button class="btn-edit" onclick="confirmBooking('${booking.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                    ` : ''}
                    <button class="btn-delete" onclick="cancelBooking('${booking.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    // Init filter
    const statusFilter = document.getElementById('bookingStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterBookings);
    }
}

function filterBookings() {
    const status = document.getElementById('bookingStatusFilter').value;
    const bookings = loadFromLocalStorage('bookings') || [];
    
    const filtered = status === 'all' 
        ? bookings 
        : bookings.filter(b => b.status === status);
    
    const tbody = document.getElementById('bookingsTable');
    if (tbody) {
        tbody.innerHTML = filtered.map(booking => `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.customerName}</td>
                <td>${booking.phone}</td>
                <td>${booking.service}</td>
                <td>${formatDate(booking.date)} ${booking.time}</td>
                <td>${booking.petName} (${booking.petType})</td>
                <td>${formatCurrency(booking.total)}</td>
                <td>${getStatusBadge(booking.status)}</td>
                <td class="table-actions">
                    <button class="btn-view" onclick="viewBooking('${booking.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${booking.status === 'pending' ? `
                    <button class="btn-edit" onclick="confirmBooking('${booking.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                    ` : ''}
                    <button class="btn-delete" onclick="cancelBooking('${booking.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function viewBooking(id) {
    const bookings = loadFromLocalStorage('bookings') || [];
    const booking = bookings.find(b => b.id === id);
    
    if (booking) {
        alert(`Chi tiết đặt lịch:
        
Mã: ${booking.id}
Khách hàng: ${booking.customerName}
SĐT: ${booking.phone}
Email: ${booking.email || 'Không có'}
Dịch vụ: ${booking.service}
Thời gian: ${formatDate(booking.date)} ${booking.time}
Thú cưng: ${booking.petName} (${booking.petType}) - ${booking.petWeight}kg
Ghi chú: ${booking.note || 'Không có'}
Tổng tiền: ${formatCurrency(booking.total)}
Trạng thái: ${booking.status}`);
    }
}

function confirmBooking(id) {
    const bookings = loadFromLocalStorage('bookings') || [];
    const booking = bookings.find(b => b.id === id);
    
    if (booking) {
        booking.status = 'confirmed';
        saveToLocalStorage('bookings', bookings);
        loadBookings();
        loadDashboard();
        alert('Đã xác nhận lịch đặt');
    }
}

function cancelBooking(id) {
    if (confirm('Bạn có chắc muốn hủy lịch đặt này?')) {
        const bookings = loadFromLocalStorage('bookings') || [];
        const booking = bookings.find(b => b.id === id);
        
        if (booking) {
            booking.status = 'cancelled';
            saveToLocalStorage('bookings', bookings);
            loadBookings();
            loadDashboard();
            alert('Đã hủy lịch đặt');
        }
    }
}
