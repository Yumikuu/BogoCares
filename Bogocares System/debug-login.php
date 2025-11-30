<?php
session_start();
require_once 'config/database.php';
require_once 'models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

echo "<h2>Debug Login System</h2>";

// Test admin user
$user->email = 'admin@bogocares.org';
if ($user->emailExists()) {
    echo "<h3>Admin User Found:</h3>";
    echo "User ID: " . $user->user_id . "<br>";
    echo "Full Name: " . $user->full_name . "<br>";
    echo "Email: " . $user->email . "<br>";
    echo "Is Verified: " . $user->is_verified . "<br>";
    echo "Is Admin: " . $user->is_admin . "<br>";
    
    // Test password
    $test_password = 'password';
    if (password_verify($test_password, $user->password)) {
        echo "✅ Password verification: SUCCESS<br>";
        
        if ($user->is_admin == 1) {
            echo "✅ This user IS an admin - should redirect to admin-dashboard.php<br>";
        } else {
            echo "❌ This user is NOT an admin - should redirect to index.php<br>";
        }
    } else {
        echo "❌ Password verification: FAILED<br>";
    }
} else {
    echo "❌ Admin user NOT found<br>";
}

echo "<hr>";

// Test current session
echo "<h3>Current Session:</h3>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";

echo "<hr>";

// Test database connection and table
try {
    $stmt = $db->query("SELECT COUNT(*) as count FROM users WHERE is_admin = 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Admins in database: " . $result['count'] . "<br>";
    
    $stmt = $db->query("SELECT user_id, full_name, email, is_admin FROM users WHERE is_admin = 1");
    $admins = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<h4>Admin Users:</h4>";
    foreach ($admins as $admin) {
        echo "ID: {$admin['user_id']} - {$admin['full_name']} ({$admin['email']}) - is_admin: {$admin['is_admin']}<br>";
    }
} catch (Exception $e) {
    echo "Database error: " . $e->getMessage();
}
?>