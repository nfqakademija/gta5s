<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/14/17
 * Time: 2:55 PM
 */

namespace AppBundle\Service;


class MasterListServerInfo
{

    /**
     * Name of the server.
     *
     * @var string
     */
    private $name;

    /**
     * IP address of the server
     *
     * @var string
     */
    private $ip;

    /**
     * Gamemode title of the server
     *
     * @var string
     */
    private $gamemode;

    /**
     * URL of the website, that server is using.
     *
     * @var string
     */
    private $url;

    /**
     * Name of the language that server is using.
     *
     * @var string
     */
    private $lang;

    /**
     * Current online player count in the server.
     *
     * @var int
     */
    private $currPlayers;

    /**
     * Maximum ammount of players that could play in that server.
     *
     * @var int
     */
    private $maxPlayers;

    public function __construct(
        string $name,
        string $ip,
        string $gamemode,
        string $url,
        string $lang,
        int $currPlayers,
        int $maxPlayers
    ) {
        $this->name = $name;
        $this->ip = $ip;
        $this->gamemode = $gamemode;
        $this->url = $url;
        $this->lang = $lang;
        $this->currPlayers = $currPlayers;
        $this->maxPlayers = $maxPlayers;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getIp(): string
    {
        return $this->ip;
    }

    /**
     * @return string
     */
    public function getGamemodeName(): string
    {
        return $this->gamemode;
    }

    /**
     * @return string
     */
    public function getWebsiteUrl(): string
    {
        return $this->url;
    }

    /**
     * @return string
     */
    public function getLanguageName(): string
    {
        return $this->lang;
    }

    /**
     * @return int
     */
    public function getCurrentPlayerCount(): int
    {
        return $this->currPlayers;
    }

    /**
     * @return int
     */
    public function getMaximumPlayerCount(): int
    {
        return $this->maxPlayers;
    }

}