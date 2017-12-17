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
        return $this->getPlayersPastAction('now');
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

        $map_data = [
            'players' => []
        ];

        /** @var History $action */
        foreach ($actions as $action) {
            $account = $action->getAccount();

            $map_data['players']['id' . $account->getId()] = [
                'firstName' => $account->getFirstName(),
                'lastName' => $account->getLastName(),
                'position' => [
                    'x' => $action->getX(),
                    'y' => $action->getY(),
                    'z' => $action->getZ(),
                ]
            ];
        }

        return $this->json($map_data);
    }
}
