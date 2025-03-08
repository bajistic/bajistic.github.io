document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const toggle = document.createElement("button");
  toggle.textContent = "Toggle Theme";
  toggle.className = "theme-toggle";
  document.body.appendChild(toggle);
  
  // Check for saved theme in cookies or system preference
  const savedTheme = getCookie("theme");
  if (savedTheme === "dark" || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add("dark");
  }
  
  // Handle theme toggle click
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.cookie = "theme=" + (document.body.classList.contains("dark") ? "dark" : "light");
  });
  
  // GSAP animation for posts and post list items
  gsap.from(".post, .post-list > li", { 
    opacity: 0, 
    y: 50, 
    stagger: 0.2, 
    duration: 1,
    ease: 'back.out(1.2)'
  });
  
  // Add interactive hover effects to buttons
  const buttons = document.querySelectorAll('.button, .btn-metal');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2
      });
    });
  });
});

// Helper function to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}