    (function () {
      /* Tab switching */
      function switchTab(target) {
        document.querySelectorAll('.login-tab').forEach((t, i) => {
          const isTarget = t.id === 'tab-btn-' + target;
          t.classList.toggle('active', isTarget);
          t.setAttribute('aria-selected', isTarget);
        });
        document.querySelectorAll('.login-form-section').forEach(s => {
          s.classList.toggle('active', s.id === 'tab-' + target);
        });
      }

      document.getElementById('tab-btn-login').addEventListener('click', () => switchTab('login'));
      document.getElementById('tab-btn-register').addEventListener('click', () => switchTab('register'));
      document.getElementById('switch-to-register').addEventListener('click', () => switchTab('register'));
      document.getElementById('switch-to-login').addEventListener('click', () => switchTab('login'));

      /* Validation helper */
      function showErr(id, msg) {
        const input = document.getElementById(id);
        const err = document.getElementById('err-' + id);
        if (input) input.classList.add('error');
        if (err) { if (msg) err.textContent = msg; err.style.display = 'block'; }
        return false;
      }
      function clearErr(id) {
        const input = document.getElementById(id);
        const err = document.getElementById('err-' + id);
        if (input) input.classList.remove('error');
        if (err) err.style.display = 'none';
      }

      /* Auto-clear errors on input */
      document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          const errEl = document.getElementById('err-' + input.id);
          if (errEl) errEl.style.display = 'none';
        });
      });

      /* Login form */
      document.getElementById('login-form').addEventListener('submit', e => {
        e.preventDefault();
        let ok = true;
        const email = document.getElementById('login-email').value.trim();
        const pass  = document.getElementById('login-password').value;

        clearErr('login-email'); clearErr('login-password');

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showErr('login-email'); ok = false;
        }
        if (!pass) {
          showErr('login-password'); ok = false;
        }
        if (!ok) return;

        const btn = document.getElementById('login-submit-btn');
        btn.disabled = true; btn.textContent = 'Signing in…';
        Toast.show('Login successful! Redirecting…', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1400);
      });

      /* Register form */
      document.getElementById('register-form').addEventListener('submit', e => {
        e.preventDefault();
        let ok = true;
        const name    = document.getElementById('reg-name').value.trim();
        const email   = document.getElementById('reg-email').value.trim();
        const pass    = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        clearErr('reg-name'); clearErr('reg-email'); clearErr('reg-password'); clearErr('reg-confirm');

        if (!name) { showErr('reg-name'); ok = false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showErr('reg-email'); ok = false; }
        if (!pass || pass.length < 8) { showErr('reg-password'); ok = false; }
        if (pass !== confirm) { showErr('reg-confirm', 'Passwords do not match'); ok = false; }
        if (!ok) return;

        const btn = document.getElementById('register-submit-btn');
        btn.disabled = true; btn.textContent = 'Creating account…';
        Toast.show('Account created! Redirecting…', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1400);
      });
    })();
