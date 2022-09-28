$(document).ready(() => {
  const db = firebase.firestore();

  const getData = async () => {
    const daticos = [];
    return await db
      .collection("articles")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          daticos.push(doc.data().article);
        });
      })  
      .then(() => daticos);
  };

 

  const iconoEditar =
    '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
  const iconoBorrar =
    '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

  function mostrarProductos(data) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${data?.ESTADO}</td>
    <td>${data?.["TÍTULO"]}</td>
    <td>${data?.["LIDER DE LA PUBLICACIÓN"]}</td>
    <td>${data?.["TIPO DE PUBLICACIÓN"]}</td>
    <td>${data?.["INSTITUCIÓN EDITORA"]}</td>
    <td>${data?.["RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN"]}</td>
    <td>${data?.["COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD"]}</td>
    <td>${data?.["CONVENIO DE COEDICIÓN"]}</td>
    <td>${data?.["ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD"]}</td>
    <td>${data?.["SEGUNDO ANÁLISIS DE ORIGINALIDAD"]}</td>
    <td>${data?.["RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR"]}</td>
    <td>${data?.["RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR"]}</td>
    <td>${data?.["FINALIZA PRIMERA EVALUACIÓN"]}</td>
    <td>${data?.["FINALIZA SEGUNDA EVALUACIÓN"]}</td>
    <td>${data?.["FINALIZA TERCERA EVALUACIÓN"]}</td>
    <td>${data?.["INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES"]}</td>
    <td>${data?.["RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES"]}</td>
    <td>${data?.["RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN"]}</td>
    <td>${data?.["INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES"]}</td>
    <td>${data?.["RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN"]}</td>
    <td>${data?.["INICIO CORRECCIÓN DE ESTILO"]}</td>
    <td>${data?.["ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO"]}</td>
    <td>${data?.["ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO"]}</td>
    <td>${data?.["SOLICITUD DE DISEÑO"]}</td>
    <td>${data?.["MUESTRA DE CARÁTULA"]}</td>
    <td>${data?.["APROBACIÓN DE CARÁTULA"]}</td>
    <td>${data?.["MUESTRA DE CONTENIDO DISEÑADO"]}</td>
    <td>${data?.["OBSERVACIONES A LAS MUESTRAS"]}</td>
    <td>${data?.["REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)"]}</td>
    <td>${data?.["SOLICITUD DE ISBN"]}</td>
    <td>${data?.["ASIGNACIÓN DE ISBN"]}</td>
    <td>${data?.["SOLICITUD DE CATALOGACIÓN"]}</td>
    <td>${data?.["ASIGNACIÓN DE CATALOGACION"]}</td>
    <td>${data?.["APROBACIÓN DEL AUTOR"]}</td>
    <td>${data?.["SEGUNDO ANÁLISIS DE ORIGINALIDAD"]}</td>
    <td>${data?.["PUBLICACIÓN"]}</td>
    <td>${data?.["DEPÓSITOS LEGALES"]}</td>
    <td>${data?.["OBSERVACIONES"]}</td>
    <td>${data?.["ACLARACIÓN DE DERECHOS SOBRE LA OBRA"]}</td>
    <td>${data?.["COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)"]}</td>
    <td>${data?.["TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD"]}</td>
    <td>${data?.["FINALIZA CORRECIÓN DE ESTILO"]}</td>
    <td>${data?.["NUEVO TITULO"]}</td>
    <td>${data?.["REMISION DE REVISION"]}</td>
    <td>${data?.["FECHA LIMITE ENTREGA DE AJUSTES"]}</td>
    <td>${data?.["ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN"]}</td>
    <td>${data?.["OBSERVACIONES DE LOS COEDITORES AL CONTRATO"]}</td>
    <td>${data?.["CARTA DE DESISTIMIENTO DE BIEN HUMANO"]}</td>
    <td>${data?.["CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ"]}</td>
    <td>${data?.["CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO"]}</td>
    <td>${data?.["OBSERVACIONES Y AJUSTES DE CORRECCIÓN"]}</td>
    <td>${data?.["REUNION ENTRE UNIVERSIDADES"]}</td>
    <td>${data?.["ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL"]}</td>
    
    <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${iconoEditar}</button><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${iconoBorrar}</button></td>
    `;

    document.getElementById("tBody").appendChild(tr);
  }

  (async () => {
    const data = await getData();
    console.log(data);
    const bodyArticles = $("#tBody").val();

    data.map((d) => {
      mostrarProductos(d);
    });
    //Todos los campos
    //table para pagination
    let table = $("mydatatable").DataTable({
      pageLength: 5,
      lengthMenu: [
        [5, 10, 20, -1],
        [5, 10, 20, "Todos"],
      ],
      data: data,
      columnDefs: [
        {
          targets: [0],
          visible: true,
        },
        {
          targets: -1,
          defaultContent:
            "<div class='wrapper text-center'> <div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tootip'>Editar</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip'>Borrar</button></div></div></div>",
        },
      ],
    });
  })();
});

const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

//JS MODAL
if(document.getElementById("btnNuevo")){
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("btnNuevo");
  var span = document.getElementsByClassName("close")[0];
  var body = document.getElementsByTagName("body")[0];

  btn.onclick = function() {
    modal.style.display = "block";

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
  }
  
  span.onclick = function() {
    modal.style.display = "none";

    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
  }

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  }

}
//JS MODAL
////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES FIREBASE

var db =firebase.database();

var coleccionProductos = db.ref().child("articles");


coleccionProductos.on("child_added", datos => {    ///AGREGAR    
  dataSet = [datos.key, datos.child("1").val(), datos.child("2").val(), datos.child("3").val(), datos.child("4").val(),
  datos.child("5").val(), datos.child("6").val(), datos.child("7").val(), datos.child("8").val(), datos.child("9").val(),
  datos.child("10").val(), datos.child("11").val(), datos.child("12").val(), datos.child("13").val(), datos.child("14").val(),
  datos.child("15").val(), datos.child("16").val(), datos.child("17").val(), datos.child("18").val(), datos.child("19").val(),
  datos.child("20").val(), datos.child("21").val(), datos.child("22").val(), datos.child("23").val(), datos.child("24").val(),
  datos.child("25").val(), datos.child("26").val(), datos.child("27").val(), datos.child("28").val(), datos.child("29").val(),
  datos.child("30").val(), datos.child("31").val(), datos.child("32").val(), datos.child("33").val(), datos.child("34").val(),
  datos.child("35").val(), datos.child("36").val(), datos.child("37").val(), datos.child("38").val(), datos.child("39").val(),
  datos.child("40").val(), datos.child("41").val(), datos.child("42").val(), datos.child("43").val(), datos.child("44").val(),
  datos.child("45").val(), datos.child("46").val(), datos.child("47").val(), datos.child("48").val(), datos.child("49").val(),
  datos.child("50").val(), datos.child("51").val(), datos.child("52").val(), datos.child("53").val()];
  table.rows.add([dataSet]).draw();
});


coleccionProductos.on('child_changed', datos => {    //ACTUALIZAR/EDITAR        
  dataSet = [datos.key, datos.child("1").val(), datos.child("2").val(), datos.child("3").val(), datos.child("4").val(),
  datos.child("5").val(), datos.child("6").val(), datos.child("7").val(), datos.child("8").val(), datos.child("9").val(),
  datos.child("10").val(), datos.child("11").val(), datos.child("12").val(), datos.child("13").val(), datos.child("14").val(),
  datos.child("15").val(), datos.child("16").val(), datos.child("17").val(), datos.child("18").val(), datos.child("19").val(),
  datos.child("20").val(), datos.child("21").val(), datos.child("22").val(), datos.child("23").val(), datos.child("24").val(),
  datos.child("25").val(), datos.child("26").val(), datos.child("27").val(), datos.child("28").val(), datos.child("29").val(),
  datos.child("30").val(), datos.child("31").val(), datos.child("32").val(), datos.child("33").val(), datos.child("34").val(),
  datos.child("35").val(), datos.child("36").val(), datos.child("37").val(), datos.child("38").val(), datos.child("39").val(),
  datos.child("40").val(), datos.child("41").val(), datos.child("42").val(), datos.child("43").val(), datos.child("44").val(),
  datos.child("45").val(), datos.child("46").val(), datos.child("47").val(), datos.child("48").val(), datos.child("49").val(),
  datos.child("50").val(), datos.child("51").val(), datos.child("52").val(), datos.child("53").val()];
  table.row(filaEditada).data(dataSet).draw();
});

coleccionProductos.on("child_removed", function() { //ELIMINAR
  table.row(filaEliminada.parents('tr')).remove().draw();                     
});



$('form').submit(function(e){                         
  e.preventDefault();
  let id = $.trim($('#id').val());      
  let ESTADO = $.trim($('#1').val());
  let TÍTULO = $.trim($('#2').val());         
  let LIDER= $.trim($('#3').val());
  let TIPOPUBLI = $.trim($('#4').val());
  let INSTIEDITORA = $.trim($('#5').val());
  let RECEPROPUESTA = $.trim($('#6').val());
  let CDASR = $.trim($('#7').val());
  let CDC = $.trim($('#8').val());
  let AADACE = $.trim($('#9').val());
  let SADO = $.trim($('#10').val());
  let RDSCPE = $.trim($('#11').val());
  let RDSCSE = $.trim($('#12').val());
  let FPE = $.trim($('#13').val());
  let FSE = $.trim($('#14').val());
  let FTE = $.trim($('#15').val());
  let IRVPBE = $.trim($('#16').val());
  let RAAACE = $.trim($('#17').val());
  let RDSCTE = $.trim($('#18').val());
  let IRVCTE = $.trim($('#19').val());
  let RDATE = $.trim($('#20').val());
  let ICE = $.trim($('#21').val());
  let EALACCE = $.trim($('#22').val());
  let ACLVCE = $.trim($('#23').val());
  let SDD = $.trim($('#24').val());
  let MDC = $.trim($('#25').val());
  let ADC = $.trim($('#26').val());
  let MDCD = $.trim($('#27').val());
  let OAM = $.trim($('#28').val());
  let REVE = $.trim($('#29').val());
  let SDI = $.trim($('#30').val());
  let ADI = $.trim($('#31').val());
  let SDC = $.trim($('#32').val());
  let ADCA = $.trim($('#33').val());
  let ADU = $.trim($('#34').val());
  let SADOR = $.trim($('#35').val());
  let PUB = $.trim($('#36').val());
  let DL = $.trim($('#37').val());
  let OBS = $.trim($('#38').val());
  let ASLO = $.trim($('#39').val());
  let CDADO = $.trim($('#40').val());
  let TAAPAO = $.trim($('#41').val());
  let FCDE = $.trim($('#42').val());
  let NT = $.trim($('#43').val());
  let RDR = $.trim($('#44').val());
  let FLEDA = $.trim($('#45').val());
  let EBDCDC = $.trim($('#46').val());
  let ODLCAC = $.trim($('#47').val());
  let CDDBH = $.trim($('#48').val());
  let CFPUCLA = $.trim($('#49').val());                        
  let CFPU = $.trim($('#50').val());
  let OYADC = $.trim($('#51').val());
  let REU = $.trim($('#52').val());
  let ADTDCE = $.trim($('#53').val());
  let idFirebase = id;        
  if (idFirebase == ''){                      
      idFirebase = coleccionProductos.push().key;
  };                
  data = {"ESTADO":ESTADO, "TÍTULO":TÍTULO, "LIDER DE LA PUBLICACION":LIDER, "TIPO DE PUBLICACIÓN":TIPOPUBLI, "INSTITUCIÓN EDITORA":INSTIEDITORA,
 "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN":RECEPROPUESTA, "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD":CDASR,
 "CONVENIO DE COEDICIÓN":CDC, "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD":AADACE, "SEGUNDO ANÁLISIS DE ORIGINALIDAD": SADO,
 "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR":RDSCPE,"RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR": RDSCSE, "FINALIZA PRIMERA EVALUACIÓN":FPE,
 "FINALIZA SEGUNDA EVALUACIÓN":FSE, "FINALIZA TERCERA EVALUACIÓN":FTE,"INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES":IRVPBE,
 "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES":RAAACE, "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN":RDSCTE,
 "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES":IRVCTE, "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN":RDATE,
 "INICIO CORRECCIÓN DE ESTILO":ICE, "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO":EALACCE, "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO": ACLVCE,
 "SOLICITUD DE DISEÑO":SDD,"MUESTRA DE CARÁTULA":MDC,"APROBACIÓN DE CARÁTULA":ADC, "MUESTRA DE CONTENIDO DISEÑADO":MDCD, "OBSERVACIONES A LAS MUESTRAS":OAM,
 "REVISIÓN EDITORIAL (VERIFICACIÓN EDITORIAL)":REVE,"SOLICITUD DE ISBN":SDI, "ASIGNACIÓN DE ISBN":ADI, "SOLICITUD DE CATALOGACIÓN":SDC, "ASIGNACIÓN DE CATALOGACION":ADCA,
 "APROBACIÓN DEL AUTOR":ADU, "SEGUNDO ANÁLISIS DE ORIGINALIDAD":SADOR, "PUBLICACION":PUB, "DEPÓSITOS LEGALES":DL,"OBSERVACIONES": OBS, "ACLARACIÓN DE DERECHOS SOBRE LA OBRA":ASLO,
 "COMUNICACIÓN DE ANALISIS DE ORIGINALIDAD(LUEGO DE LOS AJUSTES)":CDADO, "TEXTO AJUSTADO A PARTIR DEL ANÁLISIS DE ORIGINALIDAD":TAAPAO, "FINALIZA CORRECIÓN DE ESTILO": FCDE,
 "NUEVO TITULO": NT, "REMISION DE REVISION": RDR, "FECHA LIMITE ENTREGA DE AJUSTES":FLEDA, "ENVÍO BORRADOR DE CONVENIO DE COEDICIÓN": EBDCDC, "OBSERVACIONES DE LOS COEDITORES AL CONTRATO":ODLCAC,
 "CARTA DE DESISTIMIENTO DE BIEN HUMANO":CDDBH, "CONVENIO FIRMADO POR LA UNIVERSIDAD CATÓLICA LUIS AMIGÓ":CFPUCLA, "CONVENIO FIRMADO POR LAS UNIVERSIDADES Y CARTA DE BIEN HUMANO":CFPU,
 "OBSERVACIONES Y AJUSTES DE CORRECCIÓN":OYADC, "REUNION ENTRE UNIVERSIDADES":REU,"ACUERDO DE TERMINOS DE DISEÑO CON COORDINADORA EDITORIAL":ADTDCE
};
  actualizacionData = {};
  actualizacionData[`/${idFirebase}`] = data;
  coleccionProductos.update(actualizacionData);
  id = '';        
  $("form").trigger("reset");
  $('#myModal').modal('hide');
});






   