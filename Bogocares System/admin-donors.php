


<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: admin-login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donors - BogoCares Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
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
            <a class="nav-link" href="admin.html">
                <i class="bi bi-speedometer2"></i>Dashboard
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" href="donors.html">
                <i class="bi bi-people"></i>Donors
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="donations.html">
                <i class="bi bi-cash-coin"></i>Donations
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="analytics.html">
                <i class="bi bi-bar-chart"></i>Analytics
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="settings.html">
                <i class="bi bi-gear"></i>Settings
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="help.html">
                <i class="bi bi-question-circle"></i>Help
            </a>
        </li>
    </ul>
</div>
        
        <!-- Main Content -->
        <div class="main-content flex-grow-1" style="margin-left: 0;">
            <!-- Navbar -->
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
                                <li><a class="dropdown-item" href="#">New donor registered</a></li>
                                <li><a class="dropdown-item" href="#">Monthly report ready</a></li>
                                <li><a class="dropdown-item" href="#">System update available</a></li>
                            </ul>
                        </div>
                        
                        <div class="dropdown">
                            <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown">
                                <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" class="rounded-circle me-2" width="32" height="32">
                                <span class="d-none d-md-inline">Admin User</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
                                <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            
            <!-- Page Specific Content -->
            <div class="container-fluid py-4">
                <!-- Page Header -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 class="mb-1">Donor Management</h2>
                        <p class="text-muted">Manage and view all donors information</p>
                    </div>
                    <button class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#addDonorModal">
                        <i class="bi bi-plus-circle me-2"></i>Add New Donor
                    </button>
                </div>
                
                <!-- Stats Cards -->
                <div class="row mb-4">
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Total Donors</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">1,248</div>
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
                                            Active This Month</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">184</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="bi bi-person-check fs-1 text-success"></i>
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
                                            New This Week</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">42</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="bi bi-person-plus fs-1 text-info"></i>
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
                                            Recurring Donors</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">312</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="bi bi-arrow-repeat fs-1 text-warning"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Search and Filter -->
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search donors..." id="searchDonors">
                                    <button class="btn btn-primary-custom" type="button">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <select class="form-select" id="filterStatus">
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="recurring">Recurring</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="form-select" id="filterCampaign">
                                    <option value="">All Campaigns</option>
                                    <option value="education">Education for All</option>
                                    <option value="water">Clean Water Initiative</option>
                                    <option value="medical">Medical Aid Program</option>
                                    <option value="disaster">Disaster Relief</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Donor List -->
                <div class="card shadow">
                    <div class="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 class="m-0 font-weight-bold text-white">Donor List</h6>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary me-2" id="exportBtn">
                                <i class="bi bi-download"></i> Export
                            </button>
                            <button class="btn btn-sm btn-outline-secondary" id="printBtn">
                                <i class="bi bi-printer"></i> Print
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover" id="donorsTable">
                                <thead>
                                    <tr>
                                        <th>Donor ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Total Donated</th>
                                        <th>Last Donation</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>D-1001</td>
                                        <td>John Smith</td>
                                        <td>john.smith@email.com</td>
                                        <td>(555) 123-4567</td>
                                        <td>$1,250</td>
                                        <td>May 15, 2023</td>
                                        <td><span class="badge bg-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary-custom view-donor"><i class="bi bi-eye"></i></button>
                                            <button class="btn btn-sm btn-success-custom edit-donor"><i class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger delete-donor"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>D-1002</td>
                                        <td>Sarah Johnson</td>
                                        <td>sarah.j@email.com</td>
                                        <td>(555) 987-6543</td>
                                        <td>$500</td>
                                        <td>May 14, 2023</td>
                                        <td><span class="badge bg-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary-custom view-donor"><i class="bi bi-eye"></i></button>
                                            <button class="btn btn-sm btn-success-custom edit-donor"><i class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger delete-donor"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>D-1003</td>
                                        <td>Michael Brown</td>
                                        <td>m.brown@email.com</td>
                                        <td>(555) 456-7890</td>
                                        <td>$2,500</td>
                                        <td>May 10, 2023</td>
                                        <td><span class="badge bg-warning">Recurring</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary-custom view-donor"><i class="bi bi-eye"></i></button>
                                            <button class="btn btn-sm btn-success-custom edit-donor"><i class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger delete-donor"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>D-1004</td>
                                        <td>Emily Davis</td>
                                        <td>emily.davis@email.com</td>
                                        <td>(555) 234-5678</td>
                                        <td>$750</td>
                                        <td>Apr 28, 2023</td>
                                        <td><span class="badge bg-secondary">Inactive</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary-custom view-donor"><i class="bi bi-eye"></i></button>
                                            <button class="btn btn-sm btn-success-custom edit-donor"><i class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger delete-donor"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>D-1005</td>
                                        <td>Robert Wilson</td>
                                        <td>r.wilson@email.com</td>
                                        <td>(555) 345-6789</td>
                                        <td>$1,800</td>
                                        <td>May 5, 2023</td>
                                        <td><span class="badge bg-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary-custom view-donor"><i class="bi bi-eye"></i></button>
                                            <button class="btn btn-sm btn-success-custom edit-donor"><i class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger delete-donor"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Pagination -->
                        <nav aria-label="Donor pagination">
                            <ul class="pagination justify-content-center mt-4">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                                </li>
                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Donor Modal -->
    <div class="modal fade" id="addDonorModal" tabindex="-1" aria-labelledby="addDonorModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addDonorModalLabel">Add New Donor</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addDonorForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="firstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstName" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastName" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="tel" class="form-control" id="phone">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="address">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="city" class="form-label">City</label>
                                <input type="text" class="form-control" id="city">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="state" class="form-label">State</label>
                                <input type="text" class="form-control" id="state">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="zip" class="form-label">ZIP</label>
                                <input type="text" class="form-control" id="zip">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="notes" class="form-label">Notes</label>
                            <textarea class="form-control" id="notes" rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary-custom" id="saveDonorBtn">Save Donor</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Shared Admin JS -->
    <script src="admin.js"></script>
    <!-- Donors Page Specific JS -->
    <script src="donors.js"></script>
</body>
</html>