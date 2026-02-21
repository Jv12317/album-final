// Array de fotos
const photos = [
    "FOTOS/foto1.jpg",
    "FOTOS/foto2.jpg",
    "FOTOS/foto3.jpg",
    "FOTOS/foto4.jpg",
    "FOTOS/foto5.jpg",
    "FOTOS/foto6.jpg",
    "FOTOS/foto7.jpg",
    "FOTOS/foto8.jpg",
    "FOTOS/foto9.jpg",
    "FOTOS/foto10.jpg",
    "FOTOS/foto11.jpg"
];

// Descrições das fotos
const photoDescriptions = [
    "Felicidade sempre que estamos juntos",
    "De mãos dadas para sempre",
    "Voce é a minha obra prima",
    "Abraços que aquecem a alma",
    "Eu amo te amar",
    "Risos que alegram o coração",
    "Caminhando juntos pela vida",
    "Cada momento com voce, é unico",
    "Amo cada passeio nosso",
    "Estar com voce, é minha terapia",
    "I love you, today and always"
];

// Índice atual da foto
let currentIndex = 0;

// Elementos do DOM
const mainPhoto = document.getElementById('main-photo');
const photoDescription = document.getElementById('photo-description');
const currentPhotoSpan = document.getElementById('current-photo');
const totalPhotosSpan = document.getElementById('total-photos');
const photoDotsContainer = document.getElementById('photo-dots');
const loveBurstContainer = document.getElementById('love-burst');

// Inicializar
function init() {
    // Definir total de fotos
    totalPhotosSpan.textContent = photos.length;
    
    // Criar corações flutuantes
    createFloatingHearts();
    
    // Criar indicadores de pontos
    createPhotoDots();
    
    // Carregar primeira foto
    updatePhoto();
}

// Criar corações flutuantes
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const numberOfHearts = 15;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💙';
        
        // Posição aleatória horizontal
        heart.style.left = `${Math.random() * 100}%`;
        
        // Movimento horizontal aleatório
        heart.style.setProperty('--float-x', `${(Math.random() - 0.5) * 100}px`);
        
        // Duração aleatória
        const duration = 8 + Math.random() * 4;
        heart.style.animationDuration = `${duration}s`;
        
        // Delay aleatório
        const delay = Math.random() * 5;
        heart.style.animationDelay = `${delay}s`;
        
        // Tamanho aleatório
        const size = 20 + Math.random() * 20;
        heart.style.fontSize = `${size}px`;
        
        container.appendChild(heart);
    }
}

// Criar indicadores de pontos
function createPhotoDots() {
    photoDotsContainer.innerHTML = '';
    
    for (let i = 0; i < photos.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        if (i === currentIndex) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => goToPhoto(i));
        photoDotsContainer.appendChild(dot);
    }
}

// Atualizar foto exibida
function updatePhoto() {
    // Fade out
    mainPhoto.style.opacity = '0';
    
    setTimeout(() => {
        // Atualizar imagem
        mainPhoto.src = photos[currentIndex];
        mainPhoto.alt = photoDescriptions[currentIndex];
        
        // Atualizar descrição
        photoDescription.textContent = photoDescriptions[currentIndex] + ' 💙';
        
        // Atualizar contador
        currentPhotoSpan.textContent = currentIndex + 1;
        
        // Atualizar pontos
        updateDots();
        
        // Fade in
        mainPhoto.style.opacity = '1';
    }, 300);
}

// Atualizar indicadores de pontos
function updateDots() {
    const dots = photoDotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Próxima foto
function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    updatePhoto();
    createLoveBurst();
}

// Foto anterior
function previousPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updatePhoto();
    createLoveBurst();
}

// Ir para foto específica
function goToPhoto(index) {
    currentIndex = index;
    updatePhoto();
    createLoveBurst();
}

// Criar explosão de corações
function createLoveBurst() {
    // Limpar corações anteriores
    loveBurstContainer.innerHTML = '';
    
    // Criar 6 corações
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = '💙';
        
        // Posição aleatória
        const angle = (Math.random() - 0.5) * Math.PI;
        const distance = 100 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = -100 - Math.random() * 100;
        
        heart.style.setProperty('--burst-x', `${x}px`);
        heart.style.setProperty('--burst-y', `${y}px`);
        
        loveBurstContainer.appendChild(heart);
        
        // Remover após animação
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousPhoto();
    } else if (e.key === 'ArrowRight') {
        nextPhoto();
    }
});

// Inicializar quando a página carregar
window.addEventListener('load', init);