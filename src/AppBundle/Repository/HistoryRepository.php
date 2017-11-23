<?php

namespace AppBundle\Repository;


use Doctrine\DBAL\Types\Type;
use Doctrine\ORM\EntityRepository;

/**
 * HistoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class HistoryRepository extends EntityRepository
{

    /**
     * Returns only the newest history action per online player.
     *
     * @return array
     */
    public function getNewestHistoryActionByOnlinePlayer(string $datetime = "now") : array
    {

        $to = new \DateTime($datetime);
        $from = (new \DateTime($datetime))->sub(new \DateInterval('PT5S'));

        return $this->getEntityManager()->createQueryBuilder()
            ->select('h')
            ->from('AppBundle:History', 'h')
            ->where('h.time >= :from AND h.time <= :to')
            ->setParameter('from', $from, Type::DATETIME)
            ->setParameter('to', $to, Type::DATETIME)
            ->getQuery()->getResult();
    }
}
