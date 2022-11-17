console.log("graphics.js loaded");

const $db = firebase.firestore();

const articulosRef = $db.collection("articles");
const snapshot = await articulosRef.get();

//=================================== ESTADOS DE LOS ARTICULOS ===================================
let arrayEstados = new Array();
let estadoSize = [];

snapshot.forEach(doc => {
    // console.log( doc.id, "=>", doc.data(), ": ", doc.data().article['ESTADO']);
    arrayEstados.push(doc.data()['ESTADO'].toUpperCase());
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
console.warn("Cantidad de estados por categoria: ", join_SetCantidadEstados);

arraySetEstado = Array.from(arraySetEstado).slice(0)


//============================== CANTIDAD DE ARTICULOS POR AÑO ===============================
let arrayYears = new Array();
let yearSize = [];

snapshot.forEach(doc => {
    // console.log( doc.id, "=>", doc.data(), ": ", doc.data().article['PUBLICACIÓN']);
    arrayYears.push(doc.data()['PUBLICACIÓN']);
})
console.table(arrayYears);

let publicacionYear = [];
let getYear = new Array();

arrayYears.forEach(element => {
    publicacionYear = element.replace("de ", "123").split("123");
    if (publicacionYear.length > 1) {
        publicacionYear[1] = publicacionYear[1].replace("de ", "").toUpperCase();
        getYear.push(publicacionYear[1]);
    } else {
        getYear.push(publicacionYear[0]);
    }
})
console.table(getYear);

let i = 0;
let arraySetYear = new Set(getYear);
arraySetYear.forEach((x) => {
    getYear.forEach((y) => {
        if (x == y) {
            i++;
        }
    })
    yearSize.push(i);
    i = 0;
})

let join_SetCantidadYearPublicacion = new Array();
join_SetCantidadYearPublicacion = Object.fromEntries(
    Array.from(arraySetYear, (x, i) => [x, yearSize[i]])
);

console.warn("Cantidad de articulos por mes y año: ", join_SetCantidadYearPublicacion);

arraySetYear = Array.from(arraySetYear).slice(0)

//============================== TIPOS DE ARTICULOS/PUBLICACIONES ===============================

let arrayTipoArticulo = new Array();
let tipoArticuloSize = [];

snapshot.forEach(doc => { 
    // console.log( doc.id, "=>", doc.data(), ": ", doc.data().article['TIPO DE PUBLICACIÓN']);
    arrayTipoArticulo.push(doc.data()['TIPO DE PUBLICACIÓN'].toUpperCase());
});
console.table(arrayTipoArticulo);

let tipoArticuloClean = [];
let getTipoArticulo = new Array();

arrayTipoArticulo.forEach(x => {
    tipoArticuloClean = x.split(". ")
    // console.log(tipoArticuloClean);
    getTipoArticulo.push(tipoArticuloClean[0]);
});
console.table(getTipoArticulo);

let arraySetTipoAr = new Set(getTipoArticulo);
arraySetTipoAr.forEach((element) => {
    tipoArticuloSize.push(getTipoArticulo.filter(x => x == element).length);
})

let join_SetCantidadTipoArticulo = new Array();
join_SetCantidadTipoArticulo = Object.fromEntries(
    Array.from(arraySetTipoAr, (x, i) => [x, tipoArticuloSize[i]])
);
console.warn("Cantidad de tipos de articulos: ", join_SetCantidadTipoArticulo);

arraySetTipoAr = Array.from(arraySetTipoAr).slice(0)

//======================================== Graficas ========================================
//==================================================================================

const ctx = document.getElementById('estadosArticulos');
// ctx.style.backgroundColor = "white";
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arraySetEstado,
        datasets: [{
            label: 'CANTIDAD DE ESTADOS POR ARTICULOS',
            data: estadoSize,
            fill: true,
            tension: 0.2,
            backgroundColor: ['rgba(2, 104, 136, 0.6)', 'rgba(255, 127, 0, 0.6)'],
            borderColor: ['rgb(2, 104, 136)', 'rgb(255, 127, 0)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                grid: {
                  display: false
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    color: ['#026888', '#ff7f00']
                }
            },
            
        },
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 10,
                    }
                }
            }
        }
    }
});
$('#estadosIMAGE').click( function() {
    console.log('click');

    let image = myChart.toBase64Image();
    console.log(image);

    let a = document.createElement('a');
    a.href = image;
    a.download = 'estadosArticulos.png';
    a.click();
});

const ctx2 = document.getElementById('publicacionesMesAño');
const myChart2 = new Chart(ctx2, {
    plugins: [ChartDataLabels],
    type: 'pie',
    data: {
        labels: arraySetYear,
        datasets: [{
            label: 'CANTIDAD DE ARTICULOS POR MES Y AÑO',
            data: yearSize,
            fill: true,
            tension: 0.2,
            backgroundColor: ['rgba(2, 104, 136, 0.3)', 'rgba(255, 127, 0, 0.6)', 'rgba(138, 116, 98, 1)'],
            borderColor: ['rgb(2, 104, 136)', 'rgb(255, 127, 0)', 'rgb(66, 51, 38)'],
            hoverOffset: 4
        }]
    },
    options: { 
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            datalabels: {
                anchor: 'end',
                align: 'start',
                color: 'white',
                formatter: (value) => {
                    let count = 0;
                    tipoArticuloSize.forEach(element => {
                        count += element;
                    });
                    return ((value / count) * 100).toFixed(2) + '%';
                },
                color: "black",
                font: {
                  family: '"Times New Roman", Times, serif',
                  size: "15",
                  weight: "bold",
                }
            }
        }
    }
});
$('#publicacionesIMAGE').click( function() {
    console.log('click');

    let image = myChart2.toBase64Image();
    console.log(image);

    let a = document.createElement('a');
    a.href = image;
    a.download = 'publicacionesMesAño.png';
    a.click();
});

const ctx3 = document.getElementById('tipoArticulos');
const myChart3 = new Chart(ctx3, {
    plugins: [ChartDataLabels],
    type: 'doughnut',
    data: {
        labels: arraySetTipoAr,
        datasets: [{
            label: 'TIPOS DE ARTICULOS',
            data: tipoArticuloSize,
            backgroundColor: ['rgba(2, 104, 136, 0.3)', 'rgba(255, 127, 0, 0.6)', 'rgba(138, 116, 98, 1)'],
            borderColor: ['rgb(2, 104, 136)', 'rgb(255, 127, 0)', 'rgb(66, 51, 38)']
        }]
    },
    options: {
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'start',
                color: 'white',
              formatter: function(value, context) {
                let count = 0;
                tipoArticuloSize.forEach(element => {
                    count += element;
                });
                // console.log(((value / count) * 100).toFixed(2));

                // return Math.round((value*100)/count) + '%';
                return ((value / count) * 100).toFixed(2) + '%';
              },
              color: "black",
              font: {
                family: '"Times New Roman", Times, serif',
                size: "10",
                weight: "bold",
              }
            }
          }
    }
});
$('#tipoArticulosIMAGE').click( function() {
    console.log('click');

    let image = myChart3.toBase64Image();
    console.log(image);

    let a = document.createElement('a');
    a.href = image;
    a.download = 'tipoArticulos.png';
    a.click();
});
