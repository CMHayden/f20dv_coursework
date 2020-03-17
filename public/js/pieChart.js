function pie(domEle) {
    
    var pieChartObj = {};
    var data;
    var margin = { top: 20, right: 160, bottom: 35, left: 100 };
    var width = 300;
    var height = 300;

    //pie chart colours
    var colours = d3.scaleOrdinal(d3.schemeCategory10);

    //create the radius of the pie
    var radius = Math.min(width, height) / 2
    

    //creates the slices 
    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    //link the svg to #pieChart
    var pieChart = d3.select("#" + domEle).append("svg")

    
    pieChartObj.loadAndRenderDataset = function (dataset)
    {
        data = dataset;
        GUP();
        return pieChartObj;
    }


    
    function GUP()
    {
        pieChart
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");


        //putting the data into slices
        var sliceMaker = d3.pie().value(function (d) {
            return d.code;
        });


        var selection = pieChart.select("g").selectAll("slice")
            .data(sliceMaker(data))

        //giving colour to the different slices and makes the pie chart
        var enterSelection = selection
            .enter()
            .append("path")
            .attr("d", path)
            .attr("data-legend", function (d) { return d.data.name; })
            .attr("data-legend-pos", function (d, i) { return i; })
            .attr("fill", function (d) {
                return colours(d.data.code);
            });
          
            
            
        //adding text to the slices in the middle of the slices
        pieChart.select("g").selectAll("slice")
            .data(sliceMaker(data))
            .enter()
            .append("text")
            .transition()
            .duration(1000)
            .attr("transform", function (d) {
                return "translate(" + path.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.data.key + " code: " + d.data.code;
            });

        var mergeSelection = enterSelection.merge(selection)

        mergeSelection            
            .transition()            
            .duration(1000)
            .attrTween("d", arcTween)

        selection.exit().remove();

        //makees transitions possible
        function arcTween(b) {            
            var interpolation = d3.interpolate({ startAngle: 0, end: 0 }, b);
            return function (t) { return path(interpolation(t)); };
        }

              

        return pieChartObj;
    }

    return pieChartObj;

}


