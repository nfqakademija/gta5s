<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/14/17
 * Time: 3:05 PM
 */

namespace AppBundle\Service;


class CurlService
{

    /**
     * This executes http request and returns response.
     *
     * @param string $url
     * @return string
     */
    public function callURL(string $url) : string {

        //Lets configure call.
        $session = curl_init($url);
        curl_setopt($session, CURLOPT_RETURNTRANSFER,true);

        //Lets execute call.
        return curl_exec($session);

    }


}