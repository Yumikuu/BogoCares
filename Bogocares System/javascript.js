
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
});

// Home link color
const homeLink = document.querySelector('a.nav-link[href="#"]');
function updateHomeLinkColor() {
    if (homeLink) {
        const scrollPos = window.scrollY;
        if (scrollPos < 200) {
            homeLink.style.color = '#2980b9';
            homeLink.classList.remove('active');
        } else {
            homeLink.style.color = '';
            homeLink.classList.add('active');
        }
    }
}

// Donate link color and functionality
const donateLink = document.querySelector('a.nav-link.donate-link');
const waysToHelpSection = document.getElementById('ways-to-help');

function scrollToWaysToHelp(event) {
    event.preventDefault();
    const section = document.getElementById('ways-to-help');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateDonateLinkColor() {
    if (donateLink && waysToHelpSection) {
        const waysRect = waysToHelpSection.getBoundingClientRect();
        if (waysRect.top <= 150 && waysRect.bottom >= 150) {
            donateLink.style.color = '#2980b9';
        } else {
            donateLink.style.color = '#000000';
        }
    }
}

// How It Works link color and functionality
const howItWorksLink = document.querySelector('a.nav-link[href="#how-it-works"]'); // Add this ID to your section
const howItWorksSection = document.getElementById('how-it-works'); // Add this ID to your How It Works section

function scrollToHowItWorks(event) {
    event.preventDefault();
    const section = document.getElementById('how-it-works');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateHowItWorksLinkColor() {
    if (howItWorksLink && howItWorksSection) {
        const howItWorksRect = howItWorksSection.getBoundingClientRect();
        if (howItWorksRect.top <= 150 && howItWorksRect.bottom >= 150) {
            howItWorksLink.style.color = '#2980b9';
        } else {
            howItWorksLink.style.color = '#000000';
        }
    }
}

// Event listeners
window.addEventListener('scroll', function() {
    updateHomeLinkColor();
    updateDonateLinkColor();
    updateHowItWorksLinkColor();
});

// Initial call
updateHomeLinkColor();
updateDonateLinkColor();
updateHowItWorksLinkColor();



// Request Help link color and functionality
const requestHelpLink = document.querySelector('a.nav-link[href="#request-help"]');
const requestHelpSection = document.getElementById('request-help');

function updateRequestHelpLinkColor() {
    if (requestHelpLink && requestHelpSection) {
        const requestHelpRect = requestHelpSection.getBoundingClientRect();
        if (requestHelpRect.top <= 150 && requestHelpRect.bottom >= 150) {
            requestHelpLink.style.color = '#2980b9';
        } else {
            requestHelpLink.style.color = '#000000';
        }
    }
}

// Add to scroll event listener
window.addEventListener('scroll', function() {
    updateRequestHelpLinkColor();
});

// Initial call
updateRequestHelpLinkColor();


// Smooth scrolling for footer links
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});






document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});

  function openModal() {
    document.getElementById('modal-overlay').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
  }

  // Optional: Close modal when clicking outside
  window.addEventListener('click', function(e) {
    const modal = document.querySelector('.modal');
    const overlay = document.getElementById('modal-overlay');
    if (e.target === overlay) {
      closeModal();
    }
  });
  function switchTab(tabName) {
  // Hide all forms
  document.querySelectorAll('.modal-form').forEach(form => {
    form.classList.remove('active');
  });
  
  // Remove active class from all tabs
  document.querySelectorAll('.tab-button').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected form and activate tab
  document.getElementById(tabName + '-form').classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Add event listeners to tabs
document.querySelectorAll('.tab-button').forEach(tab => {
  tab.addEventListener('click', function() {
    switchTab(this.getAttribute('data-tab'));
  });
});

// Your existing modal functions
function openModal() {
  document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}
 document.addEventListener("DOMContentLoaded", function () {
    const actionButtons = document.querySelectorAll(".action-button");

    actionButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove 'selected' from all
        actionButtons.forEach(btn => btn.classList.remove("selected"));
        // Add 'selected' to clicked one
        button.classList.add("selected");
      });
    });
  });
  function openModal() {
  document.getElementById("modal-overlay").style.display = "flex";
  document.body.style.overflow = "hidden"; // ✅ Disable background scroll
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
  document.body.style.overflow = ""; // ✅ Restore scroll
}
function openModal() {
  const modal = document.getElementById("modal-overlay");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // ✅ Reset tabs
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector('[data-tab="signin"]').classList.add("active");

  // ✅ Reset forms
  document.querySelectorAll(".modal-form").forEach(form => form.classList.remove("active"));
  document.getElementById("signin-form").classList.add("active");
}




