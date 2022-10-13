console.log("graphics.js loaded");

const $db = firebase.firestore();

const articulosRef = $db.collection("articles");
const snapshot = await articulosRef.get();
let estados = new Array();
let arraySetEstado = new Set();

snapshot.forEach(doc => {
    // console.log( doc.id, "=>", doc.data(), ": ", doc.data().article['ESTADO']);
    
    estados.push(doc.data().article['ESTADO'].toUpperCase());
})
console.table(estados);
// arraySetEstado = new Set(estados);

let estadoClean = []

estados.forEach(x => {
    estadoClean = x.split(": ")
    console.log(estadoClean);
    let ultimaPosicion = estadoClean[estadoClean.length - 1];
    console.warn(ultimaPosicion);
    
})
// console.warn(arraySetEstado);



const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
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