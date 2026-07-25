// Rajtilak Analytics — Client Side Engine

// Global variables to store fetched state / district data
let selectedState = 'chhattisgarh'; // Hardcoded for this strategic engine focus
let mockWardsList = [];

document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  setupFormHandler();
  setupTabHandler();
});

// Setup district -> city dynamic cascading
async function initDropdowns() {
  const districtSel = document.getElementById('districtSelect');
  const citySel = document.getElementById('citySelect');

  // Trigger loading cities when district changes
  districtSel.addEventListener('change', async () => {
    const districtId = districtSel.value;
    citySel.innerHTML = '<option value="">— Select City —</option>';
    
    if (!districtId) return;

    try {
      const response = await fetch(`/api/cities/${selectedState}/${districtId}`);
      const cities = await response.json();
      
      cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.id;
        opt.textContent = city.name;
        citySel.appendChild(opt);
      });
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  });
}

// Setup form submission & scanning sequence
function setupFormHandler() {
  const form = document.getElementById('wardSearchForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const districtSel = document.getElementById('districtSelect');
    const citySel = document.getElementById('citySelect');
    const wardInput = document.getElementById('wardInput');
    const keywordSelect = document.getElementById('keywordSelect');

    const districtId = districtSel.value;
    const cityId = citySel.value;
    const wardRawVal = wardInput.value.trim();
    const keyword = keywordSelect.value;

    if (!districtId || !cityId || !wardRawVal) {
      alert('Please select District, City, and enter a Ward number.');
      return;
    }

    // Hide hero & results, show scanner
    document.getElementById('heroSection').classList.add('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
    
    const scannerSec = document.getElementById('scannerSection');
    scannerSec.classList.remove('hidden');

    // Update scanner label
    document.getElementById('scanWardNum').textContent = wardRawVal.replace(/[^0-9]/g, '') || wardRawVal;

    // Build api request payload
    // We normalize ward raw input. If it matches "47" under bhilai, we map it to our structured "ward_47"
    let wardId = 'custom_ward';
    const wardNum = wardRawVal.replace(/[^0-9]/g, '');
    if (cityId === 'bhilai' && wardNum === '47') {
      wardId = 'ward_47';
    } else if (cityId === 'bhilai' && wardNum === '48') {
      wardId = 'ward_48';
    }

    // Run dynamic scanner step animation
    await runScannerAnimation();

    // Fetch analysis from server
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stateId: selectedState,
          districtId,
          cityId,
          wardId,
          keyword
        })
      });
      
      let data = await response.json();

      // If it's a generic custom ward, let's inject realistic simulated data on client side so the user gets a beautiful analysis
      if (wardId === 'custom_ward') {
        data = generateSimulatedWardData(wardRawVal, districtSel.options[districtSel.selectedIndex].text, citySel.options[citySel.selectedIndex].text);
      }

      // Render dashboard results
      renderDashboard(data, keyword);

      // Hide scanner, show results
      scannerSec.classList.add('hidden');
      document.getElementById('resultsSection').classList.remove('hidden');

      // Scroll to results
      document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
      console.error('Error conducting ward intelligence analysis:', err);
      alert('Analysis failed. Re-connecting to servers.');
      resetToSearch();
    }
  });
}

// Scanner step animation sequence
function runScannerAnimation() {
  return new Promise((resolve) => {
    const steps = [
      document.getElementById('step1'),
      document.getElementById('step2'),
      document.getElementById('step3'),
      document.getElementById('step4'),
      document.getElementById('step5'),
      document.getElementById('step6')
    ];

    // Reset step styles
    steps.forEach(step => {
      step.className = 'scan-step';
      step.querySelector('.step-icon').textContent = '◌';
    });

    let currentStep = 0;
    
    function activateStep() {
      if (currentStep > 0) {
        steps[currentStep - 1].className = 'scan-step completed';
        steps[currentStep - 1].querySelector('.step-icon').textContent = '✓';
      }

      if (currentStep < steps.length) {
        steps[currentStep].className = 'scan-step active';
        steps[currentStep].querySelector('.step-icon').textContent = '⚡';
        currentStep++;
        setTimeout(activateStep, 750); // ~750ms per intelligence process
      } else {
        setTimeout(resolve, 300);
      }
    }

    activateStep();
  });
}

