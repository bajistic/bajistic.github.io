document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const toggle = document.createElement("button");
  toggle.textContent = "Toggle Theme";
  toggle.className = "theme-toggle";
  document.body.appendChild(toggle);
  
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = getCookie("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else if (savedTheme === "light") {
    document.body.classList.remove("dark");
  } else if (mediaQuery.matches) {
    document.body.classList.add("dark");
  }
  
  // Handle theme toggle click
  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    document.cookie = "theme=" + (isDark ? "dark" : "light");
  });

  mediaQuery.addEventListener("change", (e) => {
    if (getCookie("theme") === null) {
      if (e.matches) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  });

  const musicToggle = document.createElement("button");
  musicToggle.className = "music-toggle";
  document.body.appendChild(musicToggle);

  const ytPlayerContainer = document.createElement("div");
  ytPlayerContainer.id = "youtube-player";
  ytPlayerContainer.style.display = "none";
  document.body.appendChild(ytPlayerContainer);

  const musicContainer = document.createElement("div");
  musicContainer.className = "music-container";
  musicContainer.style.display = "none";
  musicContainer.innerHTML = `
    <button id="audio-prev" class="audio-prev" title="Previous">⏮️</button>
    <button id="audio-play-pause" class="audio-play-pause" title="Play/Pause">▶️</button>
    <button id="audio-next" class="audio-next" title="Next">⏭️</button>
  `;
  document.body.appendChild(musicContainer);

  let ytPlayer;

  window.onYouTubeIframeAPIReady = () => {
    ytPlayer = new YT.Player("youtube-player", {
      height: "0",
      width: "0",
      playerVars: {
        listType: "playlist",
        list: "PL8BGTnJm7HQgTcfVZncWOuLbim8R3_CdM",
        autoplay: 0,
      },
      events: {
        onReady: (e) => { e.target.playVideo(); },
        onStateChange: (e) => {
          const btn = document.getElementById("audio-play-pause");
          if (e.data === YT.PlayerState.PLAYING) {
            btn.textContent = "⏸️";
          } else {
            btn.textContent = "▶️";
          }
        },
      },
    });
  };

  musicToggle.addEventListener("click", () => {
    if (musicContainer.style.display === "none") {
      musicContainer.style.display = "flex";
      ytPlayerContainer.style.display = "block";
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      } else if (!ytPlayer) {
        window.onYouTubeIframeAPIReady();
      }
      // Auto-play when opening
      if (ytPlayer && ytPlayer.playVideo) {
        ytPlayer.playVideo();
      }
    } else {
      musicContainer.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id === "audio-play-pause" && ytPlayer) {
      const state = ytPlayer.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.playVideo();
      }
    } else if (e.target.id === "audio-prev" && ytPlayer) {
      ytPlayer.previousVideo();
    } else if (e.target.id === "audio-next" && ytPlayer) {
      ytPlayer.nextVideo();
    }
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
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}