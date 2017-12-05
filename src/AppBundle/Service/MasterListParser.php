<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 12/5/17
 * Time: 7:55 PM
 */

namespace AppBundle\Service;

class MasterListParser
{

    /**
     * @var string
     */
    private $serverIP;

    /**
     * MasterListParser constructor.
     */
    public function __construct(
        string $serverIP
    ) {
        $this->serverIP = $serverIP;
    }

    /**
     * @throws ServerOfflineException
     * @param string $data
     * @return MasterListServerInfo
     */
    public function parse(string $json) : MasterListServerInfo
    {

        //Parses fetched json file
        $data = json_decode($json);

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

    /**
     * @return string
     */
    public function getServerIP(): string
    {
        return $this->serverIP;
    }
}