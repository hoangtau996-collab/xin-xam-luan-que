// State Management
let currentStep = 'keo'; // keo, shake, result
let interpretMode = 'full'; // full, instant
let userWish = 'Thành tâm khấn nguyện';
let attemptsCount = 0;
let hasSucceededKeo = false;
let shakeCount = 0;
let selectedQue = null;
let shakeLock = false;
let tossLock = false;

// Audio Context & Variables
let audioCtx = null;
let soundEnabled = true;

// DOM Elements
const secKeo = document.getElementById('sec-keo');
const secShake = document.getElementById('sec-shake');
const secResult = document.getElementById('sec-result');

const keo1 = document.getElementById('keo-1');
const keo2 = document.getElementById('keo-2');
const keoResultMsg = document.getElementById('keo-result-msg');
const btnToss = document.getElementById('btn-toss');
const btnNextStep = document.getElementById('btn-next-step');

const shakeCountLabel = document.getElementById('shake-count');
const shakeProgress = document.getElementById('shake-progress');
const tubeContainer = document.getElementById('tube-container');
const bambooTube = tubeContainer.querySelector('.bamboo-tube');
const risingStick = document.getElementById('rising-stick');
const risingStickNum = document.getElementById('rising-stick-num');
const btnReveal = document.getElementById('btn-reveal');

const blockTimerContainer = document.getElementById('block-timer-container');
const countdownLabel = document.getElementById('countdown');

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  if (!checkTimeLock()) {
    showSection('keo');
  }
});

// Check if user is locked out
function checkTimeLock() {
  const lockTimeStr = localStorage.getItem('xin_xam_lock_time');
  if (lockTimeStr) {
    const lockTime = parseInt(lockTimeStr, 10);
    const timeRemaining = lockTime + 30 * 60 * 1000 - Date.now();
    
    if (timeRemaining > 0) {
      // Locked out! Show lock screen in Step 1
      showSection('keo');
      blockTimerContainer.classList.remove('hidden');
      btnToss.disabled = true;
      btnToss.style.opacity = '0.5';
      keoResultMsg.textContent = "Bạn đang bị tạm khóa do gieo keo bất thành 3 lần.";
      
      startCountdown(timeRemaining);
      return true;
    } else {
      // Lock expired
      localStorage.removeItem('xin_xam_lock_time');
    }
  }
  return false;
}

// Start Countdown Timer
let countdownInterval = null;
function startCountdown(durationMs) {
  if (countdownInterval) clearInterval(countdownInterval);
  
  let timeRemaining = durationMs;
  
  const updateTimer = () => {
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      localStorage.removeItem('xin_xam_lock_time');
      blockTimerContainer.classList.add('hidden');
      btnToss.disabled = false;
      btnToss.style.opacity = '1';
      keoResultMsg.textContent = "Hãy nhấn 'Gieo Keo' bên dưới.";
      attemptsCount = 0;
      resetAttemptSlots();
      return;
    }
    
    const minutes = Math.floor(timeRemaining / (60 * 1000));
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
    
    countdownLabel.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeRemaining -= 1000;
  };
  
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

// Reset the attempts slots (Step 1 indicators)
function resetAttemptSlots() {
  document.querySelectorAll('.attempt-slot').forEach(slot => {
    slot.className = 'attempt-slot';
    slot.textContent = '';
  });
}

// Toggle Sound Setting
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('btn-sound');
  btn.querySelector('.icon-sound').textContent = soundEnabled ? '🔊' : '🔇';
}

// Initialize Web Audio API
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Sound synthesizer: Wooden clack
function playWoodClack(delay = 0, pitch = 1, volume = 0.6) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450 * pitch, audioCtx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(70 * pitch, audioCtx.currentTime + delay + 0.08);
    
    gain.gain.setValueAtTime(volume, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + delay + 0.08);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + 0.1);
  } catch (e) {
    console.error("Audio Playback Error:", e);
  }
}

