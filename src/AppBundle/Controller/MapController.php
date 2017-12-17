<?php
/**
 * Created by PhpStorm.
 * User: vladasko
 * Date: 17.11.18
 * Time: 15.52
 */

namespace AppBundle\Controller;

use AppBundle\Entity\History;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class MapController extends Controller
{

    /**
     * @Route("/json/map", name="json_map")
     */
    public function getPlayersAction() : Response
    {
        return $this->getPlayersPastAction('2017-11-18 14:55:46');
    }

    /**
     * @Route("json/map/{date}", name="json_map_past")
     */
    public function getPlayersPastAction($date) : Response
    {
        $em = $this->getDoctrine()->getManager();

        $actions = $em->getRepository('AppBundle:History')
            ->getHistoryActionByOnlinePlayer(
                new \DateTime($date)
            );

        $map_data = [];
        $map_data['players'] = [];

        /** @var History $action */
        foreach ($actions as $action) {
            $account = $action->getAccount();
            $details = json_decode($action->getDetails());

            $obj = [];
            $obj['firstName'] = $account->getFirstName();
            $obj['lastName'] = $account->getLastName();
            $obj['position'] = $details->{'pos'};
            $map_data['players']['id' . $account->getId()] = $obj;
        }

        return $this->json($map_data);
    }
}
