/**
 * Highline Pest Control Sharjah - Google Ads Landing Page Scripts
 * Optimized for Mobile Speed & Maximum Conversion Rate
 */

document.addEventListener('DOMContentLoaded', () => {
  initFormHandling();
  initPestSelector();
  initFAQAccordion();
  initExitIntentModal();
  initConversionTracking();
  initCountdownTimer();
});

// Primary Contact Info
const CONTACT_PHONE = '+971504624543';
const CONTACT_PHONE_DISPLAY = '050 462 4543';
const WHATSAPP_BASE_URL = 'https://api.whatsapp.com/send?phone=971504624543';

/**
 * Conversion Tracking Helper
 * Fires both Google Analytics / Google Ads events and custom dataLayer events
 */
function trackConversion(actionName, label = '') {
  // Push to GTM dataLayer if present
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'conversion_event',
    conversion_action: actionName,
    conversion_label: label,
    timestamp: new Date().toISOString()
  });

  // Call gtag if available
  if (typeof gtag === 'function') {
    gtag('event', actionName, {
      event_category: 'Google Ads Landing Page',
      event_label: label
    });
  }

  console.log(`[CRO Tracking] ${actionName}: ${label}`);
}

/**
 * Setup Click-to-Call & WhatsApp conversion tracking
 */
function initConversionTracking() {
  // Track all phone calls
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () => {
      trackConversion('click_to_call', el.getAttribute('href'));
    });
  });

  // Track all WhatsApp clicks
  document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"]').forEach(el => {
    el.addEventListener('click', () => {
      trackConversion('click_to_whatsapp', el.getAttribute('href'));
    });
  });
}

/**
 * Interactive Pest Selector / Estimator
 */
const pestData = {
  cockroach: {
    title: 'Cockroach Extermination',
    icon: '🪳',
    badge: 'Same-Day Treatment',
    signs: 'Commonly found in kitchen cabinets, behind refrigerators, bathroom drains, and pipes.',
    approach: 'German & American cockroach gel baiting + targeted micro-residual spray + drain seal treatment. 100% odorless & safe.',
    time: '45 - 60 Minutes',
    warranty: 'Up to 6 Months Warranty',
    selectValue: 'cockroaches'
  },
  bedbug: {
    title: 'Bed Bug Eradication',
    icon: '🛏️',
    badge: '100% Guaranteed Removal',
    signs: 'Itchy bites upon waking, reddish-brown stains on mattresses, bedding seams, or headboards.',
    approach: 'High-intensity thermal heat treatment & deep penetration residual spray. Eliminates both adult bugs and hidden eggs.',
    time: '60 - 90 Minutes',
    warranty: 'Guaranteed Eradication + Free Re-visit',
    selectValue: 'bed-bugs'
  },
  ants: {
    title: 'Ants & Termite Colony Removal',
    icon: '🐜',
    badge: 'Colony Elimination',
    signs: 'Visible trails on kitchen counters, walls, skirting boards, or winged swarmers around windows.',
    approach: 'Non-repellent baiting matrix carried back to queen for complete colony eradication, plus perimeter barrier.',
    time: '30 - 45 Minutes',
    warranty: 'Long-Lasting Barrier Protection',
    selectValue: 'ants'
  },
  rodents: {
    title: 'Rats & Mice Control',
    icon: '🐀',
    badge: 'Rapid Proofing',
    signs: 'Scratching sounds in ceilings/walls, small dark droppings, gnaw marks on cables or packaging.',
    approach: 'Tamper-resistant bait stations, humane trapping systems, and structural entry-point exclusion.',
    time: '45 - 60 Minutes',
    warranty: 'Full Property Proofing',
    selectValue: 'rodents'
  },
  mosquitoes: {
    title: 'Mosquito & Flying Insect Control',
    icon: '🦟',
    badge: 'Garden & Balcony Safe',
    signs: 'High mosquito presence around balconies, garden areas, water tanks, or shaded building corners.',
    approach: 'Ultra-low volume (ULV) cold misting/fogging + organic larvicidal standing water treatment.',
    time: '40 - 60 Minutes',
    warranty: 'Immediate Adulticide + Larvicide',
    selectValue: 'mosquitoes'
  },
  general: {
    title: 'Full Property General Pest Disinfection',
    icon: '🛡️',
    badge: 'Complete Peace of Mind',
    signs: 'Seasonal insects, silverfish, spiders, crickets, or preventative move-in / annual sanitization.',
    approach: 'Comprehensive 360° interior & exterior perimeter defense using Sharjah Municipality approved green chemicals.',
    time: '60 - 90 Minutes',
    warranty: 'Annual & Quarterly Plans Available',
    selectValue: 'general'
  }
};

function initPestSelector() {
  const buttons = document.querySelectorAll('.pest-selector-btn');
  const detailsBox = document.getElementById('pest-details-content');
  if (!buttons.length || !detailsBox) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pestKey = btn.getAttribute('data-pest');
      if (!pestData[pestKey]) return;

      buttons.forEach(b => b.classList.remove('active', 'border-blue-600', 'bg-blue-50', 'text-blue-700'));
      btn.classList.add('active', 'border-blue-600', 'bg-blue-50', 'text-blue-700');

      renderPestDetails(pestKey);
    });
  });
}

