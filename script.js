const abstracts = document.querySelectorAll("details"); 

for (i=0;i<abstracts.length;i++){abstracts[i].classList.toggle("hidden");}

document.addEventListener("keydown", function (Event) {
    if (Event.key == "p" && Event.altKey == true) {
        for (i=0;i<abstracts.length;i++)
            {
                abstracts[i].classList.toggle("hidden");
            }
    }
}
); /* Show all abstracts in the research page*/