// donor.js - Donor-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing donor functionality...');
    initializeDonorNavigation();
    initializeDonorDashboard();
    initializeDonationSidebar();
    initializeMobileMenu();
    initializeCampaignTypeToggle();
});

// Donor Navigation Functions
function initializeDonorNavigation() {
    console.log('Initializing donor navigation...');
    
    // Initialize donor breadcrumb navigation
    const donorBreadcrumbs = document.querySelectorAll('.breadcrumb-link');
    const donorPages = document.querySelectorAll('#donor-view .page-content');
    
    console.log('Found donor breadcrumbs:', donorBreadcrumbs.length);
    console.log('Found donor pages:', donorPages.length);
    
    function showDonorPage(pageId) {
        console.log('Showing donor page:', pageId);
        
        // Hide all donor page contents
        donorPages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Show the selected donor page
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.style.display = 'block';
            console.log('Page displayed:', pageId);
        } else {
            console.log('Page not found:', pageId);
        }
        
        // Update donor breadcrumb active state
        donorBreadcrumbs.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }
    
    // Add click handlers for donor breadcrumb
    donorBreadcrumbs.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('Donor breadcrumb clicked:', page);
            showDonorPage(page);
        });
    });
    
    // Set initial state - show donor home
    showDonorPage('donor-home');
}

// Donor Dashboard Functions
function initializeDonorDashboard() {
    console.log('Initializing donor dashboard...');
    
    // Initialize dashboard tabs
    const actionButtons = document.querySelectorAll('.action-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function showTab(tabId) {
        console.log('Showing tab:', tabId);
        
        // Hide all tab contents
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all buttons
        actionButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab and activate button
        const activeTab = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
        const activeButton = document.querySelector(`.action-btn[data-tab="${tabId}"]`);
        
        if (activeTab) {
            activeTab.classList.add('active');
        }
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    // Add click handlers for tab buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
    
    // Initialize charts if they exist
    initializeDonorCharts();
}

// Donation Sidebar Functionality
function initializeDonationSidebar() {
    console.log('🔄 INITIALIZING DONATION SIDEBAR...');
    
    const donateButtons = document.querySelectorAll('.donate-action-btn');
    const donationSidebar = document.getElementById('donation-sidebar');
    
    console.log('🔍 Found:', {
        donateButtons: donateButtons.length,
        donationSidebar: !!donationSidebar
    });
    
    donateButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`🎯 Donate button ${index + 1} clicked`);
            
            const campaignCard = this.closest('.campaign-card');
            if (campaignCard) {
                console.log('✅ Campaign card found');
                
                // Get basic info
                const campaignName = campaignCard.querySelector('h3').textContent;
                const campaignNeed = campaignCard.querySelector('.campaign-need').textContent;
                const campaignDescription = campaignCard.querySelector('.campaign-description').textContent;
                
                // Get money amounts - CRITICAL PART
                const campaignRaisedElement = campaignCard.querySelector('.campaign-raised');
                const campaignGoalElement = campaignCard.querySelector('.campaign-goal');
                
                console.log('💰 Money elements found:', {
                    raisedElement: !!campaignRaisedElement,
                    goalElement: !!campaignGoalElement
                });
                
                if (campaignRaisedElement && campaignGoalElement) {
                    const campaignRaised = campaignRaisedElement.textContent;
                    const campaignGoal = campaignGoalElement.textContent;
                    
                    console.log('💰 Amounts:', {
                        raised: campaignRaised,
                        goal: campaignGoal
                    });
                    
                    // UPDATE SIDEBAR
                    updateSidebar(campaignName, campaignNeed, campaignDescription, campaignRaised, campaignGoal);
                } else {
                    console.error('❌ Money elements not found in campaign card');
                    // Fallback: try to get from progress-amount
                    const progressAmount = campaignCard.querySelector('.progress-amount');
                    if (progressAmount) {
                        console.log('🔄 Falling back to progress-amount element');
                        const text = progressAmount.textContent;
                        const parts = text.split(' / ');
                        if (parts.length === 2) {
                            updateSidebar(campaignName, campaignNeed, campaignDescription, parts[0], parts[1]);
                        }
                    }
                }
            }
            
            // Show sidebar
            donationSidebar.classList.add('active');
            document.body.classList.add('sidebar-active');
            
            // Initialize donation type switching AFTER sidebar opens
            initializeDonationTypeSwitching();
        });
    });
    
    // Close sidebar
    const closeSidebar = document.querySelector('.close-sidebar');
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            donationSidebar.classList.remove('active');
            document.body.classList.remove('sidebar-active');
        });
    }
}

