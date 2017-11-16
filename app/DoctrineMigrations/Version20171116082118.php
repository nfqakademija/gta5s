<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171116082118 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE action_history (id INT AUTO_INCREMENT NOT NULL, account_id INT DEFAULT NULL, time DATETIME NOT NULL, action VARCHAR(64) NOT NULL, details VARCHAR(2048) NOT NULL, UNIQUE INDEX UNIQ_FD18F8AA9B6B5FBA (account_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE action_history ADD CONSTRAINT FK_FD18F8AA9B6B5FBA FOREIGN KEY (account_id) REFERENCES accounts (id)');
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

        $this->addSql('DROP TABLE action_history');
        $this->addSql('ALTER TABLE players CHANGE face face TINYINT(1) NOT NULL, CHANGE hair hair TINYINT(1) NOT NULL, CHANGE hairCol hairCol TINYINT(1) NOT NULL, CHANGE hairHCol hairHCol TINYINT(1) NOT NULL, CHANGE eyeBCol eyeBCol TINYINT(1) NOT NULL, CHANGE beardCol beardCol TINYINT(1) NOT NULL, CHANGE chestCol chestCol TINYINT(1) NOT NULL, CHANGE eyeCol eyeCol TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE vehicles CHANGE color_r1 color_r1 TINYINT(1) NOT NULL, CHANGE color_g1 color_g1 TINYINT(1) NOT NULL, CHANGE color_b1 color_b1 TINYINT(1) NOT NULL, CHANGE color_r2 color_r2 TINYINT(1) NOT NULL, CHANGE color_g2 color_g2 TINYINT(1) NOT NULL, CHANGE color_b2 color_b2 TINYINT(1) NOT NULL, CHANGE neon_r neon_r TINYINT(1) NOT NULL, CHANGE neon_g neon_g TINYINT(1) NOT NULL, CHANGE neon_b neon_b TINYINT(1) NOT NULL');
    }
}
