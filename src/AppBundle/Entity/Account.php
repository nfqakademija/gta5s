<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/2/17
 * Time: 4:49 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use AppBundle\Entity\Character;

/**
 * This entity is responsible for storing user's data,
 * that is accessible from server and website.
 *
 * @ORM\Entity
 * @ORM\Table(name="account")
 *
 * @UniqueEntity(
 *
 *      fields = {"firstName", "lastName"},
 *      message = "Ši vardo ir pavardės kombinacija jau yra užimta!"
 *
 * )
 */
class Account extends BaseEmailUser
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $firstName = '';

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $lastName = '';

    /**
     * This may be null, if player hasn't yet created character in game.
     *
     * @ORM\OneToOne(targetEntity="Character")
     * @ORM\JoinColumn(name="character", referencedColumnName="id", nullable=true)
     */
    private $character;

    /**
     * @return string
     */
    public function getFirstName() : string
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     *
     * @return Account
     */
    public function setFirstName(string $firstName) : Account
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * @return string
     */
    public function getLastName() : string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     *
     * @return Account
     */
    public function setLastName(string $lastName) : Account
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCharacter()
    {
        return $this->character;
    }

    /**
     * @param mixed $character
     *
     * @return Account
     */
    public function setCharacter($character) : Account
    {
        $this->character = $character;

        return $this;
    }



}