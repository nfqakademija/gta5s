<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

define('IMAGE_STORE_PATH', 'uploads/images/');

/**
 * Image
 *
 * @ORM\Table(name="image")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ImageRepository")
 */
class Image
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=32, unique=true)
     */
    private $name;


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
     * Set name
     *
     * @param string $name
     *
     * @return Image
     */
    public function setFileName(string $name) : Image
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getFileName() : string
    {
        return $this->name;
    }

    /**
     * Generates URL
     *
     * @return string
     */
    public function generateFileURL() : string
    {
        return IMAGE_STORE_PATH . $this->getFileName();
    }
}
