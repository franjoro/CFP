-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2021 a las 21:03:52
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
(17, 'app/empresas/612/1614621712657.pdf', 1, 612, 'ITR-FCOO-50', 0),
(18, 'app/empresas/612/1614621712677.pdf', 2, 612, 'ITR-FCOO-50', 0),
(19, 'app/empresas/612/1614621712680.pdf', 3, 612, 'ITR-FCOO-50', 0),
(20, 'app/empresas/612/1614621712683.pdf', 4, 612, 'ITR-FCOO-50', 0);

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
('ITR-FCOO-51', 'Microsoft Excel Básico Online', '2021-02-20', '2021-03-20', '950133794- 950133837', '', 'S 10:00 am a 12:00 md', '42.47', '', 'Licitación', '-', 'Contrato', '-', 1, '16', 29);

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
(340, 'Academia Nacional de Seguridad Pública', 'Av. Melvin Jones, Edificio Edf. Ex Cetipol, La Libertad.', NULL, '2343-8431', NULL, NULL, NULL, NULL, 1),
(341, 'ACOPACREMS de R.L.', '19 Avenida Norte, y 1° Calle Ponuente, N° 139.', NULL, '2511-4403', NULL, NULL, NULL, NULL, 1),
(342, 'ACOPUS de R.L.', '27 Calle Poniente, N° 1348, San Salvador.', NULL, '2239-8900', NULL, NULL, NULL, NULL, 1),
(343, 'Administración General de Cementerios del Municipio de San Salvador', '-', NULL, '2510-8614', NULL, NULL, NULL, NULL, 1),
(344, 'Administración Nacional de Acueductos y Alcantarillados', 'Col. Libertad, Avenida Don Bosco, Edificio Ex IVU, San Salvador.', NULL, '2247-2667', NULL, NULL, NULL, NULL, 1),
(345, 'Administradora de Fondos de Pensiones Crecer, S.A.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(346, 'ADOC', '-', NULL, '2277-227\r\n2251-7118', NULL, NULL, NULL, NULL, 1),
(347, 'Aeromantenimiento, S.A.', '-', NULL, '2312-4000', NULL, NULL, NULL, NULL, 1),
(348, 'Agencia Nacional de Clavos y Anclajes, S.A. de C.V.', '-', NULL, '2526-8700', NULL, NULL, NULL, NULL, 1),
(349, 'Agencia para el Desarrollo y la Salud Agropecuaria, S.A. de C.V.', '-', NULL, '2274-7139', NULL, NULL, NULL, NULL, 1),
(350, 'Agroquímicas Industriales, S.A. de C.V.', 'Colonia Harrison, Final 49 Avenida Sur, N°16, San Salvador.', NULL, '2223-1111', NULL, NULL, NULL, NULL, 1),
(351, 'Akqa El Salvador, S.A. de C.V.', '-', NULL, '7602-1944', NULL, NULL, NULL, NULL, 1),
(352, 'Alba Petroleos de El Salvador, S.E.M. de C.V.', 'Parque Industrial El Boqueron, Blk A #1, Boulevard Orden de Malta, Antiguo Cuscatlán.', NULL, '2526-7700\r\n2528-7806', NULL, NULL, NULL, NULL, 1),
(353, 'Albacrome, S.A. de C.V.', '-', NULL, '2213-1000', NULL, NULL, NULL, NULL, 1),
(354, 'Alcaldía Municipal de Cuscatancingo', 'Calle El Calvario, N° 48, Cuscatancingo, San Salvador.', NULL, '2526-8600', NULL, NULL, NULL, NULL, 1),
(355, 'Alcaldía Municipal de Guazapa', '-', NULL, '2324-0001', NULL, NULL, NULL, NULL, 1),
(356, 'Alcaldía Municipal de Ilopango', 'San Bartolo, Pasaje El Mirto, N° 22, San Salvador.', NULL, '2295-1331', NULL, NULL, NULL, NULL, 1),
(357, 'Alcaldía Municipal de Mejicanos', '2 Calle Oriente, N° 12, Mejicanos.', NULL, '2206-9101', NULL, NULL, NULL, NULL, 1),
(358, 'Alcaldía Municipal de Santa Isabel Ishuatán', '-', NULL, '2420-6400', NULL, NULL, NULL, NULL, 1),
(359, 'Aleman Soto y Asociados', 'Final 75 Avenida Sur, #214m San Salvador.', NULL, '2234-8900', NULL, NULL, NULL, NULL, 1),
(360, 'Alimentos Congelados, S.A. de C.V.', 'Residencial Utila, Boulevard Sur #6 y 8, Santa Tecla, La Libertad.', NULL, '2288-2065', NULL, NULL, NULL, NULL, 1),
(361, 'Alimentos Varios S.A. De C.V. (Lido)', '-', NULL, '2281-6900', NULL, NULL, NULL, NULL, 1),
(362, 'Alimentos Industriales Salvadoreños S.A. de C.V.', '-', NULL, '2319-1000', NULL, NULL, NULL, NULL, 1),
(363, 'Alimentos Samsil, S.A. de C.V.', 'Colonia Guatemala, 21A Calle oriente, N° 528, San Salvador.', NULL, '2559-3002\r\n2559-3003', NULL, NULL, NULL, NULL, 1),
(364, 'All Business Logistics Support, S.A. de C.V.', 'Condiminio Villas de Normandia, 1A Calle Poniente, Local 2-A, San Salvador.', NULL, '2526-3620', NULL, NULL, NULL, NULL, 1),
(365, 'Almacenes Siman, S.A. de C.V.', '-', NULL, '2245-3000\r\n2298-3000', NULL, NULL, NULL, NULL, 1),
(366, 'Almacenes Vidri, S.A. de C.V.', '12 y 14 Calle Poniente, 21 Avenida Sur, San Salvador.', NULL, '2271-4033', NULL, NULL, NULL, NULL, 1),
(367, 'Aluminios Internacionales, S.A.', '-', NULL, '2270-1406', NULL, NULL, NULL, NULL, 1),
(368, 'Ana Crisitina Galo de Mendoza', '-', NULL, '2662-3221', NULL, NULL, NULL, NULL, 1),
(369, 'Analítica Salvadoreña, S.A. de C.V.', '-', NULL, '2236-9400', NULL, NULL, NULL, NULL, 1),
(370, 'Aranda, S.A. de C.V.', '-', NULL, '2268-5616', NULL, NULL, NULL, NULL, 1),
(371, 'Arteaga Palacios, S.A. de C.V.', '-', NULL, '2222-6890', NULL, NULL, NULL, NULL, 1),
(372, 'Asa Poster, S.A.', '-', NULL, '2526-0000', NULL, NULL, NULL, NULL, 1),
(373, 'Asociación Aldeas Infantiles SOS El Salvador', '-', NULL, '2225-4366', NULL, NULL, NULL, NULL, 1),
(374, 'Asociación Cooperativa de Ahorro y Crédito de los Empleados Municipales de El Salvador y de otras Em', '19 Calle Oriente y 12 Avenida Birte, N° 1010-B, Colonia Mugdan, Barrio La Esp, San Salvador.', NULL, '2225-8106', NULL, NULL, NULL, NULL, 1),
(375, 'Asociación Cooperativa de Ingenieros y Arquitectos de R.L. (Acofinges de RL)', '-', NULL, '2561-2400', NULL, NULL, NULL, NULL, 1),
(376, 'Asociación Demográfica Salvadoreña/PRO-FAMILIA', '25 Avenida Norte, N° 583, San Salvador.', NULL, '2132-8135', NULL, NULL, NULL, NULL, 1),
(377, 'Asociación Jóvenes Hacia la Solidaridad y el Desarrollo', '-', NULL, '2564-1869', NULL, NULL, NULL, NULL, 1),
(378, 'Asociación Nuevo Amanecer de El Salvador', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(379, 'Asociación Panamericana de Mercadeo Social', '-', NULL, '2239-4800', NULL, NULL, NULL, NULL, 1),
(380, 'Asociación para el Desarrollo de El Salvador', '-', NULL, '2226-3717', NULL, NULL, NULL, NULL, 1),
(381, 'Asociación Salvadoreña de Extencionistas Empresariales del INCAE', 'Col. Medica, Diagonal Dr. Arturo Romero, N° 431, San Salvador.', NULL, '2200-9000', NULL, NULL, NULL, NULL, 1),
(382, 'Asociación Unidad Ecológica El Salvador', '-', NULL, '2260-1480', NULL, NULL, NULL, NULL, 1),
(383, 'Atento El Salvador, S.A. de C.V.', '63 Av. Sur, Alameda Roosvelt, Centro Financiero Gigante, Torre D, San Salvador.', NULL, '2211-9000\r\n7459-3479', NULL, NULL, NULL, NULL, 1),
(384, 'Autoridad de Aviación Civil', 'Km 9 1/2, Carretera Panamericana, San Salvador.', NULL, '2565-4454', NULL, NULL, NULL, NULL, 1),
(385, 'Avinsa, S.A. de C.V.', '-', NULL, '2202-1000', NULL, NULL, NULL, NULL, 1),
(386, 'Axalta El Salvador, S.A. de C.V.', 'Calle Amberes N° 140, Colonia Roma, San Salvador, El Salvador.', NULL, '2223-9524', NULL, NULL, NULL, NULL, 1),
(387, 'B.Braun, S.A. de C.v.', '-', NULL, '6011-6817', NULL, NULL, NULL, NULL, 1),
(388, 'Banco Atlántida El Salvador, S.A.', 'Centro Financiero, Boulevard Constitución y 1ra Calle Pte.\r\nNo. 3538, Col. Escalón, San Salvador, El Salvador, C.A.', NULL, '2267-4598', NULL, NULL, NULL, NULL, 1),
(389, 'Banco Central de Reserva de El Salvador', 'Alameda Juan Pablo II y 17 Avenida Sur, San Salvador.', NULL, '2281-8155', NULL, NULL, NULL, NULL, 1),
(390, 'Banco Cuscatlán de El Salvador, S.A. de C.V.', '-', NULL, '2250-1261', NULL, NULL, NULL, NULL, 1),
(391, 'Banco de America Central, S.A.', '55 Av sur, entre Av Olímpica y Alameda Rosevelt # 2827, ctgo a Salón de Usos múltiples de la Universidad Francisco Gavidia,', NULL, '2206-4475', NULL, NULL, NULL, NULL, 1),
(392, 'Banco de Fomento Agropecuario', 'Km 10 1/2, Carretera al Puerto de La Libertad, San Salvador.', NULL, '2241-0875', NULL, NULL, NULL, NULL, 1),
(393, 'Banco Azul de El Salvador', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(394, 'Belen, S.A. de C.V.', '-', NULL, '2262-5100', NULL, NULL, NULL, NULL, 1),
(395, 'Bemisal, S.A. de C.V.', '-', NULL, '2487-4113', NULL, NULL, NULL, NULL, 1),
(396, 'Biokemical, S.A. de C.V.', 'Calle Alberto Masferrer N°174-A, Santo Tomas, San Salvador', NULL, '2316-5400\r\n2220-9118', NULL, NULL, NULL, NULL, 1),
(397, 'Blackhawk Support Services El Salvador, Ltda de C.V.', '-', NULL, '2507-0000', NULL, NULL, NULL, NULL, 1),
(398, 'Blokitubos', '23 Av. Sur y Boulevard Venezuela, San Salvador', NULL, '7910-2179', NULL, NULL, NULL, NULL, 1),
(399, 'Brenntag El Salvador, S.A. de C.V.', 'Carretera Panamericana, Km 7 1/2, Parque Industrial Desarrollo, Local 9, Soyapango, San Salvador.', NULL, '2251-5600\r\n7871-0587', NULL, NULL, NULL, NULL, 1),
(400, 'Brillat, S.A. de C.V.', '-', NULL, '2565-1369', NULL, NULL, NULL, NULL, 1),
(401, 'Business Consultan Services El Salvador, S.A. de C.V.', '-', NULL, '2529-9182', NULL, NULL, NULL, NULL, 1),
(402, 'Buy Express Freight, S.A. de C.V.', '-', NULL, '2207-5757', NULL, NULL, NULL, NULL, 1),
(403, 'Caja de Crédito de San Ignacio, Sociedad Cooperativa de RL de CV', '-', NULL, '2393-9600', NULL, NULL, NULL, NULL, 1),
(404, 'Caja Mutual de los Empleados del Ministerio de Educación', '-', NULL, '2132-4149', NULL, NULL, NULL, NULL, 1),
(405, 'CAMAN International, S.A. de C.V.', '-', NULL, '2319-6500', NULL, NULL, NULL, NULL, 1),
(406, 'CAN AM Centroamericana, S.A. de C.V.', '-', NULL, '2263-1720', NULL, NULL, NULL, NULL, 1),
(407, 'Caribe Hospitality El Salvador, S.A. de C.V.', '-', NULL, '2249-3000', NULL, NULL, NULL, NULL, 1),
(408, 'Carnaval, S.A. de C.V.', '-', NULL, '2532-3249', NULL, NULL, NULL, NULL, 1),
(409, 'Cartonera Centroamericana, S.A. de C.V.', 'Blvd del Ejército Nacional, Km 8 1/2, Ilopango, San Salvador.', NULL, '2567-6100', NULL, NULL, NULL, NULL, 1),
(410, 'Carvajal Empaques, S.A. de C.V.', 'Km. 10 1/2, Carretera al Puerto de La Libertad, Zaragoza.', NULL, '224-7800', NULL, NULL, NULL, NULL, 1),
(411, 'Castaneda Puente Jorge Antonio', '-', NULL, '2452-2341', NULL, NULL, NULL, NULL, 1),
(412, 'CDM de El Salvador, S.A. de C.V.', '3a. Calle Poniente, entre 85 y 87 Av. Norte, Colonia Escalón, San Salvador.', NULL, '2263-7363', NULL, NULL, NULL, NULL, 1),
(413, 'CEK de Centroamerica (El Salvador), S.A.', 'Ofibodegas Nejapa, Carretera Oeste, Panamericana.', NULL, '2510-1603', NULL, NULL, NULL, NULL, 1),
(414, 'Celo Block, S.A. de C.V.', '29 Calle Poniente y 25 Avenida Norte, San Salvador.', NULL, '2226-8166', NULL, NULL, NULL, NULL, 1),
(415, 'Cementerio Jardín Diego de Holgin SEM', '-', NULL, '2257-9999', NULL, NULL, NULL, NULL, 1),
(416, 'Cementerio La Resurrección, S.A. de C.V.', 'Colonia San Francisco, Avenida Las Amapolas, N° 10, San Salvador.', NULL, '2121-6500', NULL, NULL, NULL, NULL, 1),
(417, 'Central America Spinning Works El Salvador, S.A. de C.V.', '-', NULL, '2218-1000', NULL, NULL, NULL, NULL, 1),
(418, 'Central Americana de Distribución, S.A. de C.V.', '-', NULL, '2271-3779', NULL, NULL, NULL, NULL, 1),
(419, 'Central de Depósito de Valores, S.A. de C.V.', '-', NULL, '2212-6440', NULL, NULL, NULL, NULL, 1),
(420, 'Central Dulcera, S.A. de C.V.', '-', NULL, '2243-1150', NULL, NULL, NULL, NULL, 1),
(421, 'Central Hidraúlica, S.A. de C.V.', '-', NULL, '2133-7373', NULL, NULL, NULL, NULL, 1),
(422, 'Centro de Distribución Regional, S.A. de C.V.', 'Carretera a Comalapa, Km. 4.50, Zona Franca San Marcos, Nave 15, San Salvador.', NULL, '2207-5757', NULL, NULL, NULL, NULL, 1),
(423, 'Centro Internacional de Ferias y Convenciones de El Salvador', '-', NULL, '2132-7000\r\n2132-7031', NULL, NULL, NULL, NULL, 1),
(424, 'Centro Nacional de Registros', 'Final 43 Av. Norte y 1° Calle poniente N° 2310, San Salvador', NULL, '2593-5806', NULL, NULL, NULL, NULL, 1),
(425, 'Cinemark El Salvador, LTDA de C.V.', 'Carretera Panamericana y Calle Chiltiupan, Centro Comercial La Gran Vía, Antiguo Cuscatlán, La Libertad.', NULL, '2527-3700', NULL, NULL, NULL, NULL, 1),
(426, 'Círculo Deportivo Internacional', 'Col. Roma, Calle Lorena, San Salvador.', NULL, '2528-3772', NULL, NULL, NULL, NULL, 1),
(427, 'C. Imberton, S.A. de C.V.', 'Km 11 1/2, Carretera al Puerto de La Libertad, La Libertad.', NULL, '2241-6738\r\n7602-3957', NULL, NULL, NULL, NULL, 1),
(428, 'Citibank NA Sucursal El Salvador', 'Edificio PALIC, Alameda Enrique Araujo y Calle Nueva No. 1, Col Escalón, San Salvador, El Salvador', NULL, '2244-1333\r\n2244-1218', NULL, NULL, NULL, NULL, 1),
(429, 'Cognizant El Salvador, S.A. de C.V.', '-', NULL, '2202-9000', NULL, NULL, NULL, NULL, 1),
(430, 'Club de Playas Salinitas, S.A. de C.V.', '-', NULL, '2209-3100\r\n7842-4863', NULL, NULL, NULL, NULL, 1),
(431, 'Comercial de Plásticos, S.A. de C.V.', '1 Calle Poniente y 9 Avenida Norte, N° 531, San Salvador.', NULL, '2535-4549', NULL, NULL, NULL, NULL, 1),
(432, 'Comercializadora 503, S.A. de C.V.', 'Urb. San Pablo, Cl L, N° 29-B, San Salvador.', NULL, '2227-2781\r\n7854-5317', NULL, NULL, NULL, NULL, 1),
(433, 'Comercializadora Dinex, S.A. de C.V.', '-', NULL, '2375-6315', NULL, NULL, NULL, NULL, 1),
(434, 'Comercializadora Interamericana, S.A. de C.V.', 'Colonia Escalón, 77 Avenida Norte, 314, San Salvador', NULL, '2248-5092', NULL, NULL, NULL, NULL, 1),
(435, 'Comisión Ejecutiva Portuaria Autonóma', 'Edificio Torre Roble, Boulevard Los Héroes, Metrocentro, San Salvador.', NULL, '2537-1300', NULL, NULL, NULL, NULL, 1),
(436, 'Comisión Nacional de la Micro y Pequeña Empresa', '25 Avenida Norte y 25 Calle Poniente, Edificio Gazzolo, San Salvador.', NULL, '2592-9100\r\n2592-9000', NULL, NULL, NULL, NULL, 1),
(437, 'Compañía Azucarera Salvadoreña, S.A. de C.V.', '-', NULL, '2484-1000', NULL, NULL, NULL, NULL, 1),
(438, 'Compañía de Alumbrado Eléctrico de San Salvador, S.A. de C.V.', '-', NULL, '2529-9182', NULL, NULL, NULL, NULL, 1),
(439, 'Compañía de Telecomunicaciones de El Salvador, S.A. de C.V.', 'Colonia Roma, Cl. El Progreso y Avenida Liverpool, Complejo Roma Edif. A, San Salvador.', NULL, '2250-3389', NULL, NULL, NULL, NULL, 1),
(440, 'Compañía General de Equipos, S.A. de C.V.', 'Colonia Las Mercedes, Avenida Las Mercedes, #401, San Salvador.', NULL, '2223-2323', NULL, NULL, NULL, NULL, 1),
(441, 'Compañía Mercantil Intercontinental, S.A. de C.V.', '-', NULL, '2206-5400', NULL, NULL, NULL, NULL, 1),
(442, 'Compañía Salvadoreña de Seguridad, S.A. de C.V.', 'Col. y Av. Bernal, Residencial Montecarlo 1.', NULL, '2500-5222', NULL, NULL, NULL, NULL, 1),
(443, 'Compañía Salvadoreña de Teleservices, S.A. de C.V.', 'Av. Olímpica y Pje 3, Edificio Plaza Olímpica 2do Nivel, San Salvador.', NULL, '2250-5700', NULL, NULL, NULL, NULL, 1),
(444, 'Conave, S.A. de C.V.', 'Boulevard del Ejército Nacional  km 3 ½ y 54 Avenida Norte, San Ssalvador.', NULL, '2261-9700', NULL, NULL, NULL, NULL, 1),
(445, 'Concentrix CVG Global Services El Salvador, S.A. de C.V.', '63 Avenida Sur, Bk 9, Centro Financiero Gigante, Alameda Roosvelt, Pje 1, San Salvador.', NULL, '2500-3650', NULL, NULL, NULL, NULL, 1),
(446, 'Confecciones El Pedregal, S.A de C.V.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(447, 'Conos y Pajillas, S.A. de C.V.', '-', NULL, '2226-3140', NULL, NULL, NULL, NULL, 1),
(448, 'Consolidated Freight Services, S.A. de C.V.', '-', NULL, '2500-4000', NULL, NULL, NULL, NULL, 1),
(449, 'Constructora Bernard R.C., S.A. de C.V.', 'Urbanización Aida, Pasaje Rocío, N° 13, C San Carlos, San Salvador.', NULL, '2221-9181\r\n2221-9177', NULL, NULL, NULL, NULL, 1),
(450, 'Construcciones Nabla, S.A. de C.V.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(451, 'Consuelo Merino', '-', NULL, '2266-8908', NULL, NULL, NULL, NULL, 1),
(452, 'Contratación de Servicios, S.A. de C.V.', '-', NULL, '2267-3600', NULL, NULL, NULL, NULL, 1),
(453, 'Contrataciones Diversas, S.A. de C.V.', 'Paseo General Escalón, CC Masferrer, Local del Sótano (Ex cines), Frente a Burger King Masferrer.', NULL, '2207-5464\r\n2264-3937', NULL, NULL, NULL, NULL, 1),
(454, 'Contrataciones Estratégicas, S.A. de C.V.', '-', NULL, '2267-3600', NULL, NULL, NULL, NULL, 1),
(455, 'Cooperativa Ganadera de Sonsonate de R.L. de C.V.', 'Boulevard Oscar Osorio, Carretera a Acajutla Narrio El Ángel, Sonsonate', NULL, '2484-1595', NULL, NULL, NULL, NULL, 1),
(456, 'Corporación de Compañías Agroindustriales de El Salvador, S.A. de C.V.', '-', NULL, '2249-3500\r\n7859-7354', NULL, NULL, NULL, NULL, 1),
(457, 'Corporación de Profesionales, S.A. de C.V.', 'Cantón San Pedro Mártir, Calle Principal, San Juan Opico, La Libertad.', NULL, '2504-9892', NULL, NULL, NULL, NULL, 1),
(458, 'Corporación Europea, S.A. de C.V.', '44 Avenida Norte, N° 1-7, San Salvador.', NULL, '2524-4400', NULL, NULL, NULL, NULL, 1),
(459, 'Corporación GEB, S.A. de C.V.', 'Colonia Escalón, Paseo General Escalón, entre 73 y 75 Avenida Sur, San Salvador.', NULL, '2236-0500', NULL, NULL, NULL, NULL, 1),
(460, 'Corporación Sato, S.A. de C.V.', '-', NULL, '2260-7332\r\n2260-7395', NULL, NULL, NULL, NULL, 1),
(461, 'Cosalco, S.A. de C.V.', '-', NULL, '2557-3218', NULL, NULL, NULL, NULL, 1),
(462, 'Counterpart International Inc', '-', NULL, '2522-2800', NULL, NULL, NULL, NULL, 1),
(463, 'Crediplata, S.A. de C.V.', '9A Calle Poniente, entre 4 y 6 Avenida Sur, N° 20, Santa Ana.', NULL, '2440-2940', NULL, NULL, NULL, NULL, 1),
(464, 'Credomatic de El Salvador, S.A. de C.V.', '55 Av. Sur, Centro Comercial Roosvelt, Edificio \"D\", San Salvador.', NULL, '2206-4475', NULL, NULL, NULL, NULL, 1),
(465, 'Crece Centroamerica, S.A. de C.V.', '-', NULL, '2235-9378', NULL, NULL, NULL, NULL, 1),
(466, 'Curtis Industrial, S.A. de C.V.', '-', NULL, '2206-5000', NULL, NULL, NULL, NULL, 1),
(467, 'Defensoría del Consumidor', '-', NULL, '2526-9008', NULL, NULL, NULL, NULL, 1),
(468, 'Deloitte El Salvador S.A. de C.V.', '-', NULL, '2524-4100', NULL, NULL, NULL, NULL, 1),
(469, 'Dicsasa, S.A. de C.V.', 'Col. Centroamerica, Calle Gabriela Mistral, N° 571, San Salvador.', NULL, '2226-3638', NULL, NULL, NULL, NULL, 1),
(470, 'Digitex El Salvador, S.A. de C.V.', 'Urbanización Jardines de la Hacienda, N° 3, Boulevard Merliot, Antiguo Cuscatlán.', NULL, '2210-0333', NULL, NULL, NULL, NULL, 1),
(471, 'Dirección Municipal para la Gestión Sustentable de Desechos Sólidos', 'Barrio La Garita, Final Colonia Concepción, #188, San Salvador.', NULL, '2530-3900', NULL, NULL, NULL, NULL, 1),
(472, 'Display Sistemas Integrados, S.A. de C.V.', 'Boulevard Bayer, Calle L-1, Antiguo Cuscatlán, La Libertad.', NULL, '2278-2009\r\n2278-7917', NULL, NULL, NULL, NULL, 1),
(473, 'Distribuciones Diversas, S.A. de C.V.', '-', NULL, '2261-3162', NULL, NULL, NULL, NULL, 1),
(474, 'Distribuciones Multiples, S.A. de C.V.', 'Col. Santa Cristina, Pje Santa Lucía, # 1027, San Salvador.', NULL, '2221-1952\r\n2221-0231', NULL, NULL, NULL, NULL, 1),
(475, 'Distribuidora Agencias Electrónicas, S.A. de C.V.', '-', NULL, '2510-4700', NULL, NULL, NULL, NULL, 1),
(476, 'Distribuidora Cuscatlán, S.A. de C.V.', '4 Avenida Norte, N° 1-7, Nueva San Salvador, La Libertad.', NULL, '2524-4400', NULL, NULL, NULL, NULL, 1),
(477, 'Distribuidora DLF Esquivel, S.A.de C.V.', 'Km. 19, Carretera AntiguA, Nejapa, San Salvador.', NULL, '2201-3500', NULL, NULL, NULL, NULL, 1),
(478, 'Distribuidora de Bebidas Anita', '-', NULL, '2277-9345', NULL, NULL, NULL, NULL, 1),
(479, 'Distribuidora de Jeans, S.A. de C.V.', 'Colonia Escalón, 9A Calle Poniente, #3936, San Salvador.', NULL, '2209-9500', NULL, NULL, NULL, NULL, 1),
(480, 'Distribuidora Etica Comercial', '-', NULL, '2241-6738\r\n7602-3957', NULL, NULL, NULL, NULL, 1),
(481, 'Distribuidores Rena Ware, S.A. de C.V.', '1° Calle Poniente y 45 Avenida Norte, San Salvador.', NULL, '2260-6064', NULL, NULL, NULL, NULL, 1),
(482, 'Dizucar', 'Av. 29 de agosto Sur, N° 834, Blvd. Venezuela, San Salvador.', NULL, '2231-4129', NULL, NULL, NULL, NULL, 1),
(483, 'Droguería Alternativa Farmacéutica', '-', NULL, '2263-9316', NULL, NULL, NULL, NULL, 1),
(484, 'Droguería Comercial Salvadoreña, S.A. de C.V.', '-', NULL, '2212-7200', NULL, NULL, NULL, NULL, 1),
(485, 'Droguería Hermel, S.A. de C.V.', '-', NULL, '2218-0899', NULL, NULL, NULL, NULL, 1),
(486, 'Droguería Nueva San Carlos', '-', NULL, '2212-7200', NULL, NULL, NULL, NULL, 1),
(487, 'DSI, S.A. de C.V.', 'Boulevard Bayer, Calle L-1, Antiguo Cuscatlán, La Libertad.', NULL, '2278-2009\r\n2278-7917', NULL, NULL, NULL, NULL, 1),
(488, 'Durán Morales Mario Johel', '-', NULL, '2522-6200', NULL, NULL, NULL, NULL, 1),
(489, 'Dutriz Hermanos, S.A. de C.V./ La Prensa Gráfica', 'Urb. Santa Elena, entre calle Izalco y Conchagua, Antiguo Cuscatlán, La Libertad.', NULL, '2241-2147', NULL, NULL, NULL, NULL, 1),
(490, 'ECSA Operadora El Salvador, S.A. de C.V.', 'Urbanización y Boulevard Santa Elena, Edificio Fusades, Nivel 2, Antiguo Cuscatlán.', NULL, '2528-8000', NULL, NULL, NULL, NULL, 1),
(491, 'Edgardo Noé Iraheta Ramírez', '-', NULL, '6180-1466', NULL, NULL, NULL, NULL, 1),
(492, 'Editorial Altamirano Madriz, S.A. de C.V.', '11 Calle Oriente, N° 271 y Avenida Cuscatancingo, San Salvador.', NULL, '2231-7601\r\n2231-7777', NULL, NULL, NULL, NULL, 1),
(493, 'Edward Howard Velásquez Barahona', '1a Calle Poniente, Condominio Villas de Normandia, N° 2A, San Salvador.', NULL, '2526-3620', NULL, NULL, NULL, NULL, 1),
(494, 'Edwin Francisco Ortiz Figuerora', 'Urb. Villas de Miraflores, Cll El Carmen, Pol 1, N° 17, Nueva San Salvador.', NULL, '2260-6141', NULL, NULL, NULL, NULL, 1),
(495, 'El Salvador Asistencia, S.A. de C.V.', '-', NULL, '2257-6666', NULL, NULL, NULL, NULL, 1),
(496, 'El Salvador Network, S.A.', '-', NULL, '2283-1051', NULL, NULL, NULL, NULL, 1),
(497, 'Embajada de los Estados Unidos de América', '-', NULL, '2501-2999', NULL, NULL, NULL, NULL, 1),
(498, 'Emergencia Médica de El Salvador, S.A. de C.V.', '-', NULL, '2264-0303', NULL, NULL, NULL, NULL, 1),
(499, 'Empresas ADOC, S.A. de C.V.', '-', NULL, '2254-7258', NULL, NULL, NULL, NULL, 1),
(500, 'Ensambladora Salvadoreña, S.A. de C.V.', '-', NULL, '2260-3303', NULL, NULL, NULL, NULL, 1),
(501, 'Erick Alberto Ramírez Martínez', '-', NULL, '2566-5564', NULL, NULL, NULL, NULL, 1),
(502, 'Erik Alexander Aguiluz Ramírez', '-', NULL, '2557-2700', NULL, NULL, NULL, NULL, 1),
(503, 'Ernesto Okeli, S.A. de C.V.', '-', NULL, '2222-0826', NULL, NULL, NULL, NULL, 1),
(504, 'ESET Centroamerica', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(505, 'Estructuristas Consultores, S.A. de C.V.', '-', NULL, '2555-0000', NULL, NULL, NULL, NULL, 1),
(506, 'Etesal, S.A. de C.V.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(507, 'Evergreen Packing de El Salvador, S.A.', '-', NULL, '2241-7000', NULL, NULL, NULL, NULL, 1),
(508, 'Euromoda, S.A. de C.V.', 'Colonia Escalón, Paseo General Escalón, entre 73 y 75 Avenida Sur, San Salvador.', NULL, '2245-3000', NULL, NULL, NULL, NULL, 1),
(509, 'Expecove, LTDA de C.V.', '-', NULL, '2535-5959', NULL, NULL, NULL, NULL, 1),
(510, 'Fábrica de Confección Siman, S.A. de C.V.', '-', NULL, '2245-3000', NULL, NULL, NULL, NULL, 1),
(511, 'Farmaceutica Rodim, S.A. de C.V.', '-', NULL, '2525-2420', NULL, NULL, NULL, NULL, 1),
(512, 'Farmaceuticos Equivalentes, S.A. de C.V.', 'Col. Escalón, 67 Av. Sur, #144, LC 2.', NULL, '2528-3900', NULL, NULL, NULL, NULL, 1),
(513, 'Federación de Asociaciones Cooperativas de Ahorro y Crédito de E Salvador', '23 avenida Norte y 25 Calle Poniente, #1301, San Salvador.', NULL, '2522-3500', NULL, NULL, NULL, NULL, 1),
(514, 'Fersa, S.A. de C.V.', '-', NULL, '2261-0114', NULL, NULL, NULL, NULL, 1),
(515, 'Fondo de Inversión Social para el Desarrollo Local', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(516, 'Fondo de Protección de Funcionarios y Empleados del BCR', 'Alameda Juan Pablo II, Edificio BCR, San Salvador.', NULL, '2261-8481', NULL, NULL, NULL, NULL, 1),
(517, 'Fondo Nacional de Vivienda Popular', 'Alameda Juan Pablo II, entre 37 y 39 Avenida Norte, Edificio FONAVIPO, San Salvador.', NULL, '2501-8888', NULL, NULL, NULL, NULL, 1),
(518, 'Fondo para la Atención a las Víctimas de Accidentes de Tránsito', '-', NULL, '2522-4516', NULL, NULL, NULL, NULL, 1),
(519, 'Fondo Social para la Vivienda', 'Calle Rubén Dario y 4° Calle Poniente, entre 15 y 17 Avenida Sur, San Salvador.', NULL, '2281-0069\r\n7794-4444', NULL, NULL, NULL, NULL, 1),
(520, 'Fondo Solidario para la Salud', '-', NULL, '2528-9713', NULL, NULL, NULL, NULL, 1),
(521, 'Foragro El Salvador, S.A. de C.V.', 'Col. Santa Elena, Blvd Luis Poma, Local 5-08, Edificio Avante, Antiguo Cuscatlán, La Libertad.', NULL, '7481-8253', NULL, NULL, NULL, NULL, 1),
(522, 'Frioaire, S.A. de C.V.', '-', NULL, '2520-2038', NULL, NULL, NULL, NULL, 1),
(523, 'Frutaletas, S.A. de C.V.', '-', NULL, '2250-8209', NULL, NULL, NULL, NULL, 1),
(524, 'Fundación Ayuda en Acción', '-', NULL, '2245-5381', NULL, NULL, NULL, NULL, 1),
(525, 'Fundación Nuevos Horizontes para los Pobres', '-', NULL, '2445-2013', NULL, NULL, NULL, NULL, 1),
(526, 'Fundación Salvadoreña de Apoyo Integral', '-', NULL, '2555-1000', NULL, NULL, NULL, NULL, 1),
(527, 'Funerales Las Flores, S.A. de C.V.', 'Colonia San Francisco, Avenida Las Amapolas, N° 10, San Salvador.', NULL, '2121-6500', NULL, NULL, NULL, NULL, 1),
(528, 'Fusion BPO Services, S.A. de C.V.', 'Colonia San Francisco, Calle Las Camelias, N° 7, San Salvador.', NULL, '2200-4193', NULL, NULL, NULL, NULL, 1),
(529, 'Galvanisadora Industrial Salvadoreña, S.A. de C.V.', '-', NULL, '2212-8835', NULL, NULL, NULL, NULL, 1),
(530, 'Getcom International, S.A. de C.V.', '-', NULL, '2296-8000', NULL, NULL, NULL, NULL, 1),
(531, 'Global Business, S.A. de C.V.', '-', NULL, '2214-4753', NULL, NULL, NULL, NULL, 1),
(532, 'Global Motors, S.A. de C.V.', 'Colonia Flor Blanca, 49 y 51 Av. Sur, #2613-E, Alameda Roosvelt, San Salvador.', NULL, '2298-1818', NULL, NULL, NULL, NULL, 1),
(533, 'GMG Comercial El Salvador, S.A. de C.V.', 'Boulevard Orden de Malta, Urbanización Santa Elena, Antiguo Cuscatlán, La Libertad.', NULL, '2212-1095\r\n2212-1000', NULL, NULL, NULL, NULL, 1),
(534, 'Golan El Salvador, S.A. de C.V.', '-', NULL, '7601-7318', NULL, NULL, NULL, NULL, 1),
(535, 'Grupo Cobra, S.A. de C.V.', '-', NULL, '7967-7773', NULL, NULL, NULL, NULL, 1),
(536, 'Grupo Fertica, S.A. de C.V.', '-', NULL, '2234-0400', NULL, NULL, NULL, NULL, 1),
(537, 'Grupo Integral de Servicios, S.A. de C.V.', '39 Av. Nte y Urb Universitaria, Cl Las Rosas, N| 51-B, San Salvador.', NULL, '2246-0581', NULL, NULL, NULL, NULL, 1),
(538, 'Grupo Logístio de Carga de El Salvador, S.A. de C:V.', 'Km. 9 1/2, Carretera a Comalapa, N° 1-A, San Marcos, San Salvador.', NULL, '2207-5757', NULL, NULL, NULL, NULL, 1),
(539, 'Grupo NSV, S.A. de C.V.', '-', NULL, '2246-3747', NULL, NULL, NULL, NULL, 1),
(540, 'Grupo STT de El Salvador', 'Colonia Escalón, Calle Cuscatlán, entre la 81 y 83 Avenida Sur, N° 122, San Salvador.', NULL, '2511-3073\r\n7853-8261', NULL, NULL, NULL, NULL, 1),
(541, 'Grupo UMA, S.A. de C.V.', 'Colonia Escalón 71 Av. Nte y 3° Calle Pte, N° 3698, Edificio Lexincorp, San Salvador.', NULL, '2243-8290', NULL, NULL, NULL, NULL, 1),
(542, 'Guardado, S.A. de C.V.', '1° Avenida Norte, Colonia Militar, N° 412, Barrio San Jacinto, San Salvador.', NULL, '2500-0400', NULL, NULL, NULL, NULL, 1),
(543, 'Handworks, S.A. de C.V.', '-', NULL, '2228-1074', NULL, NULL, NULL, NULL, 1),
(544, 'Hasgal, S.A. de C.V.', 'Boulevard José Arturo Castellanos, N° 2230, San Salvador.', NULL, '2250-8209\r\n2250-8202', NULL, NULL, NULL, NULL, 1),
(545, 'Hernández Hermanos, S.A. de C.V.', 'Final Avenida Juan Pablo Aberle, N° 20, San Salvador.', NULL, '2246-8700', NULL, NULL, NULL, NULL, 1),
(546, 'Hilda Alicia Vásquez Serrano', '31 Avenida y Boulevar Universitario, San Salvador.', NULL, '2521-0620', NULL, NULL, NULL, NULL, 1),
(547, 'Hispalia, S.A. de C.V.', '-', NULL, '2216-2639', NULL, NULL, NULL, NULL, 1),
(548, 'Holcim S.A.', '-', NULL, '2505-0000', NULL, NULL, NULL, NULL, 1),
(549, 'Hospital de Diágnostico', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(550, 'Hotel Bahía del Sol', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(551, 'Hoteles de Centro América, S.A. de C.V.', 'Col. Miramonte, Boulevard de los Héroes y Avenida Sisimiles, San Salvador.', NULL, '2211-3333', NULL, NULL, NULL, NULL, 1),
(552, 'Importaciones Decoraciones & Comunicaciones, S.A. de C.V.', 'Jardines de La Libertad, Calls Tamanique, Pl. V, N° 16, Nueva San Salvador, La Libertad.', NULL, '2278-0611', NULL, NULL, NULL, NULL, 1),
(553, 'Import Cars, S.A. de C.V.', '-', NULL, '2239-9500', NULL, NULL, NULL, NULL, 1),
(554, 'Impresora Industrial Salvadoreña, S.A. de C.V.', '-', NULL, '2237-1708', NULL, NULL, NULL, NULL, 1),
(555, 'Impresos Diversos, S.A. de C.V.', '-', NULL, '2506-4800', NULL, NULL, NULL, NULL, 1),
(556, 'Impressa Repuestos', '-', NULL, '2212-3508', NULL, NULL, NULL, NULL, 1),
(557, 'Industrias Caricia, S.A. de C.V. (Zapatería Lee Shoes)', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(558, 'Industrias Confeccionarias, S.A. de C.V.', '-', NULL, '2235-7778', NULL, NULL, NULL, NULL, 1),
(559, 'Industrias Consolidadas, S.A. de C.V.', 'Final 1, Avenida Norte, Soyapango, San Salvador.', NULL, '2207-6122\r\n2207-6100', NULL, NULL, NULL, NULL, 1),
(560, 'Industrias Creativas Digitales, S.A. de C.V.', '-', NULL, '2124-0534', NULL, NULL, NULL, NULL, 1),
(561, 'Industrias e Impresos La Unión, S.A. de C.V.', '-', NULL, '2206-5900', NULL, NULL, NULL, NULL, 1),
(562, 'Industrias El Progreso, S.A. de C.V.', 'Barrio Santa Anita, Bulevar Venezuela y 15 Avenida Sur, N° 9014, San Salvador.', NULL, '2222-9328', NULL, NULL, NULL, NULL, 1),
(563, 'Industrias Miguel Ángel, S.A. de C.V.', '-', NULL, '2222-2382', NULL, NULL, NULL, NULL, 1),
(564, 'Industrias Olmedo, S.A. de C.V.', '2° Av. Nte, N° 1224, Barrio San Miguelito. Parada del Mercado San Miguelito, sentido hacia Mejicanos. Una cuadra al norte, buscar rótulo \"Multilubrica', NULL, '-', NULL, NULL, NULL, NULL, 1),
(565, 'Industrias Plásticas, S.A. de C.V.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(566, 'Industrias Sinteticas de Centroamerica, S.A. de C.V.', '-', NULL, '2216-0055', NULL, NULL, NULL, NULL, 1),
(567, 'Industrias St. Jack´s, S.A. de C.V.', '-', NULL, '2248-6000', NULL, NULL, NULL, NULL, 1),
(568, 'Industrias Topaz, S.A. de C.V.', '-', NULL, '2270-3333', NULL, NULL, NULL, NULL, 1),
(569, 'Infra de El Salvador, S.A. de C.V.', '25 Av. Nte, N°1080, San Salvador.', NULL, '2234-3271', NULL, NULL, NULL, NULL, 1),
(570, 'Indy Motos, S.A. de C.V.', '-', NULL, '2231-3419', NULL, NULL, NULL, NULL, 1),
(571, 'Ingeniería Consultoría y Proyectos, S.A. de C.V.', 'Final 21 Avenida Norte y Autopista Norte, Edificio Tequendama 9-2, San Salvador.', NULL, '2239-8100', NULL, NULL, NULL, NULL, 1),
(572, 'Ingeniería Eléctrica y Civil, S.A. de C.V.', 'B° San Jacinto, Calle Berrundia, Av. Los Diplomáticos, #1233, San Salvador.', NULL, '2513-2800', NULL, NULL, NULL, NULL, 1),
(573, 'Ingenio La Cabaña, S.A. de C.V.', '-', NULL, '2393-9900', NULL, NULL, NULL, NULL, 1),
(574, 'Ingtel, S.A. de C.V.', 'Urbanización La Gloria, Polígono 6-5, N° 9, Mejicanos, San Salvador.', NULL, '2265-2020', NULL, NULL, NULL, NULL, 1),
(575, 'Inmobiliaria Apopa, S.A. de C.V.', '-', NULL, '2218-1000', NULL, NULL, NULL, NULL, 1),
(576, 'Innoplastic, S.A. de C.V.', '-', NULL, '2532-6076\r\n2556-5271', NULL, NULL, NULL, NULL, 1),
(577, 'Innovaciones Nutricionales, S.A. de C.V.', '-', NULL, '2399-3700', NULL, NULL, NULL, NULL, 1),
(578, 'Instituto Especializado de Efucación Superior CCSA', '-', NULL, '2239-8000', NULL, NULL, NULL, NULL, 1),
(579, 'Instituto Municipal de la Juventud', '-', NULL, '2511-6000', NULL, NULL, NULL, NULL, 1),
(580, 'Instituto Nacional de los Deportes de El Salvador', 'Palacio de los Deportes Carlos \"El Famoso\" Hernández, Alameda Juan Pablo II y Diagonal Universitaria, Centro de Gobierno, San Salvador.', NULL, '2231-2217', NULL, NULL, NULL, NULL, 1),
(581, 'Instituto Salvadoreño de Desarrollo Municipal', '-', NULL, '2267-6500', NULL, NULL, NULL, NULL, 1),
(582, 'Instituto Salvadoreño de Transformación Agraria', 'Final Colonia Las Mercedes, C A Santa Tecla.', NULL, '2594-1150', NULL, NULL, NULL, NULL, 1),
(583, 'Instituto Salvadoreño para el Desarrollo de la Mujer', '-', NULL, '2510-4100', NULL, NULL, NULL, NULL, 1),
(584, 'Integra International Services, S.A. de C.V.', '-', NULL, '2510-2001', NULL, NULL, NULL, NULL, 1),
(585, 'Intcomex, S.A. de C.V.', 'Calle y Colonia La Mascota No. 519. San Salvador. El Salvador', NULL, '2555-3000\r\n2262-1050', NULL, NULL, NULL, NULL, 1),
(586, 'Intradesa, S.A. de C.V.', 'Km. 7 1/2, Boulevard del ejército Nacional, Contiguo a Tallares PNC y Moore', NULL, '2236-7742', NULL, NULL, NULL, NULL, 1),
(587, 'Intralogix, S.A. de C.V.', '-', NULL, '2375-3615', NULL, NULL, NULL, NULL, 1),
(588, 'Intratex de El Salvador, S.A. de C.V.', '-', NULL, '2236-7742', NULL, NULL, NULL, NULL, 1),
(589, 'Inversiones Cam, S.A. de C.V.', 'Colonia Escalón, 71 Avenida Norte, N° 225, San Salvador.', NULL, '2298-1220', NULL, NULL, NULL, NULL, 1),
(590, 'Inversiones Cromeyer, S.A. de C.V.', '-', NULL, '2279-0901', NULL, NULL, NULL, NULL, 1),
(591, 'Inversiones Dalmon, S.A. de C.V.', 'Centro Comercial Multtiplaza, Local C-43, Segundo Nivel.', NULL, '2243-2674', NULL, NULL, NULL, NULL, 1),
(592, 'Inversiones Lemus, S.A. de C.V.', 'Calle Concepción, #658, San Salvador.', NULL, '2132-8200', NULL, NULL, NULL, NULL, 1),
(593, 'Inversiones Orion, S.A. de C.V.', 'Calle El Mirador, N° 5353, Colonia Escalón, San Salvador.', NULL, '2510-8200', NULL, NULL, NULL, NULL, 1),
(594, 'Inversiones Promet', '-', NULL, '7601-9288', NULL, NULL, NULL, NULL, 1),
(595, 'Inversiones Stanley Pacífico, S.A. de C.V.', '-', NULL, '2121-2604\r\n7920-2460', NULL, NULL, NULL, NULL, 1),
(596, 'Inversiones y Transformaciones Económicas, S.A. de C.V.', '-', NULL, '2264-2611\r\n2264-2614', NULL, NULL, NULL, NULL, 1),
(597, 'Irex de El Salvador, S.A. de C.V.', '-', NULL, '2314-0839', NULL, NULL, NULL, NULL, 1),
(598, 'Jardines y Varios, S.A. de C.V.', 'Barrio El Calvario, Urb. El Rosal, Pasaje El Rosal Vasa, 23, San Salvador.', NULL, '2271-2829', NULL, NULL, NULL, NULL, 1),
(599, 'JCDecaux El Salvador, S.A. de C.V.', 'Col. Escalón, 1ra Calle Poniente, #3636, San Salvador.', NULL, '2260-7773', NULL, NULL, NULL, NULL, 1),
(600, 'J.C. Niemann El Salvador, S.A. de C.V.', 'Final Calle A, N° 124, Colonia Ávila, San Salvador.', NULL, '2279-0191', NULL, NULL, NULL, NULL, 1),
(601, 'Jovenmoda, S.A. de C.V.', 'Paseo General Escalón, Centro Comercial Galerías, #3700, San Salvador.', NULL, '2245-3000', NULL, NULL, NULL, NULL, 1),
(602, 'Julio Omar Ortiz Osoriio', '-', NULL, '2277-9345', NULL, NULL, NULL, NULL, 1),
(603, 'Kuo Hua, S.A. de C.V.', 'Residencial San Luis, Avenida Lincoln, N° 5, San Salvador.', NULL, '2284-2114', NULL, NULL, NULL, NULL, 1),
(604, 'La Cantera, S.A. de C.V.', 'Col. San Benito, Boulevard del Hipódromo, #473, San Salvador.', NULL, '2509-9000', NULL, NULL, NULL, NULL, 1),
(605, 'Laboratorios Arsal, S.A. de C.V.', 'Colonia Modelo, calle Modelo, N° 512, San Salvador.', NULL, '2213-1340', NULL, NULL, NULL, NULL, 1),
(606, 'Laboratorio Carosa, S.A. de C.V.', '-', NULL, '2212-7200', NULL, NULL, NULL, NULL, 1),
(607, 'Laboratorios López, S.A. de C.V.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(608, 'Laboratorios Solaris, S.A. de C.V.', 'Km. 25 y medio, Carretera de San Salvador a Sonsonate.', NULL, '2523-8200', NULL, NULL, NULL, NULL, 1),
(609, 'Laboratorios Suizos, S.A. de C.V.', 'Km. 10, Carretera al Puerto de La Libertad, La Libertad.', NULL, '2500-5555', NULL, NULL, NULL, NULL, 1),
(610, 'Laboratorios Teramed, S.A. de C.V.', '-', NULL, '2248-5100', NULL, NULL, NULL, NULL, 1),
(611, 'Laboratorios Vijosa, S.A. de C.V.', 'C L-3, N 10, Zona Industrial Merliot, Antiguo Cuscatlán, La Libertad.', NULL, '2251-9797', NULL, NULL, NULL, NULL, 1),
(612, 'Laca Laca', '-', NULL, '2508-3040', NULL, NULL, NULL, NULL, 1),
(613, 'Lacteos del Corral, S.A. de C.V.', '-', NULL, '2248-6600', NULL, NULL, NULL, NULL, 1),
(614, 'LGB El Salvador, S.A. de C.V.', 'Colonia Sátelite, Calle Jupiter, Pasaje Sagitario, 1-B, San Salvador.', NULL, '7855-9507\r\n2284-5563', NULL, NULL, NULL, NULL, 1),
(615, 'Livsmart Americas, S.A. de C.V.', 'Km. 27 1/2, Carretera a Sonsonate.', NULL, '2248-5092\r\n7850-1357', NULL, NULL, NULL, NULL, 1),
(616, 'Los Abetos, S.A. de C.V.', '-', NULL, '2271-4757', NULL, NULL, NULL, NULL, 1),
(617, 'Lotería Nacional de Beneficiencia', '-', NULL, '2261-5223', NULL, NULL, NULL, NULL, 1),
(618, 'LTJ El Salvador, S.A. de C.V.', 'Col. Escalón, 99 Ave. Nte y 3ra Calle Ptem N° 5134, San Salvador.', NULL, '-', NULL, NULL, NULL, NULL, 1),
(619, 'Mario Alberto Miranda Fonseca', '-', NULL, '2273-9534', NULL, NULL, NULL, NULL, 1),
(620, 'Mario Johel Durán Morales', 'Residencial Valparaiso Poniente, 2 Calle principal, N° 17, San Salvador.', NULL, '2522-6200', NULL, NULL, NULL, NULL, 1),
(621, 'Marquez Diseño y Topografía, S.A. de C.V.', 'Residencial Ciudad Versailles, Pje 4 Sur, N° 47, Pol. 29, La Libertad', NULL, '2398-1654', NULL, NULL, NULL, NULL, 1),
(622, 'Maquinaria, Agricultura y Tecnología, S.A. de C.V.', '-', NULL, '2564-0520', NULL, NULL, NULL, NULL, 1),
(623, 'Matallana, S.A. de C.V.', 'Prolongación Alam Juan Pablo II, N° 377, San Salvador', NULL, '2133-5600', NULL, NULL, NULL, NULL, 1),
(624, 'Mediprocesos, S.A. de C.V.', 'Col. Flor Blanca, 57 Av. Norte, #201, San Salvador.', NULL, '2526-6800', NULL, NULL, NULL, NULL, 1),
(625, 'Melher, S.A. de C.V.', 'Avenida Ayutuxtepeque 1 BIS, Col. Colinas, Mejicanos, San Salvador.', NULL, '2500-6800', NULL, NULL, NULL, NULL, 1),
(626, 'Meliora, S.A. de C.V.', '-', NULL, '2537-6453', NULL, NULL, NULL, NULL, 1),
(627, 'Metalurgica Sarti, S.A.', '-', NULL, '2281-2022', NULL, NULL, NULL, NULL, 1),
(628, 'Milagro de la Paz Alvarado Castro', '-', NULL, '2519-4698', NULL, NULL, NULL, NULL, 1),
(629, 'Moto Warehouse, S.A.', 'Col. Escalón, Calle José Martí, Bk 132, N° 589, San Salvador.', NULL, '2231-3419', NULL, NULL, NULL, NULL, 1),
(630, 'Movikal, S.A. de C.V.', 'Col. Ávila, Calle El Progreso, N° 3050, San Salvador.', NULL, '2521-7800', NULL, NULL, NULL, NULL, 1),
(631, 'Nacel de El Salvador, S.A. de C.V.', '-', NULL, '7844-8587', NULL, NULL, NULL, NULL, 1),
(632, 'Natura Aceites', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(633, 'Nejapa Power', '-', NULL, '2525-5514', NULL, NULL, NULL, NULL, 1),
(634, 'Nemtex, S.A. de C.V.', 'Colonia San Antonio Abad, 200 mts. Poniente, Redidencial Constitución, San Salvador.', NULL, '2274-4444\r\nExt. 147', NULL, NULL, NULL, NULL, 1),
(635, 'New Employment, S.A. de C.V.', 'Col Escalón, 5a Calle Pte, N° 3970, San Salvador.', NULL, '7832-8480', NULL, NULL, NULL, NULL, 1),
(636, 'Nova & Asociados, S.A. de C.V.', '-', NULL, '2235-5112', NULL, NULL, NULL, NULL, 1),
(637, 'OE System, S.A. de C.V.', 'Carretera Panamericana, Km 10 1/2, Local 1 3 y 5, Edif 2 SISA, Santa Tecla, La Libertad.', NULL, '2201-9100', NULL, NULL, NULL, NULL, 1),
(638, 'Omnisport, S.A. de C.V:', 'Av. España y 23 Calle Poniente, N° 1313, Barrio San Miguelito, San Salvador.', NULL, '2234-0511', NULL, NULL, NULL, NULL, 1),
(639, 'OneLink., S.A. de C.V.', '-', NULL, '2505-5500', NULL, NULL, NULL, NULL, 1),
(640, 'Operadora del Sur, S.A. de C.V.', 'Colonia Escalón, Calle Nueva 1, Calle Nueva 2, San Salvador.', NULL, '2523-6200', NULL, NULL, NULL, NULL, 1),
(641, 'Óptima Consultores, S.A. de C.V.', '91 avenida Norte #515 Colonia Escalón, Centro de Oficinas ABACUS, El Salvador', NULL, '2206-9677', NULL, NULL, NULL, NULL, 1),
(642, 'Outlander Group, S.A. de C.V.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(643, 'Outsource, S.A. de C.V.', '-', NULL, '2530-6020', NULL, NULL, NULL, NULL, 1),
(644, 'Outsourcing Services International, S.A. de C.V.', 'Col. Madre Selva II, Calle Llama del Bosque, Edificio Avante N° 4, Antiguo Cuscatlán, La Libertad.', NULL, '2246-0936', NULL, NULL, NULL, NULL, 1),
(645, 'PAE El Salvador, LTDA de C.V.', '63 Av. Sur, Alameda Roosvelt, Centro Financiero Gigante, Torre C, Colonia Escalón, San Salvador.', NULL, '2530-6020', NULL, NULL, NULL, NULL, 1),
(646, 'Pan Samsil, S.A. de C.V.', 'Colonia Guatemala, 21A Calle oriente, N° 528, San Salvador.', NULL, '2564-6974', NULL, NULL, NULL, NULL, 1),
(647, 'Parques y Jardines de Cuscatlán, S.A. de C.V.', 'Colonia Las Mercedes, Calle Los Eucaliptos, N° 228, San Salvador.', NULL, '2565-1369', NULL, NULL, NULL, NULL, 1),
(648, 'Pastor Mendoza García', '-', NULL, '2272-9635', NULL, NULL, NULL, NULL, 1),
(649, 'PepsiCo, Inc.', '-', NULL, '-', NULL, NULL, NULL, NULL, 1),
(650, 'Procaps, S.A. de C.V.', '-', NULL, '2241-3100', NULL, NULL, NULL, NULL, 1),
(651, 'Producción y Desarrollo, S.A. de C.V.', '-', NULL, '2261-0241\r\n2260-1440', NULL, NULL, NULL, NULL, 1),
(652, 'Productos Alimenticios Bocadeli, S.A. de C.V', 'Col. Sierra Morena, 2 Final Avenida Cerro Verde, Soyapango, San Salvador.', NULL, '2297-9000', NULL, NULL, NULL, NULL, 1),
(653, 'Productos de Poliuretano, S.A. de C.V.', '-', NULL, '2221-0929', NULL, NULL, NULL, NULL, 1),
(654, 'Productos Innovadores Centroamericanos', '-', NULL, '2241-6183', NULL, NULL, NULL, NULL, 1),
(655, 'Productos Institucionales, S.A. de C.V.', '17  Avenida Sur y 14 Calle Oriente, Carretera Al Puerto de', NULL, '2525-1024', NULL, NULL, NULL, NULL, 1),
(656, 'Productos Médico- Farmaceuticos, S.A. de C.V.', '-', NULL, '2212-7200', NULL, NULL, NULL, NULL, 1),
(657, 'Productos Minerales e Industriales, S.A. de C.V.', 'Col. Escalón, 3a Calle Poniente y 87-89 Avenida Norte, N° 9, San Salvador.', NULL, '2234-8200', NULL, NULL, NULL, NULL, 1),
(658, 'Productos Mellow, S.A. de C.V.', 'Colonia Alfa Calle a los Planes, #203, San Salvador.', NULL, '2270-9090', NULL, NULL, NULL, NULL, 1),
(659, 'Promoda, S.A. de C.V.', 'Colonia Escalón, Centro Comercial Galerías, #3700, San Salvador.', NULL, '2245-3000', NULL, NULL, NULL, NULL, 1),
(660, 'Proveedora Eléctrica El Salvador, S.A. de C.V.', 'Col. Flor Blanca, 27 Av. Sur, Pje Palomo N° 108, San Salvador.', NULL, '2248-6704', NULL, NULL, NULL, NULL, 1),
(661, 'Publicaciones Médicas de Centro América, S.A. de C.V.', 'Col. Médicam Blvd. Dr. Héctor Silva, #14, San Salvador.', NULL, '2221-2526', NULL, NULL, NULL, NULL, 1),
(662, 'Publicidad Comercial, S.A. de C.V.', 'Urbanización Madreselva, Avenida El Espino, N° 77, Antiguo Cuscatlán.', NULL, '2244-2222', NULL, NULL, NULL, NULL, 1),
(663, 'Reciclajes, S.A. de C.V.', '-', NULL, '2319-6544', NULL, NULL, NULL, NULL, 1),
(664, 'Reflex, S.A. de C.V.', '-', NULL, '2234-8200', NULL, NULL, NULL, NULL, 1),
(665, 'Research & Planning, S.A. de C.V.', '-', NULL, '2244-2222', NULL, NULL, NULL, NULL, 1),
(666, 'Resortes y Alambres, S.A. de C.V.', '-', NULL, '2241-8500', NULL, NULL, NULL, NULL, 1),
(667, 'RIA de Centroamerica, S.A. de C.V.', 'Boulevard Vijosa, Calle L-3, N° 18, Edificio RIA, Zona Industrial Merliot, La Libertad.', NULL, '2507-2222', NULL, NULL, NULL, NULL, 1),
(668, 'Ricoh El Salvador, S.A. de C.V.', '-', NULL, '2298-0948', NULL, NULL, NULL, NULL, 1),
(669, 'Rysi, S.A. de C.V.', '-', NULL, '2219-5000', NULL, NULL, NULL, NULL, 1),
(670, 'R&M, S.A. de C.V.', '-', NULL, '2211-0105\r\n7606-0693', NULL, NULL, NULL, NULL, 1),
(671, 'Salazar Romero', '-', NULL, '2550-7290', NULL, NULL, NULL, NULL, 1),
(672, 'Salvamedica, S.A. de C.V.', 'Col. Escalón, Calle Fco Gavidia, N° 4-493, San Salvador.', NULL, '2246-7200\r\n2246-7208', NULL, NULL, NULL, NULL, 1),
(673, 'San Vicente 7 Inc Sucursal El Salvador', '-', NULL, '2211-6700', NULL, NULL, NULL, NULL, 1),
(674, 'Saúl Guevara Hernádez', 'Pje Valencia, N° 8 A, Común, Mejicanos, San Salvador.', NULL, '2272-5510', NULL, NULL, NULL, NULL, 1),
(675, 'Save The Children International', '-', NULL, '2565-2100', NULL, NULL, NULL, NULL, 1),
(676, 'Semusal, S.A. de C.V.', '-', NULL, '2338-4788', NULL, NULL, NULL, NULL, 1),
(677, 'Servicios Colón, S.A. de C.V.', 'Km 24, Carretera a Santa Ana, La Libertad.', NULL, '2319-2227', NULL, NULL, NULL, NULL, 1),
(678, 'Servicios de Outsourcing Salvadoreño, S.A. de C.V.', '-', NULL, '2247-6800\r\n7939-8589', NULL, NULL, NULL, NULL, 1),
(679, 'Servicios de Personal, S.A. de C.V.', '-', NULL, '2529-7450', NULL, NULL, NULL, NULL, 1),
(680, 'Servicios Financieros Enlace, S.A. de C.V.', '2da Calle Oriente, N° 4-7, B° San Antonio, Santa Tecla. Una cuadra antes del Parque San Martín, frente a Variedades Génesis.', NULL, '2511-2600', NULL, NULL, NULL, NULL, 1),
(681, 'Servicios Integrados de Centroamerica, S.A. de C.V.', 'Km 9 1/2, Carretera a Comalapa, N° 1-A, San Marcos, San Salvador.', NULL, '2207-5757', NULL, NULL, NULL, NULL, 1),
(682, 'Servilaborales. S.A. de C.V.', '-', NULL, '2209-3100', NULL, NULL, NULL, NULL, 1),
(683, 'Servicios Pulidos y de Limpieza, S.A. de C.V.', 'Col. Jardines de Guadalupe, dentro de las instalacione de UCA, Antiguo Cuscatlán.', NULL, '2523-3594', NULL, NULL, NULL, NULL, 1),
(684, 'Servicios Tecleños, S.A. de C.V.', '-', NULL, '2559-5556', NULL, NULL, NULL, NULL, 1),
(685, 'Servicios y Asociados, S.A. de C.V.', 'Final 75 Avenida Norte N° 32-B, Reparto Santa Leonor, San Salvador.', NULL, '2284-0163', NULL, NULL, NULL, NULL, 1),
(686, 'Sigma, S.A. de C.V.', '-', NULL, '2567-6300', NULL, NULL, NULL, NULL, 1),
(687, 'Sinergica Violante & Tejada Publicidad, S.A. de C.V.', '-', NULL, '2288-1233', NULL, NULL, NULL, NULL, 1),
(688, 'Sistemas Eficientes, S.A. de C.V.', 'Urb. Madre Selva 3, Calle Llama del Bosque pte, local 6-3, Edificio Avante, La Libertad.', NULL, '2528-1000', NULL, NULL, NULL, NULL, 1),
(689, 'Sociedad de Ahorro y Crédito Multivalores', '-', NULL, '2565-1005', NULL, NULL, NULL, NULL, 1),
(690, 'Solís Jímenez, Evilanda Cruz', 'Col. San Rafael, Pje. Melara, N° 4, Cuscatancingo, San Salvador.', NULL, '2204-7280', NULL, NULL, NULL, NULL, 1),
(691, 'Soluciones en Conectividad, S.A. de C.V.', 'Blvd Constitución, N° 504, Colonia Miranda, San Salvador.', NULL, '2521-1900', NULL, NULL, NULL, NULL, 1),
(692, 'Super Repuestos El Salvador', 'Boulevard Constitución, N° 504, Col. Miranda, San Salvador.', NULL, '2239-2000', NULL, NULL, NULL, NULL, 1),
(693, 'SW Inversiones Internacionales de Alimentos, S.A. de C.V.', 'Col. Escalón, Calle Arturo Ambrogi, N° 127, San Salvador.', NULL, '2207-7560', NULL, NULL, NULL, NULL, 1),
(694, 'S & S Group, S.A. de C.V.\r\n\r\nSoluciones & Sistemas Integrales Group, S.A. de C.V.', 'Av. Sierra Nevada, Colonia Miramonte, #814.\r\nDespués de redondel del Colegio García Flamenco para incorporarse a la Sisimiles. Local amarillo, frente ', NULL, '2260-4803\r\n2260-6879', NULL, NULL, NULL, NULL, 1),
(695, 'Sykes El Salvador, LTDA', 'Blvd Los Héroes, Frente al Mundo Feliz, San Salvador.', NULL, '2261-3600', NULL, NULL, NULL, NULL, 1),
(696, 'Tacoplast, S.A. de C.V.', 'Carretera a Occidente, entre Km. 13 y 14, La Libertad.', NULL, '2241-8500\r\n2241-8520', NULL, NULL, NULL, NULL, 1),
(697, 'Tas El Salvador, S.A. de C.V.', '-', NULL, '2209-8700', NULL, NULL, NULL, NULL, 1),
(698, 'Techno Screen, S.A. de C.V.', '-', NULL, '2500-8000', NULL, NULL, NULL, NULL, 1),
(699, 'Tecniseguros, S.A. de C.V', '-', NULL, '2250-7400', NULL, NULL, NULL, NULL, 1),
(700, 'Tecnologías, Equipos, Redes y Automatización, S.A. de C.V.', 'B° San Jacinto, 10 Av. Sur, N° 1252, San Salvador.', NULL, '2270-9947', NULL, NULL, NULL, NULL, 1),
(701, 'Tecnologías Industriales, S.A. de C.V.', '-', NULL, '2226-8362', NULL, NULL, NULL, NULL, 1),
(702, 'Tecnovision, S.A. de C.V.', '-', NULL, '2559-3333', NULL, NULL, NULL, NULL, 1),
(703, 'Tetel, S.A. de C.V.', '-', NULL, '2296-8000', NULL, NULL, NULL, NULL, 1),
(704, 'Textiles La Paz, L.C.C.', 'Km 46 1/2, Carretero a La Herradura, Zona Franca Pedregal, El Rosario, La Paz.', NULL, '2304-2700', NULL, NULL, NULL, NULL, 1),
(705, 'Tigo', 'Campus Tigo N3, Vía del Corso Tuscania, Km 16 CA-4 Zaragoza, La Libertad.', NULL, '7844-3807', NULL, NULL, NULL, NULL, 1),
(706, 'Torogoz S.A. de C.V.', '-', NULL, '2234-7777', NULL, NULL, NULL, NULL, 1),
(707, 'Tortiamigos, S.A. de C.V.', '-', NULL, '2288-1079', NULL, NULL, NULL, NULL, 1),
(708, 'Transactel El Salvador, S.A. de C.V.', '17 Avenid Norte, Cl. Chiltiupan, Centro Comercial Plaza Merliot, La Libertad.', NULL, '2523-8300', NULL, NULL, NULL, NULL, 1),
(709, 'Tubelite Centroamerica, S.A. de C.V.', '-', NULL, '2234-6200', NULL, NULL, NULL, NULL, 1),
(710, 'Tubos y Perfiles Plásticos, S.A. de C.V.', '-', NULL, '2278-1155', NULL, NULL, NULL, NULL, 1),
(711, 'Ubiquity Global Services El Salvador', '-', NULL, '2237-4800', NULL, NULL, NULL, NULL, 1),
(712, 'UDP Consorcio Nippon KOEI LAC-CA2', '87 Av. Norte, N° 604, Edificio Torre Futura, Nivel 14, Local 1, Colonia Escalón, San Salvador.', NULL, '2264-8616\r\n2264-8617', NULL, NULL, NULL, NULL, 1),
(713, 'Ulises Olmedo Sánchez', '2° Av. Nte, N° 1224, Barrio San Miguelito. Parada del Mercado San Miguelito, sentido hacia Mejicanos. Una cuadra al norte, buscar rótulo \"Multilubrica', NULL, '2527-4600', NULL, NULL, NULL, NULL, 1),
(714, 'Unigas de El Salvador, S.A. de C.V.', '-', NULL, '2314-2017', NULL, NULL, NULL, NULL, 1),
(715, 'Unilever El Salvador SCC, S.A. de C.V.', 'Final Avenida Peralta y Novena Calle Oriente, Centro de Producción, San Salvador.', NULL, '2297-8000', NULL, NULL, NULL, NULL, 1),
(716, 'Universidad de El Salvador', 'Ciudad Universitaria, Final de Avenida Héroes y Mártires del 30 de julio, San Salvador.', NULL, '2511-2014', NULL, NULL, NULL, NULL, 1),
(717, 'Universidad Evángelica de El Salvador', '-', NULL, '2275-4000', NULL, NULL, NULL, NULL, 1),
(718, 'Universidad José Simeón Cañas', 'E/Blvd Los Próceres y Col. Jardines de Guadalupe C, San Salvador.', NULL, '2210-6600', NULL, NULL, NULL, NULL, 1),
(719, 'Universidad Pedagógica de El Salvador', '25 Ave. Norte, Col. Medica, Diagonal Dr. Arturo Romero, San Salvador.', NULL, '2205-8100', NULL, NULL, NULL, NULL, 1),
(720, 'Uno El Salvador, S.A.', '-', NULL, '2528-8000\r\nDir.: 252', NULL, NULL, NULL, NULL, 1),
(721, 'U Travel Service, S.A. de C.V.', '-', NULL, '2212-0551', NULL, NULL, NULL, NULL, 1),
(722, 'Variedades Génesis, S.A. de C.V.', '-', NULL, '2262-5116', NULL, NULL, NULL, NULL, 1),
(723, 'Varsity Pro Ltda. De C.V.', '-', NULL, '2404-4600', NULL, NULL, NULL, NULL, 1),
(724, 'Visión Mundial Internacional', 'Avenida Bernal, N° 222, Colonia Las Carmitas, San Salvador.', NULL, '2261-9800', NULL, NULL, NULL, NULL, 1),
(725, 'Zelaya Gavidia Auditores, S.A. de C.V.', '-', NULL, '2660-7917', NULL, NULL, NULL, NULL, 1);

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
  `Genero` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ISSS` varchar(35) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Cargo` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_participante`
--

INSERT INTO `tb_participante` (`DUI`, `Nombre`, `Telefono`, `Email`, `Genero`, `ISSS`, `Cargo`) VALUES
('05756113-8', 'Franklin Alejandro López Ramírez', '7836-3690', 'franklin_lopez@ricaldone.edu.sv', 'Hombre', 'ISSS', 'IT'),
('05756113-9', 'Alejandro Juan', '1223-5646', 'fral_98@outlook.com', 'Hombre', '123465', 'IT'),
('05756117-8', 'López Portillo', '-', 'diego37314@yahoo.com', 'Hombre', 'ISSS', ''),
('1', 'Jennifer Tatiana Menjivar Guerra', '1234-567', 'diego37314@yahoo.com', 'Hombre', '', 'Empleada'),
('10', 'Glenda Xiomara Castro Canales', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('11', 'Jian Carlo Guzmán Ramírez', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('12', 'Oscar Alejandro Medina Calderķn', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('12345678-9', 'Juan Perez', '1234-5678', 'juan_perez@gmail.com', 'Hombre', '1234899', 'Administrativo'),
('13', 'Wendy Carolina Rivera Reyes', '-', 'diego37314@yahoo.com', 'Mujer', '', ''),
('14', 'Julia Regina Wer Cabrera Novales', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('15', 'Saúl Antonio Floes Guardado', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('16', 'Ernesto Antonio Quintanilla Iraheta', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('17', 'Sara Beatriz Cuéllar Hernández', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('18', 'Sandra Elizabeth Campos de Lķpez', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('19', 'Elida Alejandra Murillo Durán', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('2', 'José Antonio Zaldaņa Tiznado', '2278-0457', 'diego37314@yahoo.com', 'Hombre', '', 'IT'),
('20', 'Jonathan Francisco Lķpez Molina', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('21', 'William Alfredo Santamaría Orellana', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('22', 'Daniel Enrique Guevara Hernández', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('3', 'Salvador Heriberto Quintanilla Orellana', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('3232', 'Jennifer Tatiana Menjivar Guerra', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('4', 'Miguel Ángel Jarquín Blanco', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('5', 'Diego Enrique García Orellana', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('6', 'Melvin Renato Santos Guzmán', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('7', 'Jeancarlo Antonio Marroquín', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('8', 'Alexander Alfredo Cruz García', '-', 'diego37314@yahoo.com', 'Hombre', '', ''),
('9', 'Carlos Alberto Aguirre Bautista', '-', 'diego37314@yahoo.com', 'Hombre', '', '');

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
('franklin_lopez', 'Franklin Alejandro López Ramírez', 'franklin_lopez@ricaldone.edu.sv', '$2b$10$gNJzARVTjyIZyzsOvbELcuBNvhVsLauIWyre2Ip79T4GYpmg/UrOS', 0, 1),
('gloria_perez', 'Gloria Haydeé Perez Navarrete', 'gloria_perez@ricaldone.edu.sv', '$2b$10$qLxG2eIeIh9T6xX6b8RCC.846AMSU9tkKviym52zfLbQGvLfa38T6', 0, 1),
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
(104, 612, 'ITR-FCOO-50');

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
(105, '05756113-8', 'ITR-FCOO-50', 612);

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
(26, 'gloria_perez', 30),
(27, 'franklin_lopez', 30),
(28, 'gloria_perez', 29),
(29, 'franklin_lopez', 29);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=726;

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
-- AUTO_INCREMENT de la tabla `union_curso_empresa`
--
ALTER TABLE `union_curso_empresa`
  MODIFY `id_union` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `union_matricula`
--
ALTER TABLE `union_matricula`
  MODIFY `id_matricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `union_programa_usuario`
--
ALTER TABLE `union_programa_usuario`
  MODIFY `id_union` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
