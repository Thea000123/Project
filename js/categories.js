    document.querySelectorAll('.cat-card:not(.disabled)').forEach(card => {
      const href = card.dataset.href;
      if (href) {
        card.addEventListener('click', () => window.location.href = href);
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', e => { if (e.key === 'Enter') window.location.href = href; });
      }
    });