// SEPARATE FUNCTION FOR UPDATING SIDEBAR
function updateSidebar(name, need, description, raised, goal) {
    console.log('🔄 updateSidebar called with:', { name, need, raised, goal });
    
    const nameElement = document.getElementById('sidebar-campaign-name');
    const descElement = document.getElementById('sidebar-campaign-description');
    const raisedElement = document.getElementById('sidebar-raised-amount');
    const goalElement = document.getElementById('sidebar-goal-amount');
    const progressFill = document.getElementById('sidebar-progress-fill');
    
    console.log('🔍 Sidebar elements:', {
        nameElement: !!nameElement,
        descElement: !!descElement,
        raisedElement: !!raisedElement,
        goalElement: !!goalElement,
        progressFill: !!progressFill
    });
    
    // Update elements
    if (nameElement) {
        nameElement.textContent = `${name} - ${need}`;
        console.log('✅ Updated name');
    }
    
    if (descElement) {
        descElement.textContent = description;
        console.log('✅ Updated description');
    }
    
    if (raisedElement) {
        raisedElement.textContent = raised;
        console.log('✅ Updated raised to:', raised);
    }
    
    if (goalElement) {
        goalElement.textContent = goal;
        console.log('✅ Updated goal to:', goal);
    }
    
    if (progressFill && raised && goal) {
        try {
            const raisedNum = parseFloat(raised.replace('₱', '').replace(/,/g, ''));
            const goalNum = parseFloat(goal.replace('₱', '').replace(/,/g, ''));
            const progressPercent = (raisedNum / goalNum) * 100;
            progressFill.style.width = `${progressPercent}%`;
            console.log('✅ Updated progress to:', progressPercent + '%');
        } catch (error) {
            console.error('❌ Progress calculation error:', error);
        }
    }
}

// DONATION TYPE SWITCHING FUNCTIONALITY - ADD THIS
function initializeDonationTypeSwitching() {
    console.log('💰 Initializing donation type switching...');
    
    const donationTypeOptions = document.querySelectorAll('.donation-type-option');
    const donationSections = document.querySelectorAll('.donation-section');
    
    console.log('🔍 Found donation type options:', donationTypeOptions.length);
    console.log('🔍 Found donation sections:', donationSections.length);
    
    donationTypeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const donationType = this.getAttribute('data-type');
            console.log('💰 Donation type clicked:', donationType);
            
            // Remove active class from all options
            donationTypeOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Hide all donation sections
            donationSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected donation section
            const targetSection = document.querySelector(`.${donationType}-donation`);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('✅ Showed donation section:', donationType);
            } else {
                console.error('❌ Donation section not found:', donationType);
            }
            
            // Update the summary
            updateDonationSummary();
            
            // Update sidebar content for donation type
            updateSidebarForDonationType(donationType);
        });
    });
    
    // Initialize other sidebar functionality
    initializeCategoryOptions();
    initializeDeliveryOptions();
    initializePaymentOptions();
    initializeAmountSuggestions();
}

// Category options for items donation
function initializeCategoryOptions() {
    const categoryOptions = document.querySelectorAll('.category-option');
    const itemDescriptionInput = document.querySelector('.item-description-input');
    
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all categories
            categoryOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Show/hide item description for "Other" category
            if (this.getAttribute('data-category') === 'other') {
                if (itemDescriptionInput) {
                    itemDescriptionInput.style.display = 'block';
                }
            } else {
                if (itemDescriptionInput) {
                    itemDescriptionInput.style.display = 'none';
                }
            }
            
            // Update summary
            updateDonationSummary();
        });
    });
}

// Delivery options
function initializeDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateDonationSummary();
        });
    });
}

// Payment options
function initializePaymentOptions() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateDonationSummary();
        });
    });
}

// Amount suggestions
function initializeAmountSuggestions() {
    const suggestionButtons = document.querySelectorAll('.suggestion-amount');
    const amountInput = document.getElementById('donation-amount');
    
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            if (amountInput) {
                amountInput.value = amount;
                updateDonationSummary();
            }
        });
    });
    
    // Real-time amount update
    if (amountInput) {
        amountInput.addEventListener('input', updateDonationSummary);
    }
}

// Update sidebar for different donation types
function updateSidebarForDonationType(donationType) {
    const campaignProgress = document.querySelector('.campaign-progress');
    
    if (donationType === 'money') {
        // Show campaign progress for money donations
        if (campaignProgress) {
            campaignProgress.style.display = 'block';
        }
    } else if (donationType === 'items') {
        // Hide campaign progress for item donations
        if (campaignProgress) {
            campaignProgress.style.display = 'none';
        }
    }
}