// Sound synthesizer: Stick rattle ("lóc cóc" sound of multiple sticks colliding in hollow cup)
function playStickRattle() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    // Play 5 to 7 micro-clacks in quick succession with random pitch and volumes
    const clacks = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < clacks; i++) {
      const delay = i * 0.015 + Math.random() * 0.01;
      const pitch = 0.85 + Math.random() * 0.8;
      const volume = 0.15 + Math.random() * 0.25;
      playWoodClack(delay, pitch, volume);
    }
  } catch (e) {
    console.error("Audio Playback Error:", e);
  }
}

// Navigation between screens
function showSection(sectionId) {
  const sections = [secKeo, secShake, secResult];
  sections.forEach(sec => {
    if (sec) sec.classList.remove('active');
  });
  
  if (secKeo && sectionId === 'keo') secKeo.classList.add('active');
  if (secShake && sectionId === 'shake') secShake.classList.add('active');
  if (secResult && sectionId === 'result') secResult.classList.add('active');
}

// Stage 1: Toss Coins
function tossKeo() {
  interpretMode = document.querySelector('input[name="interpret-mode"]:checked').value;
  if (tossLock || hasSucceededKeo) return;
  
  // Initialize audio on click interaction
  initAudio();
  
  tossLock = true;
  attemptsCount++;
  
  // Reset coin classes to animate again
  const kInner1 = keo1.querySelector('.keo-inner');
  const kInner2 = keo2.querySelector('.keo-inner');
  
  kInner1.className = 'keo-inner';
  kInner2.className = 'keo-inner';
  
  // Force browser reflow to restart CSS keyframe animations
  void keo1.offsetWidth;
  void keo2.offsetWidth;
  
  // Determine toss combination:
  // 50% chance Sấp - Ngửa, 25% Sấp - Sấp, 25% Ngửa - Ngửa
  const rand = Math.random();
  let result = ''; // 'sap-ngua', 'sap-sap', 'ngua-ngua'
  let side1 = '';  // 'sap', 'ngua'
  let side2 = '';  // 'sap', 'ngua'
  
  if (rand < 0.5) {
    result = 'sap-ngua';
    // Decide who is sap and who is ngua
    if (Math.random() < 0.5) {
      side1 = 'sap';
      side2 = 'ngua';
    } else {
      side1 = 'ngua';
      side2 = 'sap';
    }
  } else if (rand < 0.75) {
    result = 'sap-sap';
    side1 = 'sap';
    side2 = 'sap';
  } else {
    result = 'ngua-ngua';
    side1 = 'ngua';
    side2 = 'ngua';
  }
  
  // Apply visual spin classes
  kInner1.classList.add(side1 === 'sap' ? 'spin-sap' : 'spin-ngua');
  kInner2.classList.add(side2 === 'sap' ? 'spin-sap' : 'spin-ngua');
  
  // Play landing wood clacks aligned with animations
  setTimeout(() => playWoodClack(0, 0.95, 0.8), 900);
  setTimeout(() => playWoodClack(0, 1.05, 0.7), 1000);
  
  // Wait for 3D animation to complete (1.2 seconds)
  setTimeout(() => {
    const slot = document.querySelector(`.attempt-slot[data-slot="${attemptsCount}"]`);
    
    if (result === 'sap-ngua') {
      hasSucceededKeo = true;
      slot.classList.add('sap-ngua');
      slot.textContent = '☯';
      keoResultMsg.innerHTML = `<span style="color:#2e8b57; font-weight:bold;">Nhất Âm Nhất Dương (Sấp - Ngửa)!</span><br>Thần Phật đồng ý. Hãy lắc ống xăm.`;
      
      btnToss.classList.add('hidden');
      btnNextStep.classList.remove('hidden');
      
      // Auto pulse next button
      btnNextStep.classList.add('shake-instruction-pulse');
    } else if (result === 'sap-sap') {
      slot.classList.add('sap-sap');
      slot.textContent = 'C'; // Cười (Kiêu)
      keoResultMsg.innerHTML = `<span style="color:#ff3b3b;">Keo Sấp - Sấp (Kiêu bôi - Cười)!</span><br>Thần Phật chưa rõ ý nguyện. Hãy gieo lại.`;
    } else {
      slot.classList.add('ngua-ngua');
      slot.textContent = 'Đ'; // Đổ (Âm)
      keoResultMsg.innerHTML = `<span style="color:#f39c12;">Keo Ngửa - Ngửa (Âm bôi - Đổ)!</span><br>Thần Phật giận/không thuận. Hãy gieo lại.`;
    }
    
    // Check if failed all 3 attempts
    if (!hasSucceededKeo && attemptsCount === 3) {
      // Save Lock Timestamp (30 mins)
      const lockTime = Date.now();
      localStorage.setItem('xin_xam_lock_time', lockTime.toString());
      
      setTimeout(() => {
        blockTimerContainer.classList.remove('hidden');
        btnToss.disabled = true;
        btnToss.style.opacity = '0.5';
        keoResultMsg.textContent = "Xin keo bất thành 3 lần. Vui lòng thử lại sau.";
        startCountdown(30 * 60 * 1000);
      }, 500);
    }
    
    tossLock = false;
  }, 1200);
}

