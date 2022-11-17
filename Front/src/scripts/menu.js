// Declaracion de variables
const db = firebase.firestore(); // Conexion a la base de datos
const modalButton = document.getElementById("update");
// Variables gloables, Fila eliminada y fila editada son para capturar la fila que se va a eliminar o editar respectivamente
let modal, table, filaEliminada, filaEditada;

const iconoEditar = `<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`;
const iconoBorrar =`<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`;

// Recoleccion de datos(articulos) de la base de datos
db.collection("articles").get().then((querySnapshot) => {
  // Se almacenaran los articulos
  let articulos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(articulos)

  const columnsCounter = [];
  for (let i = 1; i < 54; i++) {
    columnsCounter.push(i);
  }
  console.log(columnsCounter);

  // Se crea la tabla con todas las columnas de la base de datos
  table = $("#FondoEditorial-Firebase").DataTable({
    pageLength: 10,
    dom: "Bfrtip",
    "buttons": ["copy", "csv", "excel", "pdf", "print"],
    buttons: true,
    data: articulos,
    columns: [
      {
        defaultContent: `<div class='wrapper text-center'>
                            <div class='btn-group'>
                              <button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>
                                ${iconoEditar}
                              </button>
                              <button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>
                                ${iconoBorrar}
                              </button>
                            </div>
                          </div>`,
        title: "ACCIONES",
      },
      { data: "id", title: "ID", visible: false },
      { data: "ESTADO", title: "ESTADO" },
      { data: "TÍTULO", title: "TÍTULO", className: "dt-center" },
      { data: "LÍDER DE LA PUBLICACIÓN", title: "LÍDER DE LA PUBLICACIÓN" },
      { data: "TIPO DE PUBLICACIÓN", title: "TIPO DE PUBLICACIÓN" },
      { data: "INSTITUCIÓN EDITORA", title: "INSTITUCIÓN EDITORA" },
      { data: "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN", title: "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN" },
      { data: "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD", title: "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD" },
      { data: "CONVENIO DE COEDICIÓN", title: "CONVENIO DE COEDICIÓN" },
      { data: "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD", title: "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD" },
      { data: "SEGUNDO ANÁLISIS DE ORIGINALIDAD", title: "SEGUNDO ANÁLISIS DE ORIGINALIDAD" },
      { data: "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR", title: "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR" },
      { data: "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR", title: "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR" },
      { data: "FINALIZA PRIMERA EVALUACIÓN", title: "FINALIZA PRIMERA EVALUACIÓN" },
      { data: "FINALIZA SEGUNDA EVALUACIÓN", title: "FINALIZA SEGUNDA EVALUACIÓN" },
      { data: "FINALIZA TERCERA EVALUACIÓN", title: "FINALIZA TERCERA EVALUACIÓN" },
      { data: "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES", title: "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES" },
      { data: "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES", title: "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES" },
      { data: "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN", title: "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN" },
      { data: "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES", title: "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES" },
      { data: "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN", title: "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN" },
      { data: "INICIO CORRECCIÓN DE ESTILO", title: "INICIO CORRECCIÓN DE ESTILO" },
      { data: "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO", title: "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO" },
      { data: "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO", title: "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO"},
      { data: "SOLICITUD DE DISEÑO", title: "SOLICITUD DE DISEÑO" },
      { data: "MUESTRA DE CARÁTULA", title: "MUESTRA DE CARÁTULA" },
      { data: "APROBACIÓN DE CARÁTULA", title: "APROBACIÓN DE CARÁTULA" },
      { data: "MUESTRA DE CONTENIDO DISEÑADO", title: "MUESTRA DE CONTENIDO DISEÑADO" },
      { data: "OBSERVACIONES A LAS MUESTRAS", title: "OBSERVACIONES A LAS MUESTRAS" },
      { data: "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)", title: "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)" },
      { data: "SOLICITUD DE ISBN", title: "SOLICITUD DE ISBN" },
      { data: "ASIGNACIÓN DE ISBN", title: "ASIGNACIÓN DE ISBN" },
      { data: "SOLICITUD DE CATALOGACIÓN", title: "SOLICITUD DE CATALOGACIÓN" },
      { data: "ASIGNACIÓN DE CATALOGACION", title: "ASIGNACIÓN DE CATALOGACION" },
      { data: "APROBACIÓN DEL AUTOR", title: "APROBACIÓN DEL AUTOR" },
      { data: "PUBLICACIÓN", title: "PUBLICACIÓN" },
      { data: "DEPÓSITOS LEGALES", title: "DEPÓSITOS LEGALES" },
      { data: "OBSERVACIONES", title: "OBSERVACIONES" },
      { data: "ACLARACIÓN DE DERECHOS SOBRE LA OBRA", title: "ACLARACIÓN DE DERECHOS SOBRE LA OBRA" },
      { data: "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)", title: "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)" },
      { data: "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD", title: "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD" },
      { data: "FINALIZA CORRECIÓN DE ESTILO", title: "FINALIZA CORRECIÓN DE ESTILO" },
      { data: "NUEVO TITULO", title: "NUEVO TITULO" },
      { data: "REMISION DE REVISION", title: "REMISION DE REVISION" },
      { data: "FECHA LIMITE ENTREGA DE AJUSTES", title: "FECHA LIMITE ENTREGA DE AJUSTES" },
      { data: "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN", title: "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN" },
      { data: "OBSERVACIONES DE LOS COEDITORES AL CONTRATO", title: "OBSERVACIONES DE LOS COEDITORES AL CONTRATO" },
      { data: "CARTA DE DESISTIMIENTO DE BIEN HUMANO", title: "CARTA DE DESISTIMIENTO DE BIEN HUMANO" },
      { data: "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ", title: "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ" },
      { data: "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO", title: "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO" },
      { data: "OBSERVACIONES Y AJUSTES DE CORRECCIÓN", title: "OBSERVACIONES Y AJUSTES DE CORRECCIÓN" },
      { data: "REUNION ENTRE UNIVERSIDADES", title: "REUNION ENTRE UNIVERSIDADES" },
      { data: "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL", title: "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL" },
      { data: "CONSTANCIA DE PUBLICACION", title: "CONSTANCIA DE PUBLICACION" },
    ],
    "columnDefs": [
      {
        targets: columnsCounter,
          render: function (data) {
            if (data === undefined || data === "") {
              console.log("a");
              return "N/A";
            } else {
              return data;
            }
          },
      }
    ],
    aaSorting: [],
    // ordering: false,
    // order: [[0, 'asc']],
    scrollX: true,
    scrollCollapse: true,
    fixedColumns: true,
    fixedHeader: true,
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
  
  // Agregar un nuevo articulo de la base de datos
  function onSubmit() {
    var dbb = firebase.firestore();
    let data = []; //array para guardar los valores de los campos inputs del form
    //LLAMADO DE LOS ID'S desde el form
    //let id = $.trim($('#id').val());
    let ESTADO = document.getElementById("1").value;
    let TÍTULO = document.getElementById("2").value;
    let LIDER = document.getElementById("3").value;
    let TIPOPUBLI = document.getElementById("4").value;
    let INSTIEDITORA = document.getElementById("5").value;
    let RECEPROPUESTA = document.getElementById("6").value;
    let CDASR = document.getElementById("7").value;
    let CDC = document.getElementById("8").value;
    let AADACE = document.getElementById("9").value;
    let SADO = document.getElementById("10").value;
    let RDSCPE = document.getElementById("11").value;
    let RDSCSE = document.getElementById("12").value;
    let FPE = document.getElementById("13").value;
    let FSE = document.getElementById("14").value;
    let FTE = document.getElementById("15").value;
    let IRVPBE = document.getElementById("16").value;
    let RAAACE = document.getElementById("17").value;
    let RDSCTE = document.getElementById("18").value;
    let IRVCTE = document.getElementById("19").value;
    let RDATE = document.getElementById("20").value;
    let ICE = document.getElementById("21").value;
    let EALACCE = document.getElementById("22").value;
    let ACLVCE = document.getElementById("23").value;
    let SDD = document.getElementById("24").value;
    let MDC = document.getElementById("25").value;
    let ADC = document.getElementById("26").value;
    let MDCD = document.getElementById("27").value;
    let OAM = document.getElementById("28").value;
    let REVE = document.getElementById("29").value;
    let SDI = document.getElementById("30").value;
    let ADI = document.getElementById("31").value;
    let SDC = document.getElementById("32").value;
    let ADCA = document.getElementById("33").value;
    let ADU = document.getElementById("34").value;
    let PUB = document.getElementById("35").value;
    let DL = document.getElementById("36").value;
    let OBS = document.getElementById("37").value;
    let ASLO = document.getElementById("38").value;
    let CDADO = document.getElementById("39").value;
    let TAAPAO = document.getElementById("40").value;
    let FCDE = document.getElementById("41").value;
    let NT = document.getElementById("42").value;
    let RDR = document.getElementById("43").value;
    let FLEDA = document.getElementById("44").value;
    let EBDCDC = document.getElementById("45").value;
    let ODLCAC = document.getElementById("46").value;
    let CDDBH = document.getElementById("47").value;
    let CFPUCLA = document.getElementById("48").value;
    let CFPU = document.getElementById("49").value;
    let OYADC = document.getElementById("50").value;
    let REU = document.getElementById("51").value;
    let ADTDCE = document.getElementById("52").value;
    let CP = document.getElementById("53").value;
    let idFirebase = id;

    data = {
      ESTADO: ESTADO,
      TÍTULO: TÍTULO,
      "LÍDER DE LA PUBLICACIÓN": LIDER,
      "TIPO DE PUBLICACIÓN": TIPOPUBLI,
      "INSTITUCIÓN EDITORA": INSTIEDITORA,
      "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN": RECEPROPUESTA,
      "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD": CDASR,
      "CONVENIO DE COEDICIÓN": CDC,
      "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD": AADACE,
      "SEGUNDO ANÁLISIS DE ORIGINALIDAD": SADO,
      "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR": RDSCPE,
      "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR": RDSCSE,
      "FINALIZA PRIMERA EVALUACIÓN": FPE,
      "FINALIZA SEGUNDA EVALUACIÓN": FSE,
      "FINALIZA TERCERA EVALUACIÓN": FTE,
      "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES": IRVPBE,
      "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES": RAAACE,
      "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN": RDSCTE,
      "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES": IRVCTE,
      "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN": RDATE,
      "INICIO CORRECCIÓN DE ESTILO": ICE,
      "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO": EALACCE,
      "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO": ACLVCE,
      "SOLICITUD DE DISEÑO": SDD,
      "MUESTRA DE CARÁTULA": MDC,
      "APROBACIÓN DE CARÁTULA": ADC,
      "MUESTRA DE CONTENIDO DISEÑADO": MDCD,
      "OBSERVACIONES A LAS MUESTRAS": OAM,
      "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)": REVE,
      "SOLICITUD DE ISBN": SDI,
      "ASIGNACIÓN DE ISBN": ADI,
      "SOLICITUD DE CATALOGACIÓN": SDC,
      "ASIGNACIÓN DE CATALOGACION": ADCA,
      "APROBACIÓN DEL AUTOR": ADU,
      "PUBLICACIÓN": PUB,
      "DEPÓSITOS LEGALES": DL,
      "OBSERVACIONES": OBS,
      "ACLARACIÓN DE DERECHOS SOBRE LA OBRA": ASLO,
      "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)": CDADO,
      "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD": TAAPAO,
      "FINALIZA CORRECIÓN DE ESTILO": FCDE,
      "NUEVO TITULO": NT,
      "REMISION DE REVISION": RDR,
      "FECHA LIMITE ENTREGA DE AJUSTES": FLEDA,
      "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN": EBDCDC,
      "OBSERVACIONES DE LOS COEDITORES AL CONTRATO": ODLCAC,
      "CARTA DE DESISTIMIENTO DE BIEN HUMANO": CDDBH,
      "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ": CFPUCLA,
      "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO": CFPU,
      "OBSERVACIONES Y AJUSTES DE CORRECCIÓN": OYADC,
      "REUNION ENTRE UNIVERSIDADES": REU,
      "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL": ADTDCE,
      "CONSTANCIA DE PUBLICACION": CP,
    };

    //console.log(data)
    // Add a new document with a generated id.
    dbb.collection("articles").add(data).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        console.log(articulos)
        console.log(data)
        data['id'] = docRef.id
        table.row.add(data).draw(true)
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  if (document.getElementById("btnNuevo")) {
    //modalButton.removeEventListener("click", handleUpdate);
    modal = document.getElementById("myModal");

    var btn = document.getElementById("btnNuevo");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    modalButton.addEventListener("click", onSubmit);
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

    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";

    //     body.style.position = "inherit";
    //     body.style.height = "auto";
    //     body.style.overflow = "visible";
    //   }
    // };
  }

  // Actualiza un articulo de la base de datos
  function handleUpdate(id, filaEditada) {
    //Set the doc to update
    let docUpdate = db.collection("articles").doc(id);

    //Get all the values again
    let estado = document.getElementById("1").value;
    let titulo = document.getElementById("2").value;
    let liderPublicacion = document.getElementById("3").value;
    let tipoPublicacion = document.getElementById("4").value;
    let institucionEditora = document.getElementById("5").value;
    let recepcionPropuesta = document.getElementById("6").value;
    let comunicacionAnalisisOriginalidad = document.getElementById("7").value;
    let convenioCoedicion = document.getElementById("8").value;
    let archivosAjustados = document.getElementById("9").value;
    let segundoAnalisisOriginalidad = document.getElementById("10").value;
    let radiacionContratoPrimerEvaluador = document.getElementById("11").value;
    let radiacionContratoSegundoEvaluador = document.getElementById("12").value;
    let finalizaPrimeraEvaluacion = document.getElementById("13").value;
    let finalizaSegundaEvaluacion = document.getElementById("14").value;
    let finalizaTerceraEvaluacion = document.getElementById("15").value;
    let informeResultadosEval = document.getElementById("16").value;
    let recepcionArchivosAjustados = document.getElementById("17").value;
    let radicacionSolicitud3raEval = document.getElementById("18").value;
    let informeResultadosAcuerdo3Eval = document.getElementById("19").value;
    let recepcionArchivosAjustadosAcuerdoEval3 = document.getElementById("20").value;
    let inicioCorrecionEstilo = document.getElementById("21").value;
    let entregaLiderCorrecionEstilo = document.getElementById("22").value;
    let archivosValidacionCorrecionEstilo = document.getElementById("23").value;
    let solicitudDiseño = document.getElementById("24").value;
    let muestraCaratula = document.getElementById("25").value;
    let aprobacionCaratula = document.getElementById("26").value;
    let muestraContenidoDiseñado = document.getElementById("27").value;
    let observacionesMuestras = document.getElementById("28").value;
    let revisionEditorial = document.getElementById("29").value;
    let solicitudISBN = document.getElementById("30").value;
    let asignacionISBN = document.getElementById("31").value;
    let solicitudCatalogacion = document.getElementById("32").value;
    let asignacionCatalogacion = document.getElementById("33").value;
    let aprobacionAutor = document.getElementById("34").value;
    let publicacion = document.getElementById("35").value;
    let depositosLegales = document.getElementById("36").value;
    let observaciones = document.getElementById("37").value;
    let aclaracionDerechosObra = document.getElementById("38").value;
    let comunicacionAnalisisOriginalidadDespuesAjustes = document.getElementById("39").value;
    let textoAjustado = document.getElementById("40").value;
    let finalizaCorreccionEstilo = document.getElementById("41").value;
    let nuevoTitulo = document.getElementById("42").value;
    let remisionRevision = document.getElementById("43").value;
    let fechaLimiteAjustes = document.getElementById("44").value;
    let envioBorrador = document.getElementById("45").value;
    let observacionesCoeditoresContrato = document.getElementById("46").value;
    let cartaDesistimiento = document.getElementById("47").value;
    let convenioLuisAmigo = document.getElementById("48").value;
    let convenioUniversidades = document.getElementById("49").value;
    let observacionAjustesCorreccion = document.getElementById("50").value;
    let reunionUniversidades = document.getElementById("51").value;
    let acuerdoTerminos = document.getElementById("52").value;
    let constanciaPublicacion = document.getElementById("53").value;

    //Agrego toda la data a un json
    let data = {
      id:id,
      "ESTADO": estado,
      "TÍTULO": titulo,
      "LÍDER DE LA PUBLICACIÓN": liderPublicacion,
      "TIPO DE PUBLICACIÓN": tipoPublicacion,
      "INSTITUCIÓN EDITORA": institucionEditora,
      "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN": recepcionPropuesta,
      "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD": comunicacionAnalisisOriginalidad,
      "CONVENIO DE COEDICIÓN": convenioCoedicion,
      "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD": archivosAjustados,
      "SEGUNDO ANÁLISIS DE ORIGINALIDAD": segundoAnalisisOriginalidad,
      "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR": radiacionContratoPrimerEvaluador,
      "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR": radiacionContratoSegundoEvaluador,
      "FINALIZA PRIMERA EVALUACIÓN": finalizaPrimeraEvaluacion,
      "FINALIZA SEGUNDA EVALUACIÓN": finalizaSegundaEvaluacion,
      "FINALIZA TERCERA EVALUACIÓN": finalizaTerceraEvaluacion,
      "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES": informeResultadosEval,
      "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES": recepcionArchivosAjustados,
      "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN": radicacionSolicitud3raEval,
      "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES": informeResultadosAcuerdo3Eval,
      "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN": recepcionArchivosAjustadosAcuerdoEval3,
      "INICIO CORRECCIÓN DE ESTILO": inicioCorrecionEstilo,
      "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO": entregaLiderCorrecionEstilo,
      "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO": archivosValidacionCorrecionEstilo,
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
      "PUBLICACIÓN": publicacion,
      "DEPÓSITOS LEGALES": depositosLegales,
      "OBSERVACIONES": observaciones,
      "ACLARACIÓN DE DERECHOS SOBRE LA OBRA": aclaracionDerechosObra,
      "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)": comunicacionAnalisisOriginalidadDespuesAjustes,
      "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD": textoAjustado,
      "FINALIZA CORRECIÓN DE ESTILO": finalizaCorreccionEstilo,
      "NUEVO TITULO": nuevoTitulo,
      "REMISION DE REVISION": remisionRevision,
      "FECHA LIMITE ENTREGA DE AJUSTES": fechaLimiteAjustes,
      "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN": envioBorrador,
      "OBSERVACIONES DE LOS COEDITORES AL CONTRATO": observacionesCoeditoresContrato,
      "CARTA DE DESISTIMIENTO DE BIEN HUMANO": cartaDesistimiento,
      "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ": convenioLuisAmigo,
      "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO": convenioUniversidades,
      "OBSERVACIONES Y AJUSTES DE CORRECCIÓN": observacionAjustesCorreccion,
      "REUNION ENTRE UNIVERSIDADES": reunionUniversidades,
      "ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL": acuerdoTerminos,
      "CONSTANCIA DE PUBLICACION": constanciaPublicacion,
    };

    return docUpdate
      .update(data)
      .then(() => console.log("Doc successfully updated", id))
      .then(() => table.row(filaEditada).data(data).draw())
      .then(() => (modal.style.display = "none"))
      .catch((e) => console.log("Error: ", e));
  }

  $("#FondoEditorial-Firebase").on("click", ".btnEditar", function () {
    modalButton.removeEventListener("click", onSubmit);
    filaEditada = table.row($(this).parents("tr")).data();
    //Obtengo los campos y los comienzo a asignar al respectivo input del modal
    let id = filaEditada.id;
    let estado = filaEditada["ESTADO"];
    document.getElementById("1").value = estado;

    let titulo = filaEditada["TÍTULO"];
    document.getElementById("2").value = titulo;

    let liderPublicacion = filaEditada["LÍDER DE LA PUBLICACIÓN"];
    document.getElementById("3").value = liderPublicacion;

    let tipoPublicacion = filaEditada["TIPO DE PUBLICACIÓN"];
    document.getElementById("4").value = tipoPublicacion;

    let institucionEditora = filaEditada["INSTITUCIÓN EDITORA"];
    document.getElementById("5").value = institucionEditora;

    let recepcionPropuesta = filaEditada["RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN"];
    document.getElementById("6").value = recepcionPropuesta;

    let comunicacionAnalisisOriginalidad = filaEditada["COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD"];
    document.getElementById("7").value = comunicacionAnalisisOriginalidad;

    let convenioCoedicion = filaEditada["CONVENIO DE COEDICIÓN"];
    document.getElementById("8").value = convenioCoedicion;

    let archivosAjustados = filaEditada["ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD"];
    document.getElementById("9").value = archivosAjustados;

    let segundoAnalisisOriginalidad = filaEditada["SEGUNDO ANÁLISIS DE ORIGINALIDAD"];
    document.getElementById("10").value = segundoAnalisisOriginalidad;

    let radiacionContratoPrimerEvaluador = filaEditada["RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR"];
    document.getElementById("11").value = radiacionContratoPrimerEvaluador;

    let radiacionContratoSegundoEvaluador = filaEditada["RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR"];
    document.getElementById("12").value = radiacionContratoSegundoEvaluador;

    let finalizaPrimeraEvaluacion = filaEditada["FINALIZA PRIMERA EVALUACIÓN"];
    document.getElementById("13").value = finalizaPrimeraEvaluacion;

    let finalizaSegundaEvaluacion = filaEditada["FINALIZA SEGUNDA EVALUACIÓN"];
    document.getElementById("14").value = finalizaSegundaEvaluacion;

    let finalizaTerceraEvaluacion = filaEditada["FINALIZA TERCERA EVALUACIÓN"];
    document.getElementById("15").value = finalizaTerceraEvaluacion;

    let informeResultadosEval = filaEditada[ "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES"];
    document.getElementById("16").value = informeResultadosEval;

    let recepcionArchivosAjustados = filaEditada[ "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES"];
    document.getElementById("17").value = recepcionArchivosAjustados;

    let radicacionSolicitud3raEval = filaEditada["RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN"];
    document.getElementById("18").value = radicacionSolicitud3raEval;

    let informeResultadosAcuerdo3Eval = filaEditada["INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES"];
    document.getElementById("19").value = informeResultadosAcuerdo3Eval;

    let recepcionArchivosAjustadosAcuerdoEval3 = filaEditada["RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN"];
    document.getElementById("20").value = recepcionArchivosAjustadosAcuerdoEval3;

    let inicioCorrecionEstilo = filaEditada["INICIO CORRECCIÓN DE ESTILO"];
    document.getElementById("21").value = inicioCorrecionEstilo;

    let entregaLiderCorrecionEstilo = filaEditada["ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO"];
    document.getElementById("22").value = entregaLiderCorrecionEstilo;

    let archivosValidacionCorrecionEstilo = filaEditada["ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO"];
    document.getElementById("23").value = archivosValidacionCorrecionEstilo;

    let solicitudDiseño = filaEditada["SOLICITUD DE DISEÑO"];
    document.getElementById("24").value = solicitudDiseño;

    let muestraCaratula = filaEditada["MUESTRA DE CARÁTULA"];
    document.getElementById("25").value = muestraCaratula;

    let aprobacionCaratula = filaEditada["APROBACIÓN DE CARÁTULA"];
    document.getElementById("26").value = aprobacionCaratula;

    let muestraContenidoDiseñado = filaEditada["MUESTRA DE CONTENIDO DISEÑADO"];
    document.getElementById("27").value = muestraContenidoDiseñado;

    let observacionesMuestras = filaEditada["OBSERVACIONES A LAS MUESTRAS"];
    document.getElementById("28").value = observacionesMuestras;

    let revisionEditorial = filaEditada["REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)"];
    document.getElementById("29").value = revisionEditorial;

    let solicitudISBN = filaEditada["SOLICITUD DE ISBN"];
    document.getElementById("30").value = solicitudISBN;

    let asignacionISBN = filaEditada["ASIGNACIÓN DE ISBN"];
    document.getElementById("31").value = asignacionISBN;

    let solicitudCatalogacion = filaEditada["SOLICITUD DE CATALOGACIÓN"];
    document.getElementById("32").value = solicitudCatalogacion;

    let asignacionCatalogacion = filaEditada["ASIGNACIÓN DE CATALOGACION"];
    document.getElementById("33").value = asignacionCatalogacion;

    let aprobacionAutor = filaEditada["APROBACIÓN DEL AUTOR"];
    document.getElementById("34").value = aprobacionAutor;

    let publicacion = filaEditada["PUBLICACIÓN"];
    document.getElementById("35").value = publicacion;

    let depositosLegales = filaEditada["DEPÓSITOS LEGALES"];
    document.getElementById("36").value = depositosLegales;

    let observaciones = filaEditada["OBSERVACIONES"];
    document.getElementById("37").value = observaciones;

    let aclaracionDerechosObra = filaEditada["ACLARACIÓN DE DERECHOS SOBRE LA OBRA"];
    document.getElementById("38").value = aclaracionDerechosObra;

    let comunicacionAnalisisOriginalidadDespuesAjustes = filaEditada["COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)"];
    document.getElementById("39").value = comunicacionAnalisisOriginalidadDespuesAjustes;

    let textoAjustado = filaEditada["TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD"];
    document.getElementById("40").value = textoAjustado;

    let finalizaCorreccionEstilo = filaEditada["FINALIZA CORRECIÓN DE ESTILO"];
    document.getElementById("41").value = finalizaCorreccionEstilo;

    let nuevoTitulo = filaEditada["NUEVO TITULO"];
    document.getElementById("42").value = nuevoTitulo;

    let remisionRevision = filaEditada["REMISION DE REVISION"];
    document.getElementById("43").value = remisionRevision;

    let fechaLimiteAjustes = filaEditada["FECHA LIMITE ENTREGA DE AJUSTES"];
    document.getElementById("44").value = fechaLimiteAjustes;

    let envioBorrador = filaEditada["ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN"];
    document.getElementById("45").value = envioBorrador;

    let observacionesCoeditoresContrato = filaEditada["OBSERVACIONES DE LOS COEDITORES AL CONTRATO"];
    document.getElementById("46").value = observacionesCoeditoresContrato;

    let cartaDesistimiento = filaEditada["CARTA DE DESISTIMIENTO DE BIEN HUMANO"];
    document.getElementById("47").value = cartaDesistimiento;

    let convenioLuisAmigo = filaEditada["CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ"];
    document.getElementById("48").value = convenioLuisAmigo;

    let convenioUniversidades = filaEditada["CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO"];
    document.getElementById("49").value = convenioUniversidades;

    let observacionAjustesCorreccion = filaEditada["OBSERVACIONES Y AJUSTES DE CORRECCIÓN"];
    document.getElementById("50").value = observacionAjustesCorreccion;

    let reunionUniversidades = filaEditada["REUNION ENTRE UNIVERSIDADES"];
    document.getElementById("51").value = reunionUniversidades;

    let acuerdoTerminos = filaEditada["ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL"];
    document.getElementById("52").value = acuerdoTerminos;

    let constanciaPublicacion = filaEditada["CONSTANCIA DE PUBLICACION"];
    document.getElementById("53").value = constanciaPublicacion;

    filaEditada = table.row($(this).parents("tr"));
    fila = filaEditada[0][0]

    //Agrego toda la data a un json
    //Se abre el modal
    modal.style.display = "block";

    // document.removeEventListener("click", onSubmit());
    modalButton.addEventListener("click", () => handleUpdate(id, fila));
  });

  // Elimina el articulo de la base de datos
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
        db
          .collection("articles")
          .doc(`${filaEliminada?.id}`)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .then(() => {
            filaEditada = table.row($(this).parents("tr"));
            fila = filaEditada[0][0]
            table.row(fila).remove().draw();
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
        //console.log(data);
      }
    });
  });
});
