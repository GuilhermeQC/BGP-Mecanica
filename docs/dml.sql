-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bgp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bgp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bgp` DEFAULT CHARACTER SET utf8 ;
USE `bgp` ;

-- -----------------------------------------------------
-- Table `bgp`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bgp`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bgp`.`os`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bgp`.`os` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(140) NULL,
  `valor` DECIMAL NOT NULL,
  `inicio` DATETIME NOT NULL,
  `fim` DATETIME NOT NULL,
  `pessoa_id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `pessoa_id`),
  INDEX `fk_servico_pessoa1_idx` (`pessoa_id` ASC),
  CONSTRAINT `fk_servico_pessoa1`
    FOREIGN KEY (`pessoa_id`)
    REFERENCES `bgp`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bgp`.`estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bgp`.`estoque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `data_aquisicao` VARCHAR(45) NOT NULL,
  `valor_unitario` VARCHAR(45) NOT NULL,
  `quantidade` DECIMAL NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bgp`.`peca_servico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bgp`.`peca_servico` (
  `peca_servicocol` VARCHAR(45) NOT NULL,
  `servico_id` INT NOT NULL,
  `peca_id` INT NOT NULL,
  `quantidade` DECIMAL NOT NULL,
  INDEX `fk_servico_has_peca_peca1_idx` (`peca_id` ASC),
  INDEX `fk_servico_has_peca_servico1_idx` (`servico_id` ASC),
  PRIMARY KEY (`peca_servicocol`),
  CONSTRAINT `fk_servico_has_peca_servico1`
    FOREIGN KEY (`servico_id`)
    REFERENCES `bgp`.`os` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servico_has_peca_peca1`
    FOREIGN KEY (`peca_id`)
    REFERENCES `bgp`.`estoque` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
