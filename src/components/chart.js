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

const Chart = ({ birthDate1, birthDate2, midDate }) => {
  const [chartData, setChartData] = useState(null)

  const chartOptions = {
    height: 300,
  }

  const plotOptions = {
    areaspline: {
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 4,
        },
      },
      marker: {
        enabled: false,
      },
      pointInterval: 86400000, // one day
      //pointStart: midDate - 86400000 * 60, // 60 days before today
      tooltip: {
        dateTimeLabelFormats: {
          millisecond: '%b %e, %Y (%a)',
        },
      },
    },
  }

  const generateTimeSeries = () => {
    const oneDay = 1000 * 60 * 60 * 24
    const startDate = midDate - oneDay * 60 // 60 days before today
    const endDate = midDate + oneDay * 60 // 60 days after today

    let newPhysicalData1 = []
    let newEmotionData1 = []
    let newIqData1 = []
    let newPhysicalData2 = []
    let newEmotionData2 = []
    let newIqData2 = []
    let i = startDate
    while (i <= endDate) {
      let daysFromBirth = (i - birthDate1) / oneDay
      let physical = 10 * Math.sin(((2 * Math.PI) / 23) * daysFromBirth)
      let emotion = 10 * Math.sin(((2 * Math.PI) / 28) * daysFromBirth)
      let iq = 10 * Math.sin(((2 * Math.PI) / 33) * daysFromBirth)
      newPhysicalData1.push([i, physical])
      newEmotionData1.push([i, emotion])
      newIqData1.push([i, iq])

      daysFromBirth = (i - birthDate2) / oneDay
      physical = 10 * Math.sin(((2 * Math.PI) / 23) * daysFromBirth)
      emotion = 10 * Math.sin(((2 * Math.PI) / 28) * daysFromBirth)
      iq = 10 * Math.sin(((2 * Math.PI) / 33) * daysFromBirth)
      newPhysicalData2.push([i, physical])
      newEmotionData2.push([i, emotion])
      newIqData2.push([i, iq])

      i += oneDay
    }
    setChartData([
      { physical: newPhysicalData1, emotion: newEmotionData1, iq: newIqData1 },
      { physical: newPhysicalData2, emotion: newEmotionData2, iq: newIqData2 },
    ])
  }

  useEffect(() => {
    generateTimeSeries()
  }, [birthDate1, birthDate2, midDate])

  const handleMouseMove = (e) => {
    let point = null
    let event = null

    e.persist()
    Highcharts.charts.forEach((chart) => {
      if (!chart) return
      event = chart.pointer.normalize(e) // Find coordinates within the chart
      let points = []
      chart.series.forEach((s) => {
        point = s.searchPoint(event, true) // Get the hovered point
        if (point) {
          points.push(point)
        }
      })

      if (points.length) {
        if (chart.tooltip.shared) {
          chart.tooltip.refresh(points)
        } else {
          chart.tooltip.refresh(points[0])
        }
        chart.xAxis[0].drawCrosshair(e, points[0])
      }
    })
  }

  const tooltipPositioner = function () {
    return { x: this.chart.chartWidth - this.label.width - 20, y: 10 }
  }

  return (
    chartData && (
      <Wrapper>
        <div onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
          <HighchartsProvider Highcharts={Highcharts} key='Person1'>
            <HighchartsChart plotOptions={plotOptions} chart={chartOptions}>
              <Title align='left' margin={30} x={30}>
                {new Date(birthDate1).toLocaleDateString('en-us', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Title>

              <XAxis crosshair type='datetime' />
              <YAxis>
                <Series
                  name='Physical'
                  type='areaspline'
                  data={chartData[0].physical}
                  color='#90dbf4'
                />
                <Series
                  name='Emotion'
                  type='areaspline'
                  data={chartData[0].emotion}
                  color='#8eecf5'
                />
                <Series
                  name='IQ'
                  type='areaspline'
                  data={chartData[0].iq}
                  color='#98f5e1'
                />
              </YAxis>

              <Tooltip
                valueDecimals='0'
                shared
                positioner={tooltipPositioner}
                style={{ fontSize: '14px' }}
                headerFormat='<span style="color:#888;font-weight:bold">{point.key}</span><br/>'
                pointFormat='<span style="color: {series.color}">{series.name} </span><span style="color:#bbb;font-weight:bold"><b>{point.y}</b></span><br/>'
              />
            </HighchartsChart>
          </HighchartsProvider>
          <HighchartsProvider Highcharts={Highcharts} key='Person2'>
            <HighchartsChart plotOptions={plotOptions} chart={chartOptions}>
              <Title align='left' margin={30} x={30}>
                {new Date(birthDate2).toLocaleDateString('en-us', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Title>
              <XAxis crosshair type='datetime' />
              <YAxis>
                <Series
                  name='Physical'
                  type='areaspline'
                  data={chartData[1].physical}
                  color='#fde4cf'
                />
                <Series
                  name='Emotion'
                  type='areaspline'
                  data={chartData[1].emotion}
                  color='#ffcfd2'
                />
                <Series
                  name='IQ'
                  type='areaspline'
                  data={chartData[1].iq}
                  color='#f1c0e8'
                />
              </YAxis>

              <Tooltip
                valueDecimals='0'
                shared
                positioner={tooltipPositioner}
                style={{ fontSize: '14px' }}
                headerFormat='<span style="color:#888;font-weight:bold">{point.key}</span><br/>'
                pointFormat='<span style="color: {series.color}">{series.name} </span><span style="color:#bbb;font-weight:bold"><b>{point.y}</b></span><br/>'
              />
            </HighchartsChart>
          </HighchartsProvider>
        </div>
      </Wrapper>
    )
  )
}

export default Chart

const Wrapper = tw.div``
