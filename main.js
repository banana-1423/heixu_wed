// 页面加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
     // 移动端菜单切换
     const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
     const navMenu = document.querySelector('.nav-menu');
     
     if (mobileMenuBtn && navMenu) {
         mobileMenuBtn.addEventListener('click', function() {
             navMenu.classList.toggle('active');
             this.classList.toggle('active');
         });
     }
     
     // 平滑滚动到锚点
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             e.preventDefault();
             
             const targetId = this.getAttribute('href');
             if (targetId === '#') return;
             
             const targetElement = document.querySelector(targetId);
             if (targetElement) {
                 // 考虑固定导航栏的高度
                 const navbarHeight = document.querySelector('.navbar').offsetHeight;
                 const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                 
                 window.scrollTo({
                     top: targetPosition,
                     behavior: 'smooth'
                 });
                 
                 // 如果是移动端，点击链接后关闭菜单
                 if (navMenu && navMenu.classList.contains('active')) {
                     navMenu.classList.remove('active');
                     if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                         mobileMenuBtn.classList.remove('active');
                     }
                 }
             }
         });
     });
     
     // 导航栏滚动效果
     const navbar = document.querySelector('.navbar');
     if (navbar) {
         let lastScrollTop = 0;
         
         window.addEventListener('scroll', function() {
             const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
             
             if (scrollTop > lastScrollTop && scrollTop > 100) {
                 // 向下滚动，隐藏导航栏
                 navbar.style.transform = 'translateY(-100%)';
             } else {
                 // 向上滚动或在顶部，显示导航栏
                 navbar.style.transform = 'translateY(0)';
             }
             
             lastScrollTop = scrollTop;
         });
     }
     
     // 滚动渐入效果
     const observerOptions = {
         threshold: 0.1,
         rootMargin: '0px 0px -50px 0px'
     };
     
     const observer = new IntersectionObserver(function(entries) {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.style.opacity = '1';
                 entry.target.style.transform = 'translateY(0)';
             }
         });
     }, observerOptions);
     
     // 为所有需要渐入的元素添加观察
     document.querySelectorAll('.about-card, .feature-card, .member-card, .contact-info, .contact-form').forEach(el => {
         el.style.opacity = '0';
         el.style.transform = 'translateY(30px)';
         el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
         observer.observe(el);
     });
     
     // 初始化星系图背景
     if (typeof initGalaxyBackground === 'function') {
         initGalaxyBackground();
     }
 });
 
 // 添加一些额外的工具函数
 
 // 获取随机整数
 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
 // 防抖函数
 function debounce(func, wait, immediate) {
     var timeout;
     return function executedFunction() {
         var context = this;
         var args = arguments;
         
         var later = function() {
             timeout = null;
             if (!immediate) func.apply(context, args);
         };
         
         var callNow = immediate && !timeout;
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
         
         if (callNow) func.apply(context, args);
     };
 }
 
 // 节流函数
 function throttle(func, limit) {
     var inThrottle;
     return function() {
         var args = arguments;
         var context = this;
         if (!inThrottle) {
             func.apply(context, args);
             inThrottle = true;
             setTimeout(function() { inThrottle = false; }, limit);
         }
     };
 }
 
 // 动态添加标题效果（可选）
 function addTitleEffects() {
     const titles = document.querySelectorAll('.hero-title, .section-title');
     
     titles.forEach(title => {
         title.addEventListener('mouseenter', function() {
             this.style.transform = 'scale(1.05)';
             this.style.transition = 'transform 0.3s ease';
         });
         
         title.addEventListener('mouseleave', function() {
             this.style.transform = 'scale(1)';
         });
     });
 }
 
 // 当页面完全加载后添加额外效果
 window.addEventListener('load', function() {
     addTitleEffects();
 });


