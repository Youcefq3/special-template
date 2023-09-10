// Reset Function
function reset(obj,targetClass) {
    obj.forEach((ele) => {
        ele.classList.remove(`${targetClass}`)
    })
}

// Add Transition to each Element with main-color

console.log(Event)

// Landing Background Loop

let landing = document.querySelector(".landing");



let navigationList = document.querySelectorAll(".header a");

// Add Active Class To Current Link
navigationList.forEach((ele,index,parent) => {
    ele.onclick = () => {
        reset(parent, "active");
        ele.classList.add("active");
    }
});

// Start Settings

// Start Color Change

let settings = document.querySelector(".settings")

let settingsBtn = document.querySelector(".settings-btn i");


settingsBtn.onclick = function() {
    settings.classList.toggle("active")
    this.classList.toggle("fa-spin");
}

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
        backgroundLoop = setInterval(
            () => {
    let imgsArr = [
            "url(../imgs/background-01.jpg)" 
            ,"url(../imgs/background-02.jpg)" 
            , "url(../imgs/background-03.jpg)"
            ,"url(../imgs/background-04.jpg)"
    ]
    let random = Math.floor(Math.random() * imgsArr.length);
    landing.style.backgroundImage = imgsArr[random];
},7000)
}

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
// console.log(`skillsOffHeight ==> ${skillsOffHeight}`)
// console.log(`skillsoffTop ==> ${skillsoffTop}`)
// console.log(`windowHeight ==> ${windowHeight}`)

// End About

// Start Pop-up

let imgs = document.querySelectorAll(".gallery .img-holder img");

imgs.forEach(img => {
    img.addEventListener("click" , (e) => {
        let popOverlay = document.createElement("div")
        popOverlay.className = "pop-overlay"
        console.log(popOverlay)
    })
})

// end Pop-up 