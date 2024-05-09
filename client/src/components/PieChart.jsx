import './PieChart.css'
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width }) => {
  const height = Math.min(500, width / 2);
  const outerRadius = height / 2 - 10;
  const innerRadius = outerRadius * 0.75;
  const tau = 2 * Math.PI;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pie = d3.pie().sort(null).value((d) => d.numBooks);

    const path = svg.selectAll('path')
      .data(pie(data))
      .join('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc)
      .each(function (d) { this._current = d; }); // store the initial angles

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width / 2}, ${-height / 2 + 20})`);

    const legendItems = legend.selectAll('.legend-item')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legendItems.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d, i) => color(i));

    legendItems.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .text((d) => d.language);

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return (t) => arc(i(t));
    }

    function change(value) {
      pie.value((d) => d[value]); // change the value function
      path.data(pie(data)); // compute the new angles
      path.transition().duration(750).attrTween('d', arcTween); // redraw the arcs
    }

    // Expose the change function
    svg.node().change = change;
  }, [data, width, height, innerRadius, outerRadius, color]);

  return (
    <svg ref={svgRef}></svg>
  );
}

export default PieChart;
