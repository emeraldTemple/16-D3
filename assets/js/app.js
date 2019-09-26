// @TODO: YOUR CODE HERE!
var url = "assets/data/data.csv";
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", chartHeight)
  .attr("width", chartWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);





d3.csv(url).then(function(dataCSV) {
    var state = [];
    var stateAbbr = [];
    var povertyMedian = [];
    var ageMedian = [];
    var incomeMedian = [];
    var healthcareMedian = [];
    var obesityMedian = [];
    var smokesMedian = [];
    var stateHealthcareMax = [];
    var stateHealthcareMin = [];
    var povertyMax = 0;
    var povertyMin = 0;
    var healthcareMax = 0;
    var healthcareMin = 0;
    var csvData = []
    dataCSV.forEach(function(data) {
        state.push(data.state);
        stateAbbr.push(data.abbr);
        povertyMedian.push(+data.poverty);
        ageMedian.push(+data.age);
        incomeMedian.push(+data.income);
        healthcareMedian.push(+data.healthcare);
        obesityMedian.push(+data.obesity);
        smokesMedian.push(+data.smokes)
        stateHealthcareMax.push(+data.healthcareHigh);
        stateHealthcareMin.push(+data.healthcareLow);

        svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        //.attr("class", "circle")
        .attr("cx", data.poverty)
        .attr("cy", data.healthcare)
        .attr("r", "25");
        console.log(data.poverty)
    })
    
    povertyMin = Math.min(...povertyMedian);
    povertyMax = Math.max(...povertyMedian);
    healthcareMin = Math.min(...healthcareMedian);
    healthcareMax = Math.max(...healthcareMedian);

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(povertyMedian)])
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthcareMedian)])
    .range([chartHeight, 0]);

     // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);



  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0, 20)")
  .attr("transform", `translate(35, ${chartHeight-chartMargin.left})`)
  .call(bottomAxis);

svg.append("g")
  .attr("class", "axis")
  .attr("transform", `translate(30, 0)`)
  .call(leftAxis);
 

  })



