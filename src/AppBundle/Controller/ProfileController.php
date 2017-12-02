<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{

    /**
     * @Route ("/profile/edit")
     */
    public function editAction()
    {

        return $this->forward('FOSUserBundle:Profile:edit');
    }

    /**
     * @param $profile_id
     * @return Response
     *
     * @Route("/profile/{profile_id}")
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
            '@FOSUser/Profile/show.html.twig',
            [
                'user' => $account
            ]
        );
    }
}
