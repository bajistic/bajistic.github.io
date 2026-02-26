/**
 * ASCII Metaball Background
 * Numeric distance-field effect — digits 0–9 represent proximity to drifting blobs
 */
(function () {
  var canvas = document.getElementById('metaball-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  // ── Config ────────────────────────────────────────────────────────────────
  var FONT_SIZE  = 14;      // px per cell
  var NUM_BLOBS  = 5;
  var SPEED      = 0.35;
  var THRESHOLD  = 1.0;
  var DIGIT_COLOR = getComputedStyle(document.documentElement)
                      .getPropertyValue('--metaball-color').trim() || '#ffffff';

  var cols, rows, blobs, animId;

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
  }

  function updateBlobs() {
    blobs.forEach(function (b) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.r || b.x > canvas.width  + b.r) b.vx *= -1;
      if (b.y < -b.r || b.y > canvas.height + b.r) b.vy *= -1;
    });
  }

  function field(px, py) {
    var sum = 0;
    blobs.forEach(function (b) {
      var dx = px - b.x, dy = py - b.y;
      sum += (b.r * b.r) / ((dx * dx + dy * dy) || 0.0001);
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

  // Pause when tab is hidden (performance)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      loop();
    }
  });

  window.addEventListener('resize', resize);

  resize();
  initBlobs();
  loop();
})();
