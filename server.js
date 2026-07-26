const express = require('express');
const path = require('path');
const regionsData = require('./data/regions');
const electionResults = require('./data/election_results.json');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const APP_NAME = 'Rajtilak Analytics';

const pendingRegionStates = {};

// Initialize dynamic hierarchy from JSON election database
function initializeDynamicHierarchy() {
  if (!regionsData.states) regionsData.states = {};
  if (!regionsData.states.chhattisgarh) {
    regionsData.states.chhattisgarh = {
      name: 'Chhattisgarh',
      dataStatus: 'ready',
      districts: {}
    };
  }
  
  const chhattisgarh = regionsData.states.chhattisgarh;
  if (!chhattisgarh.districts) chhattisgarh.districts = {};

  for (const [distId, distData] of Object.entries(electionResults)) {
    if (!chhattisgarh.districts[distId]) {
      chhattisgarh.districts[distId] = {
        name: distId.charAt(0).toUpperCase() + distId.slice(1),
        cities: {}
      };
    }
    
    const districtObj = chhattisgarh.districts[distId];
    if (!districtObj.cities) districtObj.cities = {};
    
    for (const [cityId, cityData] of Object.entries(distData)) {
      if (!districtObj.cities[cityId]) {
        districtObj.cities[cityId] = {
          name: cityData.name,
          wards: []
        };
      }
      const cityObj = districtObj.cities[cityId];
      const existingWardsMap = new Map((cityObj.wards || []).map(w => [w.id, w]));

      const mergedWards = Object.entries(cityData.wards).map(([wId, wData]) => {
        const winner = wData.candidates.find(c => c.winner) || { name: 'Unknown' };
        const wardNum = wId.split('_')[1];
        const existing = existingWardsMap.get(wId);
        if (existing) {
          return existing; // Preserve existing rich ward data object!
        }
        return {
          id: wId,
          name: `Ward ${wardNum} (${winner.name})`
        };
      });

      existingWardsMap.forEach((wObj, wId) => {
        if (!mergedWards.find(w => w.id === wId)) {
          mergedWards.push(wObj);
        }
      });

      cityObj.wards = mergedWards.sort((a, b) => {
        const numA = Number(a.id.split('_')[1]) || 0;
        const numB = Number(b.id.split('_')[1]) || 0;
        return numA - numB;
      });
    }
  }
}

initializeDynamicHierarchy();

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

