<?php
// return array
$result = array(
    'success' => false, // will be TRUE if at least one url returned valid rss xml
    'error' => null, // not used
    'data' => array(),
);

if ( isset($_GET['url']) && is_array($_GET['url']) ) {
    // loop through all urls
    foreach ( $_GET['url'] as $url ) {
        $contents = file_get_contents($url); // get rss xml
        if ( $contents ) {
            // parse contents
            
            $dom = new DOMDocument();
            $dom->loadXML($contents);

            $elements = $dom->getElementsByTagName('item');
            foreach ( $elements as $element ) {
                $titleElem = $element->getElementsByTagName('title'); // in some cases title may not be present
                if ( $titleElem->length ) {
                    $title = $titleElem->item(0)->nodeValue;
                } else {
                    $title = '';
                }
                $description = $element->getElementsByTagName('description')->item(0)->nodeValue;
                $link = $element->getElementsByTagName('link')->item(0)->nodeValue;
                $date = new DateTime($element->getElementsByTagName('pubDate')->item(0)->nodeValue);
                $categories = $element->getElementsByTagName('category');
                $resultCategories = array();
                foreach ( $categories as $category ) {
                    $resultCategories[] = $category->nodeValue;
                }
                // form result array
                $result['data'][] = array(
                    'title' => $title,
                    'text' => strip_tags($description),
                    'url' => $link,
                    'date' => $date->format('d F Y H:i'),
                    'categories' => $resultCategories,
                    'timestamp' => $date->format('U'),
                );
            }

            $result['success'] = true; // set success flag
        }
    }
    
    // sort posts by date
    if ( !empty($result['data']) ) {
        usort($result['data'], function ($a, $b) {
            if ( $a['timestamp'] == $b['timestamp'] ) {
                return 0;
            }
            return ($a['timestamp'] > $b['timestamp']) ? -1 : 1;
        });
    }
}

// output result
echo json_encode($result);