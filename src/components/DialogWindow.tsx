import React, { useEffect, useRef, useState } from 'react'
import './components.css'
import { DialogWindowProps } from './interfaces'
import * as d3 from 'd3'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { clearWeatherAC } from '../store/actions/actionCreators'

const DialogWindow: React.FC<DialogWindowProps> = (props) => {

  const { close, windowData } = props
  const [chartData, setChartData] = useState({
    height: 470,
    width: 760
  })
  const weather = useSelector((state: RootState) => state.weather)
  console.log(weather)
  const chartRef = useRef(null)
  const dispatch = useDispatch()

  const tempList = weather.weatherData
    .map((el: any) => el.main)

  const drawChart = (windowWidth: number) => {
    const denominatorWidth = 2.63
    console.log(tempList)
    d3.selectAll("svg > *").remove()

    setChartData((state: any) => {
      return {...state, width: windowWidth / denominatorWidth}
    })

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
  }

  useEffect(() => {
    if(tempList.length){
      drawChart(windowData.width)
    }
    return () => {
      dispatch(clearWeatherAC())
    }
  }, [])

  useEffect(() => {
    console.log('1')
    drawChart(windowData.width)
  /*svg
    .append("g")
    .attr("transform", "translate(0," + (chartData.height - 90) + ")")
    .call(d3.axisBottom(xScale));
    console.log(chartData)*/
  }, [windowData])

  const handleClose = () => {
    close()
  }

  return (
    <div className="bg-dialog-modal">
      <div style={{width: chartData.width}} className="dialog-modal-block">
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
