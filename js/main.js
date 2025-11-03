// ===================================
// スムーススクロール
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// スクロールアニメーション
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象要素
const animateElements = document.querySelectorAll(`
    .problem-card,
    .solution-card,
    .pricing-card,
    .stat-card,
    .feature-card,
    .flow-step
`);

animateElements.forEach(el => {
    observer.observe(el);
});

// ===================================
// フォーム送信処理
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = {
            company: document.getElementById('company').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // ここでフォームデータを送信する処理を実装
        // 例: fetch APIを使ってバックエンドに送信
        console.log('フォームデータ:', formData);
        
        // 送信完了メッセージ
        alert('お問い合わせありがとうございます。\n担当者より3営業日以内にご連絡させていただきます。');
        
        // フォームをリセット
        contactForm.reset();
    });
}

// ===================================
// ボタンホバー効果
// ===================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// スクロール位置に応じたヘッダー表示(オプション)
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール方向の検出
    if (currentScroll > lastScroll && currentScroll > 100) {
        // 下にスクロール
        document.body.classList.add('scroll-down');
    } else {
        // 上にスクロール
        document.body.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// カウントアップアニメーション(統計数値用)
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// 統計セクションが表示されたときにカウントアップを開始
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(number)) {
                    stat.textContent = '0';
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// ページ読み込み時の処理
// ===================================
window.addEventListener('load', () => {
    // ページの読み込みが完了したら、ヒーローセクションをフェードイン
    document.querySelector('.hero').classList.add('fade-in-up');
});

// ===================================
// レスポンシブメニュー(必要に応じて実装)
// ===================================
// 現在のデザインにはナビゲーションメニューがないため、
// 必要に応じてハンバーガーメニューなどを追加できます

console.log('LP loaded successfully!');