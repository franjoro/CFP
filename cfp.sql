-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2021 a las 21:58:05
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cfp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo_empresa_curso`
--

CREATE TABLE `archivo_empresa_curso` (
  `ID` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Role` int(11) NOT NULL,
  `Time` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `id_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_actividad_economica`
--

CREATE TABLE `tb_actividad_economica` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_actividad_economica`
--

INSERT INTO `tb_actividad_economica` (`id`, `Nombre`) VALUES
(1, 'AGRICULTURA, GANADERÍA, SILVICULTURA Y PESCA '),
(3, 'EXPLOTACIÓN DE MINAS Y CANTERAS '),
(4, 'INDUSTRIAS MANUFACTURERAS '),
(5, 'SUMINISTROS DE ELECTRICIDAD, GAS, VAPOR Y AIRE ACONDICIONADO '),
(6, 'SUMINISTRO DE AGUA Y ALCANTARILLADO, GESTIÓN DE DESECHOS Y ACTIVIDADES DE SANEAMIENTO\r\n'),
(7, 'CONSTRUCCIÓN '),
(8, 'COMERCIO AL POR MAYOR Y AL POR MENOR; REPARACIÓN DE VEHÍCULOS AUTOMOTORES Y MOTOCICLETAS\r\n'),
(9, 'TRANSPORTE Y ALMACENAMIENTO '),
(10, 'ALOJAMIENTO Y SERVICIOS DE COMIDA '),
(11, 'INFORMACIÓN Y COMUNICACIÓN '),
(12, 'ACTIVIDADES FINANCIERAS Y DE SEGUROS '),
(13, 'ACTIVIDADES INMOBILIARIAS '),
(14, 'ACTIVIDADES DE SERVICIOS PROFESIONALES, CIENTÍFICOS Y TÉCNICOS'),
(15, 'ACTIVIDADES ADMINISTRATIVAS Y SERVICIOS DE APOYO '),
(16, 'ADMINISTRACIÓN PÚBLICA Y DEFENSA; PLANES DE SEGURIDAD SOCIAL DE AFILIACIÓN OBLIGATORIA\r\n'),
(17, 'ENSEÑANZA '),
(18, 'SERVICIOS SOCIALES Y RELACIONADO CON LA SALUD HUMANA '),
(19, 'ARTE, ESPARCIMIENTO Y OCIO '),
(20, 'ACTIVIDADES DE SERVICIOS NCP '),
(21, 'ACTIVIDADES DE LOS HOGARES EN CALIDAD DE EMPLEADORES, ACTIVIDADES INDIFERENCIADAS DE PRODUCCIÓN DE BIENES Y SERVICIOS DE LOS HOGARES PARA USO PROPIO\r\n'),
(22, 'ACTIVIDADES DE ORGANIZACIONES Y ÓRGANOS EXTRATERRITORIALES ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_categoria_instructores`
--

