class card extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .card-text {
                    font-style: italic;
                }

                .card {
                    border: none;
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