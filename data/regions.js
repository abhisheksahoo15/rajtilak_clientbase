// Rajtilak Analytics — Regional Mock & Production Data
// Contains deep political intelligence data for Chhattisgarh, Odisha, Maharashtra, etc.
// Especially detailed for Bhupendra Yadav (Ward No. 47 - New Khursipar Radhakrishna Mandir, Bhilai)

const regionsData = {
  states: {
    chhattisgarh: {
      name: 'Chhattisgarh',
      data: {
        population: 29436231,
        area: 135192,
        literacy: 70.3,
        keyIndustries: ['Steel & Power', 'Mining', 'Agriculture', 'Cement', 'Forest Products'],
        demographics: {
          male: 50.1,
          female: 49.9,
          urban: 23.2,
          rural: 76.8,
          ageGroups: { '0-14': 27.8, '15-24': 19.5, '25-54': 39.4, '55-64': 7.8, '65+': 5.5 }
        },
        economic: {
          gdpContribution: '1.9%',
          avgIncome: 125000,
          employmentRate: 58.4,
          sectors: { agriculture: 35, industry: 40, services: 25 }
        },
        infrastructure: {
          roads: 75,
          hospitals: 60,
          schools: 78,
          connectivity: 70,
          overallScore: 71
        },
        political: {
          currentParty: 'BJP',
          mp: 11,
          mla: 90,
          lastElection: '2023'
        },
        risk: {
          crimeIndex: 34,
          disasterVulnerability: 42,
          overallRisk: 'Moderate'
        },
        growthScore: 78,
        dataSources: 34,
        dataPoints: 12450
      },
      districts: {
        durg: {
          name: 'Durg',
          data: {
            population: 1721948,
            area: 2238,
            literacy: 79.1,
            keyIndustries: ['Steel Production', 'Heavy Engineering', 'Agriculture', 'Chemicals', 'Education'],
            demographics: {
              male: 50.8,
              female: 49.2,
              urban: 38.4,
              rural: 61.6,
              ageGroups: { '0-14': 25.4, '15-24': 18.9, '25-54': 41.2, '55-64': 8.5, '65+': 6.0 }
            },
            economic: {
              gdpContribution: '0.22%',
              avgIncome: 165000,
              employmentRate: 61.2,
              sectors: { agriculture: 20, industry: 50, services: 30 }
            },
            infrastructure: {
              roads: 82,
              hospitals: 74,
              schools: 85,
              connectivity: 80,
              overallScore: 80
            },
            political: {
              currentParty: 'BJP',
              mp: 1,
              mla: 6,
              lastElection: '2023'
            },
            risk: {
              crimeIndex: 30,
              disasterVulnerability: 28,
              overallRisk: 'Low'
            },
            growthScore: 82,
            dataSources: 45,
            dataPoints: 18940
          },
          cities: {
            bhilai: {
              name: 'Bhilai Municipal Corporation',
              data: {
                population: 625700,
                area: 341,
                literacy: 86.6,
                keyIndustries: ['Bhilai Steel Plant', 'Industrial Engineering', 'Higher Education', 'Retail'],
                demographics: {
                  male: 51.5,
                  female: 48.5,
                  urban: 100,
                  rural: 0,
                  ageGroups: { '0-14': 22.8, '15-24': 20.1, '25-54': 43.6, '55-64': 8.2, '65+': 5.3 }
                },
                economic: {
                  gdpContribution: '0.08%',
                  avgIncome: 210000,
                  employmentRate: 64.8,
                  sectors: { agriculture: 2, industry: 58, services: 40 }
                },
                infrastructure: {
                  roads: 88,
                  hospitals: 82,
                  schools: 90,
                  connectivity: 88,
                  overallScore: 87
                },
                political: {
                  currentParty: 'Congress (Mayor) / BJP (Majority)',
                  mp: 1,
                  mla: 2,
                  lastElection: '2021'
                },
                risk: {
                  crimeIndex: 32,
                  disasterVulnerability: 20,
                  overallRisk: 'Low'
                },
                growthScore: 85,
                dataSources: 52,
                dataPoints: 24500
              },
              wards: [
                {
                  id: 'ward_47',
                  name: 'Ward No. 47 - New Khursipar Radhakrishna Mandir',
                  data: {
                    // 1. Basic Profile
                    basic_profile: {
                      name: "Bhupendra Yadav",
                      age: 44,
                      gender: "Male",
                      party: "INC (Indian National Congress)",
                      occupation: "Business & Social Activist",
                      education: "Graduate (Bachelor of Commerce - Kalyan College, Bhilai)",
                      contact: "+91 94252 47820",
                      social: {
                        facebook: "fb.com/bhupendrayadav.ward47",
                        instagram: "instagram.com/bhupendrayadav_bhilai",
                        twitter: "twitter.com/bhupendra_ward47",
                        youtube: "youtube.com/@bhupendrayadav47"
                      },
                      photo: "/images/bhupendra_yadav.jpg",
                      address: "House No. 142/A, Sector-11, New Khursipar, Bhilai, Durg, CG",
                      dob: "15th November 1981",
                      slogans: [
                        "शराब मुक्त वार्ड, सुरक्षित परिवार!",
                        "विकास का हाथ, वार्ड 47 के साथ!",
                        "हर गली साफ़, हर समस्या का समाधान!"
                      ]
                    },
                    // 2. Political Journey
                    political_timeline: [
                      { year: "2008", event: "Joined Congress Youth Wing as Grassroots Volunteer" },
                      { year: "2012", event: "Appointed Block Worker, Khursipar Division" },
                      { year: "2015", event: "General Secretary, Block Congress Committee, Bhilai" },
                      { year: "2019", event: "Led massive public protest against Abkari (Liquor shops) in Khursipar, jailed for 14 days" },
                      { year: "2020", event: "Nominated as Official INC Candidate for Ward No. 47" },
                      { year: "2021", event: "Elected Councillor (Parshad), Bhilai Municipal Corporation" },
                      { year: "2024", event: "Standing Committee Member (Water Works & Sanitation), BMC" }
                    ],
                    // 3. Election History
                    election_history: [
                      {
                        year: 2021,
                        type: "Bhilai Municipal Corporation Election",
                        ward: "Ward No. 47",
                        party: "INC",
                        votes_received: 2217,
                        vote_share: 48.8,
                        opponent: "Lal Babu Soni (BJP)",
                        margin: 265,
                        result: "Won"
                      }
                    ],
                    // 4. Current Election Analysis
                    current_term: {
                      total_voters: 4602,
                      male_voters: 2350,
                      female_voters: 2252,
                      total_turnout: "98.6%",
                      votes_secured: 2217,
                      runner_up: "Lal Babu Soni (BJP) - 1,952 votes",
                      winning_margin: 265,
                      independent_votes: "Rakesh Ram Choudhary - 313 votes",
                      nota_votes: "59 votes",
                      invalid_votes: "120 votes",
                      booth_performance: [
                        { booth: "Booth 134 - Radhakrishna Mandir Lane", status: "Strong Congress (58%)" },
                        { booth: "Booth 135 - Khursipar Market Road", status: "Strong Congress (54%)" },
                        { booth: "Booth 136 - Govt Primary School", status: "Leaning Congress (51%)" },
                        { booth: "Booth 137 - Railway Colony Block", status: "Neutral (48%)" },
                        { booth: "Booth 138 - Community Hall Sector", status: "Leaning BJP (45%)" }
                      ],
                      strong_booths: ["Booth 134", "Booth 135"],
                      weak_booths: ["Booth 138"],
                      nota_trend: "1.3% (59 votes)"
                    },
                    // 5. Tenure Analysis
                    tenure: {
                      start_date: "January 2021",
                      total_tenure: "5 Years",
                      terms: "1st Term",
                      reelection_probability: "82%"
                    },
                    // 6. Development Work Done
                    development_projects: [
                      { name: "Concrete Road Construction - Radhakrishna Mandir Road", location: "Radhakrishna Mandir Sector", budget: "₹12,50,000", dept: "PWD", tender: "NIT-45/BMC/2022", agency: "BMC", contractor: "S.K. Construction", status: "Completed", date: "April 2023", beneficiaries: "1,200 residents" },
                      { name: "AMRUT Drinking Water Pipe Laying Scheme", location: "New Khursipar Blocks A-D", budget: "₹18,20,000", dept: "PHE", tender: "T-78/AMRUT/2022", agency: "PHE Division Durg", contractor: "Gauri Engineering", status: "Completed", date: "November 2023", beneficiaries: "3,500 residents" },
                      { name: "Drainage Desilting & Reconstruction", location: "Khursipar Main Drain Link", budget: "₹8,40,000", dept: "Health & Sanitation", tender: "NIT-12/BMC/2023", agency: "BMC", contractor: "J.P. Builders", status: "Completed", date: "June 2023", beneficiaries: "2,000 residents" },
                      { name: "LED Street Light Installation (110 poles)", location: "Ward-wide interior lanes", budget: "₹4,80,000", dept: "Electrical Dept", tender: "NIT-19/BMC/2023", agency: "BMC", contractor: "Surya Lights Ltd", status: "Completed", date: "September 2023", beneficiaries: "Entire Ward" },
                      { name: "Radhakrishna Mandir Public Park Renovation", location: "Near Mandir Compound", budget: "₹6,50,000", dept: "Horticulture", tender: "NIT-88/BMC/2024", agency: "BMC", contractor: "GreenScape Ventures", status: "Ongoing", date: "Estimated Oct 2026", beneficiaries: "800 families" }
                    ],
                    // 7. Ward Development Score
                    ward_development_score: {
                      road_infra: 8.5,
                      water_supply: 8.0,
                      electricity: 9.0,
                      drainage: 6.5,
                      cleanliness: 7.2,
                      waste_management: 7.0,
                      public_toilets: 6.0,
                      healthcare: 6.8,
                      education: 7.5,
                      women_safety: 8.0,
                      digital_gov: 6.2,
                      traffic: 7.0,
                      parking: 5.5,
                      public_transport: 6.8,
                      overall_score: 7.4
                    },
                    // 8. Councillor Fund Utilization
                    councillor_fund: {
                      annual_fund: "₹22,00,000",
                      amount_utilized: "₹19,36,000",
                      remaining_budget: "₹2,64,000",
                      projects_funded: 14,
                      utilization_percentage: 88
                    },
                    // 9. Municipal Corporation Performance
                    municipal_performance: {
                      attendance: "94%",
                      meetings_attended: 42,
                      questions_asked: 18,
                      resolutions_proposed: 6,
                      committees: ["Water Works Standing Committee Member", "Sanitation Committee Member"],
                      special_motions: 3
                    },
                    // 10. Citizen Complaints
                    complaints: {
                      total: 154,
                      resolved: 132,
                      pending: 22,
                      avg_resolution_time: "4.5 Days",
                      most_affected_locality: "Block C Lane 4 (Water Pressure Issues)",
                      by_category: {
                        roads: { total: 32, resolved: 30, pending: 2 },
                        garbage: { total: 45, resolved: 40, pending: 5 },
                        water: { total: 28, resolved: 20, pending: 8 },
                        drainage: { total: 24, resolved: 20, pending: 4 },
                        streetlights: { total: 25, resolved: 22, pending: 3 }
                      }
                    },
                    // 11. Public Sentiment
                    public_sentiment: {
                      positive: 68,
                      neutral: 22,
                      negative: 10,
                      sentiment_score: "7.8 / 10",
                      highlights: "Highly appreciated for prompt response on water supply and leading liquor ban protests; minor complains on garbage timing."
                    },
                    // 12. Media Coverage
                    media_coverage: [
                      { headline: "Bhupendra Yadav leads huge protest against abkari liquor outlets in Bhilai", source: "Patrika CG", tone: "Positive", date: "14th November 2019" },
                      { headline: "Congress workers block NH-6 over arrest of Bhupendra Yadav", source: "Dainik Bhaskar", tone: "Positive", date: "16th November 2019" },
                      { headline: "Councillor Yadav reviews new street lights at Radhakrishna Mandir", source: "Hari Bhoomi", tone: "Positive", date: "5th October 2023" }
                    ],
                    // 13. Social Media Analytics
                    social_media: {
                      followers: "8,400 total",
                      engagement_rate: "6.8%",
                      posting_frequency: "6 posts / week",
                      popular_topics: ["Anti-Liquor Protests", "PMAY Scheme Distribution", "Local Water Line Laying Updates"],
                      viral_posts: "Protest speech against liquor outlets at New Khursipar (24k views)"
                    },
                    // 14. Assets & Liabilities
                    assets_liabilities: {
                      movable_assets: "₹14,50,000",
                      immovable_assets: "₹45,00,000",
                      cash_in_hand: "₹85,000",
                      vehicles: "1 Royal Enfield Bullet, 1 Honda Activa",
                      loans: "₹4,20,000 (Personal Loan)",
                      bank_deposits: "₹2,10,000",
                      growth_since_last: "8% (Standard inflation adjustments)"
                    },
                    // 15. Criminal Cases
                    criminal_cases: {
                      pending_firs: 1,
                      court_cases: 1,
                      charges: "Political agitation charges (Section 144 violation, Public Obstruction during liquor ban protest)",
                      convictions: 0,
                      affidavit_status: "1 Case relating to political agitation/protest (Abkari Protest)"
                    },
                    // 16. RTI & Govt Records
                    rti_records: {
                      rtis_filed: 2,
                      rtis_replied: 2,
                      status: "Fully clear, all funding lists provided to applicants",
                      audit_report: "Approved clean audit files for PWD ward maintenance"
                    },
                    // 17. Schemes Implemented
                    schemes: [
                      { name: "Pradhan Mantri Awas Yojana (PMAY-U)", beneficiaries: 45, status: "38 houses completed, 7 in final stage" },
                      { name: "Jal Jeevan Mission / AMRUT tap lines", beneficiaries: "720 households", status: "95% tap connection coverage achieved" },
                      { name: "Swachh Bharat Garbage Mission", beneficiaries: "Entire ward", status: "Daily waste collector route implemented successfully" }
                    ],
                    // 18. Opposition Analysis
                    opposition: {
                      main_opponent: "Lal Babu Soni (BJP)",
                      strengths: "Substantial local trade network, BJP organizational support.",
                      weaknesses: "Lost key booths in Mandir Sector; failed to capitalize on local water pressure issues.",
                      vote_share: "43.0%",
                      ground_presence: "Stable ground worker network"
                    },
                    // 19. Demographic Analysis
                    demographics: {
                      population: 6200,
                      density: "18,180 per sq.km",
                      literacy: "84.5%",
                      sex_ratio: "945 females per 1000 males",
                      urban_rural: { urban: 100, rural: 0 },
                      religion: { Hindu: 82, Muslim: 12, Christian: 4, Sikh: 2 },
                      castes: { OBC: 45, General: 30, SC: 15, ST: 10 },
                      ageGroups: { '18-25': 22, '26-45': 45, '46-60': 20, '60+': 13 }
                    },
                    // 20. Electoral Trend
                    electoral_trend: {
                      voter_turnout_2015: "65.4%",
                      voter_turnout_2021: "98.6% (Based on valid votes)",
                      inc_vote_share_growth: "+10.2% since protest campaigns",
                      nota_trend: "59 votes cast"
                    },
                    // 21. Political Network
                    political_network: {
                      key_connections: "Strong connection with Raipur INC District Committee & local Bhilai MLA office.",
                      supporters: "New Khursipar Youth Agitation Wing, Radhakrishna Temple Welfare Committee."
                    },
                    // 22. SWOT Analysis
                    swot: {
                      strengths: [
                        "Mass appeal as a protest leader who stood up against liquor policy.",
                        "Direct accessibility & strong youth support base.",
                        "94% Municipal Council meeting attendance record."
                      ],
                      weaknesses: [
                        "Pending political case relating to public agitation.",
                        "Need for better public drainage link construction near highway."
                      ],
                      opportunities: [
                        "Extension of new smart streetlights and CCTV monitoring in inner lanes.",
                        "Proposed local cooperative library facility."
                      ],
                      threats: [
                        "Anti-incumbency trends at the municipal executive level.",
                        "Potential consolidation of opponent votes in merchant areas."
                      ]
                    },
                    // 23. Performance Scorecard
                    scorecard: {
                      development: 8.2,
                      public_satisfaction: 8.5,
                      transparency: 8.2,
                      attendance: 9.4,
                      leadership: 8.8,
                      communication: 8.4,
                      problem_resolution: 8.6,
                      fund_utilization: 8.8,
                      overall_rating: 8.5
                    },
                    // 24. Dashboard KPIs
                    kpis: {
                      years_councillor: 3,
                      wins: 1,
                      current_vote_share: "48.8%",
                      winning_margin: 265,
                      projects_completed: 18,
                      projects_ongoing: 4,
                      budget_utilized: "88%",
                      attendance_percent: "94%",
                      satisfaction_score: "85%", // Customer/Locality engagement
                      resolution_rate: "85.7%",
                      social_followers: "8.4K",
                      legal_cases: 1, // Political FIR
                      political_strength: 88,
                      public_accessibility: "95%",
                      local_engagement: "88%"
                    },
                    // 25. Data Sources
                    data_sources: {
                      sources_count: 14,
                      data_points: 3850
                    },
                    // Campaign & Agitations details
                    agitations: {
                      event_title: "Abkari Policy Anti-Liquor Protest (2019)",
                      details: "Led a 3-day non-violent public block protest in Khursipar demanding closure of liquor outlets near schools. Detained by local police for 14 days under security acts. Became a major turning point in his local political rise.",
                      jail_term: "14 days political confinement",
                      slogan: "शराब मुक्त वार्ड, सुरक्षित परिवार!"
                    },
                    // Improvement Ideas
                    improvement_ideas: [
                      { title: "Relocate Liquor Outlets", desc: "Move commercial abkari outlets out of residential boundaries and away from schools.", impact: "High" },
                      { title: "Smart Street CCTV Integration", desc: "Install 24 street cameras around Radhakrishna Mandir chowk to enhance female safety.", impact: "High" },
                      { title: "Decentralized Sanitation Center", desc: "Create a local waste segregation hub in Sector 11 for faster street clearance.", impact: "Medium" }
                    ],

                    // 26. Voter Demographics (Ground Truth — Field Survey)
                    voter_demographics: {
                      male_pct: 58,
                      female_pct: 42,
                      strategic_note: "Women voters can become a decisive swing segment if campaigns focus on safety, parks, public amenities, sanitation, and family welfare."
                    },

                    // 27. Public Issues — Priority Wise (Field Survey)
                    public_issues: {
                      priority_1: [
                        {
                          title: "Waterlogging During Rainy Season",
                          details: [
                            "Severe drainage issue.",
                            "Sewer water enters residential houses during heavy rainfall.",
                            "Long-term unresolved issue."
                          ]
                        },
                        {
                          title: "Drain (Nali) Problems",
                          details: [
                            "Blocked and damaged drains.",
                            "Poor drainage management."
                          ]
                        },
                        {
                          title: "Public Waiting Area (Yatri Pratikshalaya)",
                          details: [
                            "Poor maintenance.",
                            "Gutka stains.",
                            "Public urination.",
                            "Strong demand for nearby public toilet installation."
                          ]
                        },
                        {
                          title: "Stadium Condition",
                          details: [
                            "Stadium is in dilapidated condition.",
                            "Issue unresolved for nearly 10 years.",
                            "Illegal liquor consumption reported inside the stadium.",
                            "Requires complete renovation and security improvements."
                          ]
                        }
                      ],
                      priority_2: [
                        {
                          title: "Garbage and Scrap Waste",
                          details: [
                            "Scrap accumulation.",
                            "Poor waste collection.",
                            "Cleanliness complaints."
                          ]
                        },
                        {
                          title: "Water Supply Wastage",
                          details: [
                            "Municipal water reaches residents.",
                            "High water leakage and wastage.",
                            "Demand for proper maintenance."
                          ]
                        },
                        {
                          title: "Public Tap Installation",
                          details: [
                            "High public demand.",
                            "Required in water-deficient localities."
                          ]
                        },
                        {
                          title: "Street Light Issues",
                          details: [
                            "Non-functional or insufficient lighting.",
                            "Safety concern during night."
                          ]
                        },
                        {
                          title: "Speed Breakers",
                          details: [
                            "Required near schools, residential roads and accident-prone locations."
                          ]
                        }
                      ],
                      priority_3: [
                        {
                          title: "Women's Safety",
                          details: [
                            "Important election issue.",
                            "Increase street lighting.",
                            "CCTV installation.",
                            "Police patrolling.",
                            "Safe public spaces."
                          ]
                        },
                        {
                          title: "Parks and Recreational Spaces",
                          details: [
                            "Demand for public parks.",
                            "Children's play areas.",
                            "Women's walking areas.",
                            "Family recreation spaces."
                          ]
                        }
                      ]
                    },

                    // 28. Councillor Performance Analysis (Ground Truth)
                    councillor_performance: {
                      positives: [
                        "Good emotional connection with residents.",
                        "Polite and approachable behaviour.",
                        "Municipal administration responds when issues are raised.",
                        "Road maintenance completed in several locations.",
                        "Water supply generally satisfactory.",
                        "Roof leakage repairs completed in some areas."
                      ],
                      negatives: [
                        "No major visible development projects recently.",
                        "Stadium issue unresolved for approximately 10 years.",
                        "Waterlogging remains unresolved.",
                        "Drainage infrastructure inadequate.",
                        "Public sanitation issues continue.",
                        "Lack of new public infrastructure."
                      ]
                    },

                    // 29. Campaign Opportunities — High Impact Promises
                    campaign_opportunities: [
                      "Permanent solution for waterlogging.",
                      "Modern drainage system.",
                      "Stadium redevelopment.",
                      "Public toilet near Yatri Pratikshalaya.",
                      "Women's safety initiative.",
                      "New public parks.",
                      "Children's play area.",
                      "Street light modernization.",
                      "Public tap installation.",
                      "Scientific garbage management.",
                      "Water leakage reduction.",
                      "Speed breaker installation.",
                      "Smart ward cleanliness campaign."
                    ],

                    // 30. Voter Sentiment (Ground Truth — Field Survey)
                    voter_sentiment: {
                      current_sentiment: "Mixed",
                      incumbent_strengths: [
                        "Personal relationship with citizens.",
                        "Good behaviour.",
                        "Basic civic services functioning."
                      ],
                      public_dissatisfaction: [
                        "Lack of recent development.",
                        "Long-pending infrastructure problems.",
                        "Waterlogging.",
                        "Stadium neglect.",
                        "Sanitation concerns."
                      ]
                    },

                    // 31. Election Strategy Insight
                    election_strategy: {
                      focus_areas: [
                        "Women-centric development.",
                        "Civic infrastructure.",
                        "Cleanliness.",
                        "Public safety.",
                        "Drainage.",
                        "Sports infrastructure.",
                        "Quality-of-life improvements."
                      ],
                      swing_issues: [
                        "Women's safety.",
                        "Parks.",
                        "Public toilets.",
                        "Stadium renovation.",
                        "Rainwater drainage.",
                        "Garbage management."
                      ]
                    }
                  }
                },
                {
                  id: 'ward_48',
                  name: 'Ward No. 48 - Sector 11 East',
                  data: {
                    basic_profile: {
                      name: "Kiran Dev",
                      age: 38,
                      gender: "Female",
                      party: "INC (Indian National Congress)",
                      occupation: "Teacher & Social Worker",
                      education: "Post Graduate",
                      contact: "+91 94252 00000",
                      social: { facebook: "fb.com/kirandev48", instagram: "instagram.com/kirandev" },
                      photo: "/images/kiran_dev.jpg",
                      address: "House 54, Sector-11 East, Bhilai",
                      dob: "12th July 1988"
                    },
                    kpis: {
                      years_councillor: 3,
                      wins: 1,
                      current_vote_share: "48.2%",
                      winning_margin: 124,
                      projects_completed: 12,
                      projects_ongoing: 3,
                      budget_utilized: "78%",
                      attendance_percent: "88%",
                      satisfaction_score: "68%",
                      resolution_rate: "80%",
                      social_followers: "2.4K",
                      legal_cases: 0,
                      political_strength: 72
                    }
                  }
                }
              ]
            }
          }
        },
        raipur: {
          name: 'Raipur',
          data: {
            population: 2160876,
            area: 2914,
            literacy: 81.2,
            keyIndustries: ['Iron & Steel', 'Rice Milling', 'Trading Hub', 'Education'],
            demographics: { male: 51.2, female: 48.8, urban: 58.4, rural: 41.6, ageGroups: { '0-14': 24.8, '15-24': 19.2, '25-54': 42.4, '55-64': 8.1, '65+': 5.5 } },
            economic: { gdpContribution: '0.45%', avgIncome: 195000, employmentRate: 62.1, sectors: { agriculture: 10, industry: 40, services: 50 } },
            infrastructure: { roads: 85, hospitals: 86, schools: 88, connectivity: 85, overallScore: 86 },
            political: { currentParty: 'BJP', mp: 1, mla: 7, lastElection: '2023' },
            risk: { crimeIndex: 38, disasterVulnerability: 25, overallRisk: 'Low' },
            growthScore: 85,
            dataSources: 38,
            dataPoints: 16500
          },
          cities: {
            raipur_corp: {
              name: 'Raipur Municipal Corporation',
              data: {
                population: 1027264,
                area: 188,
                literacy: 87.3,
                keyIndustries: ['Commerce', 'Metals', 'Services', 'Logistics'],
                demographics: { male: 51.8, female: 48.2, urban: 100, rural: 0, ageGroups: { '0-14': 22.4, '15-24': 19.8, '25-54': 44.2, '55-64': 8.3, '65+': 5.3 } },
                economic: { gdpContribution: '0.24%', avgIncome: 245000, employmentRate: 65.2, sectors: { agriculture: 1, industry: 30, services: 69 } },
                infrastructure: { roads: 88, hospitals: 89, schools: 91, connectivity: 90, overallScore: 89 },
                political: { currentParty: 'Congress (Mayor) / BJP (Majority)', mp: 1, mla: 4, lastElection: '2021' },
                risk: { crimeIndex: 40, disasterVulnerability: 22, overallRisk: 'Low' },
                growthScore: 88,
                dataSources: 42,
                dataPoints: 19800
              },
              wards: [
                { id: 'w1', name: 'Ward 1 - Shankar Nagar' },
                { id: 'w2', name: 'Ward 2 - Devendra Nagar' },
                { id: 'w3', name: 'Ward 3 - Tatibandh' }
              ]
            }
          }
        }
      }
    },
    odisha: {
      name: 'Odisha',
      data: {
        population: 46356334,
        area: 155707,
        literacy: 72.9,
        keyIndustries: ['Mining', 'Agriculture', 'Steel', 'IT Services', 'Tourism'],
        demographics: { male: 51.4, female: 48.6, urban: 16.7, rural: 83.3, ageGroups: { '0-14': 28.5, '15-24': 19.2, '25-54': 38.1, '55-64': 8.3, '65+': 5.9 } },
        economic: { gdpContribution: '2.7%', avgIncome: 112000, employmentRate: 54.2, sectors: { agriculture: 22, industry: 34, services: 44 } },
        infrastructure: { roads: 78, hospitals: 65, schools: 82, connectivity: 71, overallScore: 74 },
        political: { currentParty: 'BJP', mp: 21, mla: 147, lastElection: '2024' },
        risk: { crimeIndex: 32, disasterVulnerability: 68, overallRisk: 'Moderate' },
        growthScore: 72,
        dataSources: 18,
        dataPoints: 4230
      },
      districts: {
        khordha: {
          name: 'Khordha',
          data: {
            population: 2938377,
            area: 2813,
            literacy: 87.5,
            keyIndustries: ['IT/ITES', 'Government Services', 'Education', 'Real Estate'],
            demographics: { male: 52.1, female: 47.9, urban: 48.2, rural: 51.8, ageGroups: { '0-14': 24.1, '15-24': 20.8, '25-54': 41.3, '55-64': 8.9, '65+': 4.9 } },
            economic: { gdpContribution: '0.42%', avgIncome: 185000, employmentRate: 62.8, sectors: { agriculture: 12, industry: 28, services: 60 } },
            infrastructure: { roads: 85, hospitals: 78, schools: 91, connectivity: 88, overallScore: 85 },
            political: { currentParty: 'BJP', mp: 2, mla: 10, lastElection: '2024' },
            risk: { crimeIndex: 28, disasterVulnerability: 45, overallRisk: 'Low' },
            growthScore: 88,
            dataSources: 22,
            dataPoints: 5120
          },
          cities: {
            bhubaneswar: {
              name: 'Bhubaneswar',
              data: {
                population: 1091724,
                area: 422,
                literacy: 93.1,
                keyIndustries: ['IT/ITES', 'Government', 'Education', 'Healthcare', 'Tourism'],
                demographics: { male: 52.8, female: 47.2, urban: 95.2, rural: 4.8, ageGroups: { '0-14': 21.3, '15-24': 22.1, '25-54': 43.8, '55-64': 8.2, '65+': 4.6 } },
                economic: { gdpContribution: '0.18%', avgIncome: 245000, employmentRate: 68.4, sectors: { agriculture: 5, industry: 25, services: 70 } },
                infrastructure: { roads: 92, hospitals: 88, schools: 95, connectivity: 94, overallScore: 92 },
                political: { currentParty: 'BJP', mp: 1, mla: 3, lastElection: '2024' },
                risk: { crimeIndex: 22, disasterVulnerability: 38, overallRisk: 'Low' },
                growthScore: 91,
                dataSources: 26,
                dataPoints: 6840
              },
              wards: [
                { id: 'w1', name: 'Ward 1 - Old Town' },
                { id: 'w6', name: 'Ward 6 - Saheed Nagar' },
                { id: 'w9', name: 'Ward 9 - Patia' }
              ]
            }
          }
        }
      }
    }
  }
};

module.exports = regionsData;
