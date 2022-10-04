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
    /*
    var table = $("mydatatable").DataTable({
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
    */
  })();
});


const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function () {
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
if (document.getElementById("btnNuevo")) {
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("btnNuevo");
  var span = document.getElementsByClassName("close")[0];
  var body = document.getElementsByTagName("body")[0];

  btn.onclick = function () {
    modal.style.display = "block";

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
  }

  span.onclick = function () {
    modal.style.display = "none";

    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  }

}
//JS MODAL FIN
















