class navBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        
            <style> 
                nav {
                    background-color: white;
                }
                
                .navbar-brand{
                    font-weight: normal;
                    color: #f39200;
                }

                .navbar-brand:hover{
                    color: #f39200;
                }

                .btn-link[type="button"] {
                    font-weight: bold;
                    text-decoration: none;
                }

                .btn-link[type="button"]:hover {
                    background: #0B5DE5;
                    color: #ffffff;
                }

                .navbar .navbar-expand-lg {
                    opacity: 0.9;
                }

            </style>

            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand">
                        <img src="./../assets/FondoEditorial_icono.ico" alt="" width="30" height="30" class="d-inline-block align-text-top">
                        Universidad Católica Luis Amigó
                    </a>

                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="btn btn-link px-3 me-2" href="./menu.html" type="button">Tabla</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn btn-link px-3 me-2" href="./graphics.html" type="button">Graficas</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn btn-link px-3 me-2" href="./AboutUs.html" type="button">About Us</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        `;
    }
}

window.customElements.define('nav-bar', navBar);