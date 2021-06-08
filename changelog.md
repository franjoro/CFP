# Changelog 
    Creación de Changelog a partir de la primera versión estable de la plataforma APP CFP, 1.0.2

    ## [Unreleased]
    - Visualización del historial de cursos de participantes y empresas
    - Al ingresar una solicitud enviar correo a los participantes para verificar validez (PENDIENTE DE APROBACION)

    ### Bug Fixed
    - Solucionado bug de suma de  horas en modelo de modulos y unidades al cambiar de enteros a duouble
    - Solucionado bug de suma de  horas en cronograma vigente de modulos y unidades al cambiar de enteros a duouble

    ## [1.0.8] - 08/06/2021
    ### Added
    - Funciones de editar carrera y grupos agregada
    - Funcion de deshabilitar los grupos
    - Se agregan más campos de información de grupos y carreras
    - En modelo de cronograma se agrego en la vista la información de horas totales, basicas y de alternancia
    
    ### Changed
    - Cambios de diseño en carrera y grupos
    - Validar estado de modulos y unidades en instructor
    
    ### Database Changes
    * tb_ec_grupo ************************************************************
    - [Add][tb_ec_grupo] Columna de Contrato.
    - [Add][tb_ec_grupo] Columna de Oferta
    - [Add][tb_ec_grupo] Columna de Fecha Inicio
    - [Add][tb_ec_grupo] Columna de Fecha Fin
    - [Change][tb_ec_grupo]    Columna de ID Grupo pasa a ser varchar
    - [Change][tb_ec_alumno]   Columna de ID Grupo pasa a ser varchar
    - [Change][tb_ec_unidades] Columna de ID Grupo pasa a ser varchar
    - [Change][tb_ec_modulos]  Columna de ID Grupo pasa a ser varchar
    - [Add][tb_ec_grupo] Columna de Instructor titular
    - [Add][tb_ec_grupo] Columna de # Garantía
    - [Add][tb_ec_grupo] Columna de Fecha Inicio Garantía
    - [Add][tb_ec_grupo] Columna de Fecha Fin Garantía
    - [Add][tb_ec_grupo] Columna de estado para activar o desactivar el grupo.
    - [Add][tb_ec_grupo] Relación creada en grupos
    * tb_ec_carrera **********************************************************
    - [Add][tb_ec_carrera] Horas Totales = Horas Básicas + Horas de alternancía 
    - [Add][tb_ec_carrera] Horas Básicas 
    - [Add][tb_ec_carrera] Horas de alternancía
    - [Change][tb_ec_modulos]  Columna de ID Carrera pasa a ser varchar
    - [Change][tb_ec_grupos]   Columna de ID Carrera pasa a ser varchar
    - [Change][tb_ec_unidades] Columna de ID Carrera pasa a ser varchar
    * tb_ec_modulos **********************************************************
    - [Change] hora pasa a ser double(5,2)
    - [Change] Estado predeterminado a 1
    * tb_ec_unidades **********************************************************
    - [Change] hora pasa a ser double(5,2)
    - [Change] Estado predeterminado a 1

   
    ## [1.0.71] - 04/06/2021
    ### Bug Fixed
    - Correción de error al entrar a la vista  de instructor sin unidades disponible 

    ## [1.0.7] - 04/06/2021
    ### Added
    - Cronograma gestionando horas agregado en modelo de carreras. 
    - Cronograma vigente gestionando horas. 
    - Agregada opción de editar horas en modelo
    - Creación de role en el JS de Auth para redireccionar a la vista del instructor 
    - Agregada validación de usuario en empresa centro para instructor y administradores
    - Funciones Agregar, eliminar de evaluaciones dependiendo de la unidad 
    - Alerta de evaluaciones no existentes
    - Vista de notas por grupo imprimiendo cada alumno
    - Agregar o editar evaluaciones en las unidades activas para instructores
    - Agregar o editar notas de las evaluaciones en instructores.
    
    ### Changed
    - Agregados trycatch en funciones ec 

    ### Bug Fixed
    - Agregado role de maestros de empresa centro al editar el usuario 

    ## [1.0.6] - 01/06/2021
    ### Added
    - Finalizados las funciones del cronograma vigente Editar eliminar y agregar
    - Agregada vista de instructores de empresa centro
    - Agregada posiblidad de editar instructor en curso 
    - Agregado comentario desde base de datos
    - Envio de correo a empresas para notificar aprobación de documentos

    ### Changed
    - Mejora en las peticiones del gestor de documentos, haciendo las peticiones en una sola promesa
    - El sistema de comentarios ya no utiliza el localstorage para almacenarse, proviene de base de datos

    ## [1.0.50] - 27/05/2021
    ### Added
    - Actualización de funciones del cronograma vigente
    - Activación de unidades en cronograma vigente


    ## [1.0.4] - 26/05/2021
    ### Added
    - Agregada opción de  cronograma modelos para las carreras de ec : modulos, unidades insertar, modificar eliminar en ambos
    - Mejoras en la vista del administrador de grupos y carreras para entender mejor el funcionamiento del modelo de materias
    - Agregado el cronograma  vigente de por grupos de empresa centro
    - El cronograma modelo se duplica en cada grupo creado posterior al modelo
    - Role de usuarios de instructores de empresa centro a Role 2 en base de datos (Unicamente el role y la posibilidad de ingresarlos)
    faltante el ingreso del instructor y lo que veria al ingresar.

    ### Remove
    - Ya no permite ver el JSON en la vista de la administración de grupos

    ### Changed
    - Tabla de alumnos de EC obtiene los datos de columnas y no de json

    ### Bug Fixed
    - Corregido error en la tabla de alumnos de empresa centro 


    ## [1.0.3] - 24/05/2021
    ### Added
    - Vistas de modelo empresa Centro
    
    ### Remove
    - Base de datos
    - Slinter 

    ### Changed
    - Administrador de cursos y grupos de empresa centro
    - Guardar el nombre del alumno de EC en columnas y en JSON para facilitar el proceso de obtener datos y usar la tabla para notas 