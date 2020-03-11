/* HELPER FUNCTIONS */

function getFeatures(jsonData) {
    var features = Object.keys(jsonData); // Stores string associated with jsonData values.
    return features
}

function getTicks() {
    let ticks = [];
    var max = getMax;

    for(var i=1 ; i<=5 ; i++){
        ticks.push(Math.floor((max / 5) * i) + 1)
    }

    return ticks;
}

function getLegend(jsonData)
{    
    var features = [];
    var temp = [];
    console.log(jsonData) 
    for (var d in jsonData[0]) {
        temp.push(d);      
    }      
    

    for (var i = 1; i < temp.length; i++) {
        features.push(temp[i])
        console.log(temp[i])
    }

    return features;

}

function getMax(jsonData) {
    var temp = [];

    Object.keys(jsonData).forEach(function(key) {
        temp.push(jsonData[key]);
    });

    return Math.max.apply(null, temp);
}

