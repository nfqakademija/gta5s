<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171119184322 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE character_face_feature (id INT AUTO_INCREMENT NOT NULL, character_id INT DEFAULT NULL, offset INT NOT NULL, val DOUBLE PRECISION NOT NULL, UNIQUE INDEX UNIQ_D01DF3FC1136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE character_head_overlay (id INT AUTO_INCREMENT NOT NULL, character_id INT DEFAULT NULL, offset INT NOT NULL, value INT NOT NULL, UNIQUE INDEX UNIQ_3C53DEC61136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE character_face_feature ADD CONSTRAINT FK_D01DF3FC1136BE75 FOREIGN KEY (character_id) REFERENCES players (id)');
        $this->addSql('ALTER TABLE character_head_overlay ADD CONSTRAINT FK_3C53DEC61136BE75 FOREIGN KEY (character_id) REFERENCES players (id)');
        $this->addSql('ALTER TABLE vehicles CHANGE color_r1 color_r1 TINYINT(1) NOT NULL, CHANGE color_g1 color_g1 TINYINT(1) NOT NULL, CHANGE color_b1 color_b1 TINYINT(1) NOT NULL, CHANGE color_r2 color_r2 TINYINT(1) NOT NULL, CHANGE color_g2 color_g2 TINYINT(1) NOT NULL, CHANGE color_b2 color_b2 TINYINT(1) NOT NULL, CHANGE neon_r neon_r TINYINT(1) NOT NULL, CHANGE neon_g neon_g TINYINT(1) NOT NULL, CHANGE neon_b neon_b TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE players CHANGE face face TINYINT(1) NOT NULL, CHANGE hair hair TINYINT(1) NOT NULL, CHANGE hairCol hairCol TINYINT(1) NOT NULL, CHANGE hairHCol hairHCol TINYINT(1) NOT NULL, CHANGE eyeBCol eyeBCol TINYINT(1) NOT NULL, CHANGE beardCol beardCol TINYINT(1) NOT NULL, CHANGE chestCol chestCol TINYINT(1) NOT NULL, CHANGE eyeCol eyeCol TINYINT(1) NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE character_face_feature');
        $this->addSql('DROP TABLE character_head_overlay');
        $this->addSql('ALTER TABLE players CHANGE face face TINYINT(1) NOT NULL, CHANGE hair hair TINYINT(1) NOT NULL, CHANGE hairCol hairCol TINYINT(1) NOT NULL, CHANGE hairHCol hairHCol TINYINT(1) NOT NULL, CHANGE eyeBCol eyeBCol TINYINT(1) NOT NULL, CHANGE beardCol beardCol TINYINT(1) NOT NULL, CHANGE chestCol chestCol TINYINT(1) NOT NULL, CHANGE eyeCol eyeCol TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE vehicles CHANGE color_r1 color_r1 TINYINT(1) NOT NULL, CHANGE color_g1 color_g1 TINYINT(1) NOT NULL, CHANGE color_b1 color_b1 TINYINT(1) NOT NULL, CHANGE color_r2 color_r2 TINYINT(1) NOT NULL, CHANGE color_g2 color_g2 TINYINT(1) NOT NULL, CHANGE color_b2 color_b2 TINYINT(1) NOT NULL, CHANGE neon_r neon_r TINYINT(1) NOT NULL, CHANGE neon_g neon_g TINYINT(1) NOT NULL, CHANGE neon_b neon_b TINYINT(1) NOT NULL');
    }
}
