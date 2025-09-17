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

    public function login()
    {

        $json = file_get_contents("php://input");

        $data = json_decode($json, true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;


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

        $user = $result->fetch_assoc();

        if (!comparePassword($user['password'], $password)) {
            response([
                'status' => 'failed',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'] ?? 'customer';

        session_regenerate_id(true);

        response([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => [
                'user_id' => $user['user_id'],
                'resident_id' => $user['resident_id'],
                'email' => $user['email'],
                'role' => $user['role']
            ],
        ]);
    }

    public function register()
    {
        response([
            'status' => 'success',
            'message' => 'Registering user...'
        ]);
    }

    public function logout()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION = [];

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        session_destroy();

        response([
            'status' => 'success',
            'message' => 'Logout successful'
        ]);
    }
}
