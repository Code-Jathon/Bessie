if (document.getElementById("btnAbout")) {
  var btn = document.getElementById("btnAbout");
  btn.onclick = function () {
      swal('About','SO: Windows \n Fecha: 17/11/2022 \n Versión:1.0 \n Tecnología: Electron', 'info')
    };
}