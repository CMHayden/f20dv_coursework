
function stackedNon (domEle)
{   
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

        render();
        return stackedBarChartObj;
    } 

    function draw()
    {
        stackedBarChart.selectAll("g").selectAll("text").remove();
        stackedBarChart.selectAll("tick").remove();
        stackedBarChart.selectAll("line").remove();
        stackedBarChart.selectAll("text").remove();

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

        var enterSelection = selection
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function (d, i) { return color(i); })
            .on('click', clicked)

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
    
        selection.exit()
            .classed("exitSelection", true)
            .transition()
            .duration(500)
            .remove();

        return stackedBarChartObj;
    }


    function render()
    {
        draw();
        GUP(); 
    }

    return stackedBarChartObj;
}
