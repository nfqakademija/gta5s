<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Vehicle
 *
 * @ORM\Table(name="vehicles")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\VehicleRepository")
 */
class Vehicle
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
     * @ORM\Column(name="model", type="string", length=64)
     */
    private $model;

    /**
     * @var float
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
     * @var float
     *
     * @ORM\Column(name="rx", type="float")
     */
    private $rx;

    /**
     * @var float
     *
     * @ORM\Column(name="ry", type="float")
     */
    private $ry;

    /**
     * @var float
     *
     * @ORM\Column(name="rz", type="float")
     */
    private $rz;

    /**
     * @var integer
     *
     * @ORM\Column(name="job", type="integer")
     */
    private $job;

    /**
     * @var float
     *
     * @ORM\Column(name="color_r1", type="boolean", length=3, options={"unsigned": true})
     */
    private $colorR1;

    /**
     * @var float
     *
     * @ORM\Column(name="color_g1", type="boolean", length=3, options={"unsigned": true})
     */
    private $colorG1;

    /**
     * @var bool
     *
     * @ORM\Column(name="color_b1", type="boolean", length=3, options={"unsigned": true})
     */
    private $colorB1;

    /**
     * @var bool
     *
     * @ORM\Column(name="color_r2", type="boolean", length=3, options={"unsigned": true})
     */
    private $colorR2;

    /**
     * @var bool
     *
     * @ORM\Column(name="color_g2", type="boolean", length=3, options={"unsigned": true})
     */
    private $colorG2;

    /**
     * @var bool
     *
     * @ORM\Column(name="color_b2", type="boolean", length=3, options={"unsigned": true})
     */
    private $colorB2;

    /**
     * @var bool
     *
     * @ORM\Column(name="neon_r", type="boolean", length=3, options={"unsigned": true})
     */
    private $neonR;

    /**
     * @var bool
     *
     * @ORM\Column(name="neon_g", type="boolean", length=3, options={"unsigned": true})
     */
    private $neonG;

    /**
     * @var bool
     *
     * @ORM\Column(name="neon_b", type="boolean", length=3, options={"unsigned": true})
     */
    private $neonB;

    /**
     * @var string
     *
     * @ORM\Column(name="numberPlate", type="string", length=8)
     */
    private $numberPlate;


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
     * Set model
     *
     * @param string $model
     *
     * @return Vehicle
     */
    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    /**
     * Get model
     *
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set x
     *
     * @param float $x
     *
     * @return Vehicle
     */
    public function setX($x)
    {
        $this->x = $x;

        return $this;
    }

    /**
     * Get x
     *
     * @return float
     */
    public function getX()
    {
        return $this->x;
    }

    /**
     * Set y
     *
     * @param float $y
     *
     * @return Vehicle
     */
    public function setY($y)
    {
        $this->y = $y;

        return $this;
    }

    /**
     * Get y
     *
     * @return float
     */
    public function getY()
    {
        return $this->y;
    }

    /**
     * Set z
     *
     * @param float $z
     *
     * @return Vehicle
     */
    public function setZ($z)
    {
        $this->z = $z;

        return $this;
    }

    /**
     * Get z
     *
     * @return float
     */
    public function getZ()
    {
        return $this->z;
    }

    /**
     * Set rx
     *
     * @param float $rx
     *
     * @return Vehicle
     */
    public function setRx($rx)
    {
        $this->rx = $rx;

        return $this;
    }

    /**
     * Get rx
     *
     * @return float
     */
    public function getRx()
    {
        return $this->rx;
    }

    /**
     * Set ry
     *
     * @param float $ry
     *
     * @return Vehicle
     */
    public function setRy($ry)
    {
        $this->ry = $ry;

        return $this;
    }

    /**
     * Get ry
     *
     * @return float
     */
    public function getRy()
    {
        return $this->ry;
    }

    /**
     * Set rz
     *
     * @param float $rz
     *
     * @return Vehicle
     */
    public function setRz($rz)
    {
        $this->rz = $rz;

        return $this;
    }

    /**
     * Get rz
     *
     * @return float
     */
    public function getRz()
    {
        return $this->rz;
    }

    /**
     * @return int
     */
    public function getJob(): int
    {
        return $this->job;
    }

    /**
     * @param int $job
     */
    public function setJob(int $job)
    {
        $this->job = $job;
    }

    /**
     * Set colorR1
     *
     * @param float $colorR1
     *
     * @return Vehicle
     */
    public function setColorR1($colorR1)
    {
        $this->colorR1 = $colorR1;

        return $this;
    }

    /**
     * Get colorR1
     *
     * @return float
     */
    public function getColorR1()
    {
        return $this->colorR1;
    }

    /**
     * Set colorG1
     *
     * @param float $colorG1
     *
     * @return Vehicle
     */
    public function setColorG1($colorG1)
    {
        $this->colorG1 = $colorG1;

        return $this;
    }

    /**
     * Get colorG1
     *
     * @return float
     */
    public function getColorG1()
    {
        return $this->colorG1;
    }

    /**
     * Set colorB1
     *
     * @param boolean $colorB1
     *
     * @return Vehicle
     */
    public function setColorB1($colorB1)
    {
        $this->colorB1 = $colorB1;

        return $this;
    }

    /**
     * Get colorB1
     *
     * @return bool
     */
    public function getColorB1()
    {
        return $this->colorB1;
    }

    /**
     * Set colorR2
     *
     * @param boolean $colorR2
     *
     * @return Vehicle
     */
    public function setColorR2($colorR2)
    {
        $this->colorR2 = $colorR2;

        return $this;
    }

    /**
     * Get colorR2
     *
     * @return bool
     */
    public function getColorR2()
    {
        return $this->colorR2;
    }

    /**
     * Set colorG2
     *
     * @param boolean $colorG2
     *
     * @return Vehicle
     */
    public function setColorG2($colorG2)
    {
        $this->colorG2 = $colorG2;

        return $this;
    }

    /**
     * Get colorG2
     *
     * @return bool
     */
    public function getColorG2()
    {
        return $this->colorG2;
    }

    /**
     * Set colorB2
     *
     * @param boolean $colorB2
     *
     * @return Vehicle
     */
    public function setColorB2($colorB2)
    {
        $this->colorB2 = $colorB2;

        return $this;
    }

    /**
     * Get colorB2
     *
     * @return bool
     */
    public function getColorB2()
    {
        return $this->colorB2;
    }

    /**
     * Set neonR
     *
     * @param boolean $neonR
     *
     * @return Vehicle
     */
    public function setNeonR($neonR)
    {
        $this->neonR = $neonR;

        return $this;
    }

    /**
     * Get neonR
     *
     * @return bool
     */
    public function getNeonR()
    {
        return $this->neonR;
    }

    /**
     * Set neonG
     *
     * @param boolean $neonG
     *
     * @return Vehicle
     */
    public function setNeonG($neonG)
    {
        $this->neonG = $neonG;

        return $this;
    }

    /**
     * Get neonG
     *
     * @return bool
     */
    public function getNeonG()
    {
        return $this->neonG;
    }

    /**
     * Set neonB
     *
     * @param boolean $neonB
     *
     * @return Vehicle
     */
    public function setNeonB($neonB)
    {
        $this->neonB = $neonB;

        return $this;
    }

    /**
     * Get neonB
     *
     * @return bool
     */
    public function getNeonB()
    {
        return $this->neonB;
    }

    /**
     * Set numberPlate
     *
     * @param string $numberPlate
     *
     * @return Vehicle
     */
    public function setNumberPlate($numberPlate)
    {
        $this->numberPlate = $numberPlate;

        return $this;
    }

    /**
     * Get numberPlate
     *
     * @return string
     */
    public function getNumberPlate()
    {
        return $this->numberPlate;
    }
}

