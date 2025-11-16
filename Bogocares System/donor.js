// donor.js - Combined and optimized
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeToggleSwitch();
    initializeBurgerMenu();
    initializeBreadcrumb();
    initializeSignInButton();
});

function initializeToggleSwitch() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    
    function updateToggleState(switchElement, isInitialLoad = false) {
        const isChecked = switchElement.getAttribute('data-state') === 'checked';
        const newState = isChecked ? 'unchecked' : 'checked';
        switchElement.setAttribute('data-state', newState);

        // Update labels
        const container = switchElement.closest('.switch-container');
        const labels = container.querySelectorAll('.switch-label');
        labels.forEach(label => {
            label.classList.toggle('active');
            label.classList.toggle('inactive');
        });

        // Show/hide donor and recipient views
        const donorView = document.getElementById('donor-view');
        const recipientView = document.getElementById('recipient-view');

        if (donorView && recipientView) {
            if (newState === 'checked') {
                donorView.style.display = 'block';
                recipientView.style.display = 'none';
            } else {
                donorView.style.display = 'none';
                recipientView.style.display = 'block';
            }
        }

        // Reset breadcrumb to Home - only if not initial load
        if (!isInitialLoad) {
            const targetHome = newState === 'checked' ? 'donor-home' : 'recipient-home';
            document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
            const homePage = document.getElementById(targetHome);
            if (homePage) homePage.style.display = 'block';

            document.querySelectorAll('.breadcrumb-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === targetHome) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Set initial state to recipient view (unchecked)
    toggleSwitches.forEach(switchElement => {
        // Initialize all toggles to recipient view (unchecked)
        switchElement.setAttribute('data-state', 'unchecked');
        
        // Update the UI to match
        const container = switchElement.closest('.switch-container');
        const labels = container.querySelectorAll('.switch-label');
        labels.forEach(label => {
            if (label.textContent.includes('Request') || label.classList.contains('recipient-label')) {
                label.classList.add('active');
                label.classList.remove('inactive');
            } else {
                label.classList.add('inactive');
                label.classList.remove('active');
            }
        });

        // Set up event listeners
        switchElement.addEventListener('click', function() {
            updateToggleState(this);
        });
        
        switchElement.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                updateToggleState(this);
            }
        });
    });

    // Initialize the views to show recipient by default
    const donorView = document.getElementById('donor-view');
    const recipientView = document.getElementById('recipient-view');
    if (donorView && recipientView) {
        donorView.style.display = 'none';
        recipientView.style.display = 'block';
    }

    // Set breadcrumb to recipient home
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    const recipientHome = document.getElementById('recipient-home');
    if (recipientHome) recipientHome.style.display = 'block';

    document.querySelectorAll('.breadcrumb-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === 'recipient-home') {
            link.classList.add('active');
        }
    });
}

function initializeBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (burgerMenu && mobileMenuOverlay) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
        });
        
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeMobileMenu();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        function closeMobileMenu() {
            burgerMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Sync toggle switches
        const desktopToggle = document.querySelector('.toggle-switch:not(.mobile-toggle)');
        const mobileToggle = document.querySelector('.mobile-toggle');
        
        if (desktopToggle && mobileToggle) {
            desktopToggle.addEventListener('click', function() {
                const state = this.getAttribute('data-state');
                mobileToggle.setAttribute('data-state', state);
                updateMobileLabels();
            });
            
            mobileToggle.addEventListener('click', function() {
                const state = this.getAttribute('data-state');
                desktopToggle.setAttribute('data-state', state);
                updateDesktopLabels();
            });
            
            function updateMobileLabels() {
                const mobileContainer = mobileToggle.closest('.switch-container');
                const mobileLabels = mobileContainer.querySelectorAll('.switch-label');
                mobileLabels.forEach(label => {
                    label.classList.toggle('active');
                    label.classList.toggle('inactive');
                });
            }
            
            function updateDesktopLabels() {
                const desktopContainer = desktopToggle.closest('.switch-container');
                const desktopLabels = desktopContainer.querySelectorAll('.switch-label');
                desktopLabels.forEach(label => {
                    label.classList.toggle('active');
                    label.classList.toggle('inactive');
                });
            }
        }
    }
}

function initializeBreadcrumb() {
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
    const pageContents = document.querySelectorAll('.page-content');
    
    function showPage(pageId) {
        pageContents.forEach(content => {
            content.style.display = 'none';
        });
        
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.style.display = 'block';
        }
    }
    
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            breadcrumbLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Set initial state to recipient home
    showPage('recipient-home');
}

function initializeSignInButton() {
    const signInButton = document.getElementById('sign-in-btn');
    
    if (signInButton) {
        signInButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show donor view
            const donorView = document.getElementById('donor-view');
            const recipientView = document.getElementById('recipient-view');
            if (donorView && recipientView) {
                donorView.style.display = 'block';
                recipientView.style.display = 'none';
            }
            
            // Show donor home
            document.querySelectorAll('.page-content').forEach(section => {
                section.style.display = 'none';
            });
            const donorHome = document.getElementById('donor-home');
            if (donorHome) donorHome.style.display = 'block';
            
            // Update breadcrumb
            document.querySelectorAll('.breadcrumb-link').forEach(link => {
                link.classList.remove('active');
            });
            const donorHomeLink = document.querySelector('[data-page="donor-home"]');
            if (donorHomeLink) donorHomeLink.classList.add('active');
            
            // Set toggle to donor mode
            const toggleSwitch = document.querySelector('.toggle-switch');
            if (toggleSwitch) {
                toggleSwitch.setAttribute('data-state', 'checked');
                const container = toggleSwitch.closest('.switch-container');
                const labels = container.querySelectorAll('.switch-label');
                labels.forEach(label => {
                    if (label.textContent.includes('Donate') || label.classList.contains('donor-label')) {
                        label.classList.add('active');
                        label.classList.remove('inactive');
                    } else {
                        label.classList.add('inactive');
                        label.classList.remove('active');
                    }
                });
            }
            
            // Close modal and scroll to top
            if (typeof closeModal === 'function') closeModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}




