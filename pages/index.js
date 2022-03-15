import tw from 'tailwind-styled-components'
import Chart from '../components/chart'

export default function Home() {
  return (
    <Wrapper>
      <Title>Biological Clock</Title>
      <DescriptionContainer>Description</DescriptionContainer>
      <InputContainer>Date input</InputContainer>
      <ChartContainer>
        <Chart />
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
