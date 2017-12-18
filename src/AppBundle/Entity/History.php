<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * History
 *
 * @ORM\Table(name="action_history")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\HistoryRepository")
 */
class History
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="time", type="datetime", options={"default": 0})
     */
    private $time;

    /**
     * @ORM\ManyToOne(targetEntity="Account")
     * @ORM\JoinColumn(name="account_id", referencedColumnName="id")
     */
    private $account;

    /**
     * @var string
     *
     * @ORM\Column(name="action", type="string", length=64)
     */
    private $action;

    /**
     * @var float
     *
     * @ORM\Column(name="x", type="float")
     */
    private $x;

    /**
     * @var float
     *
     * @ORM\Column(name="y", type="float")
     */
    private $y;

    /**
     * @var float
     *
     * @ORM\Column(name="z", type="float")
     */
    private $z;


    /**
     * Get id
     *
     * @return int
     */
    public function getId() : int
    {
        return $this->id;
    }

    /**
     * Set time
     *
     * @param \DateTime $time
     *
     * @return History
     */
    public function setTime(\DateTime $time) : History
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get time
     *
     * @return \DateTime
     */
    public function getTime() : \DateTime
    {
        return $this->time;
    }

    /**
     * Set account
     *
     * @param Account $account
     *
     * @return History
     */
    public function setAccount(Account $account) : History
    {
        $this->account = $account;

        return $this;
    }

    /**
     * Get account
     *
     * @return Account
     */
    public function getAccount() : Account
    {
        return $this->account;
    }

    /**
     * Set action
     *
     * @param string $action
     *
     * @return History
     */
    public function setAction(string $action) : History
    {
        $this->action = $action;

        return $this;
    }

    /**
     * Get action
     *
     * @return string
     */
    public function getAction() : string
    {
        return $this->action;
    }

    /**
     * @return float
     */
    public function getX(): float
    {
        return $this->x;
    }

    /**
     * @param float $x
     * @return History
     */
    public function setX(float $x) : History
    {
        $this->x = $x;

        return $this;
    }

    /**
     * @return float
     */
    public function getY(): float
    {
        return $this->y;
    }

    /**
     * @param float $y
     * @return History
     */
    public function setY(float $y) : History
    {
        $this->y = $y;

        return $this;
    }

    /**
     * @return float
     */
    public function getZ(): float
    {
        return $this->z;
    }

    /**
     * @param float $z
     * @return History
     */
    public function setZ(float $z) : History
    {
        $this->z = $z;

        return $this;
    }
}
