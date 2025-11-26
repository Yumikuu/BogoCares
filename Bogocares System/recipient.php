<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'recipient') {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipient Portal - BogoCares</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="recipient.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <header class="recipient-header">
        <div class="header-container">
            <div class="logo-title">
                <img src="images/logo (1).png" alt="BogoCares logo" class="logo-img" />
                <div class="title-group">
                    <h1 class="site-title">
                        <span class="bogo">Bogo</span><span class="cares">Cares</span>
                    </h1>
                    <p class="portal-subtitle">Recipient Portal</p>
                </div>
            </div>

            <!-- Desktop Navigation -->
            <nav class="header-nav">
                <!-- Switch to Donor Button -->
                <a href="donor.html" class="nav-btn">
    <i class="bi bi-person"></i>
    Switch to Donor
</a>
                <!-- In both donor.php and recipient.php -->
<div class="profile-settings">
    <h3>Account Type</h3>
    <p>Your primary account type: <strong><?php echo $_SESSION['user_type']; ?></strong></p>
    <form action="update-profile.php" method="POST">
        <label>Change your primary account type:</label>
        <select name="new_user_type">
            <option value="donor" <?php echo $_SESSION['user_type'] == 'donor' ? 'selected' : ''; ?>>Donor</option>
            <option value="recipient" <?php echo $_SESSION['user_type'] == 'recipient' ? 'selected' : ''; ?>>Recipient</option>
        </select>
        <button type="submit">Update</button>
    </form>
</div>
                <!-- Notification Bell -->
                <div class="notification-container">
                    <button class="nav-btn notification-btn">
                        <i class="bi bi-bell"></i>
                        <span class="notification-badge">3</span>
                    </button>
                </div>
                
                <!-- Settings Dropdown -->
                <div class="settings-container">
                    <button class="nav-btn settings-btn">
                        <i class="bi bi-gear"></i>
                        Settings
                    </button>
                    <div class="settings-dropdown">
                        <a href="#" class="dropdown-item">
                            <i class="bi bi-person"></i>
                            Profile Settings
                        </a>
                        <a href="#" class="dropdown-item">
                            <i class="bi bi-bell"></i>
                            Notifications
                        </a>
                        <a href="#" class="dropdown-item">
                            <i class="bi bi-shield-check"></i>
                            Privacy & Security
                        </a>
                        <a href="#" class="dropdown-item">
                            <i class="bi bi-question-circle"></i>
                            Help & Support
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item logout">
                            <i class="bi bi-box-arrow-right"></i>
                            Logout
                        </a>
                    </div>
                </div>
                
                <div class="profile-icon">J</div>
            </nav>

            <!-- Burger Menu Button (Mobile Only) -->
            <button class="burger-menu" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu-overlay">
            <nav class="mobile-nav">
                <!-- Mobile Switch to Donor Button -->
                <a href="donor.html" class="mobile-nav-btn">
    <i class="bi bi-person"></i>
    Switch to Donor
</a>
                
                <!-- Mobile Notification -->
                <a href="#" class="nav-btn mobile-nav-btn">
                    <i class="bi bi-bell"></i>
                    Notifications
                    <span class="mobile-badge">3</span>
                </a>
                
                <!-- Mobile Settings -->
                <a href="#" class="nav-btn mobile-nav-btn">
                    <i class="bi bi-gear"></i>
                    Settings
                </a>
                
                <!-- Mobile Settings Options -->
                <div class="mobile-settings-options">
                    <a href="#" class="mobile-settings-item">
                        <i class="bi bi-person"></i>
                        Profile Settings
                    </a>
                    <a href="#" class="mobile-settings-item">
                        <i class="bi bi-bell"></i>
                        Notifications
                    </a>
                    <a href="#" class="mobile-settings-item">
                        <i class="bi bi-shield-check"></i>
                        Privacy & Security
                    </a>
                    <a href="#" class="mobile-settings-item">
                        <i class="bi bi-question-circle"></i>
                        Help & Support
                    </a>
                    <a href="#" class="mobile-settings-item logout">
                        <i class="bi bi-box-arrow-right"></i>
                        Logout
                    </a>
                </div>
                
                <div class="profile-icon mobile-profile">J</div>
            </nav>
        </div>
    </header>

    <main class="dashboard-container">
        <!-- RECIPIENT VIEW -->
        <div id="recipient-view" class="mode-view active">
            <nav class="breadcrumb">
                <a href="#" class="breadcrumb-link active" data-page="recipient-home">
                    <svg class="breadcrumb-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Home</span>
                </a>
                <a href="#" class="breadcrumb-link" data-page="recipient-dashboard">
                    <svg class="breadcrumb-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18"></path>
                        <path d="M18 17V9"></path>
                        <path d="M13 17V5"></path>
                        <path d="M8 17v-3"></path>
                    </svg>
                    <span>Dashboard</span>
                </a>
            </nav>

           <!-- Recipient Home -->
<section id="recipient-home" class="page-content">
    <div class="welcome-section">
        <div class="welcome-content">
            <h2 class="welcome-title">Welcome back, Juan Dela Cruz!</h2>
            <p class="welcome-message">We're here to support your needs in Bogo City</p>
        </div>
    </div>
    
    <!-- Recipient Metrics Section -->
    <div class="recipient-metrics">
        <div class="metrics-row">
            <div class="metric-card">
                <div class="metric-content">
                    <div class="metric-number">2</div>
                    <div class="metric-label">Active Requests</div>
                </div>
                <div class="metric-icon">
                    <i class="bi bi-clock-history"></i>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-content">
                    <div class="metric-number">58</div>
                    <div class="metric-label">Total Supporters</div>
                </div>
                <div class="metric-icon">
                    <i class="bi bi-people"></i>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-content">
                    <div class="metric-number">₱18,700</div>
                    <div class="metric-label">Total Received</div>
                </div>
                <div class="metric-icon">
                    <i class="bi bi-currency-dollar"></i>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-content">
                    <div class="metric-number">1</div>
                    <div class="metric-label">Completed</div>
                </div>
                <div class="metric-icon">
                    <i class="bi bi-check-circle"></i>
                </div>
            </div>
        </div>
    </div>

   <!-- Main Content Area with Sidebar -->
<div class="main-content-with-sidebar">
    <!-- Requests Section (Left Side) -->
    <div class="requests-section">
        <!-- My Requests Header -->
        <div class="requests-header">
            <h2 class="requests-title">My Requests</h2>
            <button class="new-request-btn">
                <i class="bi bi-plus-lg"></i> New Request
            </button>
        </div>

        <!-- Filter Buttons -->
        <div class="requests-filter">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>

   <!-- Campaigns Grid -->
<div class="campaigns-grid">
    <!-- Campaign Card 1 -->
    <div class="campaign-card" data-status="active">
        <div class="campaign-content">
            <div class="campaign-header">
                <h3>Medical Assistance for Dialysis</h3>
                <span class="campaign-tag medical">Medical</span>
            </div>
            
            <div class="campaign-info">
                <p class="campaign-meta">Posted 3 days ago • Barangay La Paz</p>
                <div class="campaign-image">
                    <img src="images/oldguy.webp" alt="Medical Assistance" class="campaign-img">
                </div>
                <h4 class="campaign-need">Weekly Dialysis Treatment</h4>
                <p class="campaign-description">Need assistance for weekly dialysis treatments. Current condition requires immediate medical attention and ongoing treatment.</p>
            </div>
            
            <div class="campaign-progress-section">
                <div class="progress-info">
                    <span class="progress-label">Amount Raised</span>
                    <span class="campaign-raised">₱8,500</span> / <span class="campaign-goal">₱15,000</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 56.7%"></div>
                </div>
                <div class="progress-stats">
                    <span class="progress-percent">56.7% funded</span>
                    <span class="supporters">23 supporters</span>
                    <span class="time-left">5 days left</span>
                </div>
            </div>
            
            <div class="campaign-actions">
                <button class="action-btn view-details-btn">View Details</button>
                <button class="action-btn message-btn">
                    Messages
                    <span class="message-count">2</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Campaign Card 2 -->
    <div class="campaign-card" data-status="active">
        <div class="campaign-content">
            <div class="campaign-header">
                <h3>Educational Support for Children</h3>
                <span class="campaign-tag education">Education</span>
            </div>
            
            <div class="campaign-info">
                <p class="campaign-meta">Posted 2 days ago • Barangay La Paz</p>
                <div class="campaign-image">
                    <img src="images/student.webp" alt="Educational Support" class="campaign-img">
                </div>
                <h4 class="campaign-need">School Supplies & Uniforms</h4>
                <p class="campaign-description">Need assistance for my children's school supplies, uniforms, and miscellaneous fees for the upcoming semester.</p>
            </div>
            
            <div class="campaign-progress-section">
                <div class="progress-info">
                    <span class="progress-label">Amount Raised</span>
                    <span class="campaign-raised">₱3,000</span> / <span class="campaign-goal">₱10,000</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 30%"></div>
                </div>
                <div class="progress-stats">
                    <span class="progress-percent">30% funded</span>
                    <span class="supporters">8 supporters</span>
                    <span class="time-left">12 days left</span>
                </div>
            </div>
            
            <div class="campaign-actions">
                <button class="action-btn view-details-btn">View Details</button>
                <button class="action-btn message-btn">
                    Messages
                    <span class="message-count">1</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Campaign Card 3 -->
    <div class="campaign-card" data-status="completed">
        <div class="campaign-content">
            <div class="campaign-header">
                <h3>Food Assistance During Recovery</h3>
                <span class="campaign-tag food">Food</span>
            </div>
            
            <div class="campaign-info">
                <p class="campaign-meta">Posted 2 weeks ago • Barangay La Paz</p>
                <div class="campaign-image">
                    <img src="images/familysupport.jpg" alt="Food Assistance" class="campaign-img">
                </div>
                <h4 class="campaign-need">Family Food Support</h4>
                <p class="campaign-description">Received enough support for our family's food needs during recovery period. Thank you to all donors!</p>
            </div>
            
            <div class="campaign-progress-section">
                <div class="progress-info">
                    <span class="progress-label">Amount Raised</span>
                    <span class="campaign-raised">₱2,700</span> / <span class="campaign-goal">₱2,700</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%"></div>
                </div>
                <div class="progress-stats">
                    <span class="progress-percent">100% funded</span>
                    <span class="supporters">15 supporters</span>
                    <span class="time-left completed">Completed</span>
                </div>
            </div>
            
            <div class="campaign-actions">
                <button class="action-btn view-details-btn">View Details</button>
                <button class="action-btn message-btn">
                    <i class="bi bi-star"></i> Thank Donors
                </button>
            </div>
        </div>
    </div>
</div>
</div>

<!-- Chat Sidebar (Right Side) -->
<div class="chat-sidebar">
    <div class="sidebar-header">
        <h3>Recent Messages</h3>
        <p>Select a conversation to continue chatting</p>
    </div>
    
    <div class="chat-list">
        <!-- Chat Item 1 -->
        <div class="chat-item unread">
            <div class="chat-avatar education">MS</div>
            <div class="chat-content">
                <div class="chat-sender">
                    <span class="sender-name">Maria Santos</span>
                    <span class="chat-time">2h ago</span>
                </div>
                <div class="chat-preview">
                    "I'd like to help with your children's education. Can you share more details about their school needs?"
                </div>
                <div class="chat-request">Educational Support</div>
                <div class="unread-indicator">
                    <div class="unread-dot"></div>
                    <span class="unread-text">2 new messages</span>
                </div>
            </div>
        </div>

        <!-- Chat Item 2 -->
        <div class="chat-item">
            <div class="chat-avatar medical">JC</div>
            <div class="chat-content">
                <div class="chat-sender">
                    <span class="sender-name">Juan Carlos</span>
                    <span class="chat-time">1d ago</span>
                </div>
                <div class="chat-preview">
                    "How many dialysis sessions per week do you need? I want to understand the medical requirements better."
                </div>
                <div class="chat-request">Medical Assistance</div>
                <div class="chat-status">
                    <div class="status-dot online"></div>
                    <span>Online</span>
                </div>
            </div>
        </div>

        <!-- Chat Item 3 -->
        <div class="chat-item">
            <div class="chat-avatar education">AR</div>
            <div class="chat-content">
                <div class="chat-sender">
                    <span class="sender-name">Ana Reyes</span>
                    <span class="chat-time">2d ago</span>
                </div>
                <div class="chat-preview">
                    "Do you need specific school supplies or would a cash donation be better for your children's needs?"
                </div>
                <div class="chat-request">Educational Support</div>
                <div class="chat-status">
                    <div class="status-dot offline"></div>
                    <span>Last seen yesterday</span>
                </div>
            </div>
        </div>

        <!-- Chat Item 4 -->
        <div class="chat-item">
            <div class="chat-avatar food">RG</div>
            <div class="chat-content">
                <div class="chat-sender">
                    <span class="sender-name">Roberto Garcia</span>
                    <span class="chat-time">3d ago</span>
                </div>
                <div class="chat-preview">
                    "Thank you for the update! I'm glad our support helped your family during the recovery period."
                </div>
                <div class="chat-request">Food Assistance</div>
            </div>
        </div>

        <!-- Chat Item 5 -->
<div class="chat-item">
    <div class="chat-avatar housing">LM</div>
    <div class="chat-content">
        <div class="chat-sender">
            <span class="sender-name">Lorna Mercado</span>
            <span class="chat-time">1w ago</span>
        </div>
        <div class="chat-preview">
            "I have some construction materials that might help with your home repair. Let me know if you're interested."
        </div>
        <div class="chat-request">Home Repair</div>
    </div>
</div>
</div> <!-- This closes the chat-list -->



<!-- Assistance Programs Section -->
<div class="assistance-programs">
    <div class="programs-header">
        <h3>Available Assistance Programs</h3>
        <p>Programs you may be eligible for</p>
    </div>
    
    <div class="programs-grid">
        <!-- Program Card 1 - Food Bank -->
        <div class="program-card">
            <div class="program-icon food">
                <i class="bi bi-basket"></i>
            </div>
            <div class="program-content">
                <div class="program-header">
                    <h4>Community Food Bank</h4>
                    <span class="program-type">Ongoing Program</span>
                </div>
                <p class="program-description">Weekly food distribution for families in need. Register to receive monthly food packages.</p>
                <div class="program-footer">
                    <span class="participants">
                        <i class="bi bi-people"></i>
                        150 participants
                    </span>
                    <button class="apply-btn">Apply Now</button>
                </div>
            </div>
        </div>

        <!-- Program Card 2 - Medical Assistance -->
        <div class="program-card">
            <div class="program-icon medical">
                <i class="bi bi-heart-pulse"></i>
            </div>
            <div class="program-content">
                <div class="program-header">
                    <h4>Medical Assistance Fund</h4>
                    <span class="program-type">Emergency Fund</span>
                </div>
                <p class="program-description">Emergency medical fund for low-income families. Apply for medical bill assistance.</p>
                <div class="program-footer">
                    <span class="participants">
                        <i class="bi bi-people"></i>
                        85 participants
                    </span>
                    <button class="apply-btn">Apply Now</button>
                </div>
            </div>
        </div>

        <!-- Program Card 3 - Education Scholarship -->
        <div class="program-card">
            <div class="program-icon education">
                <i class="bi bi-book"></i>
            </div>
            <div class="program-content">
                <div class="program-header">
                    <h4>Education Scholarship</h4>
                    <span class="program-type">Scholarship</span>
                </div>
                <p class="program-description">Scholarship program for deserving students. Covers tuition and school supplies.</p>
                <div class="program-footer">
                    <span class="participants">
                        <i class="bi bi-people"></i>
                        60 participants
                    </span>
                    <button class="apply-btn">Apply Now</button>
                </div>
            </div>
        </div>

        <!-- Program Card 4 - Clothing Drive -->
        <div class="program-card">
            <div class="program-icon clothing">
                <i class="fas fa-tshirt"></i>
            </div>
            <div class="program-content">
                <div class="program-header">
                    <h4>Clothing Drive</h4>
                    <span class="program-type">Monthly Event</span>
                </div>
                <p class="program-description">Monthly clothing distribution for families. Free clothes and essentials available.</p>
                <div class="program-footer">
                    <span class="participants">
                        <i class="bi bi-people"></i>
                        120 participants
                    </span>
                    <button class="apply-btn">Apply Now</button>
                </div>
            </div>
        </div>
    </div>
</div>

</div> <!-- This closes the chat-sidebar -->
</section> <!-- This closes the recipient-home section -->

                                     <!-- Recipient Dashboard -->
            <section id="recipient-dashboard" class="page-content" style="display: none;">
                <div class="welcome-section">
                    <div class="welcome-content">
                        <h2 class="welcome-title">Dashboard Analytics</h2>
                        <p class="welcome-message">Track your request performance and supporter engagement</p>
                    </div>
                </div>

                <!-- Dashboard Stats - 4 cards in one row -->
                <div class="dashboard-stats">
                    <!-- Total Received - Blue -->
                    <div class="stat-card total-received">
                        <div class="stat-icon">
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Total Received</h3>
                            <p class="stat-value">₱18,700</p>
                            <p class="stat-change">+12% from last month</p>
                        </div>
                    </div>

                    <!-- Total Supporters - Purple -->
                    <div class="stat-card total-supporters">
                        <div class="stat-icon">
                            <i class="bi bi-people"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Total Supporters</h3>
                            <p class="stat-value">58</p>
                            <p class="stat-change">+8 new this week</p>
                        </div>
                    </div>

                    <!-- Active Requests - Red -->
                    <div class="stat-card active-requests">
                        <div class="stat-icon">
                            <i class="bi bi-clock-history"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Active Requests</h3>
                            <p class="stat-value">2</p>
                            <p class="stat-change">1 needs attention</p>
                        </div>
                    </div>

                    <!-- Completed - Green -->
                    <div class="stat-card completed-requests">
                        <div class="stat-icon">
                            <i class="bi bi-check-circle"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Completed</h3>
                            <p class="stat-value">1</p>
                            <p class="stat-change">100% success rate</p>
                        </div>
                    </div>
                </div>

                <!-- Charts Section - Side by Side -->
                <div class="dashboard-charts">
                    <!-- Monthly Progress Chart (Line Chart) -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <h4>Monthly Progress</h4>
                            <p>Amount received vs goals over time</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="monthlyProgressChart"></canvas>
                        </div>
                    </div>

                    <!-- Support by Category Chart (Pie Chart) -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <h4>Support by Category</h4>
                            <p>Distribution of assistance received</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="supportCategoryChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Timeline & Donations Section - Side by Side -->
                <div class="dashboard-timeline-donations">
                                                         <!-- Request Timeline -->
                    <div class="timeline-card">
                        <div class="timeline-header">
                            <div class="header-icon">
                                <i class="bi bi-calendar-check"></i>
                            </div>
                            <div class="header-content">
                                <h4>Request Timeline</h4>
                                <p>History of your assistance requests</p>
                            </div>
                        </div>
                        <div class="timeline-content">
                            <!-- Timeline Item 1 - Completed -->
                            <div class="timeline-item">
                                <div class="timeline-marker completed">
                                    <i class="bi bi-check-circle"></i>
                                </div>
                                <div class="timeline-details">
                                    <div class="timeline-header-row">
                                        <h5>Food Assistance During Recovery</h5>
                                        <span class="campaign-tag food">Food</span>
                                    </div>
                                    <div class="timeline-status">
                                        <span class="timeline-badge completed">Completed</span>
                                        <span class="timeline-date">Created: Oct 25, 2024</span>
                                    </div>
                                    <div class="timeline-progress completed">
                                        <div class="progress-info">
                                            <span class="progress-label">Final Amount</span>
                                            <span class="campaign-raised">₱2,700</span> / <span class="campaign-goal">₱2,700</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 100%"></div>
                                        </div>
                                        <div class="progress-stats">
                                            <span class="supporters">15 supporters</span>
                                            <span class="progress-percent">100% funded</span>
                                        </div>
                                    </div>
                                    <p class="timeline-description">Family food support during recovery period. Successfully completed with full funding.</p>
                                </div>
                            </div>

                            <!-- Timeline Item 2 - Active -->
                            <div class="timeline-item">
                                <div class="timeline-marker active">
                                    <i class="bi bi-clock-history"></i>
                                </div>
                                <div class="timeline-details">
                                    <div class="timeline-header-row">
                                        <h5>Medical Assistance for Dialysis</h5>
                                        <span class="campaign-tag medical">Medical</span>
                                    </div>
                                    <div class="timeline-status">
                                        <span class="timeline-badge active">Active</span>
                                        <span class="timeline-date">Created: Nov 5, 2024</span>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="progress-info">
                                            <span class="progress-label">Progress</span>
                                            <span class="campaign-raised">₱8,500</span> / <span class="campaign-goal">₱15,000</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 56.7%"></div>
                                        </div>
                                        <div class="progress-stats">
                                            <span class="supporters">23 supporters</span>
                                            <span class="progress-percent">57% funded</span>
                                            <span class="time-left">5 days left</span>
                                        </div>
                                    </div>
                                    <p class="timeline-description">Weekly dialysis treatments. Current condition requires immediate medical attention.</p>
                                </div>
                            </div>

                            <!-- Timeline Item 3 - Active -->
                            <div class="timeline-item">
                                <div class="timeline-marker active">
                                    <i class="bi bi-clock-history"></i>
                                </div>
                                <div class="timeline-details">
                                    <div class="timeline-header-row">
                                        <h5>Educational Support for Children</h5>
                                        <span class="campaign-tag education">Education</span>
                                    </div>
                                    <div class="timeline-status">
                                        <span class="timeline-badge active">Active</span>
                                        <span class="timeline-date">Created: Nov 10, 2024</span>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="progress-info">
                                            <span class="progress-label">Progress</span>
                                            <span class="campaign-raised">₱3,000</span> / <span class="campaign-goal">₱10,000</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 30%"></div>
                                        </div>
                                        <div class="progress-stats">
                                            <span class="supporters">8 supporters</span>
                                            <span class="progress-percent">30% funded</span>
                                            <span class="time-left">12 days left</span>
                                        </div>
                                    </div>
                                    <p class="timeline-description">School supplies, uniforms, and miscellaneous fees for the upcoming semester.</p>
                                </div>
                            </div>

                            <!-- Timeline Item 4 - System -->
                            <div class="timeline-item">
                                <div class="timeline-marker system">
                                    <i class="bi bi-shield-check"></i>
                                </div>
                                <div class="timeline-details">
                                    <div class="timeline-header-row">
                                        <h5>Profile Verified</h5>
                                        <span class="campaign-tag system">System</span>
                                    </div>
                                    <div class="timeline-status">
                                        <span class="timeline-badge verified">Verified</span>
                                        <span class="timeline-date">Nov 1, 2024</span>
                                    </div>
                                    <p class="timeline-description">Your recipient profile has been verified by BogoCares team. You can now create assistance requests.</p>
                                </div>
                            </div>

                            <!-- View All Timeline Button -->
                            <div class="timeline-footer">
                                <button class="view-all-btn">
                                    <i class="bi bi-clock-history"></i>
                                    View Full Timeline
                                </button>
                            </div>
                        </div>
                    </div>

                                       <!-- Recent Donations -->
                    <div class="donations-card">
                        <div class="donations-header">
                            <div class="header-icon">
                                <i class="bi bi-heart"></i>
                            </div>
                            <div class="header-content">
                                <h4>Recent Donations</h4>
                                <p>Latest support from the community</p>
                            </div>
                        </div>
                        <div class="donations-content">
                            <!-- Donation Item 1 -->
                            <div class="donation-item">
                                <div class="donor-avatar">MR</div>
                                <div class="donation-details">
                                    <div class="donor-info">
                                        <div class="donor-main">
                                            <h5>Maria Rodriguez</h5>
                                            <span class="donation-time">2 hours ago</span>
                                        </div>
                                        <div class="donation-amount-type">
                                            <span class="donation-amount">₱2,000</span>
                                            <span class="donation-type money">Money</span>
                                        </div>
                                    </div>
                                    <p class="donation-message">"Praying for your recovery!"</p>
                                    <div class="donation-campaign">
                                        <i class="bi bi-arrow-right"></i>
                                        For: Medical Assistance for Dialysis
                                    </div>
                                </div>
                            </div>

                            <!-- Donation Item 2 -->
                            <div class="donation-item">
                                <div class="donor-avatar">JS</div>
                                <div class="donation-details">
                                    <div class="donor-info">
                                        <div class="donor-main">
                                            <h5>Jose Santos</h5>
                                            <span class="donation-time">1 day ago</span>
                                        </div>
                                        <div class="donation-amount-type">
                                            <span class="donation-amount">₱1,500</span>
                                            <span class="donation-type money">Money</span>
                                        </div>
                                    </div>
                                    <p class="donation-message">"Hope this helps!"</p>
                                    <div class="donation-campaign">
                                        <i class="bi bi-arrow-right"></i>
                                        For: Medical Assistance for Dialysis
                                    </div>
                                </div>
                            </div>

                            <!-- Donation Item 3 -->
                            <div class="donation-item">
                                <div class="donor-avatar">AC</div>
                                <div class="donation-details">
                                    <div class="donor-info">
                                        <div class="donor-main">
                                            <h5>Ana Cruz</h5>
                                            <span class="donation-time">2 days ago</span>
                                        </div>
                                        <div class="donation-amount-type">
                                            <span class="donation-type items">Items Donated</span>
                                        </div>
                                    </div>
                                    <p class="donation-items">School supplies (notebooks, pens, backpack)</p>
                                    <p class="donation-message">"For your children's education"</p>
                                    <div class="donation-campaign">
                                        <i class="bi bi-arrow-right"></i>
                                        For: Educational Support for Children
                                    </div>
                                </div>
                            </div>

                            <!-- Donation Item 4 -->
                            <div class="donation-item">
                                <div class="donor-avatar">PG</div>
                                <div class="donation-details">
                                    <div class="donor-info">
                                        <div class="donor-main">
                                            <h5>Pedro Garcia</h5>
                                            <span class="donation-time">3 days ago</span>
                                        </div>
                                        <div class="donation-amount-type">
                                            <span class="donation-amount">₱3,000</span>
                                            <span class="donation-type money">Money</span>
                                        </div>
                                    </div>
                                    <p class="donation-message">"God bless your family"</p>
                                    <div class="donation-campaign">
                                        <i class="bi bi-arrow-right"></i>
                                        For: Food Assistance During Recovery
                                    </div>
                                </div>
                            </div>

                            <!-- Donation Item 5 -->
                            <div class="donation-item">
                                <div class="donor-avatar">CL</div>
                                <div class="donation-details">
                                    <div class="donor-info">
                                        <div class="donor-main">
                                            <h5>Carmen Lopez</h5>
                                            <span class="donation-time">5 days ago</span>
                                        </div>
                                        <div class="donation-amount-type">
                                            <span class="donation-amount">₱2,000</span>
                                            <span class="donation-type money">Money</span>
                                        </div>
                                    </div>
                                    <p class="donation-message">"Stay strong!"</p>
                                    <div class="donation-campaign">
                                        <i class="bi bi-arrow-right"></i>
                                        For: Medical Assistance for Dialysis
                                    </div>
                                </div>
                            </div>


                            <!-- View All Donations Button -->
                            <div class="donations-footer">
                                <button class="view-all-btn">
                                    <i class="bi bi-heart"></i>
                                    View All Donations
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

               
            </section>

        </div>
    </main>

    <script src="recipient.js"></script>
</body>
</html>