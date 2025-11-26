<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Recipient Dashboard - BogoCares</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
        .welcome { color: #2196F3; font-size: 28px; margin-bottom: 20px; }
        .logout { color: red; text-decoration: none; float: right; }
        .user-info { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <a href="logout.php" class="logout">Logout</a>
        <h1 class="welcome">🎉 Welcome, <?php echo $_SESSION['full_name']; ?>!</h1>
        
        <div class="user-info">
            <p><strong>Email:</strong> <?php echo $_SESSION['email']; ?></p>
            <p><strong>Role:</strong> Recipient</p>
            <p><strong>User ID:</strong> <?php echo $_SESSION['user_id']; ?></p>
        </div>

        <h2>Recipient Features Coming Soon:</h2>
        <ul>
            <li>📝 Create assistance requests</li>
            <li>📦 Track received donations</li>
            <li>👤 Manage your profile</li>
            <li>💬 Update request status</li>
        </ul>
        
        <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 5px;">
            <h3>Quick Actions:</h3>
            <button style="padding: 10px 20px; margin: 5px; background: #2196F3; color: white; border: none; border-radius: 5px;">
                Create Request
            </button>
            <button style="padding: 10px 20px; margin: 5px; background: #4CAF50; color: white; border: none; border-radius: 5px;">
                My Requests
            </button>
        </div>
    </div>
</body>
</html>