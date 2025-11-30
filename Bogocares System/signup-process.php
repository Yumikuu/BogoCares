<?php
session_start();
require_once 'config/database.php';
require_once 'models/User.php';

// Initialize database connection
$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$errors = [];

if ($_POST) {
    // Get form data
    $full_name = $_POST['full_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone_number = $_POST['phone_number'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $user_type = $_POST['user_type'] ?? 'donor'; // Default to donor
    $id_document = ''; // We'll handle file upload

    // Validation
    if (empty($full_name)) {
        $errors[] = "Full name is required.";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }
    
    if (empty($phone_number)) {
        $errors[] = "Phone number is required.";
    }
    
    if (empty($password)) {
        $errors[] = "Password is required.";
    }
    
    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match.";
    }
    
    if (empty($user_type) || !in_array($user_type, ['donor', 'request'])) {
        $errors[] = "Please select whether you want to donate or request assistance.";
    }

    // If no errors, proceed with registration
    if (empty($errors)) {
        // For now, we'll use a placeholder for ID document
        // In a real application, you'd handle file upload here
        $id_document_path = 'pending_verification';

        // Set user properties
        $user->full_name = $full_name;
        $user->email = $email;
        $user->phone_number = $phone_number;
        $user->password = $password;
        $user->id_document = $id_document_path;

        // Create user
        $result = $user->create();
        
        if ($result['success']) {
            // Set session and redirect based on user choice
            $_SESSION['user_id'] = $user->user_id;
            $_SESSION['full_name'] = $user->full_name;
            $_SESSION['email'] = $user->email;
            $_SESSION['logged_in'] = true;
            
            // Redirect based on user's choice during signup
            if ($user_type === 'donor') {
                header("Location: donor.php");
            } else {
                header("Location: recipient.php");
            }
            exit();
        } else {
            $errors[] = $result['message'];
        }
    }
    
    // Store errors in session and redirect back
    $_SESSION['signup_errors'] = $errors;
    header("Location: index.php#modal-overlay");
    exit();
} else {
    header("Location: index.php");
    exit();
}
?>