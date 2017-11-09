<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/2/17
 * Time: 4:49 PM
 */

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

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

}