function openModalTo(choice) {
  const modal = document.getElementById("modal-overlay");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // ✅ Switch to Sign In tab
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector('[data-tab="signin"]').classList.add("active");

  document.querySelectorAll(".modal-form").forEach(form => form.classList.remove("active"));
  document.getElementById("signin-form").classList.add("active");

  // ✅ Clear any selected choice buttons
  const actionButtons = document.querySelectorAll(".action-button");
  actionButtons.forEach(btn => btn.classList.remove("selected"));
}










  document.addEventListener('DOMContentLoaded', function() {
  const donateBtn = document.querySelector('.action-button.donate');
  const requestBtn = document.querySelector('.action-button.request');
  const userTypeInput = document.getElementById('user-type-input');
  
  function setUserType(type) {
    // Remove selected class from both buttons
    donateBtn.classList.remove('selected');
    requestBtn.classList.remove('selected');
    
    // Add selected class to chosen button
    if (type === 'donate') {
      donateBtn.classList.add('selected');
      userTypeInput.value = 'donor';
    } else {
      requestBtn.classList.add('selected');
      userTypeInput.value = 'recipient';
    }
  }
  
  // Add click events
  donateBtn.addEventListener('click', function() {
    setUserType('donate');
  });
  
  requestBtn.addEventListener('click', function() {
    setUserType('request');
  });
  
  // Set default to donor
  setUserType('donate');
});


// Handle signup action buttons
document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.action-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update hidden input value
        const choice = this.getAttribute('data-choice');
        document.getElementById('user-type-input').value = choice;
    });
});




// Handle signup action buttons
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-button');
    const userTypeInput = document.getElementById('user-type-input');
    
    if (actionButtons.length > 0 && userTypeInput) {
        actionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                actionButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update hidden input value
                const choice = this.getAttribute('data-choice');
                userTypeInput.value = choice;
                
                console.log('User type selected:', choice);
            });
        });
    }
});




// Real-time password confirmation validation
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const signupForm = document.getElementById('signup-form');

    if (passwordInput && confirmPasswordInput) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'password-error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.display = 'none';
        
        // Insert error message after confirm password field
        confirmPasswordInput.parentNode.appendChild(errorDiv);

        // Function to validate passwords
        function validatePasswords() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (confirmPassword === '') {
                // Hide error if confirm password is empty
                errorDiv.style.display = 'none';
                confirmPasswordInput.style.borderColor = '';
                return true;
            }

            if (password !== confirmPassword) {
                // Show error
                errorDiv.textContent = 'Passwords do not match';
                errorDiv.style.display = 'block';
                confirmPasswordInput.style.borderColor = 'red';
                return false;
            } else {
                // Hide error
                errorDiv.style.display = 'none';
                confirmPasswordInput.style.borderColor = 'green';
                return true;
            }
        }

        // Add event listeners for real-time validation
        passwordInput.addEventListener('input', validatePasswords);
        confirmPasswordInput.addEventListener('input', validatePasswords);

        // Also validate before form submission
        if (signupForm) {
            signupForm.addEventListener('submit', function(event) {
                if (!validatePasswords()) {
                    event.preventDefault(); // Stop form submission
                    // Focus on the confirm password field
                    confirmPasswordInput.focus();
                    
                    // Show a more prominent error
                    alert('Please make sure your passwords match before submitting.');
                }
            });
        }
    }
});


