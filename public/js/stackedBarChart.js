
function stacked()
{
    
   ////example 2
/*

    var data = [
        { "planet": "Mercury", "size": 3, "temperature": 200, "distance": 4 },
        { "planet": "Venus", "size": 5, "temperature": 180, "distance": 6 },
        { "planet": "Earth", "size": 8, "temperature": 25, "distance": 8 },
        { "planet": "Mars", "size": 7, "temperature": 9, "distance": 10 },
    ];

  
    var categories = ["size", "temperature", "distance"];
   



    var margin = { top: 20, right: 50, bottom: 30, left: 50 },
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .35);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var color = d3.scale.category20();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dataIntermediate = (categories.map(function (key, i) {
        return data.map(function (d, j) {
            return { x: d.planet, y: d[key] };
        });
    }));

    var dataStackLayout = d3.stack()(dataIntermediate);

    x.domain(dataStackLayout[0].map(function (d) {
        return d.x;
    }));

    y.domain([0,
        d3.max(dataStackLayout[dataStackLayout.length - 1],
            function (d) { return d.y0 + d.y; })
    ])
        .nice();

    var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return color(i);
        });

    layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    */




    ///////////////////////////////
    /*example working but with other data  https://bl.ocks.org/alexandrospopov/40c6c53cab476529402888e0d73c4e9c
    var n = 10, // number of samples
        m = 5; // number of series

    var data = d3.range(m).map(function () {
        return d3.range(n).map(Math.random);
    });

    console.log(data)
    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var y = d3.scaleLinear()
        .domain([0, n])
        .rangeRound([height, 0])
        .nice();

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1)
        .domain(d3.range(m));

    var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    console.log(data)

    svg.append("g").selectAll("g")
        .data(d3.stack().keys(d3.range(n))(data))
        .enter().append("g")
        .style("fill", function (d) { return z(d.key); })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d, i) { return x(i); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());
    */
    /////////////////////////
   /*
    var data = [
        { "planet": "Mercury", "size": 3, "temperature": 200, "distance": 4 },
        { "planet": "Venus", "size": 5, "temperature": 180, "distance": 6 },
        { "planet": "Earth", "size": 8, "temperature": 25, "distance": 8 },
        { "planet": "Mars", "size": 7, "temperature": 9, "distance": 10 },
    ];
    
    var margin = { top: 20, right: 160, bottom: 35, left: 30 };

    var height = 900 - margin.left - margin.right;
    var width = 550 - margin.top - margin.bottom ;

    var svg = d3.select('body')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
       // .append("g")
    console.log(data)

    var colours = d3.scaleOrdinal(d3.schemeCategory10)

    console.log(data.length + " length data")

    var categories = ["size", "temperature", "distance"];
    console.log("categories  " + categories[0])
    data.sort(function (a, b) { return b.total - a.total; });

    var xScale = d3.scaleOrdinal()
        .domain(data.map(function (d) { return d.planet; }))
        .range([0, width]);


    var yScale = d3.scaleLinear()
        .domain([0, 300]).nice()
        .range([0, height]);



    var dataToDisplay = (categories.map(function (key, i) {
        return data.map(function (d,j) {
            return { x: d.planet, y: d[key] };
        });
    }));
    //own data made

    var dataToDisplay = ( data.map(function (d) {
        console.log(d)
        var total = 0;
        for (i in categories) {
            console.log("ggkdj " + categories[i])
            total = total + d[categories[i]]
        }
        console.log("totel " + total)
        console.log("planet " + d.planet)
        // console.log(d.planet)
        //console.log(d[planetDets])
        return { x: d.planet, y: total };
    }));
  


  console.log("length " + dataToDisplay.length)
//var dataToDisplay = d3.stack().planet()(data)
 */
    //used when imported from csv
    //var dataToDisplay = d3.stack().keys(data.columns.slice(1))(data)
   
    /*
    console.log(dataToDisplay)

    console.log(categories.length + " length of doom")

    svg.append("g").selectAll("g")
        .data(d3.stack().keys(d3.range(categories.length))(dataToDisplay))
        .enter().append("g")
        .style("fill", function (d) { return colours(d.key); })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return xScale(d.x); })
        .attr("y", function (d) { return yScale(d.y); })
        .attr("height", function (d) { return yScale(d.y); })
        .attr("width", xScale.range())
    */
    ///////////////////////////////////////////////





    ///////////////////////////////////
    /*
    var dataToDisplay = d3.stack()(categories.map(function (planetDets) {
        return data.map(function (d) {
            return { x: d.planet, y: +d[planetDets] };
        });
    }));
    
   

  
    var xScale = d3.scaleOrdinal()
        .domain([0, data.length - 1])
        .range([0, width]);


    var yScale = d3.scaleLinear()
        .domain([0, 300])
        .range([0, height]);


    var XAxis = d3.axisBottom()
        .scale(xScale);


    var YAxis = d3.axisLeft()
        .scale(yScale);

    var category = svg.selectAll(".category")
        .data(dataToDisplay)
        .enter().append("g")
        .attr("class", "category")
        .style("fill", function (d, i) { return colour(i); });


    var rect = category.selectAll("rect")
        .data(function (d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return xScale(d.x); })
        .attr("y", function (d) { return yScale(d.y0 + d.y); })
        .attr("height", function (d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
        .attr("width", xScale.range())


    svg.append("g")
        .attr("class", "xAxis")
        .call(XAxis)

    svg.append("g")
        .attr("class", "yAxis")
        .call(YAxis)


*/



}


function pie()
{

    var data = [
        { "name": "Scotland", "code": 44 },
        { "name": "Germany", "code": 49},
        { "name": "HK", "code": 85 },
        { "name": "Spain", "code": 34 },
    
    ];
    var margin = { top: 20, right: 160, bottom: 35, left: 100 };
    var width = 450;
    var height = 450;

    //create the radius of the pie
    var radius = Math.min(width, height)/2
    margin 
    //link the svg to #pieChart
    var svg = d3.select('#pieChart')
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");


    var colours = d3.scaleOrdinal(d3.schemeCategory10);

    var pieChart = d3.pie().value(function (d) {
        return d.code;
    });


    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

  
    svg.selectAll("slice")
        .data(pieChart(data))
        .enter()
        .append("path")
        .attr("d", path)
        .attr("data-legend", function (d) { return d.data.name; })
        .attr("data-legend-pos", function (d, i) { return i; })
        .attr("fill", function (d) {
            return colours(d.data.code);
        });

    

    svg.selectAll("slice")
        .data(pieChart(data))
        .enter()
        .append("text")
        .attr("transform", function (d) {
            return "translate(" + path.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.data.name + " code: " + d.data.code;
        });

  

    var padding = 20,
        legx = radius + padding,
        legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + legx + ", 0)")
            .style("font-size", "12px")

    
  
}
