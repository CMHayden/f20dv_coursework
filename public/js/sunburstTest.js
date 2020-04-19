
function sunburstH(domEle) {


    var sunburstObj = {};


    var width = 960;
    var height = 700;
    var tree;
    var pack;
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

   

    sunburstObj.loadAndRenderDataset = function (dataset, bool, d, removeBool, id) {
        if (d) {
            if(removeBool) {
                data = backArr[backArr.length - 1];
                backArr.splice(backArr.length - 1, 1);  
            } else {
                backArr.push(data);
                data = d.data;
                previousNode = d;
            }
        }

        data = dataset;      
        render(data, id);
        if(bool) {
            tree.loadAndRenderDataset(data, false, d, removeBool);
            pack.loadAndRenderDataset(data, false, d, removeBool);
        }
        return sunburstObj;
    } 

 sunburstObj.setGraphs = function (tree2, pack2) {
        tree = tree2;
        pack = pack2;
    } 
    function render(dataUsed, id) {
        dataProcessor(dataUsed);
        GUP(id);

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
        if (d.data["name"] != "Countries") {

            if (previousNode.data["name"].localeCompare(d.data["name"]) == 0) {
            
           
                sunburstObj.loadAndRenderDataset(backArr[backArr.length - 1], true, d, true);
                data = backArr[backArr.length - 1];
                backArr.splice(backArr.length - 1, 1);            
        

            } else {
                if (typeof d.data.valid == "undefined") {
                    backArr.push(data);            
                    sunburstObj.loadAndRenderDataset(d.data, true, d, false);
                    data = d.data;
                    previousNode = d;
                } else {
                    console.log("stop")
                }

            }    
        }
    }




    function GUP(id) {
        if (root.descendants().length > 1) {


            d3.select("#" + domEle).selectAll("text").remove();
            d3.select("#" + domEle).selectAll("g").selectAll("path").remove();




            var selection = burst.selectAll('path')
                .data(root.descendants()) //array of all the nodes

           

            //displays the data
            var enterSelection = selection
                .enter().append('path')
                .attr("id", function (d) {return d["data"]["name"]})  
                .attr("display", function (d) { return d.depth == 0 })
                .attr("d", d => slices(d.current))
                .style('stroke', '#fff')
                .style("fill", function (d) { 
                    if (id !== undefined) {
                        if(d["data"]["name"].toLowerCase() == id["PROVIDER_NAME"].toLowerCase()) {
                            return color((d.children ? d : d.parent).data.name);
                        } else {
                            return "#f95d6a"
                        }
                    } else {
                        return color((d.children ? d : d.parent).data.name);
                    }})

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
                    tooltip.html(d.data["name"])
                        .style("left", (d3.event.pageX - 100) + "px")
                        .style("top", (d3.event.pageY - 50) + "px");
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

