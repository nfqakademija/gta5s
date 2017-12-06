<?php

namespace Tests\AppBundle\Service;

use AppBundle\Service\MasterListParser;
use AppBundle\Service\ServerOfflineException;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class MasterListParserTest extends TestCase
{

    public function testOfflineParse()
    {
        $this->expectException(ServerOfflineException::class);

        $parser = new MasterListParser('12.333.11.34:44241');
        $parser->parse('
            {
                "94.130.53.38:22005": {
                    "name":"[ru/en] [1.41] [freeoram] RAGECLOUD RAGE:MP NEW FPS | MISSION ON TOP MOUNTAIN",
                    "gamemode":"freeroam",
                    "url":"rage.mp",
                    "lang":"en",
                    "players":2,
                    "maxplayers":500
                }
            }
        ');
    }
}
