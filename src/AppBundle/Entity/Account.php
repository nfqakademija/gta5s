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

/**
 * This is same as BaseUser but will use email instead of username
 * @package AppBundle\Entity
 */
class BaseEmailUser extends BaseUser {

    public function setEmail($email)
    {
        $this->setUsername($email);

        return parent::setEmail($email);
    }

    public function setEmailCanonical($emailCanonical)
    {
        $this->setUsernameCanonical($emailCanonical);

        return parent::setEmailCanonical($emailCanonical);
    }

}

/**
 * This entity is responsible for storing user's data,
 * that is accessible from server and website.
 *
 * @ORM\Entity
 * @ORM\Table(name="account")
 */
class Account extends BaseEmailUser
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;


}