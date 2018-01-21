$(document).ready(function() {
  $('#welcomeScreen').hide().delay(200).fadeIn(1000);
  setTimeout(() => { $('#navigation')[0].style.animationPlayState = "running";}, 500);
});

// psql --host zak.cfgmalmluev3.us-west-2.rds.amazonaws.com --port 5432 --username zakattack9 --dbname daizzy
var volunteers = []; //temporary volunteer list
var volDb = []; //volunteer database
class Volunteer{
  constructor(id, name, job, date){
    this.id = id;
    this.name = name;
    this.job = job;
    this.date = date;
  }
}

// GET - https://eevmumxbq8.execute-api.us-west-2.amazonaws.com/dev/get
// POST - https://eevmumxbq8.execute-api.us-west-2.amazonaws.com/dev/post
// PUT - https://eevmumxbq8.execute-api.us-west-2.amazonaws.com/dev/put
$.ajax({
  url: "https://eevmumxbq8.execute-api.us-west-2.amazonaws.com/dev/get",
  method: 'GET',
  "Content-Type": "application/json",
})
.done((response) => {
  response.map(currVal => {
    volDb.push(new Volunteer(currVal.id, currVal.name, currVal.job, currVal.date));
  })
  //console.log(volDb);
})
.fail((err) => {
  console.log('error', err);
})

function start() {
  //$('chat')[0] is equivalent to document.getElementById('chat')
  //the "[0]" is needed as jQuery returns the DOM element in an array
  $('#info')[0].style.animationPlayState = "running";

  setTimeout(() => { $('#welcomeScreen')[0].style.animationPlayState = "running";}, 550);

  setTimeout(() => { 
    $('#welcomeScreen')[0].style.display = "none";
    $('#chat')[0].style.display = "inline-block";
    $('#daizzy')[0].style.animationPlayState = "running";
  }, 1730); //makes welcome screen invisible (display: none doe snot work within keyframes)

  setTimeout(() => {$('#chatTitle')[0].style.animationPlayState = "running";}, 2200);
  setTimeout(() => {$('#chatLog')[0].style.animationPlayState = "running";}, 2700);
  setTimeout(() => {$('#input')[0].style.animationPlayState = "running";}, 3000);
}

$(document).keypress(function(e) { //checks when user presses enter key
  if (e.which == 13) {
    addText();
  }
});

function botText(input) { //adds bot text to the chatbox
  var userText = document.createElement("div");
  userText.className = "bot";
  var text = document.createElement("p");
  text.className = "chatMessage"
  text.innerHTML = "<b>Daizzy: </b>"+ input;
  
  userText.appendChild(text);
  $('#chatLog')[0].appendChild(userText);
  var objDiv = document.getElementById("chatLog");
  objDiv.scrollTop = objDiv.scrollHeight;
  $(userText).hide().delay(800).fadeIn(400); //fades user's input in
}

var qNum = 0; //question number
var questions = ["May I please have your name?","What role are you looking to volunteer for?"];
var volId = null; //used to identify volunteer
var currUser = volDb[volId];

