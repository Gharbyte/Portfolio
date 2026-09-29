// EDIT HERE: keep each real profile URL and displayed handle/name together.
// Leave url empty until you have your own profile URL (including https://).
(() => {
  const profiles = {
    github: { url: 'https://github.com/Gharbyte', handle: '@Gharbyte' },
    linkedin: { url: 'https://www.linkedin.com/in/johannes-g-865785352/', handle: 'Johannes Gharb' },
    instagram: { url: 'https://www.instagram.com/johannes.gha/?hl=en', handle: 'johannes.gha' }
  };

  let allConfigured = true;
  for (const [platform, profile] of Object.entries(profiles)) {
    const row = document.querySelector(`[data-profile="${platform}"]`);
    row.querySelector('.contact-handle').textContent = profile.handle;
    let valid = false;
    try {
      valid = new URL(profile.url).protocol === 'https:';
    } catch { /* Empty or incomplete URLs keep the on-page placeholder link. */ }
    if (valid) {
      row.href = profile.url;
    } else {
      allConfigured = false;
      row.href = '#contact-placeholder';
      row.setAttribute('aria-describedby', 'contact-placeholder');
      row.addEventListener('click', () => document.querySelector('#contact-placeholder').focus());
    }
  }
  document.querySelector('#contact-placeholder').hidden = allConfigured;
})();
