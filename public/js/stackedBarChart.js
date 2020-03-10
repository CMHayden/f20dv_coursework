
function stacked(domEle)
{   /*add to app.js??
    var stackedModel = modelConstructor();
    var dataModel;

    d3.queue()
        .defer(d3.csv, "data/REF2014_Results.csv")
        .defer(d3.csv, "data/learning-providers-plus.csv")
        .defer(d3.csv, "data/uk-towns.csv")  // from https://github.com/bwghughes/badbatch
        .defer(d3.csv, "data/Towns_List (1).csv")
        .await(dataDisplay)



    function dataDisplay(error, universities, towns, countries, countries2) {

        stackedModel.processData(universities, towns, countries, countries2);
        dataModel = stackedModel.model().json;
        console.log("datamodel")
        //console.log(dataModel.json)

    }
        */
    var stackedBarChartObj = {};

    var data;
    var stackKey;
    var layers;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var xScaleDomain = function (d) { return d.key; };
    var yScaleDomainPart = function (d) { return d[0] + d[1]; };

    let stackedBarChart = d3.select("#" + domEle).append("svg");

    stackedBarChartObj.loadAndRenderDataset = function (dataset)
    {
       
        data = dataset;
        stackKey = getLegend(data);
        for (var i in stackKey.length) {
            console.log(stackKey[i])
        }
        render();
        return stackedBarChartObj;
    } 


   

    function draw()
    {
        d3.selectAll("g").selectAll("text").remove();
        d3.selectAll("tick").remove();
        d3.selectAll("line").remove();
        d3.selectAll("text").remove();

        xScale = d3.scaleBand().range([0, width]).padding(0.1),
        yScale = d3.scaleLinear().range([height, 0]),
       
        stackedBarChart
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        
        var stack = d3.stack()
            .keys(stackKey)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);

       layers = stack(data);

       
       
        
        data.sort(function (a, b) { return b.total - a.total; });

        xScale.domain(data.map(xScaleDomain)); 
        yScale.domain([0, d3.max(layers[layers.length - 1], yScaleDomainPart)]).nice();


        xAxis = d3.axisBottom(xScale);
        stackedBarChart.append("g")          
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis);

        yAxis = d3.axisLeft(yScale);
        stackedBarChart.append("g")            
            .attr("class", "axis axis--y")
            .attr("transform", "translate("+ 20 + "," + 20 +")")
            .call(yAxis);

        
        stackedBarChart.select("xAxis")            
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis);

        stackedBarChart.select("yAxis")           
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(yAxis);        
 
    

    }

    function GUP()
    {
        var selection = stackedBarChart.selectAll(".layer")
            .data(layers)

        var exitSelection = selection.exit()
            .classed("exitSelection", true)
            .transition()
            .duration(500)
            .remove();


        var enterSelection = selection
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function (d, i) { return color(i); });

        enterSelection.selectAll("rect")
            .data(function (d) { return d; })            
            .enter().append("rect")
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("x", function (d) { return xScale(d.data.key); })
                .attr("y", function (d) { return yScale(d[1]); })
                .attr("height", function (d) { return yScale(d[0]) - yScale(d[1]); })
                .attr("width", xScale.bandwidth());


       
      
        var updateSelection = selection        
            .attr("class", "layer")
            .style("fill", function (d, i) { return color(i); });

        updateSelection.selectAll("rect")
            .data(function (d) { return d; })
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("x", function (d) { return xScale(d.data.key); })
                .attr("y", function (d) { return yScale(d[1]); })
                .attr("height", function (d) { return yScale(d[0]) - yScale(d[1]); })
                .attr("width", xScale.bandwidth());
    


        return stackedBarChartObj;
    }


    function render()
    {
        draw();
        GUP();
       
    }

    return stackedBarChartObj;

    
   
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

    //pie chart colours
    var colours = d3.scaleOrdinal(d3.schemeCategory10);

    //putting the data into slices
    var pieChart = d3.pie().value(function (d) {
        return d.code;
    });

    //creates the slices 
    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    //giving colour to the different slices and makes the pie chart
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

    
    //adding text to the slices in the middle of the slices
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

  
    
  
}


function sunburst()
{


    var data = {
        "name": "Grades", "children": [{
            "name": "HW",
            "children": [{ "name": "MACS", "size": 50 }, { "name": "Mech Eng", "size": 1 }, { "name": "Lang", "size": 3 }, { "name": "Business", "size": 6 }]
        }, {
            "name": "Edinburgh Uni",
                "children": [{ "name": "Comp Sci", "size": 2 }, { "name": "Med School", "size": 5 }, {
                "name": "Art", "size": 3
            }]
        }, {
            "name": "Napier",
                "children": [{ "name": "Comp Sci", "size": 1 }, { "name": "Art", "size": 2 },  { "name": "Nursing", "size": 4 }, { "name": "Film", "size": 3}]
        }]
    };


    var width = 960;
    var height = 700;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory20)

    var svg = d3.select('#sunburst')
        .append('svg')
            .attr('width', width)
            .attr('height', height)
        .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');;

    //helper to put data in sunburst format
    var sunburstFormat = d3.partition()
        .size([360, radius])
        
    
    //stores the data in d3 hierarchical format for later processing
    var root = d3.hierarchy(data)  
        .sum(function (d) { return d.size }); 

    // put data into sunburst mode
    sunburstFormat(root)

    var xScale = d3.scaleLinear()
        .domain([0, radius])
        .range([0, Math.PI * 2])
       
    //calculates the sizes of the different data slices
    var slices = d3.arc()
        .startAngle(d => xScale(d.x0))
        .endAngle(d => xScale(d.x1))
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1)

    //tooltip div
    var tooltip = d3.select("#sunburst")
        .append('div')
        .attr('class', 'label')
        .style("background", "lightblue")
        .style("position", "absolute")
        .style("visibility", "hidden");


    //displays the data
    var path = svg.selectAll('path')
        .data(root.descendants()) //array of all the nodes
        .enter().append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", slices)
        .on("mouseover", mouseOver)
        .on("mousemove", function (d) {
            tooltip.html(d.data.size)
                .style("left", (d3.event.pageX - 34) + "px")
                .style("top", (d3.event.pageY - 12) + "px");
        })
        .on("mouseout", mouseOut)
        .style('stroke', '#fff')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })


    //mouseOver for tooltip
    function mouseOver() {
        tooltip.transition()
            .duration(500)
            .style("visibility", "visible");
    }
 
    //mouseOut for tooltip
    function mouseOut() {
        tooltip.transition()
            .duration(500)
            .style("visibility", "hidden");	
    }
   

    //adds text to sunburst
    svg.selectAll("slice")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("transform", function (d) {
            return "translate(" + slices.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.data.name;
        });
       
   
       

}