function addText() { //adds text from the textbox to the chatbox
  var userText = document.createElement("div");
  userText.className = "user";
  var text = document.createElement("p");
  text.className= "chatMessage";
  text.innerHTML = "<b>You: </b>"+ $('#input')[0].value;
  
  userText.appendChild(text);
  $('#chatLog')[0].appendChild(userText);
  $(userText).hide().fadeIn(400); //fades user's input in
  
  let userDivs = $('.user');
  userDivs.map((index) => userDivs[index].style.textAlign = 'left'); //sets text to left of div

  if(qNum === 0) {
    volunteers.push(new Volunteer(null, null, null, null));
    var userInput = $('#input')[0].value.toLowerCase();
    if(userInput.includes("yea") || userInput.includes("yes") || userInput.includes("yeah") || userInput.includes("sure")) {//check if user responds with yes
      botText("May I please have your first and last name?");
      qNum = 1;
    }else{
      botText('Sorry I didn\'t quite get that, try answering again with the keywords, "Yes" or "Sure".');
    }
  }else if(qNum === 1) {
    var name = $('#input')[0].value;
    volunteers[0].name = name;

    if(name.includes('') && name.length > 0){ //checks if name was inputted (Not Null)
      for(var i = 0; i < volDb.length; i++) { //searches for previous user
        if(volDb[i].name.toLowerCase() === name.toLowerCase()){
          botText("Welcome back " + name + ", I see you are registered in our database, would you like to modify your previously inputted data?");
          volId = i;
          qNum = 7;
          break; //stops looping
        }else if(i === volDb.length - 1 && qNum !== 7){ //if no matches were found then start registering new user
          botText("Is " + name + " the correct name?");
          qNum = 2;
        }
      }
    }else{
      botText("That is not a name! Re-enter your proper name");
    }
  }else if(qNum === 2) {
    let userInput = $('#input')[0].value.toLowerCase();
    if(userInput.includes("yea") || userInput.includes("yes") || userInput.includes("yeah") || userInput.includes("correct") || userInput.includes("sure")){
      var listRoles = "";
      /*for (var i = 0; i < roles.length; i++) {
        listRoles += "<br> -"+ roles[i].toLowerCase();
      }*/
      //use map instead
      roles.map((currVal, index) => listRoles += "<br> -" + roles[index]);
      botText("What role are you looking to volunteer for, " + volunteers[0].name+"?<br><br>Current available roles:" + listRoles);
      qNum = 3;
    }else if(userInput.includes("no") || userInput.includes("nope")){
      qNum = 1;
      botText("Please Re-enter your name");
    }  
  }else if(qNum === 3) {
    if ($('#input')[0].value.toLowerCase() === roles[0].toLowerCase()){
      volunteers[0].job = roles[0];
      botText("Are you sure you want to take the volunteer position of " + roles[0] + "?");
      qNum =4;
    }else if ($('#input')[0].value.toLowerCase() === roles[1].toLowerCase()){
      volunteers[0].job = roles[1];
      botText("Are you sure you want to take the volunteer position of " + roles[1] + "?");
      qNum =4;
    }else if ($('#input')[0].value.toLowerCase() === roles[2].toLowerCase()){
      volunteers[0].job = roles[2];
      botText("Are you sure you want to take the volunteer position of " + roles[2] + "?");
      qNum =4;
    }else if ($('#input')[0].value.toLowerCase() === roles[3].toLowerCase()){
      volunteers[0].job = roles[3];
      botText("Are you sure you want to take the volunteer position of " + roles[3] + "?");
      qNum =4;
    }else if ($('#input')[0].value.toLowerCase() === roles[4].toLowerCase()){
      volunteers[0].job = roles[4];
      botText("Are you sure you want to take the volunteer position of " + roles[4] + "?");
      qNum =4;
    }else if ($('#input')[0].value.toLowerCase() === roles[5].toLowerCase()){
      volunteers[0].job = roles[5];
      botText("Are you sure you want to take the volunteer position of " + roles[5] + "?");
      qNum =4;
    }else if ($('#input')[0].value.toLowerCase() === roles[6].toLowerCase()){
      volunteers[0].job = roles[6];
      botText("Are you sure you want to take the volunteer position of " + roles[6] + "?");
      qNum =4;
    }else{
      botText("That volunteer role does not exist. Please try again and type the role as seen above");
    }
  }else if(qNum === 4){
    let userInput = $('#input')[0].value.toLowerCase();
    if(userInput.includes("yea") || userInput.includes("yes") || userInput.includes("yeah") || userInput.includes("correct")){
      botText("Here are the days we have available for that role");
      setTimeout(() => {
        if($(window).width() < 571) { //checks window
          openOverlay(2);
        }else{
          openOverlay(1);
        }
      }, 1000);
      setTimeout(() => {botText("What date works best for you? Please input the date in the format MM/DD/YYYY");}, 1500);
      qNum = 5;
    }else if(userInput.includes("no") || userInput.includes("nope")){
      qNum = 3;
      var listRoles = "";
      roles.map((currVal, index) => listRoles += "<br> -" + roles[index].toLowerCase());
      botText("Plase pick a role:" + listRoles);
    }
  }else if(qNum === 5){
    let userInput = $('#input')[0].value.toLowerCase();
    if(userInput.includes('') && userInput.length === 10){
      botText("Is this date, " + userInput + ", the correct day you would like to volunteer for the role, " + volunteers[0].job + "?");
      volunteers[0].date = $('#input')[0].value.toLowerCase();
      qNum = 6;
    }else{
      botText(userInput + " Is not a real date or not properly formatted, please try again");
    }
  }else if(qNum === 6){
    let userInput = $('#input')[0].value.toLowerCase();
    if(userInput.includes("yea") || userInput.includes("yes") || userInput.includes("yeah") || userInput.includes("correct")){
      
      console.log(volunteers[0]);
      //console.log(volId);
      if(volId === null){ //add new volunteer data to database
        botText("Thank you for scheduling with me! If you ever need to change your volunteer date, re-enter your name when signing up and our system will automatically recoginze you. Have a good day!");
        $.ajax({
          url: "https://eevmumxbq8.execute-api.us-west-2.amazonaws.com/dev/post",
          method: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: 'JSON',
          data: JSON.stringify({
            "name" : volunteers[0].name,
            "job" : volunteers[0].job,
            "date" : volunteers[0].date
          })
        })
      }else{ //updates volunteer
        botText("Your information has been updated! Thank you for scheduling again with Daizzy, if you ever need to change your information again, please re-enter your name when signing up.")
        $.ajax({
          url: "https://eevmumxbq8.execute-api.us-west-2.amazonaws.com/dev/put",
          method: 'PUT',
          contentType: "application/json; charset=utf-8",
          dataType: 'JSON',
          data: JSON.stringify({
            "id" : volDb[volId].id,
            "name" : volDb[volId].name,
            "job" : volunteers[0].job,
            "date" : volunteers[0].date
          })
        })
      }

      setTimeout(() => location.reload(), 10000);
    }else if(userInput.includes("no") || userInput.includes("nope")){
      qNum = 5;
      botText("What date works best for you? Please input the date in the format MM/DD/YYYY");
    } 
  }else if(qNum === 7){
    let userInput = $('#input')[0].value.toLowerCase();
    if(userInput.includes("yea") || userInput.includes("yes") || userInput.includes("yeah") || userInput.includes("sure")){
      botText(`Currently you are signed up as "${volDb[volId].job}" on "${volDb[volId].date}". Would you like to change your volunteer role or reschedule your date?`);
      qNum = 2;
    }else if(userInput.includes("no") || userInput.includes("nope")){
      botText(`Goodbye ${volDb[volId].name}, have a nice day`);
      setTimeout(() => location.reload(), 5000);
    }
  }

  $('#input')[0].value = ''; //clears textboxt after enter
  var objDiv = document.getElementById("chatLog");
  objDiv.scrollTop = objDiv.scrollHeight;
}
var name = "";
var roles = ["Control Center Operator", "Counting Center Official", "Delivery/Collection Official", "Election Information Services Official", "Facility Official","Precinct Official","Precinct Troubleshooter"];

