import { PureComponent, useEffect, useState } from 'react'
import {
  Scatter,
  ScatterChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { v4 as uuid } from 'uuid'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const Chart = ({ birthDate }) => {
  const [dataSeries, setDataSeries] = useState([])

  const generateTimeSeries = () => {
    const oneDay = 1000 * 60 * 60 * 24
    const startDate = new Date().valueOf() - oneDay * 30 // 30 days ago
    const endDate = startDate + oneDay * 60 // 30 days after today

    let newDataSeries = []
    let i = startDate
    while (i <= endDate) {
      const daysFromBirth = (i - birthDate) / oneDay
      const physical = 10 * Math.sin(((2 * Math.PI) / 23) * daysFromBirth)
      const emotion = 10 * Math.sin(((2 * Math.PI) / 28) * daysFromBirth)
      const iq = 10 * Math.sin(((2 * Math.PI) / 33) * daysFromBirth)
      newDataSeries.push({ id: uuid(), date: i, physical, emotion, iq })
      i += oneDay
    }
    setDataSeries(newDataSeries)
  }

  useEffect(() => {
    generateTimeSeries()
  }, [birthDate])

  return (
    <div style={{ width: '100%' }}>
      <h4>A demo of synchronized AreaCharts</h4>
      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId='anyId'
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
      <p>Maybe some other content</p>

      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId='anyId'
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width='100%' height={500}>
        <ScatterChart>
          <XAxis
            dataKey='date'
            domain={['auto', 'auto']}
            name='Time'
            type='number'
          />
          <YAxis dataKey='physical' name='Value' />
          <Scatter
            data={dataSeries}
            line={{ stroke: '#d3d3d3' }}
            lineType='joint'
            lineJointType='monotoneX'
            name='Values'
          />
          <Tooltip />
          <CartesianGrid strokeDasharray='3 3' />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
