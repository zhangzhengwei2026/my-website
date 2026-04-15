document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const workCards = document.querySelectorAll('[data-work]');
    const modal = document.getElementById('workDetailModal');
    const modalClose = document.getElementById('modalClose');
    const detailImage = document.getElementById('detailImage');
    const contactForm = document.getElementById('contactForm');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            pageSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetPage) {
                    section.classList.add('active');
                }
            });

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    const workData = {
        1: {
            title: '智能健康管理APP',
            description: '健康数据监测、饮食运动推荐、医生咨询',
            image: 'image/work-page-1.jpg'
        },
        2: {
            title: '跨境电商PC端商城',
            description: '海外商品展示、购物下单、会员中心',
            image: 'image/work-page-2.jpg'
        },
        3: {
            title: '政务服务小程序',
            description: '政务事项查询、在线办理、进度查询',
            image: 'image/work-page-3.jpg'
        },
        4: {
            title: '少儿启蒙教育APP',
            description: '动画课程、趣味练习、亲子互动',
            image: 'image/work-page-4.jpg'
        },
        5: {
            title: '金融理财APP',
            description: '理财产品展示、收益查询、充值提现',
            image: 'image/work-page-5.jpg'
        },
        6: {
            title: '旅游预订小程序',
            description: '景点门票预订、酒店预订、旅游线路推荐',
            image: 'image/work-page-6.jpg'
        }
    };

    workCards.forEach(card => {
        card.addEventListener('click', function() {
            const workId = this.getAttribute('data-work');
            const work = workData[workId];

            if (work) {
                detailImage.setAttribute('src', work.image);
                detailImage.setAttribute('alt', work.title);
                detailImage.style.display = 'block';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);

    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('请填写完整的联系信息');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址');
            return;
        }

        alert('感谢您的留言！我会尽快与您联系。');
        this.reset();
    });

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetLink = document.querySelector(`.nav-link[data-page="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    }

    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });

    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    navbar.style.transition = 'transform 0.3s ease';
});
