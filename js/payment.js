// Payment page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadOrderDetails();
    initPaymentMethods();
    initDiscountCode();
    initPaymentForm();
});

let currentOrder = null;
let discountAmount = 0;

function loadOrderDetails() {
    const booking = loadFromLocalStorage('currentBooking');
    const bill = loadFromLocalStorage('currentBill');
    
    if (!booking || !bill) {
        // If no booking, redirect to booking page
        alert('Vui lòng đặt lịch trước khi thanh toán');
        window.location.href = 'booking.html';
        return;
    }
    
    currentOrder = {
        billId: bill.billId,
        service: booking.service,
        date: formatDate(booking.date),
        time: booking.time,
        petName: `${booking.petName} (${booking.petType})`,
        total: bill.amount
    };
    
    updateOrderDisplay();
}

function updateOrderDisplay() {
    // Hiển thị Bill ID nếu có element
    const billIdElement = document.getElementById('orderBillId');
    if (billIdElement && currentOrder.billId) {
        billIdElement.textContent = currentOrder.billId;
    }
    
    document.getElementById('orderService').textContent = currentOrder.service;
    document.getElementById('orderDate').textContent = currentOrder.date;
    document.getElementById('orderTime').textContent = currentOrder.time;
    document.getElementById('orderPet').textContent = currentOrder.petName;
    document.getElementById('orderBasePrice').textContent = formatCurrency(currentOrder.total);
    
    updateTotalPrice();
}

function updateTotalPrice() {
    const basePrice = currentOrder.total;
    const finalPrice = basePrice - discountAmount;
    
    document.getElementById('orderDiscount').textContent = discountAmount > 0 
        ? `- ${formatCurrency(discountAmount)}` 
        : '- 0đ';
    document.getElementById('orderTotal').textContent = formatCurrency(finalPrice);
}

function initDiscountCode() {
    const applyBtn = document.getElementById('applyDiscountBtn');
    
    applyBtn.addEventListener('click', () => {
        const input = document.getElementById('discountInput');
        const code = input.value.trim().toUpperCase();
        
        if (!code) {
            alert('Vui lòng nhập mã giảm giá');
            return;
        }
        
        const discount = discountCodes[code];
        
        if (discount) {
            if (discount.type === 'percent') {
                discountAmount = Math.floor(currentOrder.total * discount.value / 100);
            } else {
                discountAmount = discount.value;
            }
            
            updateTotalPrice();
            alert(`Áp dụng mã thành công! ${discount.description}`);
            input.disabled = true;
            applyBtn.disabled = true;
        } else {
            alert('Mã giảm giá không hợp lệ');
        }
    });
}

function initPaymentMethods() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.querySelectorAll('.payment-detail');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const method = e.target.value;
            
            paymentDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            const activeDetail = document.querySelector(`.payment-detail[data-method="${method}"]`);
            if (activeDetail) {
                activeDetail.classList.add('active');
            }
        });
    });
}

function initPaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selectedMethod = document.querySelector('input[name="payment"]:checked').value;
        
        // Simulate payment processing
        simulatePayment(selectedMethod);
    });
}

function simulatePayment(method) {
    // Show processing message
    const btn = document.querySelector('#paymentForm button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        const booking = loadFromLocalStorage('currentBooking');
        const bill = loadFromLocalStorage('currentBill');
        
        // Update booking status
        if (booking) {
            booking.status = 'confirmed';
            booking.paymentMethod = method;
            booking.paidAt = new Date().toISOString();
            booking.finalAmount = currentOrder.total - discountAmount;
            
            // Update in bookings array
            const bookings = loadFromLocalStorage('bookings') || [];
            const index = bookings.findIndex(b => b.id === booking.id);
            if (index !== -1) {
                bookings[index] = booking;
                saveToLocalStorage('bookings', bookings);
            }
        }
        
        // Update bill status
        if (bill) {
            bill.status = 'paid';
            bill.paymentMethod = method;
            bill.discount = discountAmount;
            bill.finalAmount = currentOrder.total - discountAmount;
            bill.paidAt = new Date().toISOString();
            
            // Update in bills array
            const bills = loadFromLocalStorage('bills') || [];
            const billIndex = bills.findIndex(b => b.billId === bill.billId);
            if (billIndex !== -1) {
                bills[billIndex] = bill;
                saveToLocalStorage('bills', bills);
            }
        }
        
        // Show success modal
        showPaymentSuccess();
    }, 2000);
}

function showPaymentSuccess() {
    const modal = document.getElementById('paymentSuccessModal');
    modal.classList.add('show');
    
    // Clear current booking and bill after successful payment
    localStorage.removeItem('currentBooking');
    localStorage.removeItem('currentBill');
    localStorage.removeItem('selectedService');
}
