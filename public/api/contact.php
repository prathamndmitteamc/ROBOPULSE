<?php
/**
 * Robopulse Intelligence — Production Contact & Institutional Lead Handler
 * Compatible with Hostinger Shared, Cloud, and VPS Hosting (PHP 7.4 - 8.3+)
 * Target recipient: robopulse51@gmail.com
 */

// Enable CORS if requested from same or configured domain
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are supported.'
    ]);
    exit;
}

// Read JSON input or fallback to POST form-encoded
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$email = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$organization = isset($data['organization']) ? trim(strip_tags($data['organization'])) : '';
$city = isset($data['city']) ? trim(strip_tags($data['city'])) : '';
$requirement = isset($data['requirement']) ? trim(strip_tags($data['requirement'])) : 'Robotics Education Program';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';
$timestamp = isset($data['timestamp']) ? $data['timestamp'] : date('Y-m-d H:i:s T');

// Field Validations
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide your full name.']);
    exit;
}

if (empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide your 10-digit mobile number.']);
    exit;
}

$cleanPhone = preg_replace('/[\s-]/', '', $phone);
if (!preg_match('/^(\+91)?[6-9]\d{9}$/', $cleanPhone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid 10-digit mobile number.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

$to = 'robopulse51@gmail.com';
$subject = "New Institutional Enquiry: {$name} - " . ($organization ?: $city ?: 'Robopulse Website');

// HTML Body
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>New Robopulse Enquiry</title>
</head>
<body style='font-family: Arial, sans-serif; background-color: #05050A; color: #FFFFFF; padding: 24px; margin: 0;'>
    <div style='max-width: 600px; margin: 0 auto; background: #0D0D18; border: 1px solid #00C9FF; border-radius: 12px; padding: 24px;'>
        <h2 style='color: #00C9FF; margin-top: 0;'>ROBOPULSE INTELLIGENCE // New Institutional Lead</h2>
        <p style='color: #A9D4FF; font-size: 14px;'>A new enquiry has been submitted on the website.</p>
        <hr style='border: 0; border-top: 1px solid #222238; margin: 16px 0;' />
        
        <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>
            <tr>
                <td style='padding: 8px 0; color: #8888AA; width: 160px;'><strong>Full Name:</strong></td>
                <td style='padding: 8px 0; color: #FFFFFF;'>{$name}</td>
            </tr>
            <tr>
                <td style='padding: 8px 0; color: #8888AA;'><strong>Mobile Number:</strong></td>
                <td style='padding: 8px 0; color: #00C9FF;'><a href='tel:{$cleanPhone}' style='color: #00C9FF; text-decoration: none;'>{$phone}</a></td>
            </tr>
            <tr>
                <td style='padding: 8px 0; color: #8888AA;'><strong>Email Address:</strong></td>
                <td style='padding: 8px 0; color: #FFFFFF;'><a href='mailto:{$email}' style='color: #A9D4FF; text-decoration: none;'>{$email}</a></td>
            </tr>
            <tr>
                <td style='padding: 8px 0; color: #8888AA;'><strong>School / Organization:</strong></td>
                <td style='padding: 8px 0; color: #FFFFFF;'>" . ($organization ?: 'N/A') . "</td>
            </tr>
            <tr>
                <td style='padding: 8px 0; color: #8888AA;'><strong>City / Location:</strong></td>
                <td style='padding: 8px 0; color: #FFFFFF;'>" . ($city ?: 'N/A') . "</td>
            </tr>
            <tr>
                <td style='padding: 8px 0; color: #8888AA;'><strong>Primary Requirement:</strong></td>
                <td style='padding: 8px 0; color: #00C9FF; font-weight: bold;'>{$requirement}</td>
            </tr>
            <tr>
                <td style='padding: 8px 0; color: #8888AA; vertical-align: top;'><strong>Message / Details:</strong></td>
                <td style='padding: 8px 0; color: #E0E0FF;'>" . nl2br($message ?: 'None provided.') . "</td>
            </tr>
            <tr>
                <td style='padding: 8px 0; color: #8888AA;'><strong>Submission Time:</strong></td>
                <td style='padding: 8px 0; color: #777799; font-size: 12px;'>{$timestamp}</td>
            </tr>
        </table>
        
        <hr style='border: 0; border-top: 1px solid #222238; margin: 20px 0;' />
        <div style='text-align: center;'>
            <a href='https://wa.me/{$cleanPhone}' style='display: inline-block; background-color: #00C9FF; color: #000000; font-weight: bold; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-size: 13px;'>Reply on WhatsApp</a>
        </div>
    </div>
</body>
</html>
";

// Plain Text fallback
$plainBody = "ROBOPULSE INTELLIGENCE // New Lead\n\n"
    . "Full Name: {$name}\n"
    . "Phone: {$phone}\n"
    . "Email: {$email}\n"
    . "School / Organization: " . ($organization ?: 'N/A') . "\n"
    . "City / Location: " . ($city ?: 'N/A') . "\n"
    . "Primary Requirement: {$requirement}\n"
    . "Message: " . ($message ?: 'None') . "\n"
    . "Submitted at: {$timestamp}\n";

// Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Robopulse Intelligence <noreply@' . ($_SERVER['SERVER_NAME'] ?? 'robopulseintelligence.com') . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($to, $subject, $htmlBody, implode("\r\n", $headers));

// Log lead into local file on server as backup
try {
    $logEntry = json_encode([
        'timestamp' => $timestamp,
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'organization' => $organization,
        'city' => $city,
        'requirement' => $requirement,
        'message' => $message,
        'mailSent' => $mailSent
    ]) . "\n";
    @file_put_contents(__DIR__ . '/leads_backup.log', $logEntry, FILE_APPEND);
} catch (Exception $e) {
    // Ignore logging errors
}

// Return JSON success
http_response_code(200);
echo json_encode([
    'success' => true,
    'mailSent' => $mailSent,
    'message' => 'ENQUIRY TRANSMITTED // Details forwarded to ' . $to . '. Our team will contact you shortly.'
]);
exit;
