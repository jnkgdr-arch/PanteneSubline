const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('#nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const tierData = {
  nir: {
    name: 'Near-Infrared', price: '$800', meta: '45+ Restorative · Online only',
    offering: 'Helmet + 100 ml Magnetized Saline Water Ointment + haircare routine',
    service: 'Consult + subscription; efficacy feedback for device and formula changes',
    benefit: 'Diminishes skin roughness, promotes wound healing, increases hair density and thickness, and supports collagen production.'
  },
  red: {
    name: 'Red Light', price: '$600', meta: '45+ Restorative · Online only',
    offering: 'Helmet + 100 ml Magnetized Saline Water Ointment + haircare routine',
    service: 'Consult + subscription; treatment monitoring and product feedback',
    benefit: 'Increases hair density and thickness, stimulates cell growth and repair, enhances collagen production, improves blood flow and nutrient delivery to the scalp, and supports skin elasticity.'
  },
  green: {
    name: 'Green Light', price: '$320', meta: 'Gen Z Prevention · Retail + online',
    offering: 'Brush device + 60 ml Magnetized Saline Water Ointment + haircare routine',
    service: 'Optional support + surveys for comfort and maintenance feedback',
    benefit: 'Promotes wound healing and tissue repair, reduces inflammation, supports collagen production, and also contributes to increased hair density and thickness.'
  },
  yellow: {
    name: 'Yellow Light', price: '$150', meta: 'Gen Z Entry · Retail + online',
    offering: 'Brush device + mass-market shampoo, conditioner, and leave-in care',
    service: 'Warranty support + post-purchase feedback',
    benefit: 'Enhances cellular energy and oxygenation, improves skin texture, and reduces inflammation.'
  }
};

const tierTabs = [...document.querySelectorAll('[data-tier]')];
const detailPanel = document.querySelector('#tier-detail');

function selectTier(tab) {
  const data = tierData[tab.dataset.tier];
  if (!data || !detailPanel) return;
  tierTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  Object.entries(data).forEach(([field, value]) => {
    const target = detailPanel.querySelector(`[data-detail="${field}"]`);
    if (target) target.textContent = value;
  });
}

tierTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTier(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tierTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tierTabs.length) % tierTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tierTabs.length - 1;
    tierTabs[nextIndex].focus();
    selectTier(tierTabs[nextIndex]);
  });
});
