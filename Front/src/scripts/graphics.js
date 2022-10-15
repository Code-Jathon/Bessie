console.log("graphics.js loaded");

const $db = firebase.firestore();

const articulosRef = $db.collection("articles");
const snapshot = await articulosRef.get();

//=================================== ESTADOS DE LOS ARTICULOS ===================================
let arrayEstados = new Array();
let estadoSize = [];

snapshot.forEach(doc => {
    // console.log( doc.id, "=>", doc.data(), ": ", doc.data().article['ESTADO']);
    arrayEstados.push(doc.data().article['ESTADO'].toUpperCase());
})
console.table(arrayEstados);

let estadoClean = [];
let getEstado = new Array();

arrayEstados.forEach(x => {
    estadoClean = x.split(": ")
    // console.log(estadoClean);

    if (estadoClean.length == 1) {
        estadoClean[0] = estadoClean[0].split(". ")
        // console.error(estadoClean[0][0]);
        getEstado.push(estadoClean[0][0]);

    } else if (estadoClean.length > 1 && estadoClean.length < 3) {
        estadoClean[estadoClean.length - 1] = estadoClean[estadoClean.length - 1].split(". ")
        // console.error(estadoClean[estadoClean.length - 1][0]);
        getEstado.push(estadoClean[estadoClean.length - 1][0]);

    } else {
        estadoClean[1] = estadoClean[1].split(". ")
        getEstado.push(estadoClean[1][0]);
    }
})
console.table(getEstado);

let arraySetEstado = new Set(getEstado);
arraySetEstado.forEach((element) => {
    // getEstado.forEach((y) => {
    //     if(element == y){
    //         i++;
    //     }
    // })
    // console.log("\t", element, ": ", i);
    // i = 0;

    // console.warn("\t: ", element, ": ", getEstado.filter(x => x == element).length);
    estadoSize.push(getEstado.filter(x => x == element).length);
});

let join_SetCantidadEstados = new Array();

join_SetCantidadEstados = Object.fromEntries(
    Array.from(arraySetEstado, (x, i) => [x, estadoSize[i]])
);
console.log("Cantidad de estados por categoria: ", join_SetCantidadEstados);

// console.error("1" ,arraySetEstado)
arraySetEstado = Array.from(arraySetEstado).slice(0)
// console.warn("2", arraySetEstado);

//============================== CANTIDAD DE ARTICULOS POR AÑO ===============================


//======================================== Graficas ========================================
//==================================================================================

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: arraySetEstado,
        datasets: [{
            label: 'CANTIDAD DE ESTADOS POR ARTICULOS',
            data: estadoSize,
            fill: true,
            tension: 0.2,
            backgroundColor: 'rgba(33, 180, 200, 0.3)',
            borderColor: 'rgb(33, 180, 200)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
