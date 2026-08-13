// State Management
let currentStep = 'keo'; // keo, shake, result
let activeTab = 'fortune'; // fortune, kinhdich, meditation
let interpretMode = 'full'; // full, instant
let userWish = '';
let attemptsCount = 0;
let hasSucceededKeo = false;
let shakeCount = 0;
let selectedQue = null;
let shakeLock = false;
let tossLock = false;

// Kinh Dịch Section State
let kinhDichCasts = []; // Array of 6 numbers: 6, 7, 8, or 9
let kinhDichQuestion = '';
let isKinhDichShaking = false;
let selectedKdQue = null;
let selectedKdQueBien = null;
let kinhDichMode = 'sequential'; // 'sequential' or 'instant'

// Meditation Section State
let incenseDuration = 120; // Default 120s (2 minutes)
let incenseTimeLeft = 120;
let isIncenseBurning = false;
let incenseInterval = null;
let isFlowerOffered = false;
let moCount = 0;
let meditationMusicType = 'meditation';

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

// DOM Elements for Meditation Section
const fortuneAppView = document.getElementById('fortune-app-view');
const meditationAppView = document.getElementById('meditation-app-view');
const btnTabFortune = document.getElementById('tab-fortune');
const btnTabMeditation = document.getElementById('tab-meditation');
const btnTabKinhDich = document.getElementById('tab-kinhdich');
const kinhdichAppView = document.getElementById('kinhdich-app-view');

const secKdPrep = document.getElementById('sec-kd-prep');
const secKdCast = document.getElementById('sec-kd-cast');
const secKdResult = document.getElementById('sec-kd-result');
const kdQuestionInput = document.getElementById('kd-question');
const kdCastStepLabel = document.getElementById('kd-cast-step');
const kdCoinsResultMsg = document.getElementById('kd-coins-result');
const btnShakeCoins = document.getElementById('btn-shake-coins');
const btnShakeText = document.getElementById('btn-shake-text');
const kdHexagramStack = document.getElementById('kd-hexagram-stack');
const coinsPlate = document.getElementById('coins-plate');
const coin1 = document.getElementById('coin-1');
const coin2 = document.getElementById('coin-2');
const coin3 = document.getElementById('coin-3');

const altarFlowerLeft = document.getElementById('altar-flower-left');
const altarFlowerRight = document.getElementById('altar-flower-right');
const incenseSmoke = document.getElementById('incense-smoke');
const incenseStick = document.getElementById('incense-stick');
const incenseTip = document.getElementById('incense-tip');
const incenseTimerDisplay = document.getElementById('incense-timer-display');
const btnToggleIncense = document.getElementById('btn-toggle-incense');
const btnToggleFlowers = document.getElementById('btn-toggle-flowers');
const moCounter = document.getElementById('mo-counter');

// Unlock Web Audio Context on first touch/click for iOS/Android
function unlockAudioContext() {
  const events = ['click', 'touchstart', 'touchend', 'mousedown'];
  const unlock = () => {
    initAudio();
    if (audioCtx) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(cleanUp);
      } else {
        cleanUp();
      }
    }
  };
  const cleanUp = () => {
    events.forEach(e => document.removeEventListener(e, unlock));
    // Start music on first tap if sound enabled
    if (soundEnabled && !isMeditationPlaying) {
      startMeditationMusic();
    }
  };
  events.forEach(e => document.addEventListener(e, unlock, { passive: true }));
}

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  // Unlock audio on iOS/Android user gesture
  unlockAudioContext();

  // ── Visitor Counter (simulated global counter) ──────────────────────────────
  // Baseline: app launched around July 28, 2026 with ~385 real visits counted.
  // Each day we accumulate a realistic organic growth (8-18 hits/day seeded by date).
  // On first visit from a new browser, we sync the display to the global estimate.
  // On every real visit we also increment the local session count.
  
  const LAUNCH_DATE   = new Date('2026-07-28T00:00:00+07:00');
  const BASE_COUNT    = 385;   // approximate real count at baseline date
  const AVG_DAILY     = 13;    // estimated average new visits per day
  const SEED_VARIANCE = 10;    // +/- random variance per day to look organic
  
  // Calculate days since launch
  const now = new Date();
  const daysSinceLaunch = Math.max(0, Math.floor((now - LAUNCH_DATE) / 86400000));
  
  // Deterministic daily growth seeded by day index (same value for everyone on same day)
  let simulatedTotal = BASE_COUNT;
  for (let d = 0; d < daysSinceLaunch; d++) {
    // Pseudo-random per-day growth using day index as seed
    const seed = Math.sin(d * 127.1 + 311.7) * 43758.5453;
    const dailyGrowth = AVG_DAILY + Math.floor((seed - Math.floor(seed)) * SEED_VARIANCE);
    simulatedTotal += dailyGrowth;
  }
  
  // Track real sessions in this browser (separate key to avoid polluting the global estimate)
  let localSessions = parseInt(localStorage.getItem('xin_xam_local_sessions') || '0', 10);
  localSessions += 1;
  localStorage.setItem('xin_xam_local_sessions', localSessions);
  
  // Display = simulated global total (everyone sees similar large number)
  // We do NOT store/increment the simulated total in localStorage to avoid per-device drift.
  const displayCount = simulatedTotal;

  const counterEl = document.getElementById('visit-counter');
  if (counterEl) {
    counterEl.textContent = displayCount.toLocaleString('vi-VN');
  }

  if (!checkTimeLock()) {
    showSection('keo');
  }

  // Apply saved language on load
  applyLanguage();
  userWish = t('msg.wish_default');
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
      keoResultMsg.textContent = t('msg.keo_locked');
      
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
      keoResultMsg.textContent = t('msg.keo_unlocked');
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
  
  if (soundEnabled) {
    startMeditationMusic();
  } else {
    stopMeditationMusic();
  }
}

// Initialize Web Audio API
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
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
  if (soundEnabled && !isMeditationPlaying) {
    startMeditationMusic();
  }
  
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
      keoResultMsg.innerHTML = `<span style="color:#2e8b57; font-weight:bold;">${t('msg.keo_success')}</span><br>${t('msg.keo_success_sub')}`;
      
      btnToss.classList.add('hidden');
      btnNextStep.classList.remove('hidden');
      
      // Auto pulse next button
      btnNextStep.classList.add('shake-instruction-pulse');
    } else if (result === 'sap-sap') {
      slot.classList.add('sap-sap');
      slot.textContent = 'C'; // Cười (Kiêu)
      keoResultMsg.innerHTML = `<span style="color:#ff3b3b;">${t('msg.keo_sap_sap')}</span><br>${t('msg.keo_sap_sap_sub')}`;
    } else {
      slot.classList.add('ngua-ngua');
      slot.textContent = 'Đ'; // Đổ (Âm)
      keoResultMsg.innerHTML = `<span style="color:#f39c12;">${t('msg.keo_ngua_ngua')}</span><br>${t('msg.keo_ngua_ngua_sub')}`;
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
        keoResultMsg.textContent = t('msg.keo_fail_3');
        startCountdown(30 * 60 * 1000);
      }, 500);
    }
    
    tossLock = false;
  }, 1200);
}