// Stage 1 -> Stage 2 transition
function goToShake() {
  shakeCount = 0;
  shakeLock = false;
  shakeCountLabel.textContent = '0';
  shakeProgress.style.width = '0%';
  btnReveal.classList.add('hidden');
  risingStick.classList.remove('draw-out');
  risingStick.classList.add('hidden');
  
  // Request DeviceMotionEvent permission for iOS 13+
  if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', handleDeviceMotion, true);
        }
      })
      .catch(err => {
        console.warn("DeviceMotion Permission Denied or Error:", err);
      });
  } else {
    // For Android or older browsers, listen directly
    window.addEventListener('devicemotion', handleDeviceMotion, true);
  }
  
  showSection('shake');
}

// Device Shaking Detection variables
let lastX = null, lastY = null, lastZ = null;
let lastShakeTime = 0;
const SHAKE_THRESHOLD = 18; // Sensible acceleration threshold

// Handle Device Motion event (Shake Phone to Shake sticks)
function handleDeviceMotion(event) {
  if (currentStep !== 'shake' || shakeLock || shakeCount >= 11) return;
  
  // Verify that event.acceleration exists and has actual values, otherwise fallback to accelerationIncludingGravity
  let acc = event.acceleration;
  if (!acc || acc.x === null || acc.y === null || acc.z === null) {
    acc = event.accelerationIncludingGravity;
  }
  if (!acc) return;
  
  let x = acc.x || 0;
  let y = acc.y || 0;
  let z = acc.z || 0;
  
  if (lastX === null) {
    lastX = x;
    lastY = y;
    lastZ = z;
    return;
  }
  
  let deltaX = Math.abs(x - lastX);
  let deltaY = Math.abs(y - lastY);
  let deltaZ = Math.abs(z - lastZ);
  
  // Check if phone moves vigorously on at least two axes
  if ((deltaX > SHAKE_THRESHOLD && deltaY > SHAKE_THRESHOLD) || 
      (deltaX > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD) || 
      (deltaY > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD)) {
    
    const now = Date.now();
    if (now - lastShakeTime > 250) { // debounce: 250ms
      lastShakeTime = now;
      handleShakeTap(); // Trigger a shake increment
    }
  }
  
  lastX = x;
  lastY = y;
  lastZ = z;
}

