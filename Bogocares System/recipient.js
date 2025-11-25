// recipient.js - Debug version
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing recipient functionality...');
    initializeRecipientNavigation();
    initializeRecipientDashboard();
    initializeRequestManagement();
    initializeMobileNavigation();
});

// Recipient Navigation Functions
function initializeRecipientNavigation() {
    console.log('📍 Initializing recipient navigation...');
    
    const recipientBreadcrumbs = document.querySelectorAll('#recipient-view .breadcrumb-link');
    const recipientPages = document.querySelectorAll('#recipient-view .page-content');
    
    console.log('📋 Found recipient breadcrumbs:', recipientBreadcrumbs.length);
    console.log('📄 Found recipient pages:', recipientPages.length);
    
    // Log all page IDs for debugging
    recipientPages.forEach(page => {
        console.log('📄 Page ID found:', page.id);
    });

    function showRecipientPage(pageId) {
        console.log('🔄 Attempting to show page:', pageId);
        
        // Hide all recipient page contents
        recipientPages.forEach(page => {
            page.style.display = 'none';
            console.log('❌ Hiding page:', page.id);
        });
        
        // Show the selected recipient page
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.style.display = 'block';
            console.log('✅ Successfully displayed page:', pageId);
        } else {
            console.log('❌ Page not found:', pageId);
            console.log('🔍 Available pages:');
            recipientPages.forEach(page => {
                console.log('   -', page.id);
            });
            
            // Fallback to home
            const homePage = document.getElementById('recipient-home');
            if (homePage) {
                homePage.style.display = 'block';
                console.log('🏠 Fallback to home page');
            }
        }
        
        // Update recipient breadcrumb active state
        recipientBreadcrumbs.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            link.classList.remove('active');
            if (linkPage === pageId) {
                link.classList.add('active');
                console.log('📍 Active breadcrumb:', linkPage);
            }
        });
    }
    
    // Add click handlers for recipient breadcrumb
    recipientBreadcrumbs.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('🖱️ Breadcrumb clicked:', page);
            console.log('🔗 Link href:', this.getAttribute('href'));
            showRecipientPage(page);
        });
    });
    
    // Set initial state - show recipient home
    console.log('🏠 Setting initial page to recipient-home');
    showRecipientPage('recipient-home');
}

// ... rest of your JavaScript functions remain the same




// Filter functionality for request cards
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const campaignCards = document.querySelectorAll('.campaign-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide cards based on filter
            campaignCards.forEach(card => {
                const status = card.getAttribute('data-status');
                
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'active') {
                    card.style.display = status === 'active' ? 'block' : 'none';
                } else if (filter === 'completed') {
                    card.style.display = status === 'completed' ? 'block' : 'none';
                }
            });
        });
    });
});












// Recipient Dashboard Functions
function initializeRecipientDashboard() {
    console.log('📊 Initializing recipient dashboard...');
    initializeRecipientCharts();
}

// Initialize recipient charts
function initializeRecipientCharts() {
    console.log('📈 Initializing recipient charts...');
    
    // Monthly Progress Chart (Line Chart)
    const progressCtx = document.getElementById('monthlyProgressChart');
    if (progressCtx) {
        console.log('📈 Creating monthly progress chart...');
        new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [
                    {
                        label: 'Amount Received',
                        data: [2500, 4200, 3800, 6500, 4700, 18700],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    },
                    {
                        label: 'Monthly Goal',
                        data: [5000, 5000, 5000, 5000, 5000, 15000],
                        borderColor: '#10b981',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '₱' + context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '₱' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest'
                }
            }
        });
    } else {
        console.log('❌ Monthly progress chart canvas not found');
    }

    // Support by Category Chart (Doughnut Chart)
    const categoryCtx = document.getElementById('supportCategoryChart');
    if (categoryCtx) {
        console.log('🥧 Creating support category chart...');
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Medical', 'Education', 'Food', 'Housing'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                        '#ef4444',  // Red for Medical
                        '#8b5cf6',  // Purple for Education
                        '#f59e0b',  // Amber for Food
                        '#10b981'   // Green for Housing
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            font: {
                                size: 11
                            },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${percentage}% (₱${value.toLocaleString()})`;
                            }
                        }
                    }
                },
                layout: {
                    padding: 10
                },
                cutout: '60%'
            }
        });
    } else {
        console.log('❌ Support category chart canvas not found');
    }
}