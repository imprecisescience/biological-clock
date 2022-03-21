import { useEffect, useState } from 'react'

import { v4 as uuid } from 'uuid'

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

  const gradientOffset = () => {
    const dataMax = Math.max(...dataSeries.map((i) => i.physical))
    const dataMin = Math.min(...dataSeries.map((i) => i.physical))

    if (dataMax <= 0) {
      return 0
    }
    if (dataMin >= 0) {
      return 1
    }

    return dataMax / (dataMax - dataMin)
  }

  const off = gradientOffset()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p>{new Date(label).toISOString().slice(0, 10)} </p>
          <p>{payload[0].value.toFixed(0)} </p>
          {/* <p className='intro'>{getIntroOfPage(label)}</p>
          <p className='desc'>Anything you want can be displayed here.</p> */}
        </div>
      )
    }

    return null
  }

  useEffect(() => {
    generateTimeSeries()
  }, [birthDate])

  return <div style={{ width: '100%' }}></div>
}

export default Chart
