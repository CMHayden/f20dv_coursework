function ridwansGraph(domElement, graph, isSun) {
    var map = {};
    var jsonTree;

    map.setData = function(data) {
        jsonTree = data;
    }

    let width = 960, height = 1600;

	var svg = d3.select('#'+ domElement)
		.append("svg")
    	.attr("width", width/2)
    	.attr("height", height/3)
    	.append("g");

    d3.queue()
    .defer(d3.json, "data/uk.json")
    .defer(d3.csv, "data/learning-providers-plus.csv")
    .defer(d3.csv, "data/REF2014_Results.csv")
    .defer(d3.csv, "data/sb252-figure-6.csv")
    .await(ready)

    var projection = d3.geoMercator()
    	.translate([width/3, height])
    	.scale(1150)

    var path = d3.geoPath()
    	.projection(projection)

    function ready (error, data, universities, stars, hesa) {
    	countries = topojson.feature(data, data.objects.subunits).features;
    	svg.selectAll(".country")
    	.data(countries)
    	.enter().append("path")
    	.attr("class", "country")
    	.attr("d", path)
        .style("fill", "#D3D3D3");

        for (var i = 0; i < universities.length; i++) {
            if (universities[i]["UKPRN"] == "10008026" || universities[i]["UKPRN"] == "10008010" ||  universities[i]["UKPRN"] == "10007807" || universities[i]["UKPRN"] == "10005343") {
                universities.splice(i, 1);
            }
        }

        for (var i = 0; i < stars.length; i++) {
            if (stars[i]["Institution code (UKPRN)"] == "10008026" || stars[i]["Institution code (UKPRN)"] == "10008010" ||  stars[i]["Institution code (UKPRN)"] == "10007807" || stars[i]["Institution code (UKPRN)"] == "10005343") {
                stars.splice(i, 1);
            }
        }
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

        var hesaDict = {}
        hesa.forEach(function(e) { 
            hesaDict[e["UKPRN"]] = parseInt(e["Total"].replace(/,/g, ''))
        })

        stars.forEach(function(d) {
            circle = d3.select('#id' + d["Institution code (UKPRN)"]); 
            circle.attr("r", function(){
                if (isSun) {
                    return 2;
                }
                if (hesaDict[d["Institution code (UKPRN)"]]) {
                    if (hesaDict[d["Institution code (UKPRN)"]] < 1000) { return 1; } 
                    else if (hesaDict[d["Institution code (UKPRN)"]] > 1000 && hesaDict[d["Institution code (UKPRN)"]] < 10000) { return 2; } 
                    else if (hesaDict[d["Institution code (UKPRN)"]] > 10000 && hesaDict[d["Institution code (UKPRN)"]] < 20000) { return 3; } 
                    else { return 5; };
                }
            }) 
            circle.on('mousedown.log', function () {
                update(d);
            })
            circle.on('mouseover', function(d){
                highlight(d, d["PROVIDER_NAME"]);
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
            var spiderData = {'1 Star': parseInt(data["1*"]), '2 Stars': parseInt(data["2*"]), '3 Stars': parseInt(data["3*"]), '4 Stars': parseInt(data["4*"]), '5 Stars': 10};
            graph.loadAndRenderDataset(spiderData);
        };

        function highlight(id) {
            if(isSun) {
                graph.loadAndRenderDataset(jsonTree, null, null, null, id);
            }
        };
    }
    return map;
}