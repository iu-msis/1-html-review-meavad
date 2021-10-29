<?php

// if (($_SERVER['REQUEST_METHOD'] ?? '') != 'POST') {
//     header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed");
//     exit;
// }

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  'UPDATE books SET
    Title = ?,
    Author = ?,
    Year_Published = ?,
    Publisher = ?,
    page_count = ?,
    MSRP = ?
  WHERE id = ?'
);

$stmt->execute([
    $_POST['Title'],
    $_POST['Author'],
    $_POST['Year_Published'],
    $_POST['Publisher'],
    $_POST['page_count'],
    $_POST['MSRP'],
    $_POST['id']
]);

header('HTTP/1.1 303 See Other');
header('Location: ../books/');