// ========== MENU MOBILE ==========
const menuToggle = document.getElementById('mobile-menu');
const navLinksMenu = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
    });
}

navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
    });
});

// ========== DESTAQUE DO MENU ATIVO ==========
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ========== EFEITO DIGITAÇÃO ==========
const typedElement = document.getElementById('typed-text');
const words = [  '💡 Criando codigos',' com calma'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
        return;
    }
    const speed = isDeleting ? 60 : 100;
    setTimeout(typeEffect, speed);
}
typeEffect();

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });

revealElements.forEach(section => observer.observe(section));

window.addEventListener('load', () => {
    revealElements.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
});

// ========== ESCONDER MENU AO SCROLLAR ==========
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 80) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// ========== ENVIO PARA WHATSAPP (CORRIGIDO) ==========
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toastMsg');

// 🔁 SUBSTITUA PELO SEU NÚMERO (código país + DDD + número, sem + e sem espaços)
const whatsappNumber = '558994334737';  // Exemplo Brasil: 55 11 99999-9999

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert("Por favor, preencha todos os campos (nome, e-mail e mensagem).");
            return;
        }

        // Monta a mensagem formatada
        const whatsappMsg = `*Novo contato do portfólio*\n\n👤 *Nome:* ${name}\n📧 *E-mail:* ${email}\n💬 *Mensagem:*\n${message}`;
        const encodedMsg = encodeURIComponent(whatsappMsg);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

        // Abre o WhatsApp (web ou app)
        window.open(whatsappLink, '_blank');

        // Exibe toast de confirmação
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);

        // Limpa o formulário
        contactForm.reset();
    });
}