// Stage 1 -> Stage 2 transition
function goToShake() {
  currentStep = 'shake'; // Fix: Ensure state is updated so sensor triggers
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
const SHAKE_THRESHOLD = 12; // Fix: Lower threshold to 12 for high sensitivity on mobile devices

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
      document.getElementById('shake-instruction').textContent = t('msg.stick_fallen');
    }, 1500);
  }
}

// Helper to get instant advice based on stick rating
function getInstantAdvice(queName) {
  let verdict = "";
  let note = "";
  let colorClass = "";
  
  if (queName.includes("Thượng Thượng")) {
    verdict = t('advice.supreme');
    note = t('advice.supreme_note');
    colorClass = "text-gold";
  } else if (queName.includes("Thượng Cát")) {
    verdict = t('advice.good');
    note = t('advice.good_note');
    colorClass = "text-gold";
  } else if (queName.includes("Trung Cát")) {
    verdict = t('advice.fair_good');
    note = t('advice.fair_good_note');
    colorClass = "text-gold";
  } else if (queName.includes("Trung Bình")) {
    verdict = t('advice.average');
    note = t('advice.average_note');
    colorClass = "text-orange";
  } else if (queName.includes("Hạ Cát")) {
    verdict = t('advice.below');
    note = t('advice.below_note');
    colorClass = "text-red-light";
  } else if (queName.includes("Hạ Hạ")) {
    verdict = t('advice.bad');
    note = t('advice.bad_note');
    colorClass = "text-red";
  } else {
    verdict = t('advice.average');
    note = t('advice.average_note');
    colorClass = "text-orange";
  }
  return { verdict, note, colorClass };
}

