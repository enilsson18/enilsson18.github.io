var request = new XMLHttpRequest();
var projectCount = 0;
var carouselCount = 0;
var projectList;

function init(){

    console.log("running");
    requestFile("/project/projectlist.json");
}

function loadProjects(list){
    projectList = list;
    requestFile("/project/" + list[projectCount] + "");
}

function requestFile(p, a = false){
    var path = p;
    request.open('GET', path);
    request.responseType = 'json';
    request.send();
}

request.onload = function(){
    var file = request.response;
    console.log(file);
    processFile(file);
    if (projectCount > 0 && projectCount < projectList.length){
        requestFile("/project/" + projectList[projectCount] + "");
    }
    if (projectCount == projectList.length){
        document.getElementById("firstc").remove();
        projectCount += 1;
    }
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
        var element32 = document.createElement("h3");
        var element32_5 = document.createElement("h4");
        var element33 = document.createElement("img");

        if (file.img != "") {
            if (projectCount == 0) {
                element1.setAttribute("class", "active");
                element2.setAttribute("class", "carousel-item active");
            } else {
                element2.setAttribute("class", "carousel-item");
            }
            //carousel list
            element1.setAttribute("data-target", "#featurebar");
            element1.setAttribute("data-slide-to", carouselCount);
            document.getElementById("carousel-list").appendChild(element1);

            //carousel content
            element21.setAttribute("href", "/project/project.html?p=" + file.filename + "");
            element22.setAttribute("class", "d-block w-100");
            if (file.img == "") {
                element22.setAttribute("src", "http://emnilsson.com/pics/noimagefound.png");
            } else {
                element22.setAttribute("src", "" + file.img + "");
            }

            carouselCount += 1;
        }

        element21.appendChild(element22);
        element2.appendChild(element21);
        document.getElementById("carousel-content").appendChild(element2);

        //project list
        element31.setAttribute("href", "/project/project.html?p=" + file.filename + "");
        element32.innerText = file.name;
        element32_5.innerText = file.date;
        element33.setAttribute("class", "d-block w-100");
        element33.setAttribute("src", ""+file.img+"");
        if (file.img == ""){
            element33.setAttribute("src", "http://emnilsson.com/pics/noimagefound.png");
        }
        element31.appendChild(element32);
        element31.appendChild(element32_5);
        element31.appendChild(element33);
        element3.appendChild(element31);
        document.getElementById("projectlist").appendChild(element3);

        projectCount += 1;
    }
}