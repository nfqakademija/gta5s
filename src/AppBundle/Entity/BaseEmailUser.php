<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/9/17
 * Time: 4:28 PM
 */

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;

/**
 * This is same as BaseUser but will use email instead of username
 * @package AppBundle\Entity
 */
class BaseEmailUser extends BaseUser {

    public function setEmail($email)
    {
        parent::setUsername($email);
        parent::setEmail($email);

        return $this;
    }

    public function setEmailCanonical($emailCanonical)
    {
        parent::setUsernameCanonical($emailCanonical);
        parent::setEmailCanonical($emailCanonical);

        return $this;
    }

}