/**
 * Om Gupta Portfolio - Next-Gen Interactive Cockpit Script
 * Electronics & Communication Engineering | MBM University
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year Injection
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==========================================================================
     2. Live Indian Standard Time (IST) Clock
     ========================================================================== */
  const liveIstTimeEl = document.getElementById('live-ist-time');
  function updateISTClock() {
    if (!liveIstTimeEl) return;
    const now = new Date();
    // Format to Indian Standard Time (UTC+5:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    liveIstTimeEl.textContent = new Intl.DateTimeFormat('en-IN', options).format(now);
  }
  updateISTClock();
  setInterval(updateISTClock, 1000);

  /* ==========================================================================
     3. Hero Dynamic Typing Role
     ========================================================================== */
  const typingRoleEl = document.getElementById('typing-role');
  if (typingRoleEl) {
    const roles = [
      '3rd Year ECE Student @ MBM Univ.',
      'IoT & Embedded Systems Engineer.',
      'Firmware & Microcontroller Developer.',
      'KiCad PCB & Circuit Architect.',
      'Modern C++ & Web Developer.'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function typeLoop() {
      const current = roles[roleIdx];
      if (isDeleting) {
        typingRoleEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        speed = 40;
      } else {
        typingRoleEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        speed = 80;
      }

      if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        speed = 1800; // Pause at full word
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 350;
      }
      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  /* ==========================================================================
     4. Interactive HUD Terminal Emulator
     ========================================================================== */
  const termLogs = document.getElementById('term-logs');
  const termInput = document.getElementById('term-input');
  const cmdChips = document.querySelectorAll('.cmd-chip');
  const terminalToggleBtn = document.getElementById('terminal-toggle-btn');

  function appendLog(text, className = '') {
    if (!termLogs) return;
    const line = document.createElement('div');
    line.className = `log-line ${className}`;
    line.innerHTML = text;
    termLogs.appendChild(line);
    termLogs.scrollTop = termLogs.scrollHeight;
  }

  function runCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    appendLog(`&gt; <span class="text-cyan">${rawCmd}</span>`);

    switch (cmd) {
      case 'help':
        appendLog('Available Commands:');
        appendLog('&bull; <span class="text-cyan">skills</span> - List engineering competencies');
        appendLog('&bull; <span class="text-cyan">projects</span> - View featured builds');
        appendLog('&bull; <span class="text-cyan">about</span> - Academic bio &amp; MBM Univ');
        appendLog('&bull; <span class="text-cyan">contact</span> - Coordinates &amp; direct links');
        appendLog('&bull; <span class="text-cyan">cv</span> - Download official resume');
        appendLog('&bull; <span class="text-cyan">ping</span> - Check telemetry connectivity');
        appendLog('&bull; <span class="text-cyan">clear</span> - Wipe terminal output');
        break;

      case 'skills':
        appendLog('<span class="text-emerald">Embedded &amp; IoT:</span> ESP32, Arduino, FreeRTOS, MQTT, Sensors');
        appendLog('<span class="text-purple">Electronics:</span> KiCad PCB, Verilog HDL, LTSpice, Logic Design');
        appendLog('<span class="text-cyan">Languages:</span> C, C++, Python, JavaScript (ES6+), HTML5/CSS3');
        break;

      case 'projects':
        appendLog('Featured Builds:');
        appendLog('1. IoT Weather &amp; Air Quality Edge Station [ESP32]');
        appendLog('2. Autonomous Obstacle Avoidance Rover [Embedded C]');
        appendLog('3. 8-Bit Synthesizable ALU Processor [Verilog HDL]');
        appendLog('4. Regulated 5V/3.3V Power Supply PCB [KiCad]');
        const projSec = document.getElementById('projects');
        if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'about':
        appendLog('Om Gupta - 3rd Year B.Tech (ECE) @ MBM University, Jodhpur.');
        appendLog('Passionate about combining hardware precision with software agility.');
        break;

      case 'contact':
        appendLog('Institutional: <a href="mailto:omgupta.ece@mbm.ac.in" class="text-cyan">omgupta.ece@mbm.ac.in</a>');
        appendLog('Campus: MBM University, Jodhpur, Rajasthan, India');
        appendLog('LinkedIn: linkedin.com/in/om-gupta-ece');
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'cv':
      case 'resume':
        appendLog('<span class="text-cyan">Generating &amp; downloading Om Gupta CV...</span>');
        downloadResume();
        break;

      case 'ping':
        appendLog('PING 127.0.0.1 (localhost): 64 bytes, time=4.2ms [MBM_ECE_CORE: ALIVE]');
        break;

      case 'univ':
      case 'mbm':
        appendLog('MBM University, Jodhpur (Est. 1951) - Leading engineering institution in Rajasthan.');
        break;

      case 'clear':
        termLogs.innerHTML = '';
        break;

      default:
        appendLog(`command not found: "${rawCmd}". Type <span class="text-cyan">'help'</span> for instructions.`, 'text-muted');
        break;
    }
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = termInput.value;
        runCommand(value);
        termInput.value = '';
      }
    });
  }

  cmdChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      runCommand(cmd);
    });
  });

  if (terminalToggleBtn) {
    terminalToggleBtn.addEventListener('click', () => {
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
      if (termInput) {
        termInput.focus();
        appendLog('&gt; Terminal focused. Type <span class="text-cyan">help</span> or click command buttons.', 'text-emerald');
      }
    });
  }

  /* ==========================================================================
     5. Live Interactive ECE Oscilloscope Simulator (Bento Card)
     ========================================================================== */
  const scopeCanvas = document.getElementById('oscilloscope-canvas');
  const freqSlider = document.getElementById('freq-slider');
  const freqValLabel = document.getElementById('scope-freq-val');
  const waveNameLabel = document.getElementById('scope-wave-name');
  const waveButtons = document.querySelectorAll('.wave-btn');

  if (scopeCanvas) {
    const ctx = scopeCanvas.getContext('2d');
    let waveType = 'sine';
    let frequency = 2.0;
    let phase = 0;

    function resizeScope() {
      scopeCanvas.width = scopeCanvas.clientWidth * window.devicePixelRatio;
      scopeCanvas.height = scopeCanvas.clientHeight * window.devicePixelRatio;
    }
    resizeScope();
    window.addEventListener('resize', resizeScope);

    if (freqSlider) {
      freqSlider.addEventListener('input', (e) => {
        frequency = parseFloat(e.target.value);
        if (freqValLabel) freqValLabel.textContent = `Freq: ${frequency.toFixed(1)} Hz`;
      });
    }

    waveButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        waveButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        waveType = btn.getAttribute('data-wave');
        if (waveNameLabel) waveNameLabel.textContent = `Wave: ${waveType.toUpperCase()}`;
      });
    });

    function drawOscilloscope() {
      const w = scopeCanvas.width;
      const h = scopeCanvas.height;
      const centerY = h / 2;
      const amplitude = h * 0.35;

      ctx.clearRect(0, 0, w, h);

      // Draw Oscilloscope Grid Lines
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.08)';
      ctx.lineWidth = 1;

      // Vertical grid
      const gridSpacingX = w / 10;
      for (let x = 0; x < w; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal grid
      const gridSpacingY = h / 6;
      for (let y = 0; y < h; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center Reference Line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();

      // Draw Signal Waveform
      ctx.beginPath();
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 2.5 * window.devicePixelRatio;
      ctx.shadowColor = '#00f5ff';
      ctx.shadowBlur = 12;

      for (let x = 0; x < w; x++) {
        const t = (x / w) * (frequency * Math.PI * 4) + phase;
        let y = centerY;

        if (waveType === 'sine') {
          y = centerY - Math.sin(t) * amplitude;
        } else if (waveType === 'square') {
          y = centerY - (Math.sin(t) >= 0 ? amplitude : -amplitude);
        } else if (waveType === 'sawtooth') {
          const mod = (t % (Math.PI * 2)) / (Math.PI * 2);
          y = centerY - (mod * 2 - 1) * amplitude;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      phase += 0.04 * frequency;
      requestAnimationFrame(drawOscilloscope);
    }
    requestAnimationFrame(drawOscilloscope);
  }

  /* ==========================================================================
     6. Interactive Background Canvas (Circuit & Constellation Particles)
     ========================================================================== */
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width = (bgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = window.innerHeight);

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 16000), 70);
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class ParticleNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.isCyan = Math.random() > 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2.2;
            this.y += Math.sin(angle) * force * 2.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isCyan ? 'rgba(0, 245, 255, 0.6)' : 'rgba(168, 85, 247, 0.6)';
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new ParticleNode());
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      // Lines between nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = 1 - dist / 110;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${alpha * 0.14})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Connecting to cursor
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = 1 - dist / 130;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(renderParticles);
    }
    renderParticles();

    window.addEventListener('resize', () => {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
    });
  }

  /* ==========================================================================
     7. Floating Navigation ScrollSpy & Mobile Drawer Toggle
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');

  function onScrollNav() {
    const scrollPos = window.scrollY + 160;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScrollNav, { passive: true });

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     8. Project Category Filtering
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-bento-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     9. Interactive Project Specs Sheet Modal
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectSpecsDatabase = {
    weather: {
      title: 'Smart IoT Weather & Air Quality Edge Station',
      content: `
        <p><strong>Overview:</strong> Autonomous edge telemetry device designed to monitor environmental temperature, relative humidity, pressure, and volatile gas concentrations.</p>
        <h4>Hardware Components:</h4>
        <ul>
          <li><strong>Microcontroller:</strong> ESP32-WROOM-32 (Tensilica Xtensa Dual-Core 32-bit LX6 @ 240MHz)</li>
          <li><strong>Sensors:</strong> Bosch BME280 (I2C interface @ 0x76) + MQ-135 Air Quality Sensor (ADC GPIO34)</li>
          <li><strong>Power:</strong> 18650 Li-Ion Cell with TP4056 USB-C Charging Module &amp; ME6211 3.3V LDO</li>
        </ul>
        <h4>Firmware &amp; Architecture:</h4>
        <p>Firmware programmed in Embedded C++ with FreeRTOS multitasking. Sensor readings are sampled every 5 seconds, serialized into JSON packets, and published via MQTT over TLS (port 8883) to a cloud broker.</p>
        <div class="modal-code-block">// ESP32 MQTT Telemetry Snippet
StaticJsonDocument&lt;256&gt; doc;
doc["node_id"] = "MBM_ECE_NODE_01";
doc["temp_c"] = bme.readTemperature();
doc["humidity"] = bme.readHumidity();
doc["air_quality_ppm"] = analogRead(MQ135_PIN);
char buffer[256];
serializeJson(doc, buffer);
mqttClient.publish("mbm/telemetry/station1", buffer);</div>
      `
    },
    rover: {
      title: 'Autonomous Obstacle-Avoidance & Surveillance Rover',
      content: `
        <p><strong>Overview:</strong> 4-Wheel differential drive robot capable of mapping obstacles in its trajectory and calculating collision-free vectors in real time.</p>
        <h4>Hardware Components:</h4>
        <ul>
          <li><strong>Controller:</strong> ATmega328P Microcontroller Platform</li>
          <li><strong>Motors &amp; Driver:</strong> 4x Geared DC Motors (6V) + L298N Dual Full-Bridge Motor Driver</li>
          <li><strong>Perception:</strong> HC-SR04 Ultrasonic Ranging Sensor mounted on SG90 Micro Servo (180&deg; sweep)</li>
        </ul>
        <h4>Logic Algorithm:</h4>
        <p>Executes an autonomous scan cycle: continuously monitors forward clearance. If distance &lt; 25cm, halts rover, rotates servo left and right to sample surrounding clearances, and executes turn toward the path of maximum clearance.</p>
        <div class="modal-code-block">// Autonomous Collision Avoidance Logic
long dist = measureDistance();
if (dist &lt; 25) {
  stopMotors();
  int leftDist = scanDirection(160);
  int rightDist = scanDirection(20);
  if (leftDist &gt; rightDist) {
    pivotLeft(400);
  } else {
    pivotRight(400);
  }
} else {
  driveForward(200);
}</div>
      `
    },
    alu: {
      title: '8-Bit Synthesizable ALU & Logic Processor',
      content: `
        <p><strong>Overview:</strong> Register Transfer Level (RTL) design of an 8-bit Arithmetic Logic Unit synthesized for FPGA deployment.</p>
        <h4>Architecture Specifications:</h4>
        <ul>
          <li><strong>Data Bus:</strong> 8-Bit Inputs A[7:0], B[7:0], Output ALU_Out[7:0]</li>
          <li><strong>Opcode:</strong> 4-Bit Control Selector [Op_Code 0000 to 1111]</li>
          <li><strong>Status Flags:</strong> Zero Flag (Z), Carry Flag (C), Overflow Flag (V), Negative Flag (N)</li>
        </ul>
        <h4>Operations Implemented:</h4>
        <p>ADD, SUB, AND, OR, XOR, NOT, Logical Left Shift, Logical Right Shift, Rotate, Increment, Decrement, and Comparator.</p>
        <div class="modal-code-block">// Verilog HDL Excerpt
module ALU_8Bit(
  input [7:0] A, B,
  input [3:0] OpCode,
  output reg [7:0] ALU_Out,
  output reg CarryOut, ZeroFlag
);
always @(*) begin
  case(OpCode)
    4'b0000: {CarryOut, ALU_Out} = A + B; // ADD
    4'b0001: {CarryOut, ALU_Out} = A - B; // SUB
    4'b0010: ALU_Out = A & B;             // AND
    4'b0011: ALU_Out = A | B;             // OR
    default: ALU_Out = 8'h00;
  endcase
  ZeroFlag = (ALU_Out == 8'b0);
end
endmodule</div>
      `
    },
    power: {
      title: 'Regulated Dual-Rail 5V / 3.3V Power Supply PCB',
      content: `
        <p><strong>Overview:</strong> Compact hardware PCB for laboratory breadboard prototypes providing stable dual-rail regulated outputs with ripple suppression.</p>
        <h4>Circuit Highlights:</h4>
        <ul>
          <li><strong>Input:</strong> 7V &ndash; 12V DC via 2.1mm Center-Positive Barrel Jack</li>
          <li><strong>Outputs:</strong> 5.0V @ 1.0A (LM7805) &bull; 3.3V @ 800mA (AMS1117-3.3)</li>
          <li><strong>Protection:</strong> 1N4007 Schottky reverse polarity diode + 500mA resettable PTC polyfuse</li>
          <li><strong>Filter Stage:</strong> 100uF electrolytic bulk cap + 0.1uF ceramic high-frequency bypass caps</li>
        </ul>
        <h4>PCB Specifications:</h4>
        <p>Designed in KiCad 8.0 with a solid bottom ground plane, 30mil power traces, thermal reliefs on regulator tabs, and dual diagnostic status LEDs.</p>
      `
    },
    parser: {
      title: 'Sensor Telemetry Stream Packet Parser (C++)',
      content: `
        <p><strong>Overview:</strong> High-efficiency C++ parser designed to decode binary UART telemetry frames emitted from IoT sensor hubs.</p>
        <h4>Key Technical Features:</h4>
        <ul>
          <li><strong>Frame Structure:</strong> Header [0xAA, 0x55] | Length | Payload | 16-Bit CRC | Footer [0x0D, 0x0A]</li>
          <li><strong>Error Detection:</strong> CRC-16-CCITT algorithm for packet transmission verification</li>
          <li><strong>Serialization:</strong> Zero-allocation deserialization into structured C++ structs and JSON</li>
        </ul>
      `
    }
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectSpecsDatabase[projKey];
      if (data && projectModal && modalTitle && modalBody) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ==========================================================================
     10. Toast Notification System
     ========================================================================== */
  function showToast(title, message, type = 'info') {
    const deck = document.getElementById('toast-deck');
    if (!deck) return;

    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type}`;

    const icon =
      type === 'success'
        ? 'fa-circle-check'
        : type === 'info'
        ? 'fa-circle-info'
        : 'fa-bell';

    toast.innerHTML = `
      <div class="toast-icon-wrap">
        <i class="fa-solid ${icon}"></i>
      </div>
      <div class="toast-body">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    deck.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (deck.contains(toast)) deck.removeChild(toast);
      }, 400);
    }, 4500);
  }

  /* ==========================================================================
     11. Quick Copy Email Functionality
     ========================================================================== */
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = 'omgupta.ece@mbm.ac.in';
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showToast('Email Copied!', `${email} copied to your clipboard.`, 'success');
        })
        .catch(() => {
          showToast('Contact Coordinates', `Direct Email: ${email}`, 'info');
        });
    });
  });

  /* ==========================================================================
     12. Resume Download Functionality
     ========================================================================== */
  function downloadResume() {
    showToast(
      'Curriculum Vitae',
      'Generating Om Gupta - ECE Undergraduate (MBM University) resume file...',
      'info'
    );

    setTimeout(() => {
      const text = `===============================================================
OM GUPTA // RESUME DOSSIER
Department of Electronics & Communication Engineering
MBM University, Jodhpur, Rajasthan, India
Institutional Email: omgupta.ece@mbm.ac.in
GitHub: https://github.com/om-gupta | LinkedIn: https://linkedin.com
===============================================================

[SUMMARY]
Pre-final year (3rd year) B.Tech student in Electronics & Communication 
Engineering at MBM University. Passionate about bridging hardware precision 
and software scalability. Experienced with Embedded Systems (ESP32/Arduino), 
IoT Protocols (MQTT/HTTP), Circuit & PCB Design (KiCad), Verilog HDL, and C++.

[EDUCATION]
- Bachelor of Technology (B.Tech) in Electronics & Communication Engineering
  MBM University, Jodhpur, Rajasthan (2023 - 2027, 3rd Year Active)
- Senior Secondary Schooling (PCM - Science & Mathematics) (2021 - 2023)

[KEY SKILLS]
- Embedded & IoT: C, Embedded C, ESP32, Arduino, FreeRTOS, MQTT, Sensors.
- Hardware & VLSI: Verilog HDL, KiCad PCB Layout, LTSpice, Proteus, Logic Design.
- Software & Languages: C, C++ (OOP & STL), Python, Data Structures & Algorithms.
- Modern Web: Semantic HTML5, Vanilla CSS3 (Flexbox/Grid), JavaScript (ES6+).
- Tools: Git/GitHub, Linux CLI, VS Code, Keil uVision, MATLAB.

[FEATURED PROJECTS]
1. Smart IoT Weather & Air Quality Edge Station (ESP32, BME280, MQTT, Web Dashboard)
2. Autonomous Obstacle-Avoidance Rover (Arduino, L298N Motor Driver, Embedded C)
3. 8-Bit Synthesizable ALU Processor (Verilog HDL, ModelSim, FPGA Architecture)
4. Regulated Dual-Rail 5V/3.3V Power Supply PCB (KiCad 8.0, 2-Layer Board)
5. High-Throughput Serial Telemetry Stream Packet Parser (Modern C++20)

[AFFILIATIONS & ACTIVITIES]
- Active Member, MBM University Student Technical & Robotics Society
- Participant in Regional Hardware Hackathons & Coding Challenges
===============================================================`;

      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Om_Gupta_ECE_MBM_Resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 600);
  }

  const heroResumeBtn = document.getElementById('hero-resume-btn');
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', downloadResume);

  /* ==========================================================================
     13. Contact Message Transmission & Validation
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const nameField = nameInput.closest('.form-field');
      if (!nameInput.value.trim()) {
        nameField.classList.add('has-error');
        valid = false;
      } else {
        nameField.classList.remove('has-error');
      }

      const emailField = emailInput.closest('.form-field');
      if (!isValidEmail(emailInput.value.trim())) {
        emailField.classList.add('has-error');
        valid = false;
      } else {
        emailField.classList.remove('has-error');
      }

      const msgField = messageInput.closest('.form-field');
      if (messageInput.value.trim().length < 10) {
        msgField.classList.add('has-error');
        valid = false;
      } else {
        msgField.classList.remove('has-error');
      }

      if (valid) {
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Transmitting...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalHtml;
          submitBtn.disabled = false;
          contactForm.reset();

          showToast(
            'Transmission Confirmed!',
            'Thank you for reaching out! Om Gupta has received your message and will respond promptly.',
            'success'
          );
        }, 1200);
      }
    });

    [nameInput, emailInput, messageInput].forEach((inp) => {
      if (inp) {
        inp.addEventListener('input', () => {
          const field = inp.closest('.form-field');
          if (field) field.classList.remove('has-error');
        });
      }
    });
  }
});
