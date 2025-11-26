<?php
// login-process.php
require_once 'config/database.php';
require_once 'includes/functions.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = sanitizeInput($_POST['email']);
    $password = $_POST['password'];
    
    $errors = [];
    
    if (!validateEmail($email)) $errors[] = "Valid email is required";
    if (empty($password)) $errors[] = "Password is required";
    
    if (empty($errors)) {
        try {
            $stmt = $pdo->prepare("SELECT user_id, full_name, email, password, user_type FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() === 1) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (password_verify($password, $user['password'])) {
                    // Login successful
                    $_SESSION['user_id'] = $user['user_id'];
                    $_SESSION['full_name'] = $user['full_name'];
                    $_SESSION['email'] = $user['email'];
                    $_SESSION['user_type'] = $user['user_type'];
                    
                    // Redirect based on user type - UPDATED FOR NEW SYSTEM
                    if ($user['user_type'] === 'donor') {
                        header("Location: donor.php");
                    } else if ($user['user_type'] === 'recipient') {
                        header("Location: recipient.php");
                    } else {
                        // If user_type is NULL or not set, go to profile to choose
                        header("Location: profile.php");
                    }
                    exit();
                } else {
                    $errors[] = "Invalid password";
                }
            } else {
                $errors[] = "Email not found";
            }
        } catch(PDOException $e) {
            $errors[] = "Database error: " . $e->getMessage();
        }
    }
    
    $_SESSION['login_errors'] = $errors;
    header("Location: index.php");
    exit();
} else {
    header("Location: index.php");
    exit();
}
?>