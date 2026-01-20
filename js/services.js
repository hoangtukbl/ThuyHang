// Services page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadAllServices();
    initFilters();
});

let currentServices = [];

function loadAllServices() {
    const services = loadFromLocalStorage('services') || servicesData;
    currentServices = services;
    displayServices(services);
}

function displayServices(services) {
    const servicesGrid = document.getElementById('allServicesGrid');
    if (!servicesGrid) return;
    
    if (services.length === 0) {
        servicesGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Không tìm thấy dịch vụ phù hợp</p>';
        return;
    }
    
    servicesGrid.innerHTML = services.map(service => createServiceCard(service)).join('');
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

function initFilters() {
    const serviceTypeFilter = document.getElementById('serviceTypeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (serviceTypeFilter) {
        serviceTypeFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    let services = loadFromLocalStorage('services') || servicesData;
    
    // Filter by service type
    const serviceType = document.getElementById('serviceTypeFilter')?.value;
    if (serviceType && serviceType !== 'all') {
        services = services.filter(s => s.type === serviceType);
    }
    
    // Filter by price
    const priceRange = document.getElementById('priceFilter')?.value;
    if (priceRange && priceRange !== 'all') {
        switch (priceRange) {
            case 'low':
                services = services.filter(s => s.price < 200000);
                break;
            case 'medium':
                services = services.filter(s => s.price >= 200000 && s.price <= 500000);
                break;
            case 'high':
                services = services.filter(s => s.price > 500000);
                break;
        }
    }
    
    // Sort
    const sortBy = document.getElementById('sortFilter')?.value;
    if (sortBy) {
        switch (sortBy) {
            case 'rating':
                services.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-low':
                services.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                services.sort((a, b) => b.price - a.price);
                break;
            default:
                // popular - already sorted by default
                break;
        }
    }
    
    currentServices = services;
    displayServices(services);
}

function viewService(serviceId) {
    saveToLocalStorage('selectedService', serviceId);
    window.location.href = 'booking.html';
}
