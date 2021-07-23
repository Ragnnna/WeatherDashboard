import React, { useEffect, useRef, useState } from 'react'
import './components.css'
import { DialogWindowProps } from './interfaces'
import * as d3 from 'd3'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { clearWeatherAC } from '../store/actions/actionCreators'
import { NumberValue, schemeBuGn } from 'd3'

const DialogWindow: React.FC<DialogWindowProps> = (props) => {
  const [chartData, setChartData] = useState({
    height: 470,
    width: 760
  })
  const { close } = props
  const weather = useSelector((state: RootState) => state.weather)
  const chartRef = useRef(null)
  const dispatch = useDispatch()

  const tempList = weather.weatherData
    .map((el: any) => el.main)

  useEffect(() => {
    return () => {
      dispatch(clearWeatherAC())
    }
  }, [])

  const handleClose = () => {
    close()
  }

  const barWith = chartData.width / tempList.length

  const xScale = d3.scaleBand()
    .domain(tempList.map((data: any) => data.temp_max))
    .rangeRound([0, chartData.width - 60])
    .padding(0.1)

  const yScale = d3.scaleLinear()
    .domain([0, 40])
    .range([chartData.height, 0])

  const svg = d3.select('svg')
    .attr('height', chartData.height)
    .attr('width', chartData.width)
  svg.selectAll('.bar')
    .data(tempList)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', (data: any) => (chartData.height - 50) - yScale(data.temp))
    .attr('x', (data: any) => xScale(data.temp_max)!)
    .attr('y', (data: any) => yScale(data.temp))
    .style('fill', 'gray')
    .attr('transform', 'translate(0, -50)')

  svg
    .append("g")
    .attr("transform", "translate(0," + (chartData.height - 90) + ")")
    .call(d3.axisBottom(xScale));

  return (
    <div className="bg-dialog-modal">
      <div className="dialog-modal-block">
        <div className="header-modal-block">
          <div className="close-modal">
            <span
              onClick={handleClose}
              className="material-icons-outlined"
            >
              Cancel
            </span>
          </div>
        </div>
        <svg ref={chartRef} className="d3-chart"></svg>
      </div>
    </div>
  )
}

export { DialogWindow }
