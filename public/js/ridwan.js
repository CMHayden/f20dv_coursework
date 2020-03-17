function ridwansGraph(domElement, spider) {
	let data = [{'1 Star': 5, '2 Stars': 8, '3 Stars': 10, '4 Stars': 9, '5 Stars': 4}];
    let features = ["1 Star","2 Stars","3 Stars","4 Stars","5 Stars"];
    let ticks = [2, 4, 6, 8, 10];

    let width = 960, height = 1600;

	var svg = d3.select('#'+ domElement)
		.append("svg")
    	.attr("width", width)
    	.attr("height", height)
    	.append("g");

    d3.queue()
    .defer(d3.json, "data/uk.json")
    .defer(d3.csv, "data/learning-providers-plus.csv")
    .defer(d3.csv, "data/REF2014_Results.csv")
    .await(ready)

    var projection = d3.geoMercator()
    	.translate([width/2, height])
    	.scale(1150)

    var path = d3.geoPath()
    	.projection(projection)

    function ready (error, data, universities, stars) {
    	countries = topojson.feature(data, data.objects.subunits).features;
    	svg.selectAll(".country")
    	.data(countries)
    	.enter().append("path")
    	.attr("class", "country")
    	.attr("d", path)
        .style("fill", "#D3D3D3");

    	var circle = svg.selectAll(".circle")
    	.data(universities)
    	.enter().append("circle")
    	.attr("r", 1)
        .attr("id", function(d){return 'id' + d.UKPRN; })
    	.attr("cx", function(d){
    		var point = projection([d.LONGITUDE, d.LATITUDE])
    		return point[0];
    	})
    	.attr("cy", function(d){
    		var point = projection([d.LONGITUDE, d.LATITUDE])
    		return point[1];  
    	})

        stars.forEach(function(d) {
            circle = d3.select('#id' + d["Institution code (UKPRN)"]); 
            circle.attr("r", function(){
                if (d["4*"] < 5) { return 1 } else if (d["4*"] < 10) { return 2 } else if (d["4*"] < 20) { return 3 } else if (d["4*"] < 30) { return 4 } else if (d["4*"] < 4) { return 5 } else { return 6 }
            }) 
            circle.on('mousedown.log', function () {
                console.log(d);
                update(d);
            })
        })

    	/*svg.selectAll(".labels")
    	.data(universities)
    	.enter().append("text")
    	.attr("class", "label")
    	.attr("x", function(d){
    		var point = projection([d.LONGITUDE, d.LATITUDE])
    		return point[0];
    	})
    	.attr("y", function(d){
    		var point = projection([d.LONGITUDE, d.LATITUDE])
    		return point[1];
    	})
    	.text(function(d) {
    		return d.VIEW_NAME
    	})
    	.attr("dx", 10)
    	.attr("dy", 5)*/

        function update(data) {
            var spiderData = [{'1 Star': parseInt(data["1*"]), '2 Stars': parseInt(data["2*"]), '3 Stars': parseInt(data["3*"]), '4 Stars': parseInt(data["4*"]), '5 Stars': 10}];
            spider.loadAndRenderDataset(spiderData[0])
        };
    }
}