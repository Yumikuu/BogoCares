<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: admin-login.php");
    exit();
}

require_once 'config/database.php';
require_once 'models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BogoCares Admin Dashboard</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="admin.css">
</head>
<body>
    <div class="overlay"></div>
    
    <div class="d-flex">
       <!-- Sidebar -->
<div class="sidebar" id="sidebar">
    <div class="sidebar-brand">
        <img src="images/logo.png" alt="BogoCares Logo" class="logo me-2">
        <span class="brand-text">
            <span class="brand-name-white">BogoCares</span>
        </span>
        <span class="admin-text">Admin</span>
    </div>
    
    <ul class="nav flex-column">
        <li class="nav-item">
            <a class="nav-link active" href="admin-dashboard.php">
                <i class="bi bi-speedometer2"></i>Dashboard
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="admin-donors.php">
                <i class="bi bi-people"></i>Donors
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="admin-donations.php">
                <i class="bi bi-cash-coin"></i>Donations
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="admin-analytics.php">
                <i class="bi bi-bar-chart"></i>Analytics
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="admin-settings.php">
                <i class="bi bi-gear"></i>Settings
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="admin-help.php">
                <i class="bi bi-question-circle"></i>Help
            </a>
        </li>
    </ul>
</div>
        
        <!-- Main Content -->
        <div class="main-content flex-grow-1" style="margin-left: 0;">
            <!-- Top Navbar -->
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i class="bi bi-list"></i>
                    </button>
                    <a class="navbar-brand ms-2" href="#">
                        <img src="images/logo.png" alt="BogoCares Logo" class="logo me-2">
                        <span class="bogo">Bogo</span><span class="cares">Cares</span>
                    </a>
                    
                    <div class="d-flex align-items-center">
                        <div class="dropdown me-3">
                            <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="notificationsDropdown" data-bs-toggle="dropdown">
                                <i class="bi bi-bell fs-5 text-muted"></i>
                                <span class="badge bg-danger rounded-pill position-absolute translate-middle">3</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#">New donation received</a></li>
                                <li><a class="dropdown-item" href="#">Monthly report ready</a></li>
                                <li><a class="dropdown-item" href="#">System update available</a></li>
                            </ul>
                        </div>
                        
                        <div class="dropdown">
                            <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown">
                                <img src="https://ui-avatars.com/api/?name=<?php echo urlencode($_SESSION['admin_name']); ?>&background=random" alt="Admin" class="rounded-circle me-2" width="32" height="32">
                                <span class="d-none d-md-inline"><?php echo htmlspecialchars($_SESSION['admin_name']); ?></span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
                                <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="admin-logout.php"><i class="bi bi-box-arrow-right me-2"></i>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            
            <!-- Page Content -->
            <div class="container-fluid py-4">
                <!-- Welcome Message -->
                <div class="alert alert-primary mb-4">
                    <h4 class="alert-heading">Welcome back, <?php echo htmlspecialchars($_SESSION['admin_name']); ?>!</h4>
                    <p class="mb-0">You are logged in as an administrator. Here's an overview of your BogoCares platform.</p>
                </div>

                <!-- Stats Cards -->
                <div class="row">
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Total Users</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                                            <?php
                                            $sql = "SELECT COUNT(*) as total FROM users";
                                            $stmt = $db->prepare($sql);
                                            $stmt->execute();
                                            $result = $stmt->fetch(PDO::FETCH_ASSOC);
                                            echo $result['total'];
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="bi bi-people fs-1 text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Verified Users</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                                            <?php
                                            $sql = "SELECT COUNT(*) as total FROM users WHERE is_verified = 1";
                                            $stmt = $db->prepare($sql);
                                            $stmt->execute();
                                            $result = $stmt->fetch(PDO::FETCH_ASSOC);
                                            echo $result['total'];
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="bi bi-check-circle fs-1 text-success"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Pending Verification</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                                            <?php
                                            $sql = "SELECT COUNT(*) as total FROM users WHERE is_verified = 0";
                                            $stmt = $db->prepare($sql);
                                            $stmt->execute();
                                            $result = $stmt->fetch(PDO::FETCH_ASSOC);
                                            echo $result['total'];
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="bi bi-clock fs-1 text-warning"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                            Admin Users</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                                            <?php
                                            $sql = "SELECT COUNT(*) as total FROM users WHERE is_admin = 1";
                                            $stmt = $db->prepare($sql);
                                            $stmt->execute();
                                            $result = $stmt->fetch(PDO::FETCH_ASSOC);
                                            echo $result['total'];
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="bi bi-shield-check fs-1 text-info"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Charts and Tables -->
                <div class="row">
                    <!-- Recent Users -->
                    <div class="col-xl-8 col-lg-7">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-white">Recent Users</h6>
                                <div class="dropdown no-arrow">
                                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown">
                                        <i class="bi bi-three-dots-vertical text-gray-400"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end shadow">
                                        <a class="dropdown-item" href="admin-donors.php">View All Users</a>
                                        <a class="dropdown-item" href="#">Export Data</a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Status</th>
                                                <th>Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            $sql = "SELECT full_name, email, phone_number, is_verified, created_at 
                                                    FROM users 
                                                    ORDER BY created_at DESC 
                                                    LIMIT 5";
                                            $stmt = $db->prepare($sql);
                                            $stmt->execute();
                                            while ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                                $status = $user['is_verified'] ? '<span class="badge bg-success">Verified</span>' : '<span class="badge bg-warning">Pending</span>';
                                                echo "
                                                <tr>
                                                    <td>{$user['full_name']}</td>
                                                    <td>{$user['email']}</td>
                                                    <td>{$user['phone_number']}</td>
                                                    <td>{$status}</td>
                                                    <td>" . date('M j, Y', strtotime($user['created_at'])) . "</td>
                                                </tr>";
                                            }
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                                <a href="admin-donors.php" class="btn btn-primary-custom btn-sm btn-block mt-2">View All Users</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="col-xl-4 col-lg-5">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-white">Quick Actions</h6>
                            </div>
                            <div class="card-body">
                                <div class="d-grid gap-2">
                                    <a href="admin-donors.php" class="btn btn-primary-custom btn-sm">
                                        <i class="bi bi-people me-2"></i>Manage Users
                                    </a>
                                    <a href="admin-donations.php" class="btn btn-success-custom btn-sm">
                                        <i class="bi bi-cash-coin me-2"></i>View Donations
                                    </a>
                                    <a href="admin-verification.php" class="btn btn-warning-custom btn-sm">
                                        <i class="bi bi-shield-check me-2"></i>Verify Users
                                    </a>
                                    <a href="admin-settings.php" class="btn btn-info-custom btn-sm">
                                        <i class="bi bi-gear me-2"></i>System Settings
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- AI Verification Section -->
                <div class="row">
                    <div class="col-12">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                                <h6 class="m-0 font-weight-bold text-white">
                                    <i class="bi bi-robot me-2"></i>AI Request Verification
                                </h6>
                                <div>
                                    <span class="badge bg-warning me-2" id="pendingRequestsCount">0 Pending</span>
                                    <button class="btn btn-sm btn-primary-custom" id="runAiVerificationBtn">
                                        <i class="bi bi-play-circle me-1"></i>Run Verification
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-info">
                                    <i class="bi bi-info-circle me-2"></i>
                                    AI Verification system will be implemented in the next phase. This feature will automatically verify donation requests and user submissions.
                                </div>
                                
                                <!-- AI Configuration -->
                                <div class="mt-4">
                                    <h6 class="mb-3">AI Verification Settings</h6>
                                    <div class="row">
                                        <div class="col-md-4 mb-3">
                                            <label for="aiConfidenceThreshold" class="form-label">Confidence Threshold</label>
                                            <input type="range" class="form-range" id="aiConfidenceThreshold" min="50" max="95" value="75">
                                            <div class="form-text">Current: <span id="thresholdValue">75%</span></div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="aiAutoApprove" class="form-label">Auto-Approval</label>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="aiAutoApprove" checked>
                                                <label class="form-check-label" for="aiAutoApprove">Auto-approve high-confidence requests</label>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="aiNotification" class="form-label">Notifications</label>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="aiNotification" checked>
                                                <label class="form-check-label" for="aiNotification">Notify admins of declined requests</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Custom JS -->
    <script src="admin.js"></script>
</body>
</html>