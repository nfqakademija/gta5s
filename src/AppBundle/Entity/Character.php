<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Players
 *
 * @ORM\Table(name="characters")
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
     * @var int
     *
     * @ORM\Column(name="face", type="integer")
     */
    private $face;

    /**
     * @var int
     *
     * @ORM\Column(name="skinCol", type="float")
     */
    private $skinCol;

    /**
     * @var int
     *
     * @ORM\Column(name="hair", type="integer")
     */
    private $hair;

    /**
     * @var int
     *
     * @ORM\Column(name="hairCol", type="integer")
     */
    private $hairCol;

    /**
     * @var int
     *
     * @ORM\Column(name="hairHCol", type="integer")
     */
    private $hairHCol;

    /**
     * @var int
     *
     * @ORM\Column(name="eyeBCol", type="integer")
     */
    private $eyeBCol;

    /**
     * @var int
     *
     * @ORM\Column(name="beardCol", type="integer")
     */
    private $beardCol;

    /**
     * @var int
     *
     * @ORM\Column(name="chestCol", type="integer")
     */
    private $chestCol;

    /**
     * @var int
     *
     * @ORM\Column(name="eyeCol", type="integer")
     */
    private $eyeCol;

    /**
     * @var int
     *
     * @ORM\Column(name="top", type="integer")
     */
    private $top;

    /**
     * @var int
     *
     * @ORM\Column(name="legs", type="integer")
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
    public function getId() : int
    {
        return $this->id;
    }

    /**
     * Set gender
     *
     * @param boolean $gender
     *
     * @return Character
     */
    public function setGender($gender) : Character
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return bool
     */
    public function getGender() : bool
    {
        return $this->gender;
    }

    /**
     * Set x
     *
     * @param float $x
     *
     * @return Character
     */
    public function setX($x) : Character
    {
        $this->x = $x;

        return $this;
    }

    /**
     * Get x
     *
     * @return float
     */
    public function getX() : float
    {
        return $this->x;
    }

    /**
     * Set y
     *
     * @param float $y
     *
     * @return Character
     */
    public function setY(float $y) : Character
    {
        $this->y = $y;

        return $this;
    }

    /**
     * Get y
     *
     * @return float
     */
    public function getY() : float
    {
        return $this->y;
    }

    /**
     * Set z
     *
     * @param float $z
     *
     * @return Character
     */
    public function setZ(float $z) : Character
    {
        $this->z = $z;

        return $this;
    }

    /**
     * Get z
     *
     * @return float
     */
    public function getZ() : float
    {
        return $this->z;
    }

    /**
     * Set xp
     *
     * @param integer $xp
     *
     * @return Character
     */
    public function setXp(int $xp) : Character
    {
        $this->xp = $xp;

        return $this;
    }

    /**
     * Get xp
     *
     * @return int
     */
    public function getXp() : int
    {
        return $this->xp;
    }

    /**
     * Set money
     *
     * @param integer $money
     *
     * @return Character
     */
    public function setMoney(int $money) : Character
    {
        $this->money = $money;

        return $this;
    }

    /**
     * Get money
     *
     * @return int
     */
    public function getMoney() : int
    {
        return $this->money;
    }

    /**
     * Set job
     *
     * @param integer $job
     *
     * @return Character
     */
    public function setJob(int $job) : Character
    {
        $this->job = $job;

        return $this;
    }

    /**
     * Get job
     *
     * @return int
     */
    public function getJob() : int
    {
        return $this->job;
    }

    /**
     * Set face
     *
     * @param int $face
     *
     * @return Character
     */
    public function setFace(int $face) : Character
    {
        $this->face = $face;

        return $this;
    }

    /**
     * Get face
     *
     * @return int
     */
    public function getFace() : int
    {
        return $this->face;
    }

    /**
     * Set skinCol
     *
     * @param float $skinCol
     *
     * @return Character
     */
    public function setSkinCol(float $skinCol) : Character
    {
        $this->skinCol = $skinCol;

        return $this;
    }

    /**
     * Get skinCol
     *
     * @return float
     */
    public function getSkinCol() : float
    {
        return $this->skinCol;
    }

    /**
     * Set hair
     *
     * @param int $hair
     *
     * @return Character
     */
    public function setHair(int $hair) : Character
    {
        $this->hair = $hair;

        return $this;
    }

    /**
     * Get hair
     *
     * @return int
     */
    public function getHair() : int
    {
        return $this->hair;
    }

    /**
     * Set hairCol
     *
     * @param int $hairCol
     *
     * @return Character
     */
    public function setHairCol(int $hairCol) : Character
    {
        $this->hairCol = $hairCol;

        return $this;
    }

    /**
     * Get hairCol
     *
     * @return int
     */
    public function getHairCol() : int
    {
        return $this->hairCol;
    }

    /**
     * Set hairHCol
     *
     * @param int $hairHCol
     *
     * @return Character
     */
    public function setHairHCol(int $hairHCol) : Character
    {
        $this->hairHCol = $hairHCol;

        return $this;
    }

    /**
     * Get hairHCol
     *
     * @return int
     */
    public function getHairHCol() : int
    {
        return $this->hairHCol;
    }

    /**
     * Set eyeBCol
     *
     * @param int $eyeBCol
     *
     * @return Character
     */
    public function setEyeBCol(int $eyeBCol) : Character
    {
        $this->eyeBCol = $eyeBCol;

        return $this;
    }

    /**
     * Get eyeBCol
     *
     * @return int
     */
    public function getEyeBCol() : int
    {
        return $this->eyeBCol;
    }

    /**
     * Set beardCol
     *
     * @param int $beardCol
     *
     * @return Character
     */
    public function setBeardCol(int $beardCol) : Character
    {
        $this->beardCol = $beardCol;

        return $this;
    }

    /**
     * Get beardCol
     *
     * @return int
     */
    public function getBeardCol() : int
    {
        return $this->beardCol;
    }

    /**
     * Set chestCol
     *
     * @param int $chestCol
     *
     * @return Character
     */
    public function setChestCol(int $chestCol) : Character
    {
        $this->chestCol = $chestCol;

        return $this;
    }

    /**
     * Get chestCol
     *
     * @return int
     */
    public function getChestCol() : int
    {
        return $this->chestCol;
    }

    /**
     * Set eyeCol
     *
     * @param int $eyeCol
     *
     * @return Character
     */
    public function setEyeCol(int $eyeCol) : Character
    {
        $this->eyeCol = $eyeCol;

        return $this;
    }

    /**
     * Get eyeCol
     *
     * @return int
     */
    public function getEyeCol() : int
    {
        return $this->eyeCol;
    }

    /**
     * Set top
     *
     * @param int $top
     *
     * @return Character
     */
    public function setTop(int $top) : Character
    {
        $this->top = $top;

        return $this;
    }

    /**
     * Get top
     *
     * @return int
     */
    public function getTop() : int
    {
        return $this->top;
    }

    /**
     * Set legs
     *
     * @param int $legs
     *
     * @return Character
     */
    public function setLegs(int $legs) : Character
    {
        $this->legs = $legs;

        return $this;
    }

    /**
     * Get legs
     *
     * @return int
     */
    public function getLegs() : int
    {
        return $this->legs;
    }

    /**
     * Set shoes
     *
     * @param int $shoes
     *
     * @return Character
     */
    public function setShoes(int $shoes) : Character
    {
        $this->shoes = $shoes;

        return $this;
    }

    /**
     * Get shoes
     *
     * @return int
     */
    public function getShoes() : int
    {
        return $this->shoes;
    }
}
