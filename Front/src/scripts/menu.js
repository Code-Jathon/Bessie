console.log("menu.js loaded");

const $db = firebase.firestore().collection("articles");

let articulos = new Array();

// $db.collection("articles").onSnapshot(snapshot => {
//     // let articulos = new Array();
//     snapshot.forEach(element => {
//         articulos.push({...element.data(), id: element.id});
//     });

//     console.log("Cantidad de articulos: ", articulos.length);
//     console.log("Primer articulo desde firebase: ", articulos[0].article);

//     // $('#FondoEditorial-Firebase').DataTable({
//     //     data: articulos,
//     // })
// }) 

$db.get().then(function (querySnapshot) {
    querySnapshot.forEach(doc => {
        // console.warn("Articulo: ", doc.data());
        // debugger
        console.log(doc.data().article['TÍTULO']);
        document.getElementById("FondoEditorial-Firebase").innerHTML += "<tbody> <tr> <td>" + doc.data().article['TÍTULO'] + "</td> </tr> </tbody>";
    });
})

console.log("Hiii");
$db.get().then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.warn("Todos los articulos en firebase: ", data);
})