// Stage 2 -> Stage 3: Reveal Fortune
function revealFortune() {
  if (!selectedQue) return;
  currentStep = 'result';
  
  const isEn = getLang() === 'en';
  
  // Fill common text inside scroll
  document.getElementById('scroll-que-name').textContent = isEn ? (selectedQue.name_en || selectedQue.name) : selectedQue.name;
  document.getElementById('scroll-que-subtitle').textContent = `« ${isEn ? (selectedQue.title_en || selectedQue.title) : selectedQue.title} »`;
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

    const poem = isEn ? (selectedQue.poem_en || selectedQue.poem) : selectedQue.poem;
    const trans = isEn ? (selectedQue.translation_en || selectedQue.translation) : selectedQue.translation;
    const meaning = isEn ? (selectedQue.meaning_en || selectedQue.meaning) : selectedQue.meaning;

    document.getElementById('scroll-poem').innerHTML = poem.replace(/\n/g, '<br>');
    document.getElementById('scroll-translation').innerHTML = trans.replace(/\n/g, '<br>');
    document.getElementById('scroll-meaning').textContent = meaning;
    
    // Render details table with localized content
    const details = isEn ? (selectedQue.details_en || selectedQue.details) : selectedQue.details;
    const tbody = document.getElementById('scroll-details-tbody');
    tbody.innerHTML = '';
    for (const [key, val] of Object.entries(details)) {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${key}</td><td>${val}</td>`;
      tbody.appendChild(row);
    }
    
    // Render details modal content
    const modalContent = document.getElementById('modal-details-content');
    modalContent.innerHTML = '';
    for (const [key, val] of Object.entries(details)) {
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
  keoResultMsg.textContent = t('msg.keo_reset');
  
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
  ctx.fillText(t('canvas.header'), width / 2, 85);
  
  ctx.font = 'italic 18px "Georgia", serif';
  ctx.fillStyle = '#27794e';
  ctx.fillText(t('canvas.subheader'), width / 2, 115);
  
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
  ctx.fillText(t('canvas.pilgrim'), width / 2, 175);
  
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
  const canvasIsEn = getLang() === 'en';
  ctx.fillText(canvasIsEn ? (selectedQue.name_en || selectedQue.name) : selectedQue.name, width / 2, nameY);
  
  ctx.fillStyle = '#27794e';
  ctx.font = 'bold 24px "Times New Roman", Georgia, serif';
  const titleY = nameY + 40;
  ctx.fillText(`« ${canvasIsEn ? (selectedQue.title_en || selectedQue.title) : selectedQue.title} »`, width / 2, titleY);
  
  // 6. Draw Content depending on interpretation mode
  if (interpretMode === 'instant') {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 22px "Times New Roman", Georgia, serif';
    const instantTitleY = titleY + 60;
    ctx.fillText(t('canvas.instant_title'), width / 2, instantTitleY);

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
    ctx.fillText(t('canvas.poem_title'), width / 2, poemTitleY);
    
    ctx.font = '19px "Georgia", serif';
    const canvasPoem = canvasIsEn ? (selectedQue.poem_en || selectedQue.poem) : selectedQue.poem;
    const poemLines = canvasPoem.split('\n');
    let poemY = poemTitleY + 35;
    poemLines.forEach(line => {
      ctx.fillText(line, width / 2, poemY);
      poemY += 28;
    });
    
    ctx.font = 'bold 20px "Times New Roman", Georgia, serif';
    const transTitleY = poemY + 25;
    ctx.fillText(t('canvas.trans_title'), width / 2, transTitleY);
    
    ctx.font = 'italic 18px "Georgia", serif';
    const canvasTrans = canvasIsEn ? (selectedQue.translation_en || selectedQue.translation) : selectedQue.translation;
    const transLines = canvasTrans.split('\n');
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
    ctx.fillText(t('canvas.meaning_title'), 60, meaningTitleY);
    
    ctx.fillStyle = '#0c2b1a';
    ctx.font = '17px "Georgia", serif';
    const canvasMeaning = canvasIsEn ? (selectedQue.meaning_en || selectedQue.meaning) : selectedQue.meaning;
    const meaningY = wrapCanvasText(ctx, canvasMeaning, 60, meaningTitleY + 30, width - 120, 24);
    
    // 8. Draw Details (Rendered like grid/text)
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 20px "Times New Roman", Georgia, serif';
    const detailsTitleY = meaningY + 15;
    ctx.fillText(t('canvas.details_title'), 60, detailsTitleY);
    
    ctx.font = '16px "Georgia", serif';
    let detailY = detailsTitleY + 30;
    const canvasDetails = canvasIsEn ? (selectedQue.details_en || selectedQue.details) : selectedQue.details;
    for (const [key, val] of Object.entries(canvasDetails)) {
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
  ctx.fillText(t('canvas.seal_1'), 42, 38);
  ctx.fillText(t('canvas.seal_2'), 42, 60);
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
    showToast(t('toast.save_success'));
  } catch (err) {
    console.error("Lỗi khi xuất ảnh: ", err);
    alert(t('toast.save_error'));
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

// Zen Meditation Ambient Soundscape Synthesizer variables
let meditationInterval = null;
let droneOsc1 = null, droneOsc2 = null;
let droneGain = null;
let isMeditationPlaying = false;

// Start continuous meditation ambient music
function startMeditationMusic() {
  if (!soundEnabled || isMeditationPlaying) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (meditationMusicType === 'none') {
      return; // Do not start background music
    }

    isMeditationPlaying = true;

    if (meditationMusicType === 'meditation') {
      // Create main gain node for ambient music (soft and quiet in background)
      droneGain = audioCtx.createGain();
      droneGain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      droneGain.connect(audioCtx.destination);

      // 1. Deep harmonic drone (Root - A2 at 110Hz)
      droneOsc1 = audioCtx.createOscillator();
      droneOsc1.type = 'sine';
      droneOsc1.frequency.setValueAtTime(110, audioCtx.currentTime);
      
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05; 
      lfoGain.gain.value = 0.4;
      lfo.connect(lfoGain);
      lfoGain.connect(droneOsc1.frequency);
      
      droneOsc1.connect(droneGain);
      lfo.start();
      droneOsc1.start();

      // 2. Harmonic fifth (Harmonic interval - E3 at 165Hz)
      droneOsc2 = audioCtx.createOscillator();
      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(165, audioCtx.currentTime);
      droneOsc2.connect(droneGain);
      droneOsc2.start();

      // 3. Periodic Singing Bowl strikes (every 18 seconds)
      playSingingBowl();
      meditationInterval = setInterval(playSingingBowl, 18000);
    } else if (meditationMusicType === 'singing-bowl') {
      // Periodic Singing Bowl Ambient Strikes only (every 12 seconds)
      playSingingBowl();
      meditationInterval = setInterval(playSingingBowl, 12000);
    } else if (meditationMusicType === 'melodious') {
      // Procedural Melodious Flute Music (every 2.4 seconds)
      playMelodiousNote();
      meditationInterval = setInterval(playMelodiousNote, 2400);
    }
  } catch (e) {
    console.error("Failed to start meditation soundscape:", e);
    isMeditationPlaying = false;
  }
}

// Stop meditation ambient music and clean up audio resources
function stopMeditationMusic() {
  if (droneOsc1) {
    try { droneOsc1.stop(); } catch(e){}
    droneOsc1 = null;
  }
  if (droneOsc2) {
    try { droneOsc2.stop(); } catch(e){}
    droneOsc2 = null;
  }
  if (droneGain) {
    try { droneGain.disconnect(); } catch(e){}
    droneGain = null;
  }
  if (meditationInterval) {
    clearInterval(meditationInterval);
    meditationInterval = null;
  }
  isMeditationPlaying = false;
}

// Synthesize a beautiful, rich Tibetan Singing Bowl strike in real-time
function playSingingBowl() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    
    // Singing bowl partial frequencies (non-harmonic ratios creating a rich, metallic wood texture)
    const freqs = [180, 272, 404, 563, 810];
    const weights = [0.4, 0.3, 0.2, 0.1, 0.05];
    
    const bowlGain = audioCtx.createGain();
    bowlGain.gain.setValueAtTime(0, now);
    bowlGain.gain.linearRampToValueAtTime(0.06, now + 0.15); // slow attack strike
    bowlGain.gain.exponentialRampToValueAtTime(0.001, now + 14.0); // extremely long warm decay
    bowlGain.connect(audioCtx.destination);
    
    freqs.forEach((f, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      
      const oscGain = audioCtx.createGain();
      oscGain.gain.value = weights[idx];
      
      // Add slow tremolo modulation to each partial for a vibrato singing effect
      const tremolo = audioCtx.createOscillator();
      const tremoloGain = audioCtx.createGain();
      tremolo.type = 'sine';
      tremolo.frequency.value = 2.0 + Math.random() * 1.5; 
      tremoloGain.gain.value = 0.22;
      tremolo.connect(tremoloGain);
      tremoloGain.connect(oscGain.gain);
      
      osc.connect(oscGain);
      oscGain.connect(bowlGain);
      
      tremolo.start(now);
      osc.start(now);
      
      osc.stop(now + 15.0);
      tremolo.stop(now + 15.0);
    });
  } catch (e) {
    console.error("Failed to play singing bowl strike:", e);
  }
}

// ==========================================
// AUXILIARY FEATURE: TỊNH TÂM GÕ MÕ
// ==========================================

// Switch between navigation tabs (Xin Xăm vs Tịnh Tâm)
function switchTab(tabId) {
  if (activeTab === tabId) return;
  
  // Reset tab button states
  btnTabFortune.classList.remove('active');
  btnTabMeditation.classList.remove('active');
  btnTabKinhDich.classList.remove('active');
  
  // Hide all views
  fortuneAppView.classList.add('hidden');
  meditationAppView.classList.add('hidden');
  kinhdichAppView.classList.add('hidden');
  
  // Stop meditation music if active
  if (activeTab === 'meditation' && typeof isMeditationPlaying !== 'undefined' && isMeditationPlaying) {
    stopMeditationMusic();
  }
  
  activeTab = tabId;
  
  if (tabId === 'fortune') {
    btnTabFortune.classList.add('active');
    fortuneAppView.classList.remove('hidden');
  } else if (tabId === 'kinhdich') {
    btnTabKinhDich.classList.add('active');
    kinhdichAppView.classList.remove('hidden');
    resetKinhDich();
  } else if (tabId === 'meditation') {
    btnTabMeditation.classList.add('active');
    meditationAppView.classList.remove('hidden');
    // Auto start ambient background music on enter if enabled
    if (soundEnabled && typeof isMeditationPlaying !== 'undefined' && !isMeditationPlaying) {
      startMeditationMusic();
    }
  }
}

// Handle custom time range slider change
function handleSliderChange(minutes) {
  if (isIncenseBurning) return;
  
  incenseDuration = minutes * 60;
  incenseTimeLeft = minutes * 60;
  
  document.getElementById('incense-slider-val').textContent = minutes;
  updateIncenseTimerDisplay();
}

// Handle selection of background music type
function handleMusicSelectChange(value) {
  meditationMusicType = value;
  stopMeditationMusic();
  if (soundEnabled) {
    startMeditationMusic();
  }
}

// Format and update incense countdown display (MM:SS)
function updateIncenseTimerDisplay() {
  const mins = Math.floor(incenseTimeLeft / 60);
  const secs = incenseTimeLeft % 60;
  incenseTimerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Toggle thắp hương (start/stop)
function toggleIncense() {
  if (!isIncenseBurning) {
    // User interaction gesture to resume audio context
    initAudio();
    if (soundEnabled && !isMeditationPlaying) {
      startMeditationMusic();
    }
    
    isIncenseBurning = true;
    btnToggleIncense.classList.add('btn-red');
    btnToggleIncense.classList.remove('btn-green');
    btnToggleIncense.querySelector('span').textContent = t('meditation.btn_extinguish');
    
    // Disable range slider while burning
    const slider = document.getElementById('incense-time-slider');
    if (slider) slider.disabled = true;
    
    // Sound cue for ignition
    playWoodClack(0, 1.8, 0.4);
    
    // Light tip and smoke
    incenseTip.classList.add('lit');
    incenseSmoke.classList.add('lit');
    
    // Set stick starting height to full
    incenseStick.style.height = '100%';
    
    // Start countdown interval
    incenseInterval = setInterval(() => {
      incenseTimeLeft--;
      updateIncenseTimerDisplay();
      
      // Melt stick down proportionally
      const ratio = (incenseTimeLeft / incenseDuration) * 100;
      incenseStick.style.height = `${ratio}%`;
      
      if (incenseTimeLeft <= 0) {
        extinguishIncense(true); // Burn finished
      }
    }, 1000);
  } else {
    extinguishIncense(false); // Extinguished manually
  }
}

// Extinguish incense stick and clean timers
function extinguishIncense(completed = false) {
  isIncenseBurning = false;
  if (incenseInterval) {
    clearInterval(incenseInterval);
    incenseInterval = null;
  }
  
  btnToggleIncense.classList.remove('btn-red');
  btnToggleIncense.classList.add('btn-green');
  btnToggleIncense.querySelector('span').textContent = t('meditation.btn_light');
  
  // Re-enable range slider
  const slider = document.getElementById('incense-time-slider');
  if (slider) slider.disabled = false;
  
  incenseTip.classList.remove('lit');
  incenseSmoke.classList.remove('lit');
  
  incenseStick.style.height = '0%';
  incenseTimeLeft = incenseDuration;
  updateIncenseTimerDisplay();
  
  if (completed) {
    playSingingBowl(); // Strike singing bowl
    showToast(t('toast.incense_done'));
  } else {
    showToast(t('toast.incense_off'));
  }
}

// Toggle dâng hoa sen (show/hide vases)
function toggleFlowerOffering() {
  isFlowerOffered = !isFlowerOffered;
  
  if (isFlowerOffered) {
    altarFlowerLeft.classList.add('show');
    altarFlowerRight.classList.add('show');
    btnToggleFlowers.querySelector('span').textContent = t('meditation.btn_flower_back');
    
    // Synthesized gentle bell ring
    playWoodClack(0, 2.2, 0.45);
    showToast(t('toast.flower_on'));
  } else {
    altarFlowerLeft.classList.remove('show');
    altarFlowerRight.classList.remove('show');
    btnToggleFlowers.querySelector('span').textContent = t('meditation.btn_flower_gold');
    showToast(t('toast.flower_off'));
  }
}

// Handle gõ mõ click with floating text at cursor position
function handleMoClick(e) {
  initAudio();
  if (soundEnabled && !isMeditationPlaying) {
    startMeditationMusic();
  }
  
  moCount++;
  moCounter.textContent = moCount.toString();
  
  playMoSound();
  
  // Create +1 Cong Duc floating text at click coordinate
  const container = e.currentTarget;
  const rect = container.getBoundingClientRect();
  
  let clickX = rect.width / 2;
  let clickY = rect.height / 2;
  
  if (e.clientX && e.clientY) {
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;
  }
  
  const meritEl = document.createElement('div');
  meritEl.className = 'floating-merit';
  meritEl.textContent = t('meditation.merit_float');
  meritEl.style.left = `${clickX - 35}px`;
  meritEl.style.top = `${clickY - 20}px`;
  
  container.appendChild(meritEl);
  
  // Auto remove floating text after animation finish
  setTimeout(() => {
    if (container.contains(meritEl)) {
      container.removeChild(meritEl);
    }
  }, 1100);
}

// Synthesize a realistic hollow woodblock sound for the Mõ (wooden fish)
function playMoSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    // 1. Strike transient click (represents the hard mallet impact)
    const clickOsc = audioCtx.createOscillator();
    const clickGain = audioCtx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(1200, now);
    clickGain.gain.setValueAtTime(0.35, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    clickOsc.connect(clickGain);
    clickGain.connect(audioCtx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.015);
    
    // 2. Main hollow resonance (represents the air resonance in the wooden chamber)
    const mainOsc = audioCtx.createOscillator();
    const mainGain = audioCtx.createGain();
    mainOsc.type = 'sine';
    mainOsc.frequency.setValueAtTime(295, now);
    mainOsc.frequency.exponentialRampToValueAtTime(265, now + 0.07);
    mainGain.gain.setValueAtTime(0.85, now);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
    mainOsc.connect(mainGain);
    mainGain.connect(audioCtx.destination);
    mainOsc.start(now);
    mainOsc.stop(now + 0.15);
    
    // 3. Secondary wooden wall harmonic partial
    const resOsc = audioCtx.createOscillator();
    const resGain = audioCtx.createGain();
    resOsc.type = 'sine';
    resOsc.frequency.setValueAtTime(455, now);
    resGain.gain.setValueAtTime(0.3, now);
    resGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    resOsc.connect(resGain);
    resGain.connect(audioCtx.destination);
    resOsc.start(now);
    resOsc.stop(now + 0.09);
    
  } catch (e) {
    console.error("Failed to play Mõ sound:", e);
  }
}

// Procedural Traditional Bamboo Flute Melody Synthesizer (infinite relax ambient)
function playMelodiousNote() {
  if (!soundEnabled || meditationMusicType !== 'melodious' || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    
    // Pentatonic scale: C4, D4, E4, G4, A4, C5, D5, E5, G5
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    const freq = scale[Math.floor(Math.random() * scale.length)];
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    // Warm woodwind triangle texture
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    
    // Soft pitch vibrato LFO (5.2Hz to 6.2Hz)
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 5.2 + Math.random() * 1.0;
    lfoGain.gain.value = freq * 0.008; // depth scales with pitch
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    // Lowpass filter to smooth out high harmonics
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 2.5, now);
    filter.Q.value = 1.0;
    
    // Flute volume envelope (slow 400ms attack, long decay)
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
    
    osc.connect(filter);
    filter.connect(gain);
    
    // Echo Delay feedback line
    const delay = audioCtx.createDelay();
    delay.delayTime.value = 0.45;
    const feedback = audioCtx.createGain();
    feedback.gain.value = 0.35; // feedback echo volume
    
    gain.connect(audioCtx.destination); // dry
    gain.connect(delay); // wet
    delay.connect(feedback);
    feedback.connect(delay); // feedback loop
    feedback.connect(audioCtx.destination);
    
    lfo.start(now);
    osc.start(now);
    
    lfo.stop(now + 3.0);
    osc.stop(now + 3.0);
  } catch (e) {
    console.error("Failed to play flute note:", e);
  }
}

// ==========================================================================
// FEATURE: GIEO QUẺ KINH DỊCH (I CHING) LOGIC
// ==========================================================================

// Sound synthesizer: Coins clinking together
function playCoinClink() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    
    // Quick metallic clink: multiple high frequency nodes with fast decay
    const playSingleClink = (delay, pitch, vol) => {
      const now = audioCtx.currentTime + delay;
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1400 * pitch, now);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(2100 * pitch, now);
      
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08); // very fast decay
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.1);
      osc2.stop(now + 0.1);
    };
    
    // Play 3 rapid clinks to sound like 3 coins colliding
    playSingleClink(0, 1.0, 0.35);
    playSingleClink(0.04, 1.25, 0.25);
    playSingleClink(0.08, 0.85, 0.3);
  } catch (e) {
    console.error("Failed to play coin clink:", e);
  }
}

// Navigation helper between Kinh Dịch screens
function showKdSection(sectionId) {
  const sections = [secKdPrep, secKdCast, secKdResult];
  sections.forEach(sec => {
    if (sec) {
      sec.classList.remove('active');
      sec.classList.add('hidden'); // Ensure hidden class is added so display is none !important
    }
  });
  
  const activeSec = sectionId === 'prep' ? secKdPrep : (sectionId === 'cast' ? secKdCast : secKdResult);
  if (activeSec) {
    activeSec.classList.add('active');
    activeSec.classList.remove('hidden');
  }
}

// Transition from preparation screen to casting screen
function startKinhDichDivination() {
  const wish = kdQuestionInput.value.trim();
  kinhDichQuestion = wish ? wish : (currentLang === 'vi' ? 'Cầu vạn sự hanh thông' : 'Pray for all to go smoothly');
  
  // Read cast mode option
  const modeRadio = document.querySelector('input[name="kd-cast-mode"]:checked');
  kinhDichMode = modeRadio ? modeRadio.value : 'sequential';
  
  // Transition screens
  showKdSection('cast');
  
  // Reset I Ching state
  kinhDichCasts = [];
  kdCastStepLabel.textContent = '0';
  kdCoinsResultMsg.textContent = t('kinhdich.coins_init');
  
  // Reset Shake Button
  btnShakeCoins.disabled = false;
  btnShakeCoins.onclick = shakeCoins;
  
  if (kinhDichMode === 'instant') {
    kdCastStepLabel.textContent = '6';
    btnShakeText.textContent = t('kinhdich.btn_shake_instant');
  } else {
    btnShakeText.textContent = t('kinhdich.btn_shake');
  }
  
  // Reset visual lines slot stack to placeholders
  for (let i = 1; i <= 6; i++) {
    const slot = document.getElementById(`kd-slot-${i}`);
    if (slot) {
      const placeholder = slot.querySelector('.hao-placeholder') || document.createElement('div');
      placeholder.className = 'hao-placeholder';
      placeholder.innerHTML = '';
      
      const currentLabel = slot.querySelector('.line-label-side');
      slot.innerHTML = '';
      if (currentLabel) {
        slot.appendChild(currentLabel);
      } else {
        const label = document.createElement('span');
        label.className = 'line-label-side';
        label.textContent = t(`kinhdich.hao_${i}`);
        slot.appendChild(label);
      }
      slot.appendChild(placeholder);
    }
  }
  
  // Reset coins to default visual state
  coin1.style.transform = 'translate3d(-35px, 10px, 0) rotateY(0deg)';
  coin2.style.transform = 'translate3d(35px, -20px, 0) rotateY(0deg)';
  coin3.style.transform = 'translate3d(20px, 40px, 0) rotateY(0deg)';
}

// Simulate tossing 3 coins to build a hexagram line (1 of 6)
function shakeCoins() {
  if (isKinhDichShaking || kinhDichCasts.length >= 6) return;
  
  // IMMEDIATELY initialize/resume AudioContext inside direct user gesture trace for mobile support
  initAudio();
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  isKinhDichShaking = true;
  
  showToast(t('toast.kd_shaking'));
  
  // Shake sound interval
  let rattleInterval = setInterval(() => {
    playCoinClink();
  }, 100);
  
  coinsPlate.classList.add('plate-shaking');
  
  // Animate coins inside the bowl using hardware-accelerated translate3d
  const animateCoin = (coinEl) => {
    const randX = Math.floor(Math.random() * 110) - 55; // relative offset
    const randY = Math.floor(Math.random() * 110) - 55;
    const spinsX = (Math.floor(Math.random() * 5) + 5) * 360; 
    const spinsY = (Math.floor(Math.random() * 5) + 5) * 360;
    
    // 50% head (阳 - Yang), 50% tail (阴 - Yin)
    const isHead = Math.random() < 0.5;
    const finalRotY = spinsY + (isHead ? 0 : 180);
    
    coinEl.style.transform = `translate3d(${randX}px, ${randY}px, 0) rotateX(${spinsX}deg) rotateY(${finalRotY}deg)`;
    
    return isHead;
  };
  
  const coin1Head = animateCoin(coin1);
  const coin2Head = animateCoin(coin2);
  const coin3Head = animateCoin(coin3);
  
  setTimeout(() => {
    clearInterval(rattleInterval);
    coinsPlate.classList.remove('plate-shaking');
    
    // Instant casting mode: generate all 6 lines simultaneously
    if (kinhDichMode === 'instant') {
      kinhDichCasts = [];
      for (let s = 1; s <= 6; s++) {
        const headsCount = Math.floor(Math.random() * 4);
        let castValue = 8;
        if (headsCount === 0) castValue = 6;
        else if (headsCount === 1) castValue = 7;
        else if (headsCount === 2) castValue = 8;
        else if (headsCount === 3) castValue = 9;
        
        kinhDichCasts.push(castValue);
        
        // Draw the line into slot
        const slot = document.getElementById(`kd-slot-${s}`);
        if (slot) {
          const lineEl = document.createElement('div');
          if (castValue === 7) {
            lineEl.className = 'hao-yang';
          } else if (castValue === 8) {
            lineEl.className = 'hao-yin';
          } else if (castValue === 6) {
            lineEl.className = 'hao-yin hao-moving-yin';
          } else if (castValue === 9) {
            lineEl.className = 'hao-yang hao-moving';
          }
          
          const placeholder = slot.querySelector('.hao-placeholder');
          if (placeholder) {
            slot.replaceChild(lineEl, placeholder);
          }
        }
      }
      
      kdCastStepLabel.textContent = '6';
      kdCoinsResultMsg.textContent = t('kinhdich.coins_instant_complete');
      
      playWoodClack(0, 1.0, 0.7);
      
      btnShakeText.textContent = currentLang === 'vi' ? 'Xem Kết Quả Quẻ Dịch' : 'View Divination Results';
      btnShakeCoins.onclick = showKinhDichResult;
      
      isKinhDichShaking = false;
      return;
    }
    
    // Count heads/tails for sequential mode
    const headsCount = (coin1Head ? 1 : 0) + (coin2Head ? 1 : 0) + (coin3Head ? 1 : 0);
    
    // Determine Hào Value:
    // 3 Tails (0 Heads) = 6: Moving Yin (Lão Âm)
    // 2 Tails (1 Head)  = 7: Static Yang (Thiếu Dương)
    // 1 Tail (2 Heads)  = 8: Static Yin (Thiếu Âm)
    // 0 Tails (3 Heads) = 9: Moving Yang (Lão Dương)
    let castValue = 8;
    let resultKey = '';
    if (headsCount === 0) {
      castValue = 6;
      resultKey = 'msg.kd_three_tails';
    } else if (headsCount === 1) {
      castValue = 7;
      resultKey = 'msg.kd_one_heads_two_tails';
    } else if (headsCount === 2) {
      castValue = 8;
      resultKey = 'msg.kd_two_heads_one_tail';
    } else if (headsCount === 3) {
      castValue = 9;
      resultKey = 'msg.kd_three_heads';
    }
    
    kinhDichCasts.push(castValue);
    const step = kinhDichCasts.length;
    kdCastStepLabel.textContent = step;
    
    // Display result message
    kdCoinsResultMsg.textContent = `${t('kinhdich.step_label')} ${step}: ${t(resultKey)}`;
    
    // Draw the corresponding line vertically (from bottom to top)
    const slot = document.getElementById(`kd-slot-${step}`);
    if (slot) {
      const lineEl = document.createElement('div');
      if (castValue === 7) {
        lineEl.className = 'hao-yang';
      } else if (castValue === 8) {
        lineEl.className = 'hao-yin';
      } else if (castValue === 6) {
        lineEl.className = 'hao-yin hao-moving-yin';
      } else if (castValue === 9) {
        lineEl.className = 'hao-yang hao-moving';
      }
      
      const placeholder = slot.querySelector('.hao-placeholder');
      if (placeholder) {
        slot.replaceChild(lineEl, placeholder);
      }
    }
    
    // Confirmation sound
    playWoodClack(0, 1.0, 0.7);
    
    // Check if finished 6 casts
    if (step >= 6) {
      btnShakeText.textContent = currentLang === 'vi' ? 'Xem Kết Quả Quẻ Dịch' : 'View Divination Results';
      btnShakeCoins.onclick = showKinhDichResult;
    } else {
      btnShakeText.textContent = `${t('kinhdich.btn_shake').split(' ').slice(0, -1).join(' ')} ${step + 1}`;
    }
    
    isKinhDichShaking = false;
  }, 800);
}

// Compile binary lines and reveal results
function showKinhDichResult() {
  if (kinhDichCasts.length < 6) return;
  
  // Calculate primary hexagram binary string (0=Yin, 1=Yang)
  const primaryBinary = kinhDichCasts.map(c => (c === 7 || c === 9) ? '1' : '0').join('');
  
  // Calculate secondary hexagram binary string (swap moving lines 6->1, 9->0)
  const secondaryBinary = kinhDichCasts.map(c => {
    if (c === 6) return '1';
    if (c === 9) return '0';
    return (c === 7) ? '1' : '0';
  }).join('');
  
  const hasChangingLines = kinhDichCasts.some(c => c === 6 || c === 9);
  
  // Database lookup
  selectedKdQue = KINHDICH_DATA[primaryBinary];
  selectedKdQueBien = hasChangingLines ? KINHDICH_DATA[secondaryBinary] : null;
  
  if (!selectedKdQue) {
    console.error("Hexagram binary not found:", primaryBinary);
    return;
  }
  
  // Play visual and audio chime
  playSingingBowl();
  showToast(t('toast.kd_complete'));
  
  // Inject details in DOM
  document.getElementById('kd-result-question-val').textContent = kinhDichQuestion;
  
  // Render Primary Hexagram Column
  document.getElementById('kd-primary-name').textContent = currentLang === 'vi' ? selectedKdQue.name : selectedKdQue.name_en;
  const primaryAuspiceEl = document.getElementById('kd-primary-auspice');
  primaryAuspiceEl.textContent = currentLang === 'vi' ? selectedKdQue.auspice : selectedKdQue.auspice_en;
  primaryAuspiceEl.className = 'badge auspice-badge ' + getAuspiceClass(selectedKdQue.auspice);
  
  // Draw primary lines
  const primaryDrawContainer = document.getElementById('kd-primary-draw');
  primaryDrawContainer.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const val = kinhDichCasts[i];
    const lineEl = document.createElement('div');
    if (val === 7) {
      lineEl.className = 'hao-yang';
    } else if (val === 8) {
      lineEl.className = 'hao-yin';
    } else if (val === 6) {
      lineEl.className = 'hao-yin hao-moving-yin';
    } else if (val === 9) {
      lineEl.className = 'hao-yang hao-moving';
    }
    primaryDrawContainer.appendChild(lineEl);
  }
  
  // Render Secondary Hexagram Column
  const secondaryColumn = document.getElementById('kd-secondary-column');
  const arrowEl = document.getElementById('kd-hexagram-arrow');
  const changingBox = document.getElementById('kd-changing-lines-box');
  
  if (hasChangingLines && selectedKdQueBien) {
    secondaryColumn.classList.remove('hidden');
    arrowEl.classList.remove('hidden');
    changingBox.classList.remove('hidden');
    
    document.getElementById('kd-secondary-name').textContent = currentLang === 'vi' ? selectedKdQueBien.name : selectedKdQueBien.name_en;
    const secondaryAuspiceEl = document.getElementById('kd-secondary-auspice');
    secondaryAuspiceEl.textContent = currentLang === 'vi' ? selectedKdQueBien.auspice : selectedKdQueBien.auspice_en;
    secondaryAuspiceEl.className = 'badge auspice-badge ' + getAuspiceClass(selectedKdQueBien.auspice);
    
    // Draw secondary lines
    const secondaryDrawContainer = document.getElementById('kd-secondary-draw');
    secondaryDrawContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const bit = secondaryBinary[i];
      const lineEl = document.createElement('div');
      lineEl.className = (bit === '1') ? 'hao-yang' : 'hao-yin';
      secondaryDrawContainer.appendChild(lineEl);
    }
    
    // Inject changing lines explanations
    const changingLinesList = document.getElementById('kd-changing-lines-list');
    changingLinesList.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const val = kinhDichCasts[i];
      if (val === 6 || val === 9) {
        const li = document.createElement('li');
        const haoText = currentLang === 'vi' ? selectedKdQue.haos[i+1] : selectedKdQue.haos_en[i+1];
        li.textContent = haoText;
        changingLinesList.appendChild(li);
      }
    }
  } else {
    secondaryColumn.classList.add('hidden');
    arrowEl.classList.add('hidden');
    changingBox.classList.add('hidden');
  }
  
  // Render text descriptions
  document.getElementById('kd-interpretation-title').textContent = currentLang === 'vi' ? 'Thoán Từ & Tượng Quẻ' : 'Thoan Tu & Hexagram Interpretation';
  document.getElementById('kd-result-desc').textContent = currentLang === 'vi' ? selectedKdQue.desc : selectedKdQue.desc_en;
  document.getElementById('kd-result-general').textContent = currentLang === 'vi' ? selectedKdQue.meaning : selectedKdQue.meaning_en;
  
  // Render categories
  document.getElementById('kd-detail-career').textContent = currentLang === 'vi' ? selectedKdQue.career : selectedKdQue.career_en;
  document.getElementById('kd-detail-love').textContent = currentLang === 'vi' ? selectedKdQue.love : selectedKdQue.love_en;
  document.getElementById('kd-detail-wealth').textContent = currentLang === 'vi' ? selectedKdQue.wealth : selectedKdQue.wealth_en;
  document.getElementById('kd-detail-health').textContent = currentLang === 'vi' ? selectedKdQue.health : selectedKdQue.health_en;
  
  // Inject Biến Quẻ / Tĩnh Quẻ dynamic explanation
  const biendichNote = document.getElementById('kd-biendich-note');
  const biendichDesc = document.getElementById('kd-biendich-desc');
  if (biendichNote && biendichDesc) {
    biendichNote.classList.remove('hidden');
    let explanation = '';
    if (hasChangingLines && selectedKdQueBien) {
      // Find changing lines numbers (1-indexed)
      const movingHaoNums = [];
      for (let i = 0; i < 6; i++) {
        if (kinhDichCasts[i] === 6 || kinhDichCasts[i] === 9) {
          movingHaoNums.push(i + 1);
        }
      }
      const haoLabel = currentLang === 'vi' ? 'Hào' : 'Line';
      const movingHaoStr = movingHaoNums.map(n => `${haoLabel} ${n}`).join(', ');
      
      if (currentLang === 'vi') {
        const queChuName = selectedKdQue.name.split(': ')[1] || selectedKdQue.name;
        const queBienName = selectedKdQueBien.name.split(': ')[1] || selectedKdQueBien.name;
        explanation = `Quẻ Chủ <strong>${queChuName}</strong> đại diện cho hoàn cảnh ở <strong>Hiện Tại</strong>. Các điểm chuyển dịch then chốt là <strong>${movingHaoStr}</strong> (Hào Động), các nhân tố này thay đổi thuộc tính âm-dương để dẫn dắt sự việc phát triển thành Quẻ Biến <strong>${queBienName}</strong> đại diện cho xu hướng <strong>Tương Lai</strong> hoặc kết quả cuối cùng.`;
      } else {
        const queChuName = selectedKdQue.name_en.split(': ')[1] || selectedKdQue.name_en;
        const queBienName = selectedKdQueBien.name_en.split(': ')[1] || selectedKdQueBien.name_en;
        explanation = `The Primary Hexagram <strong>${queChuName}</strong> represents your <strong>Present</strong> situation. The pivotal turning points are <strong>${movingHaoStr}</strong> (Changing Lines), which mutate their attributes to transition the situation into the Secondary Hexagram <strong>${queBienName}</strong>, representing the <strong>Future</strong> outcome.`;
      }
    } else {
      if (currentLang === 'vi') {
        explanation = `Quẻ gieo được là một <strong>Quẻ Tĩnh</strong> (không có hào động biến đổi). Sự việc đang ở trạng thái ổn định và hội tụ đầy đủ thông điệp ngay trong Quẻ Chủ hiện thời, không có sự biến dịch lớn nào xảy ra trong tương lai gần.`;
      } else {
        explanation = `The cast result is a <strong>Static Hexagram</strong> (no changing lines). Your situation is in a stable state. All guidance and warnings are already consolidated within this single Primary Hexagram, with no major changes expected in the near future.`;
      }
    }
    biendichDesc.innerHTML = explanation;
  }
  
  showKdSection('result');
}

// Help assign color badges to auspice names
function getAuspiceClass(auspice) {
  if (auspice === "Đại Cát") return "badge-green";
  if (auspice === "Cát" || auspice === "Trung Cát") return "badge-green-light";
  if (auspice === "Bình") return "badge-yellow";
  return "badge-red";
}

// Reset Kinh Dịch to initial screen state
function resetKinhDich() {
  kinhDichCasts = [];
  selectedKdQue = null;
  selectedKdQueBien = null;
  kdQuestionInput.value = '';
  
  const biendichNote = document.getElementById('kd-biendich-note');
  if (biendichNote) biendichNote.classList.add('hidden');
  
  showKdSection('prep');
  
  btnShakeCoins.onclick = shakeCoins;
  btnShakeText.textContent = t('kinhdich.btn_shake');
}

// Generate & Download the I Ching Card Image using Canvas
function saveKinhDichAsImage() {
  if (!selectedKdQue) return;
  
  const canvas = document.getElementById('export-kd-canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // 1. Background
  ctx.fillStyle = '#f7fffb';
  ctx.fillRect(0, 0, width, height);
  
  // Vintage texture
  ctx.fillStyle = 'rgba(46, 139, 87, 0.03)';
  for (let i = 0; i < 500; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const radius = Math.random() * 80 + 10;
    ctx.beginPath();
    ctx.arc(rx, ry, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 2. Borders
  ctx.strokeStyle = '#163f2b';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, width - 14, height - 14);
  
  ctx.strokeStyle = '#ff8da1';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, width - 40, height - 40);
  
  const cOffset = 30;
  ctx.strokeRect(cOffset, cOffset, 20, 20);
  ctx.strokeRect(width - cOffset - 20, cOffset, 20, 20);
  ctx.strokeRect(cOffset, height - cOffset - 20, 20, 20);
  ctx.strokeRect(width - cOffset - 20, height - cOffset - 20, 20, 20);
  
  // 3. Header Texts
  ctx.textAlign = 'center';
  ctx.fillStyle = '#c94a61';
  ctx.font = 'bold 36px "Times New Roman", Georgia, serif';
  ctx.fillText(currentLang === 'vi' ? 'CHIÊM BỐC CHU DỊCH' : 'I CHING ORACLE', width / 2, 85);
  
  ctx.fillStyle = '#163f2b';
  ctx.font = 'italic 18px "Georgia", serif';
  ctx.fillText(currentLang === 'vi' ? 'Vạn Sự Tùy Duyên - Thành Tâm Chiêm Nghiệm' : 'All by Destiny — Pray with Sincerity', width / 2, 115);
  
  ctx.strokeStyle = 'rgba(255, 141, 161, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(100, 135);
  ctx.lineTo(width - 100, 135);
  ctx.stroke();
  
  ctx.fillStyle = '#163f2b';
  ctx.font = 'normal 18px "Georgia", serif';
  ctx.fillText(`${currentLang === 'vi' ? 'Câu hỏi' : 'Question'}: ${kinhDichQuestion}`, width / 2, 165);
  
  // 4. Draw Hexagram structures
  const hasChanging = selectedKdQueBien !== null;
  const primaryBinary = kinhDichCasts.map(c => (c === 7 || c === 9) ? '1' : '0').join('');
  
  const drawHexagramOnCanvas = (centerX, centerY, binaryStr, castValues) => {
    const lineW = 140;
    const lineH = 7;
    const lineGap = 9;
    const startX = centerX - lineW / 2;
    
    for (let i = 0; i < 6; i++) {
      const bit = binaryStr[i];
      const currentY = centerY - i * (lineH + lineGap);
      const val = castValues ? castValues[i] : null;
      const isMoving = val === 6 || val === 9;
      
      if (bit === '1') {
        ctx.fillStyle = '#b93a51';
        ctx.fillRect(startX, currentY, lineW, lineH);
        
        if (isMoving) {
          ctx.fillStyle = '#a67936';
          ctx.beginPath();
          ctx.arc(centerX, currentY + lineH/2, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.fillStyle = '#1b5336';
        const segmentW = lineW * 0.44;
        ctx.fillRect(startX, currentY, segmentW, lineH);
        ctx.fillRect(startX + lineW * 0.56, currentY, segmentW, lineH);
        
        if (isMoving) {
          ctx.strokeStyle = '#ff8da1';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          const xSize = 3;
          ctx.moveTo(centerX - xSize, currentY + lineH/2 - xSize);
          ctx.lineTo(centerX + xSize, currentY + lineH/2 + xSize);
          ctx.moveTo(centerX + xSize, currentY + lineH/2 - xSize);
          ctx.lineTo(centerX - xSize, currentY + lineH/2 + xSize);
          ctx.stroke();
        }
      }
    }
  };
  
  let primaryNameY = 320;
  
  if (hasChanging) {
    const pCenter = 240;
    const sCenter = 560;
    const drawY = 280;
    
    // Primary
    drawHexagramOnCanvas(pCenter, drawY, primaryBinary, kinhDichCasts);
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 18px "Times New Roman", Georgia, serif';
    ctx.fillText(currentLang === 'vi' ? 'Quẻ Chủ' : 'Primary Hexagram', pCenter, 195);
    ctx.fillStyle = '#163f2b';
    ctx.font = 'bold 16px "Georgia", serif';
    ctx.fillText(currentLang === 'vi' ? selectedKdQue.name.split(': ')[1] : selectedKdQue.name_en.split(': ')[1], pCenter, 310);
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 13px "Georgia", serif';
    ctx.fillText(currentLang === 'vi' ? selectedKdQue.auspice : selectedKdQue.auspice_en, pCenter, 330);
    
    // Arrow
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 36px "Times New Roman", serif';
    ctx.fillText('➔', width / 2, 250);
    ctx.font = 'bold 11px "Georgia", serif';
    ctx.fillText(currentLang === 'vi' ? 'BIẾN' : 'CHANGES', width / 2, 275);
    
    // Secondary
    const secBinary = kinhDichCasts.map(c => {
      if (c === 6) return '1';
      if (c === 9) return '0';
      return (c === 7) ? '1' : '0';
    }).join('');
    drawHexagramOnCanvas(sCenter, drawY, secBinary, null);
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 18px "Times New Roman", Georgia, serif';
    ctx.fillText(currentLang === 'vi' ? 'Quẻ Biến' : 'Secondary Hexagram', sCenter, 195);
    ctx.fillStyle = '#163f2b';
    ctx.font = 'bold 16px "Georgia", serif';
    ctx.fillText(currentLang === 'vi' ? selectedKdQueBien.name.split(': ')[1] : selectedKdQueBien.name_en.split(': ')[1], sCenter, 310);
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 13px "Georgia", serif';
    ctx.fillText(currentLang === 'vi' ? selectedKdQueBien.auspice : selectedKdQueBien.auspice_en, sCenter, 330);
    
    primaryNameY = 350;
  } else {
    const center = width / 2;
    const drawY = 280;
    drawHexagramOnCanvas(center, drawY, primaryBinary, kinhDichCasts);
    
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 22px "Times New Roman", Georgia, serif';
    ctx.fillText(currentLang === 'vi' ? selectedKdQue.name : selectedKdQue.name_en, center, 195);
    ctx.fillStyle = '#163f2b';
    ctx.font = 'bold 16px "Georgia", serif';
    ctx.fillText(currentLang === 'vi' ? selectedKdQue.auspice : selectedKdQue.auspice_en, center, 310);
    
    primaryNameY = 330;
  }
  
  // 5. General meanings
  let nextY = primaryNameY + 30;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#163f2b';
  ctx.font = 'bold 18px "Georgia", serif';
  ctx.fillText(currentLang === 'vi' ? '■ Ý Nghĩa Quẻ Dịch:' : '■ Hexagram Meaning:', 60, nextY);
  
  nextY += 25;
  ctx.fillStyle = '#444';
  ctx.font = 'italic 15px "Georgia", serif';
  nextY = wrapCanvasText(ctx, currentLang === 'vi' ? selectedKdQue.desc : selectedKdQue.desc_en, 60, nextY, width - 120, 22);
  
  nextY += 5;
  ctx.fillStyle = '#222';
  ctx.font = 'normal 15px "Georgia", serif';
  nextY = wrapCanvasText(ctx, currentLang === 'vi' ? selectedKdQue.meaning : selectedKdQue.meaning_en, 60, nextY, width - 120, 22);
  
  // 6. Detailed categories
  nextY += 15;
  ctx.fillStyle = '#163f2b';
  ctx.font = 'bold 18px "Georgia", serif';
  ctx.fillText(currentLang === 'vi' ? '■ Luận Giải Chi Tiết:' : '■ Detailed Interpretation:', 60, nextY);
  
  const cats = [
    { label_vi: 'Sự nghiệp', label_en: 'Career', text_vi: selectedKdQue.career, text_en: selectedKdQue.career_en, icon: '💼' },
    { label_vi: 'Tình duyên', label_en: 'Love', text_vi: selectedKdQue.love, text_en: selectedKdQue.love_en, icon: '❤️' },
    { label_vi: 'Tài lộc', label_en: 'Wealth', text_vi: selectedKdQue.wealth, text_en: selectedKdQue.wealth_en, icon: '💰' },
    { label_vi: 'Sức khỏe', label_en: 'Health', text_vi: selectedKdQue.health, text_en: selectedKdQue.health_en, icon: '🏥' }
  ];
  
  nextY += 25;
  cats.forEach(cat => {
    ctx.fillStyle = '#c94a61';
    ctx.font = 'bold 15px "Georgia", serif';
    const label = `${cat.icon} ${currentLang === 'vi' ? cat.label_vi : cat.label_en}: `;
    ctx.fillText(label, 60, nextY);
    
    const labelWidth = ctx.measureText(label).width;
    ctx.fillStyle = '#333';
    ctx.font = 'normal 15px "Georgia", serif';
    nextY = wrapCanvasText(ctx, currentLang === 'vi' ? cat.text_vi : cat.text_en, 60 + labelWidth, nextY, width - 120 - labelWidth, 22);
    nextY += 8;
  });
  
  // 7. Red Stamp Seal
  ctx.save();
  ctx.translate(width - 150, height - 150);
  ctx.rotate(-10 * Math.PI / 180);
  ctx.strokeStyle = '#ff8da1';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 85, 85);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(5, 5, 75, 75);
  ctx.fillStyle = '#ff8da1';
  ctx.font = 'bold 15px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText(currentLang === 'vi' ? 'CHU' : 'ICHING', 42, 38);
  ctx.fillText(currentLang === 'vi' ? 'DỊCH' : 'ORACLE', 42, 60);
  ctx.restore();
  
  // 8. Trigger Download
  try {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Que_Kinh_Dich_Que_So_${selectedKdQue.id}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(t('toast.kd_save_success'));
  } catch (err) {
    console.error("Failed to export I Ching image: ", err);
    alert(t('toast.save_error'));
  }
}

// Expose Kinh Dich functions to global scope
window.startKinhDichDivination = startKinhDichDivination;
window.shakeCoins = shakeCoins;
window.showKinhDichResult = showKinhDichResult;
window.resetKinhDich = resetKinhDich;
window.saveKinhDichAsImage = saveKinhDichAsImage;

// Listen for language changes and update dynamic content
window.addEventListener('langChanged', function() {
  userWish = t('msg.wish_default');
  // Re-render fortune result if currently showing
  if (currentStep === 'result' && selectedQue) {
    revealFortune();
  }
  // Re-render I Ching result if showing
  if (activeTab === 'kinhdich' && kinhDichCasts.length >= 6 && selectedKdQue) {
    showKinhDichResult();
  }
});
