<?php
session_start();
require_once __DIR__ . '/config/database.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_POST) {
    // Collect form data
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone_number']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    $errors = [];

    // Validate passwords match
    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match!";
    }

    // Handle file upload for ID document
    $id_document_path = null;
    if (isset($_FILES['id_document']) && $_FILES['id_document']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/id_documents/';
        // Create the directory if it doesn't exist
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $file_extension = pathinfo($_FILES['id_document']['name'], PATHINFO_EXTENSION);
        $allowed_extensions = ['pdf', 'jpg', 'jpeg', 'png'];
        if (!in_array(strtolower($file_extension), $allowed_extensions)) {
            $errors[] = "Invalid file type. Only PDF, JPG, JPEG, PNG are allowed.";
        } else {
            $filename = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', $full_name) . '.' . $file_extension;
            $id_document_path = $upload_dir . $filename;

            if (!move_uploaded_file($_FILES['id_document']['tmp_name'], $id_document_path)) {
                $errors[] = "Failed to upload ID document.";
            }
        }
    } else {
        $errors[] = "ID document is required.";
    }

    // If no errors so far, proceed with database operations
    if (empty($errors)) {
        try {
            // Check if user already exists
            $stmt = $pdo->prepare("SELECT user_id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->rowCount() > 0) {
                // If the user exists, remove the uploaded file and show error
                if ($id_document_path && file_exists($id_document_path)) {
                    unlink($id_document_path);
                }
                $errors[] = "Email already exists!";
            } else {
                // Hash the password
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                // FIXED: Insert WITHOUT user_type or set it to NULL
                $stmt = $pdo->prepare("INSERT INTO users (full_name, email, phone_number, password, id_document) VALUES (?, ?, ?, ?, ?)");
                
                if ($stmt->execute([$full_name, $email, $phone, $hashed_password, $id_document_path])) {
                    // Set session variables
                    $_SESSION['user_id'] = $pdo->lastInsertId();
                    $_SESSION['full_name'] = $full_name;
                    $_SESSION['email'] = $email;

                    // Redirect to profile page
                    header("Location: profile.php");
                    exit();
                } else {
                    // If insertion failed, remove the uploaded file
                    if ($id_document_path && file_exists($id_document_path)) {
                        unlink($id_document_path);
                    }
                    $errors[] = "Error occurred during signup. Please try again.";
                }
            }
        } catch (PDOException $e) {
            // If there's a database error, remove the uploaded file
            if ($id_document_path && file_exists($id_document_path)) {
                unlink($id_document_path);
            }
            $errors[] = "Database error: " . $e->getMessage();
        }
    }

    // If we have errors, store them in session and redirect back
    if (!empty($errors)) {
        $_SESSION['signup_errors'] = $errors;
        header("Location: index.php");
        exit();
    }
} else {
    // If not a POST request, redirect to the signup page
    header("Location: index.php");
    exit();
}
?>