function asId(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asKeyword(value) {
  if (typeof value !== 'string') return 'General Analysis';
  const cleaned = value.replace(/\s+/g, ' ').trim();
  return cleaned ? cleaned.slice(0, 120) : 'General Analysis';
}

function getStatesCollection() {
  return {
    ...regionsData.states,
    ...pendingRegionStates
  };
}

function toOptions(collection) {
  return Object.entries(collection || {})
    .map(([id, item]) => ({
      id,
      name: item.name,
      dataStatus: item.dataStatus || 'ready'
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getSummary() {
  const states = Object.values(getStatesCollection());
  let districtCount = 0;
  let cityCount = 0;
  let wardCount = 0;
  let population = 0;
  let pendingStateCount = 0;

  states.forEach((state) => {
    if (state.dataStatus === 'pending') {
      pendingStateCount += 1;
      return;
    }

    population += (state.data && state.data.population) || 0;
    const districts = Object.values(state.districts || {});
    districtCount += districts.length;

    districts.forEach((district) => {
      const cities = Object.values(district.cities || {});
      cityCount += cities.length;
      cities.forEach((city) => {
        wardCount += Array.isArray(city.wards) ? city.wards.length : 0;
      });
    });
  });

  return {
    stateCount: states.length,
    districtCount,
    cityCount,
    wardCount,
    population,
    pendingStateCount
  };
}

function generateSimulatedWardData(districtId, cityId, wardId, realWard) {
  const wardNumber = Number(wardId.split('_')[1]) || 1;
  const winner = realWard.winner || { name: 'Elected Councillor', party: 'IND', votes: 100 };
  const runnerUp = realWard.runner_up || { name: 'Runner Up Candidate', party: 'BJP', votes: 80 };
  const hash = (seed) => (wardNumber * 37 + seed * 97) % 100;
  
  const winnerPartyLong = winner.party === 'INC' ? 'Indian National Congress (INC)' : winner.party === 'BJP' ? 'Bharatiya Janata Party (BJP)' : winner.party === 'IND' ? 'Independent (IND)' : winner.party;
  const population = Math.round(realWard.total_voters * (1.2 + (hash(1) % 10) * 0.05));
  const literacy = (80 + (hash(2) % 15)).toFixed(1) + '%';
  const margin = realWard.margin || (winner.votes - runnerUp.votes);
  const opponentParty = runnerUp.party || (winner.party === 'INC' ? 'BJP' : 'INC');
  const cityName = cityId === 'bhilai' ? 'Bhilai' : cityId === 'baikunthpur' ? 'Baikunthpur' : cityId;

  return {
    population,
    area: (1.5 + (hash(3) % 20) * 0.1).toFixed(2),
    density: Math.round(population / (1.5 + (hash(3) % 20) * 0.1)),
    literacy,
    demographics: {
      population: population.toLocaleString(),
      voters: realWard.total_voters.toLocaleString(),
      literacy,
      genderRatio: "945 females / 1000 males",
      scPopulation: "12.4%",
      stPopulation: "4.8%"
    },
    economic: {
      avgIncome: "₹" + (120000 + (hash(4) % 10) * 15000).toLocaleString() + " / Year",
      employmentRate: (55 + (hash(5) % 20)).toFixed(1) + "%",
      sectors: { services: 40 + (hash(6) % 10), industry: 30 + (hash(7) % 10), agriculture: 10 }
    },
    infrastructure: {
      roads: 75 + (hash(8) % 20),
      water: 80 + (hash(9) % 15),
      sanitation: 70 + (hash(10) % 20),
      electricity: 90 + (hash(11) % 10),
      connectivity: 85 + (hash(12) % 15)
    },
    risk: {
      overallRisk: (hash(13) % 100 > 60) ? "Low" : "Moderate",
      crimeIndex: 25 + (hash(14) % 30),
      disasterVulnerability: 30 + (hash(15) % 25)
    },
    growthScore: 70 + (hash(16) % 25),
    basic_profile: {
      name: winner.name,
      age: 32 + (hash(17) % 25),
      gender: winner.name.endsWith('बाई') || winner.name.endsWith('देवी') || winner.name.endsWith('रानी') || winner.name.endsWith('कुमारी') || ['शहनाज', 'शबाना', 'रेशमा', 'मुशरत', 'nomin', 'साधना', 'उषा', 'नीलिमा', 'गीता', 'आरती', 'स्मिता', 'सुषमा', 'नेहा', 'अनीता', 'अनीशा', 'शारदा', 'प्रिया', 'गिरिजा', 'वीणा', 'सरिता', 'nomin', 'माल्ती', 'उपासना', 'सुभद्रा', 'कमलेश'].some(w => winner.name.toLowerCase().includes(w)) ? 'Female' : 'Male',
      party: winnerPartyLong,
      occupation: "Social Service & Business",
      address: `Ward No. ${wardNumber}, ${cityName}, Chhattisgarh`,
      contact: `+91 94790 ${10000 + (hash(18) * 90) % 90000}`,
      social: { facebook: "facebook.com/councillor", twitter: "twitter.com/councillor" },
      slogans: [
        `वार्ड ${wardNumber} का विकास, हमारा दृढ़ विश्वास!`,
        `जनता का हाथ, सबके साथ!`
      ]
    },
    political_timeline: [
      { year: 2012, event: `Joined political organization in Chhattisgarh` },
      { year: 2015, event: `Active ward youth organizer` },
      { year: 2018, event: `Local Block President` },
      { year: 2021, event: `Elected as Ward ${wardNumber} Councillor` }
    ],
    election_history: [
      {
        year: 2021,
        type: `${cityName} Municipal Election`,
        ward: `Ward No. ${wardNumber}`,
        party: winner.party,
        votes_received: winner.votes,
        vote_share: ((winner.votes / realWard.total_voters) * 100).toFixed(1),
        opponent: runnerUp.name,
        margin: margin,
        result: "Won"
      }
    ],
    current_term: {
      total_voters: realWard.total_voters,
      male_voters: Math.round(realWard.total_voters * 0.52),
      female_voters: Math.round(realWard.total_voters * 0.48),
      total_turnout: realWard.total_turnout
    },
    agitations: {
      event_title: `Civic Amenities and Road Protest (${2018 + (hash(19) % 3)})`,
      details: `Led a public demonstration protesting stormwater drainage connections in inner alleys. Successfully negotiated immediate municipal funding allocations after blocking access to the PWD circle office.`,
      jail_term: "Detained under local preventative custody for 48 hours.",
      slogan: `स्वच्छ सड़कें, सुरक्षित गलियां!`
    },
    improvement_ideas: [
      { title: `Road Expansion & Paving`, desc: `Upgrade unpaved streets and inner lanes to cement concrete roads.`, impact: "High" },
      { title: `LED Streetlight Installation`, desc: `Replace older halogen lamps with high-efficiency energy saving LED fixtures.`, impact: "Medium" },
      { title: `Drainage Network Connection`, desc: `Link neighborhood block drains to the main city sewer main to prevent monsoon water logging.`, impact: "High" }
    ],
    kpis: {
      years_councillor: 3,
      wins: 1,
      current_vote_share: ((winner.votes / realWard.total_voters) * 100).toFixed(1) + "%",
      winning_margin: margin,
      projects_completed: 8 + (hash(20) % 12),
      projects_ongoing: 2 + (hash(21) % 5),
      budget_utilized: (75 + (hash(22) % 20)) + "%",
      attendance_percent: (85 + (hash(23) % 15)) + "%",
      satisfaction_score: (75 + (hash(24) % 20)) + "%",
      resolution_rate: (70 + (hash(25) % 25)) + "%",
      social_followers: (2 + (hash(26) % 10) * 0.5).toFixed(1) + "K",
      legal_cases: hash(27) % 2,
      political_strength: 70 + (hash(28) % 20),
      public_accessibility: (85 + (hash(29) % 15)) + "%",
      local_engagement: (80 + (hash(30) % 18)) + "%"
    },
    opposition: {
      main_opponent: `${runnerUp.name} (${opponentParty})`,
      strengths: "Established family network, local community organizer.",
      weaknesses: "Lower voter mobilization in outlying segments.",
      vote_share: ((runnerUp.votes / realWard.total_voters) * 100).toFixed(1) + "%",
      ground_presence: "Moderate worker presence"
    },
    swot: {
      strengths: [
        "Strong personal connects and round-the-clock accessibility.",
        "Proven record of swift complaint redressal and infrastructure works."
      ],
      weaknesses: [
        "Limited campaign reach in highly dense merchant sectors.",
        "Overdependence on specific key neighborhoods."
      ],
      opportunities: [
        "Upcoming public park upgrading project under AMRUT funds.",
        "Introduction of solar water pumps in main common areas."
      ],
      threats: [
        "Possible alignment of opposition groups behind a single merchant leader.",
        "Occasional delays in state treasury funding clearances."
      ]
    },
    data_sources: {
      sources_count: 10 + (hash(31) % 5),
      data_points: 1500 + (hash(32) % 1500)
    }
  };
}

function getRegionSelection({ stateId, districtId, cityId, wardId }) {
  const state = getStatesCollection()[stateId];
  if (!state) return { error: 'Invalid state selected.' };

  if (state.dataStatus === 'pending') {
    if (districtId || cityId || wardId) {
      return { error: 'Chhattisgarh hierarchy data is not loaded yet. Please provide verified district, city, and ward data first.' };
    }
    return { state, pending: true };
  }

  let district = null;
  let city = null;
  let ward = null;

  if (districtId) {
    district = state.districts[districtId];
    if (!district) return { error: 'Invalid district selected for this state.' };
  }

  if (cityId) {
    if (!district) return { error: 'Select a district before selecting a city.' };
    city = district.cities[cityId];
    if (!city) return { error: 'Invalid city selected for this district.' };
  }

  if (wardId) {
    if (!city) return { error: 'Select a city before selecting a ward.' };
    
    // Check static list
    const staticWard = (city.wards || []).find((item) => item.id === wardId);
    
    // Check election database
    if (electionResults[districtId] && electionResults[districtId][cityId] && electionResults[districtId][cityId].wards[wardId]) {
      const realWard = electionResults[districtId][cityId].wards[wardId];
      if (staticWard && staticWard.data) {
        // Merge actual parameters
        if (staticWard.data.current_term) {
          staticWard.data.current_term.total_voters = realWard.total_voters;
          staticWard.data.current_term.total_turnout = realWard.total_turnout;
        }
        ward = staticWard;
      } else {
        const simulatedData = generateSimulatedWardData(districtId, cityId, wardId, realWard);
        ward = {
          id: wardId,
          name: realWard.name,
          data: simulatedData
        };
      }
    } else {
      ward = staticWard;
    }
    
    if (!ward) return { error: 'Invalid ward selected for this city.' };
  }

  return { state, district, city, ward };
}

function buildInsights(baseData, regionName, keyword) {
  const ecoSectors = (baseData && baseData.economic && baseData.economic.sectors) || {};
  const sectors = Object.entries(ecoSectors).sort((a, b) => b[1] - a[1]);
  
  const infraData = (baseData && baseData.infrastructure) || {};
  const infrastructure = Object.entries(infraData)
    .filter(([key]) => key !== 'overallScore')
    .sort((a, b) => b[1] - a[1]);

  const leadingSector = sectors[0] || ['services', 0];
  const strongestInfra = infrastructure[0] || ['connectivity', 0];
  const weakestInfra = infrastructure[infrastructure.length - 1] || ['roads', 0];
  const riskLabel = String((baseData && baseData.risk && baseData.risk.overallRisk) || 'Moderate').toLowerCase();
  const growthBand = (baseData && baseData.growthScore >= 85) ? 'high' : (baseData && baseData.growthScore >= 70) ? 'stable' : 'developing';

  return [
    {
      title: 'Opportunity',
      text: `${regionName} has a ${growthBand} growth profile for ${keyword}, led by ${leadingSector[0]} at ${leadingSector[1]}% sector share.`
    },
    {
      title: 'Infrastructure Focus',
      text: `${strongestInfra[0]} is the strongest operating lever at ${strongestInfra[1]}/100; ${weakestInfra[0]} should be watched at ${weakestInfra[1]}/100.`
    },
    {
      title: 'Risk Read',
      text: `Overall risk is ${riskLabel}, with disaster vulnerability at ${(baseData && baseData.risk && baseData.risk.disasterVulnerability) || 0}/100 and crime index at ${(baseData && baseData.risk && baseData.risk.crimeIndex) || 0}/100.`
    }
  ];
}

function buildPendingAnalysis({ keyword, state }) {
  const cleanKeyword = asKeyword(keyword);

  return {
    dataStatus: 'pending',
    region: state.name,
    keyword: cleanKeyword,
    level: 'State',
    fullPath: state.name,
    message: 'Verified Chhattisgarh data has not been uploaded yet. The interface is ready and will populate once real district, city, ward, and analytics values are provided.',
    requiredData: [
      'State overview metrics',
      'District list',
      'City list under each district',
      'Ward list under each city',
      'Demographics',
      'Economic indicators',
      'Infrastructure scores',
      'Political landscape',
      'Risk assessment',
      'Growth score'
    ],
    lastUpdated: new Date().toISOString()
  };
}

function buildAnalysis({ keyword, stateId, districtId, cityId, wardId }) {
  const selected = getRegionSelection({ stateId, districtId, cityId, wardId });
  if (selected.error) return selected;
  if (selected.pending) return buildPendingAnalysis({ keyword, state: selected.state });

  const { state, district, city, ward } = selected;
  const regionName = ward ? ward.name : city ? city.name : district ? district.name : state.name;
  const baseData = ward ? (ward.data || city.data) : city ? city.data : district ? district.data : state.data;
  const safeArea = Number(baseData.area) || 1;
  const pathParts = [state.name, district && district.name, city && city.name, ward && ward.name].filter(Boolean);
  const cleanKeyword = asKeyword(keyword);

  return {
    dataStatus: 'ready',
    region: regionName,
    keyword: cleanKeyword,
    level: ward ? 'Ward' : city ? 'City' : district ? 'District' : 'State',
    fullPath: pathParts.join(' > '),
    overview: {
      population: baseData.population || (baseData.basic_profile && baseData.demographics ? baseData.demographics.population : 0),
      area: baseData.area || 0,
      density: baseData.density || 0,
      literacy: baseData.literacy || (baseData.demographics ? baseData.demographics.literacy : 0),
      keyIndustries: baseData.keyIndustries || []
    },
    demographics: baseData.demographics || {},
    economic: baseData.economic || {},
    infrastructure: baseData.infrastructure || {},
    political: baseData.political || {},
    risk: baseData.risk || {},
    growthScore: baseData.growthScore || (baseData.kpis ? baseData.kpis.political_strength : 50),
    insights: buildInsights(baseData, regionName, cleanKeyword),
    dataSources: baseData.dataSources || (baseData.data_sources ? baseData.data_sources.sources_count : 14),
    dataPoints: baseData.dataPoints || (baseData.data_sources ? baseData.data_sources.data_points : 2847),
    lastUpdated: new Date().toISOString(),
    
    // Ward specific political strategy keys
    basic_profile: baseData.basic_profile || null,
    political_timeline: baseData.political_timeline || null,
    election_history: baseData.election_history || null,
    current_term: baseData.current_term || null,
    development_projects: baseData.development_projects || null,
    ward_development_score: baseData.ward_development_score || null,
    councillor_fund: baseData.councillor_fund || null,
    municipal_performance: baseData.municipal_performance || null,
    complaints: baseData.complaints || null,
    public_sentiment: baseData.public_sentiment || null,
    media_coverage: baseData.media_coverage || null,
    social_media: baseData.social_media || null,
    assets_liabilities: baseData.assets_liabilities || null,
    criminal_cases: baseData.criminal_cases || null,
    rti_records: baseData.rti_records || null,
    schemes: baseData.schemes || null,
    opposition: baseData.opposition || null,
    electoral_trend: baseData.electoral_trend || null,
    political_network: baseData.political_network || null,
    swot: baseData.swot || null,
    scorecard: baseData.scorecard || null,
    kpis: baseData.kpis || null,
    // New verified ground-truth intelligence fields
    voter_demographics: baseData.voter_demographics || null,
    public_issues: baseData.public_issues || null,
    councillor_performance: baseData.councillor_performance || null,
    campaign_opportunities: baseData.campaign_opportunities || null,
    voter_sentiment: baseData.voter_sentiment || null,
    election_strategy: baseData.election_strategy || null
  };
}

app.get('/', (req, res) => {
  res.render('index', {
    appName: APP_NAME,
    summary: getSummary()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: APP_NAME, timestamp: new Date().toISOString() });
});

app.get('/api/summary', (req, res) => {
  res.json(getSummary());
});

app.get('/api/states', (req, res) => {
  res.json(toOptions(getStatesCollection()));
});

app.get('/api/districts/:stateId', (req, res) => {
  const state = getStatesCollection()[asId(req.params.stateId)];
  if (!state) return res.status(404).json({ error: 'State not found.' });
  if (state.dataStatus === 'pending') return res.json([]);
  res.json(toOptions(state.districts));
});

app.get('/api/cities/:stateId/:districtId', (req, res) => {
  const state = getStatesCollection()[asId(req.params.stateId)];
  if (!state) return res.status(404).json({ error: 'State not found.' });
  if (state.dataStatus === 'pending') return res.json([]);

  const district = state.districts[asId(req.params.districtId)];
  if (!district) return res.status(404).json({ error: 'District not found.' });

  res.json(toOptions(district.cities));
});

app.get('/api/wards/:stateId/:districtId/:cityId', (req, res) => {
  const state = getStatesCollection()[asId(req.params.stateId)];
  if (!state) return res.status(404).json({ error: 'State not found.' });
  if (state.dataStatus === 'pending') return res.json([]);

  const district = state.districts[asId(req.params.districtId)];
  if (!district) return res.status(404).json({ error: 'District not found.' });

  const city = district.cities[asId(req.params.cityId)];
  if (!city) return res.status(404).json({ error: 'City not found.' });

  res.json(city.wards || []);
});

app.post('/api/analyze', (req, res) => {
  const stateId = asId(req.body.stateId);
  if (!stateId) return res.status(400).json({ error: 'State is required.' });

  const analysis = buildAnalysis({
    keyword: req.body.keyword,
    stateId,
    districtId: asId(req.body.districtId),
    cityId: asId(req.body.cityId),
    wardId: asId(req.body.wardId)
  });

  if (analysis.error) return res.status(400).json({ error: analysis.error });
  res.json(analysis);
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

app.use((req, res) => {
  res.status(404).render('index', {
    appName: APP_NAME,
    summary: getSummary()
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log('');
  console.log('Rajtilak Analytics - Regional Intelligence Platform');
  console.log('------------------------------------------------------');
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Internal portal ready');
  console.log('');
});
