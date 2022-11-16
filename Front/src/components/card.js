class card extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .card {
                    width: 18rem;
                    margin-top: 0rem;
                    margin-bottom: 0.5rem;
                }

                .card-img-top {
                    width: 40%;
                    height: 40%;
                    object-fit: cover;
                    margin: 0 auto;
                }

                .card-text {
                    color: #026788;
                }

                .card-title {
                    font-weight: bolder;
                }
            
            </style>
            
            <div class="card">
                <img src="${this.getAttribute('img')}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.getAttribute('title')}</h5>
                    <p class="card-text">${this.getAttribute('description')}</p>
                </div>
            </div>
        `;
    }
}

window.customElements.define('card-component', card);