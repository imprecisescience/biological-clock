import { useState, useEffect } from 'react'
import tw from 'tailwind-styled-components'
import Highcharts from 'highcharts'
import {
  HighchartsChart,
  HighchartsProvider,
  XAxis,
  YAxis,
  Title,
  Series,
  Tooltip,
} from 'react-jsx-highcharts'

const Chart = () => {
  const [chartData, setChartData] = useState(null)

  // Override the Highcharts prototypes here, so they only apply to this example
  Highcharts.Pointer.prototype.reset = () => {}

  Highcharts.Point.prototype.highlight = function (event) {
    this.onMouseOver() // Show the hover marker
    this.series.chart.tooltip.refresh(this) // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this) // Show the crosshair
  }

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/whawker/809cae1781f25db5f3c2dd7cee93b017/raw/6906d0406d4cd5be1fab470f4353a132d128a0c1/activity.json'
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((json) => {
        setChartData(json)
      })
  }, [])

  const handleMouseMove = (e) => {
    let point = null
    let event = null

    e.persist()
    Highcharts.charts.forEach((chart) => {
      if (!chart) return
      event = chart.pointer.normalize(e) // Find coordinates within the chart
      point = chart.series[0].searchPoint(event, true) // Get the hovered point
      if (point) {
        point.highlight(e)
      }
    })
  }

  const renderChart = (dataset, index) => {
    const tooltipPositioner = function () {
      return { x: this.chart.chartWidth - this.label.width, y: 10 }
    }
    const data = dataset.data.map((val, i) => [chartData.xData[i], val])
    const colour = Highcharts.getOptions().colors[index]

    return (
      <HighchartsProvider Highcharts={Highcharts} key={dataset.name}>
        <HighchartsChart>
          <Title align='left' margin={30} x={30}>
            {dataset.name}
          </Title>
          <XAxis crosshair labels={{ format: '{value} km' }} />
          <YAxis>
            <Series
              name={dataset.name}
              type={dataset.type}
              data={data}
              color={colour}
              tooltip={{ valueSuffix: ` ${dataset.unit}` }}
            />
          </YAxis>

          <Tooltip
            positioner={tooltipPositioner}
            borderWidth={0}
            backgroundColor='none'
            pointFormat='{point.y}'
            headerFormat=''
            shadow={false}
            style={{ fontSize: '18px' }}
            valueDecimals={dataset.valueDecimals}
          />
        </HighchartsChart>
      </HighchartsProvider>
    )
  }

  return (
    chartData && (
      <Wrapper onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
        <div>{chartData.datasets.map((d, index) => renderChart(d, index))}</div>
      </Wrapper>
    )
  )
}

export default Chart

const Wrapper = tw.div``
