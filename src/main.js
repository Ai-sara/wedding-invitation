// ============================================================
// IMPORTS
// ============================================================

import './normalize.css'
import './style.css'

import heroBackground from './assets/images/hero-illustration.png'
import bgMusicFile from './assets/audio/track.mp3'


// ============================================================
// HERO
// ============================================================

const heroBackgroundElement = document.querySelector('.hero__background')

heroBackgroundElement.src = heroBackground


// ============================================================
// MUSIC
// ============================================================

const bgMusic = document.querySelector('#bgMusic')
const musicToggle = document.querySelector('#musicToggle')
const playIcon = document.querySelector('.music-toggle__icon--play')
const pauseIcon = document.querySelector('.music-toggle__icon--pause')

bgMusic.src = bgMusicFile

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

musicToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        toggleMusic()
    }
})


// ============================================================
// COUNTDOWN
// ============================================================

const weddingDate = new Date('2026-09-27T18:00:00')

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


// ============================================================
// GALLERY
// ============================================================

const track = document.querySelector('.gallery__track')
const slides = document.querySelectorAll('.gallery__slide')
const dotsContainer = document.querySelector('.gallery__dots')

const realSlidesCount = slides.length - 1

let currentSlide = 0


// ------------------------------------------------------------
// Gallery dots
// ------------------------------------------------------------

for (let i = 0; i < realSlidesCount; i++) {
    const dot = document.createElement('span')

    dot.classList.add('gallery__dot')

    if (i === 0) {
        dot.classList.add('gallery__dot--active')
    }

    dotsContainer.appendChild(dot)
}

const dots = document.querySelectorAll('.gallery__dot')


// ------------------------------------------------------------
// Show slide
// ------------------------------------------------------------

function showSlide(index) {
    currentSlide = index

    const slideWidth = slides[0].offsetWidth

    track.style.transform = `translateX(-${slideWidth * currentSlide}px)`

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle(
            'gallery__dot--active',
            dotIndex === currentSlide
        )
    })
}


// ------------------------------------------------------------
// Automatic slider
// ------------------------------------------------------------

setInterval(() => {
    showSlide(currentSlide + 1)

    // Когда дошли до копии первого слайда
    if (currentSlide === realSlidesCount) {
        setTimeout(() => {
            track.style.transition = 'none'

            currentSlide = 0

            track.style.transform = 'translateX(0)'

            // Возвращаем анимацию
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    track.style.transition = 'transform 0.8s ease'
                })
            })
        }, 800)
    }
}, 3000)


// ============================================================
// RSVP FORM
// ============================================================

const rsvpForm = document.querySelector('.rsvp__form')

const googleScriptUrl =
    'https://script.google.com/macros/s/AKfycbzzzeeEvd-NzdHVw0LVlnRokB9UAKRKuW04wGs9Pi9Jeqas-a2BAcaKFEyW9_Knvi1c/exec'

rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(rsvpForm)
    const submitButton = rsvpForm.querySelector('button[type="submit"]')

    // Сразу блокируем повторную отправку
    submitButton.disabled = true

    // Сразу показываем сообщение
    alert('Рақмет! Жауабыңыз қабылданды ❤️')

    // Очищаем форму
    rsvpForm.reset()

    // Отправляем данные в Google Sheets в фоне
    fetch(googleScriptUrl, {
        method: 'POST',
        body: formData
    })
        .catch((error) => {
            console.error('Ошибка отправки:', error)
        })
})

const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// ============================================================
// PAGE LOADING
// ============================================================

document.documentElement.classList.add('is-loaded')