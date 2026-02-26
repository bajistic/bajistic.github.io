/**
 * ASCII Metaball Background
 * Drifting blobs + mouse ripple effect
 */
(function () {
  var canvas = document.getElementById('metaball-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var FONT_SIZE  = 14;
  var NUM_BLOBS  = 5;
  var SPEED      = 0.35;
  var THRESHOLD  = 1.0;

  var cols, rows, blobs, ripples, animId;
  var mouse = { x: -9999, y: -9999 };

  function getColor() {
    return getComputedStyle(document.documentElement)
             .getPropertyValue('--metaball-color').trim() || '#ffffff';
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width  / FONT_SIZE);
    rows = Math.ceil(canvas.height / FONT_SIZE);
  }

  function initBlobs() {
    blobs = Array.from({ length: NUM_BLOBS }, function () {
      return {
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  110 + Math.random() * 170,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
      };
    });
    ripples = [];
  }

  // Spawn a ripple at mouse position
  function spawnRipple(x, y) {
    ripples.push({
      x: x, y: y,
      r: 20,         // start small
      maxR: 160,     // grow to this
      life: 1.0,     // 1 = fresh, 0 = dead
      decay: 0.018,  // fade speed
    });
  }

  function updateBlobs() {
    blobs.forEach(function (b) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.r || b.x > canvas.width  + b.r) b.vx *= -1;
      if (b.y < -b.r || b.y > canvas.height + b.r) b.vy *= -1;
    });

    // Grow + fade ripples
    for (var i = ripples.length - 1; i >= 0; i--) {
      var rp = ripples[i];
      rp.r    += (rp.maxR - rp.r) * 0.06;  // ease outward
      rp.life -= rp.decay;
      if (rp.life <= 0) ripples.splice(i, 1);
    }
  }

  function field(px, py) {
    var sum = 0;

    // Ambient blobs
    blobs.forEach(function (b) {
      var dx = px - b.x, dy = py - b.y;
      sum += (b.r * b.r) / ((dx * dx + dy * dy) || 0.0001);
    });

    // Ripples: contribute a pulse that fades
    ripples.forEach(function (rp) {
      var dx = px - rp.x, dy = py - rp.y;
      var d2 = (dx * dx + dy * dy) || 0.0001;
      // Ring-shaped: strong near rp.r radius, weak inside/outside
      var d  = Math.sqrt(d2);
      var ring = Math.max(0, 1.0 - Math.abs(d - rp.r) / 40);
      sum += ring * rp.life * 1.8;
    });

    return sum;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = (FONT_SIZE - 1) + "px 'JetBrains Mono', 'Courier New', monospace";
    ctx.textBaseline = 'top';
    var color = getColor();

    for (var row = 0; row < rows; row++) {
      var py = row * FONT_SIZE + FONT_SIZE / 2;
      for (var col = 0; col < cols; col++) {
        var px  = col * FONT_SIZE + FONT_SIZE / 2;
        var f   = field(px, py);
        var digit;

        if (f >= THRESHOLD) {
          digit = f > THRESHOLD * 2 ? '0' : '1';
        } else {
          var t = Math.min(f / THRESHOLD, 1);
          digit = String(Math.floor((1 - t) * 8) + 2);
        }

        var bright = Math.min(f / (THRESHOLD * 0.8), 1);
        ctx.globalAlpha = 0.06 + bright * 0.72;
        ctx.fillStyle   = color;
        ctx.fillText(digit, col * FONT_SIZE, row * FONT_SIZE);
      }
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    updateBlobs();
    draw();
    animId = requestAnimationFrame(loop);
  }

  // Mouse ripple — throttled so we don't spawn 60/s
  var lastRipple = 0;
  var RIPPLE_INTERVAL = 80; // ms between spawns
  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    var now = Date.now();
    if (now - lastRipple > RIPPLE_INTERVAL) {
      spawnRipple(e.clientX, e.clientY);
      lastRipple = now;
    }
  });

  // Touch support
  document.addEventListener('touchmove', function (e) {
    var t = e.touches[0];
    var now = Date.now();
    if (now - lastRipple > RIPPLE_INTERVAL) {
      spawnRipple(t.clientX, t.clientY);
      lastRipple = now;
    }
  }, { passive: true });

  // Click — bigger burst ripple
  document.addEventListener('click', function (e) {
    ripples.push({
      x: e.clientX, y: e.clientY,
      r: 10,
      maxR: 240,
      life: 1.0,
      decay: 0.012,
    });
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) cancelAnimationFrame(animId);
    else loop();
  });

  window.addEventListener('resize', resize);

  resize();
  initBlobs();
  loop();
})();
