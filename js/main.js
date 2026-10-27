// FORMAT TIỀN TỆ VNĐ
const formatVND = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
};

// 1. QUẢN LÝ TRẠNG THÁI (STATE)
let currentState = {
    category: 'all',
    priceFilter: 'all',
    sort: 'newest',
    search: '',
    cart: JSON.parse(localStorage.getItem('armory_cart')) || []
};

// 2. KHỞI CHẠY UI (Splash, Modal, Theme)
document.addEventListener('DOMContentLoaded', () => {
    // Splash screen
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 500);
    }, 1200);

    // Warning Modal
    if (!localStorage.getItem('armory_warning_accepted')) {
        document.getElementById('warning-modal').classList.add('active');
    }
    document.getElementById('btn-accept-warning').addEventListener('click', () => {
        localStorage.setItem('armory_warning_accepted', 'true');
        document.getElementById('warning-modal').classList.remove('active');
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const isLight = localStorage.getItem('armory_theme') === 'light';
    if (isLight) document.body.classList.add('light-mode');
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('armory_theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // Cập nhật badge giỏ hàng
    updateCartBadge();
    
    // Render Hero Slider
    initHeroSlider();

    // Render danh sách sản phẩm
    renderProducts();
    
    // Back to top
    window.addEventListener('scroll', () => {
        const btt = document.getElementById('back-to-top');
        if (window.scrollY > 500) btt.classList.add('visible');
        else btt.classList.remove('visible');
    });
    document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo(0,0));
});

