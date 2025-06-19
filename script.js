 document.getElementById('mobile-menu-btn').onclick = function() {
  document.getElementById('navbar-links').classList.toggle('active');
};

 
 // Loader with progress bar and countdown
    window.addEventListener("load", () => {
      const loader = document.getElementById("loader");
      const progressBar = document.getElementById("loader-progress-bar");
      const countdown = document.getElementById("loader-countdown");
      let duration = 2.5; // seconds
      let elapsed = 0;
      let interval = 25;
      countdown.textContent = `Loading... ${duration.toFixed(1)}s`;
      const timer = setInterval(() => {
        elapsed += interval / 1000;
        let percent = Math.min((elapsed / duration) * 100, 100);
        progressBar.style.width = percent + "%";
        let left = Math.max(0, duration - elapsed);
        countdown.textContent = left > 0 ? `Loading... ${left.toFixed(1)}s` : "Complete!";
        if (elapsed >= duration) {
          clearInterval(timer);
          setTimeout(() => {
            gsap.to(loader, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => loader.style.display = "none"
            });
          }, 400);
        }
      }, interval);
    });

    // Theme toggle (default light)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    function setTheme(dark) {
      if (dark) {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
      } else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
      }
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
    themeToggle.addEventListener('click', () => {
      setTheme(!document.body.classList.contains('dark-mode'));
    });
    window.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('theme');
      setTheme(savedTheme === 'dark');
      window.scrollTo(0, 0);
    });

    // Ripple effect
    document.addEventListener('mousemove', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => { ripple.remove(); }, 700);
    });

    // Carousel functionality
    function setupCarousel(carouselId, navId) {
      const track = document.getElementById(carouselId);
      const slides = track.querySelectorAll('.carousel-slide');
      const navContainer = document.getElementById(navId);
      let currentIndex = 0;
      // Create navigation dots
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        navContainer.appendChild(dot);
      });
      function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        navContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
      // Auto-rotate
      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, 5000);
      // Navigation buttons
      const parent = track.parentElement;
      parent.querySelector('.carousel-btn.left').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      });
      parent.querySelector('.carousel-btn.right').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      });
      return { updateCarousel };
    }
    setupCarousel('hero-carousel', 'hero-nav');
    setupCarousel('testimonials-carousel', 'testimonials-nav');
    setupCarousel('showcase-carousel', 'showcase-nav');

    // Charts
    document.addEventListener('DOMContentLoaded', () => {
      const engagementCtx = document.getElementById('engagement-chart').getContext('2d');
      new Chart(engagementCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Daily Active Users',
            data: [12000, 19000, 15000, 22000, 18000, 25000],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
      const adoptionCtx = document.getElementById('adoption-chart').getContext('2d');
      new Chart(adoptionCtx, {
        type: 'doughnut',
        data: {
          labels: ['FaceID Turbo', 'Vision Pro Sync', 'Dynamic Wallpapers', 'Spatial Audio+'],
          datasets: [{
            data: [35, 25, 20, 20],
            backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'right' } }
        }
      });
      // Progress bars animation
      gsap.to("#battery-bar", {
        scrollTrigger: {
          trigger: "#battery-bar",
          start: "top 80%"
        },
        scaleX: 1,
        duration: 1.5,
        ease: "expo.out",
        onUpdate: function() {
          const value = Math.round(this.progress() * 87);
          document.getElementById('battery-value').textContent = `${value}%`;
        }
      });
      gsap.to("#memory-bar", {
        scrollTrigger: {
          trigger: "#memory-bar",
          start: "top 80%"
        },
        scaleX: 1,
        duration: 1.5,
        ease: "expo.out",
        onUpdate: function() {
          const value = Math.round(this.progress() * 92);
          document.getElementById('memory-value').textContent = `${value}%`;
        }
      });
      gsap.to("#speed-bar", {
        scrollTrigger: {
          trigger: "#speed-bar",
          start: "top 80%"
        },
        scaleX: 1,
        duration: 1.5,
        ease: "expo.out",
        onUpdate: function() {
          const value = Math.round(this.progress() * 94);
          document.getElementById('speed-value').textContent = `${value}%`;
        }
      });
    });


    // Splash effect

   document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("splash-canvas");
  const ctx = canvas.getContext("2d");
  let ripples = [];
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  window.addEventListener("resize", resize);

  // Responsive max ripple size based on screen
  function getMaxRipple() {
    return Math.max(80, Math.min(W, H) * 0.35);
  }

  // Add a ripple at a position
  function addRipple(x, y, color = "#00f2ff") {
    ripples.push({
      x, y,
      r: 0,
      max: getMaxRipple() + Math.random() * 0.15 * getMaxRipple(),
      alpha: 0.32 + Math.random() * 0.14,
      color,
      life: 0,
      speed: 1.1 + Math.random() * 0.5 + (Math.min(W, H) < 500 ? 0.6 : 0) // slower on mobile
    });
  }

  // Initial splash ripples (center and random spots, scaled for screen)
  for (let i = 0; i < (Math.min(W, H) < 500 ? 3 : 7); i++) {
    setTimeout(() => {
      addRipple(
        W / 2 + Math.cos(i / 7 * 2 * Math.PI) * W / (Math.min(W, H) < 500 ? 7 : 6) + Math.random() * 20 - 10,
        H / 2 + Math.sin(i / 7 * 2 * Math.PI) * H / (Math.min(W, H) < 500 ? 7 : 6) + Math.random() * 20 - 10
      );
    }, i * 90);
  }

  // On mousemove/touch, add ripple at pointer
  function pointerRipple(e) {
    let x, y;
    if (e.touches && e.touches.length) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    addRipple(x, y, "#8b5cf6");
  }
  window.addEventListener("mousemove", pointerRipple);
  window.addEventListener("touchstart", pointerRipple);

  function animate() {
    ctx.clearRect(0, 0, W, H);
    ripples.forEach((ripple, idx) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.r, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(0,242,255,${ripple.alpha})`;
      ctx.lineWidth = 2.5 + 2 * Math.sin(ripple.life / 7);
      ctx.shadowColor = ripple.color;
      ctx.shadowBlur = Math.min(W, H) < 500 ? 10 : 24;
      ctx.globalAlpha = ripple.alpha;
      ctx.stroke();
      ctx.restore();

      ripple.r += ripple.speed;
      ripple.alpha *= 0.97;
      ripple.life += 1;
    });
    ripples = ripples.filter(r => r.alpha > 0.05 && r.r < r.max);
    requestAnimationFrame(animate);
  }
  animate();
});


    document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('splash-canvas');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Create multiple floating objects
      const objects = [];
      const geometries = [
        new THREE.IcosahedronGeometry(0.3, 0),
        new THREE.OctahedronGeometry(0.4, 0),
        new THREE.TetrahedronGeometry(0.5, 0)
      ];
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x00f2ff, wireframe: true, transparent: true, opacity: 0.3 }),
        new THREE.MeshBasicMaterial({ color: 0x7873f5, wireframe: true, transparent: true, opacity: 0.3 }),
        new THREE.MeshBasicMaterial({ color: 0xff6ec4, wireframe: true, transparent: true, opacity: 0.3 })
      ];
      for (let i = 0; i < 15; i++) {
        const geoIndex = Math.floor(Math.random() * geometries.length);
        const matIndex = Math.floor(Math.random() * materials.length);
        const object = new THREE.Mesh(geometries[geoIndex], materials[matIndex]);
        object.position.x = Math.random() * 10 - 5;
        object.position.y = Math.random() * 10 - 5;
        object.position.z = Math.random() * -10;
        object.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          )
        };
        scene.add(object);
        objects.push(object);
      }
      camera.position.z = 5;
      // Mouse interaction
      const mouse = new THREE.Vector2();
      window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
      function animate() {
        requestAnimationFrame(animate);
        objects.forEach(obj => {
          obj.rotation.x += 0.005;
          obj.rotation.y += 0.005;
          const moveFactor = 0.01;
          obj.position.x += (mouse.x * 3 - obj.position.x) * moveFactor;
          obj.position.y += (mouse.y * 3 - obj.position.y) * moveFactor;
          obj.position.add(obj.userData.velocity);
          if (Math.abs(obj.position.x) > 7) obj.userData.velocity.x *= -1;
          if (Math.abs(obj.position.y) > 7) obj.userData.velocity.y *= -1;
          if (obj.position.z < -15 || obj.position.z > 0) obj.userData.velocity.z *= -1;
        });
        renderer.render(scene, camera);
      }
      animate();
      window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    });

    // Animate elements on scroll
    gsap.utils.toArray(".stat-card, .card, .testimonial, .carousel-card-neon").forEach((card, i) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 40,
        scale: 0.98
      }, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%'
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power2.out"
      });
    });