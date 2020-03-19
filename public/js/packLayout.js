function packLayout(domEle)
{

    var packLayoutObj = {};

    var width = 700;
    var height = 800;
    var root;
    var data;
    var margin = { top: 20, right: 160, bottom: 35, left: 100 };
    var color = d3.scaleOrdinal(d3.schemeCategory20)
    var previousNode;
    var backArr = [];

    packLayoutObj.loadAndRenderDataset = function (dataset) {

        data = dataset;
       
        render(data);
        return packLayoutObj;
    } 

   


    var pack = d3.select("#" + domEle)
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
       
        


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

        //checking to see if the parent circle pressed has the same name as the previous item clicked, if so then it means that the parent circle was clicked 
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

    function draw() {

        d3.selectAll("text").remove();
        d3.selectAll("g").selectAll("circle").remove();

        var selection = pack.selectAll('circle')
            .data(root.descendants()) //array of all the nodes

        console.log(root.descendants())

        var enterSelection = selection
            .enter().append('circle')                   
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; })
            .attr('r', function (d) { return d.r; })          
            .style("fill", function (d) { return color(d.data.name); })
            .on('click', clicked)

        enterSelection.append("text")
            .attr("dx", function(d){return +200})
            .text(function(d){
                console.log(d.data.name)
                return d.data.name
            })
       
        // pack.selectAll('circle')
        //     .data(root.descendants())
        //     .append('text')
        //     .attr('y', function(d){ return d.r*.25; })
        //     .attr('class', 'packLayoutLabel')
        //     .style('font-size', function(d){ return d.r*.4})            
        //     .text(function (d) {
        //         console.log(d.data.name);
        //         return d.data.name;
        //     })       
              

        return packLayoutObj;
    }

    return packLayoutObj;
}




/* 
 * With everything grouped. All comented out
 * (should be uncommentable with ctrl+forwad slash when highlighted to make life easy)
 * CMHayden
 */
// function packLayout(domEle)
// {

//     var packLayoutObj = {};

//     var width = 700;
//     var height = 800;
//     var root;
//     var data;
//     var margin = { top: 20, right: 160, bottom: 35, left: 100 };
//     var color = d3.scaleOrdinal(d3.schemeCategory20)
//     var previousNode;
//     var backArr = [];

//     packLayoutObj.loadAndRenderDataset = function (dataset) {

//         data = dataset;
       
//         render(data);
//         return packLayoutObj;
//     } 

   


//     var pack = d3.select("#" + domEle)
//         .append('svg')
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
       
        


//     function render(data) {
//         dataProcessor(data);
//         draw();
//     }


//     function dataProcessor(dataSet) {
//         //stores the data in d3 hierarchical format for later processing
//         root = d3.hierarchy(dataSet)
//             .sum(function (d) { return d.size });

//         //helper to put data in pack format
//         var packFormat = d3.pack().size([width, height]);


//         // put data into pack mode
//         packFormat(root)
//         packFormat.padding(10)

        
//         //sets previous node to root to start
//         previousNode = root
//     }


//     //click function
//     function clicked(d) {

//         //checking to see if the parent circle pressed has the same name as the previous item clicked, if so then it means that the parent circle was clicked 
//         if (previousNode.data["name"].localeCompare(d.data["name"]) == 0) {


//             render(backArr[backArr.length - 1]);
//             data = backArr[backArr.length - 1];
//             backArr.splice(backArr.length - 1, 1);


//         } else {

//             backArr.push(data);
//             render(d.data);
//             data = d.data;
//             previousNode = d;

//         }


//     }

//     function draw() {

//         // d3.selectAll("text").remove();
//         // d3.selectAll("g").selectAll("circle").remove();

//         var selection = pack.selectAll('circle')
//             .data(root.descendants()) //array of all the nodes

//         //console.log(root.descendants())

//         var enterSelection = selection
//             .enter().append('group')
//             .attr("transform", function(d){return "translate("+d.x+",80)"})

            
//         var circles = enterSelection.append('circle')
//             .attr('cx', function (d) { return d.x; })
//             .attr('cy', function (d) { return d.y; })
//             .attr('r', function (d) { return d.r; })          
//             .style("fill", function (d) { return color(d.data.name); })
//             .on('click', clicked)

//         enterSelection
//             .append("text")
//             .attr("dx", function(d){return -20})
//             .text(function(d){return d.data.name})
       
//         // pack.selectAll('circle')
//         //     .data(root.descendants())
//         //     .append('text')
//         //     .attr('y', function(d){ return d.r*.25; })
//         //     .attr('class', 'packLayoutLabel')
//         //     .style('font-size', function(d){ return d.r*.4})            
//         //     .text(function (d) {
//         //         console.log(d.data.name);
//         //         return d.data.name;
//         //     })       
              

//         return packLayoutObj;
//     }

//     return packLayoutObj;
// }



