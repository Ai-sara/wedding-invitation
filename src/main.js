import './normalize.css'
import './style.css'

import heroBackground from './assets/images/hero-illustration.png'
import bgMusicFile from './assets/audio/track.mp3'


const heroBackgroundElement = document.querySelector('.hero__background')
heroBackgroundElement.src = heroBackground
const bgMusic = document.querySelector('#bgMusic')
bgMusic.src = bgMusicFile

const weddingDate = new Date('2026-10-17T16:00:00')

const countdownValues = {
    days: document.querySelector('[data-unit="days"]'),
    hours: document.querySelector('[data-unit="hours"]'),
    minutes: document.querySelector('[data-unit="minutes"]'),
    seconds: document.querySelector('[data-unit="seconds"]'),
}

function updateCountdown() {
    const currentDate = new Date()
    const difference = weddingDate - currentDate

    if (difference <= 0) {
        countdownValues.days.textContent = '00'
        countdownValues.hours.textContent = '00'
        countdownValues.minutes.textContent = '00'
        countdownValues.seconds.textContent = '00'

        return
    }

    const seconds = Math.floor(difference / 1000)

    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    countdownValues.days.textContent = String(days).padStart(2, '0')
    countdownValues.hours.textContent = String(hours).padStart(2, '0')
    countdownValues.minutes.textContent = String(minutes).padStart(2, '0')
    countdownValues.seconds.textContent = String(remainingSeconds).padStart(2, '0')
}

updateCountdown()

setInterval(updateCountdown, 1000)

const musicToggle = document.querySelector('#musicToggle')
const playIcon = document.querySelector('.music-toggle__icon--play')
const pauseIcon = document.querySelector('.music-toggle__icon--pause')
let isPlaying = false

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause()
    } else {
        bgMusic.play()
    }
    isPlaying = !isPlaying
    musicToggle.classList.toggle('is-playing', isPlaying)
    playIcon.style.display = isPlaying ? 'none' : 'block'
    pauseIcon.style.display = isPlaying ? 'block' : 'none'
}

musicToggle.addEventListener('click', toggleMusic)
musicToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleMusic()
    }
})

const track = document.querySelector('.gallery__track');
const slides = document.querySelectorAll('.gallery__slide');
const dotsContainer = document.querySelector('.gallery__dots');

const realSlidesCount = slides.length - 1;

let currentSlide = 0;

// Создаём точки автоматически
for (let i = 0; i < realSlidesCount; i++) {
    const dot = document.createElement('span');

    dot.classList.add('gallery__dot');

    if (i === 0) {
        dot.classList.add('gallery__dot--active');
    }

    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.gallery__dot');

function showSlide(index) {
    currentSlide = index;

    const slideWidth = slides[0].offsetWidth;

    track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle(
            'gallery__dot--active',
            dotIndex === currentSlide
        );
    });
}

setInterval(() => {
    showSlide(currentSlide + 1);

    // Когда дошли до копии первого слайда
    if (currentSlide === realSlidesCount) {
        setTimeout(() => {
            track.style.transition = 'none';

            currentSlide = 0;

            track.style.transform = 'translateX(0)';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    track.style.transition = 'transform 0.8s ease';
                });
            });
        }, 800);
    }
}, 3000);


const rsvpForm = document.querySelector('.rsvp__form');

rsvpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(rsvpForm);

    try {
        await fetch(
            'https://script.google.com/macros/s/AKfycbzzzeeEvd-NzdHVw0LVlnRokB9UAKRKuW04wGs9Pi9Jeqas-a2BAcaKFEyW9_Knvi1c/exec',
            {
                method: 'POST',
                body: formData
            }
        );

        alert('Рақмет! Жауабыңыз қабылданды ❤️');

        rsvpForm.reset();

    } catch (error) {
        console.error(error);
        alert('Қате орын алды. Қайтадан көріңіз.');
    }
});