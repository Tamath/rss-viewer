<?php
$result = array(
    'success' => false,
    'error' => null,
    'data' => array(),
);

if ( isset($_GET['url']) ) {
    $contents = file_get_contents($_GET['url']);
    if ( $contents ) {
        $dom = new DOMDocument();
        $dom->loadXML($contents);

        $elements = $dom->getElementsByTagName('item');
        foreach ( $elements as $element ) {
            $title = $element->getElementsByTagName('title')->item(0)->nodeValue;
            $description = $element->getElementsByTagName('description')->item(0)->nodeValue;
            $link = $element->getElementsByTagName('link')->item(0)->nodeValue;
            $result['data'][] = array(
                'title' => $title,
                'text' => strip_tags($description),
                'url' => $link,
            );
        }

        $result['success'] = true;
    }
}

echo json_encode($result);