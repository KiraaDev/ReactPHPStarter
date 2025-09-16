<?php
function require_method($method) {
    if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
        response(["error" => "Method not allowed"], 405);
    }
}