// Update donation summary - FIXED VERSION
function updateDonationSummary() {
    const activeType = document.querySelector('.donation-type-option.active');
    const amountInput = document.getElementById('donation-amount');
    
    if (!activeType) return;
    
    const donationType = activeType.getAttribute('data-type');
    const summaryType = document.getElementById('summary-type');
    const summaryAmount = document.getElementById('summary-amount');
    const summaryTotal = document.getElementById('summary-total');
    const summaryMethod = document.getElementById('summary-method');
    const summaryItemsCount = document.getElementById('summary-items-count');
    const summaryDelivery = document.getElementById('summary-delivery');
    
    // Show/hide summary sections
    const moneySummary = document.querySelector('.summary-money');
    const itemsSummary = document.querySelector('.summary-items');
    
    if (donationType === 'money') {
        // Money donation
        if (moneySummary) moneySummary.style.display = 'block';
        if (itemsSummary) itemsSummary.style.display = 'none';
        
        if (summaryType) summaryType.textContent = 'Money';
        
        // Update amount
        if (amountInput && amountInput.value) {
            const amount = amountInput.value;
            if (summaryAmount) summaryAmount.textContent = `₱${amount}`;
            if (summaryTotal) summaryTotal.textContent = `₱${amount}`;
        } else {
            if (summaryAmount) summaryAmount.textContent = '₱0';
            if (summaryTotal) summaryTotal.textContent = '₱0';
        }
        
        // Update payment method
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (selectedPayment && summaryMethod) {
            summaryMethod.textContent = selectedPayment.value.charAt(0).toUpperCase() + selectedPayment.value.slice(1);
        }
        
    } else if (donationType === 'items') {
        // Items donation
        if (moneySummary) moneySummary.style.display = 'none';
        if (itemsSummary) itemsSummary.style.display = 'block';
        
        if (summaryType) summaryType.textContent = 'Items';
        if (summaryAmount) summaryAmount.textContent = 'Items Donation';
        if (summaryTotal) summaryTotal.textContent = 'Items Donation';
        
        // Update selected category
        const selectedCategory = document.querySelector('.category-option.active');
        if (selectedCategory && summaryItemsCount) {
            const categoryName = selectedCategory.querySelector('span').textContent;
            summaryItemsCount.textContent = categoryName;
        }
        
        // Update delivery method
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        if (selectedDelivery && summaryDelivery) {
            summaryDelivery.textContent = selectedDelivery.value === 'pickup' ? 'Pickup' : 'Drop-off';
        }
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (burgerMenu && mobileOverlay) {
        burgerMenu.addEventListener('click', function() {
            mobileOverlay.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Campaign Type Toggle (Campaigns vs Personal Requests)
function initializeCampaignTypeToggle() {
    const typeOptions = document.querySelectorAll('.campaign-type-option');
    const typeContents = document.querySelectorAll('.campaign-type-content');
    
    function showCampaignType(type) {
        // Hide all type contents
        typeContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all options
        typeOptions.forEach(option => {
            option.classList.remove('active');
        });
        
        // Show selected type and activate option
        const activeContent = document.querySelector(`.campaign-type-content[data-type="${type}"]`);
        const activeOption = document.querySelector(`.campaign-type-option[data-type="${type}"]`);
        
        if (activeContent) {
            activeContent.classList.add('active');
        }
        if (activeOption) {
            activeOption.classList.add('active');
        }
    }
    
    // Add click handlers for type options
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showCampaignType(type);
        });
    });
}

// Initialize donor charts
function initializeDonorCharts() {
    // Donation Trend Chart
    const trendCtx = document.getElementById('donationTrendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [{
                    label: 'Monthly Donations',
                    data: [2000, 3500, 2800, 5000, 3000, 2500],
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // ← Add this line
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}
    // Campaign Distribution Chart
const distributionCtx = document.getElementById('campaignDistributionChart');
if (distributionCtx) {
    new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Education', 'Medical', 'Food', 'Clothing'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    '#1976d2',
                    '#d32f2f',
                    '#388e3c',
                    '#f57c00'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right', // Change to right side
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            layout: {
                padding: 10
            }
        }
    });
}


// Quick donate functions
function openFoodDonation() {
    console.log('Opening food donation');
    // Implement food donation logic
}

function openClothingDonation() {
    console.log('Opening clothing donation');
    // Implement clothing donation logic
}

function openMedicalDonation() {
    console.log('Opening medical donation');
    // Implement medical donation logic
}

function openEducationDonation() {
    console.log('Opening education donation');
    // Implement education donation logic
}

function switchToDonationsTab() {
    const donationsButton = document.querySelector('.action-btn[data-tab="donations"]');
    if (donationsButton) {
        donationsButton.click();
    }
}







