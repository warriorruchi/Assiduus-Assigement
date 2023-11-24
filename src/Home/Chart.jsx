import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import * as d3 from 'd3';
import clsx from 'clsx';

function LineChart({ data, className, strokeColor }) {
  const svgRef = useRef(null);
  const [parentSize, setParentSize] = useState({ height: 500, width: 300 });

  useEffect(() => {
    const parentElement = svgRef.current.parentNode;
    const { offsetWidth, offsetHeight } = parentElement;
    setParentSize({ height: offsetHeight, width: offsetWidth });
  }, [svgRef?.current?.parentNode.offsetWidth, svgRef?.current?.parentNode.offsetHeight]);

  useLayoutEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      const { height, width } = parentSize;

      // Update the SVG dimensions and scales
      svg.attr('width', width);
      svg.attr('height', height);

      const margin = { top: 40, right: 50, bottom: 60, left: 50 };
      const xScale = d3
        .scaleLinear()
        .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
        .range([0, width - margin.left - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
        .range([height - margin.top - margin.bottom, 0]);

      // Create and append the x-axis
      svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      // Create and append the y-axis
      svg.append('g').attr('class', 'axis y-axis').attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

      // Create and append the line
      const line = d3
        .line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX);

      svg.append('path').datum(data).attr('class', clsx('line', strokeColor)).attr('d', line).style('fill', 'none').style('stroke-width', '2');
    }
  }, [svgRef?.current, parentSize.height, parentSize.width, JSON.stringify(data)]);

  return <svg key={JSON.stringify({ parentSize, data })} className={className} ref={svgRef} width={parentSize.width} height={parentSize.height} />;
}

function BarChart({ data, className, barColor }) {
  const svgRef = useRef(null);
  const [parentSize, setParentSize] = useState({ height: 500, width: 300 });

  useEffect(() => {
    const parentElement = svgRef.current.parentNode;
    const { offsetWidth, offsetHeight } = parentElement;
    setParentSize({ height: offsetHeight, width: offsetWidth });
  }, [svgRef?.current?.parentNode.offsetWidth, svgRef?.current?.parentNode.offsetHeight]);

  useLayoutEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Get the dimensions of the parent
      const { height, width } = parentSize;

      // Update the SVG dimensions and scales
      svg.attr('width', width);
      svg.attr('height', height);

      const margin = { top: 40, right: 50, bottom: 60, left: 50 };
      const xScale = d3
        .scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width - margin.left - margin.right])
        .paddingInner(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
        .range([height - margin.top - margin.bottom, 0]);

      // Create and append the x-axis
      svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(
          d3.axisBottom(xScale).tickFormat(d => d), // Adjust tick format based on data
        );

      // Create and append the y-axis
      svg.append('g').attr('class', 'axis y-axis').attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

      // Create and append the bars
      svg
        .append('g')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', clsx('bar', barColor))
        .attr('x', d => xScale(d.category))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - margin.top - margin.bottom - yScale(d.value));
    }
  }, [svgRef?.current, parentSize.height, parentSize.width, JSON.stringify(data)]);

  return <svg key={JSON.stringify({ parentSize, data })} className={className} ref={svgRef} width={parentSize.width} height={parentSize.height} />;
}

function StackedBarChart({ data, className, colors }) {
  const svgRef = useRef(null);
  const [parentSize, setParentSize] = useState({ height: 500, width: 300 });

  useEffect(() => {
    const parentElement = svgRef.current.parentNode;
    const { offsetWidth, offsetHeight } = parentElement;
    setParentSize({ height: offsetHeight, width: offsetWidth });
  }, [svgRef?.current?.parentNode.offsetWidth, svgRef?.current?.parentNode.offsetHeight]);

  useLayoutEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Get the dimensions of the parent
      const { height, width } = parentSize;

      const margin = { top: 40, right: 50, bottom: 60, left: 50 };

      const series = d3.stack().keys(Object.keys(data[0]).slice(1))(data);

      const xScale = d3
        .scaleBand()
        .domain(data.map(d => d.category))
        .range([margin.left, width - margin.right])
        .paddingInner(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .range([height - margin.bottom, margin.top]);

      const colorScale = d3
        .scaleOrdinal()
        .domain(series.map(s => s.key))
        .range(colors);

      svg
        .selectAll('.layer')
        .data(series)
        .enter()
        .append('g')
        .attr('class', 'layer')
        .attr('fill', d => colorScale(d.key));

      svg
        .selectAll('g.layer')
        .selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.data.category))
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth());

      // Add the x-axis
      svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      // Add the y-axis
      svg.append('g').attr('class', 'axis y-axis').attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));
    }
  }, [data, colors, parentSize.height, parentSize.width, JSON.stringify(data)]);

  return <svg key={JSON.stringify({ parentSize, data })} ref={svgRef} width={parentSize.width} height={parentSize.height} className={className} />;
}

function Chart(props) {
  switch (props.type) {
    case 'bar':
      return <BarChart {...props} />;
    case 'line':
      return <LineChart {...props} />;
    case 'stack-bar':
      return <StackedBarChart {...props} />;
    default:
      return null;
  }
}
export default Chart;
