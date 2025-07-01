const slides = document.querySelectorAll("article");
const frameElements = [];
var frameNumbers = [];
let slideIndex = null; /** Defines the slides in the presentation */
let frameIndex = null; /** Defines the frame index in the presentation */

/** Function that computes for each slide the number of frames */

for (let i=0; i<slides.length; i++) {
    var list = [];
    frameElements[i]=slides[i].querySelectorAll('[class^="show-"]');
    frameElements[i].forEach( function(element) {
        list.push(element.classList.toString().match(/show-\d+/g)[0].substr(5));
    })
    /*frameNumbers[i]=list.sort();*/
    frameNumbers[i] = [...new Set(list)];
};

/** Function that displays the k-th slide */

for (let i=0; i<slides.length; i++) {
    slides[i].classList.add("hidden");
}

function updateSlides() {
    for (let i=0; i<slides.length; i++) {
        if (i==slideIndex)
            slides[i].classList.remove("hidden");
        else
            slides[i].classList.add("hidden");
    }
};

/** Function that displays all frames up to the k-th one */

function updateFrames() {
    for (let i=0; i<frameNumbers[slideIndex].length; i++) {
        if (i<frameIndex) {
            slides[slideIndex].querySelectorAll(".show-"+frameNumbers[slideIndex][i].toString()).forEach ( function(object) {
                object.classList.remove("transparent");
            });
        }
        else {
            slides[slideIndex].querySelectorAll(".show-"+frameNumbers[slideIndex][i].toString()).forEach ( function(object) {
                object.classList.add("transparent")
                })
            }
        }
    };

/** Initialize the presentation */

function initializePresentation() {
    console.log("Initializing presentation...")
    slideIndex = 0;
    frameIndex = 0;
    updateSlides();
    updateFrames();
}

/** Advance one slide or one frame */

function nextSlide() {
    if (slideIndex < slides.length - 1) {
        slideIndex++;
        frameIndex = 0;
        updateSlides();
        updateFrames();
    }
}

function previousSlide() {
    if (slideIndex>0) {
        slideIndex--;
        frameIndex=frameNumbers[slideIndex].length;
        updateSlides();
        updateFrames();
    }
}

function nextFrame() {
    if (frameIndex < frameNumbers[slideIndex].length) {
        frameIndex+=1;
        console.log(frameIndex)
        updateFrames();
    } else {
        nextSlide();
    }
}

function previousFrame() {
    if (frameIndex>0) {
        frameIndex-=1;
        updateFrames();
    } else {
        previousSlide();
    }
}

/** Use the arrow keys mouse wheel to advance or go back */

document.addEventListener("keydown",function(event) {
    console.log(event.key);
    switch(event.key) {
        case "ArrowRight":
        case "PageDown":
            nextFrame();
            break;
        case "ArrowLeft":
        case "PageUp":
            previousFrame();
            break;
        case "Home":
            initializePresentation();
            break;
        case "End":
            slideIndex=slides.length - 1;
            frameIndex=frameNumbers[slideIndex].length;
            updateSlides();
            updateFrames();
    }
})

document.addEventListener("wheel", function(event) {
    let y = event.deltaY;
    if(y>=100) {
        nextFrame();
    } else if (y<=-100) {
        previousFrame()
    };
})

/** Initialize the content */

document.addEventListener("load",initializePresentation())

/** Display all slides at once for printing */

function showAllSlides() {
    for (let i=0; i<slides.length; i++) {
        slides[i].classList.add("hidden");
    }
    let wrap = document.getElementById("wrapper");
    for(let i=0; i<slides.length; i++) {
        let art0 = slides[i].cloneNode(true);
        art0.classList.remove("hidden");
        art0.querySelectorAll('[class^="show-"]').forEach(
            function(object) {object.classList.add("transparent")}
        )
        wrap.append(art0);
        for(let j=0; j < frameNumbers[i].length; j++) {
            let art = slides[i].cloneNode(true);
            art.classList.remove("hidden");
            art.querySelectorAll('[class^="show-"]').forEach(
                function(object) {object.classList.add("transparent")}
            )
            for (let k=0; k<=frameNumbers[slideIndex].length+1; k++) {
                if (k<=j) {
                    console.log(k)
                    art.querySelectorAll(".show-"+frameNumbers[i][k].toString()).forEach ( function(object) {
                        console.log(object);
                        object.classList.remove("transparent");
                    });
                }
            };
            wrap.appendChild(art);
        }
    }
}

function displayAllSlides() {
    // Ocultar todas las diapositivas inicialmente
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add("hidden");
    }

    // Obtener el contenedor principal donde se mostrarán todas las diapositivas
    let wrap = document.getElementById("wrapper");
    
    // Limpiar el contenedor principal para evitar duplicaciones
    wrap.innerHTML = "";

    // Recorrer cada diapositiva
    for (let i = 0; i < slides.length; i++) {
        // Clonar la diapositiva actual y eliminar la clase 'hidden'
        let art0 = slides[i].cloneNode(true);
        art0.classList.remove("hidden");

        // Hacer que todos los elementos con clases que comienzan con 'show-' sean transparentes
        art0.querySelectorAll('[class^="show-"]').forEach(function(object) {
            object.classList.add("transparent");
        });

        // Agregar la diapositiva clonada al contenedor principal
        wrap.append(art0);

        // Recorrer cada marco dentro de la diapositiva
        for (let j = 0; j < frameNumbers[i].length; j++) {
            // Clonar nuevamente la diapositiva para cada marco
            let art = slides[i].cloneNode(true);
            art.classList.remove("hidden");

            // Hacer que todos los elementos con clases que comienzan con 'show-' sean transparentes
            art.querySelectorAll('[class^="show-"]').forEach(function(object) {
                object.classList.add("transparent");
            });

            // Hacer visibles los elementos hasta el marco j actual
            for (let k = 0; k <= j; k++) {
                art.querySelectorAll(".show-" + frameNumbers[i][k].toString()).forEach(function(object) {
                    object.classList.remove("transparent");
                });
            }

            // Agregar la diapositiva clonada con el marco actualizado al contenedor principal
            wrap.appendChild(art);
        }
    }
}