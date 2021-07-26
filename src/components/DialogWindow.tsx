import React, { useEffect, useRef, useState } from 'react'
import './components.css'
import { chartDataState, DialogWindowProps, tempObject } from './interfaces'
import * as d3 from 'd3'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { clearWeatherAC } from '../store/actions/actionCreators'
import { curveCardinal } from 'd3'

const DialogWindow: React.FC<DialogWindowProps> = (props) => {

  const { close, windowData } = props
  const [chartData, setChartData] = useState<chartDataState>({
    height: 470,
    width: 760
  })

  const modalWindowWidth = 1060
  const fullScreenWidth = 1920
  const modalWindowHeight = 770
  const fullScreenHeight = 1080
  const denominatorHeight = fullScreenHeight / modalWindowHeight
  const denominatorWidth = fullScreenWidth / modalWindowWidth

  const weather = useSelector((state: RootState) => state.weather)
  const chartRef = useRef(null)
  const dispatch = useDispatch()

  const tempList = weather.weatherData
    .map((el: any) => ({
      ...el.main,
      temp: Math.ceil(el.main.temp)
    }))

  const maxTemp = Math.ceil(Math.max(...tempList.map((el: any) => el.temp)))

  const normalizeDate = (datetime: string): string =>
    datetime
      .slice(11, datetime.length)
      .slice(0, 5)

  const dateList = weather.weatherData
    .map((el: any) => normalizeDate(el.dt_txt))

  const drawChart = (windowWidth: number, windowHeight: number) => {
    d3.selectAll("svg > *").remove()

    const barPadding = 40
    const barMargin = 60
    const axisMargin = 140
    const heightResult = windowHeight / denominatorHeight
    const widthResult = windowWidth / denominatorWidth

    setChartData((state: any) => {
      return {
        ...state,
        width: windowWidth / denominatorWidth,
        height: windowHeight / denominatorHeight
      }
    })

    const xScaleDate = d3.scaleBand()
      .domain(dateList.map((data: string) => data))
      .rangeRound([0, widthResult - barPadding])
      .padding(0.1)

    const xScale = d3.scaleBand()
      .domain(tempList.map((data: tempObject) => data.temp_max))
      .rangeRound([0, widthResult - barPadding])
      .padding(0.1)

    const yScale = d3.scaleLinear()
      .domain([0, Math.abs(maxTemp) + 3.5])
      .range([heightResult, 0])

    const line = d3.line()
      .x((d: any, i: number) => i * ((widthResult / 4)))
      .y((d: any, i: number) => heightResult / 3 + yScaleTemp2(d) / 3)
      .curve(curveCardinal)

    const yScaleTemp2 = d3.scaleLinear()
      .domain([0, Math.abs(maxTemp) + 2])
      .range([heightResult, 0])

    const yScaleTemp = d3.scaleLinear()
      .domain([0, maxTemp])
      .range([heightResult - axisMargin, 0])

    const svg = d3.select('svg')
      .attr('height', heightResult + 20 + 20)
      .attr('width', widthResult)

    svg.selectAll('.bar')
      .data(tempList)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('width', xScale.bandwidth())
      .attr('height', (data: any) => (heightResult - barMargin) - yScale(Math.abs(data.temp)))
      .attr('x', (data: any) => xScale(data.temp_max)!)
      .attr('y', (data: any) => yScale(Math.abs(data.temp)))
      .style('fill', 'gray')
      .attr('transform', 'translate(20, -60)')
      .append('svg:title')
      .text((data: any) => data.temp)

    svg.selectAll('path')
      .data([tempList.map((el: any) => el.temp)])
      .join('path')
      .attr('d', (d: any) => line(d))
      .attr('fill', 'none')
      .attr('transform', 'translate(30, 0)')
      .attr('stroke', 'black')

    svg
      .append("g")
      .attr("transform", `translate(20, ${heightResult - 120})`)
      .call(d3.axisBottom(xScaleDate))

    svg
      .append("g")
      .attr("transform", "translate(33, 12)")
      .attr('fill', 'red')
      .call(d3.axisLeft(yScaleTemp).ticks(7).tickFormat(d3.format('d')))

  }

  useEffect(() => {
    if (tempList.length) {
      drawChart(windowData.width, windowData.height)
    }
    return () => {
      dispatch(clearWeatherAC())
    }
  }, [])

  useEffect(() => {
    drawChart(windowData.width, windowData.height)
  }, [windowData])

  const handleClose = () => {
    close()
  }

  return (
    <div className="bg-dialog-modal">
      <div style={{ width: chartData.width, height: chartData.height }} className="dialog-modal-block">
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