// Render values onto Dashboard
function renderDashboard(data, selectedKeyword) {
  // Title & Path
  document.getElementById('reportTitle').textContent = `${data.region}`;
  document.getElementById('reportPath').textContent = data.fullPath;

  // Data Sources
  document.getElementById('dataSources').textContent = data.dataSources || 14;
  document.getElementById('dataPoints').textContent = data.dataPoints || 3240;
  document.getElementById('reportTime').textContent = new Date().toLocaleTimeString();

  // Strategy Score gauge
  const score = data.growthScore || 70;
  document.getElementById('scoreValue').textContent = score;
  const circle = document.getElementById('scoreCircle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  // Active default tab or direct keyword tab
  let tabToActivate = 'overview';
  if (selectedKeyword && selectedKeyword !== 'full') {
    tabToActivate = selectedKeyword;
  }
  
  // Overview Tab Data
  const ovPop = document.getElementById('ov-population');
  const ovVoters = document.getElementById('ov-voters');
  const ovProjects = document.getElementById('ov-projects');
  const ovLit = document.getElementById('ov-literacy');
  const ovHh = document.getElementById('ov-households');
  const ovGrowth = document.getElementById('ov-growthScore');
  const ovCouncillor = document.getElementById('ov-councillor');
  const ovParty = document.getElementById('ov-party');
  const ovLastResult = document.getElementById('ov-lastResult');

  if (data.basic_profile) {
    ovPop.textContent = data.demographics.population || '6,200';
    ovVoters.textContent = data.current_term.total_voters || '4,850';
    ovProjects.textContent = data.development_projects ? data.development_projects.length : '14';
    ovLit.textContent = data.demographics.literacy || '84.5%';
    ovHh.textContent = '1,240';
    ovGrowth.textContent = `${score}%`;

    ovCouncillor.innerHTML = `
      <strong>${data.basic_profile.name}</strong><br>
      Age: ${data.basic_profile.age}<br>
      Education: ${data.basic_profile.education}
    `;
    ovParty.innerHTML = `
      <strong>${data.basic_profile.party}</strong><br>
      Affiliation: GetSetAI Approved
    `;
    
    const lastElect = data.election_history ? data.election_history[0] : null;
    if (lastElect) {
      ovLastResult.innerHTML = `
        <strong>Won (Year: ${lastElect.year})</strong><br>
        Margin: ${lastElect.margin} votes<br>
        Opponent: ${lastElect.opponent}
      `;
    } else {
      ovLastResult.textContent = 'N/A';
    }
  }

  // Profile / Overview layout
  renderProfileTab(data);

  // Political Tab
  renderPoliticalTab(data);

  // Voter Tab
  renderVoterTab(data);

  // Demographics Tab
  renderDemographicsTab(data);

  // Caste Tab
  renderCasteTab(data);

  // Infrastructure Tab
  renderInfrastructureTab(data);

  // Development Tab
  renderDevelopmentTab(data);

  // Complaints Tab
  renderComplaintsTab(data);

  // Economic Tab
  renderEconomicTab(data);

  // Risk Tab
  renderRiskTab(data);

  // Navigate to designated tab
  activateTab(tabToActivate);
}

// Profile panel builder
function renderProfileTab(data) {
  const overviewPanel = document.getElementById('tab-overview');
  
  // Find or create profile elements inside Overview
  let profWrap = overviewPanel.querySelector('.profile-wrap');
  if (profWrap) profWrap.remove();

  let extraWrap = overviewPanel.querySelector('.overview-extra-wrap');
  if (extraWrap) extraWrap.remove();

  if (!data.basic_profile) return;

  profWrap = document.createElement('div');
  profWrap.className = 'profile-wrap mt-lg';
  
  let socialLinks = '';
  if (data.basic_profile.social) {
    Object.entries(data.basic_profile.social).forEach(([network, url]) => {
      let icon = network.charAt(0).toUpperCase();
      socialLinks += `<a class="social-link" href="https://${url}" target="_blank" title="${network}">${icon}</a>`;
    });
  }

  let timelineItems = '';
  if (data.political_timeline) {
    data.political_timeline.forEach((item, idx) => {
      const activeClass = idx === data.political_timeline.length - 1 ? 'active' : '';
      timelineItems += `
        <div class="timeline-item ${activeClass}">
          <span class="timeline-dot"></span>
          <div class="timeline-year">${item.year}</div>
          <div class="timeline-text">${item.event}</div>
        </div>
      `;
    });
  }

  profWrap.innerHTML = `
    <div class="prof-left">
      <div class="prof-img-wrap">
        <div class="prof-img-placeholder">👤</div>
      </div>
      <div class="prof-socials">
        ${socialLinks}
      </div>
    </div>
    <div class="prof-right">
      <h3 class="section-title">Councillor Basic Profile</h3>
      <div class="prof-fields">
        <div class="prof-field"><div class="pf-label">Full Name</div><div class="pf-val">${data.basic_profile.name}</div></div>
        <div class="prof-field"><div class="pf-label">Age / Gender</div><div class="pf-val">${data.basic_profile.age} / ${data.basic_profile.gender}</div></div>
        <div class="prof-field"><div class="pf-label">Political Party</div><div class="pf-val">${data.basic_profile.party}</div></div>
        <div class="prof-field"><div class="pf-label">Occupation</div><div class="pf-val">${data.basic_profile.occupation}</div></div>
        <div class="prof-field"><div class="pf-label">Address</div><div class="pf-val">${data.basic_profile.address}</div></div>
        <div class="prof-field"><div class="pf-label">Contact</div><div class="pf-val">${data.basic_profile.contact}</div></div>
      </div>
      <h3 class="section-title mt-lg">Political Journey</h3>
      <div class="timeline-vertical">
        ${timelineItems}
      </div>
    </div>
  `;
  
  overviewPanel.appendChild(profWrap);

  // Generate Campaign Slogans, Agitation Protests, and Improvement Ideas
  extraWrap = document.createElement('div');
  extraWrap.className = 'overview-extra-wrap mt-lg';

  let slogansHtml = '';
  if (data.basic_profile.slogans) {
    slogansHtml = `
      <div class="info-card" style="margin-top: 1.5rem;">
        <div class="ic-header">📢 Campaign Slogans & Banners</div>
        <div class="slogans-container" style="display: flex; flex-direction: column; gap: 12px; margin-top: 1rem;">
          ${data.basic_profile.slogans.map(s => `
            <div style="background: rgba(255, 107, 43, 0.06); border-left: 4px solid var(--accent-orange); padding: 12px 16px; border-radius: 4px; font-family: var(--font-title); font-size: 1rem; font-weight: 700; color: white; font-style: italic;">
              "${s}"
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  let agitationHtml = '';
  if (data.agitations) {
    agitationHtml = `
      <div class="info-card" style="margin-top: 1.5rem; border: 1px solid rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.03);">
        <div class="ic-header" style="color: var(--danger);">🔥 Key Protest & Jail Term (Mass Agitation)</div>
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 10px;">
          <h4 style="font-family: var(--font-title); font-size: 1.15rem; color: white;">${data.agitations.event_title}</h4>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${data.agitations.details}</p>
          <div style="display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap;">
            <span style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.25); padding: 6px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">
              🔒 ${data.agitations.jail_term}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  let ideasHtml = '';
  if (data.improvement_ideas) {
    ideasHtml = `
      <div class="info-card" style="margin-top: 1.5rem;">
        <div class="ic-header">💡 Strategic Improvement Ideas (Ward Level)</div>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 1rem;">
          ${data.improvement_ideas.map(idea => `
            <div style="background: rgba(4, 10, 23, 0.5); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: white; font-size: 0.95rem;">${idea.title}</strong>
                <span class="status-tag ${idea.impact === 'High' ? 'completed' : 'ongoing'}" style="font-size: 0.6rem; padding: 2px 6px;">${idea.impact} Impact</span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">${idea.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  let engagementHtml = '';
  if (data.kpis && (data.kpis.public_accessibility || data.kpis.local_engagement)) {
    engagementHtml = `
      <div class="info-card" style="margin-top: 1.5rem;">
        <div class="ic-header">🤝 Locality Engagement & Accessibility Metrics</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 1rem;">
          <div style="background: rgba(4, 10, 23, 0.4); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,107,43,0.15); display: flex; flex-direction: column; gap: 8px; text-align: center;">
            <div style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--text-secondary);">Public Accessibility Index</div>
            <div style="font-family: var(--font-title); font-size: 1.8rem; font-weight: 900; color: var(--accent-orange);">${data.kpis.public_accessibility}</div>
            <div class="br-track" style="height: 6px;"><div class="br-fill" style="width: ${data.kpis.public_accessibility}; background: var(--accent-orange)"></div></div>
          </div>
          <div style="background: rgba(4, 10, 23, 0.4); padding: 16px; border-radius: 8px; border: 1px solid rgba(14,165,233,0.15); display: flex; flex-direction: column; gap: 8px; text-align: center;">
            <div style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--text-secondary);">Citizen Engagement Rate</div>
            <div style="font-family: var(--font-title); font-size: 1.8rem; font-weight: 900; color: #0ea5e9;">${data.kpis.local_engagement}</div>
            <div class="br-track" style="height: 6px;"><div class="br-fill" style="width: ${data.kpis.local_engagement}; background: #0ea5e9"></div></div>
          </div>
        </div>
      </div>
    `;
  }

  extraWrap.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; width: 100%;">
      <div>
        ${agitationHtml}
        ${slogansHtml}
      </div>
      <div>
        ${ideasHtml}
        ${engagementHtml}
      </div>
    </div>
  `;

  overviewPanel.appendChild(extraWrap);
}

// Political panel builder
function renderPoliticalTab(data) {
  if (!data.basic_profile) return;

  const currentElect = data.election_history ? data.election_history[0] : null;
  const opp = data.opposition || { main_opponent: 'Opponent', vote_share: '40%', strengths: '', weaknesses: '' };

  const winnerPartyName = data.basic_profile.party.includes("INC") || data.basic_profile.party.includes("Congress") ? "INC" : "BJP";
  const opponentPartyName = winnerPartyName === "INC" ? "BJP" : "INC";

  document.getElementById('pol-name').textContent = data.basic_profile.name;
  document.getElementById('pol-party').textContent = data.basic_profile.party;
  document.getElementById('pol-votes').textContent = currentElect ? `${currentElect.votes_received} votes` : '--';

  document.getElementById('pol-opp-name').textContent = opp.main_opponent;
  document.getElementById('pol-opp-party').textContent = opponentPartyName === "BJP" ? "BJP / Opposition" : "INC / Opposition";
  document.getElementById('pol-opp-votes').textContent = currentElect ? `${currentElect.votes_received - currentElect.margin} votes (est.)` : '--';

  document.getElementById('pol-margin').textContent = currentElect ? `+${currentElect.margin} votes` : '--';
  document.getElementById('pol-trend').textContent = `Winning Margin: ${currentElect ? currentElect.vote_share : 50}% share`;

  // Vote share segment bar
  const shareBar = document.getElementById('voteShareBar');
  const winnerShare = currentElect ? currentElect.vote_share : 48.8;
  const oppShare = parseFloat(opp.vote_share) || 43.0;
  const otherShare = Math.max(0, 100 - winnerShare - oppShare).toFixed(1);

  const winnerClass = winnerPartyName === "INC" ? "vs-inc" : "vs-bjp";
  const oppClass = opponentPartyName === "INC" ? "vs-inc" : "vs-bjp";

  shareBar.innerHTML = `
    <div class="vs-segment ${winnerClass}" style="width: ${winnerShare}%" title="${winnerPartyName} ${winnerShare}%">${winnerPartyName} (${winnerShare}%)</div>
    <div class="vs-segment ${oppClass}" style="width: ${oppShare}%" title="${opponentPartyName} ${oppShare}%">${opponentPartyName} (${oppShare}%)</div>
    <div class="vs-segment vs-nota" style="width: ${otherShare}%" title="Others/NOTA ${otherShare}%">Others (${otherShare}%)</div>
  `;

  // History table
  const tbody = document.getElementById('electionHistoryBody');
  tbody.innerHTML = '';
  if (data.election_history) {
    data.election_history.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.year}</td>
        <td>${row.opponent ? data.basic_profile.name : 'Winner'}</td>
        <td>${row.party || 'INC'}</td>
        <td>${row.votes_received || '--'}</td>
        <td>+${row.margin || '--'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // SWOT & Strategy Tag indicators
  const strategyTags = document.getElementById('strategyTags');
  strategyTags.innerHTML = '';
  if (data.swot) {
    const swotContainer = document.createElement('div');
    swotContainer.className = 'swot-grid mt-lg';
    
    const categories = [
      { key: 'strengths', title: 'Strengths', badge: 'S' },
      { key: 'weaknesses', title: 'Weaknesses', badge: 'W' },
      { key: 'opportunities', title: 'Opportunities', badge: 'O' },
      { key: 'threats', title: 'Threats', badge: 'T' }
    ];

    categories.forEach(cat => {
      const listItems = data.swot[cat.key] ? data.swot[cat.key].map(txt => `<li>${txt}</li>`).join('') : '<li>No documented records.</li>';
      swotContainer.innerHTML += `
        <div class="swot-card">
          <div class="swot-header ${cat.badge}">${cat.title}</div>
          <ul class="swot-list">${listItems}</ul>
        </div>
      `;
    });
    
    strategyTags.appendChild(swotContainer);
  }
}

// Voter panel builder
function renderVoterTab(data) {
  if (!data.demographics || !data.current_term) return;

  const ct = data.current_term;
  document.getElementById('vt-total').textContent = ct.total_voters || '4,850';
  document.getElementById('vt-male').textContent = ct.male_voters || '2,510';
  document.getElementById('vt-female').textContent = ct.female_voters || '2,340';
  document.getElementById('vt-turnout').textContent = ct.total_turnout || '70.6%';

  // Gender donut chart (SVG)
  const male = ct.male_voters || 2510;
  const female = ct.female_voters || 2340;
  const tot = male + female;
  const malePct = Math.round((male / tot) * 100);
  const femalePct = Math.round((female / tot) * 100);

  const donut = document.getElementById('genderDonut');
  donut.innerHTML = `
    <svg viewBox="0 0 100 100" class="donut-svg">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" stroke-width="12" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ff8838" stroke-width="12"
        stroke-dasharray="251.2" stroke-dashoffset="${251.2 - (malePct / 100) * 251.2}"
        transform="rotate(-90 50 50)" class="svg-donut-ring" />
    </svg>
  `;

  document.getElementById('genderLegend').innerHTML = `
    <div class="legend-item"><span class="legend-color" style="background: #ff8838"></span>Male (${malePct}%)</div>
    <div class="legend-item"><span class="legend-color" style="background: #2563eb"></span>Female (${femalePct}%)</div>
  `;

  // Age group vertical bars
  const ageBarChart = document.getElementById('ageBarChart');
  ageBarChart.innerHTML = '';
  
  const ageGroups = data.demographics.ageGroups || { '18-25': 20, '26-45': 45, '46-60': 20, '60+': 15 };
  Object.entries(ageGroups).forEach(([lbl, val]) => {
    const row = document.createElement('div');
    row.className = 'bar-row-v';
    row.innerHTML = `
      <div class="br-lbl">${lbl} yrs</div>
      <div class="br-track"><div class="br-fill" style="width: ${val}%"></div></div>
      <div class="br-val">${val}%</div>
    `;
    ageBarChart.appendChild(row);
  });

  // First time voters highlighted text
  document.getElementById('vt-firstTime').innerHTML = `
    <div style="background: rgba(255,107,43,0.05); border: 1px solid rgba(255,107,43,0.15); padding: 16px; border-radius: 8px;">
      🚀 <strong>First-Time Voter Outreach:</strong> Approximately <strong>${Math.round(tot * 0.08)} active voters</strong> (18-19 age category) are registered in the ward rolls.
    </div>
  `;

  // Voter Sentiment
  const sentimentBars = document.getElementById('sentimentBars');
  sentimentBars.innerHTML = '';
  if (data.public_sentiment) {
    const ps = data.public_sentiment;
    const categories = [
      { name: 'Positive Response', val: ps.positive, color: 'var(--success)' },
      { name: 'Neutral Response', val: ps.neutral, color: 'var(--text-secondary)' },
      { name: 'Critical/Opposed Response', val: ps.negative, color: 'var(--danger)' }
    ];

    categories.forEach(cat => {
      sentimentBars.innerHTML += `
        <div class="sentiment-row">
          <span class="pr-name">${cat.name}</span>
          <span class="pr-val" style="color: ${cat.color}">${cat.val}%</span>
        </div>
      `;
    });
  }
}

// Demographics panel builder
function renderDemographicsTab(data) {
  if (!data.demographics) return;

  const dm = data.demographics;
  document.getElementById('dm-pop').textContent = dm.population || '6,200';
  document.getElementById('dm-density').textContent = dm.density || '18,180';
  document.getElementById('dm-literacy').textContent = dm.literacy || '84.5%';
  document.getElementById('dm-sexRatio').textContent = dm.sex_ratio || '945';

  // Urban/Rural split bars
  const urSplit = document.getElementById('urbanRuralBars');
  const urbanPct = dm.urban_rural ? dm.urban_rural.urban : 100;
  const ruralPct = dm.urban_rural ? dm.urban_rural.rural : 0;
  
  urSplit.innerHTML = `
    <div style="display: flex; gap: 8px; justify-content: space-between; width: 100%; margin-bottom: 8px;">
      <span>🏙️ Urban (${urbanPct}%)</span>
      <span>🏡 Rural (${ruralPct}%)</span>
    </div>
    <div class="br-track" style="height: 16px;">
      <div class="br-fill" style="width: ${urbanPct}%; background: linear-gradient(to right, #0ea5e9, #38bdf8);"></div>
    </div>
  `;

  // Religion pill indicators
  const religionBars = document.getElementById('religionBars');
  religionBars.innerHTML = '';
  const religion = dm.religion || { Hindu: 85, Muslim: 12, Christian: 3 };
  Object.entries(religion).forEach(([k, v]) => {
    religionBars.innerHTML += `
      <div class="pill-row">
        <span class="pr-name">${k}</span>
        <span class="pr-val">${v}%</span>
      </div>
    `;
  });
}

// Caste composition panel builder
function renderCasteTab(data) {
  const casteBars = document.getElementById('casteBars');
  const dominantList = document.getElementById('dominantCastes');
  
  casteBars.innerHTML = '';
  dominantList.innerHTML = '';

  if (!data.demographics || !data.demographics.castes) {
    casteBars.innerHTML = '<p>No demographic caste files uploaded.</p>';
    return;
  }

  const castes = data.demographics.castes;
  Object.entries(castes).forEach(([k, v]) => {
    casteBars.innerHTML += `
      <div class="bar-row-v">
        <div class="br-lbl" style="width: 80px;">${k}</div>
        <div class="br-track"><div class="br-fill" style="width: ${v}%; background: linear-gradient(to right, #ff8838, #ff5200)"></div></div>
        <div class="br-val">${v}%</div>
      </div>
    `;
  });

  // Dominant caste highlights
  const sortedCastes = Object.entries(castes).sort((a,b) => b[1] - a[1]);
  sortedCastes.slice(0, 2).forEach(([k, v]) => {
    dominantList.innerHTML += `
      <span class="caste-pill">${k} Community (${v}%)</span>
    `;
  });
}

// Infrastructure panel builder
function renderInfrastructureTab(data) {
  const grid = document.getElementById('infraGrid');
  const list = document.getElementById('facilityList');
  const scoreBig = document.getElementById('infraScoreBig');

  grid.innerHTML = '';
  list.innerHTML = '';

  const scores = data.ward_development_score || { road_infra: 8, water_supply: 8, electricity: 8, overall_score: 8 };
  scoreBig.innerHTML = `${scores.overall_score || scores.overallScore || 7.4}<span>/10</span>`;

  // Map database keys to human readable labels
  const keysMapping = {
    road_infra: 'Road Quality',
    water_supply: 'Clean Water Supply',
    electricity: 'Power Supply / Lights',
    drainage: 'Drainage Networks',
    cleanliness: 'Sanitation',
    waste_management: 'Solid Waste Disposal',
    public_toilets: 'Public Toilets',
    healthcare: 'Healthcare Outposts',
    education: 'Primary Schools',
    women_safety: 'Women Safety / CCTV'
  };

  Object.entries(scores).forEach(([k, v]) => {
    if (k === 'overall_score' || k === 'overallScore') return;
    const label = keysMapping[k] || k.replace('_', ' ').toUpperCase();
    
    grid.innerHTML += `
      <div class="infra-item">
        <div class="infra-header">
          <span>${label}</span>
          <span class="infra-val">${v}/10</span>
        </div>
        <div class="br-track" style="height: 6px;">
          <div class="br-fill" style="width: ${v * 10}%; background: ${v >= 8 ? 'var(--success)' : v >= 6 ? 'var(--warning)' : 'var(--danger)'}"></div>
        </div>
      </div>
    `;
  });

  // Local facilities list mock
  list.innerHTML = `
    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 8px;">
      🏢 <strong>Local Facilities Documented:</strong> 1 Primary School, 2 Community Parks, 1 Integrated Anganwadi Center, and 1 Neighborhood Primary Health sub-center.
    </div>
  `;
}

// Development projects panel builder
function renderDevelopmentTab(data) {
  const total = document.getElementById('dev-total');
  const comp = document.getElementById('dev-completed');
  const ong = document.getElementById('dev-ongoing');
  const pend = document.getElementById('dev-pending');
  const list = document.getElementById('projectsList');

  list.innerHTML = '';

  const projects = data.development_projects || [];
  total.textContent = projects.length || '0';
  
  const completedCount = projects.filter(p => p.status === 'Completed').length;
  const ongoingCount = projects.filter(p => p.status === 'Ongoing').length;
  const pendingCount = projects.length - completedCount - ongoingCount;

  comp.textContent = completedCount;
  ong.textContent = ongoingCount;
  pend.textContent = pendingCount;

  if (projects.length === 0) {
    list.innerHTML = '<p>No development project files registered.</p>';
    return;
  }

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="pc-left">
        <div class="pc-title">${p.name}</div>
        <div class="pc-meta">📍 ${p.location} | Dept: <strong>${p.dept}</strong> | Contractor: ${p.contractor}</div>
      </div>
      <div class="pc-right">
        <div class="pc-budget">${p.budget}</div>
        <span class="status-tag ${p.status.toLowerCase()}">${p.status}</span>
      </div>
    `;
    list.appendChild(card);
  });
}

// Complaints register panel builder
function renderComplaintsTab(data) {
  const total = document.getElementById('cmp-total');
  const res = document.getElementById('cmp-resolved');
  const pend = document.getElementById('cmp-pending');
  const list = document.getElementById('complaintsList');

  list.innerHTML = '';

  const complaints = data.complaints || { total: 0, resolved: 0, pending: 0, avg_resolution_time: '--', by_category: {} };
  total.textContent = complaints.total || '0';
  res.textContent = complaints.resolved || '0';
  pend.textContent = complaints.pending || '0';

  if (!complaints.by_category) {
    list.innerHTML = '<p>No public grievances filed.</p>';
    return;
  }

  Object.entries(complaints.by_category).forEach(([cat, metrics]) => {
    const card = document.createElement('div');
    card.className = 'complaint-card';
    card.innerHTML = `
      <div class="pc-left">
        <div class="pc-title" style="text-transform: capitalize;">${cat} Complaints</div>
        <div class="pc-meta">Avg Resolution: <strong>${complaints.avg_resolution_time}</strong> | Locality Focus: ${complaints.most_affected_locality}</div>
      </div>
      <div class="pc-right">
        <div class="pc-budget" style="color: var(--text-primary);">${metrics.total} Filed</div>
        <span class="status-tag resolved" style="background: rgba(16,185,129,0.1); color: var(--success);">${metrics.resolved} Solved</span>
      </div>
    `;
    list.appendChild(card);
  });
}

// Economic panel builder
function renderEconomicTab(data) {
  if (!data.economic) return;

  const ec = data.economic;
  document.getElementById('ec-income').textContent = ec.avgIncome ? `₹${ec.avgIncome.toLocaleString()}` : 'N/A';
  document.getElementById('ec-employment').textContent = ec.employmentRate ? `${ec.employmentRate}%` : 'N/A';
  document.getElementById('ec-bpl').textContent = '145 Families';
  document.getElementById('ec-businesses').textContent = '62 Registered';

  // Sector breakdown bars
  const sectorBars = document.getElementById('sectorBars');
  sectorBars.innerHTML = '';
  
  const sectors = ec.sectors || { services: 50, industry: 30, agriculture: 20 };
  Object.entries(sectors).forEach(([k, v]) => {
    sectorBars.innerHTML += `
      <div class="bar-row-v">
        <div class="br-lbl" style="text-transform: capitalize; width: 90px;">${k}</div>
        <div class="br-track"><div class="br-fill" style="width: ${v}%; background: linear-gradient(to right, #0ea5e9, #0284c7)"></div></div>
        <div class="br-val">${v}%</div>
      </div>
    `;
  });
}

// Risk analysis panel builder
function renderRiskTab(data) {
  if (!data.risk) return;

  const risk = data.risk;
  const level = risk.overallRisk || 'Low';
  document.getElementById('riskLevel').textContent = level;
  
  // Set class for color
  const valDiv = document.getElementById('riskLevel');
  valDiv.className = `risk-value ${level}`;

  const riskGrid = document.getElementById('riskGrid');
  riskGrid.innerHTML = `
    <div class="metric-card">
      <div class="mc-value">${risk.crimeIndex || 0}</div>
      <div class="mc-label">Crime Index</div>
    </div>
    <div class="metric-card">
      <div class="mc-value">${risk.disasterVulnerability || 0}</div>
      <div class="mc-label">Disaster Index</div>
    </div>
  `;

  // Strategic Vulnerabilities list
  const list = document.getElementById('vulnList');
  list.innerHTML = `
    <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); padding: 16px; border-radius: 8px; color: #f87171;">
      ⚠️ <strong>Monitored Vulnerabilities:</strong> Stagnation risks during monsoons around Radhakrishna Mandir low-lying areas.
    </div>
  `;
}

// Setup keyword/tab selectors
function setupTabHandler() {
  const tabs = document.querySelectorAll('.ktab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      activateTab(targetId);
    });
  });
}

// Activate single tab panel
function activateTab(tabId) {
  // Update tab buttons
  const tabs = document.querySelectorAll('.ktab');
  tabs.forEach(t => {
    if (t.dataset.tab === tabId) {
      t.classList.add('active');
      t.setAttribute('aria-selected', 'true');
    } else {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    }
  });

  // Update tab panels
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(p => {
    if (p.id === `tab-${tabId}`) {
      p.classList.remove('hidden');
    } else {
      p.classList.add('hidden');
    }
  });
}

// Reset results and go back to search form
function resetToSearch() {
  document.getElementById('resultsSection').classList.add('hidden');
  document.getElementById('heroSection').classList.remove('hidden');
  document.getElementById('heroSection').scrollIntoView({ behavior: 'smooth' });
}

// Simulate dynamic ward data generation for custom searches
function generateSimulatedWardData(wardNumRaw, districtName, cityName) {
  const num = parseInt(wardNumRaw.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 50) + 1;
  const isBjp = Math.random() > 0.5;
  const councillor = isBjp 
    ? ["Rajesh Dewangan", "Arvind Singh", "Sanjay Sahu", "Pradeep Agrawal"][Math.floor(Math.random() * 4)]
    : ["Anita Chandrakar", "Vikas Patel", "Deepak Verma", "Manoj Mishra"][Math.floor(Math.random() * 4)];
  
  return {
    region: `Ward No. ${num} - Municipal Ward Sector`,
    fullPath: `Chhattisgarh > ${districtName} > ${cityName} > Ward No. ${num}`,
    dataSources: 12,
    dataPoints: 1840,
    growthScore: Math.floor(Math.random() * 30) + 60, // 60-90 score
    demographics: {
      population: `${Math.floor(Math.random() * 2000) + 4000}`,
      density: "12,450 per sq.km",
      literacy: `${(Math.random() * 15 + 75).toFixed(1)}%`,
      sex_ratio: "938",
      religion: { Hindu: 85, Muslim: 10, Christian: 5 },
      castes: { OBC: 40, General: 35, SC: 15, ST: 10 },
      ageGroups: { '18-25': 24, '26-45': 42, '46-60': 20, '60+': 14 }
    },
    current_term: {
      total_voters: `${Math.floor(Math.random() * 1500) + 3000}`,
      male_voters: 1650,
      female_voters: 1550,
      total_turnout: "68.4%"
    },
    basic_profile: {
      name: councillor,
      age: Math.floor(Math.random() * 25) + 35,
      gender: councillor.startsWith("Anita") ? "Female" : "Male",
      party: isBjp ? "BJP (Bhartiya Janata Party)" : "INC (Indian National Congress)",
      occupation: "Social Activist / Business",
      education: "Graduate",
      address: `House No. ${num * 3 + 12}, Main Market Chowk, ${cityName}`,
      contact: `+91 98271 ${Math.floor(Math.random() * 89999) + 10000}`,
      social: { facebook: "fb.com/localcouncillor" }
    },
    political_timeline: [
      { year: "2015", event: "Entered social work and local community welfare initiatives" },
      { year: "2018", event: "Appointed local ward co-convener" },
      { year: "2021", event: "Won local municipal election to become Ward Councillor" }
    ],
    election_history: [
      {
        year: 2021,
        opponent: isBjp ? "Satish Chandrakar (INC)" : "Rajesh Dewangan (BJP)",
        margin: Math.floor(Math.random() * 200) + 100,
        vote_share: isBjp ? 52.4 : 49.8
      }
    ],
    opposition: {
      main_opponent: isBjp ? "Opposition Candidate" : "BJP Competitor",
      vote_share: "42%"
    },
    ward_development_score: {
      road_infra: (Math.random() * 3 + 6).toFixed(1),
      water_supply: (Math.random() * 3 + 6).toFixed(1),
      electricity: (Math.random() * 2 + 7).toFixed(1),
      drainage: (Math.random() * 4 + 5).toFixed(1),
      overall_score: (Math.random() * 2 + 6).toFixed(1)
    },
    development_projects: [
      { name: "Sewer Line Upgradation Phase-1", location: "Sector Main Road", budget: "₹8,50,000", dept: "Municipal Health", contractor: "Local Contractors Ltd", status: "Completed" },
      { name: "Paving of Block Link Roads", location: "Sub-lanes 1-4", budget: "₹4,20,000", dept: "PWD", contractor: "J.K. Developers", status: "Ongoing" }
    ],
    complaints: {
      total: 82, resolved: 70, pending: 12, avg_resolution_time: "5.2 Days",
      most_affected_locality: "Main Chowk area",
      by_category: {
        roads: { total: 24, resolved: 22, pending: 2 },
        garbage: { total: 32, resolved: 30, pending: 2 },
        water: { total: 26, resolved: 18, pending: 8 }
      }
    },
    public_sentiment: { positive: 58, neutral: 28, negative: 14 },
    economic: {
      avgIncome: 142000,
      employmentRate: 58,
      sectors: { services: 45, industry: 35, agriculture: 20 }
    },
    risk: {
      crimeIndex: 28,
      disasterVulnerability: 35,
      overallRisk: "Low"
    },
    swot: {
      strengths: ["Highly active during local resident grievance hours.", "Direct line of communication with mayor's office."],
      weaknesses: ["Water logging complaints during high monsoon periods."],
      opportunities: ["Potential allocation of additional Smart City sanitation funds."],
      threats: ["New young opposition coordinator gaining local influence."]
    }
  };
}