// Stage 2: Click or Tap to shake tube
function handleShakeTap() {
  if (shakeLock || shakeCount >= 11) return;
  
  shakeLock = true;
  shakeCount++;
  
  // Play sound
  playStickRattle();
  
  // Trigger wiggle animation by CSS class
  bambooTube.classList.add('shake-active');
  setTimeout(() => {
    bambooTube.classList.remove('shake-active');
    shakeLock = false;
  }, 150);
  
  // Update meter
  shakeCountLabel.textContent = shakeCount.toString();
  const fillPercent = Math.min((shakeCount / 11) * 100, 100);
  shakeProgress.style.width = `${fillPercent}%`;
  
  // At exactly 11, draw a stick
  if (shakeCount === 11) {
    shakeLock = true;
    
    // Select a random stick from the database
    const randIndex = Math.floor(Math.random() * QUE_DATA.length);
    selectedQue = QUE_DATA[randIndex];
    
    // Assign number to stick
    risingStickNum.textContent = selectedQue.id.toString();
    
    // Rising animation
    risingStick.classList.remove('hidden');
    risingStick.classList.add('draw-out');
    
    // Play final stick fall sound
    setTimeout(() => playWoodClack(0, 0.7, 0.9), 600);
    setTimeout(() => playWoodClack(0.08, 0.9, 0.6), 680);
    
    // Show details reveal button
    setTimeout(() => {
      btnReveal.classList.remove('hidden');
      btnReveal.classList.add('shake-instruction-pulse');
      document.getElementById('shake-instruction').textContent = "Thẻ xăm đã rơi ra! Nhấn nút để xem.";
    }, 1500);
  }
}

// Helper to get instant advice based on stick rating
function getInstantAdvice(queName) {
  let verdict = "";
  let note = "";
  let colorClass = "";
  
  if (queName.includes("Thượng Thượng")) {
    verdict = "THƯỢNG THƯỢNG (ĐẠI CÁT)";
    note = "Xăm Đại Cát: Mọi việc hanh thông cực thịnh, cầu được ước thấy, cát tường như ý.";
    colorClass = "text-gold";
  } else if (queName.includes("Thượng Cát")) {
    verdict = "THƯỢNG CÁT (TỐT LÀNH)";
    note = "Xăm Tốt: Thời vận hanh thông, công danh rạng rỡ, mọi việc suôn sẻ khởi sắc.";
    colorClass = "text-gold";
  } else if (queName.includes("Trung Cát")) {
    verdict = "TRUNG CÁT (KHÁ TỐT)";
    note = "Xăm Khá: Vận khí đang lên, gặp nhiều cơ hội tốt, nhân duyên thuận hòa.";
    colorClass = "text-gold";
  } else if (queName.includes("Trung Bình")) {
    verdict = "TRUNG BÌNH (BÌNH HÒA)";
    note = "Xăm Bình Hòa: Vận thế ổn định, không nên thay đổi lớn hay mạo hiểm, tĩnh thủ là hơn.";
    colorClass = "text-orange";
  } else if (queName.includes("Hạ Cát")) {
    verdict = "HẠ CÁT (HƠI XẤU)";
    note = "Xăm Hơi Xấu: Có chút khó khăn, chướng ngại cản lối, làm việc cần nhẫn nại, cẩn trọng.";
    colorClass = "text-red-light";
  } else if (queName.includes("Hạ Hạ")) {
    verdict = "HẠ HẠ (ĐẠI HUNG)";
    note = "Xăm Xấu: Vận hạn cản lối, thị phi trắc trở, mọi việc cần hết sức cẩn trọng, đề phòng rủi ro.";
    colorClass = "text-red";
  } else {
    verdict = "TRUNG BÌNH";
    note = "Xăm Bình Hòa: Vận thế bình thường, nên làm việc thiện tích đức.";
    colorClass = "text-orange";
  }
  return { verdict, note, colorClass };
}

