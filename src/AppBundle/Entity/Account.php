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
 * This entity is responsible for storing user's data,
 * that is accessible from server and website.
 *
 * @ORM\Entity
 * @ORM\Table(name="account")
 */
class Account extends BaseUser
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();



    }

}