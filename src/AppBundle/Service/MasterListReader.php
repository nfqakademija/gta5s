<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/14/17
 * Time: 2:06 PM
 */

namespace AppBundle\Service;

class MasterListReader
{
    /**
     * @var MasterListParser
     */
    private $parser;

    /**
     * @var CurlService
     */
    private $curl;

    public function __construct(
        MasterListParser $parser,
        CurlService $curl
    ) {
        $this->parser = $parser;
        $this->curl = $curl;
    }

    /**
     * @throws ServerOfflineException
     * @return MasterListServerInfo
     */
    public function fetch() : MasterListServerInfo
    {
        //Fetches RageMP's master list json.
        $json = $this->curl->callURL('https://cdn.rage.mp/master/');

        //Finds out if our server is online.
        if (empty($json)) {
            throw new ServerOfflineException('Failed to connect to RageMP\'s Master List!');
        }

        return $this->parser->parse($json);
    }

    public function getParser() : MasterListParser
    {
        return $this->parser;
    }

    public function getCurlService() : CurlService
    {
        return $this->curl;
    }
}
