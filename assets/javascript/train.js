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
var trainFirst = moment($("#first-input").val().trim(), "h:mmss a").format("X");
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(trainFirst)

var newRoute = {
    name: trainName,
    dest: trainDest,
    freq: trainFreq,
    first: trainFirst,
};
    alert("Added to DB")
  
database.ref().push(newRoute);

$("#train-name-input").val("");
$("#dest-input").val("");
$("#freq-input").val("");
$("#first-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFreq = childSnapshot.val().freq;
    var trainFirst = childSnapshot.val().first;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(trainFirst)

    var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1,"years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); 
    var tRemainder = diffTime % trainFreq;
    var tMinutesTillTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    console.log(firstTimeConverted);
    console.log(currentTime); 
    console.log(diffTime); 
    console.log(tRemainder);  
    console.log(tMinutesTillTrain);
    console.log(nextTrain);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
        
    );

$("#route-table > tbody").append(newRow)
});

})