overlayMode = 0;
function openOverlay(x) {
  if(x === 2){ //open smaller overlay
    $("#side-nav")[0].style.width = "100%";
    setTimeout(() => {$("#side-nav")[0].style.height = "40%";}, 600); //needs to be delayed otherwise it will expand from corner
    $("#chat")[0].style.top = "40%";
    setTimeout(() => {$('#overlayTab')[0].style.display = "none";}, 700);
    setTimeout(() => {$('#overlayTab')[0].style.animationPlayState = "paused";}, 400);
    overlayMode = 1;
  }else if(x === 1){ //open larger overlay
    $("#side-nav")[0].style.height = "100%";
    $("#side-nav")[0].style.width = "40%";
    $("#chat")[0].style.left = "40%";
    setTimeout(() => {$('#overlayTab')[0].style.display = "none";}, 300);
    setTimeout(() => {$('#overlayTab')[0].style.animationPlayState = "paused";}, 400);
  }
}

function closeOverlay(x) {
  if(x === 2){ //close smaller overlay
    $("#side-nav")[0].style.height = "0";
    $("#chat")[0].style.top= "0";
    $('#overlayTab')[0].style.display = "inline";
    setTimeout(() => {$("#side-nav")[0].style.width = "40%";}, 600);
    setTimeout(() => {$('#overlayTab')[0].style.animationPlayState = "running";}, 700);
    overlayMode = 0;
  }else if(x === 1){ //close larger overlay
    $("#side-nav")[0].style.width = "0";
    $("#chat")[0].style.left= "0";
    $('#overlayTab')[0].style.display = "inline";
    setTimeout(() => {$('#overlayTab')[0].style.animationPlayState = "running";}, 700);
  }
}

console.log($(window).width())
$('#overlayTab').click(function(e) {  
  if($(window).width() < 571) { //checks window
    openOverlay(2);
  }else{
    openOverlay(1);
  }
});

$('#closeButton').click(function(e) {  
  if($(window).width() < 571 || overlayMode === 1) { //checks window
    closeOverlay(2);
  }else{
    closeOverlay(1);
  }
});