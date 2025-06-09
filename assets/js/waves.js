function createRealisticWavesAnimation(elementId, width = 50, height = 8, speed = 80) {
  const canvas = document.getElementById(elementId);
  let frame = 0;

  // Wave parameters for layering
  const waves = [
    { amplitude: 2, frequency: 0.2, phase: 0, char: '~' }, // Main wave
    { amplitude: 1, frequency: 0.3, phase: 1, char: '≈' }, // Ripple
    { amplitude: 0.5, frequency: 0.5, phase: 2, char: '-' } // Small ripple
  ];

  function drawWaves() {
    let output = Array(height).fill().map(() => Array(width).fill(' '));
    // Combine multiple waves
    for (let wave of waves) {
      for (let x = 0; x < width; x++) {
        const y = Math.round(wave.amplitude * Math.sin(wave.frequency * x + frame * 0.05 + wave.phase) + height / 2);
        if (y >= 0 && y < height) {
          output[y][x] = wave.char;
        }
      }
    }
    // Add random foam/spray effect
    for (let x = 0; x < width; x++) {
      if (Math.random() < 0.05) { // 5% chance of foam
        const y = Math.round(height / 2 + Math.sin(frame * 0.1) * 2);
        if (y >= 0 && y < height) output[y][x] = '*';
      }
    }
    // Render to canvas
    canvas.textContent = output.map(row => row.join('')).join('\n');
    frame++;
    setTimeout(drawWaves, speed);
  }

  drawWaves();
}

// Start animation on page load
document.addEventListener('DOMContentLoaded', () => {
  createRealisticWavesAnimation('waves');
});
