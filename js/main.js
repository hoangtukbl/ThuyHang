// Main page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedServices();
});

function loadFeaturedServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    const services = loadFromLocalStorage('services') || servicesData;
    
    // Show only first 3 services on home page
    const featuredServices = services.slice(0, 3);
    
    servicesGrid.innerHTML = featuredServices.map(service => createServiceCard(service)).join('');
}

function createServiceCard(service) {
    return `
        <div class="service-card" onclick="viewService(${service.id})">
            <img src="${service.image}" alt="${service.name}" class="service-image" onerror="this.src='https://via.placeholder.com/400x200?text=Pet+Service'">
            <div class="service-content">
                <div class="service-header">
                    <h3>${service.name}</h3>
                    <span class="service-type">${service.typeName}</span>
                </div>
                <p class="service-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${service.location}
                </p>
                <p>${service.description}</p>
                <div class="service-footer">
                    <span class="service-price">${formatCurrency(service.price)}</span>
                    <div class="service-rating">
                        <i class="fas fa-star"></i>
                        <span>${service.rating} (${service.reviews})</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function viewService(serviceId) {
    // Store selected service and redirect to booking
    saveToLocalStorage('selectedService', serviceId);
    window.location.href = 'booking.html';
}
