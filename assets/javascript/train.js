 var config = {
    apiKey: "AIzaSyBC229UHa1DhCJgesRLSrpnws4l7YFChWY",
    authDomain: "train-41457.firebaseapp.com",
    databaseURL: "https://train-41457.firebaseio.com",
    projectId: "train-41457",
    storageBucket: "train-41457.appspot.com",
    messagingSenderId: "86259278863"
  };
  firebase.initializeApp(config);

var database = firebase.database();
$( document ).ready(function(){

$("#add-route-btn").on("click", function(envent){
    event.preventDefault();
    alert("Submitted")

var trainName = $("#train-name-input").val().trim();
var trainDest = $("#dest-input").val().trim();
var trainFreq = $("#freq-input").val().trim();
var trainNext = $("#next-input").val().trim();
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(trainNext)

var newRoute = {
    name: trainName,
    dest: trainDest,
    freq: trainFreq,
    next: trainNext,
};
    alert("Added to DB")
  
database.ref().push(newRoute);

$("#train-name-input").val("");
$("#dest-input").val("");
$("#freq-input").val("");
$("#next-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFreq = childSnapshot.val().freq;
    var trainNext = childSnapshot.val().next;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(trainNext)

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(trainNext),
    );

$("#route-table > tbody").append(newRow)
});

})