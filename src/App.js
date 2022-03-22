import { useState } from 'react'
import tw from 'tailwind-styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Chart from './components/chart'

function App() {
  const [birthDate, setBirthDate] = useState(new Date())

  return (
    <Wrapper>
      <Title>Biological Clock</Title>
      <DescriptionContainer>Description</DescriptionContainer>
      <InputContainer>
        <DatePicker
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          wrapperClassName='date-picker'
        />
      </InputContainer>
      <ChartContainer>
        <Chart birthDate={birthDate.valueOf()} />
      </ChartContainer>
    </Wrapper>
  )
}

export default App

const Wrapper = tw.div`
bg-sky-100 flex flex-col items-center
`
const Title = tw.div`
text-gray-800 text-4xl font-bold tracking-wide uppercase py-8
`
const DescriptionContainer = tw.div``

const InputContainer = tw.div``

const ChartContainer = tw.div`
w-screen p-8
`
