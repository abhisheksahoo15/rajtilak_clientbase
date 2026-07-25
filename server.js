const express = require('express');
const path = require('path');
const regionsData = require('./data/regions');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const APP_NAME = 'Rajtilak Analytics';

const pendingRegionStates = {};

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
    ward = (city.wards || []).find((item) => item.id === wardId);
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
    kpis: baseData.kpis || null
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
