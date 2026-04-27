// Data galeri foto
const galleryData = [
    {
        id: 1,
        category: 'academic',
        image: '-',
        title: '-',
        description: '-',
        date: '-'
    },
    {
        id: 2,
        category: 'event',
        image: 'IMG-20250227-WA0024.jpg',
        title: 'Pornsi',
        description: 'porseni pertama 2022 ',
        date: '-'
    },
    {
        id: 3,
        category: 'friendship',
        image: '-',
        title: '-',
        description: '-',
        date: '-'
    },
    {
        id: 4,
        category: 'graduation',
        image: 'ai_retouch_202503170051578899.jpg',
        title: 'Pelulusan',
        description: 'Momen kelulusan',
        date: '-'
    },
    {
        id: 5,
        category: 'academic',
        image: '-',
        title: '-',
        description: '-',
        date: '-'
    },
    {
        id: 6,
        category: 'event',
        image: 'IMG-20250612-WA0003.jpg',
        title: 'porseni terbaik',
        description: 'juara 1 lomba porseni',
        date: '-'
    },
    {
        id: 7,
        category: 'friendship',
        image: '-',
        title: '-',
        description: '-',
        date: '-'
    },
    {
        id: 8,
        category: 'graduation',
        image: '-',
        title: '-',
        description: '-',
        date: '-'
    },
    {
        id: 9,
        category: 'event',
        image: '-',
        title: '-',
        description: '-',
        date: '-'
    }
];

// Data memories slider
const memoriesData = [
    {
        image: '-',
        title: '-',
        date: '-',
        content: '-'
    },
    {
        image: '-',
        title: '-',
        date: '-',
        content: '-'
    },
    {
        image: '-',
        title: '-',
        date: '-',
        content: '-'
    },
    {
        image: '-',
        title: '-',
        date: '-',
        content: '-'
    },
    {
        image: '-',
        title: '-',
        date: '-',
        content: '-.'
    },
    {
        image: '-',
        title: '-',
        date: '-',
        content: '-'
    }
];

// Load gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    loadGallery('all');
    loadMemoriesSlider();
    initParticles();
    initStatsCounter();
    initNavbar();
    initBackToTop();
    initFilterButtons();
    initFormSubmission();
});

// Load gallery berdasarkan filter
function loadGallery(filter) {
    const galleryGrid = document.getElementById('galleryGrid');
    const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
    
    galleryGrid.innerHTML = filteredData.map(item => `
        <div class="gallery-item" data-category="${item.category}" onclick="openModal(${item.id})">
            <img src="${item.image}" alt="${item.title}" class="gallery-image">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <small><i class="far fa-calendar-alt"></i> ${item.date}</small>
            </div>
        </div>
    `).join('');
}

// Load memories slider
function loadMemoriesSlider() {
    const sliderContainer = document.getElementById('memoriesSlider');
    let currentIndex = 0;
    
    function renderSlider() {
        const visibleCards = window.innerWidth <= 768 ? 1 : 3;
        const endIndex = Math.min(currentIndex + visibleCards, memoriesData.length);
        const visibleMemories = memoriesData.slice(currentIndex, endIndex);
        
        sliderContainer.innerHTML = visibleMemories.map(memory => `
            <div class="memory-card">
                <img src="${memory.image}" alt="${memory.title}" class="memory-image">
                <div class="memory-content">
                    <h3>${memory.title}</h3>
                    <div class="memory-date">
                        <i class="far fa-calendar-alt"></i> ${memory.date}
                    </div>
                    <p>${memory.content}</p>
                </div>
            </div>
        `).join('');
        
        // Tambahkan card kosong jika jumlah kurang dari 3
        if (visibleMemories.length < 3 && window.innerWidth > 768) {
            for (let i = visibleMemories.length; i < 3; i++) {
                sliderContainer.innerHTML += `
                    <div class="memory-card" style="opacity: 0; pointer-events: none;">
                        <div style="height: 200px;"></div>
                    </div>
                `;
            }
        }
    }
    
    renderSlider();
    
    // Event listeners untuk slider navigation
    document.querySelector('.slider-prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderSlider();
        }
    });
    
    document.querySelector('.slider-next').addEventListener('click', () => {
        const maxIndex = memoriesData.length - (window.innerWidth <= 768 ? 1 : 3);
        if (currentIndex < maxIndex) {
            currentIndex++;
            renderSlider();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        renderSlider();
    });
}

// Filter buttons
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery
            const filter = btn.getAttribute('data-filter');
            loadGallery(filter);
        });
    });
}

// Modal functionality
function openModal(id) {
    const item = galleryData.find(i => i.id === id);
    if (item) {
        const modal = document.getElementById('photoModal');
        const modalImg = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalDate = document.getElementById('modalDate');
        
        modalImg.src = item.image;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        modalDate.textContent = item.date;
        
        modal.style.display = 'block';
        
        // Close modal
        const closeBtn = document.getElementsByClassName('close')[0];
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
}

// Particle animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // Add keyframes for float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetCount = parseInt(element.getAttribute('data-count'));
                animateNumber(element, targetCount);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Active link on scroll
        let scrollPosition = window.scrollY;
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navMenu.classList.remove('active');
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Form submission
function initFormSubmission() {
    const form = document.getElementById('shareMemoryForm');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const photo = document.getElementById('photo').files[0];
        
        // Simulate form submission
        formMessage.innerHTML = 'Mengirim kenanganmu...';
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.innerHTML = '✨ Terima kasih telah berbagi kenangan! Ceritamu akan kami upload.';
            formMessage.className = 'form-message success';
            form.reset();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 3000);
        }, 1500);
    });
}

// Scroll to gallery function
function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .memory-card, .about-content, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const header = document.querySelector('.header');
    if (header) {
        header.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Console welcome message
console.log('%c✨ Selamat datang di Galeri Kenangan SMA! ✨', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
console.log('%cSetiap foto menyimpan cerita indah masa remaja', 'color: #4ecdc4; font-size: 14px;');