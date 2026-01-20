// Authentication handling
let currentUser = loadFromLocalStorage('currentUser');

// Google Sign-In configuration (simulation)
function initGoogleAuth() {
    const googleLoginBtns = document.querySelectorAll('#googleLoginBtn');
    
    googleLoginBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulate Google login
            simulateGoogleLogin();
        });
    });
}

function simulateGoogleLogin() {
    // Simulate Google OAuth flow
    const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        email: 'demo@example.com',
        picture: '',
        provider: 'google'
    };
    
    loginUser(mockUser);
}

function loginUser(user) {
    currentUser = user;
    saveToLocalStorage('currentUser', user);
    
    // Close modal
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
    }
    
    // Update UI
    updateAuthUI();
    
    // Show success message
    alert(`Đăng nhập thành công!\nChào mừng ${user.name}`);
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    alert('Đã đăng xuất');
}

function updateAuthUI() {
    const loginBtns = document.querySelectorAll('.btn-login');
    
    loginBtns.forEach(btn => {
        if (currentUser) {
            btn.innerHTML = `<i class="fas fa-user-circle"></i> ${currentUser.name}`;
            btn.onclick = () => {
                if (confirm('Bạn có muốn đăng xuất?')) {
                    logoutUser();
                }
            };
        } else {
            btn.innerHTML = '<i class="fas fa-user"></i> Đăng nhập';
            btn.onclick = null;
        }
    });
}

// Modal handling
function initModals() {
    const loginModal = document.getElementById('loginModal');
    const loginBtns = document.querySelectorAll('.btn-login');
    const closeBtns = document.querySelectorAll('.close');
    
    loginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentUser) {
                loginModal.classList.add('show');
            }
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('show');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
    
    // Email login form
    const emailLoginForm = document.getElementById('emailLoginForm');
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = e.target.querySelector('input[type="email"]').value;
            
            const mockUser = {
                id: Math.random().toString(36).substr(2, 9),
                name: email.split('@')[0],
                email: email,
                provider: 'email'
            };
            
            loginUser(mockUser);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGoogleAuth();
    initModals();
    updateAuthUI();
});
