var request = new XMLHttpRequest();
var projectCount = 0;

function init(){

    console.log("running");
    requestFile("/project/projectlist.json");
}

function loadProjects(list){
    var count = 0;
    var loop = setInterval(function(){
        if (count > list.length){
            clearInterval(loop);
        }

        requestFile("/project/" + list[count] + "");
        count += 1;
    },50);
}

function requestFile(p){
    var path = p;
    request.open('GET', path);
    request.responseType = 'json';
    request.send();
}

request.onload = function(){
    var file = request.response;
    console.log(file);
    processFile(file);
};

function processFile(file){
    if (file.name == "projectlist"){
        loadProjects(file.projects);
    }
    else {
        //write everything you want to do with the file data here
        var element1 = document.createElement("li");
        //
        var element2 = document.createElement("div");
        var element21 = document.createElement("a");
        var element22 = document.createElement("img");
        //
        var element3 = document.createElement("li");
        var element31 = document.createElement("a");
        var element32 = document.createElement("h2");
        var element33 = document.createElement("img");

        if (projectCount == 0){
            element1.setAttribute("class", "active");
            element2.setAttribute("class", "active");
        }
        //carousel list
        element1.setAttribute("data-target", "#featurebar");
        element1.setAttribute("data-slide-to", projectCount);
        document.getElementById("carousel-list").appendChild(element1);

        //carousel content
        element2.setAttribute("class", "carousel-item");
        element21.setAttribute("href", "/project/project.html?p=" + file.filename + "");
        element22.setAttribute("class", "d-block w-100");
        element22.setAttribute("src", "" + file.img + "");
        element21.appendChild(element22);
        element2.appendChild(element21);
        document.getElementById("carousel-content").appendChild(element2);

        //project list
        element31.setAttribute("href", "/project/project.html?p=" + file.filename + "");
        element32.innerText = file.name;
        element33.setAttribute("class", "d-block w-100");
        element33.setAttribute("src", "" + file.img + "");
        element31.appendChild(element32);
        element31.appendChild(element33);
        element3.appendChild(element31);
        document.getElementById("projectlist").appendChild(element3);

        projectCount += 1;
    }
}