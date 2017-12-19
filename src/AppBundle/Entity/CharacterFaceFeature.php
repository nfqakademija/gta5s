<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CharacterFaceFeature
 *
 * @ORM\Table(name="character_face_features")
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
     * @ORM\ManyToOne(targetEntity="Character")
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
     * @ORM\Column(name="value", type="float")
     */
    private $value;


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
     * Set value
     *
     * @param float $value
     *
     * @return CharacterFaceFeature
     */
    public function setValue(float $value) : CharacterFaceFeature
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return float
     */
    public function getValue() : float
    {
        return $this->value;
    }
}
