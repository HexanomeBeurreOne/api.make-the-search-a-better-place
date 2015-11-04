  var width = 1000,
      height = 700;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .size([width, height]);

function runD3Code(graph) {
  d3.select("svg").remove();

  var svg = d3.select("#graph").append("svg")
      .attr("width", width)
      .attr("height", height);

  console.log(svg);
  console.log(graph);

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .linkDistance(300)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return d.value; });

  var gnodes = svg.selectAll('g.gnode')
     .data(graph.nodes)
     .enter()
     .append('g')
     .classed('gnode', true);
    
  var node = gnodes.append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("href", function(d) {return d.url;})
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  d3.selectAll("circle.node").on("click", function(){
            OpenInNewTab(d3.select(this).attr("href"));
        });

  var labels = gnodes.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("font-size", "12px")
      .text(function(d) { return d.name; });
    
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    gnodes.attr("transform", function(d) { 
        return 'translate(' + [d.x, d.y] + ')'; 
    });
  });
}