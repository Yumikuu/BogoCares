<?php
session_start();
// If already logged in, redirect to dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: admin-dashboard.php");
    exit();
}

require_once 'config/database.php';
require_once 'models/User.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Check if user exists and is admin
    $admin_user = $user->getAdminByEmail($email);
    
    if ($admin_user && password_verify($password, $admin_user['password'])) {
        // Login successful
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $admin_user['id'];
        $_SESSION['admin_name'] = $admin_user['full_name'];
        $_SESSION['admin_email'] = $admin_user['email'];
        
        header("Location: admin-dashboard.php");
        exit();
    } else {
        $error = "Invalid email or password!";
    }
}
?>