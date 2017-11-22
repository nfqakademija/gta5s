<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171122115722 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE vehicles');
        $this->addSql('ALTER TABLE character_face_features DROP INDEX UNIQ_AFD56CCF1136BE75, ADD INDEX IDX_AFD56CCF1136BE75 (character_id)');
        $this->addSql('ALTER TABLE character_head_overlays DROP INDEX UNIQ_6935FB501136BE75, ADD INDEX IDX_6935FB501136BE75 (character_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE vehicles (id INT AUTO_INCREMENT NOT NULL, model VARCHAR(64) NOT NULL COLLATE utf8_unicode_ci, x DOUBLE PRECISION NOT NULL, y DOUBLE PRECISION NOT NULL, z DOUBLE PRECISION NOT NULL, rx DOUBLE PRECISION NOT NULL, ry DOUBLE PRECISION NOT NULL, rz DOUBLE PRECISION NOT NULL, job INT NOT NULL, color_r1 TINYINT(1) NOT NULL, color_g1 TINYINT(1) NOT NULL, color_b1 TINYINT(1) NOT NULL, color_r2 TINYINT(1) NOT NULL, color_g2 TINYINT(1) NOT NULL, color_b2 TINYINT(1) NOT NULL, neon_r TINYINT(1) NOT NULL, neon_g TINYINT(1) NOT NULL, neon_b TINYINT(1) NOT NULL, numberPlate VARCHAR(8) NOT NULL COLLATE utf8_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE character_face_features DROP INDEX IDX_AFD56CCF1136BE75, ADD UNIQUE INDEX UNIQ_AFD56CCF1136BE75 (character_id)');
        $this->addSql('ALTER TABLE character_head_overlays DROP INDEX IDX_6935FB501136BE75, ADD UNIQUE INDEX UNIQ_6935FB501136BE75 (character_id)');
    }
}
