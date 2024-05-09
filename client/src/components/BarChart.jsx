import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function BarChart({
  data,
  width = 928,
  height = 1000,
  marginTop = 20,
  marginRight = 0,
  marginBottom = 50,
  marginLeft = 50,
  axisLabelFontSize = "7px",
  tickFontSize = "12px",
}) {
  const svgRef = useRef();

  useEffect(() => {
    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
      .domain(data.map(d => d.Name)) 
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    // Declare the y (vertical position) scale with a fixed domain of 0 to 50.
    const y = d3.scaleLinear()
      .domain([0, 20])
      .range([height - marginBottom, marginTop]);

    const svg = d3.select(svgRef.current);

    // Remove any existing content from the SVG.
    svg.selectAll("*").remove();

    // Add a rect for each bar.
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.Name)) 
      .attr("y", (d) => y(Math.min(d.numBooks, 50)))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - marginBottom - y(Math.min(d.numBooks, 20)))
      .attr("fill", "steelblue");

    // Add the x-axis and label.
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .style("font-size", axisLabelFontSize)
      .attr("x", -10)
      .attr("y", 0);

    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Books No:"));

  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
}
