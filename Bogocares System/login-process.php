<?php
session_start();
require_once 'config/database.php';

// Initialize errors array
$_SESSION['login_errors'] = [];

// Get form data
$email = trim($_POST['email']);
$password = $_POST['password'];

// Validate form data
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['login_errors'][] = "Valid email is required";
}

if (empty($password)) {
    $_SESSION['login_errors'][] = "Password is required";
}

// If there are errors, redirect back
if (!empty($_SESSION['login_errors'])) {
    header("Location: index.php");
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();

    // Check if user exists
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    if ($stmt->rowCount() == 1) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['user_type'] = $user['user_type'];
            $_SESSION['is_verified'] = $user['is_verified'];
            $_SESSION['is_admin'] = $user['is_admin'];
            
            // Clear any login errors
            unset($_SESSION['login_errors']);
            
            // Redirect based on user type
            if ($user['user_type'] == 'donor') {
                header("Location: donor.php");
            } else {
                header("Location: recipient.php");
            }
            exit();
        } else {
            $_SESSION['login_errors'][] = "Invalid email or password";
        }
    } else {
        $_SESSION['login_errors'][] = "Invalid email or password";
    }
    
} catch (PDOException $exception) {
    $_SESSION['login_errors'][] = "Database error: " . $exception->getMessage();
}

// If we reach here, there was an error
header("Location: index.php");
exit();
?>