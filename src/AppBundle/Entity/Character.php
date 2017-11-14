<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Players
 *
 * @ORM\Table(name="players")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PlayersRepository")
 */
class Character
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
     * @var bool
     *
     * @ORM\Column(name="gender", type="boolean")
     */
    private $gender;

    /**
     * @var string
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
     * @var int
     *
     * @ORM\Column(name="xp", type="integer")
     */
    private $xp;

    /**
     * @var int
     *
     * @ORM\Column(name="money", type="integer")
     */
    private $money;

    /**
     * @var int
     *
     * @ORM\Column(name="job", type="integer")
     */
    private $job;

    /**
     * @var bool
     *
     * @ORM\Column(name="face", type="boolean", length=3, options={"unsigned": true})
     */
    private $face;

    /**
     * @var float
     *
     * @ORM\Column(name="skinCol", type="float")
     */
    private $skinCol;

    /**
     * @var bool
     *
     * @ORM\Column(name="hair", type="boolean", length=3, options={"unsigned": true})
     */
    private $hair;

    /**
     * @var bool
     *
     * @ORM\Column(name="hairCol", type="boolean", length=4, options={"unsigned": true})
     */
    private $hairCol;

    /**
     * @var bool
     *
     * @ORM\Column(name="hairHCol", type="boolean", length=4, options={"unsigned": true})
     */
    private $hairHCol;

    /**
     * @var bool
     *
     * @ORM\Column(name="eyeBCol", type="boolean", length=4, options={"unsigned": true})
     */
    private $eyeBCol;

    /**
     * @var bool
     *
     * @ORM\Column(name="beardCol", type="boolean", length=4, options={"unsigned": true})
     */
    private $beardCol;

    /**
     * @var bool
     *
     * @ORM\Column(name="chestCol", type="boolean", length=4, options={"unsigned": true})
     */
    private $chestCol;

    /**
     * @var bool
     *
     * @ORM\Column(name="eyeCol", type="boolean", length=3, options={"unsigned": true})
     */
    private $eyeCol;

    /**
     * @var int
     *
     * @ORM\Column(name="top", type="integer")
     */
    private $top;

    /**
     * @var string
     *
     * @ORM\Column(name="legs", type="string", length=255)
     */
    private $legs;

    /**
     * @var int
     *
     * @ORM\Column(name="shoes", type="integer")
     */
    private $shoes;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set gender
     *
     * @param boolean $gender
     *
     * @return Players
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return bool
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set x
     *
     * @param string $x
     *
     * @return Players
     */
    public function setX($x)
    {
        $this->x = $x;

        return $this;
    }

    /**
     * Get x
     *
     * @return string
     */
    public function getX()
    {
        return $this->x;
    }

    /**
     * Set y
     *
     * @param float $y
     *
     * @return Players
     */
    public function setY($y)
    {
        $this->y = $y;

        return $this;
    }

    /**
     * Get y
     *
     * @return float
     */
    public function getY()
    {
        return $this->y;
    }

    /**
     * Set z
     *
     * @param float $z
     *
     * @return Players
     */
    public function setZ($z)
    {
        $this->z = $z;

        return $this;
    }

    /**
     * Get z
     *
     * @return float
     */
    public function getZ()
    {
        return $this->z;
    }

    /**
     * Set xp
     *
     * @param integer $xp
     *
     * @return Players
     */
    public function setXp($xp)
    {
        $this->xp = $xp;

        return $this;
    }

    /**
     * Get xp
     *
     * @return int
     */
    public function getXp()
    {
        return $this->xp;
    }

    /**
     * Set money
     *
     * @param integer $money
     *
     * @return Players
     */
    public function setMoney($money)
    {
        $this->money = $money;

        return $this;
    }

    /**
     * Get money
     *
     * @return int
     */
    public function getMoney()
    {
        return $this->money;
    }

    /**
     * Set job
     *
     * @param integer $job
     *
     * @return Players
     */
    public function setJob($job)
    {
        $this->job = $job;

        return $this;
    }

    /**
     * Get job
     *
     * @return int
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Set face
     *
     * @param boolean $face
     *
     * @return Players
     */
    public function setFace($face)
    {
        $this->face = $face;

        return $this;
    }

    /**
     * Get face
     *
     * @return bool
     */
    public function getFace()
    {
        return $this->face;
    }

    /**
     * Set skinCol
     *
     * @param float $skinCol
     *
     * @return Players
     */
    public function setSkinCol($skinCol)
    {
        $this->skinCol = $skinCol;

        return $this;
    }

    /**
     * Get skinCol
     *
     * @return float
     */
    public function getSkinCol()
    {
        return $this->skinCol;
    }

    /**
     * Set hair
     *
     * @param boolean $hair
     *
     * @return Players
     */
    public function setHair($hair)
    {
        $this->hair = $hair;

        return $this;
    }

    /**
     * Get hair
     *
     * @return bool
     */
    public function getHair()
    {
        return $this->hair;
    }

    /**
     * Set hairCol
     *
     * @param boolean $hairCol
     *
     * @return Players
     */
    public function setHairCol($hairCol)
    {
        $this->hairCol = $hairCol;

        return $this;
    }

    /**
     * Get hairCol
     *
     * @return bool
     */
    public function getHairCol()
    {
        return $this->hairCol;
    }

    /**
     * Set hairHCol
     *
     * @param boolean $hairHCol
     *
     * @return Players
     */
    public function setHairHCol($hairHCol)
    {
        $this->hairHCol = $hairHCol;

        return $this;
    }

    /**
     * Get hairHCol
     *
     * @return bool
     */
    public function getHairHCol()
    {
        return $this->hairHCol;
    }

    /**
     * Set eyeBCol
     *
     * @param boolean $eyeBCol
     *
     * @return Players
     */
    public function setEyeBCol($eyeBCol)
    {
        $this->eyeBCol = $eyeBCol;

        return $this;
    }

    /**
     * Get eyeBCol
     *
     * @return bool
     */
    public function getEyeBCol()
    {
        return $this->eyeBCol;
    }

    /**
     * Set beardCol
     *
     * @param boolean $beardCol
     *
     * @return Players
     */
    public function setBeardCol($beardCol)
    {
        $this->beardCol = $beardCol;

        return $this;
    }

    /**
     * Get beardCol
     *
     * @return bool
     */
    public function getBeardCol()
    {
        return $this->beardCol;
    }

    /**
     * Set chestCol
     *
     * @param boolean $chestCol
     *
     * @return Players
     */
    public function setChestCol($chestCol)
    {
        $this->chestCol = $chestCol;

        return $this;
    }

    /**
     * Get chestCol
     *
     * @return bool
     */
    public function getChestCol()
    {
        return $this->chestCol;
    }

    /**
     * Set eyeCol
     *
     * @param boolean $eyeCol
     *
     * @return Players
     */
    public function setEyeCol($eyeCol)
    {
        $this->eyeCol = $eyeCol;

        return $this;
    }

    /**
     * Get eyeCol
     *
     * @return bool
     */
    public function getEyeCol()
    {
        return $this->eyeCol;
    }

    /**
     * Set top
     *
     * @param integer $top
     *
     * @return Players
     */
    public function setTop($top)
    {
        $this->top = $top;

        return $this;
    }

    /**
     * Get top
     *
     * @return int
     */
    public function getTop()
    {
        return $this->top;
    }

    /**
     * Set legs
     *
     * @param string $legs
     *
     * @return Players
     */
    public function setLegs($legs)
    {
        $this->legs = $legs;

        return $this;
    }

    /**
     * Get legs
     *
     * @return string
     */
    public function getLegs()
    {
        return $this->legs;
    }

    /**
     * Set shoes
     *
     * @param integer $shoes
     *
     * @return Players
     */
    public function setShoes($shoes)
    {
        $this->shoes = $shoes;

        return $this;
    }

    /**
     * Get shoes
     *
     * @return int
     */
    public function getShoes()
    {
        return $this->shoes;
    }
}

