import { useState } from 'react'
import tw from 'tailwind-styled-components'
import Chart from '../components/chart'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Home() {
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

const Wrapper = tw.div`
bg-sky-100 h-screen flex flex-col items-center
`
const Title = tw.div`
text-gray-800 text-4xl font-bold tracking-wide uppercase py-8
`
const DescriptionContainer = tw.div``

const InputContainer = tw.div``

const ChartContainer = tw.div``
