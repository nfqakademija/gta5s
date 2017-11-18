<?php
/**
 * Created by PhpStorm.
 * User: vladasko
 * Date: 17.11.18
 * Time: 15.52
 */

namespace AppBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MapController extends Controller
{

    /**
     * @Route("/json/map", name="json_map")
     */
    public function getPlayersAction()
    {
        $em = $this->getDoctrine()->getManager();

        $actions = $em->getRepository('AppBundle:History')
            ->getNewestHistoryActionByOnlinePlayer();

        $map_data = [];
        $map_data['players'] = [];

        foreach($actions as $action) {

            $account = $action->getAccount();
            $details = json_decode($action->getDetails());

            $obj = [];
            //$obj['firstName'] = $account->getFirstName();
            //$obj['lastName'] = $account->getLastName();
            $obj['position'] = $details->{'pos'};
            $map_data['players'][$account->getId()] = $obj;

        }

        return $this->json($map_data);
    }
}