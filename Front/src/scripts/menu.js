//JS MODAL

let modal;

if (document.getElementById("btnNuevo")) {
    modal = document.getElementById("myModal");
    var btn = document.getElementById("btnNuevo");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function () {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    };

    span.onclick = function () {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    };
}
//JS MODAL FIN
console.log("menu.js loaded");
var filaEliminada; //para capturara la fila eliminada
var filaEditada; //para capturara la fila editada o actualizada
const $db = firebase.firestore();
const iconoEditar =
    '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar =
    '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
//
var table
let articulos = new Array();

$db.collection("articles").onSnapshot(snapshot => {
    snapshot.forEach(element => {
        articulos.push({...element.data(), id: element.id});
    });

    console.log("Cantidad de articulos: ", articulos.length);
    console.log("Primer articulo desde firebase: ", articulos[0]);

    // debugger
    
    table = $('#FondoEditorial-Firebase').DataTable({
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
            {
                defaultContent:
                    "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" +
                    iconoEditar +
                    "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" +
                    iconoBorrar +
                    "</button></div></div>",
                title: "ACCIONES",
            },
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

$("#FondoEditorial-Firebase").on("click", ".btnBorrar", function () {
    filaEliminada = table.row($(this).parents("tr")).data();

    Swal.fire({
        title: "¿Está seguro de eliminar el artículo    ?",
        text: "¡Está operación no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            $db
                .collection("articles")
                .doc(`${filaEliminada?.id}`)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
            //console.log(data);
        }
    });
});
