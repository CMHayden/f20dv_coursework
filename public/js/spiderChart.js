function spiderChart(domElement) {
    /* 
     * Can accept variables by removing data, features, and ticks.
     * data: Array of objects with the same amount of properties as features.
     * features: tags for giving names to each line.
     * ticks: array of values for the circles growing outwards.
    */

    var spiderChartObj = {};
    var dataset;
    let features;
    let ticks;

    let spiderChart = d3.select('#'+ domElement).append('svg')

    let radialScale = d3.scaleLinear()
        .domain([0,10])
        .range([0,80]);


    spiderChartObj.loadAndRenderDataset = function (data) {
        dataset=data; //create local copy of references so that we can sort etc.
        features = getFeatures(dataset)
        ticks = getTicks(dataset)
		draw();
		return spiderChartObj;
	}

    /* DRAW THE GRAPH */

    function draw() {
        renderGraph()
        renderData()
        return spiderChartObj
    }

    function renderGraph() {
        spiderChart
            .attr("width", 300)
            .attr("height", 300)
    
        ticks.forEach(t =>
            spiderChart.append("circle")
                .attr("cx", 100)
                .attr("cy", 100)
                .attr("fill", "none")
                .attr("stroke", "gray")
                .attr("r", radialScale(t))
        );

        ticks.forEach(t =>
            spiderChart.append("text")
                .attr("x", 105)
                .attr("y", 105 - radialScale(t))
                .text(t.toString())
                .attr("fill", "gray")
        );

        for (var i = 0; i < features.length; i++) {
            let ft_name = features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            let line_coordinate = angleToCoordinate(angle, 11);
            let label_coordinate = angleToCoordinate(angle, 11.5);
        
            //draw axis line
            spiderChart.append("line")
                .attr("x1", 100)
                .attr("y1", 100)
                .attr("x2", line_coordinate.x)
                .attr("y2", line_coordinate.y)
                .attr("stroke","gray");
        
            //draw axis label
            spiderChart.append("text")
                .attr("x", label_coordinate.x)
                .attr("y", label_coordinate.y)
                .attr("fill", "gray")
                .text(ft_name);
        }
        return spiderChartObj
    }

    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": 100 + x, "y": 100 - y};
    }

    function getPathCoordinates(data_point){
        let coordinates = [];
        console.log("inside helper function")
        for (var i = 0; i < features.length; i++){
            let ft_name = features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
        }
        return coordinates;
    }

    /* DRAW AREA */
    function renderData() {

        let line = d3.line()
            .x(d => d.x)
            .y(d => d.y);

        let colors = ["lightblue"];


            let d = dataset;
            let color = colors;
            let coordinates = getPathCoordinates(d, features);
        
            //draw the path element
            spiderChart.append("path")
                .datum(coordinates)
                .attr("d",line)
                .attr("stroke-width", 3)
                .attr("stroke", color)
                .attr("fill", color)
                .attr("stroke-opacity", 1)
                .attr("opacity", 0.5);
        
        return spiderChartObj
    }


    return spiderChartObj
}