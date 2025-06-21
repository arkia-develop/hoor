<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Read the JSON file
$jsonFile = file_get_contents(__DIR__ . '/articles.json');
$data = json_decode($jsonFile, true);

// Get the article ID from the URL if it exists
$articleId = isset($_GET['id']) ? $_GET['id'] : null;

if ($articleId) {
    // Find the specific article
    $article = null;
    foreach ($data['articles'] as $a) {
        if ($a['id'] === $articleId) {
            $article = $a;
            break;
        }
    }
    
    if ($article) {
        echo json_encode($article);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Article not found']);
    }
} else {
    // Return all articles
    echo json_encode($data['articles']);
}
?> 