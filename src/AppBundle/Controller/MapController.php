<?php
/**
 * Created by PhpStorm.
 * User: vladasko
 * Date: 17.11.18
 * Time: 15.52
 */

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MapController extends Controller
{
    public function getPlayersAction()
    {
        $em = $this->getDoctrine()->getManager();

        $ = $em->getRepository('AppBundle:History')->findAll();
    }
}