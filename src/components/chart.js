import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import tw from 'tailwind-styled-components'

const Chart = ({ birthDate }) => {
  const [physicalData, setPhysicalData] = useState([])
  const [emotionData, setEmotionData] = useState([])
  const [iqData, setIqData] = useState([])
  const [chartConfig, setChartConfig] = useState({
    yAxis: [
      {
        offset: 20,

        labels: {
          formatter: function () {
            return this.value.toFixed(0)
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
          this.value.toFixed(0) + '</b><br/>' + new Date(this.x).toDateString()
        )
      },
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
      },
    },
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: ``,
    },
    chart: {
      height: 600,
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },
    xAxis: {
      type: 'date',
    },
    rangeSelector: {
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d',
        },
        {
          type: 'day',
          count: 7,
          text: '7d',
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      selected: 4,
    },
    series: [],
  })

  const generateTimeSeries = () => {
    const oneDay = 1000 * 60 * 60 * 24
    const startDate = birthDate // 30 days ago
    const endDate = startDate + oneDay * 60 // 30 days after today

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
  }

  const configPrice = {
    yAxis: [
      {
        offset: 20,

        labels: {
          formatter: function () {
            return this.value.toFixed(0)
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
          this.value.toFixed(0) + '</b><br/>' + new Date(this.x).toDateString()
        )
      },
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
      },
    },
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: ``,
    },
    chart: {
      height: 600,
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },
    xAxis: {
      type: 'date',
    },
    rangeSelector: {
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d',
        },
        {
          type: 'day',
          count: 7,
          text: '7d',
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      selected: 4,
    },
    series: [
      {
        name: 'Physical',
        type: 'areaspline',

        data: physicalData,
        tooltip: {
          valueDecimals: 0,
        },
      },
      {
        name: 'Emotion',
        type: 'areaspline',

        data: emotionData,
        tooltip: {
          valueDecimals: 0,
        },
      },
      {
        name: 'IQ',
        type: 'areaspline',

        data: iqData,
        tooltip: {
          valueDecimals: 0,
        },
      },
    ],
  }

  useEffect(() => {
    generateTimeSeries()
  }, [birthDate])

  return (
    <Wrapper>
      <ReactHighcharts config={configPrice}></ReactHighcharts>
    </Wrapper>
  )
}

export default Chart

const Wrapper = tw.div`
w-full
`