CREATE TABLE `tb_categoria_instructores` (
  `id` int(11) NOT NULL,
  `Categoria` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_categoria_instructores`
--

INSERT INTO `tb_categoria_instructores` (`id`, `Categoria`) VALUES
(1, 'Escuela de idiomas'),
(2, 'Mecanica General');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cursos`
--

CREATE TABLE `tb_cursos` (
  `Codigo_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Date_inicio` date NOT NULL,
  `Date_fin` date NOT NULL,
  `Agrupacion` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Orden` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Horario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `CostoAlumno` decimal(15,2) NOT NULL,
  `Factura` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Modalidad` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `id_modalidad` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Documento` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `id_documento` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Estado` int(11) NOT NULL,
  `id_instructor` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_programa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_cursos`
--

INSERT INTO `tb_cursos` (`Codigo_curso`, `Nombre`, `Date_inicio`, `Date_fin`, `Agrupacion`, `Orden`, `Horario`, `CostoAlumno`, `Factura`, `Modalidad`, `id_modalidad`, `Documento`, `id_documento`, `Estado`, `id_instructor`, `id_programa`) VALUES
('ITR-FCOO-50', 'Microsoft Excel Básico Online', '2021-02-20', '2021-03-20', '950133794- 950133837', '', 'S 8:00 am a 12:00 md', '42.47', '', 'Licitación', '-', 'Contrato', '-', 1, '16', 29),
('ITR-FCOO-51', 'Microsoft Excel Básico Online', '2021-02-20', '2021-03-20', '950133794- 950133837', '', 'S 8:00 am a 12:00 md', '42.47', '', 'Licitación', '-', 'Contrato', '-', 1, '16', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_empresa`
--

CREATE TABLE `tb_empresa` (
  `id_empresa` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Direccion` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Actividad_eco` int(11) DEFAULT NULL,
  `Tel` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `NIT` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Aportacion_insaforp` decimal(15,2) DEFAULT NULL,
  `Num_Patronal` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Num_Empleados` int(11) DEFAULT NULL,
  `Estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_empresa`
--

INSERT INTO `tb_empresa` (`id_empresa`, `Nombre`, `Direccion`, `Actividad_eco`, `Tel`, `NIT`, `Aportacion_insaforp`, `Num_Patronal`, `Num_Empleados`, `Estado`) VALUES
(335, 'Compañía de Telecomunicaciones de El Salvador, S.A. de C.V.', 'Colonia Roma, Cl. El Progreso y Avenida Liverpool, Complejo Roma Edif. A, San Salvador.\r\n', 5, '2250-3389', '0614-180898-164-8', '1500.00', '10000.00', 14, 1),
(339, 'Otro', NULL, NULL, NULL, '05457-56445-45466', '1250.20', '123456.00', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_empresa_contact`
--

CREATE TABLE `tb_empresa_contact` (
  `id_contacto` int(11) NOT NULL,
  `Nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Telefono` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Celular` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Puesto` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Email` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_instructor`
--

CREATE TABLE `tb_instructor` (
  `DUI` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `NIT` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Telefono` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Estado` int(11) NOT NULL DEFAULT 1,
  `Categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_instructor`
--

INSERT INTO `tb_instructor` (`DUI`, `NIT`, `Nombre`, `Email`, `Telefono`, `Estado`, `Categoria`) VALUES
('0575', '12345646879', 'INSTRUCTOR EJEMPLOO', 'franklin_lopez@ricaldone.edu.sv', '78363690', 1, 2),
('05756113-8', '0614-180898-123-1', 'Ilvin Daniel Lķpez', 'daniel_lopez@ricaldone.edu.sv', '7036-0724', 1, 2),
('10', '', 'Maura Guadalupe Del Cid Magaņa', 'mdm011009@outlook.com', '7862-2512\r', 1, 1),
('11', '', 'Juan Miguel Bran Mejía', 'juan_bran@ricaldone.edu.sv', '7496-6904', 1, 1),
('12', '', 'Marco Antonio Andrade', 'marco_andrade@ricaldone.edu.sv', '7741-3711', 1, 2),
('13', '', 'Franklin Ricardo Centeno', 'franklincenteno@outlook.es', '7583-6955', 1, 1),
('14', '', 'Hernán Alvarado Benítez', 'hernan_alvarado@ricaldone.edu.sv', '7855-5910', 1, 1),
('15', '', 'Francisco Javier Soriano', 'sorianofj@gmail.com', '6198-9951', 1, 1),
('16', '', 'Margarita Lizbeth Hernández Alegría', 'margarita_hernandez@ricaldone.edu.sv', '7729-7658', 1, 2),
('17', '', 'Mayra Cristina Lovato de Portillo', 'mayra_lovato@ricaldone.edu.sv', '7662-1648', 1, 1),
('18', '', 'Raúl Armando Bermúdez', 'raul_bermudez@ricaldone.edu.sv', '7683-9708', 1, 1),
('19', '', 'Roxana Beatriz Castillo', 'rbcc1971@gmail.com', '7870-7858', 1, 1),
('2', '', 'Karen Yasmin Flores', 'karen_flores@ricaldone.edu.sv', '7683-1637', 1, 1),
('20', '', 'Alonso Orlando Henríquez Domínguez', 'alonso_herniquez@ricaldone.edu.sv', '7841-3116', 1, 1),
('21', '', 'Carlos Alfredo Fuentes Alas', 'carlos_fuentes@ricaldone.edu.sv', '7810-4319', 1, 1),
('22', '', 'Irma Carballo de Canjura', 'irma_carballo@ricaldone.edu.sv', '78870156', 1, 2),
('23', '', 'José Andrés Márquez Pacas', 'jose_marquez@ricaldone.edu.sv', '7646-6855', 1, 1),
('24', '', 'Karla Patricia Campos Portillo', 'karla_campos@ricaldone.edu.sv', '7180-7146', 1, 1),
('25', '', 'Laura Yamileth Bolaņos de Medina', 'laura_medina@ricaldone.edu.sv', '7973-2498', 1, 1),
('26', '', 'Rudy Alberto Flores Rodríguez', 'rudy_flores@ricaldone.edu.sv', '7851-0946', 1, 1),
('27', '', 'Ruth Floridalma Lara Meléndez', 'ruth_lara@ricaldone.edu.sv', '7958-5689', 1, 1),
('28', '', 'Jonathan Alexander Solís Morales', 'jonathan_solis@ricaldone.edu.sv', '78410557', 1, 1),
('29', '', 'Rubén Alfonso Pérez Navarro', 'ruben_perez@ricaldone.edu.sv', '77671804', 1, 1),
('3', '', 'Rodrigo José Rodríguez', 'rodrigo_rodriguez@ricaldone.edu.sv', '7928-6129', 1, 1),
('30', '', 'Julia Marleni Zarceņo Interiano', 'julia_zarceno@ricaldone.edu.sv', '7678-9866', 1, 1),
('31', '', 'Gertrudis Patricia Avilés de Morán', 'patricia_aviles@ricaldone.edu.sv', '7874-5276', 1, 1),
('32', '', 'Guillermo Ernesto Abarca', 'guillermo_abarca@ricaldone.edu.sv', '7192-4246', 1, 1),
('33', '', 'Nubia Jacqueline Bautista de Rubio', 'nubia1504@gmail.com', '7815-1200', 1, 1),
('34', '', 'Ķscar Vladimir Lķpez', 'oscarlopezcp@gmail.com', '7091-7783', 1, 1),
('35', '', 'Julio Ventura', 'imagencorp2210@gmail.com', '7469-6722', 1, 1),
('36', '', 'Mauricio Ernesto Torres Solķrzano', 'mauricioernestotorressolorzano@gmail.com', '6190-5139\r', 1, 1),
('37', '', 'Oscar Emilio Castellanos Herrera', 'oscar_castellanos@ricaldone.edu.sv', '7822-3004\r', 1, 1),
('38', '', 'Medardo Antonio Sanchez Saravia', 'medardo_sanchez@ricaldone.edu.sv', '7800-5085', 1, 1),
('39', '', 'José Oscar Cárcamo', 'jose_carcamo@ricaldone.edu.sv', '78875877', 1, 1),
('4', '', 'Vicente de Jesús Escobar Mozo', 'vicente_escobar@ricaldone.edu.sv', '7014-1278', 1, 1),
('40', '', 'Javier Neftali Jimenez', 'javierjim21@gmail.com', '7418-6932', 1, 1),
('41', '', 'Reina Margarita Cabrera de Ávalos', 'reina_cabrera@ricaldone.edu.sv', '7730-5393', 1, 1),
('42', '', 'Ramķn Rafael Váldez', 'valdiviadiez@gmail.com', '7345-3165', 1, 1),
('43', '', 'Ana Guadalupe Guzmán Hernández', 'anaguzher@gmail.com', '7755-4241', 1, 1),
('44', '', 'Ana Yensy Ortega Abarca', 'ana_ortega@ricaldone.edu.sv', '7802-2547', 1, 1),
('45', '', 'Bessy Guadalupe Siciliano Peņate', 'bessy_siciliano@ricaldone.edu.sv', '7051-8579', 1, 1),
('46', '', 'Edgar Wilfredo Ayala Alas', 'wilfredo_ayala@ricaldone.edu.sv', '7968-8103', 1, 1),
('47', '', 'Elías Alexander Marroquín Ardķn', 'alexandermarroquin01@gmail.com', '7832-1461', 1, 1),
('48', '', 'Francisco Marcelo Pereira Hernández', 'fmarcelopereira@gmail.com', '7272-5347', 1, 1),
('49', '', 'Gilberto Alexander Motto García', 'gmotto2015@gmail.com', '7870-0903', 1, 1),
('5', '', 'Roberto Edmundo Cabrera Guillén', 'roberto_cabrera@ricaldone.edu.sv', '7308-4190\r', 1, 1),
('50', '', 'Harold Herbert Henríquez Hurtado', 'harold.herbert2@hotmail.com', '7887-6574', 1, 1),
('51', '', 'Joaquin Antonio Cerna Peņa', 'joaquin.cerna@grupojcarquitectos.com', '7003-9660', 1, 1),
('52', '', 'Julio Ricardo Campos Bonilla', 'juliocamposb@gmail.com', '7672-8402', 1, 1),
('53', '', 'Marco Antonio Andrade Guerrero', 'tecmarcoantonio@gmail.com', '7741-3711', 1, 1),
('54', '', 'Nelson Alberto Miranda Alas', 'nm.nelsonmiranda@gmail.com', '7740-7371', 1, 1),
('55', '', 'Odilia Antonia González De Carrillo', 'odisalon@hotmail.com', '7696-4610', 1, 1),
('56', '', 'Victor Anibal Hernández Reyes', 'anibalreyes2000@gmail.com', '7110-1514', 1, 1),
('57', '', 'Vladimir Arturo Carrillo Calderķn', 'vladimircarrillocalderon@gmail.com', '7937-3315', 1, 1),
('58', '', 'Wilfredo Alexander Melgar Lķpez', 'melgar.wilfredo@gmail.com', '7976-3213', 1, 1),
('59', '', 'José Enrique Lķpez Martínez', 'enriquegraficos@gmail.com', '7510-6166', 1, 1),
('6', '', 'Marcos Orlando Rosa', 'marcos_rosa@ricaldone.edu.sv', '7459-9629', 1, 1),
('60', '', 'José Alfredo Flores Franco', 'alfredofranco503@gmail.com', '7909-0900', 1, 1),
('61', '', 'David Isaac Ramirez Zometa', 'david_ramirez@ricaldone.edu.sv', '7856-0895', 1, 1),
('62', '', 'William Ernesto Lķpez Herrera', 'welopez_0406@hotmail.com', '7746-2499', 1, 1),
('63', '', 'Oscar Emilio Castellanos Herrera', 'oscar_castellanos@ricaldone.edu.sv', '7822-3004', 1, 1),
('64', '', 'Roxana Beatriz Castillo', 'rbcc1971@gmail.com', '7870-7858', 1, 1),
('65', '', 'Ada Guadalupe Arias Hernández', 'ada_arias@ricaldone.edu.sv', '7924-7351', 1, 1),
('66', '', 'Balmore Nicolas Ramírez Pérez', 'balmore_ramirez@ricaldone.edu.sv', '7480-1748', 1, 1),
('67', '', 'Briselda del Carmen Lķpez Martínez', 'briselda_lopez@ricaldone.edu.sv', '7005-4230', 1, 1),
('68', '', 'Diana Julissa Moreno Mejía', 'diana_moreno@ricaldone.edu.sv', '7933-2902', 1, 1),
('69', '', 'Gabriela Maribel Alvarado de Figueroa', 'gabriela_alvarado@ricaldone.edu.sv', '7436-0666', 1, 1),
('7', '', 'José Luis Hernández Ayala', 'luis_hernandez@ricaldone.edu.sv', '7159-1643\r', 1, 1),
('70', '', 'Gertrudis Patricia Avilés de Morán', 'patricia_aviles@ricaldone.edu.sv', '7874-5276', 1, 1),
('71', '', 'Jacqueline Lisseth Pérez Lķpez', 'jackeline_perez@ricaldone.edu.sv', '7959-6336', 1, 1),
('72', '', 'Josselin Haydeé Miranda Alvarado', 'josselin_miranda@ricaldone.edu.sv', '7501-0412', 1, 1),
('73', '', 'Juan José Bonilla', 'juan_bonilla@ricaldone.edu.sv', '7337-2534', 1, 1),
('74', '', 'Juan Jose Santamaría Palacios', 'juan_santamaria@ricaldone.edu.sv', '7212-8512', 1, 1),
('75', '', 'Katherine Vanessa Lķpez de Beltrán', 'katherine_lopez@ricaldone.edu.sv', '6109-3452', 1, 1),
('76', '', 'Katherinne Alejandra Morán Del Cid', 'katherinne_moran@ricaldone.edu.sv', '7840-6229', 1, 1),
('77', '', 'Laura Yamileth Bolaņos de Medina', 'laura_medina@ricaldone.edu.sv', '7973-2498', 1, 1),
('78', '', 'Liliana Beatriz Guardado Constanza', 'liliana_guardado@ricaldone.edu.sv', '7498-6320', 1, 1),
('79', '', 'Melvin Rony Campos Rodríguez', 'melvin_campos@ricaldone.edu.sv', '7777-3082', 1, 1),
('8', '', 'Juan Balmore Henríquez', 'juan_henriquez@ricaldone.edu.sv', '7886-4830', 1, 1),
('80', '', 'Patricia Guadalupe Arias de Cruz', 'patricia_arias@ricaldone.edu.sv', '7747-4704', 1, 1),
('81', '', 'Patricia Haydeé Lemus de Chávez', 'patricia_lemus@ricaldone.edu.sv', '7497-5228', 1, 1),
('82', '', 'Reynaldo Daniel Elías Granados', 'reynaldo_elias@ricaldone.edu.sv', '7393-1722', 1, 1),
('83', '', 'Tania Vanessa Escobar Fortis', 'tania_escobar@ricaldone.edu.sv', '7185-1777', 1, 1),
('84', '', 'Ulises Antonio Méndez Méndez', 'ulises_mendez@ricaldone.edu.sv', '7953-9913', 1, 1),
('85', '', 'Katherine Alejandra González Alvarado', 'katherine_alvarado@ricaldone.edu.sv', '7652-2608', 1, 1),
('86', '', 'Zulma Guadalupe Ayala de Cines', 'zulma_ayala@ricaldone.edu.sv', '7124-3820', 1, 1),
('87', '', 'Jonathan Alexander Solís Morales', 'jonathan_solis@ricaldone.edu.sv', '7841-0557', 1, 1),
('88', '', 'Irma Carballo de Canjura', 'irma_carballo@ricaldone.edu.sv', '7887-0156', 1, 1),
('9', '', 'Wilfredo Alexander Melgar', 'melgar.wilfredo@gmail.com', '7976-3213', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_logs`
--

CREATE TABLE `tb_logs` (
  `id_log` int(11) NOT NULL,
  `Action` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `id_user` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Time` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_participante`
--

CREATE TABLE `tb_participante` (
  `DUI` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Telefono` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Genero` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `NIT` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `ISSS` varchar(35) COLLATE utf8_spanish_ci NOT NULL,
  `FechaNac` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_participante`
--

INSERT INTO `tb_participante` (`DUI`, `Nombre`, `Telefono`, `Email`, `Genero`, `NIT`, `ISSS`, `FechaNac`) VALUES
('05756113-8', 'Franklin Alejandro López Ramírez', '2278-0457', 'fral_98@outlook.com', 'Hombre', '', '', ''),
('1', 'Jennifer Tatiana Menjivar Guerra', '-', 'jennifer.menjivar@vi', 'Hombre', '', '', ''),
('10', 'Glenda Xiomara Castro Canales', '-', 'glenda.castro@tigo.c', 'Hombre', '', '', ''),
('11', 'Jian Carlo Guzmán Ramírez', '-', 'jian.guzman@cr.tigo.', 'Hombre', '', '', ''),
('12', 'Oscar Alejandro Medina Calderķn', '-', 'oscar.medina@cr.tigo', 'Hombre', '', '', ''),
('13', 'Wendy Carolina Rivera Reyes', '-', 'wendy.rivera@cr.tigo', 'Mujer', '', '', ''),
('14', 'Julia Regina Wer Cabrera Novales', '-', 'julia.cabrera@fonavi', 'Hombre', '', '', ''),
('15', 'Saúl Antonio Floes Guardado', '-', 'saul.flores@fonavipo', 'Hombre', '', '', ''),
('16', 'Ernesto Antonio Quintanilla Iraheta', '-', 'ernesto.quintanilla@', 'Hombre', '', '', ''),
('17', 'Sara Beatriz Cuéllar Hernández', '-', 'sarita.cuellar23@gma', 'Hombre', '', '', ''),
('18', 'Sandra Elizabeth Campos de Lķpez', '-', 'sandra.campos@sv.inf', 'Hombre', '', '', ''),
('19', 'Elida Alejandra Murillo Durán', '-', 'elidamurillo369@gmai', 'Hombre', '', '', ''),
('2', 'José Antonio Zaldaņa Tiznado', '-', 'jose.tiznado@vidri.c', 'Hombre', '', '', ''),
('20', 'Jonathan Francisco Lķpez Molina', '-', 'Jonimolina78@gmail.c', 'Hombre', '', '', ''),
('21', 'William Alfredo Santamaría Orellana', '-', 'wilsantamaria.asc@gm', 'Hombre', '', '', ''),
('22', 'Daniel Enrique Guevara Hernández', '-', 'degh2186@gmail.com', 'Hombre', '', '', ''),
('3', 'Salvador Heriberto Quintanilla Orellana', '-', 'salquin201529@gmail.', 'Hombre', '', '', ''),
('4', 'Miguel Ángel Jarquín Blanco', '-', 'miguel_jarquin@rical', 'Hombre', '', '', ''),
('5', 'Diego Enrique García Orellana', '-', 'diego37314@yahoo.com', 'Hombre', '', '', ''),
('6', 'Melvin Renato Santos Guzmán', '-', 'omerino@cbc.co', 'Hombre', '', '', ''),
('7', 'Jeancarlo Antonio Marroquín', '-', 'Jeanmarroquin479@gma', 'Hombre', '', '', ''),
('8', 'Alexander Alfredo Cruz García', '-', 'ac7825130@gmail.com', 'Hombre', '', '', ''),
('9', 'Carlos Alberto Aguirre Bautista', '-', 'Carlos14bautista31@g', 'Hombre', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_programa`
--

CREATE TABLE `tb_programa` (
  `id_programa` int(11) NOT NULL,
  `Nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `ImgPortada` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_programa`
--

INSERT INTO `tb_programa` (`id_programa`, `Nombre`, `ImgPortada`, `Estado`) VALUES
(28, 'Proyecto Especial', '1611934869304_INSAFORP TRASNPARENTE Y RESPLANDOR.png', 1),
(29, 'AT- Ofimática', '1611934877770_LOGO AT - resplandor.png', 1),
(30, 'Inglés para el trabajo', '1611934886035_INGLÉS PARA EL TRABAJO_TRANSPARENTE.png', 1),
(31, 'Formación en el idioma inglés', '1611934896676_fi.jpeg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_solicitud_matricula`
--

CREATE TABLE `tb_solicitud_matricula` (
  `code` int(11) NOT NULL,
  `id_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id_usuario` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `Role` int(11) NOT NULL,
  `Estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id_usuario`, `Nombre`, `Email`, `Password`, `Role`, `Estado`) VALUES
('franklin_lopez', 'Franklin Alejandro López Ramírez', 'franklin_lopez@ricaldone.edu.sv', '$2b$10$jiwslBFJ9MUDJofdfx695uVz73dpkO6OM0MepEeq/ayGOfXS6cjpy', 1, 1),
('gloria_perez', 'Gloria Haydeé Perez Navarrete', 'gloria_perez@ricaldone.edu.sv', '$2b$10$P3J05RvHNpkaS3XADuFWSuIqbHVLjXLOXS.H1NRFvLRmDCWQU7nBG', 0, 1),
('god', 'god', 'god@god.com', '$2b$10$BqYxZpWHgz1ArmwHveJueu4O/LTYYHzamPfKMsDgES2lQGpepC.nO', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `union_curso_empresa`
--

CREATE TABLE `union_curso_empresa` (
  `id_union` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `union_curso_empresa`
--

INSERT INTO `union_curso_empresa` (`id_union`, `id_empresa`, `id_curso`) VALUES
(20, 335, 'ITR-FCOO-50'),
(22, 335, 'ITR-FCOO-51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `union_matricula`
--

CREATE TABLE `union_matricula` (
  `id_matricula` int(11) NOT NULL,
  `id_participante` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `id_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_solicitud` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `union_matricula`
--

INSERT INTO `union_matricula` (`id_matricula`, `id_participante`, `id_curso`, `id_empresa`, `id_solicitud`) VALUES
(17, '1', 'ITR-FCOO-51', 335, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `union_programa_usuario`
--

CREATE TABLE `union_programa_usuario` (
  `id_union` int(11) NOT NULL,
  `id_usuario` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `id_programa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo_empresa_curso`
--
ALTER TABLE `archivo_empresa_curso`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `archivo_empresa_curso_ibfk_1` (`id_empresa`);

--
-- Indices de la tabla `tb_actividad_economica`
--
ALTER TABLE `tb_actividad_economica`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_categoria_instructores`
--
ALTER TABLE `tb_categoria_instructores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_cursos`
--
ALTER TABLE `tb_cursos`
  ADD PRIMARY KEY (`Codigo_curso`),
  ADD KEY `id_instructor` (`id_instructor`),
  ADD KEY `id_programa` (`id_programa`);

--
-- Indices de la tabla `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD KEY `Estado` (`Estado`),
  ADD KEY `Actividad_eco` (`Actividad_eco`);

--
-- Indices de la tabla `tb_empresa_contact`
--
ALTER TABLE `tb_empresa_contact`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indices de la tabla `tb_instructor`
--
ALTER TABLE `tb_instructor`
  ADD PRIMARY KEY (`DUI`),
  ADD KEY `Estado` (`Estado`),
  ADD KEY `Categoria` (`Categoria`);

--
-- Indices de la tabla `tb_logs`
--
ALTER TABLE `tb_logs`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `tb_participante`
--
ALTER TABLE `tb_participante`
  ADD PRIMARY KEY (`DUI`);

--
-- Indices de la tabla `tb_programa`
--
ALTER TABLE `tb_programa`
  ADD PRIMARY KEY (`id_programa`);

--
-- Indices de la tabla `tb_solicitud_matricula`
--
ALTER TABLE `tb_solicitud_matricula`
  ADD PRIMARY KEY (`code`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `union_curso_empresa`
--
ALTER TABLE `union_curso_empresa`
  ADD PRIMARY KEY (`id_union`),
  ADD KEY `union_curso_empresa_ibfk_1` (`id_empresa`),
  ADD KEY `union_curso_empresa_ibfk_2` (`id_curso`);

--
-- Indices de la tabla `union_matricula`
--
ALTER TABLE `union_matricula`
  ADD PRIMARY KEY (`id_matricula`),
  ADD KEY `id_participante` (`id_participante`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_empresa` (`id_empresa`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `union_programa_usuario`
--
ALTER TABLE `union_programa_usuario`
  ADD PRIMARY KEY (`id_union`),
  ADD KEY `id_programa` (`id_programa`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_actividad_economica`
--
ALTER TABLE `tb_actividad_economica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tb_categoria_instructores`
--
ALTER TABLE `tb_categoria_instructores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_empresa`
--
ALTER TABLE `tb_empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=340;

--
-- AUTO_INCREMENT de la tabla `tb_empresa_contact`
--
ALTER TABLE `tb_empresa_contact`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_logs`
--
ALTER TABLE `tb_logs`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_programa`
--
ALTER TABLE `tb_programa`
  MODIFY `id_programa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `tb_solicitud_matricula`
--
ALTER TABLE `tb_solicitud_matricula`
  MODIFY `code` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `union_curso_empresa`
--
ALTER TABLE `union_curso_empresa`
  MODIFY `id_union` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `union_matricula`
--
ALTER TABLE `union_matricula`
  MODIFY `id_matricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `union_programa_usuario`
--
ALTER TABLE `union_programa_usuario`
  MODIFY `id_union` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo_empresa_curso`
--
ALTER TABLE `archivo_empresa_curso`
  ADD CONSTRAINT `archivo_empresa_curso_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `archivo_empresa_curso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `tb_cursos` (`Codigo_curso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_cursos`
--
ALTER TABLE `tb_cursos`
  ADD CONSTRAINT `tb_cursos_ibfk_1` FOREIGN KEY (`id_instructor`) REFERENCES `tb_instructor` (`DUI`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `tb_cursos_ibfk_2` FOREIGN KEY (`id_programa`) REFERENCES `tb_programa` (`id_programa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD CONSTRAINT `tb_empresa_ibfk_1` FOREIGN KEY (`Actividad_eco`) REFERENCES `tb_actividad_economica` (`id`);

--
-- Filtros para la tabla `tb_empresa_contact`
--
ALTER TABLE `tb_empresa_contact`
  ADD CONSTRAINT `tb_empresa_contact_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_instructor`
--
ALTER TABLE `tb_instructor`
  ADD CONSTRAINT `tb_instructor_ibfk_1` FOREIGN KEY (`Categoria`) REFERENCES `tb_categoria_instructores` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `tb_logs`
--
ALTER TABLE `tb_logs`
  ADD CONSTRAINT `tb_logs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_solicitud_matricula`
--
ALTER TABLE `tb_solicitud_matricula`
  ADD CONSTRAINT `tb_solicitud_matricula_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `tb_cursos` (`Codigo_curso`),
  ADD CONSTRAINT `tb_solicitud_matricula_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`);

--
-- Filtros para la tabla `union_curso_empresa`
--
ALTER TABLE `union_curso_empresa`
  ADD CONSTRAINT `union_curso_empresa_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `union_curso_empresa_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `tb_cursos` (`Codigo_curso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `union_matricula`
--
ALTER TABLE `union_matricula`
  ADD CONSTRAINT `union_matricula_ibfk_1` FOREIGN KEY (`id_participante`) REFERENCES `tb_participante` (`DUI`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `union_matricula_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `tb_cursos` (`Codigo_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `union_matricula_ibfk_3` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `union_matricula_ibfk_4` FOREIGN KEY (`id_solicitud`) REFERENCES `tb_solicitud_matricula` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `union_programa_usuario`
--
ALTER TABLE `union_programa_usuario`
  ADD CONSTRAINT `union_programa_usuario_ibfk_1` FOREIGN KEY (`id_programa`) REFERENCES `tb_programa` (`id_programa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `union_programa_usuario_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
