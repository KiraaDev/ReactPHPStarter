<?php
session_start();

//config
include_once "./config/cors.php";
include_once "./config/db.php";

//helpers
include_once "./helpers/auth_helper.php";
include_once "./helpers/response_helper.php";
include_once "./helpers/request_helper.php";

// controllers
include_once "./controllers/auth_controller.php";

$auth_controller = new AuthController();

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case "auth_user":
        require_method('GET');
        $auth_controller->auth_user();
        break;

    case "login":
        require_method('POST');
        $auth_controller->login();
        break;

    case "register":
        require_method('POST');
        $auth_controller->register();
        break;

    default:
        response(["error" => "Invalid action"], 404);
}
