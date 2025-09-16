<?php

class AuthController
{
    private $conn;

    public function __construct()
    {
        $db = new Db();
        $this->conn = $db->getConnection();
    }

    public function auth_user()
    {
        if (isAuthenticated()) {
            response([
                'status' => 'success',
                'message' => 'User is authenticated',
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'email' => $_SESSION['email'] ?? null,
                    'role' => $_SESSION['role'] ?? 'user'
                ]
            ]);
        } else {
            response([
                'status' => 'failed',
                'message' => 'User is not authenticated'
            ], 401);
        }
    }

    public function login($email = "gaufogomer@gmail.com", $password = "123123")
    {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows <= 0) {
            response([
                'status' => 'failed',
                'message' => 'Invalid credentials'
            ], 404);
        }

        $row = $result->fetch_assoc();

        if (!comparePassword($row['password'], $password)) {
            response([
                'status' => 'failed',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $_SESSION['user_id'] = $row['user_id'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['role'] = $row['role'] ?? 'customer';

        session_regenerate_id(true);

        response([
            'status' => 'success',
            'message' => 'Login successful'
        ]);
    }

    public function register()
    {
        response([
            'status' => 'success',
            'message' => 'Registering user...'
        ]);
    }
}
