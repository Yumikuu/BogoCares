<?php
class User {
    private $conn;
    private $table_name = "users";

    public $user_id;
    public $full_name;
    public $email;
    public $phone_number;
    public $password;
    public $id_document;
    public $is_verified;
    public $is_admin;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create new user
    public function create() {
        // Check if email already exists
        if ($this->emailExists()) {
            return array("success" => false, "message" => "Email already registered.");
        }

        $query = "INSERT INTO " . $this->table_name . "
                SET full_name=:full_name, email=:email, phone_number=:phone_number, 
                    password=:password, id_document=:id_document, is_verified=0";

        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->full_name = htmlspecialchars(strip_tags($this->full_name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
        $this->id_document = htmlspecialchars(strip_tags($this->id_document));

        // Hash password
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);

        // Bind parameters
        $stmt->bindParam(":full_name", $this->full_name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":id_document", $this->id_document);

        if($stmt->execute()) {
            $this->user_id = $this->conn->lastInsertId();
            return array("success" => true, "message" => "Registration successful!");
        }
        return array("success" => false, "message" => "Registration failed.");
    }

    // Check if email exists
    public function emailExists() {
        $query = "SELECT user_id, full_name, password, is_verified, is_admin
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->user_id = $row['user_id'];
            $this->full_name = $row['full_name'];
            $this->password = $row['password'];
            $this->is_verified = $row['is_verified'];
            $this->is_admin = $row['is_admin'];
            return true;
        }
        return false;
    }

    // Get user by ID
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE user_id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->full_name = $row['full_name'];
            $this->email = $row['email'];
            $this->phone_number = $row['phone_number'];
            $this->id_document = $row['id_document'];
            $this->is_verified = $row['is_verified'];
            $this->is_admin = $row['is_admin'];
            $this->created_at = $row['created_at'];
            return true;
        }
        return false;
    }
}
?>