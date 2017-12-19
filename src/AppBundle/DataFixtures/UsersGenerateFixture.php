<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 12/17/17
 * Time: 12:04 AM
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\Account;
use AppBundle\Entity\Character;
use AppBundle\Entity\History;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class UsersGenerateFixture extends Fixture
{

    public function load(ObjectManager $manager) : void
    {

        $faker = Factory::create();

        for ($i = 0; $i < 1000; $i++) {
            $character = new Character();
            $character->setGender(random_int(0, 1));
            $character->setJob(0);
            $character->setMoney(random_int(0, 1000000));
            $character->setXp(random_int(0, 1000000));
            $character->setHair(0);
            $character->setHairCol(0);
            $character->setHairHCol(0);
            $character->setEyeBCol(0);
            $character->setBeardCol(0);
            $character->setChestCol(0);
            $character->setEyeCol(0);
            $character->setFace(0);
            $character->setSkinCol(0);
            $character->setTop(0);
            $character->setLegs(0);
            $character->setShoes(0);
            $character->setX(0);
            $character->setY(0);
            $character->setZ(0);
            $manager->persist($character);

            $email = $faker->unique()->email;

            $account = new Account();
            $account->setEmail($email);
            $account->setEmailCanonical($email);
            $account->setPassword($faker->password);
            $account->setFirstName($faker->unique()->firstName);
            $account->setLastName($faker->lastName);
            $account->setCharacter($character);
            $manager->persist($account);

            if ($i < 10) {
                $joinTime = 1;
                $enterTime = random_int(2, 200);
                $exitTime = random_int(201, 401);
                $deathTime = random_int(401, 601);
                $spawnTime = $deathTime + 1;
                $killTime = random_int(610, 800);
                $leftTime = 1001;

                $x = random_int(0, 2000);
                $y = random_int(0, 2000);
                $z = random_int(0, 2000);
                for ($j = 1; $j < 1001; $j++) {
                    $x += random_int(-2, 2);
                    $y += random_int(-2, 2);
                    $z += random_int(-2, 2);

                    $action = new History();
                    $action->setAccount($account);
                    $action->setX($x);
                    $action->setY($y);
                    $action->setZ($z);
                    $action->setTime((new \DateTime('now'))->sub(new \DateInterval('PT' . $j . 'S')));

                    if ($j === $joinTime) {
                        $action->setAction('join');
                    } elseif ($j === $enterTime) {
                        $action->setAction('enterVehicle');
                    } elseif ($j === $exitTime) {
                        $action->setAction('exitVehicle');
                    } elseif ($j === $deathTime) {
                        $action->setAction('death');
                    } elseif ($j === $spawnTime) {
                        $action->setAction('spawn');
                    } elseif ($j === $killTime) {
                        $action->setAction('kill');
                    } elseif ($j === $leftTime) {
                        $action->setAction('left');
                    } else {
                        $action->setAction('idle');
                    }

                    $manager->persist($action);
                }

                $manager->flush();
            }
        }
    }
}
