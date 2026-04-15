// DOM元素选择
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const courseCards = document.querySelectorAll('.course-card');
const featureItems = document.querySelectorAll('.feature-item');

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 响应式导航菜单
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // 切换汉堡菜单图标
    const icon = hamburger.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 点击导航链接关闭菜单
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 平滑滚动
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const target = item.getAttribute('href');
        
        // 检查是否是返回主网站的链接
        if (target === 'index.html' && item.classList.contains('btn-primary')) {
            // 直接跳转到主网站
            window.location.href = target;
        } else if (target === 'index.html') {
            // 在当前网站内滚动到顶部
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // 对于其他链接，直接跳转
            window.location.href = target;
        }
    });
});

// 滚动动画 - 元素进入视口时显示
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

// 为课程卡片和特色项目添加滚动动画
courseCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

featureItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// 为页面上的所有链接添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 考虑导航栏高度
                behavior: 'smooth'
            });
        }
    });
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    // 隐藏预加载器（如果有）
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // 页面元素渐入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 添加页面标题动画
    const pageTitle = document.title;
    let index = 0;
    
    function animateTitle() {
        if (index < pageTitle.length) {
            document.title = pageTitle.substring(0, index + 1) + '|';
            index++;
            setTimeout(animateTitle, 100);
        } else {
            document.title = pageTitle;
        }
    }
    
    // 延迟启动标题动画
    setTimeout(animateTitle, 500);
});

// 鼠标跟随效果（可选，用于增强视觉体验）
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// 创建自定义光标元素
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// 添加光标样式
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background-color: rgba(52, 152, 219, 0.3);
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// 更新鼠标位置
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 动画光标移动
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// 启动光标动画
animateCursor();

// 为按钮添加悬停效果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.5)';
    });
    
    btn.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
    });
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭菜单
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // 空格键滚动到下一个部分
    if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight);
    }
    
    // 上下箭头键滚动
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy(0, -100);
    }
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy(0, 100);
    }
});

// 窗口大小改变时重置动画状态
window.addEventListener('resize', () => {
    // 重置元素的动画状态
    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
    });
    
    // 重新观察元素
    setTimeout(() => {
        courseCards.forEach(card => observer.observe(card));
        featureItems.forEach(item => observer.observe(item));
    }, 100);
});