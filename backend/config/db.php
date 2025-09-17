<?php

class Db {
    private $conn;
    private $host = "localhost";
    private $user = "test";
    private $password = "";
    private $db_name = "BarangaySystem";

    public function __construct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        try {
            $this->conn = mysqli_connect(
                $this->host,
                $this->user,
                $this->password,
                $this->db_name
            );
            mysqli_set_charset($this->conn, "utf8mb4");
        } catch (Exception $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->conn;
    }
}
