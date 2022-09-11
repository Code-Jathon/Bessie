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
  const data = await getData();

  console.log("a");

  const container = document.getElementById("tBody");

  //Para los nombres de los campos
  const theadContainer = document.getElementById("thead-container");

  const trContainer = document.createElement("tr");

  //Mapeo todas las llaves/keys de propiedades que vienen de firebase, de acuerdo al orden que emite Firebase
  Object.keys(data[0]).map((key) => {
    const elm = document.createElement("th");
    elm.classList = "th title";
    elm.textContent = key;
    trContainer.appendChild(elm);
  });

  theadContainer.appendChild(trContainer);

  data.map((lineItem) => {
    const item = document.createElement("tr");
    Object.values(lineItem).map((dato) => {
      const row = document.createElement("td");
      row.textContent = dato;
      item.appendChild(row);
    });
    container.appendChild(item);
  });
})();
