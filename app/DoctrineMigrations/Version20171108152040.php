<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171108152040 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE vehicles (id INT AUTO_INCREMENT NOT NULL, model VARCHAR(64) NOT NULL, x DOUBLE PRECISION NOT NULL, y DOUBLE PRECISION NOT NULL, z DOUBLE PRECISION NOT NULL, rx DOUBLE PRECISION NOT NULL, ry DOUBLE PRECISION NOT NULL, rz DOUBLE PRECISION NOT NULL, job INT NOT NULL, color_r1 TINYINT(1) NOT NULL, color_g1 TINYINT(1) NOT NULL, color_b1 TINYINT(1) NOT NULL, color_r2 TINYINT(1) NOT NULL, color_g2 TINYINT(1) NOT NULL, color_b2 TINYINT(1) NOT NULL, neon_r TINYINT(1) NOT NULL, neon_g TINYINT(1) NOT NULL, neon_b TINYINT(1) NOT NULL, numberPlate VARCHAR(8) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE players (id INT AUTO_INCREMENT NOT NULL, account INT NOT NULL, gender TINYINT(1) NOT NULL, x DOUBLE PRECISION NOT NULL, y DOUBLE PRECISION NOT NULL, z DOUBLE PRECISION NOT NULL, xp INT NOT NULL, money INT NOT NULL, job INT NOT NULL, face TINYINT(1) NOT NULL, skinCol DOUBLE PRECISION NOT NULL, hair TINYINT(1) NOT NULL, hairCol TINYINT(1) NOT NULL, hairHCol TINYINT(1) NOT NULL, eyeBCol TINYINT(1) NOT NULL, beardCol TINYINT(1) NOT NULL, chestCol TINYINT(1) NOT NULL, eyeCol TINYINT(1) NOT NULL, top INT NOT NULL, legs VARCHAR(255) NOT NULL, shoes INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE vehicles');
        $this->addSql('DROP TABLE players');
    }
}
