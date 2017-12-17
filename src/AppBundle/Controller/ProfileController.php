<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{

    /**
     * @Route ("/profile/edit", name="profile-edit")
     */
    public function editAction() : Response
    {

        return $this->forward('FOSUserBundle:Profile:edit');
    }

    /**
     * @param $profile_id
     * @return Response
     *
     * @Route("/profile/{profile_id}", name="profile")
     */
    public function viewAction($profile_id) : Response
    {
        $account = $this->getDoctrine()
                        ->getManager()
                        ->getRepository('AppBundle:Account')
                        ->find($profile_id);

        if (empty($account)) {
            throw $this->createNotFoundException('Vartotojas nebuvo rastas!');
        }

        return $this->render(
            ':default:player.html.twig',
            [
                'user' => $account
            ]
        );
    }
}
