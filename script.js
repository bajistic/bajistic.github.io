console.log("Welcome to my simple blog!");
// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Save preference
});

// Load saved theme or system default
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  } else {
    // If no saved theme, rely on system preference (handled by CSS)
    document.body.setAttribute('data-theme', '');
  }
});
