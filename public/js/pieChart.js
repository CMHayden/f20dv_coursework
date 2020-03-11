function pie(domEle) {

    var pieChartObj = {};
    var data;
    var margin = { top: 100, right: 160, bottom: 35, left: 30 };
    var width = 300;
    var height = 300;

    //pie chart colours
    var colours = d3.scaleOrdinal(d3.schemeCategory10);

    //create the radius of the pie
    var radius = Math.min(width, height) / 2
    margin

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
        /*
        var selection = pieChart.selectAll("slice")
            .data(sliceMaker(data))

        //giving colour to the different slices and makes the pie chart
        var enterSelection = selection        
            .enter()
            .append("path")
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("d", path)
                .attr("data-legend", function (d) { return d.data.name; })
                .attr("data-legend-pos", function (d, i) { return i; })
                .attr("fill", function (d) {
                    return colours(d.data.code);
                });


        //adding text to the slices in the middle of the slices
        pieChart.selectAll("slice")
            .data(sliceMaker(data))
            .enter()
            .append("text")
            .attr("transform", function (d) {
                return "translate(" + path.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.data.name + " code: " + d.data.code;
            });


        var updateSelection = selection      
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("d", path)
                .attr("data-legend", function (d) { return d.data.name; })
                .attr("data-legend-pos", function (d, i) { return i; })
                .attr("fill", function (d) {
                    return colours(d.data.code);
                });


        //adding text to the slices in the middle of the slices
        updateSelection.selectAll("slice")            
            .transition()
            .duration(1000)
            .delay(1000)
                .attr("transform", function (d) {
                    return "translate(" + path.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return d.data.name + " code: " + d.data.code;
                });

        selection.exit().remove();
        */
        
        //giving colour to the different slices and makes the pie chart
        pieChart.selectAll("slice")
            .data(sliceMaker(data))
            .enter()
            .append("path")
            .attr("d", path)
            .attr("data-legend", function (d) { return d.data.key; })
            .attr("data-legend-pos", function (d, i) { return i; })
            .attr("fill", function (d) {
                return colours(d.data.code);
            });


        //adding text to the slices in the middle of the slices
        pieChart.selectAll("slice")
            .data(sliceMaker(data))
            .enter()
            .append("text")
            .attr("transform", function (d) {
                return "translate(" + path.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.data.key + " code: " + d.data.code;
            });

        

        return pieChartObj;
    }

    return pieChartObj;

}