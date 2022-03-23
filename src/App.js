import { useState } from 'react'
import tw from 'tailwind-styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaMale, FaFemale } from 'react-icons/fa'
import Chart from './components/chart'

function App() {
  const [birthDate, setBirthDate] = useState(new Date())

  return (
    <Wrapper>
      <MainContainer>
        <Title>Biological Clock</Title>

        <DescriptionContainer>Description</DescriptionContainer>
        <InputContainer key='1'>
          <FaFemale size={28} />
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
        <InputContainer key='2'>
          <FaMale size={28} />
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
      </MainContainer>
    </Wrapper>
  )
}

export default App

const Wrapper = tw.div`
bg-sky-100 flex flex-col items-center
`
const MainContainer = tw.div`
container flex flex-col m-8 p-8 bg-white rounded-lg items-center
`
const Title = tw.div`
text-gray-800 text-4xl font-bold tracking-wide uppercase py-8
`
const DescriptionContainer = tw.div``

const InputContainer = tw.div`
flex items-center mt-4 w-96
`
const ChartContainer = tw.div`
w-full p-8
`
