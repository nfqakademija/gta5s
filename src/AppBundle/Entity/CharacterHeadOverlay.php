<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CharacterHeadOverlay
 *
 * @ORM\Table(name="character_head_overlays")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CharacterHeadOverlayRepository")
 */
class CharacterHeadOverlay
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
     * @var int
     *
     * @ORM\Column(name="value", type="integer")
     */
    private $value;


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
     * Set character
     *
     * @param Character $character
     *
     * @return CharacterHeadOverlay
     */
    public function setCharacter(Character $character) : CharacterHeadOverlay
    {
        $this->character = $character;

        return $this;
    }

    /**
     * Get characterId
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
     * @return CharacterHeadOverlay
     */
    public function setOffset(integer $offset) : CharacterHeadOverlay
    {
        $this->offset = $offset;

        return $this;
    }

    /**
     * Get offset
     *
     * @return int
     */
    public function getOffset() : int
    {
        return $this->offset;
    }

    /**
     * Set value
     *
     * @param integer $value
     *
     * @return CharacterHeadOverlay
     */
    public function setValue(integer $value) : CharacterHeadOverlay
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return int
     */
    public function getValue() : int
    {
        return $this->value;
    }
}