// Enhanced password validation
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const signupForm = document.getElementById('signup-form');

    if (passwordInput && confirmPasswordInput) {
        // Create validation elements
        const passwordFeedback = document.createElement('div');
        passwordFeedback.className = 'password-feedback';
        passwordFeedback.style.fontSize = '12px';
        passwordFeedback.style.marginTop = '5px';
        
        const confirmFeedback = document.createElement('div');
        confirmFeedback.className = 'confirm-feedback';
        confirmFeedback.style.fontSize = '12px';
        confirmFeedback.style.marginTop = '5px';

        passwordInput.parentNode.appendChild(passwordFeedback);
        confirmPasswordInput.parentNode.appendChild(confirmFeedback);

        function validatePasswordStrength(password) {
            const requirements = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password)
            };

            const met = Object.values(requirements).filter(Boolean).length;
            return { requirements, met, total: Object.keys(requirements).length };
        }

        function updatePasswordFeedback() {
            const password = passwordInput.value;
            
            if (password === '') {
                passwordFeedback.innerHTML = '';
                passwordInput.style.borderColor = '';
                return;
            }

            const strength = validatePasswordStrength(password);
            let feedbackHTML = '<div style="margin-bottom: 5px;">Password strength:</div>';
            
            const requirements = [
                { text: 'At least 8 characters', met: strength.requirements.length },
                { text: 'One uppercase letter', met: strength.requirements.uppercase },
                { text: 'One lowercase letter', met: strength.requirements.lowercase },
                { text: 'One number', met: strength.requirements.number }
            ];

            requirements.forEach(req => {
                const icon = req.met ? '✅' : '❌';
                const color = req.met ? 'green' : 'red';
                feedbackHTML += `<div style="color: ${color}; margin-left: 10px;">${icon} ${req.text}</div>`;
            });

            passwordFeedback.innerHTML = feedbackHTML;

            // Update border color based on strength
            if (strength.met === strength.total) {
                passwordInput.style.borderColor = 'green';
            } else if (strength.met >= 2) {
                passwordInput.style.borderColor = 'orange';
            } else {
                passwordInput.style.borderColor = 'red';
            }
        }

        function updateConfirmFeedback() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (confirmPassword === '') {
                confirmFeedback.innerHTML = '';
                confirmPasswordInput.style.borderColor = '';
                return;
            }

            if (password === confirmPassword) {
                confirmFeedback.innerHTML = '<div style="color: green;">✅ Passwords match</div>';
                confirmPasswordInput.style.borderColor = 'green';
            } else {
                confirmFeedback.innerHTML = '<div style="color: red;">❌ Passwords do not match</div>';
                confirmPasswordInput.style.borderColor = 'red';
            }
        }

        function validateForm() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Check if passwords match
            if (password !== confirmPassword) {
                confirmPasswordInput.focus();
                return false;
            }
            
            // Check password strength (optional)
            const strength = validatePasswordStrength(password);
            if (strength.met < 2) { // At least 2 requirements met
                passwordInput.focus();
                return false;
            }
            
            return true;
        }

        // Add event listeners
        passwordInput.addEventListener('input', updatePasswordFeedback);
        confirmPasswordInput.addEventListener('input', updateConfirmFeedback);

        // Form submission validation
        if (signupForm) {
            signupForm.addEventListener('submit', function(event) {
                if (!validateForm()) {
                    event.preventDefault();
                    alert('Please fix the password issues before submitting:\n- Passwords must match\n- Password should be at least 8 characters with uppercase, lowercase, and numbers');
                }
            });
        }
    }
});

// User type selection functionality
function selectUserType(choice) {
    const donateBtn = document.querySelector('.action-button.donate');
    const requestBtn = document.querySelector('.action-button.request');
    const userTypeInput = document.getElementById('user-type-input');
    
    if (choice === 'donate') {
        // Remove active class from all buttons
        donateBtn.classList.remove('active');
        requestBtn.classList.remove('active');
        // Add active to donate button
        donateBtn.classList.add('active');
        userTypeInput.value = 'donor';
    } else {
        // Remove active class from all buttons
        donateBtn.classList.remove('active');
        requestBtn.classList.remove('active');
        // Add active to request button
        requestBtn.classList.add('active');
        userTypeInput.value = 'request';
    }
}

