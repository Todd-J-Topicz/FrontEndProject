const submitButton = document.getElementById("submit");
const api = "https://api.rawg.io/api/games?key=cb9ef62282364000a9adea1c7c14f110&search="
let button_screens;
let resultObject;
let link_buy;
let back_button;
let platformObject;

//Event Listener for mouse button click on SEARCH:
submitButton.addEventListener("click", function(){
    $("#results").empty();
    search();
});

//Event Listener for "enter" key press, initiates function search()
$(document).keypress(function(e) {
    if(e.which == 13) {
        $("#results").empty();
        search();
    }
});

function defaultPage (){
    let img = $("<img></img>")
    $(img).attr("width", "700")
    $(img).attr("src", "https://c4.wallpaperflare.com/wallpaper/96/92/869/game-games-2014-best-wallpaper-preview.jpg")
    $("#results").append(img);
}


function search(){

    //Use .val() method to grab text from text box and assign to variable.
    let userInput = $("#userInput").val();

    //Make AJAX call to RAWG API (cocatenating userInput):
    $.get(api + userInput, (data) =>{
        console.log(data);

    for (let i = 0; i < data.results.length; i++){
      
        //NEED TO MATCH DATA WITH NODES:
        let span = $(`<div></div>`);
        $(span).addClass("result-game");
        span.appendTo("#results");

        //Create game title:
        let h3 = $("<h3></h3>");
        $(h3).addClass("game-title");
        $(h3).css("color", "whitesmoke")
        $(h3).css("font-size", "30px")
        $(h3).css("font-family", "arial")
        $(h3).text(data.results[i].name);
        span.append(h3);

        //Display list of genres:
        let newArray = [];
        let h2 = $("<h2></h2>");
        $(h2).addClass("game-genre");
        $(h2).css("font-size", "15px");
        $(h2).css("border-shadow", "5px");
        for (let x = 0; x < 4; x++){
            if (data.results[i].genres[x]){
                newArray.push(data.results[i].genres[x].name)
                };
            }
        $(h2).text(newArray.join(" - "));
        span.append(h2);
        
        //Display ESRB rating:
        let div = $('<div></div>');
        $(div).addClass("esrb_rating");
        if (data.results[i].esrb_rating){
            $(div).text(data.results[i].esrb_rating.name)
            $(div).css("color", "whitesmoke")
            span.append(div);
        }

        //Create image (and resize):
        if (data.results[i].background_image){
            let img = $("<img/>");
            img.attr("width", "700")
            img.attr("src", data.results[i].background_image);
            span.append(img);
        } else {
            let img = $("<img/>");
            img.addClass("unknown-image");
            img.attr("width", "700")
            let image = "https://images.unsplash.com/photo-1614469723922-c043ad9fd036?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbWluZyUyMHNvb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            img.attr("src", image);
            span.append(img)
        }
        
        //Create button to do something cool with the pictures in object:
        button_screens = $(`<button>Screen Shots</button>`);
        $(button_screens).addClass("screen_shot_select")
        span.append(button_screens);
        
        //Screen shots event listener:
        button_screens.click(function(){
            $("#results").empty();
            //Assign specific result from data object to global variable to access outside of this function:
            resultObject = data.results[i];
            screenShots()

        })

        //Create link to another page:
        let link_buy = $(`<button><a href="https://store.steampowered.com/search/?term=${data.results[i].name}"/>Buy Game Here</button>`);
        $(link_buy).addClass("steam_buy")
        span.append(link_buy);

        platformObject = data.results[i].platforms
        platformImages(span);

        }
    });
};

function screenShots() {
    
    let back_button = $(`<button type="reset">Go Back</button>`)
    $(back_button).addClass("back_button")
    $("#user-section").append(back_button);
    back_button.click(function(){
        $(back_button).remove();
        goBack()
    })

    for (let x = 0; x < resultObject.short_screenshots.length; x++){
        console.log(resultObject.short_screenshots.length)
        if (resultObject.short_screenshots[x].image){
            let img = $("<img/>");
            $(img).addClass("screen_shot");
            let picture = resultObject.short_screenshots[x].image;
            img.attr("width", "200")
            $(img).attr("src", picture)
            img.appendTo("#results");
       
        }
    }
}

function goBack(){
    $("#results").empty();
    search();
}

function platformImages(span){
    let div = $("<div></div>");
    $(div).addClass("logos-container");
    span.append(div);

    for (let y = 0; y < platformObject.length; y++){
        let platformLogo = $("<img></img>");
        $(platformLogo).addClass("platformLogo");
        $(div).append(platformLogo);
       
        if (platformObject[y].platform.name == "Android"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/android.PNG");
        } else if (platformObject[y].platform.name == "iOS"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/iOS.PNG");
        } else if (platformObject[y].platform.name == "Nintendo DS"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/nitendoDS.PNG");
        }  else if (platformObject[y].platform.name == "Nintendo Switch"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/nitendoSwitch.PNG");
        }  else if (platformObject[y].platform.name == "PC"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/pC.PNG");
        }  else if (platformObject[y].platform.name == "PlayStation 4"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/pS4.PNG");
        }  else if (platformObject[y].platform.name == "PlayStation 5"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/pS5.PNG");
        }  else if (platformObject[y].platform.name == "Wii"){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/wI.PNG");
        }  else if (platformObject[y].platform.name == 'Xbox 360'){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/xBox360.PNG");
        }  else if (platformObject[y].platform.name == 'Xbox One'){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/xboxOne.PNG");
        }  else if (platformObject[y].platform.name == 'Xbox Series S/X'){
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/xboxSeriesX.PNG");
        } else {
            $(platformLogo).attr("width", "100");
            $(platformLogo).attr("src", "attr/caveman.PNG");
        }
    }
}



defaultPage();