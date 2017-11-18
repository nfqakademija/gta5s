<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends HeaderController
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        return $this->render('default/index.html.twig', []);
    }

    /**
     * @Route("/dashboard/", name="dashboard")
     */
    public function dashboardAction()
    {
        return $this->render('default/dashboard.html.twig', []);
    }

}
