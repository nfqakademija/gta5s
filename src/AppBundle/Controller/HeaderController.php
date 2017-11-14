<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/14/17
 * Time: 2:29 PM
 */

namespace AppBundle\Controller;

use AppBundle\Service\ServerOfflineException;
use AppBundle\Service\MasterListReader;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

/**
 * All implementations of controllers that will only use templates,
 * that contain header should extend this class instead of controller.
 */
class HeaderController extends Controller
{

    protected function render($view, array $parameters = array(), Response $response = null)
    {

        $masterListReader = $this->container->get(MasterListReader::class);

        try {

            $serverInfo = $masterListReader->fetch();

            $parameters['server_status'] = true;
            $parameters['server_curr_players'] = $serverInfo->getCurrentPlayerCount();
            $parameters['server_max_players'] = $serverInfo->getMaximumPlayerCount();

        }

        catch (ServerOfflineException $e)
        {
            $parameters['server_status'] = false;
        }

        return parent::render($view, $parameters);

    }

}