function mapPop(domElement) {
    /*
        data taken from: https://www.hesa.ac.uk/news/17-01-2019/sb252-higher-education-student-statistics/location.
        license for it is: Creative Commons Attribution 4.0 International Licence
    */
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
    .defer(d3.csv, "data/sb252-figure-6.csv")
    .await(ready)

    var projection = d3.geoMercator()
    	.translate([width/2, height])
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

    	var circle = svg.selectAll(".circle")
    	.data(universities)
    	.enter().append("circle")
        .attr("id", function(d){return 'id' + d.UKPRN; })
        .attr("r", 0)
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
                if (hesaDict[d["Institution code (UKPRN)"]]) {
                    if (hesaDict[d["Institution code (UKPRN)"]] < 1000) { return 1; } 
                    else if (hesaDict[d["Institution code (UKPRN)"]] > 1000 && hesaDict[d["Institution code (UKPRN)"]] < 10000) { return 2; } 
                    else if (hesaDict[d["Institution code (UKPRN)"]] > 10000 && hesaDict[d["Institution code (UKPRN)"]] < 20000) { return 3; } 
                    else { return 5; };
                }
            }) 
            circle.on('mousedown.log', function () {
                console.log(d);
            })
        })
        
        function update(data) {
            var spiderData = {'1 Star': parseInt(data["1*"]), '2 Stars': parseInt(data["2*"]), '3 Stars': parseInt(data["3*"]), '4 Stars': parseInt(data["4*"]), '5 Stars': 10};
            spider.loadAndRenderDataset(spiderData);
        };
    }
}