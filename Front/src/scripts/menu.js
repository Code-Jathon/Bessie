<<<<<<< HEAD
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

// console.log("d", data);
// <tr>
//                 <td>item 0 0</td>
//                 <td>item 0 1</td>
//                 <td>item 0 2</td>
//                 <td>item 0 3</td>
//                 <td>item 0 4</td>
//                 <td>item 0 5</td>
//                 <td>item 0 6</td>
//                 <td>item 0 7</td>
//                 <td>item 0 8</td>
//                 <td>item 0 9</td>
//             </tr>

(async () => {
  const container = document.getElementById("tBody");
  const data = await getData();
=======
const data = [
  {
    "ESTADO": "En ajustes después de la revisión de similitud",
    "TÍTULO": "XXV Encuentro Nacional de Investigación - Memorias 2022",
    "LÍDER DE LA PUBLICACIÓN": "Luisa Felipe Yepez",
    "TIPO DE PUBLICACIÓN": "Memorias de eventos",
    "INSTITUCIÓN EDITORA": "Universidad Católica Luis Amigó",
    "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN": "6 de junio de 2022",
    "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD": "Del 6 al 17 de junio de 2022",
    "CONVENIO DE COEDICIÓN": "N/A",
    "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR": "N/A",
    "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR": "N/A",
    "FINALIZA PRIMERA EVALUACIÓN": "N/A",
    "FINALIZA SEGUNDA EVALUACIÓN": "N/A",
    "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES": "N/A",
    "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES": "N/A",
    "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN": "N/A",
    "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES": "N/A",
    "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN": "N/A",
    "INICIO CORRECCIÓN DE ESTILO": "N/A",
    "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO": "N/A",
    "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO": "N/A",
    "SOLICITUD DE DISEÑO": "N/A",
    "MUESTRA DE CARÁTULA": "N/A",
    "APROBACIÓN DE CARÁTULA": "N/A",
    "MUESTRA DE CONTENIDO DISEÑADO": "N/A",
    "OBSERVACIONES A LAS MUESTRAS": "N/A",
    "REVISIÓN EDITORIAL": "N/A",
    "SOLICITUD DE ISBN": "N/A",
    "SOLICITUD DE CATALOGACIÓN": "N/A",
    "APROBACIÓN DEL AUTOR": "N/A",
    "PUBLICACIÓN": "N/A",
    "DEPÓSITOS LEGALES": "N/A",
    "ESTADO_1": "N/A",
    "OBSERVACIONES": "N/A"
  },
  {
    "ESTADO": "No aprobado para publicación",
    "TÍTULO": "Técnicas didácticas aplicadas a la formación del contador público",
    "LÍDER DE LA PUBLICACIÓN": "Candy Lorena Chamorro",
    "TIPO DE PUBLICACIÓN": "Libro resultado de investigación",
    "INSTITUCIÓN EDITORA": "Universidad Católica Luis Amigó",
    "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN": "23 de marzo 2021",
    "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD": "24 de marzo 2021",
    "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD": "16 de octubre 2021",
    "SEGUNDO ANÁLISIS DE ORIGINALIDAD": 44489,
    "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR": 44498,
    "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR": 44504,
    "FINALIZA PRIMERA EVALUACIÓN": 44544,
    "FINALIZA SEGUNDA EVALUACIÓN": 44579,
    "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES": 44592,
    "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES": "N/A",
    "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN": "N/A",
    "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES": "N/A",
    "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN": "N/A",
    "INICIO CORRECCIÓN DE ESTILO": "N/A",
    "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO": "N/A",
    "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO": "N/A",
    "SOLICITUD DE DISEÑO": "N/A",
    "MUESTRA DE CARÁTULA": "N/A",
    "APROBACIÓN DE CARÁTULA": "N/A",
    "MUESTRA DE CONTENIDO DISEÑADO": "N/A",
    "OBSERVACIONES A LAS MUESTRAS": "N/A",
    "REVISIÓN EDITORIAL": "N/A",
    "SOLICITUD DE ISBN": "N/A",
    "SOLICITUD DE CATALOGACIÓN": "N/A",
    "APROBACIÓN DEL AUTOR": "N/A",
    "PUBLICACIÓN": "N/A",
    "DEPÓSITOS LEGALES": "N/A",
    "ESTADO_1": "N/A",
    "OBSERVACIONES": "N/A"
  },
  {
    "ESTADO": "No aprobado para publicación",
    "TÍTULO": "Psicología social y arte popular",
    "LÍDER DE LA PUBLICACIÓN": "Néstor Iván Cortez Ochoa (Colección Individuo, Familia y Sociedad)",
    "TIPO DE PUBLICACIÓN": "Capítulos resultado de investigación",
    "INSTITUCIÓN EDITORA": "Universidad Católica Luis Amigó",
    "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN": "21 de septiembre de 2020",
    "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD": "25 de septiembre de 2020",
    "CONVENIO DE COEDICIÓN": "N/A",
    "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD": "N/A",
    "SEGUNDO ANÁLISIS DE ORIGINALIDAD": "10 de noviembre de 2020",
    "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR": "14 de enero de 2021",
    "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR": "22 de enero de 2021",
    "FINALIZA PRIMERA EVALUACIÓN": "20 de febrero de 2021",
    "FINALIZA SEGUNDA EVALUACIÓN": "19 de febrero de 2021",
    "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES": "24 de marzo de 2021 (Consejo Editorial)",
    "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LAS EVALUACIONES": "10 de diciembre de 2021 (la propuesta deberá ajustarse de acuerdo con la evaluación de pares y la decisión del Consejo Editorial, posteriormente, tendrá una tercera evaluación).",
    "RADICACIÓN DE SOLICITUD CONTRATO TERCERA EVALUACIÓN": "8 de febrero de 2022",
    "INFORME DE RESULTADOS DE VIABILIDAD CON BASE EN TRES EVALUACIONES": "6 de abril de 2022",
    "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN": "N/A",
    "INICIO CORRECCIÓN DE ESTILO": "N/A",
    "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO": "N/A",
    "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO": "N/A",
    "SOLICITUD DE DISEÑO": "N/A",
    "MUESTRA DE CARÁTULA": "N/A",
    "APROBACIÓN DE CARÁTULA": "N/A",
    "MUESTRA DE CONTENIDO DISEÑADO": "N/A",
    "OBSERVACIONES A LAS MUESTRAS": "N/A",
    "REVISIÓN EDITORIAL": "N/A",
    "SOLICITUD DE ISBN": "N/A",
    "SOLICITUD DE CATALOGACIÓN": "N/A",
    "APROBACIÓN DEL AUTOR": "N/A",
    "PUBLICACIÓN": "N/A",
    "DEPÓSITOS LEGALES": "N/A",
    "ESTADO_1": "N/A",
    "OBSERVACIONES": "N/A"
  },
  {
    "ESTADO": "No aprobado para publicación",
    "TÍTULO": "Sanación cerrando ciclos. 27 psicoterapias para sanar las heridas del alma",
    "LÍDER DE LA PUBLICACIÓN": "Levis Manuel Díaz Puello (autor externo)",
    "TIPO DE PUBLICACIÓN": "Cartilla de divulgación",
    "INSTITUCIÓN EDITORA": "Universidad Católica Luis Amigó",
    "RECEPCIÓN DE LA PROPUESTA DE PUBLICACIÓN": 44624,
    "COMUNICACIÓN DE ANÁLISIS DE ORIGINALIDAD": 44624,
    "CONVENIO DE COEDICIÓN": "N/A",
    "ARCHIVOS AJUSTADOS DE ACUERDO CON EL ANÁLISIS DE ORIGINALIDAD": 44638,
    "SEGUNDO ANÁLISIS DE ORIGINALIDAD": 44638,
    "RADICACIÓN DE SOLICITUD CONTRATO PRIMER EVALUADOR": 44670,
    "RADICACIÓN DE SOLICITUD CONTRATO SEGUNDO EVALUADOR": 44671,
    "FINALIZA PRIMERA EVALUACIÓN": 44725,
    "FINALIZA SEGUNDA EVALUACIÓN": 44725,
    "INFORME DE RESULTADOS DE VIABILIDAD DE LA PROPUESTA CON BASE EN LAS EVALUACIONES": 44733,
    "RECEPCIÓN DE ARCHIVOS AJUSTADOS DE ACUERDO CON LA TERCERA EVALUACIÓN": "N/A",
    "INICIO CORRECCIÓN DE ESTILO": "N/A",
    "ENTREGA AL LÍDER DE ARCHIVOS CON CORRECCIÓN DE ESTILO": "N/A",
    "ARCHIVOS CON LA VALIDACIÓN DE LA CORRECCIÓN DE ESTILO": "N/A",
    "SOLICITUD DE DISEÑO": "N/A",
    "MUESTRA DE CARÁTULA": "N/A",
    "APROBACIÓN DE CARÁTULA": "N/A",
    "MUESTRA DE CONTENIDO DISEÑADO": "N/A",
    "OBSERVACIONES A LAS MUESTRAS": "N/A",
    "REVISIÓN EDITORIAL": "N/A",
    "SOLICITUD DE ISBN": "N/A",
    "SOLICITUD DE CATALOGACIÓN": "N/A",
    "APROBACIÓN DEL AUTOR": "N/A",
    "PUBLICACIÓN": "N/A",
    "DEPÓSITOS LEGALES": "N/A",
    "ESTADO_1": "N/A",
    "OBSERVACIONES": "N/A"
  }
]

const container = document.getElementById("tBody");
>>>>>>> 51540efe74aea2cb15c686577c48233abc2524a7

  data.map((lineItem) => {
    const item = document.createElement("tr");
    Object.values(lineItem).map((dato) => {
      const row = document.createElement("td");
      row.textContent = dato;
      item.appendChild(row);
    });
    container.appendChild(item);
  });
