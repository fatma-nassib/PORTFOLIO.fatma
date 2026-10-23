// Preloader with delay to ensure visibility
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
    }, 500); // Minimum 500ms display
});

// Smooth scrolling for navigation links
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

// Highlight active section in sidebar on scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            const id = section.getAttribute('id');
            document.querySelectorAll('.sidebar a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Interactive buttons and elements
document.querySelector('.cv-button').addEventListener('click', () => {
    alert('CV download functionality would be implemented here with a proper file link.');
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        if (!e.target.closest('.contact-form')) {
            e.preventDefault();
            alert(`Clicked on ${button.textContent} button!`);
        }
    });
});

document.querySelector('.image-content').addEventListener('click', () => {
    alert('Profile image clicked!');
});

document.querySelectorAll('.stat').forEach(stat => {
    stat.addEventListener('click', () => {
        alert(`Stat clicked: ${stat.querySelector('h3').content} ${stat.querySelector('p').textContent}`);
    });
});

document.querySelectorAll('.interest-item').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Interest clicked: ${item.textContent}`);
    });
});

document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Skill clicked: ${item.textContent.split('\n')[0]}`);
    });
});

// Updated Certifications Interaction
document.querySelectorAll('.cert-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Viewing certificate for ${link.parentElement.textContent.split('\n')[0]}...`);
        setTimeout(() => {
            window.open(link.href, link.target);
        }, 500);
    });
});

document.querySelectorAll('.cert-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
            alert(`Certificate clicked: ${item.textContent.split('\n')[0]}`);
        }
    });
});

// Projects Filtering and Details
const filterButtons = document.querySelectorAll('#projects .tabs button');
const projectItems = document.querySelectorAll('#projects .gallery .item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const details = item.querySelector('.project-details');
        if (details.style.display === 'flex') {
            details.style.display = 'none';
        } else {
            details.style.display = 'flex';
        }
    });
});

// Contact Form Submission (Placeholder)
document.querySelector('.contact-form button').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.querySelector('.contact-form input[type="text"]').value;
    const email = document.querySelector('.contact-form input[type="email"]').value;
    const message = document.querySelector('.contact-form textarea').value;
    if (name && email && message) {
        alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
        document.querySelector('.contact-form').reset();
    } else {
        alert('Please fill all fields!');
    }
});

// Contact Methods Interaction
document.querySelectorAll('.contact-methods .method').forEach(method => {
    method.addEventListener('click', (e) => {
        e.preventDefault();
        const link = method.querySelector('a');
        if (link) {
            alert(`Opening ${link.title}...`);
            setTimeout(() => {
                window.open(link.href, link.target);
            }, 500);
        }
    });
});