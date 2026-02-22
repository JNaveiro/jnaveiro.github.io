/* Some scripts for the lecture notes */

const navMenu = document.createElement("nav")
const body = document.querySelector("body")

function addTheorems() {
    var theorems = document.querySelectorAll(".theorem-box")

    for (var i=0; i < theorems.length; i++) {
        theorems[i].innerHTML = "<b>Theorem.</b>" + theorems[i].innerHTML
    }
}

function addPropositions() {
    var propositions = document.querySelectorAll(".proposition-box")

    for (var i=0; i < propositions.length; i++) {
        propositions[i].innerHTML = "<b>Proposition.</b>" + propositions[i].innerHTML
    }
}

function addDefinitions() {
    var definitions = document.querySelectorAll(".definition-box")

    for (var i=0; i < definitions.length; i++) {
        definitions[i].innerHTML = "<b>Definition.</b>" + definitions[i].innerHTML
    }
}

function addExamples() {
    var examples = document.querySelectorAll(".example-box")

    for (var i=0; i < examples.length; i++) {
        examples[i].innerHTML = "<b>Example.</b>" + examples[i].innerHTML
    }
}

function addWarnings() {
    var warnings = document.querySelectorAll(".warning-box")

    for (var i=0; i < warnings.length; i++) {
        warnings[i].innerHTML = "<b>Be careful!</b>" + warnings[i].innerHTML
    }
}

function createNavMenu() {
    var sections = document.querySelectorAll("section")
    var navMenu = document.createElement("nav")
    var list = document.createElement("ul")
    list.className = "no-bullets"
    navMenu.innerHTML = "<div>Contents</div>"
    navMenu.appendChild(list)

    for (var i=0; i < sections.length; i++) {
        var navLinkContainer = document.createElement("li")
        var navLink = document.createElement("a")
        navLink.href = "#" + sections[i].id
        navLink.innerHTML = sections[i].querySelector("h2").innerHTML
        navLinkContainer.appendChild(navLink)
        list.appendChild(navLinkContainer)
    }
    document.body.appendChild(navMenu)
}

/*---Toggle Dark Mode---*/

document.addEventListener("keydown", function(e) {
    if (e.code === "KeyI") {
        body.classList.toggle("dark-mode")
    }
        console.log("Hello!")
}
)

addTheorems()
addPropositions()
addDefinitions() 
addExamples()
addWarnings()
createNavMenu()
