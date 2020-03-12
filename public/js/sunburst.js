
function sunburst(domEle) {


    var sunburstObj = {};


    var width = 960;
    var height = 700;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory20)
    var data;
    var root;
    let burst = d3.select("#" + domEle)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');;


   

    sunburstObj.loadAndRenderDataset = function (dataset) {

        data = dataset;    
        dataProcessor();
        GUP();
        return sunburstObj;
    } 

 

    var xScale = d3.scaleLinear()
        .domain([0, radius])
        .range([0, Math.PI * 2])

    //calculates the sizes of the different data slices
    var slices = d3.arc()
        .startAngle(d => xScale(d.x0))
        .endAngle(d => xScale(d.x1))
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1)

    

   

    function dataProcessor() {
        //stores the data in d3 hierarchical format for later processing
        root = d3.hierarchy(data)
            .sum(function (d) { return d.size });

        //helper to put data in sunburst format
        var sunburstFormat = d3.partition()
            .size([360, radius])


        // put data into sunburst mode
        sunburstFormat(root)
    }

    //tooltip div
    var tooltip = d3.select("#" + domEle)
        .append('div')
        .attr('class', 'label')
        .style("background", "lightblue")
        .style("position", "absolute")
        .style("visibility", "hidden");

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

    function GUP() {

          
        d3.selectAll("text").remove();
        
        var selection = burst.selectAll('path')
            .data(root.descendants()) //array of all the nodes



        //displays the data
        var enterSelection = selection
            .enter().append('path')       
            .attr("display", function (d) { return d.depth ? null : "none"; })
            .attr("d", slices)                   
            .style('stroke', '#fff')
            .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })


        enterSelection
            .on("mouseover", mouseOver)
            .on("mousemove", function (d) {
                tooltip.html(d.data.size)
                    .style("left", (d3.event.pageX - 34) + "px")
                    .style("top", (d3.event.pageY - 12) + "px");
            })
            .on("mouseout", mouseOut)

        //adds text to sunburst
        burst.selectAll("slice")  
            .data(root.descendants())
            .enter()
            .append("text")
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("transform", function (d) {
                    return "translate(" + slices.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return d.data.name;
                });


        //displays the data
        var updateSelection = selection
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("display", function (d) { return d.depth ? null : "none"; })
                .attr("d", slices)                
                .style('stroke', '#fff')
                .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })

        updateSelection
            .on("mouseover", mouseOver)
            .on("mousemove", function (d) {
                tooltip.html(d.data.size)
                    .style("left", (d3.event.pageX - 34) + "px")
                    .style("top", (d3.event.pageY - 12) + "px");
            })
            .on("mouseout", mouseOut)

        //adds text to sunburst
        burst.selectAll("slice")
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("transform", function (d) {
                    return "translate(" + slices.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return d.data.name;
                });

        var exitSelection = selection.exit()
            .classed("exitSelection", true)
            .transition()
            .duration(500)
            .remove();

        return sunburstObj;
    }

    return sunburstObj;

}