function renderPestDetails(key) {
  const data = pestData[key];
  const container = document.getElementById('pest-details-content');
  if (!container || !data) return;

  container.innerHTML = `
    <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg transition-all animate-fadeIn">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <span class="text-3xl">${data.icon}</span>
          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">${data.title}</h3>
            <span class="inline-block px-2.5 py-0.5 mt-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
              ${data.badge}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${data.time}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Common Infestation Signs:</h4>
          <p class="text-sm text-slate-700 font-medium">${data.signs}</p>
        </div>
        <div class="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <h4 class="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Highline Approved Treatment:</h4>
          <p class="text-sm text-slate-700 font-medium">${data.approach}</p>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div class="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
          <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          ${data.warranty}
        </div>
        <div class="flex flex-wrap gap-2.5 w-full sm:w-auto">
          <a href="${WHATSAPP_BASE_URL}&text=Hi%20Highline!%20I%20need%20help%20with%20${encodeURIComponent(data.title)}%20in%20Sharjah.%20Please%20send%20quote." target="_blank" rel="noopener" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            Book via WhatsApp
          </a>
          <button onclick="scrollToAndSelectPest('${data.selectValue}')" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-blue-600/20">
            Request Quote Form
          </button>
        </div>
      </div>
    </div>
  `;
}

// Scroll to form and set the pest type
window.scrollToAndSelectPest = function(val) {
  const formPestSelect = document.getElementById('service-pest-select');
  if (formPestSelect) {
    formPestSelect.value = val;
  }
  const heroForm = document.getElementById('hero-lead-form');
  if (heroForm) {
    heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const nameInput = heroForm.querySelector('input[name="full_name"]');
    if (nameInput) nameInput.focus();
  }
};

/**
 * FAQ Accordion Handler
 */
function initFAQAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Form Handling (Lead Capture & Conversion)
 */
function initFormHandling() {
  const forms = document.querySelectorAll('.highline-lead-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = form.querySelector('input[name="full_name"]');
      const phoneInput = form.querySelector('input[name="phone_number"]');
      const serviceSelect = form.querySelector('select[name="pest_service"]');
      const propertySelect = form.querySelector('select[name="property_type"]');
      const areaSelect = form.querySelector('select[name="sharjah_area"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      // Validation
      let isValid = true;
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameInput.classList.remove('error');
      }

      const phoneVal = phoneInput.value.replace(/[^0-9]/g, '');
      if (phoneVal.length < 8) {
        phoneInput.classList.add('error');
        isValid = false;
      } else {
        phoneInput.classList.remove('error');
      }

      if (!isValid) {
        alert('Please provide your name and a valid UAE contact number.');
        return;
      }

      const leadData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        service: serviceSelect ? serviceSelect.value : 'Pest Control',
        property: propertySelect ? propertySelect.value : 'Residential',
        area: areaSelect ? areaSelect.value : 'Sharjah',
        submittedAt: new Date().toLocaleString(),
        source: 'Google Ads Sharjah Campaign'
      };

      // Store in localStorage
      try {
        const existingLeads = JSON.parse(localStorage.getItem('highline_leads') || '[]');
        existingLeads.push(leadData);
        localStorage.setItem('highline_leads', JSON.stringify(existingLeads));
      } catch (err) {
        console.warn('Storage failed:', err);
      }

      // Track Form Submission Event
      trackConversion('lead_form_submitted', `${leadData.service} - ${leadData.area}`);

      // Disable button & show spinner
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Booking Confirmed...
        `;
      }

      // Construct pre-filled WhatsApp link for instant speed
      const waMessage = `Hi Highline Pest Control! 👋 I just submitted a request for pest control in Sharjah.%0A%0A*Name:* ${encodeURIComponent(leadData.name)}%0A*Phone:* ${encodeURIComponent(leadData.phone)}%0A*Service:* ${encodeURIComponent(leadData.service)}%0A*Property:* ${encodeURIComponent(leadData.property)}%0A*Area in Sharjah:* ${encodeURIComponent(leadData.area)}%0A%0APlease send quotation with 20% Google Ads discount!`;
      const waUrl = `${WHATSAPP_BASE_URL}&text=${waMessage}`;

      // Open Success Modal
      setTimeout(() => {
        showSuccessModal(leadData, waUrl);
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Get Free Quote & 20% OFF →`;
        }
      }, 700);
    });
  });
}

function showSuccessModal(leadData, waUrl) {
  const modal = document.getElementById('success-modal');
  const detailsEl = document.getElementById('modal-lead-details');
  const waBtn = document.getElementById('modal-whatsapp-direct');

  if (detailsEl) {
    detailsEl.innerHTML = `
      <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-left text-xs text-slate-700 space-y-1">
        <div><strong>Name:</strong> ${leadData.name}</div>
        <div><strong>Phone:</strong> ${leadData.phone}</div>
        <div><strong>Service:</strong> ${leadData.service}</div>
        <div><strong>Location:</strong> ${leadData.area}, Sharjah</div>
      </div>
    `;
  }

  if (waBtn) {
    waBtn.href = waUrl;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

window.closeSuccessModal = function() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

/**
 * Exit Intent / Inactivity Offer Modal
 */
let exitIntentFired = false;
function initExitIntentModal() {
  // Desktop mouse leave
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentFired) {
      triggerExitModal();
    }
  });

  // Mobile timer fallback: after 40s of browsing if not converted
  setTimeout(() => {
    if (!exitIntentFired && !localStorage.getItem('exit_modal_dismissed')) {
      triggerExitModal();
    }
  }, 40000);
}

function triggerExitModal() {
  exitIntentFired = true;
  const modal = document.getElementById('exit-offer-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

window.closeExitModal = function() {
  const modal = document.getElementById('exit-offer-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    localStorage.setItem('exit_modal_dismissed', 'true');
  }
};

/**
 * Real-time Limited-Time Deal Countdown (Urgency driver)
 */
function initCountdownTimer() {
  const timerEl = document.getElementById('deal-countdown');
  if (!timerEl) return;

  let totalSeconds = 2 * 3600 + 47 * 60 + 15; // 2h 47m 15s

  function update() {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (totalSeconds > 0) totalSeconds--;
  }

  update();
  setInterval(update, 1000);
}
