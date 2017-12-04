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
     * This variable stores IP, on which Grang Theft Auto V Server is launched.
     *
     * @var string
     */
    private $serverIP;

    /**
     * @var CurlService
     */
    private $curl;

    public function __construct($serverIP, $curl)
    {
        $this->serverIP = $serverIP;
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

        //Parses fetched json file
        $data = json_decode($json);

        //Finds out if our server is online.
        if (empty($data)) {
            throw new ServerOfflineException('Failed to connect to RageMP\'s Master List!');
        }

        if (!array_key_exists($this->serverIP, $data)) {
            throw new ServerOfflineException(
                'Could not find announced server with this IP address: ' . $this->serverIP
            );
        }

        return new MasterListServerInfo(
            $data->{$this->serverIP}->{'name'},
            $this->serverIP,
            $data->{$this->serverIP}->{'gamemode'},
            $data->{$this->serverIP}->{'url'},
            $data->{$this->serverIP}->{'lang'},
            $data->{$this->serverIP}->{'players'},
            $data->{$this->serverIP}->{'maxplayers'}
        );
    }

    public function getServerIP() : string
    {
        return $this->serverIP;
    }

    public function getCurlService() : CurlService
    {
        return $this->curl;
    }
}
