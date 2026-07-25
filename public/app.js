const STORAGE_KEY = 'rajtilak.chhattisgarh.intakeDraft.v1';

const formSections = [
  {
    id: 'source-record',
    key: 'sourceRecord',
    title: 'Source & Verification',
    description: 'Capture who entered the record and where each verified source came from.',
    fields: [
      text('sourceRecord.enteredBy', 'Entered By', 'Agent name'),
      text('sourceRecord.sourceDepartment', 'Source Department', 'Department or office'),
      text('sourceRecord.sourceDocument', 'Source Document', 'Document title or reference number'),
      url('sourceRecord.sourceUrl', 'Source URL', 'https://...'),
      date('sourceRecord.sourceDate', 'Source Date'),
      select('sourceRecord.verificationStatus', 'Verification Status', ['Draft', 'Verified', 'Needs Review', 'Rejected']),
      textarea('sourceRecord.notes', 'Verification Notes', 'Notes about source quality, assumptions, or missing proof', 3, 3)
    ]
  },
  {
    id: 'state-overview',
    key: 'stateOverview',
    title: 'Chhattisgarh Overview',
    description: 'State-level profile fields. Enter only verified official values.',
    fields: [
      text('stateOverview.stateName', 'State Name', 'Example: Chhattisgarh'),
      text('stateOverview.capital', 'Capital', 'Enter capital'),
      number('stateOverview.totalDistricts', 'Total Districts', 'Enter verified count'),
      text('stateOverview.population', 'Population', 'Enter verified population or census reference'),
      number('stateOverview.assemblyConstituencies', 'Assembly Constituencies', 'Enter count'),
      number('stateOverview.lokSabhaConstituencies', 'Lok Sabha Constituencies', 'Enter count'),
      textarea('stateOverview.majorMunicipalCorporations', 'Major Municipal Corporations', 'One corporation per line', 3),
      url('stateOverview.officialWebsite', 'Official Website', 'https://...')
    ]
  },
  {
    id: 'district-profile',
    key: 'district',
    title: 'District Database',
    description: 'Administrative details for each district record.',
    fields: [
      text('district.name', 'District Name', 'Enter district name'),
      text('district.code', 'District Code', 'Enter official code'),
      text('district.collector', 'Collector', 'Enter name'),
      text('district.sp', 'SP', 'Enter name'),
      number('district.population', 'Population', 'Enter verified population'),
      number('district.area', 'Area', 'Area in sq km'),
      number('district.tehsilCount', 'Number of Tehsils', 'Enter count'),
      number('district.blockCount', 'Number of Blocks', 'Enter count'),
      number('district.municipalCorporationCount', 'Municipal Corporations', 'Enter count'),
      number('district.municipalCouncilCount', 'Municipal Councils', 'Enter count'),
      number('district.nagarPanchayatCount', 'Nagar Panchayats', 'Enter count'),
      number('district.gramPanchayatCount', 'Gram Panchayats', 'Enter count'),
      textarea('district.assemblyConstituencies', 'Assembly Constituencies', 'List constituencies', 2),
      text('district.lokSabhaConstituency', 'Lok Sabha Constituency', 'Enter constituency'),
      url('district.officialWebsite', 'Official Website', 'https://...')
    ]
  },
  {
    id: 'district-bodies',
    key: 'districtBodies',
    title: 'Inside Every District',
    description: 'Store all administrative bodies and settlements under a district.',
    fields: [
      textarea('districtBodies.tehsils', 'All Tehsils', 'One item per line', 2),
      textarea('districtBodies.developmentBlocks', 'All Development Blocks', 'One item per line', 2),
      textarea('districtBodies.urbanLocalBodies', 'All Urban Local Bodies', 'One item per line', 2),
      textarea('districtBodies.ruralBodies', 'All Rural Bodies', 'One item per line', 2),
      textarea('districtBodies.cities', 'All Cities', 'One item per line', 2),
      textarea('districtBodies.towns', 'All Towns', 'One item per line', 2),
      textarea('districtBodies.villages', 'All Villages', 'One item per line', 3)
    ]
  },
  {
    id: 'city-profile',
    key: 'city',
    title: 'City / Municipality',
    description: 'City and urban local body metadata.',
    fields: [
      text('city.name', 'City Name', 'Enter city name'),
      select('city.municipalType', 'Municipal Type', ['Corporation', 'Municipal Council', 'Nagar Panchayat', 'Other']),
      number('city.population', 'Population', 'Enter verified population'),
      text('city.mayor', 'Mayor', 'Enter name'),
      text('city.commissioner', 'Commissioner', 'Enter name'),
      number('city.zoneCount', 'Number of Zones', 'Enter count'),
      number('city.wardCount', 'Number of Wards', 'Enter count'),
      url('city.officialWebsite', 'Official Website', 'https://...')
    ]
  },
  {
    id: 'corporation-profile',
    key: 'municipalCorporation',
    title: 'Municipal Corporation Structure',
    description: 'Corporation-level data for municipal administration and elections.',
    fields: [
      text('municipalCorporation.name', 'Corporation Name', 'Enter corporation name'),
      text('municipalCorporation.mayor', 'Mayor', 'Enter name'),
      text('municipalCorporation.commissioner', 'Municipal Commissioner', 'Enter name'),
      number('municipalCorporation.totalZones', 'Total Zones', 'Enter count'),
      number('municipalCorporation.totalWards', 'Total Wards', 'Enter count'),
      number('municipalCorporation.totalPopulation', 'Total Population', 'Enter verified population'),
      text('municipalCorporation.annualBudget', 'Annual Budget', 'Enter amount and year'),
      text('municipalCorporation.politicalControl', 'Political Control', 'Enter verified party/control'),
      text('municipalCorporation.previousElection', 'Previous Election', 'Enter year/details'),
      text('municipalCorporation.currentElection', 'Current Election', 'Enter year/details'),
      url('municipalCorporation.website', 'Corporation Website', 'https://...')
    ]
  },
  {
    id: 'bhilai-focus',
    key: 'bhilai',
    title: 'Bhilai Municipal Corporation Focus',
    description: 'Dedicated fields for Bhilai Nagar Nigam. Leave blank until verified data is provided.',
    fields: [
      text('bhilai.corporationName', 'Corporation Name', 'Bhilai Municipal Corporation'),
      text('bhilai.district', 'District', 'Durg'),
      text('bhilai.mayor', 'Mayor', 'Enter verified name'),
      text('bhilai.commissioner', 'Commissioner', 'Enter verified name'),
      number('bhilai.zoneCount', 'Number of Zones', 'Enter verified count'),
      number('bhilai.wardCount', 'Number of Wards', 'Enter verified count'),
      number('bhilai.population', 'Population', 'Enter verified population'),
      text('bhilai.budget', 'Budget', 'Enter amount and year'),
      text('bhilai.partyInPower', 'Political Party in Power', 'Enter verified party'),
      url('bhilai.officialWebsite', 'Official Website', 'https://...')
    ]
  },
  {
    id: 'zone-profile',
    key: 'zone',
    title: 'Zone Structure',
    description: 'Municipal zone-level data.',
    fields: [
      text('zone.number', 'Zone Number', 'Enter zone number'),
      text('zone.name', 'Zone Name', 'Enter zone name'),
      text('zone.officer', 'Officer', 'Enter officer name'),
      textarea('zone.address', 'Address', 'Enter zone office address', 2),
      tel('zone.phone', 'Phone', 'Enter phone number'),
      number('zone.wardCount', 'Number of Wards', 'Enter count'),
      number('zone.population', 'Population', 'Enter verified population')
    ]
  },
  {
    id: 'ward-database',
    key: 'ward',
    title: 'Ward Database',
    description: 'Primary ward-level record. This is the most important section for Bhilai operations.',
    fields: [
      text('ward.number', 'Ward Number', 'Enter ward number'),
      text('ward.name', 'Ward Name', 'Enter ward name'),
      select('ward.reservedCategory', 'Reserved Category', ['General', 'SC', 'ST', 'OBC', 'Women', 'Other']),
      number('ward.population', 'Population', 'Enter verified population'),
      number('ward.male', 'Male', 'Enter count'),
      number('ward.female', 'Female', 'Enter count'),
      number('ward.youth', 'Youth', 'Enter count'),
      number('ward.seniorCitizens', 'Senior Citizens', 'Enter count'),
      text('ward.literacy', 'Literacy', 'Enter rate or source value'),
      textarea('ward.majorCommunities', 'Major Communities', 'One item per line', 2),
      textarea('ward.majorOccupation', 'Major Occupation', 'One item per line', 2),
      text('ward.area', 'Area', 'Enter area and unit'),
      number('ward.pollingBoothCount', 'Polling Booth Count', 'Enter count'),
      textarea('ward.boothNumbers', 'Booth Numbers', 'One booth per line', 2),
      textarea('ward.boothLocations', 'Booth Locations', 'One location per line', 2),
      url('ward.googleMaps', 'Google Maps', 'Map link'),
      text('ward.currentCouncillor', 'Current Councillor', 'Enter verified name'),
      text('ward.previousCouncillor', 'Previous Councillor', 'Enter verified name'),
      text('ward.politicalParty', 'Political Party', 'Enter verified party'),
      number('ward.winningMargin', 'Winning Margin', 'Enter votes'),
      number('ward.votes', 'Votes', 'Enter total/winner votes'),
      text('ward.runnerUp', 'Runner Up', 'Enter name'),
      text('ward.votePercentage', 'Vote Percentage', 'Enter percentage'),
      number('ward.electionYear', 'Election Year', 'YYYY')
    ]
  },
  {
    id: 'ward-development',
    key: 'wardDevelopment',
    title: 'Ward Development & Public Assets',
    description: 'Infrastructure, public issue, institution, and local asset tracking.',
    fields: [
      textarea('wardDevelopment.road', 'Road', 'Status, issues, or project notes', 2),
      textarea('wardDevelopment.drainage', 'Drainage', 'Status, issues, or project notes', 2),
      textarea('wardDevelopment.water', 'Water', 'Status, issues, or project notes', 2),
      textarea('wardDevelopment.streetLights', 'Street Lights', 'Status, issues, or project notes', 2),
      textarea('wardDevelopment.schools', 'Schools', 'List schools or status', 2),
      textarea('wardDevelopment.hospitals', 'Hospitals', 'List hospitals or status', 2),
      textarea('wardDevelopment.parks', 'Parks', 'List parks or status', 2),
      textarea('wardDevelopment.communityHall', 'Community Hall', 'Details', 2),
      textarea('wardDevelopment.pendingProjects', 'Pending Projects', 'One project per line', 2),
      textarea('wardDevelopment.completedProjects', 'Completed Projects', 'One project per line', 2),
      text('wardDevelopment.wardBudget', 'Ward Budget', 'Enter amount and year'),
      text('wardDevelopment.councillorFundUtilization', 'Councillor Fund Utilization', 'Enter amount/status'),
      textarea('wardDevelopment.complaints', 'Complaints', 'Complaint summary', 2),
      textarea('wardDevelopment.publicIssues', 'Public Issues', 'One issue per line', 2),
      textarea('wardDevelopment.localLeaders', 'Important Local Leaders', 'One leader per line', 2),
      textarea('wardDevelopment.ngos', 'NGOs', 'One NGO per line', 2),
      textarea('wardDevelopment.rwas', 'Resident Welfare Associations', 'One association per line', 2),
      textarea('wardDevelopment.religiousPlaces', 'Religious Places', 'One place per line', 2),
      text('wardDevelopment.policeStation', 'Police Station', 'Enter nearest station'),
      text('wardDevelopment.nearestHospital', 'Nearest Hospital', 'Enter hospital'),
      textarea('wardDevelopment.primarySchools', 'Primary Schools', 'One school per line', 2),
      textarea('wardDevelopment.colleges', 'Colleges', 'One college per line', 2),
      textarea('wardDevelopment.markets', 'Markets', 'One market per line', 2),
      textarea('wardDevelopment.industries', 'Industries', 'One industry per line', 2),
      textarea('wardDevelopment.slumAreas', 'Slum Areas', 'One area per line', 2),
      textarea('wardDevelopment.socioEconomicData', 'Socio Economic Data', 'Verified socio-economic notes', 3)
    ]
  },
  {
    id: 'ward-political-intelligence',
    key: 'wardPolitical',
    title: 'Ward Political Intelligence',
    description: 'Campaign, sentiment, influence, and documentation fields.',
    fields: [
      textarea('wardPolitical.strengths', 'Strengths', 'One point per line', 2),
      textarea('wardPolitical.weaknesses', 'Weaknesses', 'One point per line', 2),
      textarea('wardPolitical.politicalInfluence', 'Political Influence', 'Notes', 2),
      textarea('wardPolitical.campaignHistory', 'Campaign History', 'Notes', 2),
      textarea('wardPolitical.campaignStrategy', 'Campaign Strategy', 'Notes', 2),
      textarea('wardPolitical.volunteerNetwork', 'Volunteer Network', 'Names or groups', 2),
      textarea('wardPolitical.boothWorkers', 'Booth Workers', 'One worker per line', 2),
      textarea('wardPolitical.whatsappGroups', 'WhatsApp Groups', 'Group names or links', 2),
      textarea('wardPolitical.facebookPages', 'Facebook Pages', 'Page names or links', 2),
      textarea('wardPolitical.instagram', 'Instagram', 'Handles or links', 2),
      textarea('wardPolitical.publicSentiment', 'Public Sentiment', 'Verified notes', 2),
      textarea('wardPolitical.mediaCoverage', 'Media Coverage', 'Links or notes', 2),
      textarea('wardPolitical.rtiRecords', 'RTI Records', 'References or links', 2),
      textarea('wardPolitical.tenderDetails', 'Tender Details', 'References or links', 2),
      textarea('wardPolitical.developmentStatus', 'Development Status', 'Verified notes', 2)
    ]
  },
  {
    id: 'booth-level',
    key: 'booth',
    title: 'Booth Level Database',
    description: 'Polling booth and voter intelligence fields.',
    fields: [
      text('booth.number', 'Booth Number', 'Enter booth number'),
      text('booth.pollingStationName', 'Polling Station Name', 'Enter polling station'),
      textarea('booth.location', 'Location', 'Address or landmark', 2),
      text('booth.gps', 'GPS', 'Latitude, longitude'),
      number('booth.totalVoters', 'Total Voters', 'Enter count'),
      number('booth.male', 'Male', 'Enter count'),
      number('booth.female', 'Female', 'Enter count'),
      number('booth.thirdGender', 'Third Gender', 'Enter count'),
      number('booth.firstTimeVoters', 'First Time Voters', 'Enter count'),
      number('booth.seniorCitizens', 'Senior Citizens', 'Enter count'),
      text('booth.previousWinningParty', 'Previous Winning Party', 'Enter party'),
      text('booth.incharge', 'Booth Incharge', 'Enter name'),
      textarea('booth.workers', 'Booth Workers', 'One worker per line', 2),
      textarea('booth.influentialFamilies', 'Influential Families', 'One family per line', 2),
      textarea('booth.influentialPersons', 'Influential Persons', 'One person per line', 2),
      select('booth.sensitiveBooth', 'Sensitive Booth', ['No', 'Yes', 'Unknown']),
      select('booth.criticalBooth', 'Critical Booth', ['No', 'Yes', 'Unknown']),
      text('booth.votingPercentage', 'Voting Percentage', 'Enter percentage'),
      textarea('booth.lastElectionResult', 'Last Election Result', 'Verified result details', 2)
    ]
  },
  {
    id: 'councillor-profile',
    key: 'councillor',
    title: 'Councillor Database',
    description: 'Councillor profile, election, performance, legal, and public-image fields.',
    fields: [
      text('councillor.name', 'Name', 'Enter name'),
      url('councillor.photo', 'Photo', 'Image URL or file reference'),
      text('councillor.wardNumber', 'Ward Number', 'Enter ward number'),
      text('councillor.wardName', 'Ward Name', 'Enter ward name'),
      text('councillor.politicalParty', 'Political Party', 'Enter party'),
      number('councillor.age', 'Age', 'Enter age'),
      text('councillor.education', 'Education', 'Enter education'),
      text('councillor.occupation', 'Occupation', 'Enter occupation'),
      tel('councillor.mobile', 'Mobile', 'Enter phone'),
      email('councillor.email', 'Email', 'Enter email'),
      textarea('councillor.socialMedia', 'Social Media', 'Links or handles', 2),
      textarea('councillor.electionHistory', 'Election History', 'Verified history', 2),
      number('councillor.winningMargin', 'Winning Margin', 'Enter votes'),
      text('councillor.assets', 'Assets', 'Enter verified amount/source'),
      text('councillor.liabilities', 'Liabilities', 'Enter verified amount/source'),
      textarea('councillor.criminalCases', 'Criminal Cases', 'Verified details or none', 2),
      url('councillor.electionAffidavit', 'Election Affidavit', 'Affidavit link'),
      textarea('councillor.performance', 'Performance', 'Notes'),
      text('councillor.attendance', 'Attendance', 'Enter rate/count'),
      textarea('councillor.developmentWork', 'Development Work', 'One item per line', 2),
      textarea('councillor.publicImage', 'Public Image', 'Verified notes', 2),
      textarea('councillor.strengths', 'Strengths', 'One point per line', 2),
      textarea('councillor.weaknesses', 'Weaknesses', 'One point per line', 2),
      text('councillor.politicalMentor', 'Political Mentor', 'Enter name'),
      text('councillor.opposition', 'Opposition', 'Enter main opposition'),
      textarea('councillor.futureAspirations', 'Future Aspirations', 'Notes', 2),
      textarea('councillor.mediaArticles', 'Media Articles', 'Links or references', 2),
      textarea('councillor.rtis', 'RTIs', 'Links or references', 2),
      textarea('councillor.courtCases', 'Court Cases', 'Verified details or none', 2)
    ]
  },
  {
    id: 'election-database',
    key: 'election',
    title: 'Election Database',
    description: 'Ward-wise and booth-wise election records.',
    fields: [
      number('election.year', 'Election Year', 'YYYY'),
      text('election.ward', 'Ward', 'Ward number/name'),
      textarea('election.candidates', 'Candidates', 'One candidate per line'),
      textarea('election.votes', 'Votes', 'Candidate-wise votes'),
      number('election.winningMargin', 'Winning Margin', 'Enter votes'),
      number('election.nota', 'NOTA', 'Enter votes'),
      text('election.turnout', 'Turnout', 'Enter percentage'),
      text('election.party', 'Party', 'Winning/major party'),
      textarea('election.manifesto', 'Manifesto', 'Notes or link'),
      text('election.campaignBudget', 'Campaign Budget', 'Enter amount/source'),
      textarea('election.starCampaigners', 'Star Campaigners', 'One name per line'),
      textarea('election.majorIssues', 'Major Issues', 'One issue per line'),
      textarea('election.boothWiseResults', 'Booth Wise Results', 'Structured notes or CSV reference', 3),
      textarea('election.wardWiseResults', 'Ward Wise Results', 'Structured notes or CSV reference', 3)
    ]
  },
  {
    id: 'project-database',
    key: 'developmentProject',
    title: 'Development Project Database',
    description: 'Tender, department, contractor, timeline, and beneficiary tracking.',
    fields: [
      text('developmentProject.name', 'Project Name', 'Enter project name'),
      text('developmentProject.ward', 'Ward', 'Ward number/name'),
      text('developmentProject.estimatedCost', 'Estimated Cost', 'Enter amount'),
      text('developmentProject.tenderNumber', 'Tender Number', 'Enter tender number'),
      text('developmentProject.contractor', 'Contractor', 'Enter name'),
      text('developmentProject.department', 'Department', 'Enter department'),
      date('developmentProject.startDate', 'Start Date'),
      date('developmentProject.completionDate', 'Completion Date'),
      select('developmentProject.currentStatus', 'Current Status', ['Not Started', 'In Progress', 'Completed', 'Delayed', 'On Hold', 'Cancelled']),
      textarea('developmentProject.photos', 'Photos', 'File names or links'),
      textarea('developmentProject.documents', 'Documents', 'File names or links'),
      textarea('developmentProject.rti', 'RTI', 'Reference or link'),
      url('developmentProject.googleMaps', 'Google Maps', 'Map link'),
      textarea('developmentProject.beneficiaries', 'Beneficiaries', 'Names/groups/counts'),
      textarea('developmentProject.publicFeedback', 'Public Feedback', 'Verified feedback', 2)
    ]
  },
  {
    id: 'complaint-database',
    key: 'citizenComplaint',
    title: 'Citizen Complaint Database',
    description: 'Complaint registration and resolution tracking.',
    fields: [
      text('citizenComplaint.id', 'Complaint ID', 'Enter ID'),
      text('citizenComplaint.ward', 'Ward', 'Ward number/name'),
      text('citizenComplaint.citizenName', 'Citizen Name', 'Enter name'),
      tel('citizenComplaint.phone', 'Phone', 'Enter phone'),
      textarea('citizenComplaint.address', 'Address', 'Enter address', 2),
      select('citizenComplaint.issueType', 'Issue Type', ['Road', 'Water', 'Drainage', 'Garbage', 'Street Light', 'Electricity', 'Health', 'Education', 'Transport', 'Other']),
      date('citizenComplaint.date', 'Date'),
      select('citizenComplaint.status', 'Status', ['New', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Rejected']),
      text('citizenComplaint.officerAssigned', 'Officer Assigned', 'Enter name'),
      text('citizenComplaint.resolutionTime', 'Resolution Time', 'Enter time or SLA'),
      textarea('citizenComplaint.notes', 'Notes', 'Action notes', 2)
    ]
  },
  {
    id: 'political-intelligence',
    key: 'politicalIntelligence',
    title: 'Political Intelligence Database',
    description: 'Ward, booth, community, issue, campaign, and prediction intelligence.',
    fields: [
      textarea('politicalIntelligence.wardWisePartyStrength', 'Ward Wise Party Strength', 'Verified notes', 2),
      textarea('politicalIntelligence.boothWisePartyStrength', 'Booth Wise Party Strength', 'Verified notes', 2),
      textarea('politicalIntelligence.influentialLeaders', 'Influential Leaders', 'One leader per line', 2),
      textarea('politicalIntelligence.socialWorkers', 'Social Workers', 'One worker per line', 2),
      textarea('politicalIntelligence.communityHeads', 'Community Heads', 'One person per line', 2),
      textarea('politicalIntelligence.youthLeaders', 'Youth Leaders', 'One leader per line', 2),
      textarea('politicalIntelligence.womensGroups', 'Women Groups', 'One group per line', 2),
      textarea('politicalIntelligence.casteInfluence', 'Caste Influence', 'Verified notes', 2),
      textarea('politicalIntelligence.religionDistribution', 'Religion Distribution', 'Verified notes', 2),
      textarea('politicalIntelligence.issueHeatmap', 'Issue Heatmap', 'Area-wise issues', 2),
      textarea('politicalIntelligence.swingVoters', 'Swing Voters', 'Verified notes', 2),
      textarea('politicalIntelligence.strongBooths', 'Strong Booths', 'One booth per line', 2),
      textarea('politicalIntelligence.weakBooths', 'Weak Booths', 'One booth per line', 2),
      textarea('politicalIntelligence.campaignSuggestions', 'Campaign Suggestions', 'Action notes', 2),
      textarea('politicalIntelligence.riskAnalysis', 'Risk Analysis', 'Verified notes', 2),
      text('politicalIntelligence.predictionScore', 'Prediction Score', 'Enter score with source/model')
    ]
  }
];

function text(name, label, placeholder = '', span = 1) {
  return { name, label, placeholder, type: 'text', span };
}

function number(name, label, placeholder = '', span = 1) {
  return { name, label, placeholder, type: 'number', span };
}

function textarea(name, label, placeholder = '', rows = 3, span = 2) {
  return { name, label, placeholder, type: 'textarea', rows, span };
}

function select(name, label, options, span = 1) {
  return { name, label, type: 'select', options, span };
}

function url(name, label, placeholder = '', span = 1) {
  return { name, label, placeholder, type: 'url', span };
}

function email(name, label, placeholder = '', span = 1) {
  return { name, label, placeholder, type: 'email', span };
}

function tel(name, label, placeholder = '', span = 1) {
  return { name, label, placeholder, type: 'tel', span };
}

function date(name, label, span = 1) {
  return { name, label, type: 'date', span };
}

const form = document.getElementById('dataIntakeForm');
const sectionMount = document.getElementById('sectionMount');
const sectionNav = document.getElementById('sectionNav');
const completionScore = document.getElementById('completionScore');
const completionText = document.getElementById('completionText');
const completionBar = document.getElementById('completionBar');
const pathPreview = document.getElementById('pathPreview');
const jsonPreview = document.getElementById('jsonPreview');
const formStatus = document.getElementById('formStatus');
const saveDraftButton = document.getElementById('saveDraftButton');
const exportDraftButton = document.getElementById('exportDraftButton');
const copyJsonButton = document.getElementById('copyJsonButton');
const clearDraftButton = document.getElementById('clearDraftButton');
const importDraftButton = document.getElementById('importDraftButton');
const importDraftInput = document.getElementById('importDraftInput');

function renderSections() {
  sectionMount.innerHTML = '';
  sectionNav.innerHTML = '';

  formSections.forEach((section) => {
    const navLink = document.createElement('a');
    navLink.href = `#${section.id}`;
    navLink.textContent = section.title;
    sectionNav.appendChild(navLink);

    const article = document.createElement('section');
    article.className = 'form-card';
    article.id = section.id;

    const heading = document.createElement('div');
    heading.className = 'card-heading';
    heading.innerHTML = `
      <div>
        <p class="eyebrow">${section.key}</p>
        <h2>${section.title}</h2>
      </div>
      <span class="record-badge">${section.fields.length} fields</span>
    `;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent = section.description;

    const grid = document.createElement('div');
    grid.className = 'field-grid';
    section.fields.forEach((field) => grid.appendChild(renderField(field)));

    article.append(heading, description, grid);
    sectionMount.appendChild(article);
  });
}

function renderField(field) {
  const wrapper = document.createElement('label');
  wrapper.className = `field-control field-span-${field.span || 1}`;
  wrapper.textContent = field.label;

  let control;
  if (field.type === 'textarea') {
    control = document.createElement('textarea');
    control.rows = field.rows || 3;
  } else if (field.type === 'select') {
    control = document.createElement('select');
    control.appendChild(new Option('Select', ''));
    field.options.forEach((option) => control.appendChild(new Option(option, option)));
  } else {
    control = document.createElement('input');
    control.type = field.type || 'text';
  }

  control.name = field.name;
  control.placeholder = field.placeholder || '';
  control.dataset.label = field.label;
  control.autocomplete = 'off';
  wrapper.appendChild(control);
  return wrapper;
}

function assignNested(target, path, value) {
  const parts = path.split('.');
  let cursor = target;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      cursor[part] = value;
      return;
    }
    cursor[part] = cursor[part] || {};
    cursor = cursor[part];
  });
}