// Stage 2 -> Stage 3: Reveal Fortune
function revealFortune() {
  if (!selectedQue) return;
  
  // Fill common text inside scroll
  document.getElementById('scroll-que-name').textContent = selectedQue.name;
  document.getElementById('scroll-que-subtitle').textContent = `« ${selectedQue.title} »`;
  document.getElementById('scroll-user-wish').textContent = userWish;

  const btnShowDetails = document.getElementById('btn-show-details');
  const scrollInstantSec = document.getElementById('scroll-instant-sec');
  const scrollFullSections = document.getElementById('scroll-full-sections');

  if (interpretMode === 'instant') {
    // Show Instant Section, Hide Full Sections and Details button
    scrollInstantSec.classList.remove('hidden');
    scrollFullSections.classList.add('hidden');
    btnShowDetails.classList.add('hidden');

    const advice = getInstantAdvice(selectedQue.name);
    const verdictEl = document.getElementById('instant-verdict');
    verdictEl.textContent = advice.verdict;
    verdictEl.className = `instant-verdict-text ${advice.colorClass}`;
    document.getElementById('instant-note').textContent = advice.note;
  } else {
    // Show Full Sections and Details button, Hide Instant Section
    scrollInstantSec.classList.add('hidden');
    scrollFullSections.classList.remove('hidden');
    btnShowDetails.classList.remove('hidden');

    document.getElementById('scroll-poem').innerHTML = selectedQue.poem.replace(/\n/g, '<br>');
    document.getElementById('scroll-translation').innerHTML = selectedQue.translation.replace(/\n/g, '<br>');
    document.getElementById('scroll-meaning').textContent = selectedQue.meaning;
    
    // Render details table
    const tbody = document.getElementById('scroll-details-tbody');
    tbody.innerHTML = '';
    for (const [key, val] of Object.entries(selectedQue.details)) {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${key}</td><td>${val}</td>`;
      tbody.appendChild(row);
    }
    
    // Render details modal content
    const modalContent = document.getElementById('modal-details-content');
    modalContent.innerHTML = '';
    for (const [key, val] of Object.entries(selectedQue.details)) {
      const row = document.createElement('div');
      row.className = 'modal-detail-row';
      row.innerHTML = `
        <div class="modal-detail-label">${key}</div>
        <div class="modal-detail-value">${val}</div>
      `;
      modalContent.appendChild(row);
    }
  }
  
  showSection('result');
}

// Modal management
function openDetailsModal() {
  document.getElementById('details-modal').style.display = 'flex';
}

function closeDetailsModal() {
  document.getElementById('details-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('details-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Reset Application to start over
function resetApp() {
  if (checkTimeLock()) return;
  
  attemptsCount = 0;
  hasSucceededKeo = false;
  resetAttemptSlots();
  
  btnToss.classList.remove('hidden');
  btnNextStep.classList.add('hidden');
  btnToss.disabled = false;
  btnToss.style.opacity = '1';
  keoResultMsg.textContent = "Hãy thành tâm khấn nguyện trong tâm rồi nhấn 'Gieo Keo'.";
  
  // Reset coins classes
  keo1.querySelector('.keo-inner').className = 'keo-inner';
  keo2.querySelector('.keo-inner').className = 'keo-inner';
  
  showSection('keo');
}

// Draw Word Wrapped Text on Canvas Helper
function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

// Generate & Download the Card Image using HTML5 Canvas
function saveAsImage() {
  if (!selectedQue) return;
  
  const canvas = document.getElementById('export-canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  
  // Set canvas height dynamically based on interpretation mode
  const height = interpretMode === 'instant' ? 680 : 1200;
  canvas.height = height;
  
  // 1. Draw Parchment background color
  ctx.fillStyle = '#f7fffb';
  ctx.fillRect(0, 0, width, height);
  
  // Draw subtle vintage texture (dots/clouds)
  ctx.fillStyle = 'rgba(46, 139, 87, 0.03)';
  for (let i = 0; i < 500; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const radius = Math.random() * 80 + 10;
    ctx.beginPath();
    ctx.arc(rx, ry, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 2. Draw border
  // Outer thick green border
  ctx.strokeStyle = '#163f2b';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, width - 14, height - 14);
  
  // Inner thin gold/pink border
  ctx.strokeStyle = '#ff8da1';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, width - 40, height - 40);
  
  // Corner ornaments
  ctx.strokeStyle = '#ff8da1';
  ctx.lineWidth = 2;
  const cOffset = 30;
  // Top left
  ctx.strokeRect(cOffset, cOffset, 20, 20);
  // Top right
  ctx.strokeRect(width - cOffset - 20, cOffset, 20, 20);
  // Bottom left
  ctx.strokeRect(cOffset, height - cOffset - 20, 20, 20);
  // Bottom right
  ctx.strokeRect(width - cOffset - 20, height - cOffset - 20, 20, 20);
  
  // 3. Draw Header Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#c94a61';
  ctx.font = 'bold 36px "Times New Roman", Georgia, serif';
  ctx.fillText('XĂM LINH QUẺ THÁNH MẪU', width / 2, 85);
  
  ctx.font = 'italic 18px "Georgia", serif';
  ctx.fillStyle = '#27794e';
  ctx.fillText('Chân thành cầu nguyện - Hanh thông cát tường', width / 2, 115);
  
  // Divider line
  ctx.strokeStyle = 'rgba(255, 141, 161, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 135);
  ctx.lineTo(width - 100, 135);
  ctx.stroke();
  
  // 4. Draw Pilgrim Info (Traditional generic centered text since input was removed)
  ctx.textAlign = 'center';
  ctx.font = 'italic 18px "Georgia", serif';
  ctx.fillStyle = '#0c2b1a';
  ctx.fillText('« Vạn sự tùy duyên - Thành tâm khấn nguyện »', width / 2, 175);
  
  // Divider
  const dividerY = 195;
  ctx.beginPath();
  ctx.moveTo(60, dividerY);
  ctx.lineTo(width - 60, dividerY);
  ctx.stroke();
  
  // 5. Draw Stick Name / Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#c94a61';
  ctx.font = 'bold 30px "Times New Roman", Georgia, serif';
  const nameY = dividerY + 50;
  ctx.fillText(selectedQue.name, width / 2, nameY);
  
  ctx.fillStyle = '#27794e';
  ctx.font = 'bold 24px "Times New Roman", Georgia, serif';
  const titleY = nameY + 40;
  ctx.fillText(`« ${selectedQue.title} »`, width / 2, titleY);
  
  // 6. Draw Content depending on interpretation mode
  if (interpretMode === 'instant') {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 22px "Times New Roman", Georgia, serif';
    const instantTitleY = titleY + 60;
    ctx.fillText('LỜI KHUYÊN TỨC THÌ', width / 2, instantTitleY);

    // Inner dashed box
    ctx.strokeStyle = 'rgba(255, 141, 161, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(60, instantTitleY + 25, width - 120, 160);
    ctx.setLineDash([]); // Reset dashed state

    // Get instant advice text & color
    const advice = getInstantAdvice(selectedQue.name);
    
    let adviceColor = '#f7fffb';
    if (advice.colorClass === 'text-gold') adviceColor = '#2e8b57';
    else if (advice.colorClass === 'text-orange') adviceColor = '#d97706';
    else if (advice.colorClass === 'text-red-light') adviceColor = '#c94a61';
    else if (advice.colorClass === 'text-red') adviceColor = '#b91c1c';

    ctx.fillStyle = adviceColor;
    ctx.font = 'bold 24px "Times New Roman", Georgia, serif';
    ctx.fillText(advice.verdict, width / 2, instantTitleY + 75);

    ctx.fillStyle = '#2b493b';
    ctx.font = 'italic 18px "Georgia", serif';
    // Wrap advice note text
    wrapCanvasText(ctx, advice.note, width / 2, instantTitleY + 115, width - 180, 26);
  } else {
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 20px "Times New Roman", Georgia, serif';
    const poemTitleY = titleY + 50;
    ctx.fillText('THƠ THẦN', width / 2, poemTitleY);
    
    ctx.font = '19px "Georgia", serif';
    const poemLines = selectedQue.poem.split('\n');
    let poemY = poemTitleY + 35;
    poemLines.forEach(line => {
      ctx.fillText(line, width / 2, poemY);
      poemY += 28;
    });
    
    ctx.font = 'bold 20px "Times New Roman", Georgia, serif';
    const transTitleY = poemY + 25;
    ctx.fillText('DỊCH NGHĨA', width / 2, transTitleY);
    
    ctx.font = 'italic 18px "Georgia", serif';
    const transLines = selectedQue.translation.split('\n');
    let transY = transTitleY + 35;
    transLines.forEach(line => {
      ctx.fillText(line, width / 2, transY);
      transY += 28;
    });
    
    // 7. Draw General Meaning
    ctx.textAlign = 'left';
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 20px "Times New Roman", Georgia, serif';
    const meaningTitleY = transY + 25;
    ctx.fillText('Ý NGHĨA CHUNG:', 60, meaningTitleY);
    
    ctx.fillStyle = '#0c2b1a';
    ctx.font = '17px "Georgia", serif';
    const meaningY = wrapCanvasText(ctx, selectedQue.meaning, 60, meaningTitleY + 30, width - 120, 24);
    
    // 8. Draw Details (Rendered like grid/text)
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 20px "Times New Roman", Georgia, serif';
    const detailsTitleY = meaningY + 15;
    ctx.fillText('CHI TIẾT LUẬN GIẢI:', 60, detailsTitleY);
    
    ctx.font = '16px "Georgia", serif';
    let detailY = detailsTitleY + 30;
    for (const [key, val] of Object.entries(selectedQue.details)) {
      ctx.fillStyle = '#163f2b';
      ctx.font = 'bold 16px "Georgia", serif';
      ctx.fillText(`• ${key}: `, 70, detailY);
      
      ctx.fillStyle = '#0c2b1a';
      ctx.font = '16px "Georgia", serif';
      detailY = wrapCanvasText(ctx, val, 180, detailY, width - 250, 22);
      detailY += 6;
    }
  }
  
  // 9. Draw Red Stamp Seal
  ctx.save();
  ctx.translate(width - 150, height - 150);
  ctx.rotate(-10 * Math.PI / 180);
  
  // Stamp outer box
  ctx.strokeStyle = '#ff8da1';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 85, 85);
  // Stamp inner thin box
  ctx.lineWidth = 1.5;
  ctx.strokeRect(5, 5, 75, 75);
  
  // Stamp text
  ctx.fillStyle = '#ff8da1';
  ctx.font = 'bold 15px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('LINH QUẺ', 42, 38);
  ctx.fillText('CÁT TƯỜNG', 42, 60);
  ctx.restore();
  
  // 10. Trigger Image Download
  try {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Que_Xam_Que_So_${selectedQue.id}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show premium visual success feedback
    showToast("Đã lưu ảnh quẻ xăm thành công!");
  } catch (err) {
    console.error("Lỗi khi xuất ảnh: ", err);
    alert("Không thể lưu ảnh tự động. Xin hãy thử lại trên trình duyệt khác hoặc chụp ảnh màn hình.");
  }
}

// Show a beautiful temporary toast message
function showToast(message) {
  // Remove existing toast if any
  const oldToast = document.querySelector('.toast-message');
  if (oldToast) {
    document.body.removeChild(oldToast);
  }

  const toast = document.createElement('div');
  toast.className = `toast-message`;
  toast.innerHTML = `
    <span class="toast-icon">✨</span>
    <span class="toast-text">${message}</span>
  `;
  document.body.appendChild(toast);
  
  // Slide up and fade in
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Slide down and fade out
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 400);
  }, 3500);
}
