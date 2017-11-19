<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CharacterFaceFeature
 *
 * @ORM\Table(name="character_face_feature")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CharacterFaceFeatureRepository")
 */
class CharacterFaceFeature
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
     * @var Character
     *
     * @ORM\OneToOne(targetEntity="Character")
     * @ORM\JoinColumn(name="character_id", referencedColumnName="id")
     */
    private $character;

    /**
     * @var int
     *
     * @ORM\Column(name="offset", type="integer")
     */
    private $offset;

    /**
     * @var float
     *
     * @ORM\Column(name="val", type="float")
     */
    private $val;


    /**
     * Get id
     *
     * @return int
     */
    public function getId() : integer
    {
        return $this->id;
    }

    /**
     * Set character
     *
     * @param Character $character
     *
     * @return CharacterFaceFeature
     */
    public function setCharacter(Character $character) : CharacterFaceFeature
    {
        $this->character = $character;

        return $this;
    }

    /**
     * Get characerId
     *
     * @return Character
     */
    public function getCharacter() : Character
    {
        return $this->character;
    }

    /**
     * Set offset
     *
     * @param integer $offset
     *
     * @return CharacterFaceFeature
     */
    public function setOffset(integer $offset) : CharacterFaceFeature
    {
        $this->offset = $offset;

        return $this;
    }

    /**
     * Get offset
     *
     * @return int
     */
    public function getOffset() : integer
    {
        return $this->offset;
    }

    /**
     * Set val
     *
     * @param float $val
     *
     * @return CharacterFaceFeature
     */
    public function setVal(float $val) : CharacterFaceFeature
    {
        $this->val = $val;

        return $this;
    }

    /**
     * Get val
     *
     * @return float
     */
    public function getVal() : float
    {
        return $this->val;
    }
}

