// -- Get the hamburger, sidebar, and close button elements --
const hamburgerIcon = document.getElementById('hamburger-icon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

hamburgerIcon.addEventListener('click', function() {
  sidebar.style.right = '0'; 
});

closeBtn.addEventListener('click', function() {
  sidebar.style.right = '-250px'; 
});




// -- counting projects --
const counters = document.querySelectorAll(".stat-card h3");
let counted = false;

function animateCount(el, target) {
  let count = 0;
  const speed = 20;
  const update = () => {
    count += Math.ceil(target / 50);
    if (count < target) {
      el.innerText = `${count}+`;
      requestAnimationFrame(update);
    } else {
      el.innerText = `${target}+`;
    }
  };
  update();
}

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting && !counted) {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"));
        animateCount(counter, target);
      });
      counted = true;
      observer.disconnect(); 
    }
  },
  { threshold: 0.4 }
);

observer.observe(document.querySelector(".why-work"));




// -- for mobile gallery carousel -- 

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;

function updateCarousel() {
  const cardWidth = track.querySelector('.carousel-card').offsetWidth + 20; // include margin
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  const totalCards = track.children.length;
  const visibleCards = window.innerWidth <= 500 ? 1 : window.innerWidth <= 768 ? 2 : 3;
  if (index < totalCards - visibleCards) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);