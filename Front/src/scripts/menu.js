console.log("menu.js loaded");

const $db = firebase.firestore();

let articulos = new Array();

$db.collection("articles").onSnapshot(snapshot => {
    snapshot.forEach(element => {
        // console.log({...element.data(), id: element.id});
        articulos.push({...element.data(), id: element.id});
    });

    console.log("Cantidad de articulos: ", articulos.length);
    console.log("Primer articulo desde firebase: ", articulos[0]);

    // debugger
    articulos.forEach(articulo => {
        if(articulo.article == undefined){
            console.error(articulo.id, ": ", articulo.article);
        }
    });

    $('#FondoEditorial-Firebase').DataTable({
        "pageLength": 10,
        data: articulos,
        "columns": [
            { data: "id", "title": "ID"},
            { data: "TÍTULO", "title": "TÍTULO", "className":"dt-center" },
            { data: "ESTADO", "title": "ESTADO" },
            { data: "LÍDER DE LA PUBLICACIÓN", "title": "LÍDER DE LA PUBLICACIÓN" },
            { data: "TIPO DE PUBLICACIÓN", "title": "TIPO DE PUBLICACIÓN" },
            { data: "INSTITUCIÓN EDITORA", "title": "INSTITUCIÓN EDITORA" },
            { data: "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN", "title": "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN" },
            { data: "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD", "title": "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD" },
            { data: "CONVENIO DE COEDICIÓN", "title": "CONVENIO DE COEDICIÓN" },
            { data: "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD", "title": "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD" },
            { data: "SEGUNDO ANÁLISIS DE ORIGINALIDAD", "title": "SEGUNDO ANÁLISIS DE ORIGINALIDAD" },
            { data: "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR", "title": "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR" },
            { data: "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR", "title": "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR" },
            { data: "FINALIZA PRIMERA EVALUACIÓN", "title": "FINALIZA PRIMERA EVALUACIÓN" },
            { data: "FINALIZA SEGUNDA EVALUACIÓN", "title": "FINALIZA SEGUNDA EVALUACIÓN" },
            { data: "FINALIZA TERCERA EVALUACIÓN", "title": "FINALIZA TERCERA EVALUACIÓN" },
            { data: "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES", "title": "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES" },
            { data: "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES", "title": "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES" },
            { data: "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN", "title": "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN" },
            { data: "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES", "title": "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES" },
            { data: "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN", "title": "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN" },
            { data: "INICIO CORRECCIÓN DE ESTILO", "title": "INICIO CORRECCIÓN DE ESTILO" },
            { data: "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO", "title": "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO" },
            { data: "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO", "title": "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO" },
            { data: "SOLICITUD DE DISEÑO", "title": "SOLICITUD DE DISEÑO" },
            { data: "MUESTRA DE CARÁTULA", "title": "MUESTRA DE CARÁTULA" },
            { data: "APROBACIÓN DE CARÁTULA", "title": "APROBACIÓN DE CARÁTULA" },
            { data: "MUESTRA DE CONTENIDO DISEÑADO", "title": "MUESTRA DE CONTENIDO DISEÑADO" },
            { data: "OBSERVACIONES A LAS MUESTRAS", "title": "OBSERVACIONES A LAS MUESTRAS" },
            { data: "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)", "title": "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)" },
            { data: "SOLICITUD DE ISBN", "title": "SOLICITUD DE ISBN" },
            { data: "ASIGNACIÓN DE ISBN", "title": "ASIGNACIÓN DE ISBN" },
            { data: "SOLICITUD DE CATALOGACIÓN", "title": "SOLICITUD DE CATALOGACIÓN" },
            { data: "ASIGNACIÓN DE CATALOGACION", "title": "ASIGNACIÓN DE CATALOGACION" },
            { data: "APROBACIÓN DEL AUTOR", "title": "APROBACIÓN DEL AUTOR" },
            { data: "PUBLICACIÓN", "title": "PUBLICACIÓN" },
            { data: "DEPÓSITOS LEGALES", "title": "DEPÓSITOS LEGALES" },
            { data: "OBSERVACIONES", "title": "OBSERVACIONES" },
            { data: "ACLARACIÓN DE DERECHOS SOBRE LA OBRA", "title": "ACLARACIÓN DE DERECHOS SOBRE LA OBRA" },
            { data: "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)", "title": "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)" },
            { data: "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD", "title": "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD" },
            { data: "FINALIZA CORRECIÓN DE ESTILO", "title": "FINALIZA CORRECIÓN DE ESTILO" },
            { data: "NUEVO TITULO", "title": "NUEVO TITULO" },
            { data: "REMISION DE REVISION", "title": "REMISION DE REVISION" },
            { data: "FECHA LIMITE ENTREGA DE AJUSTES", "title": "FECHA LIMITE ENTREGA DE AJUSTES" },
            { data: "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN", "title": "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN" },
            { data: "OBSERVACIONES DE LOS COEDITORES AL CONTRATO", "title": "OBSERVACIONES DE LOS COEDITORES AL CONTRATO" },
            { data: "CARTA DE DESISTIMIENTO DE BIEN HUMANO", "title": "CARTA DE DESISTIMIENTO DE BIEN HUMANO" },
            { data: "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ", "title": "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ" },
            { data: "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO", "title": "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO" },
            { data: "OBSERVACIONES Y AJUSTES DE CORRECCIÓN", "title": "OBSERVACIONES Y AJUSTES DE CORRECCIÓN" },
            { data: "REUNION ENTRE UNIVERSIDADES", "title": "REUNION ENTRE UNIVERSIDADES" },
            { data: "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL", "title": "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL" },
            { data: "CONSTANCIA DE PUBLICACION", "title": "CONSTANCIA DE PUBLICACION" },
        ],
        aaSorting: [],
        // ordering: false,
        // order: [[0, 'asc']],
        scrollX: true,
        scrollCollapse: true,
        fixedColumns: true,
        "language": {
            "search": "Buscador: ",
            "infoEmpty": "No hay articulos disponibles.",
            "zeroRecords": "No se encontraron registros.",
            "infoFiltered": "(filtrado de _MAX_ articulos totales)",
            "lengthMenu": "Mostrar _MENU_ articulos por pagina.",
            "info": "Mostrando la vista _PAGE_ de _PAGES_.",
            paginate: {
                first: 'Primero',
                previous: 'Anterior',
                next: 'Siguiente',
                last: 'Último'
            }
        }
    })
})
