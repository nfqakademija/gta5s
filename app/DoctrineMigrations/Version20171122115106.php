<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171122115106 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE action_history (id INT AUTO_INCREMENT NOT NULL, account_id INT DEFAULT NULL, time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, action VARCHAR(64) NOT NULL, details VARCHAR(2048) NOT NULL, INDEX IDX_FD18F8AA9B6B5FBA (account_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicles (id INT AUTO_INCREMENT NOT NULL, model VARCHAR(64) NOT NULL, x DOUBLE PRECISION NOT NULL, y DOUBLE PRECISION NOT NULL, z DOUBLE PRECISION NOT NULL, rx DOUBLE PRECISION NOT NULL, ry DOUBLE PRECISION NOT NULL, rz DOUBLE PRECISION NOT NULL, job INT NOT NULL, color_r1 TINYINT(1) NOT NULL, color_g1 TINYINT(1) NOT NULL, color_b1 TINYINT(1) NOT NULL, color_r2 TINYINT(1) NOT NULL, color_g2 TINYINT(1) NOT NULL, color_b2 TINYINT(1) NOT NULL, neon_r TINYINT(1) NOT NULL, neon_g TINYINT(1) NOT NULL, neon_b TINYINT(1) NOT NULL, numberPlate VARCHAR(8) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE accounts (id INT AUTO_INCREMENT NOT NULL, character_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', first_name VARCHAR(64) NOT NULL, last_name VARCHAR(64) NOT NULL, UNIQUE INDEX UNIQ_CAC89EAC92FC23A8 (username_canonical), UNIQUE INDEX UNIQ_CAC89EACA0D96FBF (email_canonical), UNIQUE INDEX UNIQ_CAC89EACC05FB297 (confirmation_token), UNIQUE INDEX UNIQ_CAC89EAC1136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE character_face_features (id INT AUTO_INCREMENT NOT NULL, character_id INT DEFAULT NULL, offset INT NOT NULL, value DOUBLE PRECISION NOT NULL, UNIQUE INDEX UNIQ_AFD56CCF1136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE characters (id INT AUTO_INCREMENT NOT NULL, gender TINYINT(1) NOT NULL, x DOUBLE PRECISION NOT NULL, y DOUBLE PRECISION NOT NULL, z DOUBLE PRECISION NOT NULL, xp INT NOT NULL, money INT NOT NULL, job INT NOT NULL, face INT NOT NULL, skinCol DOUBLE PRECISION NOT NULL, hair INT NOT NULL, hairCol INT NOT NULL, hairHCol INT NOT NULL, eyeBCol INT NOT NULL, beardCol INT NOT NULL, chestCol INT NOT NULL, eyeCol INT NOT NULL, top INT NOT NULL, legs INT NOT NULL, shoes INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE character_head_overlays (id INT AUTO_INCREMENT NOT NULL, character_id INT DEFAULT NULL, offset INT NOT NULL, value INT NOT NULL, UNIQUE INDEX UNIQ_6935FB501136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE action_history ADD CONSTRAINT FK_FD18F8AA9B6B5FBA FOREIGN KEY (account_id) REFERENCES accounts (id)');
        $this->addSql('ALTER TABLE accounts ADD CONSTRAINT FK_CAC89EAC1136BE75 FOREIGN KEY (character_id) REFERENCES characters (id)');
        $this->addSql('ALTER TABLE character_face_features ADD CONSTRAINT FK_AFD56CCF1136BE75 FOREIGN KEY (character_id) REFERENCES characters (id)');
        $this->addSql('ALTER TABLE character_head_overlays ADD CONSTRAINT FK_6935FB501136BE75 FOREIGN KEY (character_id) REFERENCES characters (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE action_history DROP FOREIGN KEY FK_FD18F8AA9B6B5FBA');
        $this->addSql('ALTER TABLE accounts DROP FOREIGN KEY FK_CAC89EAC1136BE75');
        $this->addSql('ALTER TABLE character_face_features DROP FOREIGN KEY FK_AFD56CCF1136BE75');
        $this->addSql('ALTER TABLE character_head_overlays DROP FOREIGN KEY FK_6935FB501136BE75');
        $this->addSql('DROP TABLE action_history');
        $this->addSql('DROP TABLE vehicles');
        $this->addSql('DROP TABLE accounts');
        $this->addSql('DROP TABLE character_face_features');
        $this->addSql('DROP TABLE characters');
        $this->addSql('DROP TABLE character_head_overlays');
    }
}