function splitTextareaValue(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFormData() {
  const payload = {
    meta: {
      formName: 'Chhattisgarh Administrative and Political Data Intake',
      sourcePolicy: 'Verified source data only. Empty values mean data not provided yet.',
      exportedAt: new Date().toISOString()
    }
  };

  const controls = [...form.querySelectorAll('input[name], select[name], textarea[name]')];
  controls.forEach((control) => {
    const rawValue = control.value.trim();
    const value = control.tagName === 'TEXTAREA' ? splitTextareaValue(rawValue) : rawValue;
    assignNested(payload, control.name, value);
  });

  return payload;
}

function setFormStatus(message, type = 'info') {
  formStatus.textContent = message;
  formStatus.classList.toggle('success', type === 'success');
  formStatus.classList.toggle('error', type === 'error');
}

function updatePathPreview() {
  const keys = [
    'hierarchy.country',
    'hierarchy.state',
    'hierarchy.district',
    'hierarchy.subdivision',
    'hierarchy.tehsil',
    'hierarchy.developmentBlock',
    'hierarchy.city',
    'hierarchy.zone',
    'hierarchy.ward',
    'hierarchy.booth'
  ];

  const parts = keys
    .map((key) => form.elements[key] && form.elements[key].value.trim())
    .filter(Boolean);

  pathPreview.textContent = parts.join(' > ') || 'India > Chhattisgarh';
}

function updateCompletion() {
  const controls = [...form.querySelectorAll('input[name], select[name], textarea[name]')];
  const completed = controls.filter((control) => control.value.trim()).length;
  const total = controls.length || 1;
  const percent = Math.round((completed / total) * 100);

  completionScore.textContent = `${percent}%`;
  completionText.textContent = `${completed} of ${total} fields completed`;
  completionBar.style.width = `${percent}%`;
}

function updatePreview() {
  jsonPreview.textContent = JSON.stringify(getFormData(), null, 2);
}

function updateAll() {
  updatePathPreview();
  updateCompletion();
  updatePreview();
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getFormData()));
  setFormStatus('Draft saved locally in this browser.', 'success');
}

