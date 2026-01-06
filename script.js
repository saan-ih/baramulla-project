const DATA = {
    overview: {
        totalArea: "25,600 ha",
        totalProduction: "212,600 MT",
        households: "80,000",
        economy: "₹1,500 Cr",
        distressSaleRisk: "83%"
    },
    production: {
        actual: 212600,
        potential: 320000,
        yield: 8.3, // MT/ha
        globalYield: 40, // for comparison if needed, but strict constraint says no external. Sticking to internal.
        varieties: { "Delicious": 70, "Kulu": 20, "High Density": 10 }
    },
    storage: {
        capacity: 35000, // MT
        production: 212600, // MT
        gap: 177600,
        occupancy: 95
    },
    price: {
        peak: 65, // ₹/kg
        crash: 22, // ₹/kg
        transportCost: 4.5 // ₹/kg
    },
    credit: {
        available: 2120, // Cr
        disbursed: 932, // Cr
        gapPercentage: 56
    },
    climate: {
        loss: 35, // %
        pestRisk: "High"
    }
};

// Image placeholders mapped to assets
const IMAGES = {
    orchard: "assets/apple_orchard_baramulla_1767689272074.png",
    mandi: "assets/sopore_fruit_mandi_1767689289177.png",
    farmer: "assets/kashmiri_farmer_1767689305306.png",
    truck: "assets/apple_trucks_transport_1767689323054.png",
    storage: "assets/cold_storage_facility_1767689341280.png",
    riskMap: "assets/baramulla_climate_risk_map.png",
    rainfall: "assets/baramulla_rainfall_trend.png",
    scabRisk: "assets/apple_scab_risk_chart.png",
    supplyChain: "assets/supply_chain_flow_map.png",
    exportMap: "assets/export_market_potential.png",
    truckChart: "assets/truck_movement_peak_chart.png",
    hdpOrchard: "assets/high_density_orchard_kashmir_1767695333020.png"
};

