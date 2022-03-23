import { useEffect, useState, useRef } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import tw from 'tailwind-styled-components'

const Chart = ({ birthDate }) => {
  const [physicalData, setPhysicalData] = useState([])
  const [emotionData, setEmotionData] = useState([])
  const [iqData, setIqData] = useState([])
  const [chartOptions, setChartOptions] = useState({
    yAxis: [
      {
        offset: 20,
        labels: {
          formatter: function () {
            return parseFloat(this.value).toFixed(0)
          },
          x: -15,
          style: {
            color: '#000',
            position: 'absolute',
          },
          align: 'left',
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          '<b>' +
          new Date(this.x).toISOString().slice(0, 10) +
          '</b><br/>Physical: ' +
          this.points[0].y.toFixed(0) +
          '<br/>Emotion: ' +
          this.points[1].y.toFixed(0) +
          '<br/>IQ: ' +
          this.points[2].y.toFixed(0) +
          '<br/>'
        )
      },
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
      },
    },
    title: {
      text: ``,
    },
    chart: {
      height: 400,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: 'date',
      labels: { format: '{value:%Y-%m-%d}' },
    },
    rangeSelector: {
      buttons: [
        {
          type: 'month',
          count: 1,
          text: '1m',
          title: 'View 1 month',
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
          title: 'View 3 months',
        },
        {
          type: 'month',
          count: 6,
          text: '6m',
          title: 'View 6 months',
        },
        {
          type: 'ytd',
          text: 'YTD',
          title: 'View year to date',
        },
        {
          type: 'year',
          count: 1,
          text: '1y',
          title: 'View 1 year',
        },
        {
          type: 'all',
          text: 'All',
          title: 'View all',
        },
      ],
      selected: 2,
    },
    series: [
      {
        name: 'Physical',
        type: 'areaspline',

        data: physicalData,
      },
      {
        name: 'Emotion',
        type: 'areaspline',

        data: emotionData,
      },
      {
        name: 'IQ',
        type: 'areaspline',

        data: iqData,
      },
    ],
  })

  const generateTimeSeries = () => {
    const oneDay = 1000 * 60 * 60 * 24
    const startDate = birthDate // 30 days ago
    const endDate = new Date().valueOf() + oneDay * 60 // 30 days after today

    console.log('generateTimeSeries')
    console.log('start = ' + new Date(startDate).toISOString().slice(0, 10))
    console.log('end = ' + new Date(endDate).toISOString().slice(0, 10))

    let newPhysicalData = []
    let newEmotionData = []
    let newIqData = []
    let i = startDate
    while (i <= endDate) {
      const daysFromBirth = (i - birthDate) / oneDay
      const physical = 10 * Math.sin(((2 * Math.PI) / 23) * daysFromBirth)
      const emotion = 10 * Math.sin(((2 * Math.PI) / 28) * daysFromBirth)
      const iq = 10 * Math.sin(((2 * Math.PI) / 33) * daysFromBirth)
      newPhysicalData.push([i, physical])
      newEmotionData.push([i, emotion])
      newIqData.push([i, iq])
      i += oneDay
    }

    setPhysicalData(newPhysicalData)
    setEmotionData(newEmotionData)
    setIqData(newIqData)

    setChartOptions({
      ...chartOptions,
      series: [
        {
          name: 'Physical',
          type: 'areaspline',

          data: newPhysicalData,
        },
        {
          name: 'Emotion',
          type: 'areaspline',

          data: newEmotionData,
        },
        {
          name: 'IQ',
          type: 'areaspline',

          data: newIqData,
        },
      ],
    })
  }

  useEffect(() => {
    generateTimeSeries()
  }, [birthDate])

  return (
    <Wrapper>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType={'stockChart'}
      />
    </Wrapper>
  )
}

export default Chart

const Wrapper = tw.div`

`
