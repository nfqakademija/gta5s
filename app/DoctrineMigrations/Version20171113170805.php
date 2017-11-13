<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171113170805 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE accounts (id INT AUTO_INCREMENT NOT NULL, character_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', first_name VARCHAR(64) NOT NULL, last_name VARCHAR(64) NOT NULL, UNIQUE INDEX UNIQ_CAC89EAC92FC23A8 (username_canonical), UNIQUE INDEX UNIQ_CAC89EACA0D96FBF (email_canonical), UNIQUE INDEX UNIQ_CAC89EACC05FB297 (confirmation_token), UNIQUE INDEX UNIQ_CAC89EAC1136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE accounts ADD CONSTRAINT FK_CAC89EAC1136BE75 FOREIGN KEY (character_id) REFERENCES players (id)');
        $this->addSql('DROP TABLE account');
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

        $this->addSql('CREATE TABLE account (id INT AUTO_INCREMENT NOT NULL, character_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL COLLATE utf8_unicode_ci, username_canonical VARCHAR(180) NOT NULL COLLATE utf8_unicode_ci, email VARCHAR(180) NOT NULL COLLATE utf8_unicode_ci, email_canonical VARCHAR(180) NOT NULL COLLATE utf8_unicode_ci, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, password VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL COLLATE utf8_unicode_ci, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COLLATE utf8_unicode_ci COMMENT \'(DC2Type:array)\', first_name VARCHAR(64) NOT NULL COLLATE utf8_unicode_ci, last_name VARCHAR(64) NOT NULL COLLATE utf8_unicode_ci, UNIQUE INDEX UNIQ_7D3656A492FC23A8 (username_canonical), UNIQUE INDEX UNIQ_7D3656A4A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_7D3656A4C05FB297 (confirmation_token), UNIQUE INDEX UNIQ_7D3656A41136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE account ADD CONSTRAINT FK_7D3656A41136BE75 FOREIGN KEY (character_id) REFERENCES players (id)');
        $this->addSql('DROP TABLE accounts');
        $this->addSql('ALTER TABLE players CHANGE face face TINYINT(1) NOT NULL, CHANGE hair hair TINYINT(1) NOT NULL, CHANGE hairCol hairCol TINYINT(1) NOT NULL, CHANGE hairHCol hairHCol TINYINT(1) NOT NULL, CHANGE eyeBCol eyeBCol TINYINT(1) NOT NULL, CHANGE beardCol beardCol TINYINT(1) NOT NULL, CHANGE chestCol chestCol TINYINT(1) NOT NULL, CHANGE eyeCol eyeCol TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE vehicles CHANGE color_r1 color_r1 TINYINT(1) NOT NULL, CHANGE color_g1 color_g1 TINYINT(1) NOT NULL, CHANGE color_b1 color_b1 TINYINT(1) NOT NULL, CHANGE color_r2 color_r2 TINYINT(1) NOT NULL, CHANGE color_g2 color_g2 TINYINT(1) NOT NULL, CHANGE color_b2 color_b2 TINYINT(1) NOT NULL, CHANGE neon_r neon_r TINYINT(1) NOT NULL, CHANGE neon_g neon_g TINYINT(1) NOT NULL, CHANGE neon_b neon_b TINYINT(1) NOT NULL');
    }
}
