// Booking page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadServiceOptions();
    initBookingForm();
    setMinDate();
});

function setMinDate() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.min = minDate;
    }
}

function loadServiceOptions() {
    const serviceSelect = document.getElementById('serviceSelect');
    if (!serviceSelect) return;
    
    const services = loadFromLocalStorage('services') || servicesData;
    const selectedServiceId = loadFromLocalStorage('selectedService');
    
    serviceSelect.innerHTML = '<option value="">-- Chọn dịch vụ --</option>';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} - ${formatCurrency(service.price)}`;
        option.dataset.price = service.price;
        option.dataset.name = service.name;
        
        if (selectedServiceId == service.id) {
            option.selected = true;
        }
        
        serviceSelect.appendChild(option);
    });
    
    // Update summary when service is selected
    serviceSelect.addEventListener('change', updateBookingSummary);
    
    // Initial update if service was pre-selected
    if (selectedServiceId) {
        updateBookingSummary();
    }
}

function updateBookingSummary() {
    const serviceSelect = document.getElementById('serviceSelect');
    const dateInput = document.getElementById('bookingDate');
    const timeSelect = document.getElementById('bookingTime');
    const summaryDiv = document.getElementById('bookingSummary');
    
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    
    if (selectedOption.value) {
        const serviceName = selectedOption.dataset.name;
        const price = parseInt(selectedOption.dataset.price);
        
        document.getElementById('summaryService').textContent = serviceName;
        
        if (dateInput.value && timeSelect.value) {
            const dateTime = `${formatDate(dateInput.value)} lúc ${timeSelect.value}`;
            document.getElementById('summaryDateTime').textContent = dateTime;
        } else {
            document.getElementById('summaryDateTime').textContent = '-';
        }
        
        document.getElementById('summaryPrice').textContent = formatCurrency(price);
        summaryDiv.style.display = 'block';
    } else {
        summaryDiv.style.display = 'none';
    }
}

function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;
    
    // Update summary when date or time changes
    const dateInput = document.getElementById('bookingDate');
    const timeSelect = document.getElementById('bookingTime');
    
    if (dateInput) dateInput.addEventListener('change', updateBookingSummary);
    if (timeSelect) timeSelect.addEventListener('change', updateBookingSummary);
    
    bookingForm.addEventListener('submit', handleBookingSubmit);
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const serviceSelect = document.getElementById('serviceSelect');
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    
    // Tạo Bill ID unique
    const billId = 'BILL' + Date.now() + Math.floor(Math.random() * 1000);
    
    const bookingData = {
        id: 'BK' + Date.now(),
        billId: billId,
        service: selectedOption.dataset.name,
        serviceId: selectedOption.value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        petName: document.getElementById('petName').value,
        petType: document.getElementById('petType').options[document.getElementById('petType').selectedIndex].text,
        petWeight: document.getElementById('petWeight').value || 0,
        customerName: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        email: document.getElementById('customerEmail').value || '',
        note: document.getElementById('bookingNote').value || '',
        status: 'pending',
        total: parseInt(selectedOption.dataset.price),
        createdAt: new Date().toISOString()
    };
    
    // Save booking
    const bookings = loadFromLocalStorage('bookings') || [];
    bookings.push(bookingData);
    saveToLocalStorage('bookings', bookings);
    
    // Tạo bill riêng biệt
    const bill = {
        billId: billId,
        bookingId: bookingData.id,
        customerName: bookingData.customerName,
        service: bookingData.service,
        amount: bookingData.total,
        discount: 0,
        finalAmount: bookingData.total,
        status: 'unpaid',
        createdAt: new Date().toISOString()
    };
    
    // Lưu bill vào danh sách bills
    const bills = loadFromLocalStorage('bills') || [];
    bills.push(bill);
    saveToLocalStorage('bills', bills);
    
    // Save current booking và bill for payment page
    saveToLocalStorage('currentBooking', bookingData);
    saveToLocalStorage('currentBill', bill);
    
    // Show success modal
    showSuccessModal();
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (!modal) return;
    
    modal.classList.add('show');
    
    // Tự động chuyển sang trang thanh toán sau 3 giây
    const autoRedirect = setTimeout(() => {
        window.location.href = 'payment.html';
    }, 3000);
    
    // Hoặc click nút để chuyển ngay
    const paymentBtn = document.getElementById('paymentBtn');
    if (paymentBtn) {
        paymentBtn.onclick = (e) => {
            e.preventDefault();
            clearTimeout(autoRedirect);
            window.location.href = 'payment.html';
        };
    }
}
