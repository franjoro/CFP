# Changelog 
    Creación de Changelog a partir de la primera versión estable de la plataforma APP CFP, 1.0.2

    ## [Unreleased]
    - Visualización del historial de cursos de participantes y empresas
    - Al ingresar una solicitud enviar correo a los participantes para verificar validez (PENDIENTE DE APROBACION)


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