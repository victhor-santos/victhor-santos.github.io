(() => {
  const toggle = document.querySelector('.motion-toggle');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const applyMotion = paused => {
    document.body.classList.toggle('motion-paused', paused);
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? 'Ativar movimentos' : 'Pausar movimentos';
    }
    window.dispatchEvent(new CustomEvent('portfolio:motion', { detail: { paused } }));
  };
  let savedPause = null;
  try { savedPause = sessionStorage.getItem('portfolio-motion-paused'); } catch {}
  applyMotion(motionPreference.matches || savedPause === 'true');
  toggle?.addEventListener('click', () => {
    const paused = !document.body.classList.contains('motion-paused');
    applyMotion(paused);
    try { sessionStorage.setItem('portfolio-motion-paused', String(paused)); } catch {}
  });
  motionPreference.addEventListener('change', event => applyMotion(event.matches));

  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const links = [...document.querySelectorAll('[data-chapter-link]')];
  if (!chapters.length || !('IntersectionObserver' in window)) return;
  let active = -1;
  const narration = document.querySelector('#assistant-narration');
  const progress = document.querySelector('#assistant-progress');
  const previous = document.querySelector('#narration-prev');
  const next = document.querySelector('#narration-next');
  const summaries = [
    'A jornada do Victhor começa com Java: orientação a objetos, estruturas de dados e boas práticas. Essa base sustenta o que ele está construindo agora.',
    'Depois vêm as aplicações backend. Com Spring Boot, APIs, bancos de dados, Docker e testes, ele aprende a transformar código em sistemas organizados e de fácil manutenção.',
    'No delivery.ai, essa base ganha forma em microsserviços. O catálogo já tem persistência e testes de integração. As demais regras de negócio continuam em desenvolvimento.',
    'Python e Machine Learning acrescentam uma nova camada à jornada: preparar dados, treinar e avaliar modelos, e entender como integrar previsões a aplicações.',
    'A direção é AI Engineering. Inteligência de rotas, MLOps e Cloud fazem parte dos próximos passos. O objetivo é combinar modelos, APIs, dados e infraestrutura em sistemas reais.'
  ];
  function present(index) {
    if (index < 0 || index >= summaries.length) return;
    active = index;
    if (narration) narration.textContent = summaries[index];
    if (progress) progress.textContent = '0' + (index + 1) + ' / 05';
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === summaries.length - 1;
    links.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    window.dispatchEvent(new CustomEvent('portfolio:chapter', { detail: { index } }));
  }
  previous?.addEventListener('click', () => present(Math.max(0, active - 1)));
  next?.addEventListener('click', () => present(Math.min(summaries.length - 1, active + 1)));
  present(0);
  const observer = new IntersectionObserver(entries => {
    const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!current) return;
    const index = Number(current.target.dataset.chapter);
    if (index === active) return;
    present(index);
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  chapters.forEach(chapter => observer.observe(chapter));
})();
