<?php
// includes/functions.php
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validatePhone($phone) {
    return preg_match('/^[0-9+]{10,15}$/', $phone);
}

function redirect($url) {
    header("Location: $url");
    exit();
}
?>