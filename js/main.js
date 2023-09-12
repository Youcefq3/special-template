// Reset Function
function reset(obj,targetClass) {
    obj.forEach((ele) => {
        ele.classList.remove(`${targetClass}`)
    })
}

// Add Active Class To Current Link

let navigationList = document.querySelectorAll(".header a");
navigationList.forEach((ele,index,parent) => {
    ele.onclick = () => {
        reset(parent, "active");
        ele.classList.add("active");
    }
});

// Landing Background Loop

let landing = document.querySelector(".landing");


function imgsLoop(){
let imgsArr = [
"url(../imgs/background-01.jpg)" 
,"url(../imgs/background-02.jpg)" 
, "url(../imgs/background-03.jpg)"
,"url(../imgs/background-04.jpg)"
];
let random = Math.floor(Math.random() * imgsArr.length);
landing.style.backgroundImage = imgsArr[random];
}


// Start Settings

// Start Color Change

let settings = document.querySelector(".settings")

let settingsBtn = document.querySelector(".settings-btn i");


settingsBtn.onclick = function() {
    settings.classList.toggle("open");
    this.classList.toggle("fa-spin");
    // Remove Open Class From Settings When clicking outside of it
    document.addEventListener("click" ,  (e) => {
        if (!settings.contains(e.target)) {
            // Remove Open
            settings.classList.remove("open");
            // Remove Active
            this.classList.remove("active");
        }
    })
};

let colorOptions = document.querySelectorAll("ul.colors li");

colorOptions.forEach((li) => {
    // Adding pointer class and color 
    li.classList.add("pointer")
    li.style.backgroundColor = `${li.dataset.color}`
    
    // Click Events
    
    li.onclick = function() {
        // Add Color To Local Storage
        window.localStorage.setItem("mainColor" , `${this.dataset.color}`);

        document.documentElement.style.setProperty("--main-color" , `${window.localStorage.getItem("mainColor")}`);
        
        // Add Active Class Only To Current Target
        reset(colorOptions,"active");
        this.classList.add("active");
    }
});

// Check For Item In Local Storage
if (window.localStorage.getItem("mainColor") == null ) {
    window.localStorage.setItem("mainColor" , `orangered`)
}

let activeOption = document.querySelector(`ul.colors li[data-color="${window.localStorage.getItem("mainColor")}"]`);

reset(colorOptions,"active")

activeOption.classList.add("active")

document.documentElement.style.setProperty("--main-color" , `${window.localStorage.getItem("mainColor")}`);

// End Color Change

// Start RandomBackground toggle
let backgroundLoop;

function backgroundImageLoop() {
        backgroundLoop = setInterval(imgsLoop,7000)
}

imgsLoop()

let toggleSwitch = document.querySelector(".toggle-switch .random-background ")

let backgroundSwitchValid;

toggleSwitch.addEventListener("click" , (e) => {
    e.currentTarget.classList.toggle("active");
    
    e.currentTarget.classList.contains("active")? backgroundSwitchValid = true: backgroundSwitchValid = false;
    
    window.localStorage.setItem("backgroundSwitch" ,`${backgroundSwitchValid} ` );
    
    if (backgroundSwitchValid) {
        backgroundImageLoop();
    }
    else {
        clearInterval(backgroundLoop);
    }
});


let backgroundSwitchLocal = window.localStorage.getItem("backgroundSwitch");

if (backgroundSwitchLocal.match("true")) {
    toggleSwitch.classList.add("active");
    backgroundImageLoop();
    console.log("Executing")
}
else {
    toggleSwitch.classList.remove("active")
    console.log("Not Executing")
    clearInterval(backgroundLoop);
}

// End RandomBackground toggle


// End Settings

// Start About
let skillsSection = document.querySelector(".skills")



window.onscroll = function() {
    let progressBars = document.querySelectorAll(".progress [data-width]");
    // Mesurement Variables
    // ==> offsetHeight : The height of the Element 
    let skillsOffHeight = skillsSection.offsetHeight
    // ==> offsetTop : The height of Elements Previous Siblings 
    let skillsoffTop = skillsSection.offsetTop;
    // ==> innerHeight : The height of the seen window 
    let windowHeight = this.innerHeight;

    if (window.scrollY >= skillsOffHeight + skillsoffTop - windowHeight) {
        progressBars.forEach(function(div) {
            div.style.width = `${div.dataset.width}`
        })
    }
}


// End About

// Start Pop-up

let imgs = document.querySelectorAll(".gallery .img-holder img");

imgs.forEach((img,index) => {
    img.addEventListener("click" , (e) => {
        // Create pop-up Overlay
        let popupOverlay = document.createElement("div")
        
        popupOverlay.className = "popup-overlay";

        // Create Title

        let imgTitle = document.createElement('h1')
        
        imgTitle.className = "img-label"

        imgTitle.innerText = `image-0${index + 1}`

        // Create pop-up Image
        let imgHolder = document.createElement("div")
        
        imgHolder.className = "popup-image";

        // Append Image

        let popupImage = document.createElement("img")
        
        
        popupImage.src = img.src
        
        imgHolder.prepend(imgTitle)

        imgHolder.append(popupImage)
        
        document.body.append(imgHolder)

        document.body.append(popupOverlay)
        
        document.addEventListener("click" , (e) => {
            if (e.target == popupOverlay) {
                e.target.remove();
                imgHolder.remove()
            }
        })
    })
})

// end Pop-up 

// Start Nav Bullets

let navBullets = document.querySelectorAll("aside .bullet")

scrollingToSect(navBullets,false)

scrollingToSect(document.querySelectorAll(".header a"),true)

// navBullets.forEach((bullet) => {
//     // Click Events On Bullet
//     bullet.addEventListener("click" , function(e) {
//         document.querySelector(`${e.target.dataset.section}`).scrollIntoView({

//             behavior: "smooth"
        
//         })
//     })
// })

function scrollingToSect(elements,preventDefault) {
    elements.forEach((ele) => {
        // Click Events On Bullet
        ele.addEventListener("click" , function(e) {
            if (preventDefault) {
                e.preventDefault();
            }
            document.querySelector(`${e.target.dataset.section}`).scrollIntoView({
    
                behavior: "smooth"
            
            })
        })
    })
}

// End Nav Bulletss