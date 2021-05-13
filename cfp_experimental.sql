-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2021 a las 16:57:53
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cfp_experimental`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo_empresa_curso`
--

CREATE TABLE `archivo_empresa_curso` (
  `id` int(11) NOT NULL,
  `s3key` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Role` int(11) NOT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `id_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `isEditable` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `archivo_empresa_curso`
--

INSERT INTO `archivo_empresa_curso` (`id`, `s3key`, `Role`, `id_empresa`, `id_curso`, `isEditable`) VALUES
(123, 'app/empresas/27/1620072591388.pdf', 0, 28, '1620751003659', 0),
(124, 'app/empresas/28/1620832827784.txt', 0, 28, '1620751003659', 0),
(126, 'app/empresas/28/1620833946239.docx', 0, 28, '1620751003659', 0),
(127, 'app/empresas/28/1620834661260.pdf', 0, 28, '1620751003659', 0),
(128, 'app/empresas/28/1620835940640.pdf', 0, 28, '1620751003659', 0),
(129, 'app/empresas/28/1620836489226.pdf', 0, 28, '1620751003659', 0),
(130, 'app/empresas/28/1620836497452.pdf', 0, 28, '1620751003659', 0),
(131, 'app/empresas/28/1620837150751.pdf', 0, 28, '1620751003659', 0),
(132, 'app/empresas/28/1620837157248.pdf', 0, 28, '1620751003659', 0),
(134, 'app/empresas/28/1620841934853.pdf', 0, 28, '1620751003659', 0),
(141, 'app/empresas/28/1620849457355.pdf', 0, 28, '1620751003659', 0),
(143, 'app/empresas/28/1620849467853.pdf', 0, 28, '1620751003659', 0),
(145, 'app/empresas/28/1620852509855.pdf', 6, 28, '1620751003659', 0);

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
  `Date_inicio` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Date_fin` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Agrupacion` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Orden` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Horario` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Fechas` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `CostoAlumno` decimal(15,2) DEFAULT NULL,
  `Factura` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Modalidad` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_modalidad` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Documento` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_documento` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Estado` int(11) DEFAULT NULL,
  `id_instructor` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_programa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_cursos`
--

INSERT INTO `tb_cursos` (`Codigo_curso`, `Nombre`, `Date_inicio`, `Date_fin`, `Agrupacion`, `Orden`, `Horario`, `Fechas`, `CostoAlumno`, `Factura`, `Modalidad`, `id_modalidad`, `Documento`, `id_documento`, `Estado`, `id_instructor`, `id_programa`) VALUES
('1620747653311', 'piezas graficas', '20-10-151', '10-10-4989', NULL, NULL, 'De xd ', NULL, '4.50', NULL, NULL, NULL, NULL, NULL, 15, NULL, 28),
('1620749187909', 'SOLDADURA A GAS Y ARCO METÁLICO – MIG/MAG', '20-10-151', '10-10-4989', NULL, NULL, 'De xd ', NULL, '4.50', NULL, NULL, NULL, NULL, NULL, 15, NULL, 28),
('1620749712196', 'piezas graficas', '20-10-151', '10-10-4989', NULL, NULL, 'De xd ', NULL, '4.50', NULL, NULL, NULL, NULL, NULL, 15, NULL, 28),
('1620750045807', 'SOLDADURA A GAS Y ARCO METÁLICO – MIG/MAG', '11-05-2021', '11-05-2021', NULL, NULL, 'De xd ', NULL, '465.00', NULL, NULL, NULL, NULL, NULL, 15, NULL, 28),
('1620751003659', 'Ofimatica', '2021-05-11', '11-05-2021', NULL, NULL, 'de', 'sabado', '465.00', NULL, NULL, NULL, NULL, NULL, 5, NULL, 29),
('PRUEBA1xd', 'Ofimatica', '2021-05-22', '2021-06-19', '-', '-', 'de', 'sabado', '45.00', '-', 'Licitación', '-', 'Orden', '-', 1, '4', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ec_alumno`
--

CREATE TABLE `tb_ec_alumno` (
  `id` int(11) NOT NULL,
  `carnet` varchar(20) NOT NULL,
  `id_grupo` int(11) DEFAULT NULL,
  `json1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`json1`)),
  `json2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`json2`)),
  `json3` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`json3`)),
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_ec_alumno`
--

INSERT INTO `tb_ec_alumno` (`id`, `carnet`, `id_grupo`, `json1`, `json2`, `json3`, `timestamp`) VALUES
(12, ' FSAH ', 2, '{\"Carnet\":\"FSAH\",\"Carrera\":\"1\",\"Grupo\":\"2\",\"Nombres\":\"fátima sarai\",\"Apellidos\":\"amata hernández\",\"Sexo\":\"Femenino\",\"EstadoF\":\"Soltero(a)\",\"Trabaja\":\"No Trabaja\",\"LugarTrabajo\":\"\",\"DireccionTrabajo\":\"\",\"Escolaridad\":\"BachCom\",\"CentroDondeEstudio\":\"universidad tecnologica de el salvador utec\",\"Cuota\":\"63.00\",\"ViveCon\":\"Ambos padres\",\"Oficio\":\"estudiante\",\"Religion\":\"Catolico\",\"Sacramentos\":{\"Bautismo\":\"true\",\"Comunion\":\"true\",\"confirmacion\":\"true\"},\"NacDepartamento\":\"San Salvador\",\"NacMunicipio\":\"San Salvador SS\",\"FechaNac\":\"3-10-1999\",\"TelFijoPropio\":\"\",\"TelMovilPropio\":\"7639-0367\",\"PoseeInternet\":\"residencial\",\"CapacidadInternet\":\"1a5mb\",\"EmerNombre\":\"estela hernande lucero\",\"EmerParentesco\":\"Madre\",\"EmerDireccion\":\"URB. CIUDAD FUTURA, FASE II, PSJ. 70, POL 87 CASA #5\",\"EmerDep\":\"San Salvador\",\"EmerMuni\":\"San Salvador SS\",\"EmergenciaTel\":\"\",\"EmergenciaMov\":\"7008-2230\",\"EmergenciaEmail\":\"elucer@didelco.com\"} ', '{\"GrupoFamiliar\":[{\"nombre\":\"estela hernandez lucero\",\"parentesco\":\"MADRE\",\"edad\":\"44\",\"ocupacion\":\"CONTADOR\"},{\"nombre\":\"JOSE LUIS ORTIZ VELIZ\",\"parentesco\":\"PADRE\",\"edad\":\"39\",\"ocupacion\":\"CONTADOR\"},{\"nombre\":\"SANTOS HERNANDEZ\",\"parentesco\":\"ABUELA\",\"edad\":\"68\",\"ocupacion\":\"AMA DE CASA\"},{\"nombre\":\"JACQUELINE AMAYA HERNANDEZ\",\"parentesco\":\"HERMANA\",\"edad\":\"19\",\"ocupacion\":\"ESTUDIANTE\"},{\"nombre\":\"LUIS ERNESTO ORTIZ HERNANDEZ\",\"parentesco\":\"HERMANO\",\"edad\":\"15\",\"ocupacion\":\"ESTUDIANTE\"}],\"EstadoVivienda\":\"FinanciadaSocial\",\"TipoViviendaOtros\":\"\",\"PagoVivienda\":\"125.00\",\"ZonaVivienda\":\"Urbana\",\"ZonasDeRiesgo\":{\"Rios\":\"false\",\"Deslaves\":\"false\",\"Costera\":\"false\",\"Volcanes\":\"false\"},\"ComoSeMoviliza\":\"Bus\",\"PoseeEquipos\":{\"computadora\":\"true\",\"Laptop\":\"false\",\"Tablet\":\"false\",\"Celular\":\"true\"},\"IngresosFamiliares\":[{\"trabajador\":\"ESTELA HERNANDEZ LUCERO\",\"salario\":\"337.50\",\"trabajo\":\"INVERSONES CALMA\",\"cargo\":\"CONTADOR\",\"teltabl\":\"7008-2230\"},{\"trabajador\":\"\",\"salario\":\"\",\"trabajo\":\"\",\"cargo\":\"\",\"teltabl\":\"\"},{\"trabajador\":\"\",\"salario\":\"\",\"trabajo\":\"\",\"cargo\":\"\",\"teltabl\":\"\"},{\"trabajador\":\"\",\"salario\":\"\",\"trabajo\":\"\",\"cargo\":\"\",\"teltabl\":\"\"}],\"totalingreso\":\"337.50\"} ', ' {\"reciberemesas\":\"false\",\"remesacantidad\":\"\",\"cadacuantoreme\":\"\",\"quienremesa\":\"\",\"GastosFamiliares\":{\"alimentacion\":\"80.00\",\"vivienda\":\"125.00\",\"agua\":\"3.50\",\"energia\":\"\",\"cable\":\"25.00\",\"higiene\":\"\",\"celular\":\"\",\"domestico\":\"\",\"cotizaciones\":\"33.75\",\"transporte\":\"20\",\"vigilancia\":\"\",\"salud\":\"\",\"educacion\":\"\"},\"totalgastos\":\"287.25\"} ', '2021-04-29 17:02:14'),
(13, ' HSAM ', 4, '{\"Carnet\":\"HSAM\",\"Carrera\":\"1\",\"Grupo\":\"2\",\"Nombres\":\"HENRY STEVEN\",\"Apellidos\":\"ABARCA MADRID\",\"Sexo\":\"Masculino\",\"EstadoF\":\"Soltero(a)\",\"Trabaja\":\"No Trabaja\",\"LugarTrabajo\":\"\",\"DireccionTrabajo\":\"\",\"Escolaridad\":\"BachCom\",\"CentroDondeEstudio\":\"INSTITUTO NACIONAL ALBERT CAMPUS\",\"Cuota\":\"\",\"ViveCon\":\"Solo Madre\",\"Oficio\":\"\",\"Religion\":\"Cristiano\",\"Sacramentos\":{\"Bautismo\":\"false\",\"Comunion\":\"false\",\"confirmacion\":\"false\"},\"NacDepartamento\":\"San Salvador\",\"NacMunicipio\":\"San Salvador SS\",\"FechaNac\":\"29-04-02\",\"TelFijoPropio\":\"2502-7301\",\"TelMovilPropio\":\"7609-4843\",\"PoseeInternet\":\"residencial\",\"CapacidadInternet\":\"1a5mb\",\"EmerNombre\":\"RITA BARCA\",\"EmerParentesco\":\"Tio(a)\",\"EmerDireccion\":\"COL. BOSQUES DEL RIO, PSJ 2 GRUPO 2 N#28\",\"EmerDep\":\"San Salvador\",\"EmerMuni\":\"Soyapango SS\",\"EmergenciaTel\":\"\",\"EmergenciaMov\":\"7048-3894\",\"EmergenciaEmail\":\"\"} ', '{\"GrupoFamiliar\":[{\"nombre\":\"LUIS ADAN ABARCA\",\"parentesco\":\"HERMANO \",\"edad\":\"15\",\"ocupacion\":\"ESTUDIANTE\"},{\"nombre\":\"REYNA ADAN ABARCA\",\"parentesco\":\"MAMÁ\",\"edad\":\"47\",\"ocupacion\":\"EMPLEADA\"},{\"nombre\":\"\",\"parentesco\":\"\",\"edad\":\"\",\"ocupacion\":\"\"},{\"nombre\":\"\",\"parentesco\":\"\",\"edad\":\"\",\"ocupacion\":\"\"},{\"nombre\":\"\",\"parentesco\":\"\",\"edad\":\"\",\"ocupacion\":\"\"}],\"EstadoVivienda\":\"FinanciadaSocial\",\"TipoViviendaOtros\":\"\",\"PagoVivienda\":\"186.14\",\"ZonaVivienda\":\"Urbana\",\"ZonasDeRiesgo\":{\"Rios\":\"false\",\"Deslaves\":\"true\",\"Costera\":\"false\",\"Volcanes\":\"true\"},\"ComoSeMoviliza\":\"Bus\",\"PoseeEquipos\":{\"computadora\":\"true\",\"Laptop\":\"false\",\"Tablet\":\"false\",\"Celular\":\"false\"},\"IngresosFamiliares\":[{\"trabajador\":\"REYNA VICTORIA MADRID\",\"salario\":\"450.00\",\"trabajo\":\"ALCALDIA AYUTUXTEPEQUE\",\"cargo\":\"ANALISTA \",\"teltabl\":\"2206-3371\"},{\"trabajador\":\"\",\"salario\":\"\",\"trabajo\":\"\",\"cargo\":\"\",\"teltabl\":\"\"},{\"trabajador\":\"\",\"salario\":\"\",\"trabajo\":\"\",\"cargo\":\"\",\"teltabl\":\"\"},{\"trabajador\":\"\",\"salario\":\"\",\"trabajo\":\"\",\"cargo\":\"\",\"teltabl\":\"\"}],\"totalingreso\":\"450.00\"} ', ' {\"reciberemesas\":\"false\",\"remesacantidad\":\"\",\"cadacuantoreme\":\"\",\"quienremesa\":\"\",\"GastosFamiliares\":{\"alimentacion\":\"120.00\",\"vivienda\":\"186.14\",\"agua\":\"10.00\",\"energia\":\"23\",\"cable\":\"\",\"higiene\":\"21.06\",\"celular\":\"6\",\"domestico\":\"\",\"cotizaciones\":\"46.12\",\"transporte\":\"60\",\"vigilancia\":\"6\",\"salud\":\"5.85\",\"educacion\":\"\"},\"totalgastos\":\"484.17\"} ', '2021-04-29 17:31:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ec_carrera`
--

