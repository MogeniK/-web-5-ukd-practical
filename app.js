/**
 * SPA Architecture Engine — Практична робота №5
 * Чистий Vanilla JavaScript (ECMAScript 6+) без сторонніх бібліотек.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація компонентів
    initSessionTimer();
    initClientRouting();
    initFormHandler();
});

/**
 * Крок 2. State Monitor: Динамічний секундомір сесії на window.setInterval()
 * Доводить збереження стану JS під час навігації в SPA.
 */
function initSessionTimer() {
    let secondsElapsed = 0;
    const timerElement = document.getElementById('session-timer');

    setInterval(() => {
        secondsElapsed++;
        const hrs = String(Math.floor(secondsElapsed / 3600)).padStart(2, '0');
        const mins = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(2, '0');
        const secs = String(secondsElapsed % 60).padStart(2, '0');
        
        if (timerElement) {
            timerElement.textContent = `${hrs}:${mins}:${secs}`;
        }
    }, 1000);
}

/**
 * Крок 3. Програмна реалізація клієнтської маршрутизації (Client-Side Navigation)
 * Використано делегування подій на навігаційному контейнері та обробку hashchange.
 */
function initClientRouting() {
    const navContainer = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    // Перемикання секцій за ID
    function navigateToSection(targetId) {
        let activeFound = false;

        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('is-hidden');
                activeFound = true;
            } else {
                section.classList.add('is-hidden');
            }
        });

        // Якщо хеш не відповідає жодній секції, показуємо першу (за замовчуванням)
        if (!activeFound && sections.length > 0) {
            sections[0].classList.remove('is-hidden');
            targetId = sections[0].id;
        }

        // Оновлення активного стану посилань в меню
        navLinks.forEach(link => {
            const linkTarget = link.getAttribute('data-section') || link.getAttribute('href').replace('#', '');
            if (linkTarget === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Підхід Б: Делегування кліків на контейнері <nav>
    navContainer.addEventListener('click', (event) => {
        const targetLink = event.target.closest('.nav-link');
        if (!targetLink) return;

        event.preventDefault(); // Запобігання стандартному перезавантаженню/переходу

        const sectionId = targetLink.getAttribute('data-section') || targetLink.getAttribute('href').replace('#', '');
        
        // Оновлюємо URL хеш без перезавантаження сторінки
        window.location.hash = sectionId;
        navigateToSection(sectionId);
    });

    // Підхід А: Обробка зміни хешу URL (подія hashchange)
    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash) {
            navigateToSection(currentHash);
        }
    });

    // Початкова маршрутизація відповідно до поточного URL-хешу
    const initialHash = window.location.hash.replace('#', '');
    navigateToSection(initialHash || 'catalog');
}

/**
 * Обробник форми зворотного зв'язку
 */
function initFormHandler() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('username');
        alert(`Дякуємо, ${name}! Ваше повідомлення успішно надіслано (імітація SPA без перезавантаження).`);
        form.reset();
    });
}
