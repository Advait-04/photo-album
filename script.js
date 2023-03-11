const imgElement = Array.from(document.querySelectorAll("img"));
const body = document.querySelector("body");

console.log(imgElement);

imgElement.forEach((itm) => {
    itm.addEventListener("click", clickHandler, false);
});

function glassClickHandler(event) {
    const glassSection = document.querySelector(".glass");
    if (event.target != glassSection) {
        return;
    }

    glassSection.remove();
}

function clickHandler() {
    console.log(this.src);

    const glassDivHTML = `

    <div class="glass-menu me-3 mt-5">
        <div class="btn-group">
            <button type="button" class="op-button btn btn-danger dropdown-toggle fs-5" data-bs-toggle="dropdown" aria-expanded="false">
            Options
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item op-item fs-6" href="#">Action</a></li>
                <li><a class="dropdown-item op-item fs-6" href="#">Another action</a></li>
                <li><a class="dropdown-item op-item fs-6" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item op-item fs-6" href="#">Separated link</a></li>
            </ul>
        </div>
    </div>


    <div class="glass-img-div mt-5">
        <img src=${this.src} alt="lul" class="glass-img" />
    </div>

    
    
    `;

    const section = document.createElement("div");
    section.className = "glass";
    section.innerHTML = glassDivHTML;
    section.addEventListener("click", glassClickHandler);

    body.appendChild(section);
}
