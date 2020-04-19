function packLayout(domEle, tree, sunburst)
{
    var packLayoutObj = {};
    var tree;
    var sunburst;
    var width = 700;
    var height = 800;
    var root;
    var data;
    var margin = { top: 20, right: 160, bottom: 35, left: 100 };
    var color = d3.scaleOrdinal(d3.schemeCategory20)
    var previousNode;
    var backArr = [];

    packLayoutObj.loadAndRenderDataset = function (dataset, bool, d, removeBool, removeFromOut) {

        if (d) {
            if (removeFromOut) {
                if(removeBool) {
                    data = backArr[backArr.length - 1];
                    backArr.splice(backArr.length - 1, 1);  
                } else {
                    backArr.push(data);
                    data = d.data;
                    previousNode = d;
                }
            }
        }

        data = dataset;
       
        render(data);

        if(bool) {
            tree.loadAndRenderDataset(data, false, d, removeBool, true);
            sunburst.loadAndRenderDataset(data, false, d, removeBool, true);
        }

        return packLayoutObj;
    } 

   packLayoutObj.setGraphs = function (tree2, sun) {
        tree = tree2;
        sunburst = sun;
    } 

    var pack = d3.select("#" + domEle)
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    function render(data) {
        dataProcessor(data);
        draw();
    }

    function dataProcessor(dataSet) {
        //stores the data in d3 hierarchical format for later processing
        root = d3.hierarchy(dataSet)
            .sum(function (d) { return d.size });

        //helper to put data in pack format
        var packFormat = d3.pack().size([width, height]);

        // put data into pack mode
        packFormat(root)
        packFormat.padding(10)
       
        //sets previous node to root to start
        previousNode = root
    }

    //click function
    function clicked(d) {
        if (d.data["name"] != "Countries") {
            //checking to see if the parent circle pressed has the same name as the previous item clicked, if so then it means that the parent circle was clicked 
            if (previousNode.data["name"].localeCompare(d.data["name"]) == 0) {

                packLayoutObj.loadAndRenderDataset(backArr[backArr.length - 1], true, d, true, false);
                data = backArr[backArr.length - 1];
                backArr.splice(backArr.length - 1, 1);

            } else {
                if (typeof d.data.valid == "undefined") {

                    backArr.push(data);
                    packLayoutObj.loadAndRenderDataset(d.data, true, d, false, false);
                    data = d.data;
                    previousNode = d;

                } else {
                    console.log("stop");
                }
            }
        }
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

    function draw() {

        d3.select("#" + domEle).selectAll("text").remove();
        d3.select("#" + domEle).selectAll("g").selectAll("circle").remove();

        var selection = pack.selectAll('circle')
            .data(root.descendants()) //array of all the nodes
      
        var enterSelection = selection
            .enter().append('g')
            
        var circles = enterSelection.append('circle')
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; })
            .attr('r', function (d) { return d.r; })          
            .style("fill", function (d) { return color(d.data.name); })
            .on('click', clicked)
 
        enterSelection
            .on("mouseover", mouseOver)
            .on("mousemove", function (d) {
                tooltip.html(d.data.name)                       
                    .style("left", (d3.event.pageX - 100) + "px")
                    .style("top", (d3.event.pageY - 50) + "px");
            })
            .on("mouseout", mouseOut)      

        return packLayoutObj;
    }

    return packLayoutObj;
}