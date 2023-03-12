const imgElement = Array.from(document.querySelectorAll("img"));
const body = document.querySelector("body");

var currentImgElement;

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

function getGlassImage() {
    return document.querySelector(".glass-img");
}

function writeImage(image, glassImage) {
    image.getBase64(Jimp.AUTO, function (err, data) {
        glassImage.src = data;
    });
}

async function rgbIshChecker() {
    const glassImage = document.querySelector(".glass-img");

    var image = await IJS.Image.load(glassImage.src);

    const pixelArray = image.getPixelsArray();

    var rIsh = 0;
    var gIsh = 0;
    var gIsh = 0;

    await pixelArray.forEach((itm) => {
        console.log(itm);
    });
}

async function toGrayscale() {
    const glassImage = getGlassImage();

    console.log(glassImage.src);

    var image = await IJS.Image.load(glassImage.src);
    var greyImage = image.grey();

    glassImage.src = greyImage.toDataURL();
}

async function increaseBrightness() {
    const glassImage = getGlassImage();
    const image = await Jimp.read(glassImage.src);

    image.brightness(0.4);

    writeImage(image, glassImage);
}

async function reduceResolution() {
    const glassImage = getGlassImage();
    const image = await Jimp.read(glassImage.src);

    image.resize(300, Jimp.AUTO);

    writeImage(image, glassImage);
}

async function makeAvatar() {
    const glassImage = getGlassImage();
    const image = await Jimp.read(glassImage.src);

    image.circle();

    writeImage(image, glassImage);
}

async function makeThumbnail() {
    const glassImage = getGlassImage();
    const image = await Jimp.read(glassImage.src);

    image.contain(640, 360);

    writeImage(image, glassImage);
}

function makeQR() {
    const glassImage = getGlassImage();

    var qrcode = new QRCode(document.querySelector(".glass-comment"), {
        text: `${glassImage.src}`,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}

async function addTint(color) {
    const glassImage = getGlassImage();
    const image = await Jimp.read(glassImage.src);

    image.color([{ apply: `${color}`, params: [50] }]);

    writeImage(image, glassImage);
}

async function downloadImage() {
    const glassImage = getGlassImage();

    const image = await fetch(glassImage.src);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image file name here";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clickHandler() {
    currentImgElement = this;

    const glassDivHTML = `

    <div class="glass-menu me-3 mt-5 d-flex flex-column">
        <div class="btn-group mb-4">
            <button type="button" class="op-button btn btn-danger dropdown-toggle fs-5" data-bs-toggle="dropdown" aria-expanded="false">
            Options
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item op-item fs-6" onclick="rgbIshChecker()">Check if r-ish, g-ish, b-ish</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="increaseBrightness()">increase Brightness</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="toGrayscale()">to GrayScale</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="reduceResolution()">reduce Resolution</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="makeAvatar()">make Avatar</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="makeThumbnail()">make Thumbnail</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="makeQR()">make QR Code</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="addTint('red')">more red-ish pls</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="addTint('blue')">more blue-ish pls</a></li>
                <li><a class="dropdown-item op-item fs-6" onclick="addTint('green')">more green-ish pls</a></li>
            </ul>
        </div>

        <div class="d-btn-div">
            <button type="button" class="btn btn-success fs-5" onclick="downloadImage()">Download</button>
        </div>

        <div class="glass-comment">
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

    const glassImage = document.querySelector(".glass-img");
}
