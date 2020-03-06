/* HELPER FUNCTIONS */

function getFeatures(jsonData) {
    var features = Object.keys(jsonData); // Stores string associated with jsonData values.
    return features
}

function getTicks(jsonData) {
    let ticks = [];
    var max;
    var temp = [];

    Object.keys(jsonData).forEach(function(key) {
        temp.push(jsonData[key]);
    });

    max = Math.max.apply(null, temp);

    for(var i=1 ; i<=5 ; i++){
        ticks.push(Math.floor((max / 5) * i) + 1)
    }

    return ticks;
}