// 3. HERO SLIDER LOGIC
function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    const dotsContainer = document.getElementById('slider-dots');
    const slidesData = [
        { bg: '#ff7a1a', text: 'KHUYẾN MÃI MÙA HÈ LÊN ĐẾN 50%' },
        { bg: '#2a2d35', text: 'SÚNG ĐẠN XỐP MẪU MỚI VỀ' },
        { bg: '#1a1c21', text: 'PHỤ KIỆN TACTICAL CHUYÊN NGHIỆP' }
    ];
    
    slidesData.forEach((s, index) => {
        const div = document.createElement('div');
        div.className = 'slide';
        div.style.background = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), ${s.bg}`;
        div.innerHTML = `<h2>${s.text}</h2>`;
        slider.appendChild(div);

        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    let currentSlide = 0;
    const goToSlide = (index) => {
        currentSlide = (index + slidesData.length) % slidesData.length;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentSlide);
        });
    };

    document.getElementById('slider-prev').addEventListener('click', () => goToSlide(currentSlide - 1));
    document.getElementById('slider-next').addEventListener('click', () => goToSlide(currentSlide + 1));
    setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// 4. RENDER VÀ LỌC SẢN PHẨM
let productResizeObserver;
let productAutoScrollTimers = [];

function renderProducts() {
    productResizeObserver?.disconnect();
    productAutoScrollTimers.forEach(clearInterval);
    productAutoScrollTimers = [];
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // Clear hiện tại

    // Lọc data
    let filtered = PRODUCTS.filter(p => {
        const matchCategory = currentState.category === 'all' || p.category === currentState.category;
        const matchSearch = p.name.toLowerCase().includes(currentState.search.toLowerCase());
        
        let matchPrice = true;
        if (currentState.priceFilter === 'under-500') matchPrice = p.price < 500000;
        else if (currentState.priceFilter === '500-1000') matchPrice = p.price >= 500000 && p.price <= 1000000;
        else if (currentState.priceFilter === '1000-2000') matchPrice = p.price > 1000000 && p.price <= 2000000;
        else if (currentState.priceFilter === 'over-2000') matchPrice = p.price > 2000000;

        return matchCategory && matchSearch && matchPrice;
    });

    // Sắp xếp
    if (currentState.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (currentState.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (currentState.sort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    // newest giữ nguyên mảng gốc

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Không tìm thấy sản phẩm phù hợp.</p>';
        return;
    }

    const categories = [
        { id: 'gun', name: 'Súng đồ chơi' },
        { id: 'melee', name: 'Vũ khí cận chiến' },
        { id: 'accessory', name: 'Phụ kiện' }
    ];
    
    categories.forEach(category => {
        const products = filtered.filter(p => p.category === category.id);
        if (!products.length) return;
        
        const section = document.createElement('section');
        section.className = 'product-category';
        section.setAttribute('aria-labelledby', `heading-${category.id}`);
        section.innerHTML = `
            <h3 class="category-heading" id="heading-${category.id}">${category.name}</h3>
            <div class="product-carousel">
                <button type="button" class="carousel-arrow carousel-prev" aria-label="Cuộn trái: ${category.name}" aria-controls="track-${category.id}">&#8592;</button>
                <div class="product-track" id="track-${category.id}" tabindex="0" role="region" aria-label="${category.name}"></div>
                <button type="button" class="carousel-arrow carousel-next" aria-label="Cuộn phải: ${category.name}" aria-controls="track-${category.id}">&#8594;</button>
            </div>`;
            
        grid.appendChild(section);
        const track = section.querySelector('.product-track');
        
        products.forEach(p => {
            const card = document.createElement('article');
            card.className = 'product-card';
            
            let badgesHTML = '';
            p.tags.forEach(tag => {
                if(tag === 'hot') badgesHTML += `<span class="badge badge-hot">HOT</span>`;
                if(tag === 'new') badgesHTML += `<span class="badge badge-new">MỚI</span>`;
                if(tag === 'sale') badgesHTML += `<span class="badge badge-sale">GIẢM</span>`;
            });

            card.innerHTML = `
                <div class="card-img-wrapper">
                    <div class="card-badges">${badgesHTML}</div>
                    <img src="${p.image}" alt="${p.name}" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${p.name}</h3>
                    <div class="card-status ${p.stock ? 'in-stock' : ''}">${p.stock ? '✔ Có sẵn' : '✖ Hết hàng'}</div>
                    <div class="card-price-wrap">
                        <span class="price">${formatVND(p.price)}</span>
                        ${p.oldPrice ? `<span class="old-price">${formatVND(p.oldPrice)}</span>` : ''}
                    </div>
                    <div class="card-actions">
                        <a href="product.html?id=${p.id}" class="btn btn-outline">Chi tiết</a>
                        <button class="btn btn-primary" onclick="addToCart('${p.id}')" ${!p.stock ? 'disabled' : ''}>
                            ${p.stock ? 'Thêm Giỏ' : 'Hết Hàng'}
                        </button>
                    </div>
                </div>
            `;
            track.appendChild(card);
        });
        
        // --- XỬ LÝ CUỘN VÀ AUTO SCROLL ---
        const prev = section.querySelector('.carousel-prev');
        const next = section.querySelector('.carousel-next');
        
        const updateArrows = () => {
            prev.disabled = track.scrollLeft <= 1;
            next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        };
        
        // Hàm cuộn theo 1 sản phẩm
        const scroll = (direction) => {
            const card = track.querySelector('.product-card');
            if(!card) return;
            // Tính khoảng cách cần cuộn = chiều rộng 1 card + khoảng trống (gap)
            const gap = parseFloat(getComputedStyle(track).gap) || 12;
            const step = card.offsetWidth + gap;
            track.scrollBy({ left: direction * step, behavior: 'smooth' });
        };

        prev.addEventListener('click', () => scroll(-1));
        next.addEventListener('click', () => scroll(1));

        // Tự động cuộn 1 sản phẩm mỗi 3 giây (3000ms)
        productAutoScrollTimers.push(setInterval(() => {
            // Tạm dừng cuộn nếu tab đang ẩn hoặc chuột đang rê vào khu vực sản phẩm
            if (document.hidden || section.matches(':hover') || section.contains(document.activeElement)) return;
            
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (maxScroll <= 1) return; // Không cần cuộn nếu ít sản phẩm

            // Nếu đã cuộn đến sản phẩm cuối cùng, tự động mượt mà quay lại từ đầu
            if (track.scrollLeft >= maxScroll - 5) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scroll(1); // Tiếp tục cuộn sang phải 1 sản phẩm
            }
        }, 3000));

        track.addEventListener('scroll', updateArrows, { passive: true });
        
        // Cho phép dùng phím mũi tên để cuộn khi tab focus
        track.addEventListener('keydown', event => {
            if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            scroll(event.key === 'ArrowLeft' ? -1 : 1);
        });
        
        updateArrows();
    });
    
    productResizeObserver = new ResizeObserver(() => {
        grid.querySelectorAll('.product-category').forEach(section => {
            const track = section.querySelector('.product-track');
            section.querySelector('.carousel-prev').disabled = track.scrollLeft <= 1;
            section.querySelector('.carousel-next').disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        });
    });
    
    grid.querySelectorAll('.product-track').forEach(track => productResizeObserver.observe(track));
}

// Lắng nghe sự kiện lọc/sort
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentState.category = e.target.dataset.category;
        renderProducts();
    });
});

document.querySelectorAll('.price-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
        document.querySelectorAll('.price-chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        currentState.priceFilter = e.target.dataset.price;
        renderProducts();
    });
});

document.getElementById('sort-select').addEventListener('change', (e) => {
    currentState.sort = e.target.value;
    renderProducts();
});

document.getElementById('search-input').addEventListener('input', (e) => {
    currentState.search = e.target.value;
    renderProducts(); // Tìm kiếm realtime
});

// 5. GIỎ HÀNG & TOAST THÔNG BÁO
function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product || !product.stock) return;

    const existing = currentState.cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        currentState.cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image });
    }
    
    localStorage.setItem('armory_cart', JSON.stringify(currentState.cart));
    updateCartBadge();
    showToast(`Đã thêm <b>${product.name}</b> vào giỏ!`);
}

function updateCartBadge() {
    const total = currentState.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-badge').innerText = total;
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}