CREATE TABLE `tb_ec_carrera` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_ec_carrera`
--

INSERT INTO `tb_ec_carrera` (`id`, `Nombre`) VALUES
(1, 'Electricista Industrial'),
(2, 'Administrador Técnico de empresas industriales'),
(3, 'Supervisor de producción'),
(4, 'Mecánico Mantenimiento industrial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ec_grupo`
--

CREATE TABLE `tb_ec_grupo` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `id_carrera` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_ec_grupo`
--

INSERT INTO `tb_ec_grupo` (`id`, `Nombre`, `id_carrera`) VALUES
(2, 'Grupo 1 Incremento - Electricista Industrial ', 1),
(4, 'Grupo de prueba', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_empresa`
--

CREATE TABLE `tb_empresa` (
  `id_empresa` int(11) NOT NULL,
  `Nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Direccion` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Actividad_eco` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Tel` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `NIT` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Aportacion_insaforp` decimal(15,2) DEFAULT NULL,
  `Num_Patronal` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Num_Empleados` int(11) DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Estado` int(11) NOT NULL DEFAULT 1,
  `nitkey` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_empresa`
--

INSERT INTO `tb_empresa` (`id_empresa`, `Nombre`, `Direccion`, `Actividad_eco`, `Tel`, `NIT`, `Aportacion_insaforp`, `Num_Patronal`, `Num_Empleados`, `email`, `Estado`, `nitkey`) VALUES
(27, 'EMPRESA FALSA  - Administración Nacional de Acueductos y Alcantarillados', 'Calle Montecarmelo #800, Soyapango, San Salvador.', 'Actividad Económica', '2275-8084', '1234-546578-987-9', '12.32', '132467', 5, 'franklin_lopez@ricaldone.edu.sv', 1, 'app/empresas/27/1616099337401.docx'),
(28, 'empresa falsa', 'Col. Jardines de Cuscatlán Calle L-7 Casa #35', 'Actividad Económica', '2275-8084', '0614-180898-157-8', '1.00', '132467', 150, 'fral_98@outlook.com', 3, 'app/empresas/28/1618330915221.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_empresa_contact`
--

CREATE TABLE `tb_empresa_contact` (
  `id_contacto` int(11) NOT NULL,
  `Nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Telefono` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Celular` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Puesto` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Email` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_empresa` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_empresa_contact`
--

INSERT INTO `tb_empresa_contact` (`id_contacto`, `Nombre`, `Telefono`, `Celular`, `Puesto`, `Email`, `id_empresa`, `status`) VALUES
(27, 'Franklin López', '7836-3690', NULL, NULL, 'franklin_lopez@ricaldone.edu.sv', 27, 0),
(28, 'Responsable a firmar', '', NULL, 'Gerente General', '', 27, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_habil_cursos`
--

CREATE TABLE `tb_habil_cursos` (
  `id` int(11) NOT NULL,
  `Descripcion` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Requisitos` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `S3keyimage` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Modules` longtext COLLATE utf8_spanish_ci DEFAULT NULL,
  `Codigo_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_habil_cursos`
--

INSERT INTO `tb_habil_cursos` (`id`, `Descripcion`, `Requisitos`, `S3keyimage`, `Modules`, `Codigo_curso`) VALUES
(1, 'descripción', 'Requisitos', 'https://cfppruebas.s3.us-east-2.amazonaws.com/app/cursos/1620747653311/portada.png', '<table style=\"border-collapse: collapse; width: 100%; height: 63px;\" border=\"1\">\n<tbody>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 1</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 2</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 3</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n</tbody>\n</table>', '1620747653311'),
(2, 'Al finalizar el curso, las personas participantes serán capaces de soldar diversos \nmateriales a gas y arco metálico- MIG/MAG, mediante la aplicación del procedimiento \ntécnico correspondiente y el manejo hábil y seguro de equipos, herramientas y \nmateriales.', '- Poseer experiencia laboral en soldadura o haber \nrecibido formación en soldadura general.\n- Tener 16 o más años de edad.', 'https://cfppruebas.s3.us-east-2.amazonaws.com/app/cursos/1620749187909/portada.png', '<p>1. Concepto de soldadura MIG/MAG y su diferencia.</p>\n<p>2. Aplicaciones de la soldadura MAG y MIG.</p>\n<p>3. Equipos y consumibles requeridos.</p>\n<p>4. Accesorios y herramientas.</p>\n<p>5. Elementos de protecci&oacute;n requeridos.</p>\n<p>6. Normas de seguridad al soldar.</p>\n<p>7. Condiciones que debe reunir el &aacute;rea de trabajo.</p>\n<p>8. Factores que influyen en la soldadura. o Polaridad de corriente. o Gas de protecci&oacute;n. o Intensidad de corriente. o Tensi&oacute;n de corriente.</p>\n<p>9. Par&aacute;metros de soldadura.</p>\n<p>10.T&eacute;cnicas y procedimientos de soldadura. Cuidados especiales por tipo de material.</p>', '1620749187909'),
(3, 'fsdf', 'sdfsdf', 'https://cfppruebas.s3.us-east-2.amazonaws.com/app/cursos/1620749712196/portada.png', '<table style=\"border-collapse: collapse; width: 100%; height: 63px;\" border=\"1\">\n<tbody>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 1</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 2</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 3</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n</tbody>\n</table>', '1620749712196'),
(4, 'Descripción', 'Requisitos', 'https://cfppruebas.s3.us-east-2.amazonaws.com/app/cursos/1620750045807/portada.jpg', '<table style=\"border-collapse: collapse; width: 100%; height: 63px;\" border=\"1\">\n<tbody>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 1</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 2</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n<tr style=\"height: 21px;\">\n<td style=\"width: 28.7493%; height: 21px;\"><strong>Contenido 3</strong></td>\n<td style=\"width: 67.522%; height: 21px;\">&nbsp;</td>\n</tr>\n</tbody>\n</table>', '1620750045807');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_habil_solicitudes`
--

CREATE TABLE `tb_habil_solicitudes` (
  `DUI` varchar(10) NOT NULL,
  `S1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `S2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `S3` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `S4` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `S5` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `S6` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_habil_solicitudes`
--

INSERT INTO `tb_habil_solicitudes` (`DUI`, `S1`, `S2`, `S3`, `S4`, `S5`, `S6`, `Date`) VALUES
('05756113-8', '{\"Nit\":\"0000-00000000-000-0\",\r\n        \"Minoridad\": \"\",\r\n        \"ISSS\": \"\",\r\n        \"Pasaporte\": \"\",\r\n        \"Nacionalidad\": \"Salvadoreña\",\r\n        \"Municipio\": \"Cuyultitán\",\r\n        \"Departamento\": \"La Paz\",\r\n        \"Fecha\": \"02-11-1989\",\r\n        \"Sexo\": \"Femenino\",\r\n        \"Edad\": \"31\",\r\n        \"GrupoFamiliar\": 5,\r\n        \"EstadoFamiliar\": \"Acompañada\",\r\n        \"JefeHogar\": \"Compartida\",\r\n        \"CantidadHijos\": 3,\r\n        \"Oficio\": \"Empleada\",\r\n        \"Domicilio\": \"Centro Urbano José Simeón Cañas, Edif. 437 #21\",\r\n        \"MunicipioDomicilio\": \"Mejicanos\",\r\n        \"DepartamentoDomicilio\": \"San Salvador\",\r\n        \"TelFijo\": \"\",\r\n        \"TelMovil\": \"77410767\",\r\n        \"Email\": \"klvalladaresm@gmail.com\",\r\n        \"Discapacidad\": []\r\n    }', '{\r\n        \"Alfabetismo\": \"Leer y escribir\",\r\n        \"UltimoGrado\": \"Universidad Incompleta\",\r\n        \"EstudiaActualmente\": true,\r\n        \"TiempoDejoEstudiar\": false,\r\n        \"UltimosCursos\": false,\r\n        \"UsoCapacitaciones\": false\r\n    }', '{\r\n        \"ActividadActual\": [\r\n            \"Trabaja\"\r\n        ],\r\n        \"TipoDeTrabajo\": \"Empleo a tiempo completo\",\r\n        \"SectorDeTrabajo\": \"Sector Privado\",\r\n        \"EmpleoAnterior\": false,\r\n        \"TiempoSinTrabjo\": false\r\n    }', ' {\r\n        \"RecibeIngresos\": true,\r\n        \"ManerasIngresos\": [\r\n            \"trabajo\"\r\n        ]\r\n    }', '{\r\n        \"Expectativas\": [\r\n            0\r\n        ],\r\n        \"PertinenciaDelCurso\": 0\r\n    }', '{\r\n        \"NombreContacto\": \"Erick Alexander Zelaya Ramos\",\r\n        \"DireccionContacto\": \"Centro Urbano Jose Simeón Cañas, Edificio 437 #22\",\r\n        \"MunicipioContacto\": \"Mejicanos\",\r\n        \"DepartamentoContacto\": \"San Salvador\",\r\n        \"TelFijoContacto\": \"\",\r\n        \"TelMovilContacto\": \"77410673\",\r\n        \"EmailContacto\": \"erickzera@gmail.com\"\r\n    }', '2021-04-08 15:30:47'),
('05756113-9', '{\"Nit\": \"0000-00000000-000-0\", \"Minoridad\": \"\", \"ISSS\": \"\", \"Pasaporte\": \"\", \"Nacionalidad\": \"Salvadoreña\", \"Municipio\": \"Santa Tecla\", \"Departamento\": \"La Paz\", \"Fecha\": \"02-11-1989\", \"Sexo\": \"Femenino\", \"Edad\": \"31\", \"GrupoFamiliar\": 5, \"EstadoFamiliar\": \"Acompañada\", \"JefeHogar\": \"Compartida\", \"CantidadHijos\": 3, \"Oficio\": \"Empleada\", \"Domicilio\": \"Centro Urbano José Simeón Cañas, Edif. 437 #21\", \"MunicipioDomicilio\": \"Mejicanos\", \"DepartamentoDomicilio\": \"San Salvador\", \"TelFijo\": \"\", \"TelMovil\": \"77410767\", \"Email\": \"klvalladaresm@gmail.com\", \"Discapacidad\": []}', NULL, NULL, NULL, NULL, NULL, '2021-04-08 16:03:23');

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
  `Genero` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ISSS` varchar(35) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Cargo` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_participante`
--

INSERT INTO `tb_participante` (`DUI`, `Nombre`, `Telefono`, `Email`, `Genero`, `ISSS`, `Cargo`) VALUES
('05756113-8', 'Franklin Alejandro López Ramírez', '7836-3690', 'franklin_lopez@ricaldone.edu.sv', 'Hombre', '21321354', 'Cargo'),
('12345678-9', 'Allan Guevara', '1234-5678', 'allan_guevara@ricaldone.edu.sv', 'Mujer', '1324654654', 'IT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_programa`
--

CREATE TABLE `tb_programa` (
  `id_programa` int(11) NOT NULL,
  `Nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `ImgPortada` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_programa`
--

INSERT INTO `tb_programa` (`id_programa`, `Nombre`, `ImgPortada`, `Estado`) VALUES
(28, 'Proyecto Especial', '1611934869304_INSAFORP TRASNPARENTE Y RESPLANDOR.png', 1),
(29, 'PROGRAMA NACIONAL DE FORMACION CONTINUA OFIMÁTICA', '1611934877770_LOGO AT - resplandor.png', 1),
(30, 'INGLÉS PARA EL TRABAJO', '1611934886035_INGLÉS PARA EL TRABAJO_TRANSPARENTE.png', 1),
(31, 'Formación en el idioma inglés', '1611934896676_fi.jpeg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id_usuario` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Password` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `Role` int(11) NOT NULL,
  `Estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id_usuario`, `Nombre`, `Email`, `Password`, `Role`, `Estado`) VALUES
('0614-180898-157-8', 'empresa falsa', 'franklin_lopez@ricaldone.edu.sv', '$2b$10$FFFq7BKWdVi1BpNH5QLzBurwL7vxXE5agEAFIlat9kS5xk0gvhz8i', 4, 1),
('1234-546578-987-9', 'Administración Nacional de Acueductos y Alcantarillados', 'franklin_lopez@ricaldone.edu.sv', '$2b$10$jeDmLtXsoyXvd/rjEFDuN.TS6J8jR5QZTPpAmBQsJKFoe3BHN6r0a', 4, 1),
('empresa', 'Empresa Centro', 'empresa@centro.com', '$2b$10$Mawodp19u1NJ.OQvtm49WuuPTCdKYetCnqXqWE5wdN43L0rFnLOhW', 5, 1),
('franklin_lopez', 'Franklin Alejandro López Ramírez', 'franklin_lopez@ricaldone.edu.sv', '$2b$10$PgwoTrFigeoi.uyOQt2s5uAvDggdxc/f5O9QzUuGq9BPHFlXw6khC', 1, 1),
('gloria_perez', 'Gloria Haydeé Perez Navarrete', 'gloria_perez@ricaldone.edu.sv', '$2b$10$aXy9EMiI15VW3w19CRkk6OxGU.OuJcv0OT///bFSYD3xor9FzhCV6', 0, 1),
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
(150, 28, '1620751003659');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `union_matricula`
--

CREATE TABLE `union_matricula` (
  `id_matricula` int(11) NOT NULL,
  `id_participante` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `id_curso` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `id_empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `union_matricula`
--

INSERT INTO `union_matricula` (`id_matricula`, `id_participante`, `id_curso`, `id_empresa`) VALUES
(159, '05756113-8', '1620751003659', 28),
(160, '12345678-9', '1620751003659', 28);

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
-- Volcado de datos para la tabla `union_programa_usuario`
--

INSERT INTO `union_programa_usuario` (`id_union`, `id_usuario`, `id_programa`) VALUES
(27, 'franklin_lopez', 30),
(29, 'franklin_lopez', 29),
(30, 'gloria_perez', 28);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo_empresa_curso`
--
ALTER TABLE `archivo_empresa_curso`
  ADD PRIMARY KEY (`id`),
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
-- Indices de la tabla `tb_ec_alumno`
--
ALTER TABLE `tb_ec_alumno`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_grupo` (`id_grupo`);

--
-- Indices de la tabla `tb_ec_carrera`
--
ALTER TABLE `tb_ec_carrera`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_ec_grupo`
--
ALTER TABLE `tb_ec_grupo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_carrera` (`id_carrera`);

--
-- Indices de la tabla `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD KEY `Estado` (`Estado`),
  ADD KEY `Actividad_eco` (`Actividad_eco`),
  ADD KEY `NIT` (`NIT`);

--
-- Indices de la tabla `tb_empresa_contact`
--
ALTER TABLE `tb_empresa_contact`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indices de la tabla `tb_habil_cursos`
--
ALTER TABLE `tb_habil_cursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Codigo_curso` (`Codigo_curso`);

--
-- Indices de la tabla `tb_habil_solicitudes`
--
ALTER TABLE `tb_habil_solicitudes`
  ADD PRIMARY KEY (`DUI`);

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
  ADD KEY `id_empresa` (`id_empresa`);

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
-- AUTO_INCREMENT de la tabla `archivo_empresa_curso`
--
ALTER TABLE `archivo_empresa_curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

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
-- AUTO_INCREMENT de la tabla `tb_ec_alumno`
--
ALTER TABLE `tb_ec_alumno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tb_ec_carrera`
--
ALTER TABLE `tb_ec_carrera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_ec_grupo`
--
ALTER TABLE `tb_ec_grupo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_empresa`
--
ALTER TABLE `tb_empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tb_empresa_contact`
--
ALTER TABLE `tb_empresa_contact`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tb_habil_cursos`
--
ALTER TABLE `tb_habil_cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT de la tabla `union_curso_empresa`
--
ALTER TABLE `union_curso_empresa`
  MODIFY `id_union` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT de la tabla `union_matricula`
--
ALTER TABLE `union_matricula`
  MODIFY `id_matricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT de la tabla `union_programa_usuario`
--
ALTER TABLE `union_programa_usuario`
  MODIFY `id_union` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
-- Filtros para la tabla `tb_ec_alumno`
--
ALTER TABLE `tb_ec_alumno`
  ADD CONSTRAINT `tb_ec_alumno_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `tb_ec_grupo` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `tb_ec_grupo`
--
ALTER TABLE `tb_ec_grupo`
  ADD CONSTRAINT `tb_ec_grupo_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `tb_ec_carrera` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_empresa_contact`
--
ALTER TABLE `tb_empresa_contact`
  ADD CONSTRAINT `tb_empresa_contact_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_habil_cursos`
--
ALTER TABLE `tb_habil_cursos`
  ADD CONSTRAINT `tb_habil_cursos_ibfk_1` FOREIGN KEY (`Codigo_curso`) REFERENCES `tb_cursos` (`Codigo_curso`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `union_matricula_ibfk_3` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE;

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
