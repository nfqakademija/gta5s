<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Account;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
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

    /**
     * @Route("/topai/{col}/{type}/{page}", name="topai")
     */
    public function topaiAction($col = "money", $type = "DESC", $page = 1) : Response
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $query = $em->createQueryBuilder()
            ->select('a, c')
            ->from(Account::class, 'a')
            ->join('a.character', 'c')
            ->orderBy('c.' . $col, $type)
            ->getQuery();

        $this->get('logger')->info($query->getDQL());
        $this->get('logger')->info($query->getSQL());

        $pagination =  $this->get('knp_paginator')
            ->paginate(
                $query, /* query NOT result */
                $page,
                20/*limit per page*/
            );

        return $this->render(
            'default/topai.html.twig',
            [
                'pagination' => $pagination,
                'collumn' => $col,
                'type' => $type
            ]
        );
    }
}
