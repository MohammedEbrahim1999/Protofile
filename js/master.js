// Check If There Is Local Storage Color Option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main--color',mainColors);


    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        if(element.dataset.color === mainColors){

            element.classList.add("active");
        }
    });
    
    
}

let backgroundOption  = true;


let backgroundInterval;



let backgroundLocalItem = localStorage.getItem("backgroundOption");


if(backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    })
    
    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

document.querySelector(".toggle-setting .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}

// Switch Colors 
const colorsLi = document.querySelectorAll(".colors-list li")
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    })
})
// Switch Random Background Option 
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach(span => {

    span.addEventListener("click", (e) => {
        handleActive(e);

        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

let landingPage = document.querySelector(".landing-page");

let imgsArray = [ "01.jpg" , "02.jpg" , "03.jpg" , "04.jpg" , "05.jpg" ];

function randomizeImgs () {
    if(backgroundOption === true){
        backgroundInterval = setInterval(() =>{

            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] +'")'
        },1000)
    }
}
randomizeImgs();




// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });

    }

};

// Create Popup With The Image 
let ourGallary = document.querySelectorAll(".gallary img");
ourGallary.forEach(img => {
    img.addEventListener('click' , (e) => {
        let overlay = document.createElement("div");

        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");

        popupBox.className = 'popup-box';

        if(Image.alt !== null){

            let imgHeading = document.createElement("h3");

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }


        let popupImage = document.createElement("img");

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");

        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        closeButton.className = 'close-button';

        popupBox.appendChild(closeButton);
    });
});

// Close Popup
document.addEventListener("click", function (e) {
    if( e.target.className == "close-button"){
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});


const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
    elements.forEach( ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}


scrollToSection(allBullets);
scrollToSection(allLinks);




// Handle Active State
function handleActive(ev) {
     ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}




let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if( bulletLocalItem !== null ){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");

    });
    if(bulletLocalItem === "block"){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets-option", 'block');
        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        }
        handleActive(e);
    });
});




// Resrt Button
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("backgroundOption");
    localStorage.removeItem("color_option");
    localStorage.removeItem("bullets-option");
    window.location.reload();
};



// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {
    e.stopPropagation();

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});
tLinks.onclick = function(e){
    e.stopPropagation();
}
let myA = document.querySelector(".footer span");
myA.addEventListener("click", (e) =>{
    window.open('mailTo:mohammed.ebrahim9921@gmail.com', '_blank', 'noopener, noreferrer');
})