// Initialize user type selection when modal opens
function initializeUserTypeSelection() {
    const donateBtn = document.querySelector('.action-button.donate');
    const requestBtn = document.querySelector('.action-button.request');
    const userTypeInput = document.getElementById('user-type-input');
    
    if (donateBtn && requestBtn && userTypeInput) {
        // Set up click events
        donateBtn.addEventListener('click', function() {
            selectUserType('donate');
        });
        
        requestBtn.addEventListener('click', function() {
            selectUserType('request');
        });
        
        // Set default selection
        selectUserType('donate');
    }
}

// Enhanced openModal function
function openModal() {
    const modal = document.getElementById("modal-overlay");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Reset to signin tab
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelector('[data-tab="signin"]').classList.add("active");

    document.querySelectorAll(".modal-form").forEach(form => form.classList.remove("active"));
    document.getElementById("signin-form").classList.add("active");

    // Initialize user type selection
    initializeUserTypeSelection();
}

// Enhanced openModalTo function for specific actions
function openModalTo(choice) {
    const modal = document.getElementById("modal-overlay");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Switch to Sign Up tab
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelector('[data-tab="signup"]').classList.add("active");

    document.querySelectorAll(".modal-form").forEach(form => form.classList.remove("active"));
    document.getElementById("signup-form").classList.add("active");

    // Set the user type based on choice
    if (choice === 'donate') {
        selectUserType('donate');
    } else if (choice === 'request') {
        selectUserType('request');
    }

    // Initialize user type selection
    initializeUserTypeSelection();
}

// File upload handling for ID document
function initializeFileUpload() {
    const fileUpload = document.getElementById('id-upload');
    const uploadWrapper = document.querySelector('.upload-wrapper');
    
    if (fileUpload && uploadWrapper) {
        fileUpload.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                // You can add visual feedback here
                console.log('Selected file:', fileName);
                
                // Optional: Show file name in the upload area
                const uploadText = uploadWrapper.querySelector('.upload-text');
                if (!uploadText) {
                    const textDiv = document.createElement('div');
                    textDiv.className = 'upload-text';
                    textDiv.style.fontSize = '12px';
                    textDiv.style.marginTop = '5px';
                    textDiv.style.color = 'green';
                    uploadWrapper.appendChild(textDiv);
                }
                uploadWrapper.querySelector('.upload-text').textContent = `Selected: ${fileName}`;
            }
        });
    }
}

// Enhanced DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Your existing DOMContentLoaded code...
    
    // Initialize user type selection
    initializeUserTypeSelection();
    
    // Initialize file upload
    initializeFileUpload();
    
    // Add click handlers for the action buttons in hero section
    const donateButtons = document.querySelectorAll('.btn-primary, .donate-btn');
    const requestButtons = document.querySelectorAll('.btn-secondary');
    
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModalTo('donate');
        });
    });
    
    requestButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModalTo('request');
        });
    });
    
    // Add click handler for category donate buttons
    const categoryDonateButtons = document.querySelectorAll('.category-donate-btn');
    categoryDonateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModalTo('donate');
        });
    });
});

// Enhanced tab switching function
function switchTab(tabName) {
    // Hide all forms
    document.querySelectorAll('.modal-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected form and activate tab
    document.getElementById(tabName + '-form').classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Re-initialize user type selection if switching to signup tab
    if (tabName === 'signup') {
        setTimeout(initializeUserTypeSelection, 100);
    }
}

// Remove any duplicate event listeners for tabs and use this single approach
document.addEventListener('DOMContentLoaded', function() {
    // Your existing tab event listeners...
    
    // Clean tab event listeners (replace any duplicates with this)
    document.querySelectorAll('.tab-button').forEach(tab => {
        // Remove any existing event listeners to prevent duplicates
        tab.replaceWith(tab.cloneNode(true));
    });
    
    // Re-attach event listeners
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });
});

