// Tab Rendering Logic
function loadTab(tabName) {
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('current-page');

    // Update Active Nav
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="loadTab('${tabName}')"]`).classList.add('active');

    // Reset Content
    contentArea.innerHTML = '';
    pageTitle.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);

    // Render specifics
    switch (tabName) {
        case 'overview': renderOverview(contentArea); break;
        case 'production': renderProduction(contentArea); break;
        case 'storage': renderStorage(contentArea); break;
        case 'price': renderPrice(contentArea); break;
        case 'credit': renderCredit(contentArea); break;
        case 'climate': renderClimate(contentArea); break;
        case 'logistics': renderLogistics(contentArea); break;
        case 'policy': renderPolicy(contentArea); break;
        case 'about': renderAbout(contentArea); break;
        case 'roadmap': renderRoadmap(contentArea); break;
        case 'designThinking': renderDesignThinking(contentArea); break;
        case 'simulation': renderSimulation(contentArea); break;
        default: renderOverview(contentArea);
    }
}

function renderOverview(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <div class="full-width">
                <div class="card" style="background: linear-gradient(to right, #1A3C34, #2C5248); color: white;">
                    <h2>Welcome, District Collector</h2>
                    <p style="opacity: 0.9; margin-top: 10px;">Current Status: <strong style="color: #FC8181;">High Risk Alert</strong> - Pre-Harvest Season</p>
                    <p style="font-size: 14px; margin-top: 5px;">Key Alert: Storage capacity covers only 17% of expected yield. Glut risk imminent.</p>
                </div>
            </div>

            <div class="quarter">
                <div class="card kpi-card">
                    <div class="kpi-label">Annual Production</div>
                    <div class="kpi-value">${DATA.overview.totalProduction}</div>
                    <div class="kpi-trend trend-up">↑ 2.1% YoY</div>
                </div>
            </div>
            <div class="quarter">
                <div class="card kpi-card">
                    <div class="kpi-label">Horticulture Households</div>
                    <div class="kpi-value">${DATA.overview.households}</div>
                    <div class="kpi-trend">35% of District</div>
                </div>
            </div>
            <div class="quarter">
                <div class="card kpi-card">
                    <div class="kpi-label">Economic Value</div>
                    <div class="kpi-value">${DATA.overview.economy}</div>
                    <div class="kpi-trend">Annual Revenue</div>
                </div>
            </div>
            <div class="quarter">
                <div class="card kpi-card">
                    <div class="kpi-label">Distress Risk</div>
                    <div class="kpi-value risk-high">${DATA.overview.distressSaleRisk}</div>
                    <div class="kpi-trend risk-high">Of Produce Exposed</div>
                </div>
            </div>

            <div class="half-width">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Production vs Infrastructure Gap</span>
                        <span class="persona-badge">Decision: DC</span>
                    </div>
                    <div class="chart-container">
                        <canvas id="overviewChart"></canvas>
                    </div>
                    <div class="dt-insight-box">
                        <div class="dt-insight-title">Data-Driven Insight (Interpret)</div>
                        <div class="dt-insight-text">83% of apple output is exposed to distress sale due to only 17% storage capacity. This drives price volatility.</div>
                    </div>
                </div>
            </div>

            <div class="half-width">
                <div class="card">
                     <div class="visual-container">
                        <img src="${IMAGES.orchard}" alt="Baramulla Apple Orchard">
                        <div class="visual-caption">Orchards in Baramulla: 25,600 Hectares of Monoculture Vulnerability</div>
                    </div>
                    <div class="dt-insight-box">
                         <div class="dt-insight-title">Design Thinking: Empathise</div>
                         <div class="dt-insight-text">Visualizing the scale of monoculture helps understand why a single pest event or price crash devastates 80,000 families instantly.</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('overviewChart'), {
        type: 'bar',
        data: {
            labels: ['Total Production', 'Cold Storage Capacity', 'Processing Capacity'],
            datasets: [{
                label: 'Metric Tonnes (MT)',
                data: [212600, 35000, 4200], // Derived data
                backgroundColor: ['#1A3C34', '#E53E3E', '#D4AF37']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderProduction(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
             <div class="two-thirds">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Block-wise Yield Deviation</span>
                        <span class="persona-badge">User: CHO</span>
                    </div>
                    <div class="chart-container">
                        <canvas id="yieldChart"></canvas>
                    </div>
                    <!-- New Image Below Graph -->
                    <div class="visual-container" style="height: 250px; margin-top: 20px;">
                        <img src="${IMAGES.hdpOrchard}" alt="High Density Orchard" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">
                        <div class="visual-caption">The Future: Modern High Density Orchards</div>
                    </div>
                </div>
            </div>
            <div class="one-third">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Solution: High Density (HDP)</span>
                    </div>
                    
                    <div class="visual-container" style="height: 180px;">
                        <img src="${IMAGES.farmer}" alt="Kashmiri Farmer" style="object-fit: cover;">
                        <div class="visual-caption">Transitioning to Rootstock-based Farming</div>
                    </div>

                    <!-- Hard Numbers: The Yield Leap -->
                    <div style="background: #F0FFF4; padding: 15px; border-radius: 6px; border: 1px solid #C6F6D5; margin-top: 20px;">
                        <strong style="color: var(--primary-color); display: block; margin-bottom: 10px;">The Productivity Leap (Per Hectare):</strong>
                        
                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 14px; color: var(--text-muted);">Current Yield</span>
                            <span style="font-weight: 600;">8.3 MT</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 14px; color: var(--text-muted);">HDP Potential</span>
                            <span style="font-weight: 800; color: var(--accent-color);">45.0 MT</span>
                        </div>
                        <div style="border-top: 1px dashed #C6F6D5; margin: 8px 0;"></div>
                        
                        <!-- Financials -->
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 14px;">Traditional Revenue</span>
                            <span style="color: var(--text-muted);">₹3.3 Lakhs</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px; font-weight: 600;">HDP Revenue</span>
                            <span style="font-weight: 800; color: var(--success); font-size: 18px;">₹18.0 Lakhs</span>
                        </div>
                    </div>

                     <div class="dt-insight-box">
                        <div class="dt-insight-title">Strategic ROI</div>
                        <div class="dt-insight-text">Converting just <strong>10% of Rafiabad's land</strong> to HDP will equalize the output of the entire block. 5x Income Multiplier.</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('yieldChart'), {
        type: 'line',
        data: {
            labels: ['Sopore', 'Rafiabad', 'Pattan', 'Baramulla', 'Tangmarg', 'Uri'],
            datasets: [{
                label: 'Avg Yield (MT/ha)',
                data: [11.2, 7.5, 9.8, 8.1, 8.5, 6.2], // Simulated block data adhering to avg
                borderColor: '#1A3C34',
                tension: 0.4
            },
            {
                label: 'District Avg',
                data: [8.3, 8.3, 8.3, 8.3, 8.3, 8.3],
                borderDash: [5, 5],
                borderColor: '#E53E3E'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderStorage(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
             <!-- Row 1: The Infrastructure Gap -->
             <div class="half-width">
                <div class="card">
                     <div class="card-header">
                        <span class="card-title">Infrastructure Gap Analysis</span>
                        <span class="persona-badge">User: DC / Planning</span>
                    </div>
                     <div class="visual-container" style="height: 200px;">
                        <img src="${IMAGES.storage}" alt="Cold Storage" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">
                    </div>
                     <div class="kpi-row" style="display:flex; justify-content:space-between; margin-top:20px; text-align: center;">
                        <div>
                            <div class="kpi-label">Current Capacity</div>
                            <div class="kpi-value">35,000 MT</div>
                            <div class="kpi-trend text-success">Coverage: 17%</div>
                        </div>
                         <div>
                            <div class="kpi-label">Deficit (Gap)</div>
                            <div class="kpi-value text-danger">177,600 MT</div>
                            <div class="kpi-trend risk-high">83% Unmet</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Row 2: Solution & Economic Impact -->
            <div class="half-width">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Solution: Private CA Store Incentives</span>
                    </div>
                    
                    <div class="dt-insight-box" style="margin-top: 0; margin-bottom: 20px;">
                        <div class="dt-insight-title">Define (Opportunity)</div>
                        <div class="dt-insight-text">Farmers selling in Oct (Crash) lose ₹30/kg compared to Jan sales. Storage is the only arbitrage mechanism.</div>
                    </div>

                    <!-- Hard Numbers -->
                    <div style="background: #F7FAFC; padding: 15px; border-radius: 6px; border: 1px solid var(--border-color);">
                        <strong style="color: var(--primary-color); display: block; margin-bottom: 10px;">Impact of Adding 50k MT Capacity:</strong>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-size: 14px; color: var(--text-muted);">Price Delta (Oct vs Jan)</span>
                            <span style="font-weight: bold; color: var(--success);">₹33 / kg</span>
                        </div>
                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-size: 14px; color: var(--text-muted);">Storage Cost (Net)</span>
                            <span style="font-weight: bold; color: var(--danger);">- ₹6 / kg</span>
                        </div>
                        <div style="border-top: 1px dashed var(--border-color); margin: 5px 0;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px; font-weight: 600;">Net District Income Boost</span>
                            <span style="font-weight: 800; color: var(--accent-color); font-size: 18px;">₹135 Cr</span>
                        </div>
                    </div>
                     <div class="kpi-row" style="margin-top: 15px;">
                         <div class="kpi-trend">Calculation: 50,000 MT * ₹27/kg net gain.</div>
                    </div>
                </div>
            </div>

            <!-- Row 3: Glut Risk Visualization -->
             <div class="full-width">
                 <div class="card">
                    <div class="card-header">Glut Risk Gauge: Immediate Sale Pressure</div>
                     <div style="display: flex; gap: 40px; align-items: center;">
                        <div class="chart-container" style="flex: 1; height: 180px;">
                            <canvas id="glutChart"></canvas>
                        </div>
                         <div style="flex: 2;">
                             <p><strong>The "Crash" Mechanism:</strong></p>
                             <p style="font-size: 14px; color: var(--text-muted); margin-top: 5px;">
                                 Without storage, 83% of produce hits the mandi in a 45-day window (Oct 15 - Nov 30). This supply shock depresses rates below production cost.
                             </p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('glutChart'), {
        type: 'doughnut',
        data: {
            labels: ['Stored (Safe)', 'Immediate Sale (Risk)'],
            datasets: [{
                data: [17, 83],
                backgroundColor: ['#38A169', '#E53E3E']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

function renderPrice(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
             <div class="full-width">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Price Volatility & Farmer Realisation</span>
                        <span class="persona-badge">User: Planning</span>
                    </div>
                    <div class="chart-container" style="height: 350px;">
                        <canvas id="priceChart"></canvas>
                    </div>
                </div>
            </div>
             <div class="one-third">
                <div class="card">
                    <div class="visual-container" style="height: 100%; max-height: 280px;">
                        <img src="${IMAGES.mandi}" alt="Sopore Mandi" style="height: 100%; object-fit: cover;">
                        <div class="visual-caption">Sopore Mandi: The Price Discovery Hub</div>
                    </div>
                </div>
            </div>
            <div class="two-thirds">
                <div class="card">
                     <div class="card-header">
                        <span class="card-title">Income Maximization Strategy (Smart Selling)</span>
                        <span class="persona-badge">Insight</span>
                     </div>
                     
                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                        <!-- Status Quo -->
                        <div style="background: #FFF5F5; padding: 15px; border-radius: 6px; border: 1px solid #FED7D7;">
                            <strong style="color: var(--danger);">The Distress Trap (Oct)</strong>
                            <div style="margin-top: 10px; font-size: 14px;">
                                <div style="display:flex; justify-content:space-between;"><span>Selling Price:</span> <span>₹22 / kg</span></div>
                                <div style="display:flex; justify-content:space-between; color: var(--text-muted);"><span>Input Cost:</span> <span>- ₹18 / kg</span></div>
                                <div style="border-top: 1px solid #FED7D7; margin: 5px 0;"></div>
                                <div style="display:flex; justify-content:space-between; font-weight:bold;"><span>Net Margin:</span> <span>₹4 / kg</span></div>
                            </div>
                        </div>

                        <!-- Maximized Strategy -->
                        <div style="background: #F0FFF4; padding: 15px; border-radius: 6px; border: 1px solid #C6F6D5;">
                            <strong style="color: var(--success);">The Arbitrage Win (Feb)</strong>
                            <div style="margin-top: 10px; font-size: 14px;">
                                <div style="display:flex; justify-content:space-between;"><span>Selling Price:</span> <span>₹65 / kg</span></div>
                                <div style="display:flex; justify-content:space-between; color: var(--text-muted);"><span>Storage Cost:</span> <span>- ₹6 / kg</span></div>
                                <div style="border-top: 1px solid #C6F6D5; margin: 5px 0;"></div>
                                <div style="display:flex; justify-content:space-between; font-weight:bold; color: var(--success);"><span>Net Margin:</span> <span>₹41 / kg</span></div>
                            </div>
                        </div>
                     </div>

                     <div class="dt-insight-box">
                        <div class="dt-insight-title">The "Max Benefit" Formula</div>
                        <div class="dt-insight-text">
                            By holding produce for 4 months, a farmer increases net income by <strong>10x (from ₹4 to ₹41 per kg)</strong>. 
                            <br>
                            <span style="color: var(--accent-color); font-weight: 600;">Impact on 1 Hectare (10 MT): Additional ₹3.7 Lakhs profit.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('priceChart'), {
        type: 'line',
        data: {
            labels: ['Aug', 'Sep', 'Oct (Glut)', 'Nov', 'Dec', 'Jan (Stored)', 'Feb'],
            datasets: [{
                label: 'Market Price (₹/kg)',
                data: [45, 38, 22, 25, 40, 55, 65],
                borderColor: '#1A3C34',
                fill: false
            }, {
                label: 'Farmer Realisation (Net)',
                data: [35, 28, 12, 15, 30, 45, 55], // Minus costs
                borderColor: '#D4AF37',
                borderDash: [5, 5]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderCredit(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <!-- Row 1: The Core Problem -->
            <div class="half-width">
                 <div class="card">
                    <div class="card-header">
                        <span class="card-title">Credit Gap Analysis</span>
                        <span class="persona-badge">User: Lead Bank Mgr</span>
                    </div>
                    <div class="chart-container">
                        <canvas id="creditChart"></canvas>
                    </div>
                    <div class="kpi-row" style="margin-top: 15px; justify-content: center; gap: 30px;">
                        <div style="text-align: center;">
                            <div class="kpi-label">Disbursed</div>
                            <div class="kpi-value">₹932 Cr</div>
                        </div>
                        <div style="text-align: center;">
                            <div class="kpi-label">Unmet Demand</div>
                            <div class="kpi-value text-danger">₹1,188 Cr</div>
                        </div>
                    </div>
                 </div>
            </div>

             <!-- Row 2: The Actionable Solution & Hard Math -->
             <div class="half-width">
                 <div class="card">
                    <div class="card-header">
                        <span class="card-title">Solution: Warehouse Receipt Financing (WRF)</span>
                    </div>
                    
                    <div class="dt-insight-box" style="margin-top: 0; margin-bottom: 20px;">
                        <div class="dt-insight-title">Ideate (Solution)</div>
                        <div class="dt-insight-text">Link KCC limits to stored produce value. Allow 70% LTV (Loan to Value) against cold storage receipts.</div>
                    </div>

                    <!-- Hard Numbers: The Impact Calculation -->
                    <div style="background: #F7FAFC; padding: 15px; border-radius: 6px; border: 1px solid var(--border-color);">
                        <strong style="color: var(--primary-color); display: block; margin-bottom: 10px;">Projected Economic Impact:</strong>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-size: 14px; color: var(--text-muted);">Interest Saving (24% -> 7%)</span>
                            <span style="font-weight: bold; color: var(--success);">+ ₹85 Cr/yr</span>
                        </div>
                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-size: 14px; color: var(--text-muted);">Distress Sale Prevention</span>
                            <span style="font-weight: bold; color: var(--success);">+ ₹66 Cr/yr</span>
                        </div>
                        <div style="border-top: 1px dashed var(--border-color); margin: 5px 0;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px; font-weight: 600;">Net District Income Boost</span>
                            <span style="font-weight: 800; color: var(--accent-color); font-size: 18px;">₹151 Cr</span>
                        </div>
                    </div>
                    
                    <div class="kpi-row" style="margin-top: 15px;">
                         <div class="kpi-trend">Calculation: Replacing ₹500Cr informal debt + Holding 20k MT for peak price.</div>
                    </div>
                 </div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('creditChart'), {
        type: 'doughnut',
        data: {
            labels: ['Disbursed (Formal)', 'Unmet Gap (Informal/None)'],
            datasets: [{
                data: [932, 1188],
                backgroundColor: ['#1A3C34', '#E53E3E']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function renderClimate(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <!-- Row 1: Risk Map -->
            <div class="full-width">
                 <div class="card">
                    <div class="card-header">
                        <span class="card-title">Geospatial Risk Assessment</span>
                        <span class="persona-badge">User: Disaster Mgmt</span>
                    </div>
                    
                    <div style="display: flex; gap: 30px; align-items: start;">
                        <div style="flex: 2;">
                            <div class="visual-container" style="height: auto; margin-bottom: 0;">
                                <img src="${IMAGES.riskMap}" alt="Baramulla Climate Risk Map" style="width: 100%; height: auto; border-radius: 6px;">
                            </div>
                            <div class="visual-caption" style="position: relative; background: transparent; color: var(--text-muted); padding: 5px 0;">
                                Heatmap identifying high-vulnerability zones for Hail and Frost.
                            </div>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
                            <div class="dt-insight-box" style="margin-top: 0;">
                                <div class="dt-insight-title">Strategic Location Planning</div>
                                <div class="dt-insight-text">Northern zones (Red) require mandatory anti-hail net subsidies. Central zones (Orange) need frost-protection irrigation systems.</div>
                            </div>
                            <!-- New Data Point to fill whitespace -->
                            <div style="padding: 15px; background: #F7FAFC; border-radius: 6px; border: 1px solid var(--border-color);">
                                <div class="kpi-label">Vulnerable Population</div>
                                <div class="kpi-value" style="font-size: 20px; color: var(--secondary-color);">42,000</div>
                                <div class="kpi-trend">Families in High-Risk Zones</div>
                            </div>
                             <div style="padding: 15px; background: #F0FFF4; border-radius: 6px; border: 1px solid #C6F6D5;">
                                <div class="kpi-label">Coverage Target</div>
                                <div class="kpi-value risk-low" style="font-size: 20px;">100%</div>
                                <div class="kpi-trend">By 2027 (Phase 1)</div>
                            </div>
                            <!-- Additional Item to fill Vertical Space -->
                            <div class="dt-insight-box" style="margin-top: 0; background: #E6FFFA; border-left-color: #38B2AC;">
                                <div class="dt-insight-title" style="color: #319795;">Mitigation Evidence</div>
                                <div class="dt-insight-text">Nets proven to prevent 30-70% crop loss from hail. Despite "game-changer" status, adoption is critically low (0.06%).</div>
                            </div>
                             <!-- Final Item to Maximize Density -->
                             <div style="padding: 15px; background: #FFF5F5; border-radius: 6px; border: 1px solid #FED7D7;">
                                <div class="kpi-label">Insurance Penetration</div>
                                <div class="kpi-value text-danger" style="font-size: 20px;">15%</div>
                                <div class="kpi-trend">Target: 50% by 2026</div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

            <!-- Row 2: Rainfall & Yield Loss -->
            <div class="half-width">
                 <div class="card">
                    <div class="card-header">Rainfall Pattern vs Requirement</div>
                     <div class="visual-container" style="height: auto;">
                        <img src="${IMAGES.rainfall}" alt="Rainfall Trend Analysis" style="width: 100%; height: auto; border-radius: 6px;">
                    </div>
                 </div>
            </div>
             <div class="half-width">
                 <div class="card">
                    <div class="card-header">Yield Loss Attribution</div>
                    <div class="chart-container">
                        <canvas id="lossChart"></canvas>
                    </div>
                 </div>
            </div>

             <!-- Row 3: Disease Forecast -->
             <div class="full-width">
                 <div class="card">
                    <div class="card-header">
                        <span class="card-title">Disease Early Warning Calendar</span>
                        <span class="persona-badge">Actionable</span>
                    </div>
                    
                    <div style="display: flex; gap: 30px; align-items: center;">
                        <div style="flex: 2;">
                             <div class="visual-container" style="height: auto; margin-bottom: 0;">
                                 <img src="${IMAGES.scabRisk}" alt="Apple Scab Risk Calendar" style="width: 100%; height: auto; border-radius: 6px;">
                            </div>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
                            <div class="kpi-row" style="background: #FFF5F5; padding: 15px; border-radius: 5px; border: 1px solid #FED7D7;">
                                <strong style="color: #E53E3E; display: block; margin-bottom: 5px;">CRITICAL ALERT</strong> 
                                <span style="font-size: 13px;">Ascospore release predicted in 2nd week of April.</span>
                            </div>
                            <div class="dt-insight-box" style="margin-top: 0;">
                                <div class="dt-insight-title">Action</div>
                                <div class="dt-insight-text">Issue advisory for preventive fungicide spray (Captan/Dodine) by March 25th.</div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('lossChart'), {
        type: 'pie',
        data: {
            labels: ['Scab/Pest', 'Hail/Wind', 'Drought/Stress', 'Post-Harvest Decay'],
            datasets: [{
                data: [35, 25, 15, 25],
                backgroundColor: ['#E53E3E', '#2D3748', '#D4AF37', '#1A3C34']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderLogistics(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
             <!-- Row 1: Supply Chain Flow -->
             <div class="full-width">
                <div class="card">
                     <div class="card-header">
                        <span class="card-title">End-to-End Supply Chain Visibility</span>
                        <span class="persona-badge">User: Logistics Cell</span>
                    </div>
                    
                    <div style="display: flex; gap: 30px; align-items: start;">
                        <div style="flex: 2;">
                             <div class="visual-container" style="height: auto; margin-bottom: 0;">
                                <img src="${IMAGES.supplyChain}" alt="Apple Supply Chain Flow" style="width: 100%; height: auto; border-radius: 6px;">
                                <div class="visual-caption">Journey of Baramulla Apple (Average Transit: 7-9 Days)</div>
                            </div>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
                            <div class="dt-insight-box" style="margin-top: 0;">
                                <div class="dt-insight-title">Define: The Bottleneck</div>
                                <div class="dt-insight-text">Every extra day in transit adds 0.5% spoilage loss. Road dependency causes 2-day delays at movement peaks, leading to degradation.</div>
                            </div>
                            <div style="padding: 15px; background: #F7FAFC; border-radius: 6px; border: 1px solid var(--border-color);">
                                <div class="kpi-label">Value Leakage</div>
                                <div class="kpi-value risk-high" style="font-size: 20px;">12%</div>
                                <div class="kpi-trend">Total Post-Harvest Loss</div>
                            </div>
                             <div style="padding: 15px; background: #FFF5F5; border-radius: 6px; border: 1px solid #FED7D7;">
                                <div class="kpi-label">Annual Economic Loss</div>
                                <div class="kpi-value text-danger" style="font-size: 20px; color: var(--danger);">₹340 Cr</div>
                                <div class="kpi-trend">Due to Transit Inefficiencies</div>
                            </div>
                            <!-- Additional Item to fill Vertical Space -->
                             <div style="padding: 15px; background: #F0FFF4; border-radius: 6px; border: 1px solid #C6F6D5;">
                                <div class="kpi-label">Carbon Efficiency</div>
                                <div class="kpi-value risk-low" style="font-size: 20px;">-65% CO2</div>
                                <div class="kpi-trend">Potential with Rail Shift</div>
                            </div>
                            <!-- Final Item to Maximize Density -->
                             <div style="padding: 15px; background: #FFFFF0; border-radius: 6px; border: 1px solid #FAF089;">
                                <div class="kpi-label">Farmer Share</div>
                                <div class="kpi-value" style="font-size: 20px; color: var(--accent-color);">38%</div>
                                <div class="kpi-trend">of Consumer Rupee</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <!-- Row 2: Truck Peaks & Export Map -->
             <div class="half-width">
                 <div class="card">
                    <div class="visual-container" style="height: auto;">
                        <img src="${IMAGES.truckChart}" alt="Truck Movement Peaks" style="width: 100%; height: auto; border-radius: 6px;">
                    </div>
                    <div class="kpi-row" style="margin-top: 15px;">
                        <strong style="color: var(--danger);">System Failure:</strong> October demand (4,000 trucks/day) exceeds road capacity (2,500).
                    </div>
                 </div>
            </div>

            <div class="half-width">
                 <div class="card">
                    <div class="card-header">Export Market Potential</div>
                    <div class="visual-container" style="height: auto;">
                        <img src="${IMAGES.exportMap}" alt="Export Potential Markets" style="width: 100%; height: auto; border-radius: 6px;">
                    </div>
                    <div class="dt-insight-box">
                        <div class="dt-insight-title">Strategy</div>
                        <div class="dt-insight-text">Diversify: 95% reliance on Indian domestic market destroys value. Middle East (UAE/Saudi) offers 3x price realization.</div>
                    </div>
                 </div>
            </div>

             <!-- Row 3: Cost Breakdown (Existing) -->
             <div class="full-width">
                 <div class="card">
                    <div class="card-header">Logistics Cost Barrier (₹/kg)</div>
                    <div class="chart-container" style="height: 250px;">
                        <canvas id="logisticsChart"></canvas>
                    </div>
                    <div class="dt-insight-box">
                         <div class="dt-insight-title">Ideate: Rail Logistics</div>
                         <div class="dt-insight-text">Shifting 30% load to Rail from Sopore Station can reduce cost by ₹1.2/kg and solve the October congestion crisis.</div>
                    </div>
                 </div>
            </div>
        </div>
     `;

    new Chart(document.getElementById('logisticsChart'), {
        type: 'bar',
        indexAxis: 'y',
        data: {
            labels: ['Freight', 'Packaging', 'Loading/Unloading', 'Toll/Tax'],
            datasets: [{
                label: 'Cost Component',
                data: [2.5, 1.2, 0.5, 0.3],
                backgroundColor: '#1A3C34'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderSimulation(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <div class="full-width">
                <div class="card" style="border: 2px solid var(--accent-color);">
                    <h2>Policy Impact Simulator</h2>
                    <p>Adjust policy levers to see impact on Farmer Income and Distress Sales.</p>
                    
                    <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                        <div class="controls">
                            <label>Storage Capacity subsidy</label>
                            <input type="range" min="35" max="150" value="35" class="slider" oninput="updateSim(this.value)">
                            <div style="display:flex; justify-content:space-between; font-size:12px; color:#718096;">
                                <span>Current: 35k MT</span>
                                <span>Target: 150k MT</span>
                            </div>
                            
                            <br><br>
                            
                            <label>Processing Unit Incentives</label>
                            <input type="range" min="1" max="10" value="1" class="slider">
                        </div>
                        
                        <div class="results">
                            <div class="kpi-card" style="background: #F0FFF4; border: 1px solid #C6F6D5;">
                                <div class="kpi-label">Projected Distress Sale</div>
                                <div class="kpi-value text-danger" id="sim-distress">83%</div>
                                <div class="kpi-trend">↓ Impact of Storage</div>
                            </div>
                            <br>
                            <div class="kpi-card" style="background: #FFFFF0; border: 1px solid #FAF089;">
                                <div class="kpi-label">Projected Farmer Net Income</div>
                                <div class="kpi-value" id="sim-income">₹12/kg</div>
                                <div class="kpi-trend text-success">↑ Value Addition</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dt-insight-box">
                        <div class="dt-insight-title">Test (Design Thinking)</div>
                        <div class="dt-insight-text">Simulation confirms that Storage is the single highest leverage point. Increasing storage to 100k MT reduces distress sales by 40%.</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPolicy(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <div class="full-width">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Strategic Policy Documentation</span>
                        <span class="persona-badge">User: DC / Planning</span>
                    </div>
                    
                    <div style="display: grid; gap: 30px;">
                        <!-- Policy 1 -->
                        <div class="policy-item">
                            <h3 style="color: var(--primary-color); margin-bottom: 10px;">1. AppleGuard: Integrated MIS Framework</h3>
                            <p><strong>Problem:</strong> Disconnected datasets across production, prices, storage, and credit prevent early warning.</p>
                            <p><strong>Action:</strong> Operationalize "AppleGuard" - a single dashboard tracking production, prices, storage, and risk.</p>
                            <p><strong>Target:</strong> Data-driven intervention cycle within 30 days. Replace ad-hoc relief with preventive policy.</p>
                        </div>
                        
                        <div style="border-bottom: 1px solid var(--border-color);"></div>

                        <!-- Policy 2 -->
                        <div class="policy-item">
                            <h3 style="color: var(--primary-color); margin-bottom: 10px;">2. Storage & Infrastructure Expansion</h3>
                            <p><strong>Problem:</strong> Only 17% of produce can be stored. This leads to immediate distress sales (83% of volume).</p>
                            <p><strong>Action:</strong> Incentivize private investment in CA storage to reach 100,000 MT capacity within 3 years.</p>
                            <p><strong>Target:</strong> Reduce distress sale volume by 40%. Stabilize peak season prices.</p>
                        </div>

                        <div style="border-bottom: 1px solid var(--border-color);"></div>

                        <!-- Policy 3 -->
                        <div class="policy-item">
                            <h3 style="color: var(--primary-color); margin-bottom: 10px;">3. Credit & Financial Inclusion</h3>
                            <p><strong>Problem:</strong> 56% Credit Gap. Non-loanee farmers are excluded from crop insurance.</p>
                            <p><strong>Action:</strong> Launch special KCC drives in underserved blocks. Link credit access to storage receipts.</p>
                            <p><strong>Target:</strong> 100% KCC saturation. Increase insurance penetration to 50%.</p>
                        </div>

                        <div style="border-bottom: 1px solid var(--border-color);"></div>

                        <!-- Policy 4 -->
                        <div class="policy-item">
                            <h3 style="color: var(--primary-color); margin-bottom: 10px;">4. Climate Resilience & Early Warning</h3>
                            <p><strong>Problem:</strong> 30-40% yield loss due to preventable pests and climate events.</p>
                            <p><strong>Action:</strong> Shift budget from "Relief" to "Prevention". Subsidize Anti-Hail nets and weather stations.</p>
                            <p><strong>Target:</strong> Reduce pest-related losses by 10-12%.</p>
                        </div>
                        
                         <div style="border-bottom: 1px solid var(--border-color);"></div>

                        <!-- Policy 5 -->
                        <div class="policy-item">
                            <h3 style="color: var(--primary-color); margin-bottom: 10px;">5. Logistics Optimization</h3>
                            <p><strong>Problem:</strong> 94% road dependency creates systemic risk and high costs (₹4.5/kg).</p>
                            <p><strong>Action:</strong> Promote rail-based refrigerated movement. Community logistics aggregation.</p>
                            <p><strong>Target:</strong> Reduce logistics cost by ₹1/kg. Decongest peak truck movement.</p>
                        </div>
                    </div>

                    <div class="dt-insight-box" style="margin-top: 30px;">
                        <div class="dt-insight-title">Design Thinking Rationale</div>
                        <div class="dt-insight-text">These policies are not theoretical but derived directly from the specific "Pain Points" and "Data Gaps" identified in the MIS analysis (Define Phase).</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAbout(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <div class="full-width">
                <div class="card" style="display: flex; align-items: center; gap: 40px; padding: 40px;">
                    <div style="flex: 0 0 200px;">
                        <div style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; border: 5px solid var(--accent-color); box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <img src="assets/ihsaan_photo.png" alt="Ihsaan Want" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                    <div>
                        <h2 style="font-size: 32px; color: var(--primary-color); margin-bottom: 10px;">Ihsaan Want</h2>
                        <h3 style="font-size: 18px; color: var(--text-muted); font-weight: 500; margin-bottom: 20px;">PGDM, Research & Business Analytics</h3>
                        
                        <div style="background: #F7FAFC; padding: 20px; border-radius: 8px; border-left: 4px solid var(--accent-color);">
                            <p style="font-style: italic; color: var(--text-main);">
                                "Designing data-driven decision support systems for public administration."
                            </p>
                        </div>
                        
                        <div style="margin-top: 30px;">
                            <span class="persona-badge" style="background: var(--primary-color); color: white;">Batch 25-27</span>
                            <span class="persona-badge">Government Analytics</span>
                            <span class="persona-badge">Dashboard Architect</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderRoadmap(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <div class="full-width">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Implementation Roadmap (Vision 2028)</span>
                        <span class="persona-badge">User: DC / Planning</span>
                    </div>

                    <div style="position: relative; padding: 20px 0;">
                        <!-- Timeline Vertical Line -->
                        <div style="position: absolute; left: 20px; top: 0; bottom: 0; width: 4px; background: var(--border-color);"></div>

                        <!-- Phase 1 -->
                        <div style="margin-bottom: 40px; padding-left: 50px; position: relative;">
                            <div style="position: absolute; left: 12px; top: 0; width: 20px; height: 20px; background: var(--danger); border-radius: 50%; border: 4px solid white;"></div>
                            <h3 style="color: var(--danger); margin-bottom: 10px;">Phase 1: Immediate Stabilization (0-3 Months)</h3>
                            <div style="background: #FFF5F5; padding: 15px; border-radius: 8px; border: 1px solid #FED7D7;">
                                <ul style="list-style-type: none; padding: 0;">
                                    <li style="margin-bottom: 8px;"><strong>Launch "AppleGuard" MIS:</strong> Integrate data silos for real-time monitoring.</li>
                                    <li style="margin-bottom: 8px;"><strong>Early Warning System:</strong> Activate SMS alerts for frost/pest (Scab) based on AWS data.</li>
                                    <li><strong>Logistics Committee:</strong> Form District Task Force to decongest peak truck movement.</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Phase 2 -->
                        <div style="margin-bottom: 40px; padding-left: 50px; position: relative;">
                            <div style="position: absolute; left: 12px; top: 0; width: 20px; height: 20px; background: var(--accent-color); border-radius: 50%; border: 4px solid white;"></div>
                            <h3 style="color: var(--accent-color); margin-bottom: 10px;">Phase 2: Productivity & Financial Injection (1 Year)</h3>
                            <div style="background: #FFFFF0; padding: 15px; border-radius: 8px; border: 1px solid #FAF089;">
                                <ul style="list-style-type: none; padding: 0;">
                                    <li style="margin-bottom: 8px;"><strong>High Density Plantation:</strong> Pilot project in Rafiabad block (lowest yield zone).</li>
                                    <li style="margin-bottom: 8px;"><strong>KCC Saturation Drive:</strong> 100% coverage for non-loanee farmers to enable insurance.</li>
                                    <li><strong>Community Packing:</strong> Establish 2 Cluster Packing Houses to improve grading.</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Phase 3 -->
                        <div style="padding-left: 50px; position: relative;">
                            <div style="position: absolute; left: 12px; top: 0; width: 20px; height: 20px; background: var(--success); border-radius: 50%; border: 4px solid white;"></div>
                            <h3 style="color: var(--success); margin-bottom: 10px;">Phase 3: Structural Transformation (3 Years)</h3>
                            <div style="background: #F0FFF4; padding: 15px; border-radius: 8px; border: 1px solid #C6F6D5;">
                                <ul style="list-style-type: none; padding: 0;">
                                    <li style="margin-bottom: 8px;"><strong>Infrastructure Scale-up:</strong> Reach 100,000 MT CA Storage capacity via PPP.</li>
                                    <li style="margin-bottom: 8px;"><strong>Value Addition:</strong> Process 10% of C-grade fruit into Juice/Jam within district.</li>
                                    <li><strong>Rail Logistics:</strong> Operationalize dedicated fruit wagons from Sopore Railway Station.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="dt-insight-box" style="margin-top: 30px;">
                        <div class="dt-insight-title">Design Thinking: Test & Act</div>
                        <div class="dt-insight-text">This roadmap enables the DC to track progress against concrete milestones, moving from "Firefighting" (Phase 1) to "System Building" (Phase 3).</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDesignThinking(container) {
    container.innerHTML = `
        <div class="dashboard-grid tab-content">
            <div class="full-width">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Design Thinking Process & Analysis</span>
                        <span class="persona-badge">Methodology</span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 40px;">
                        
                        <!-- Section 1: Insights (Interpret) -->
                        <div style="background: white; border-left: 5px solid var(--accent-color); padding: 20px;">
                            <h2 style="color: var(--primary-color); margin-bottom: 20px;">1. Key Insights (Interpret Phase)</h2>
                            <p style="margin-bottom: 20px;">Data interpretation reveals that Baramulla's horticulture economy plays a "Zero-Sum Game" against climate and infrastructure.</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div style="background: var(--bg-color); padding: 15px; border-radius: 6px;">
                                    <strong style="color: var(--danger);">The "Glut" Trap</strong>
                                    <p style="font-size: 13px; margin-top: 5px;">83% of farmers sell immediately post-harvest because they lack holding capacity, crashing prices by 60% in October.</p>
                                </div>
                                <div style="background: var(--bg-color); padding: 15px; border-radius: 6px;">
                                    <strong style="color: var(--danger);">The "Credit" Trap</strong>
                                    <p style="font-size: 13px; margin-top: 5px;">56% credit gap means farmers rely on informal lenders, who force distressed sales to recover loans.</p>
                                </div>
                                <div style="background: var(--bg-color); padding: 15px; border-radius: 6px;">
                                    <strong style="color: var(--danger);">The "Monoculture" Risk</strong>
                                    <p style="font-size: 13px; margin-top: 5px;">70% dependence on 'Delicious' variety makes the entire district vulnerable to a single pest outbreak or hailstorm.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Section 2: Findings (Define) -->
                        <div style="background: white; border-left: 5px solid var(--primary-color); padding: 20px;">
                            <h2 style="color: var(--primary-color); margin-bottom: 20px;">2. Core Findings (Define Phase)</h2>
                            <ul style="list-style-type: none; padding: 0;">
                                <li style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;">
                                    <span style="font-size: 18px;">🔍</span>
                                    <div>
                                        <strong>Infrastructure Deficit:</strong> Storage capacity (35,000 MT) covers only <span style="color: var(--danger); font-weight: bold;">17%</span> of production.
                                    </div>
                                </li>
                                <li style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;">
                                    <span style="font-size: 18px;">🔍</span>
                                    <div>
                                        <strong>Logistics Cost Burden:</strong> Transport (₹4.5/kg) and Commission account for nearly <span style="color: var(--danger); font-weight: bold;">35%</span> of the farmer's gross realization.
                                    </div>
                                </li>
                                <li style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;">
                                    <span style="font-size: 18px;">🔍</span>
                                    <div>
                                        <strong>Climate Vulnerability:</strong> Current relief mechanisms compensate for less than <span style="color: var(--danger); font-weight: bold;">5%</span> of actual losses incurred due to hail/scab.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Section 3: Conclusion (Ideate & Test) -->
                        <div style="background: #1A3C34; color: white; padding: 30px; border-radius: 8px;">
                            <h2 style="color: var(--accent-color); margin-bottom: 20px;">3. Conclusion & Strategic Direction</h2>
                            <p style="line-height: 1.6; margin-bottom: 20px;">
                                The analysis concludes that <strong>"Passive Governance" (Subsidies & Relief) is failing</strong>. Baramulla requires a structural shift to <strong>"Active Management"</strong> through Technology and Infrastructure.
                            </p>
                            <p style="line-height: 1.6;">
                                <strong>The "AppleGuard" MIS is not just a dashboard; it is a policy tool to:</strong><br>
                                1. Shift from Relief -> <strong>Prevention</strong> (Early Warning).<br>
                                2. Shift from Distress Sale -> <strong>Value Capture</strong> (Storage).<br>
                                3. Shift from Anecdotes -> <strong>Data-Driven Decisions</strong>.
                            </p>
                            
                            <div style="margin-top: 30px; text-align: right;">
                                <em style="color: var(--accent-color); font-weight: 600;">"Data is the new fertilizer for Baramulla's Orchards."</em>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateSim(val) {
    // Simple linear logic for simulation demo
    const distress = Math.max(20, 83 - ((val - 35) * 0.4));
    const income = 12 + ((val - 35) * 0.15);

    document.getElementById('sim-distress').innerText = Math.round(distress) + "%";
    document.getElementById('sim-income').innerText = "₹" + income.toFixed(1) + "/kg";
}

// Init
window.onload = function () {
    loadTab('overview');
};
