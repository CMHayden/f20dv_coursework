function scatter(data, domElement, titleX, titleY, displayChart) {

    const X = 0;
    const Y = 1;
    const TOP_LEFT = 0;
    const BOTTOM_RIGHT = 1;
    pie = pie("pieChart"); 


    // outer svg dimensions
    const width = 600;
    const height = 400;

    // padding around the chart where axes will go
    const padding = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50,
    };

    // inner chart dimensions, where the dots are plotted
    const plotAreaWidth = width - padding.left - padding.right;
    const plotAreaHeight = height - padding.top - padding.bottom;

    // radius of points in the scatterplot
    const pointRadius = 3;

    var maxX = 0;
    var maxY = 0;

    data.forEach(d => {
        if(d.x > maxX) { maxX = d.x}
    });

    data.forEach(d => {
        if(d.y > maxY) { maxY = d.y}
    })

    console.log(maxX);
    console.log(maxY)
    const xScale = d3.scaleLinear().domain([50, maxX + 1]).range([0, plotAreaWidth]);
    const yScale = d3.scaleLinear().domain([0, maxY + 1]).range([plotAreaHeight, 0]);

    // select the root container where the chart will be added
    const container = d3.select('#' + domElement);

    // initialize main SVG
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);

    // the main g where all the chart content goes inside
    const g = svg.append('g')
        .attr('transform', `translate(${padding.left} ${padding.top})`);

    // add in axis groups
    const xAxisG = g.append('g').classed('x-axis', true)
        .attr('transform', `translate(0 ${plotAreaHeight + pointRadius})`)
        .style('fill', '#ff7c43');

    // x-axis label
    g.append('text')
        .attr('transform', `translate(${plotAreaWidth / 2} ${plotAreaHeight + (padding.bottom)})`)
        .attr('dy', -4) // adjust distance from the bottom edge
        .attr('class', 'axis-label')
        .attr('text-anchor', 'middle')
        .text(titleX); // Change for title

    // add in y-axis groups
    const yAxisG = g.append('g').classed('y-axis', true)
        .attr('transform', `translate(${-pointRadius} 0)`);

    // y-axis label
    g.append('text')
        .attr('transform', `rotate(270) translate(${-plotAreaHeight / 2} ${-padding.left})`)
        .attr('dy', 12) // adjust distance from the left edge
        .attr('class', 'axis-label')
        .attr('text-anchor', 'middle')
        .text(titleY); // Change for title

    // set up axis generating functions
    const xTicks = Math.round(plotAreaWidth / 50);
    const yTicks = Math.round(plotAreaHeight / 50);

    const xAxis = d3.axisBottom(xScale)
        .ticks(xTicks)
        .tickSizeOuter(0);

    const yAxis = d3
        .axisLeft(yScale)
        .ticks(yTicks)
        .tickSizeOuter(0);

    // draw the axes
    yAxisG.call(yAxis);
    xAxisG.call(xAxis);

    // add in circles
    const circles = g.append('g').attr('class', 'circles');

    const binding = circles.selectAll('.data-point').data(data, d => d.id);

    binding.enter().append('circle')
        .classed('data-point', true)
        .attr('class', 'not-selected')
        .attr('r', pointRadius)
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('fill', '#4292c6');

        // Create d3 brush
        const brush = d3.brush()
            .extent([[0, 0], [plotAreaWidth, plotAreaHeight]])
            .on('brush', brushed)
            .on('end', brushended);

        // Set class of brush + call it to initiate the brush
        const gBrush = g.append('g')
            .attr('class', 'brush')
            .call(brush);

  
        function brushed() {
            const { selection } = d3.event
  
            svg.selectAll('circle')
                .style("fill", function (d) {
                    if (rectContains(selection, [xScale(d.x), yScale(d.y)]))
                        { return "#ec7014"; }
                    else { return "#4292c6"; }
            });
       }
  
       function brushended() {
        const { selection } = d3.event

           if (!d3.event.selection) {
               svg.selectAll('circle')
                 .transition()
                 .duration(150)
                 .ease(d3.easeLinear)
                 .style("fill", "#4292c6");
           }
           const brushedNodes = data.filter(d =>
            // helper function that returns true if the point is
            // within the selection rect
            rectContains(selection, [xScale(d.x), yScale(d.y)])
          );
        
          // helper to visualize the highlighted data points
          // see the full source code for details
          CoolFunctionBro(brushedNodes);
       }

       function rectContains(rect, point) {
        return rect[TOP_LEFT][X] <= point[X] && point[X] <= rect[BOTTOM_RIGHT][X] &&
                rect[TOP_LEFT][Y] <= point[Y] && point[Y] <= rect[BOTTOM_RIGHT][Y];
    }

    function CoolFunctionBro(nodes) {
        
        nodes.forEach(node => {
            console.log(node);
            
        });

        var data = nodes;

        pie.loadAndRenderDataset(data);

        
}}

