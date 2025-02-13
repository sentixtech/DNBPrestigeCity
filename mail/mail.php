<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'sendmail.php';

function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Form validation and sanitization
if ($_SERVER["REQUEST_METHOD"] == "GET" || $_SERVER["REQUEST_METHOD"] == "POST") {

    // Capture and sanitize form data
    $name = sanitizeInput($_POST['name'] ?? $_GET['name']);
    $email = sanitizeInput($_POST['email'] ?? $_GET['email']);
    $phone = sanitizeInput($_POST['phone'] ?? $_GET['phone']);
    $message = sanitizeInput($_POST['msg'] ?? $_GET['msg']);

    // Validate required fields
    $errors = [];

    if (empty($name)) {
        $errors['name'] = "Name is required.";
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "A valid email is required.";
    }

    if (empty($phone)) {
        $errors['phone'] = "Phone number is required.";
    }

    // If no errors, proceed with sending email
    if (empty($errors)) {
        try {
            $subject = "New Message from " . $name;
            $body = "<p>Name: $name</p><p>Email: $email</p><p>Phone: $phone</p><p>Message: $message</p>";

            // Send the email
            sendEmail('shambishnoi76@gmail.com', $subject, $body);
            echo json_encode(['success' => 'Message sent successfully!']);
        } catch (Exception $e) {
            // If an exception occurs during sending email, catch and respond with the error message
            echo json_encode(['error' => 'Failed to send the email. ' . $e->getMessage()]);
        }
    } else {
        // Output errors if validation fails
        echo json_encode($errors);
    }
}
?>
