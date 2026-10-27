/**
 * Hero Canvas: Celestial Astrolabe & Constellation Network
 * Represents the convergence of ancient Indian astronomical/mathematical yantras (Khagola)
 * with modern neural networks and quantum computing pathways.
 */
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let animationId;
  let angleX = 0.35;
  let angleY = 0;
  let rotSpeed = 0.003;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  // Ring definitions (concentric astrolabe rings in 3D)
  const rings = [
    { radius: 140, tilt: 0.25, speed: 0.002, color: 'rgba(223, 179, 60, 0.45)', dash: [4, 6] },
    { radius: 190, tilt: -0.4, speed: -0.0015, color: 'rgba(0, 168, 184, 0.5)', dash: [] },
    { radius: 240, tilt: 0.6, speed: 0.001, color: 'rgba(212, 100, 60, 0.4)', dash: [2, 8] },
    { radius: 290, tilt: -0.2, speed: -0.0008, color: 'rgba(223, 179, 60, 0.35)', dash: [8, 12] },
    { radius: 340, tilt: 0.45, speed: 0.0006, color: 'rgba(79, 203, 215, 0.25)', dash: [1, 5] },
  ];

  // Star / node points
  const points = [];
  const pointCount = 48;
  for (let i = 0; i < pointCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const radius = 120 + Math.random() * 220;
    points.push({
      x: radius * Math.cos(phi) * Math.cos(theta),
      y: radius * Math.sin(phi),
      z: radius * Math.cos(phi) * Math.sin(theta),
      baseRadius: radius,
      size: 1.5 + Math.random() * 2.5,
      hue: Math.random() > 0.5 ? 'aqua' : 'gold',
      pulse: Math.random() * Math.PI * 2,
    });
  }

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / width - 0.5;
    const ny = (e.clientY - rect.top) / height - 0.5;
    mouse.targetX = nx * 0.8;
    mouse.targetY = ny * 0.8;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    const cx = width / 2;
    const cy = height / 2;

    angleY += rotSpeed;
    const currentAngleX = angleX + mouse.y * 0.5;
    const currentAngleY = angleY + mouse.x * 0.5;

    const cosX = Math.cos(currentAngleX);
    const sinX = Math.sin(currentAngleX);
    const cosY = Math.cos(currentAngleY);
    const sinY = Math.sin(currentAngleY);

    // Helper 3D rotation projection
    function project(x, y, z) {
      // Rotate around Y
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;
      // Rotate around X
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const scale = 700 / (700 + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        scale: scale,
        z: z2
      };
    }

    // Draw central glowing nucleus
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
    gradient.addColorStop(0, 'rgba(223, 179, 60, 0.3)');
    gradient.addColorStop(0.5, 'rgba(0, 168, 184, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, 70, 0, Math.PI * 2);
    ctx.fill();

    // Draw rings
    rings.forEach((ring, idx) => {
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash(ring.dash);
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 1.25;

      const segments = 64;
      const ringAngle = ring.tilt + Math.sin(angleY * 0.5 + idx) * 0.1;
      const cosR = Math.cos(ringAngle);
      const sinR = Math.sin(ringAngle);

      for (let i = 0; i <= segments; i++) {
        const rad = (i / segments) * Math.PI * 2;
        const rx = ring.radius * Math.cos(rad);
        const ry = ring.radius * Math.sin(rad) * cosR;
        const rz = ring.radius * Math.sin(rad) * sinR;

        const p = project(rx, ry, rz);
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
      ctx.restore();
    });

    // Project points & draw connections
    const projectedPoints = points.map(pt => {
      pt.pulse += 0.03;
      const p = project(pt.x, pt.y, pt.z);
      return { ...pt, px: p.x, py: p.y, scale: p.scale, z: p.z };
    });

    // Draw node connections for nearby points
    ctx.beginPath();
    ctx.lineWidth = 0.6;
    for (let i = 0; i < projectedPoints.length; i++) {
      for (let j = i + 1; j < projectedPoints.length; j++) {
        const p1 = projectedPoints[i];
        const p2 = projectedPoints[j];
        const dx = p1.px - p2.px;
        const dy = p1.py - p2.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 85) {
          const alpha = (1 - dist / 85) * 0.3 * Math.min(p1.scale, p2.scale);
          ctx.strokeStyle = p1.hue === 'gold' 
            ? `rgba(223, 179, 60, ${alpha})` 
            : `rgba(0, 168, 184, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    projectedPoints.forEach(pt => {
      const currentSize = pt.size * pt.scale * (1 + Math.sin(pt.pulse) * 0.25);
      const alpha = Math.max(0.15, Math.min(0.9, (pt.scale - 0.4) * 1.5));
      ctx.beginPath();
      ctx.arc(pt.px, pt.py, Math.max(0.8, currentSize), 0, Math.PI * 2);
      ctx.fillStyle = pt.hue === 'gold'
        ? `rgba(240, 207, 111, ${alpha})`
        : `rgba(100, 216, 227, ${alpha})`;
      ctx.fill();

      // Outer glow for brighter stars
      if (pt.size > 2.8) {
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, currentSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pt.hue === 'gold'
          ? `rgba(223, 179, 60, ${alpha * 0.25})`
          : `rgba(0, 168, 184, ${alpha * 0.25})`;
        ctx.fill();
      }
    });

    animationId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  // Init
  resize();
  canvas.setAttribute('data-ready', 'true');
  render();
})();
