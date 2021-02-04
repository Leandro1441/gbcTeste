import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Especialidade } from "../models/especialidade.model";

export class Migration1612418290261 implements MigrationInterface {
    name = 'Migration1612418290261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `medicos` (`CRM` varchar(9) NOT NULL, `nomeMedico` varchar(120) NOT NULL, `rua` varchar(120) NOT NULL, `numeroEndereco` varchar(7) NOT NULL, `CEP` varchar(9) NOT NULL, `complementoEndereco` varchar(120) NULL, `dddFixo` varchar(2) NULL, `telefoneFixo` varchar(9) NULL, `dddCelular` varchar(2) NOT NULL, `telefoneCelular` varchar(10) NOT NULL, `isDeleted` tinyint NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT '0', PRIMARY KEY (`CRM`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `medicos_especialidades` (`medicoEspecildadeId` varchar(36) NOT NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT '0', `CRM` varchar(9) NOT NULL, `especilidadeId` varchar(36) NOT NULL, PRIMARY KEY (`medicoEspecildadeId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `especialidades` (`especialidadeId` varchar(36) NOT NULL, `nomeEspecilidade` varchar(120) NOT NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT '0', PRIMARY KEY (`especialidadeId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `medicos_especialidades` ADD CONSTRAINT `FK_1a7bfc558920860d0d40e22a238` FOREIGN KEY (`CRM`) REFERENCES `medicos`(`CRM`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `medicos_especialidades` ADD CONSTRAINT `FK_d87883c36d7145a922b9a125da7` FOREIGN KEY (`especilidadeId`) REFERENCES `especialidades`(`especialidadeId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await getRepository(Especialidade).save({nomeEspecilidade: "ALERGOLOGIA"})
        await getRepository(Especialidade).save({nomeEspecilidade: "ANGIOLOGIA"})
        await getRepository(Especialidade).save({nomeEspecilidade: "BUCO MAXILO"})
        await getRepository(Especialidade).save({nomeEspecilidade: "CARDIOLOGIA CLÍNICA"})
        await getRepository(Especialidade).save({nomeEspecilidade: "CARDIOLOGIA INFANTIL"})
        await getRepository(Especialidade).save({nomeEspecilidade: "CIRURGIA CABEÇA E PESCOÇO"})
        await getRepository(Especialidade).save({nomeEspecilidade: "CIRURGIA CARDÍACA"})
        await getRepository(Especialidade).save({nomeEspecilidade: "CIRURGIA DE TÓRAX"})
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `medicos_especialidades` DROP FOREIGN KEY `FK_d87883c36d7145a922b9a125da7`");
        await queryRunner.query("ALTER TABLE `medicos_especialidades` DROP FOREIGN KEY `FK_1a7bfc558920860d0d40e22a238`");
        await queryRunner.query("DROP TABLE `especialidades`");
        await queryRunner.query("DROP TABLE `medicos_especialidades`");
        await queryRunner.query("DROP TABLE `medicos`");
    }

}