function applyPayloadToForm(payload) {
  const controls = [...form.querySelectorAll('input[name], select[name], textarea[name]')];
  controls.forEach((control) => {
    const value = control.name.split('.').reduce((cursor, key) => cursor && cursor[key], payload);
    if (Array.isArray(value)) {
      control.value = value.join('\n');
    } else if (typeof value === 'string' || typeof value === 'number') {
      control.value = String(value);
    } else {
      control.value = '';
    }
  });
  updateAll();
}

function hydrateDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    applyPayloadToForm(JSON.parse(raw));
    setFormStatus('Local draft restored. Review before export.', 'success');
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    setFormStatus('Saved draft was unreadable and has been cleared.', 'error');
  }
}

function exportDraft() {
  const payload = JSON.stringify(getFormData(), null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `chhattisgarh-intake-draft-${date}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setFormStatus('Draft exported as JSON.', 'success');
}

async function copyJson() {
  const payload = JSON.stringify(getFormData(), null, 2);

  try {
    await navigator.clipboard.writeText(payload);
    setFormStatus('JSON copied to clipboard.', 'success');
  } catch (error) {
    const temp = document.createElement('textarea');
    temp.value = payload;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    temp.remove();
    setFormStatus('JSON copied to clipboard.', 'success');
  }
}

function clearDraft() {
  const confirmed = window.confirm('Clear all entered draft values from this browser?');
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  form.elements['hierarchy.country'].value = 'India';
  form.elements['hierarchy.state'].value = 'Chhattisgarh';
  setFormStatus('Draft cleared. Ready for verified data entry.');
  updateAll();
}


function importDraftFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result || '{}'));
      applyPayloadToForm(payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(getFormData()));
      setFormStatus('JSON imported and saved locally. Review before final use.', 'success');
    } catch (error) {
      setFormStatus('Import failed. Please select a valid JSON export from this form.', 'error');
    } finally {
      importDraftInput.value = '';
    }
  };
  reader.readAsText(file);
}
function handleSubmit(event) {
  event.preventDefault();
  saveDraft();
  setFormStatus('Draft validated locally. Empty fields are allowed until verified data is provided.', 'success');
}

function bindEvents() {
  form.addEventListener('input', updateAll);
  form.addEventListener('change', updateAll);
  form.addEventListener('submit', handleSubmit);
  saveDraftButton.addEventListener('click', saveDraft);
  exportDraftButton.addEventListener('click', exportDraft);
  copyJsonButton.addEventListener('click', copyJson);
  clearDraftButton.addEventListener('click', clearDraft);
  importDraftButton.addEventListener('click', () => importDraftInput.click());
  importDraftInput.addEventListener('change', importDraftFile);
}

renderSections();
hydrateDraft();
bindEvents();
updateAll();




