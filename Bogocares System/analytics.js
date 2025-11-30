// Analytics page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    
    // Export report functionality
    document.getElementById('exportReportBtn').addEventListener('click', function() {
        alert('Exporting analytics report...');
        // In a real application, this would generate and download a report
    });
    
    // Export table functionality
    document.getElementById('exportTableBtn').addEventListener('click', function() {
        alert('Exporting campaign performance data...');
        // In a real application, this would export the table data
    });
    
    // Date range selection
    document.getElementById('dateRange').addEventListener('change', function() {
        const customRangeDiv = document.getElementById('customDateRange');
        if (this.value === 'custom') {
            customRangeDiv.style.display = 'block';
        } else {
            customRangeDiv.style.display = 'none';
        }
    });
    
    // Apply date range
    document.getElementById('applyDateRangeBtn').addEventListener('click', function() {
        const dateRange = document.getElementById('dateRange').value;
        let message = '';
        
        if (dateRange === 'custom') {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            if (!startDate || !endDate) {
                alert('Please select both start and end dates');
                return;
            }
            message = `Applying custom date range: ${startDate} to ${endDate}`;
        } else {
            message = `Applying ${dateRange} date range`;
        }
        
        alert(message);
        // In a real application, this would update all charts with the new date range
        const modal = bootstrap.Modal.getInstance(document.getElementById('dateRangeModal'));
        modal.hide();
    });
    
    // Set default dates for custom range
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    document.getElementById('startDate').value = thirtyDaysAgo.toISOString().split('T')[0];
    document.getElementById('endDate').value = today.toISOString().split('T')[0];
});

// Initialize all charts
function initializeCharts() {
    // Donation Trends Chart
    const trendsCtx = document.getElementById('donationTrendsChart').getContext('2d');
    const donationTrendsChart = new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Donations ($)',
                data: [3200, 4500, 5200, 4800, 6100, 7200],
                backgroundColor: 'rgba(41, 128, 185, 0.1)',
                borderColor: 'rgb(41, 128, 185)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Campaign Performance Chart
    const campaignCtx = document.getElementById('campaignPerformanceChart').getContext('2d');
    const campaignPerformanceChart = new Chart(campaignCtx, {
        type: 'doughnut',
        data: {
            labels: ['Education', 'Water', 'Medical', 'Disaster'],
            datasets: [{
                data: [32.5, 18.75, 42.3, 67.8],
                backgroundColor: [
                    'rgba(41, 128, 185, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(197, 225, 122, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ],
                borderColor: [
                    'rgb(41, 128, 185)',
                    'rgb(76, 175, 80)',
                    'rgb(197, 225, 122)',
                    'rgb(255, 193, 7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed}k`;
                        }
                    }
                }
            }
        }
    });
    
    // Donation Sources Chart
    const sourcesCtx = document.getElementById('donationSourcesChart').getContext('2d');
    const donationSourcesChart = new Chart(sourcesCtx, {
        type: 'pie',
        data: {
            labels: ['Website', 'Mobile App', 'Social Media', 'Email Campaign', 'Events'],
            datasets: [{
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    'rgba(41, 128, 185, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(197, 225, 122, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(156, 39, 176, 0.8)'
                ],
                borderColor: [
                    'rgb(41, 128, 185)',
                    'rgb(76, 175, 80)',
                    'rgb(197, 225, 122)',
                    'rgb(255, 193, 7)',
                    'rgb(156, 39, 176)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
    
    // Donor Demographics Chart
    const demographicsCtx = document.getElementById('donorDemographicsChart').getContext('2d');
    const donorDemographicsChart = new Chart(demographicsCtx, {
        type: 'bar',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
            datasets: [{
                label: 'Number of Donors',
                data: [85, 210, 185, 150, 120, 80],
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                borderColor: 'rgb(76, 175, 80)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Recurring vs One-time Chart
    const recurringCtx = document.getElementById('recurringChart').getContext('2d');
    const recurringChart = new Chart(recurringCtx, {
        type: 'pie',
        data: {
            labels: ['Recurring Donations', 'One-time Donations'],
            datasets: [{
                data: [35, 65],
                backgroundColor: [
                    'rgba(41, 128, 185, 0.8)',
                    'rgba(76, 175, 80, 0.8)'
                ],
                borderColor: [
                    'rgb(41, 128, 185)',
                    'rgb(76, 175, 80)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}