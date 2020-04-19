/* HELPER FUNCTIONS */

function getFeatures(jsonData) {
    var features = Object.keys(jsonData); // Stores string associated with jsonData values.
    return features
}

function getTicks(jsonData) {
    let ticks = [];
    var max = getMax(jsonData);

    for(var i=1 ; i<=5 ; i++){
        ticks.push(Math.floor((max / 5) * i) + 1)
    }
    return ticks;
}

//getting labels for non hierarchical stacked bar chart
function getLegend(jsonData)
{    
    var features = [];
    var temp = [];

    for (var d in jsonData[0]) {
        temp.push(d);      
    }       

    for (var i = 1; i < temp.length; i++) {
        features.push(temp[i])
       // console.log(temp[i])
    }

    return features;
}

//getting labels for hierarchical stacked bar chart
function getLabels(tree) {
    var features = [];
    var temp = [];
    
    for (var d in tree[0].data.children) {
        temp.push(tree[0].data.children[d]["name"]);
    }
    
    for (var i = 0; i < temp.length; i++) {
        features.push(temp[i])
    }

    return features;
}

function createJson(tree) {
    var data = [];
    return data;
}

function getMax(jsonData) {
    var temp = [];

    Object.keys(jsonData).forEach(function(key) {
        temp.push(jsonData[key]);
    });

    return Math.max.apply(null, temp);
}

