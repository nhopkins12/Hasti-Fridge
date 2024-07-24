// Make the DIV element draggable:
// dragElement(document.getElementById("else"));

fetch("/data/return")
    .then((response) => response.json())
    .then(function (json){ 
        console.log(json)

        json.forEach(xlem => {
            console.log(xlem)
            newword = document.createElement('span')
            newword.innerText = xlem.text
            newword.style.left = xlem.x
            newword.style.top = xlem.y
            newword.style.transform = xlem.rotation
            document.body.appendChild(newword)
        });

        words = document.getElementsByTagName("span");

        for (let item of words) {
            dragElement(item);
        
            item.addEventListener("contextmenu",function(event){
                event.preventDefault();
                if (document.getElementById("ctxMenu")){
                    var ctxMenu = document.getElementById("ctxMenu");
                    ctxMenu.remove()
                }
                // ctxMenu.style.display = "";
                // ctxMenu.style.left = "";
                // ctxMenu.style.top = "";
        
                var ctxMenu = document.createElement("button")
                ctxMenu.innerText = "Delete"
                ctxMenu.id = "delMenu"
                ctxMenu.style.display = "block";
                ctxMenu.style.left = (event.pageX - 10)+"px";
                ctxMenu.style.top = (event.pageY - 10)+"px";
                document.body.appendChild(ctxMenu)
                ctxMenu.addEventListener("click", function(e) {
                    event.target.remove()
                    update()
                });
            },false);
        
            item.addEventListener("dblclick", function(event){
                event.target.setAttribute("contenteditable", "true")
                event.target.focus()
            },false);  
        }
    });



document.addEventListener("contextmenu",function(event){
    event.preventDefault();
    if (event.target.tagName != "SPAN"){
        if (document.getElementById("delMenu")){
            var ctxMenu = document.getElementById("delMenu");
            ctxMenu.remove()
        }
        // ctxMenu.style.display = "";
        // ctxMenu.style.left = "";
        // ctxMenu.style.top = "";


        var ctxMenu = document.createElement("button")
        ctxMenu.innerText = "Create New"
        ctxMenu.id = "ctxMenu"
        ctxMenu.style.display = "block";
        ctxMenu.style.left = (event.pageX - 10)+"px";
        ctxMenu.style.top = (event.pageY - 10)+"px";
        document.body.appendChild(ctxMenu)
        ctxMenu.addEventListener('click', function(e){
            span = document.createElement('span')
            span.innerHTML = ''
            span.style.left = (event.pageX - 10)+"px";
            span.style.top = (event.pageY - 10)+"px";
            document.body.appendChild(span)
            dragElement(span)
            span.setAttribute("contenteditable", "true")
            span.focus()
            span.addEventListener("contextmenu",function(event){
                event.preventDefault();
                if (document.getElementById("ctxMenu")){
                    var ctxMenu = document.getElementById("ctxMenu");
                    ctxMenu.remove()
                }
        
                var ctxMenu = document.createElement("button")
                ctxMenu.innerText = "Delete"
                ctxMenu.id = "delMenu"
                ctxMenu.style.display = "block";
                ctxMenu.style.left = (event.pageX - 10)+"px";
                ctxMenu.style.top = (event.pageY - 10)+"px";
                document.body.appendChild(ctxMenu)
                ctxMenu.addEventListener("click", function(e) {
                    event.target.remove()
                    update()
                });
            },false);
            span.addEventListener("dblclick", function(event){
                event.target.setAttribute("contenteditable", "true")
                event.target.focus()
            },false);  
            update()
        })
    }
},false);
document.addEventListener("click",function(event){
    if(document.getElementById("ctxMenu")){
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.remove()
    }
    if(document.getElementById("delMenu")){
        var ctxMenu = document.getElementById("delMenu");
        ctxMenu.remove()
    }
    update()
},false);


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    var check;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        update()
        check = function (evv) {
            if (evv.code == "KeyD"){
                curr = e.target.style.transform.substring(7, e.target.style.transform.length-4)
                if (curr == '') {
                    curr = 0
                }
                else {
                    curr = parseInt(curr)
                }
                e.target.style.transform = 'rotate('+ (curr + 5) +'deg)'
            }
            if (evv.code == "KeyA"){
                curr = e.target.style.transform.substring(7, e.target.style.transform.length-4)
                if (curr == '') {
                    curr = 0
                }
                else {
                    curr = parseInt(curr)
                }
                e.target.style.transform = 'rotate('+ (curr - 5) +'deg)'
            }
            update()
        }

        document.addEventListener("keypress", check, false);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement(e) {
        document.removeEventListener("keypress", check, false);
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    if (charCode == 13) {
        // Suppress default action of the keypress
        if (evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;

        evt.target.blur()
        evt.target.setAttribute("contenteditable", "false")
    }

    if (charCode == 32) {
        // Suppress default action of the keypress
        if (evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;

        span = document.createElement('span')
        span.innerHTML = ''
        span.style.left = (evt.target.offsetLeft + 10)+"px";
        span.style.top = (evt.target.offsetTop + 10)+"px";
        document.body.appendChild(span)
        dragElement(span)
        span.setAttribute("contenteditable", "true")
        span.focus()
        span.addEventListener("contextmenu",function(event){
            event.preventDefault();
            if (document.getElementById("ctxMenu")){
                var ctxMenu = document.getElementById("ctxMenu");
                ctxMenu.remove()
            }
    
            var ctxMenu = document.createElement("button")
            ctxMenu.innerText = "Delete"
            ctxMenu.id = "delMenu"
            ctxMenu.style.display = "block";
            ctxMenu.style.left = (event.pageX - 10)+"px";
            ctxMenu.style.top = (event.pageY - 10)+"px";
            document.body.appendChild(ctxMenu)
            ctxMenu.addEventListener("click", function(e) {
                event.target.remove()
            });
        },false);
        span.addEventListener("dblclick", function(event){
            event.target.setAttribute("contenteditable", "true")
            event.target.focus()
        },false); 
    }
};

function update(){
    arr = []
    texts = document.getElementsByTagName('span')
    for (let item of texts) {
        arr.push({"text": item.innerText, "x":item.style.left, "y":item.style.top, "rotation":item.style.transform})
    }
    const request = new Request('/data/update', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arr),
    });

    fetch(request).then().then()
}