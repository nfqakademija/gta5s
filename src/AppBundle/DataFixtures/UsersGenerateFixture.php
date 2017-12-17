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
                $x = random_int(0, 2000);
                $y = random_int(0, 2000);
                $z = random_int(0, 2000);
                for ($j = 1; $j < 1001; $j++) {
                    $x += random_int(-2, 2);
                    $y += random_int(-2, 2);
                    $z += random_int(-2, 2);

                    $action = new History();
                    $action->setAccount($account);
                    $action->setAction('idle');
                    $action->setX($x);
                    $action->setY($y);
                    $action->setZ($z);
                    $action->setTime((new \DateTime('now'))->sub(new \DateInterval('PT' . $j . 'S')));
                    $manager->persist($action);
                }

                $manager->flush();
            }
        }
    }
}
