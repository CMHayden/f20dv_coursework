
function sunburst(domEle) {


    var sunburstObj = {};


    var width = 960;
    var height = 700;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory20)
    var data;  
    var root;
    var previousNode; //store the center point of the sunburst
    let burst = d3.select("#" + domEle)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    var backArr = []

   

    sunburstObj.loadAndRenderDataset = function (dataset) {

        data = dataset;      
        render(data);
        return sunburstObj;
    } 

 
    function render(dataUsed) {
        dataProcessor(dataUsed);
        GUP();

    }
    
    var xScale = d3.scaleLinear()
        .domain([0, radius])
        .range([0, Math.PI * 2])

 
   
       const slices = d3.arc()
        .startAngle(d => xScale(d.x0))
        .endAngle(d => xScale(d.x1))
        .innerRadius(d =>  d.y0)
        .outerRadius(d => d.y1);

    function dataProcessor(dataSet) {
        //stores the data in d3 hierarchical format for later processing
        root = d3.hierarchy(dataSet)
            .sum(function (d) { return d.size });

        //helper to put data in sunburst format
        var sunburstFormat = d3.partition()
            .size([360, radius])


        // put data into sunburst mode
        sunburstFormat(root)


        root.each(d => d.current = d)
        //sets previous node to root to start
        previousNode = root
    }

    //tooltip div
    var tooltip = d3.select("#" + domEle)
        .append('div')
        .attr('class', 'tooltip')        
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

    //click function
    function clicked(d) {
        
        //checking to see if the middle item is has the same name as the previous item clicked, if so then it means that the middle was clicked 
        if (previousNode.data["name"].localeCompare(d.data["name"]) == 0) {
            
           
            render(backArr[backArr.length - 1]);
            data = backArr[backArr.length - 1];
            backArr.splice(backArr.length - 1, 1);            
        

        } else {

            backArr.push(data);            
            render(d.data);
            data = d.data;
            previousNode = d;

        }    


    }




    function GUP() {

        if (root.descendants().length > 1) {


            d3.selectAll("text").remove();
            d3.selectAll("g").selectAll("path").remove();




            var selection = burst.selectAll('path')
                .data(root.descendants()) //array of all the nodes

           

            //displays the data
            var enterSelection = selection
                .enter().append('path')
                .attr("display", function (d) { return d.depth == 0 })
                .attr("d", d => slices(d.current))
                .style('stroke', '#fff')
                .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
                .on('click', clicked)

            enterSelection.selectAll("path").transition()
                .duration(1000)
                .delay(1000)
                .tween("data", d => {
                    const i = d3.interpolate(d.x0, d.x1);
                    return t => d.x0 = i(t);
                })

         
            enterSelection
                .on("mouseover", mouseOver)
                .on("mousemove", function (d) {
                    tooltip.html(d.value)
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
                .duration(500)
                .delay(500)
                .attr("transform", function (d) {
                    return "translate(" + slices.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return d.data.name;
                });

            /*
            //displays the data
            var updateSelection = selection
                .attr("d", d => slices(d.current))
                .attr("display", function (d) { return d.depth == 0 })
                .style('stroke', '#fff')
                .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
                .on('click', clicked)



            updateSelection
                .on("mouseover", mouseOver)
                .on("mousemove", function (d) {
                    tooltip.html(d.data.size)
                        .style("left", (d3.event.pageX - 34) + "px")
                        .style("top", (d3.event.pageY - 12) + "px");
                })
                .on("mouseout", mouseOut)


            updateSelection.selectAll("path")
                .transition()
                .duration(1000)
                .delay(1000)
                .tween("data", d => {
                    const i = d3.interpolate(d.x0, d.x1);
                    return t => d.x0 = i(t);
                })

           

            //adds text to sunburst
            burst.selectAll("slice")
                .transition()
                .duration(500)
                .delay(500)
                .attr("transform", function (d) {
                    return "translate(" + slices.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return d.data.name;
                });

*/

            var exitSelection = selection.exit()
                .classed("exitSelection", true)
                .transition()
                .duration(500)
                .remove();


            


            return sunburstObj;

        } else {
            //if the clicked node has no children it doesn't allow to go deeper
        }
    }

    return sunburstObj;

}

