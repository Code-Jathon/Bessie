console.log("menu.js loaded");

const $db = firebase.firestore();

$db.collection("articles").onSnapshot(snapshot => {
    let articulos = [];
    snapshot.forEach(element => {
        articulos.push({...element.data(), id: element.id});
    });

    console.log("Articulos: ", articulos);
})