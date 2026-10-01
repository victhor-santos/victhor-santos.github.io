const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Stack icons expose their labels without activating the surrounding project link.
document.querySelectorAll('.tech-icon[tabindex]').forEach(icon => {
  icon.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
  });
  icon.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

document.querySelectorAll('.project[data-repository]').forEach(project => {
  const openRepository = () => window.location.href = project.dataset.repository;
  project.addEventListener('click', event => {
    if (event.target.closest('a, button, .tech-icon[tabindex]')) return;
    openRepository();
  });
  project.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target === project) {
      event.preventDefault();
      openRepository();
    }
  });
});

document.querySelectorAll('.project-carousel').forEach(carousel => {
  const track = carousel.querySelector('.project-track');
  const previous = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const status = carousel.querySelector('.carousel-status');
  if (!track || !previous || !next || !status) return;
  const go = index => track.scrollTo({
    left: index * track.clientWidth,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
  previous.addEventListener('click', () => go(0));
  next.addEventListener('click', () => go(1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      go(event.key === 'ArrowLeft' ? 0 : 1);
    }
  });
  track.addEventListener('scroll', () => {
    const index = Math.round(track.scrollLeft / track.clientWidth);
    previous.disabled = index === 0;
    next.disabled = index === 1;
    status.textContent = index === 0 ? 'Capa · 1 / 2' : 'Arquitetura · 2 / 2';
  }, { passive: true });
});

const dialog = document.querySelector('#architecture-dialog');
if (dialog) {
  const title = dialog.querySelector('#architecture-title');
  const image = dialog.querySelector('#architecture-image');
  const original = dialog.querySelector('#architecture-original');
  document.querySelectorAll('.architecture-open').forEach(button => {
    button.addEventListener('click', () => {
      if (!title || !image || !original) return;
      title.textContent = button.dataset.title;
      image.src = button.dataset.image;
      image.alt = `Diagrama de arquitetura de ${button.dataset.title}`;
      original.href = button.dataset.image;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
}
