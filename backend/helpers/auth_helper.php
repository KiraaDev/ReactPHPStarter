<?php

function isAuthenticated() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    return !empty($_SESSION['user_id']) && is_numeric($_SESSION['user_id']) && $_SESSION['user_id'] > 0;
}
function hashPassword($plainPassword) {
    return password_hash($plainPassword, PASSWORD_DEFAULT);
}

function comparePassword($hashedPassword, $plainPassword) {
    if (empty($hashedPassword) || empty($plainPassword)) {
        return false;
    }

    $isValid = password_verify($plainPassword, $hashedPassword);

    return $isValid;
}
