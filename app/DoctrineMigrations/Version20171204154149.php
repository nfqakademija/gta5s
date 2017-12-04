<?php declare(strict_types = 1);

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171204154149 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(32) NOT NULL, UNIQUE INDEX UNIQ_C53D045F5E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE accounts ADD avatar_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE accounts ADD CONSTRAINT FK_CAC89EAC86383B10 FOREIGN KEY (avatar_id) REFERENCES image (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CAC89EAC86383B10 ON accounts (avatar_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE accounts DROP FOREIGN KEY FK_CAC89EAC86383B10');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP INDEX UNIQ_CAC89EAC86383B10 ON accounts');
        $this->addSql('ALTER TABLE accounts DROP avatar_id');
    }
}
