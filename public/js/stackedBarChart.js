
function stacked()
{
    var data = [
        { planet: "Mercury", size: "3", temperature: "200", distance: "4" },
        { planet: "Venus", size: "5", temperature: "180", distance: "6" },
        { planet: "Earth", size: "8", temperature: "25", distance: "8" },
        { planet: "Mars", size: "7", temperature: "9", distance: "10" },
    ];

    var margin = { top: 20, right: 160, bottom: 35, left: 30 };

    var height = 900 - margin.left - margin.right;
    var width = 550 - margin.top - margin.bottom ;

    var svg = d3.select('svg')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
       // .append("g")
    console.log(data)

    var colours = (["blue", "green", "yellow", "red"]);

    var categories = ["size", "temperature", "distance"];

    var keys = data.slice(1);
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
    //////////////////////////////


    /*
   

    var dataToDisplay = d3.stack()(categories.map(function(planetDets)
    {
        return data.map(function (d)
        {
            return { x: d.planet, y: +d[planetDets] };
        });
    }));

    console.log(data.length)

    //
   


    svg.append("g")
        .attr("class", "y")
        .call(createYAxis)

    svg.append("g")
        .attr("class", "x")
        .call(createXAxis)
    
    var colours = (["blue", "green", "yellow", "red"]);

    var planetGroup = svg.selectAll("g.dets")
        .data(dataToDisplay)
        .enter().append("g")
        .attr("class", "dets")
        .style("fill", function (d, i) { return colours[i]; });

    var rect = planetGroup.selectAll("rect")
        .data(function (d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return xData(d.x); })
        .attr("y", function (d) { return yData(d.y0 + d.y); })
        .attr("height", function (d) { return yData(d.y0) - yData(d.y0 + d.y); })
        .attr("width", xData.range)
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
