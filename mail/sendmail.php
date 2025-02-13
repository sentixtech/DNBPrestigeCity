<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dir = __DIR__;

// Require the PHPMailer files using the absolute path
require $dir . '/../PHPMailer/src/Exception.php';
require $dir . '/../PHPMailer/src/PHPMailer.php';
require $dir . '/../PHPMailer/src/SMTP.php';

require __DIR__ . '/vendor/autoload.php';

function sendEmail($recipient, $subject, $message)
{
    $mail = new PHPMailer(true); // Passing `true` enables exceptions
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'customer.digitalnotebook@gmail.com'; 
        $mail->Password = 'xweotpxxkugtasup';        
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        // Email content
        $mail->setFrom('customer.digitalnotebook@gmail.com');
        $mail->addAddress($recipient);
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $message;
        // Send email
        $mail->send();
    } catch (Exception $e) {
        echo json_encode(['error' => $mail->ErrorInfo]);
    }
}


?>