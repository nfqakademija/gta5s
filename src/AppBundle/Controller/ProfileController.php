<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{
    /**
     * @param $profile_id
     * @return Response
     *
     * @Route("/profile/view/{profile_id}")
     */
    public function viewAction($profile_id) : Response
    {
        $account = $this->getDoctrine()
                        ->getManager()
                        ->getRepository('AppBundle:Account')
                        ->find($profile_id);

        return $this->render(
            'Profile/view.html.twig',
            [
                'curr_account' => $account
            ]
        );
    }

}