// 可移动小球背景效果
class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }
    
    reset() {
        // 随机位置
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        
        // 随机大小
        this.radius = Math.random() * 4 + 1; // 1-5px
        
        // 随机速度
        this.vx = (Math.random() - 0.5) * 0.5; // -0.25 到 0.25 px/frame
        this.vy = (Math.random() - 0.5) * 0.5; // -0.25 到 0.25 px/frame
        
        // 随机颜色（蓝色系）
        const blueShades = [
            'rgba(74, 134, 255, 0.6)', // 主色调
            'rgba(106, 157, 255, 0.5)', // 次要色调
            'rgba(138, 180, 255, 0.4)', // 浅色
            'rgba(53, 115, 232, 0.7)'   // 深色
        ];
        this.color = blueShades[Math.floor(Math.random() * blueShades.length)];
        
        // 随机透明度
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        // 更新位置
        this.x += this.vx;
        this.y += this.vy;
        
        // 边界检测
        if (this.x < -this.radius) {
            this.x = this.canvas.width + this.radius;
        } else if (this.x > this.canvas.width + this.radius) {
            this.x = -this.radius;
        }
        
        if (this.y < -this.radius) {
            this.y = this.canvas.height + this.radius;
        } else if (this.y > this.canvas.height + this.radius) {
            this.y = -this.radius;
        }
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // 创建渐变效果
        const gradient = this.ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color.replace('0.6', '0.8').replace('0.5', '0.7').replace('0.4', '0.6').replace('0.7', '0.9'));
        gradient.addColorStop(1, this.color.replace('0.6', '0.2').replace('0.5', '0.1').replace('0.4', '0.05').replace('0.7', '0.3'));
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // 添加光晕效果
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.color;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
}

function initMovingBalls() {
    const canvas = document.getElementById('moving-balls');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 设置canvas大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 创建小球
    const balls = [];
    const ballCount = 80; // 小球数量
    
    for (let i = 0; i < ballCount; i++) {
        balls.push(new Ball(canvas));
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        balls.forEach(ball => {
            ball.update();
            ball.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 初始化小球背景
document.addEventListener('DOMContentLoaded', function() {
    initMovingBalls();
});

// 表单处理（GitHub Actions）
document.addEventListener('DOMContentLoaded', function() {
    const submitFormBtn = document.getElementById('submitFormBtn');
    const formStatus = document.getElementById('formStatus');
    
    // 生成随机验证通盘
    function generateVerificationCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', async function() {
            // 获取表单数据
            const gameId = (document.getElementById('gameId')?.value || '').trim();
            const contact = (document.getElementById('contact')?.value || '').trim();
            const reason = (document.getElementById('reason')?.value || '').trim();
            const experience = (document.getElementById('experience')?.value || '').trim();
            
            // 验证必填字段
            if (!gameId || !contact || !reason || !experience) {
                formStatus.innerHTML = '<div class="error-message">❌ 请填写所有必填字段</div>';
                formStatus.className = 'form-status error';
                setTimeout(() => {
                    formStatus.innerHTML = '';
                    formStatus.className = 'form-status';
                }, 5000);
                return;
            }
            
            // 生成隐藏的验证通盘
            const verificationCode = generateVerificationCode();
            
            // 禁用按钮
            submitFormBtn.disabled = true;
            submitFormBtn.textContent = '提交中...';
            
            try {
                // 触发 GitHub Actions workflow
                // 注意：这里需要替换为你的 GitHub 用户名和仓库名
                const response = await fetch('https://api.github.com/repos/banana-1423/heixu_wed/dispatches', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify({
                        event_type: 'form_submission',
                        client_payload: {
                            gameId: gameId,
                            contact: contact,
                            reason: reason,
                            experience: experience,
                            verificationCode: verificationCode
                        }
                    })
                });
                
                if (response.ok) {
                    // 显示成功消息
                    formStatus.innerHTML = '<div class="success-message">✅ 申请提交成功！我们会在24小时内回复您。</div>';
                    formStatus.className = 'form-status success';
                    
                    // 清空表单
                    document.getElementById('gameId')?.value = '';
                    document.getElementById('contact')?.value = '';
                    document.getElementById('reason')?.value = '';
                    document.getElementById('experience')?.value = '';
                } else {
                    throw new Error('提交失败，请稍后重试');
                }
            } catch (error) {
                formStatus.innerHTML = '<div class="error-message">❌ ' + error.message + '</div>';
                formStatus.className = 'form-status error';
            } finally {
                // 恢复按钮
                setTimeout(() => {
                    submitFormBtn.disabled = false;
                    submitFormBtn.textContent = '提交申请';
                    formStatus.innerHTML = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }
        });
    }
});