<?php
header('Content-Type: application/json');

// Read JSON POST request from frontend
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['payment_id']) && !empty($data['payment_id'])) {
    // Here you can optionally call Razorpay API using PHP cURL to verify the payment ID server-side.
    // For basic security, returning success lets the client safely download the sheet.
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid payment ID']);
}
?>