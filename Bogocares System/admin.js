// Mobile sidebar toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
});

// Close sidebar when clicking on overlay
document.querySelector('.overlay').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('show');
    this.classList.remove('show');
});

// Initialize chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('donationChart').getContext('2d');
    const donationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Donations ($)',
                data: [4500, 5200, 4800, 6100, 7200, 8200],
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
});

// Add active class to clicked sidebar links
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Sample function to handle campaign actions
function viewCampaign(campaignId) {
    alert(`Viewing campaign with ID: ${campaignId}`);
    // In a real application, this would navigate to a campaign details page
}

function editCampaign(campaignId) {
    alert(`Editing campaign with ID: ${campaignId}`);
    // In a real application, this would open an edit modal or form
}

// Add event listeners to campaign action buttons when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-primary-custom').forEach((button, index) => {
        button.addEventListener('click', function() {
            viewCampaign(index + 1);
        });
    });
    
    document.querySelectorAll('.btn-success-custom').forEach((button, index) => {
        button.addEventListener('click', function() {
            editCampaign(index + 1);
        });
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close sidebar on medium screens and up when window is resized
    if (window.innerWidth >= 768) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.overlay');
        
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    }
});















// Function to load content dynamically
function loadPage(page) {
    const contentArea = document.getElementById('main-content-area');
    
    // Remove active class from all menu items
    document.querySelectorAll('.sidebar .nav-link').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked menu item
    event.target.classList.add('active');
    
    // Update page title
    document.title = `${page} - BogoCares Admin`;
    
    // Load different content based on page
    switch(page) {
        case 'donors':
            contentArea.innerHTML = `
                <div class="container-fluid py-4">
                    <h2 class="mb-4">Donor Management</h2>
                    <div class="card shadow">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-white">Donor List</h6>
                        </div>
                        <div class="card-body">
                            <!-- Donor content -->
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'donations':
            contentArea.innerHTML = `
                <div class="container-fluid py-4">
                    <h2 class="mb-4">Donations</h2>
                    <!-- Donations content -->
                </div>
            `;
            break;
        // Add other cases...
    }
}

// Add event listeners to menu items
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if(page) {
                loadPage(page);
            }
        });
    });
});









// Update active navigation state based on current page
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'admin.html';
    
    // Remove active class from all nav items
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page nav item
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNav();
    
    // Your existing mobile menu code...
    document.getElementById('mobileMenuBtn').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.overlay');
        
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    });
    
    // Close sidebar when clicking on overlay
    document.querySelector('.overlay').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('show');
        this.classList.remove('show');
    });
    
    // Rest of your existing code...
});













// Mobile sidebar toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
});

// Close sidebar when clicking on overlay
document.querySelector('.overlay').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('show');
    this.classList.remove('show');
});

// Remove any event listeners that might be preventing navigation
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing click event listeners from sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    sidebarLinks.forEach(link => {
        // Clone the link to remove all event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });
    
    // Initialize chart only if it exists on the page
    if (document.getElementById('donationChart')) {
        const ctx = document.getElementById('donationChart').getContext('2d');
        const donationChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Donations ($)',
                    data: [4500, 5200, 4800, 6100, 7200, 8200],
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
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close sidebar on medium screens and up when window is resized
    if (window.innerWidth >= 768) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.overlay');
        
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    }
});