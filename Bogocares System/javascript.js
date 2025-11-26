
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

    // Set active state and hidden input value
    function setUserType(type) {
      // Remove active class from both buttons
      donateBtn.classList.remove('active');
      requestBtn.classList.remove('active');

      // Add active class to selected button
      if (type === 'donate') {
        donateBtn.classList.add('active');
        userTypeInput.value = 'donor';
      } else {
        requestBtn.classList.add('active');
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





















