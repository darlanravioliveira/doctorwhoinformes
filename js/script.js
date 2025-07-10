document.addEventListener('DOMContentLoaded', () => {

    
    const doctorsData = [
        { id: 1, name: '1º Doutor', actor: 'William Hartnell', desc: 'A encarnação original. Um avô misterioso e ranzinza que gradualmente se tornou um herói.', img: 'imagens/William Hartnell.jpg' },
        { id: 9, name: '9º Doutor', actor: 'Christopher Eccleston', desc: 'O sobrevivente da Guerra do Tempo, com um exterior duro mas um coração bondoso. "Fantastic!"', img: 'imagens/Christopher Eccleston.jpg' }, 
        { id: 10, name: '10º Doutor', actor: 'David Tennant', desc: 'O herói carismático e falante com um lado sombrio. "Allons-y!"', img: 'imagens/David Tennant.jpg' }, 
        { id: 11, name: '11º Doutor', actor: 'Matt Smith', desc: 'A alma antiga em um corpo jovem. Amava gravatas borboleta e fez fezzes serem legais. "Geronimo!"', img: 'imagens/Matt Smith.jpg' }, 
        { id: 12, name: '12º Doutor', actor: 'Peter Capaldi', desc: 'O Doutor roqueiro, com sobrancelhas de ataque e uma busca por sua própria identidade. Questionava se era um bom homem.', img: 'imagens/Peter Capaldi.jpg' }, 
        { id: 13, name: '13ª Doutora', actor: 'Jodie Whittaker', desc: 'A primeira encarnação feminina, cheia de otimismo, esperança e com uma "fam" de companheiros. "Brilliant!"', img: 'imagens/Jodie Whittaker.jpg' }, 
        { id: 14, name: '14º Doutor', actor: 'David Tennant', desc: 'Um rosto familiar que retornou inesperadamente, revisitando velhas mágoas antes de uma "bi-geração".', img: 'imagens/David Tennant14.jpg' }, 
    ];

    const villainsData = [
        { name: 'Daleks', desc: 'Mutantes genocidas em tanques de guerra. Seu único objetivo é exterminar toda a vida não-Dalek. "EXTERMINATE!"', img: 'imagens/Daleks.jpg' }, 
        { name: 'Cybermen', desc: 'Seres cibernéticos que convertem humanos para aumentar suas fileiras. Frios, lógicos e sem emoção. "You will be upgraded."', img: 'imagens/Cybermen.jpg' }, 
        { name: 'Weeping Angels', desc: 'Predadores quânticos que se parecem com estátuas. São rápidos e mortais. "Don\'t blink. Blink and you\'re dead."', img: 'imagens/Weeping Angels.jpg' }, 
        { name: 'The Master (Missy)', desc: 'Uma encarnação feminina do Mestre, tão caótica e perigosa quanto suas versões anteriores, mas com um novo estilo. "I\'m Missy. Short for Mistress..."', img: 'imagens/The Master (Missy).jpg' }, 
    ];

    const navLinks = document.querySelectorAll('.nav-link, .logo');
    const pages = document.querySelectorAll('.page-content');
    const mainNav = document.getElementById('main-nav-links');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        mainNav.classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.currentTarget.dataset.page;
            showPage(pageId);
        });
    });

    // --- MENU HAMBURGER (Mobile) ---
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // --- PREENCHIMENTO DINÂMICO DAS GALERIAS ---
    const doctorsGrid = document.getElementById('doctors-grid');
    const villainsGrid = document.getElementById('villains-grid');

    function populateGrids() {
        doctorsData.sort((a, b) => a.id - b.id);

        doctorsData.forEach(doctor => {
            const card = document.createElement('div');
            card.className = 'card doctor-card';
            card.dataset.id = doctor.id;
            card.innerHTML = `
                <img src="${doctor.img}" alt="Foto de ${doctor.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x300/000/fff?text=Imagem+Indisponível';">
                <div class="card-content">
                    <h3>${doctor.name}</h3>
                    <p>${doctor.actor}</p>
                </div>
            `;
            doctorsGrid.appendChild(card);
        });

        villainsData.forEach(villain => {
            const card = document.createElement('div');
            card.className = 'card villain-card';
            card.innerHTML = `
                <img src="${villain.img}" alt="Imagem de ${villain.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x300/000/fff?text=Imagem+Indisponível';">
                <div class="card-content">
                    <h3>${villain.name}</h3>
                    <p>${villain.desc}</p>
                </div>
            `;
            villainsGrid.appendChild(card);
        });
    }
    
    populateGrids();

    const modal = document.getElementById('doctor-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    doctorsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.doctor-card');
        if (card) {
            const doctorId = parseInt(card.dataset.id);
            const doctor = doctorsData.find(d => d.id === doctorId);
            
            document.getElementById('modal-doctor-img').src = doctor.img;
            document.getElementById('modal-doctor-img').alt = `Foto de ${doctor.name}`;
            document.getElementById('modal-doctor-name').textContent = doctor.name;
            document.getElementById('modal-doctor-actor').textContent = `Ator: ${doctor.actor}`;
            document.getElementById('modal-doctor-desc').textContent = doctor.desc;
            
            modal.style.display = 'block';
        }
    });

    closeModalBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const contactForm = document.getElementById('contact-form');
    const feedbackDiv = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let errors = [];

        if (name === '') {
            errors.push('O campo Nome é obrigatório.');
        }
        if (email === '') {
            errors.push('O campo Email é obrigatório.');
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.push('Por favor, insira um email válido.');
        }
        if (message === '') {
            errors.push('O campo Mensagem é obrigatório.');
        }

        feedbackDiv.style.display = 'block';
        if (errors.length > 0) {
            feedbackDiv.className = 'error';
            feedbackDiv.innerHTML = errors.join('<br>');
        } else {
            feedbackDiv.className = 'success';
            feedbackDiv.textContent = 'Mensagem enviada com sucesso! (Simulação)';
            contactForm.reset();
        }
    });
});