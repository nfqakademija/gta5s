<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171109145646 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE vehicles CHANGE color_r1 color_r1 TINYINT(1) NOT NULL, CHANGE color_g1 color_g1 TINYINT(1) NOT NULL, CHANGE color_b1 color_b1 TINYINT(1) NOT NULL, CHANGE color_r2 color_r2 TINYINT(1) NOT NULL, CHANGE color_g2 color_g2 TINYINT(1) NOT NULL, CHANGE color_b2 color_b2 TINYINT(1) NOT NULL, CHANGE neon_r neon_r TINYINT(1) NOT NULL, CHANGE neon_g neon_g TINYINT(1) NOT NULL, CHANGE neon_b neon_b TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE account DROP FOREIGN KEY FK_7D3656A4937AB034');
        $this->addSql('DROP INDEX UNIQ_7D3656A4937AB034 ON account');
        $this->addSql('ALTER TABLE account CHANGE `character` character_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE account ADD CONSTRAINT FK_7D3656A41136BE75 FOREIGN KEY (character_id) REFERENCES players (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7D3656A41136BE75 ON account (character_id)');
        $this->addSql('ALTER TABLE players CHANGE face face TINYINT(1) NOT NULL, CHANGE hair hair TINYINT(1) NOT NULL, CHANGE hairCol hairCol TINYINT(1) NOT NULL, CHANGE hairHCol hairHCol TINYINT(1) NOT NULL, CHANGE eyeBCol eyeBCol TINYINT(1) NOT NULL, CHANGE beardCol beardCol TINYINT(1) NOT NULL, CHANGE chestCol chestCol TINYINT(1) NOT NULL, CHANGE eyeCol eyeCol TINYINT(1) NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE account DROP FOREIGN KEY FK_7D3656A41136BE75');
        $this->addSql('DROP INDEX UNIQ_7D3656A41136BE75 ON account');
        $this->addSql('ALTER TABLE account CHANGE character_id `character` INT DEFAULT NULL');
        $this->addSql('ALTER TABLE account ADD CONSTRAINT FK_7D3656A4937AB034 FOREIGN KEY (`character`) REFERENCES players (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7D3656A4937AB034 ON account (`character`)');
        $this->addSql('ALTER TABLE players CHANGE face face TINYINT(1) NOT NULL, CHANGE hair hair TINYINT(1) NOT NULL, CHANGE hairCol hairCol TINYINT(1) NOT NULL, CHANGE hairHCol hairHCol TINYINT(1) NOT NULL, CHANGE eyeBCol eyeBCol TINYINT(1) NOT NULL, CHANGE beardCol beardCol TINYINT(1) NOT NULL, CHANGE chestCol chestCol TINYINT(1) NOT NULL, CHANGE eyeCol eyeCol TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE vehicles CHANGE color_r1 color_r1 TINYINT(1) NOT NULL, CHANGE color_g1 color_g1 TINYINT(1) NOT NULL, CHANGE color_b1 color_b1 TINYINT(1) NOT NULL, CHANGE color_r2 color_r2 TINYINT(1) NOT NULL, CHANGE color_g2 color_g2 TINYINT(1) NOT NULL, CHANGE color_b2 color_b2 TINYINT(1) NOT NULL, CHANGE neon_r neon_r TINYINT(1) NOT NULL, CHANGE neon_g neon_g TINYINT(1) NOT NULL, CHANGE neon_b neon_b TINYINT(1) NOT NULL');
    }
}
