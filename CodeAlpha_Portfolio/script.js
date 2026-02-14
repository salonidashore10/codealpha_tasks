

// Smooth scrolling
document.querySelectorAll('#header a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Active navbar highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#header a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});


// Contact form working
const form = document.querySelector('.contact');

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Your Email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        alert('Please fill all fields!');
        return;
    }

    alert('Message sent successfully!');
    form.reset();
});