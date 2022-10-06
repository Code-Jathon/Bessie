console.log("menu.js loaded");

const $db = firebase.firestore();

let articulos = new Array();

$db.collection("articles").onSnapshot(snapshot => {
    snapshot.forEach(element => {
        articulos.push({...element.data(), id: element.id});
    });
    
    console.log("Cantidad de articulos: ", articulos.length);
    console.log("Primer articulo desde firebase: ", articulos[0].article);
    
    // debugger
    $('#FondoEditorial-Firebase').DataTable({
        "pageLength": 10,
        //dom: 'Bfrtip',
        //buttons: [
        //    'copy', 'csv', 'excel', 'pdf'],
        data: articulos,
        "columns": [
            { data: "id", "title": "ID"},
            { data: "article.TÍTULO", "title": "TÍTULO", "className":"dt-center" },
            { data: "article.ESTADO", "title": "ESTADO" },
            { data: "article.LÍDER DE LA PUBLICACIÓN", "title": "LÍDER DE LA PUBLICACIÓN" },
            { data: "article.TIPO DE PUBLICACIÓN", "title": "TIPO DE PUBLICACIÓN" },
            { data: "article.INSTITUCIÓN EDITORA", "title": "INSTITUCIÓN EDITORA" },
            { data: "article.RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN", "title": "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN" },
            { data: "article.COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD", "title": "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD" },
            { data: "article.CONVENIO DE COEDICIÓN", "title": "CONVENIO DE COEDICIÓN" },
            { data: "article.ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD", "title": "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD" },
            { data: "article.SEGUNDO ANÁLISIS DE ORIGINALIDAD", "title": "SEGUNDO ANÁLISIS DE ORIGINALIDAD" },
            { data: "article.RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR", "title": "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR" },
            { data: "article.RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR", "title": "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR" },
            { data: "article.FINALIZA PRIMERA EVALUACIÓN", "title": "FINALIZA PRIMERA EVALUACIÓN" },
            { data: "article.FINALIZA SEGUNDA EVALUACIÓN", "title": "FINALIZA SEGUNDA EVALUACIÓN" },
            { data: "article.FINALIZA TERCERA EVALUACIÓN", "title": "FINALIZA TERCERA EVALUACIÓN" },
            { data: "article.INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES", "title": "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES" },
            { data: "article.RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES", "title": "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES" },
            { data: "article.RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN", "title": "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN" },
            { data: "article.INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES", "title": "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES" },
            { data: "article.RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN", "title": "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN" },
            { data: "article.INICIO CORRECCIÓN DE ESTILO", "title": "INICIO CORRECCIÓN DE ESTILO" },
            { data: "article.ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO", "title": "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO" },
            { data: "article.ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO", "title": "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO" },
            { data: "article.SOLICITUD DE DISEÑO", "title": "SOLICITUD DE DISEÑO" },
            { data: "article.MUESTRA DE CARÁTULA", "title": "MUESTRA DE CARÁTULA" },
            { data: "article.APROBACIÓN DE CARÁTULA", "title": "APROBACIÓN DE CARÁTULA" },
            { data: "article.MUESTRA DE CONTENIDO DISEÑADO", "title": "MUESTRA DE CONTENIDO DISEÑADO" },
            { data: "article.OBSERVACIONES A LAS MUESTRAS", "title": "OBSERVACIONES A LAS MUESTRAS" },
            { data: "article.REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)", "title": "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)" },
            { data: "article.SOLICITUD DE ISBN", "title": "SOLICITUD DE ISBN" },
            { data: "article.ASIGNACIÓN DE ISBN", "title": "ASIGNACIÓN DE ISBN" },
            { data: "article.SOLICITUD DE CATALOGACIÓN", "title": "SOLICITUD DE CATALOGACIÓN" },
            { data: "article.ASIGNACIÓN DE CATALOGACION", "title": "ASIGNACIÓN DE CATALOGACION" },
            { data: "article.APROBACIÓN DEL AUTOR", "title": "APROBACIÓN DEL AUTOR" },
            { data: "article.PUBLICACIÓN", "title": "PUBLICACIÓN" },
            { data: "article.DEPÓSITOS LEGALES", "title": "DEPÓSITOS LEGALES" },
            { data: "article.OBSERVACIONES", "title": "OBSERVACIONES" },
            { data: "article.ACLARACIÓN DE DERECHOS SOBRE LA OBRA", "title": "ACLARACIÓN DE DERECHOS SOBRE LA OBRA" },
            { data: "article.COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)", "title": "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)" },
            { data: "article.TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD", "title": "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD" },
            { data: "article.FINALIZA CORRECIÓN DE ESTILO", "title": "FINALIZA CORRECIÓN DE ESTILO" },
            { data: "article.NUEVO TITULO", "title": "NUEVO TITULO" },
            { data: "article.REMISION DE REVISION", "title": "REMISION DE REVISION" },
            { data: "article.FECHA LIMITE ENTREGA DE AJUSTES", "title": "FECHA LIMITE ENTREGA DE AJUSTES" },
            { data: "article.ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN", "title": "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN" },
            { data: "article.OBSERVACIONES DE LOS COEDITORES AL CONTRATO", "title": "OBSERVACIONES DE LOS COEDITORES AL CONTRATO" },
            { data: "article.CARTA DE DESISTIMIENTO DE BIEN HUMANO", "title": "CARTA DE DESISTIMIENTO DE BIEN HUMANO" },
            { data: "article.CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ", "title": "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ" },
            { data: "article.CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO", "title": "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO" },
            { data: "article.OBSERVACIONES Y AJUSTES DE CORRECCIÓN", "title": "OBSERVACIONES Y AJUSTES DE CORRECCIÓN" },
            { data: "article.REUNION ENTRE UNIVERSIDADES", "title": "REUNION ENTRE UNIVERSIDADES" },
            { data: "article.ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL", "title": "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL" },
            { data: "article.CONSTANCIA DE PUBLICACION", "title": "CONSTANCIA DE PUBLICACION" },
        ],
        aaSorting: [],
        // ordering: false,
        // order: [[0, 'asc']],
        scrollX: true,
        scrollY: 400,
        //scrollCollapse: true,
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

document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
    // show navbar
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
     // Your code to run since DOM is loaded and ready
    });
