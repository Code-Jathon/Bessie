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

//
var filaEliminada; //para capturara la fila eliminada
var filaEditada; //para capturara la fila editada o actualizada

const iconoEditar =
  '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar =
  '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
//

const $db = firebase.firestore();

let articulos = new Array();

var table;

$db.collection("articles").onSnapshot((snapshot) => {
  snapshot.forEach((element) => {
    articulos.push({ ...element.data(), id: element.id });
  });

  console.log("Cantidad de articulos: ", articulos.length);
  console.log("Primer articulo desde firebase: ", articulos[0].article);

  table = $("#FondoEditorial-Firebase").DataTable({
    pageLength: 10,
    data: articulos,
    columns: [
      {
        defaultContent:
          "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" +
          iconoEditar +
          "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" +
          iconoBorrar +
          "</button></div></div>",
        title: "ACCIONES",
      },
      { data: "id", title: "ID" },
      { data: "article.ESTADO", title: "ESTADO" },
      { data: "article.TÍTULO", title: "TÍTULO", className: "dt-center" },
      {
        data: "article.LÍDER DE LA PUBLICACIÓN",
        title: "LÍDER DE LA PUBLICACIÓN",
      },
      { data: "article.TIPO DE PUBLICACIÓN", title: "TIPO DE PUBLICACIÓN" },
      { data: "article.INSTITUCIÓN EDITORA", title: "INSTITUCIÓN EDITORA" },
      {
        data: "article.RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN",
        title: "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN",
      },
      {
        data: "article.COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD",
        title: "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD",
      },
      { data: "article.CONVENIO DE COEDICIÓN", title: "CONVENIO DE COEDICIÓN" },
      {
        data: "article.ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD",
        title: "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD",
      },
      {
        data: "article.SEGUNDO ANÁLISIS DE ORIGINALIDAD",
        title: "SEGUNDO ANÁLISIS DE ORIGINALIDAD",
      },
      {
        data: "article.RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR",
        title: "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR",
      },
      {
        data: "article.RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR",
        title: "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR",
      },
      {
        data: "article.FINALIZA PRIMERA EVALUACIÓN",
        title: "FINALIZA PRIMERA EVALUACIÓN",
      },
      {
        data: "article.FINALIZA SEGUNDA EVALUACIÓN",
        title: "FINALIZA SEGUNDA EVALUACIÓN",
      },
      {
        data: "article.FINALIZA TERCERA EVALUACIÓN",
        title: "FINALIZA TERCERA EVALUACIÓN",
      },
      {
        data: "article.INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES",
        title:
          "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES",
      },
      {
        data: "article.RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES",
        title:
          "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES",
      },
      {
        data: "article.RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN",
        title: "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN",
      },
      {
        data: "article.INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES",
        title:
          "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES",
      },
      {
        data: "article.RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN",
        title:
          "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN",
      },
      {
        data: "article.INICIO CORRECCIÓN DE ESTILO",
        title: "INICIO CORRECCIÓN DE ESTILO",
      },
      {
        data: "article.ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO",
        title: "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO",
      },
      {
        data: "article.ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO",
        title: "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO",
      },
      { data: "article.SOLICITUD DE DISEÑO", title: "SOLICITUD DE DISEÑO" },
      { data: "article.MUESTRA DE CARÁTULA", title: "MUESTRA DE CARÁTULA" },
      {
        data: "article.APROBACIÓN DE CARÁTULA",
        title: "APROBACIÓN DE CARÁTULA",
      },
      {
        data: "article.MUESTRA DE CONTENIDO DISEÑADO",
        title: "MUESTRA DE CONTENIDO DISEÑADO",
      },
      {
        data: "article.OBSERVACIONES A LAS MUESTRAS",
        title: "OBSERVACIONES A LAS MUESTRAS",
      },
      {
        data: "article.REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)",
        title: "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)",
      },
      { data: "article.SOLICITUD DE ISBN", title: "SOLICITUD DE ISBN" },
      { data: "article.ASIGNACIÓN DE ISBN", title: "ASIGNACIÓN DE ISBN" },
      {
        data: "article.SOLICITUD DE CATALOGACIÓN",
        title: "SOLICITUD DE CATALOGACIÓN",
      },
      {
        data: "article.ASIGNACIÓN DE CATALOGACION",
        title: "ASIGNACIÓN DE CATALOGACION",
      },
      { data: "article.APROBACIÓN DEL AUTOR", title: "APROBACIÓN DEL AUTOR" },
      { data: "article.PUBLICACIÓN", title: "PUBLICACIÓN" },
      { data: "article.DEPÓSITOS LEGALES", title: "DEPÓSITOS LEGALES" },
      { data: "article.OBSERVACIONES", title: "OBSERVACIONES" },
      {
        data: "article.ACLARACIÓN DE DERECHOS SOBRE LA OBRA",
        title: "ACLARACIÓN DE DERECHOS SOBRE LA OBRA",
      },
      {
        data: "article.COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)",
        title: "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)",
      },
      {
        data: "article.TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD",
        title: "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD",
      },
      {
        data: "article.FINALIZA CORRECIÓN DE ESTILO",
        title: "FINALIZA CORRECIÓN DE ESTILO",
      },
      { data: "article.NUEVO TITULO", title: "NUEVO TITULO" },
      { data: "article.REMISION DE REVISION", title: "REMISION DE REVISION" },
      {
        data: "article.FECHA LIMITE ENTREGA DE AJUSTES",
        title: "FECHA LIMITE ENTREGA DE AJUSTES",
      },
      {
        data: "article.ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN",
        title: "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN",
      },
      {
        data: "article.OBSERVACIONES DE LOS COEDITORES AL CONTRATO",
        title: "OBSERVACIONES DE LOS COEDITORES AL CONTRATO",
      },
      {
        data: "article.CARTA DE DESISTIMIENTO DE BIEN HUMANO",
        title: "CARTA DE DESISTIMIENTO DE BIEN HUMANO",
      },
      {
        data: "article.CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ",
        title: "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ",
      },
      {
        data: "article.CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO",
        title: "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO",
      },
      {
        data: "article.OBSERVACIONES Y AJUSTES DE CORRECCIÓN",
        title: "OBSERVACIONES Y AJUSTES DE CORRECCIÓN",
      },
      {
        data: "article.REUNION ENTRE UNIVERSIDADES",
        title: "REUNION ENTRE UNIVERSIDADES",
      },
      {
        data: "article.ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL",
        title: "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL",
      },
      {
        data: "article.CONSTANCIA DE PUBLICACION",
        title: "CONSTANCIA DE PUBLICACION",
      },
    ],

    aaSorting: [],
    // ordering: false,
    // order: [[0, 'asc']],
    scrollX: true,
    scrollCollapse: true,
    fixedColumns: true,
    language: {
      search: "Buscador: ",
      infoEmpty: "No hay articulos disponibles.",
      zeroRecords: "No se encontraron registros.",
      infoFiltered: "(filtrado de _MAX_ articulos totales)",
      lengthMenu: "Mostrar _MENU_ articulos por pagina.",
      info: "Mostrando la vista _PAGE_ de _PAGES_.",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último",
      },
    },
  });

  $("#FondoEditorial-Firebase").on("click", ".btnEditar", function () {
    filaEditada = table.row($(this).parents("tr")).data();

    //Obtengo los campos y los comienzo a asignar al respectivo input del modal
    let id = filaEditada.id;
    let estado = filaEditada.article["ESTADO"];
    document.getElementById("1").value = estado;
    let titulo = filaEditada.article["TÍTULO"];
    document.getElementById("2").value = titulo;
    let liderPublicacion = filaEditada.article["LÍDER DE LA PUBLICACIÓN"];
    document.getElementById("3").value = liderPublicacion;
    let tipoPublicacion = filaEditada.article["TIPO DE PUBLICACIÓN"];
    document.getElementById("4").value = tipoPublicacion;
    let institucionEditora = filaEditada.article["INSTITUCIÓN EDITORA"];
    document.getElementById("5").value = institucionEditora;
    let recepcionPropuesta =
      filaEditada.article["RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN"];
    document.getElementById("6").value = recepcionPropuesta;
    let comunicacionAnalisisOriginalidad =
      filaEditada.article["COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD"];
    document.getElementById("7").value = comunicacionAnalisisOriginalidad;
    let convenioCoedicion = filaEditada.article["CONVENIO DE COEDICIÓN"];
    document.getElementById("8").value = convenioCoedicion;
    let archivosAjustados =
      filaEditada.article[
        "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD"
      ];
    document.getElementById("9").value = archivosAjustados;
    let segundoAnalisisOriginalidad =
      filaEditada.article["SEGUNDO ANÁLISIS DE ORIGINALIDAD"];
    document.getElementById("10").value = segundoAnalisisOriginalidad;
    let radiacionContratoPrimerEvaluador =
      filaEditada.article["RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR"];
    document.getElementById("11").value = radiacionContratoPrimerEvaluador;
    let radiacionContratoSegundoEvaluador =
      filaEditada.article["RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR"];
    document.getElementById("12").value = radiacionContratoSegundoEvaluador;
    let finalizaPrimeraEvaluacion =
      filaEditada.article["FINALIZA PRIMERA EVALUACIÓN"];
    document.getElementById("13").value = finalizaPrimeraEvaluacion;
    let finalizaSegundaEvaluacion =
      filaEditada.article["FINALIZA SEGUNDA EVALUACIÓN"];
    document.getElementById("14").value = finalizaSegundaEvaluacion;
    let finalizaTerceraEvaluacion =
      filaEditada.article["FINALIZA TERCERA EVALUACIÓN"];
    document.getElementById("15").value = finalizaTerceraEvaluacion;
    let informeResultadosEval =
      filaEditada.article[
        "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES"
      ];
    document.getElementById("16").value = informeResultadosEval;
    let recepcionArchivosAjustados =
      filaEditada.article[
        "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES"
      ];
    document.getElementById("17").value = recepcionArchivosAjustados;
    let radicacionSolicitud3raEval =
      filaEditada.article[
        "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN"
      ];
    document.getElementById("18").value = radicacionSolicitud3raEval;
    let informeResultadosAcuerdo3Eval =
      filaEditada.article[
        "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES"
      ];
    document.getElementById("19").value = informeResultadosAcuerdo3Eval;
    let recepcionArchivosAjustadosAcuerdoEval3 =
      filaEditada.article[
        "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN"
      ];
    document.getElementById("20").value =
      recepcionArchivosAjustadosAcuerdoEval3;
    let inicioCorrecionEstilo =
      filaEditada.article["INICIO CORRECCIÓN DE ESTILO"];
    document.getElementById("21").value = inicioCorrecionEstilo;
    let entregaLiderCorrecionEstilo =
      filaEditada.article[
        "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO"
      ];
    document.getElementById("22").value = entregaLiderCorrecionEstilo;
    let archivosValidacionCorrecionEstilo =
      filaEditada.article[
        "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO"
      ];
    document.getElementById("23").value = archivosValidacionCorrecionEstilo;
    let solicitudDiseño = filaEditada.article["SOLICITUD DE DISEÑO"];
    document.getElementById("24").value = solicitudDiseño;
    let muestraCaratula = filaEditada.article["MUESTRA DE CARÁTULA"];
    document.getElementById("25").value = muestraCaratula;
    let aprobacionCaratula = filaEditada.article["APROBACIÓN DE CARÁTULA"];
    document.getElementById("26").value = aprobacionCaratula;
    let muestraContenidoDiseñado =
      filaEditada.article["MUESTRA DE CONTENIDO DISEÑADO"];
    document.getElementById("27").value = muestraContenidoDiseñado;
    let observacionesMuestras =
      filaEditada.article["OBSERVACIONES A LAS MUESTRAS"];
    document.getElementById("28").value = observacionesMuestras;
    let revisionEditorial =
      filaEditada.article["REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)"];
    document.getElementById("29").value = revisionEditorial;
    let solicitudISBN = filaEditada.article["SOLICITUD DE ISBN"];
    document.getElementById("30").value = solicitudISBN;
    let asignacionISBN = filaEditada.article["ASIGNACIÓN DE ISBN"];
    document.getElementById("31").value = asignacionISBN;
    let solicitudCatalogacion =
      filaEditada.article["SOLICITUD DE CATALOGACIÓN"];
    document.getElementById("32").value = solicitudCatalogacion;
    let asignacionCatalogacion =
      filaEditada.article["ASIGNACIÓN DE CATALOGACION"];
    document.getElementById("33").value = asignacionCatalogacion;
    let aprobacionAutor = filaEditada.article["APROBACIÓN DEL AUTOR"];
    document.getElementById("34").value = aprobacionAutor;
    let publicacion = filaEditada.article["PUBLICACIÓN"];
    document.getElementById("35").value = publicacion;
    let depositosLegales = filaEditada.article["DEPÓSITOS LEGALES"];
    document.getElementById("36").value = depositosLegales;
    let observaciones = filaEditada.article["OBSERVACIONES"];
    document.getElementById("37").value = observaciones;
    let aclaracionDerechosObra =
      filaEditada.article["ACLARACIÓN DE DERECHOS SOBRE LA OBRA"];
    document.getElementById("38").value = aclaracionDerechosObra;
    let comunicacionAnalisisOriginalidadDespuesAjustes =
      filaEditada.article[
        "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)"
      ];
    document.getElementById("39").value =
      comunicacionAnalisisOriginalidadDespuesAjustes;
    let textoAjustado =
      filaEditada.article[
        "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD"
      ];
    document.getElementById("40").value = textoAjustado;
    let finalizaCorreccionEstilo =
      filaEditada.article["FINALIZA CORRECIÓN DE ESTILO"];
    document.getElementById("41").value = finalizaCorreccionEstilo;
    let nuevoTitulo = filaEditada.article["NUEVO TITULO"];
    document.getElementById("42").value = nuevoTitulo;
    let remisionRevision = filaEditada.article["REMISION DE REVISION"];
    document.getElementById("43").value = remisionRevision;
    let fechaLimiteAjustes =
      filaEditada.article["FECHA LIMITE ENTREGA DE AJUSTES"];
    document.getElementById("44").value = fechaLimiteAjustes;
    let envioBorrador =
      filaEditada.article["ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN"];
    document.getElementById("45").value = envioBorrador;
    let observacionesCoeditoresContrato =
      filaEditada.article["OBSERVACIONES DE LOS COEDITORES AL CONTRATO"];
    document.getElementById("46").value = observacionesCoeditoresContrato;
    let cartaDesistimiento =
      filaEditada.article["CARTA DE DESISTIMIENTO DE BIEN HUMANO"];
    document.getElementById("47").value = cartaDesistimiento;
    let convenioLuisAmigo =
      filaEditada.article[
        "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ"
      ];
    document.getElementById("48").value = convenioLuisAmigo;
    let convenioUniversidades =
      filaEditada.article[
        "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO"
      ];
    document.getElementById("49").value = convenioUniversidades;
    let observacionAjustesCorreccion =
      filaEditada.article["OBSERVACIONES Y AJUSTES DE CORRECCIÓN"];
    document.getElementById("50").value = observacionAjustesCorreccion;
    let reunionUniversidades =
      filaEditada.article["REUNION ENTRE UNIVERSIDADES"];
    document.getElementById("51").value = reunionUniversidades;
    let acuerdoTerminos =
      filaEditada.article[
        "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL"
      ];
    document.getElementById("52").value = acuerdoTerminos;
    let constanciaPublicacion =
      filaEditada.article["CONSTANCIA DE PUBLICACION"];
    document.getElementById("53").value = constanciaPublicacion;

    //Agrego toda la data a un json

    let data = {
      ESTADO: estado,
      TÍTULO: titulo,
      "LIDER DE LA PUBLICACION": liderPublicacion,
      "TIPO DE PUBLICACIÓN": tipoPublicacion,
      "INSTITUCIÓN EDITORA": institucionEditora,
      "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN": recepcionPropuesta,
      "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD":
        comunicacionAnalisisOriginalidad,
      "CONVENIO DE COEDICIÓN": convenioCoedicion,
      "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD":
        archivosAjustados,
      "SEGUNDO ANÁLISIS DE ORIGINALIDAD": segundoAnalisisOriginalidad,
      "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR":
        radiacionContratoPrimerEvaluador,
      "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR":
        radiacionContratoSegundoEvaluador,
      "FINALIZA PRIMERA EVALUACIÓN": finalizaPrimeraEvaluacion,
      "FINALIZA SEGUNDA EVALUACIÓN": finalizaSegundaEvaluacion,
      "FINALIZA TERCERA EVALUACIÓN": finalizaTerceraEvaluacion,
      "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES":
        informeResultadosEval,
      "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES":
        recepcionArchivosAjustados,
      "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN":
        radicacionSolicitud3raEval,
      "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES":
        informeResultadosAcuerdo3Eval,
      "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN":
        recepcionArchivosAjustadosAcuerdoEval3,
      "INICIO CORRECCIÓN DE ESTILO": inicioCorrecionEstilo,
      "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO":
        entregaLiderCorrecionEstilo,
      "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO":
        archivosValidacionCorrecionEstilo,
      "SOLICITUD DE DISEÑO": solicitudDiseño,
      "MUESTRA DE CARÁTULA": muestraCaratula,
      "APROBACIÓN DE CARÁTULA": aprobacionCaratula,
      "MUESTRA DE CONTENIDO DISEÑADO": muestraContenidoDiseñado,
      "OBSERVACIONES A LAS MUESTRAS": observacionesMuestras,
      "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)": revisionEditorial,
      "SOLICITUD DE ISBN": solicitudISBN,
      "ASIGNACIÓN DE ISBN": asignacionISBN,
      "SOLICITUD DE CATALOGACIÓN": solicitudCatalogacion,
      "ASIGNACIÓN DE CATALOGACION": asignacionCatalogacion,
      "APROBACIÓN DEL AUTOR": aprobacionAutor,
      PUBLICACIÓN: publicacion,
      "DEPÓSITOS LEGALES": depositosLegales,
      OBSERVACIONES: observaciones,
      "ACLARACIÓN DE DERECHOS SOBRE LA OBRA": aclaracionDerechosObra,
      "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)":
        comunicacionAnalisisOriginalidadDespuesAjustes,
      "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD": textoAjustado,
      "FINALIZA CORRECIÓN DE ESTILO": finalizaCorreccionEstilo,
      "NUEVO TITULO": nuevoTitulo,
      "REMISION DE REVISION": remisionRevision,
      "FECHA LIMITE ENTREGA DE AJUSTES": fechaLimiteAjustes,
      "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN": envioBorrador,
      "OBSERVACIONES DE LOS COEDITORES AL CONTRATO":
        observacionesCoeditoresContrato,
      "CARTA DE DESISTIMIENTO DE BIEN HUMANO": cartaDesistimiento,
      "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ":
        convenioLuisAmigo,
      "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO":
        convenioUniversidades,
      "OBSERVACIONES Y AJUSTES DE CORRECCIÓN": observacionAjustesCorreccion,
      "REUNION ENTRE UNIVERSIDADES": reunionUniversidades,
      "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL":
        acuerdoTerminos,
      "CONSTANCIA DE PUBLICACION": constanciaPublicacion,
    };

    //Se abre el modal
    modal.style.display = "block";

    document.removeEventListener("submit", onSubmit);

    document.getElementById("update").addEventListener("submit", () => {
      $db.collection("articles").doc(id).update(data);
    });
  });

  $("#FondoEditorial-Firebase").on("click", ".btnBorrar", function () {
    filaEliminada = table.row($(this).parents("tr")).data();

    Swal.fire({
      title: "¿Está seguro de eliminar el producto?",
      text: "¡Está operación no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Borrar",
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
});
