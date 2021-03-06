import { useState } from "react";
import tw from "tailwind-styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMale, FaFemale, FaBackward, FaForward } from "react-icons/fa";
import Chart from "./components/chart";

function App() {
  const [birthDate1, setBirthDate1] = useState(new Date());
  const [birthDate2, setBirthDate2] = useState(new Date());
  const [midDate, setMidDate] = useState(new Date().valueOf());

  return (
    <Wrapper>
      <MainContainer>
        <Title>生物節律 Biorhythm</Title>

        <DescriptionContainer>
          It is said that human body has three rhythms with a fixed cycle.
          <List>
            <li>
              Physical biorhythm (23-day cycles) is related to physical
              strength, durability, resistance, stamina, courage and etc..
            </li>
            <li>
              Emotional biorhythm (28-day cycles) is related to emotional
              stability, feeling, intuition, mood, susceptibility, creativity
              and etc.
            </li>
            <li>
              Intellectual biorhythm (33-day cycles) is related to thinking,
              analyzing, judgment, concentration, composition and etc.
            </li>
          </List>
        </DescriptionContainer>
        <InputContainer key="1">
          <FaMale size={28} />
          <DatePicker
            selected={birthDate1}
            onChange={(date) => setBirthDate1(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            wrapperClassName="date-picker"
          />
        </InputContainer>
        <InputContainer key="2">
          <FaFemale size={28} />
          <DatePicker
            selected={birthDate2}
            onChange={(date) => setBirthDate2(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            wrapperClassName="date-picker"
          />
        </InputContainer>
        <NavigatorContainer>
          <PreviousButton
            onClick={() => setMidDate(midDate - 1000 * 60 * 60 * 24 * 30)}
          >
            <FaBackward size={24} />
          </PreviousButton>
          <NextButton
            onClick={() => setMidDate(midDate + 1000 * 60 * 60 * 24 * 30)}
          >
            <FaForward size={24} />
          </NextButton>
        </NavigatorContainer>
        <ChartContainer>
          <Chart
            key="Chart1"
            birthDate1={birthDate1.valueOf()}
            birthDate2={birthDate2.valueOf()}
            midDate={midDate}
          />
        </ChartContainer>
      </MainContainer>
      <Footer>
        Copyrights (c) 2022 |
        <a href="https://www.youtube.com/c/非精密科學">非精密科學</a>
      </Footer>
    </Wrapper>
  );
}

export default App;

const Wrapper = tw.div`
bg-sky-100 flex flex-col items-center
`;
const MainContainer = tw.div`
container flex flex-col m-8 p-8 bg-white rounded-lg items-center
`;
const Title = tw.div`
text-gray-600 text-4xl font-bold tracking-wide uppercase py-8
`;
const DescriptionContainer = tw.div`
text-gray-500 text-sm
`;

const InputContainer = tw.div`
flex items-center mt-4 w-96 text-gray-600
`;
const ChartContainer = tw.div`
w-full p-8
`;
const NavigatorContainer = tw.div`
w-full flex justify-between
`;

const PreviousButton = tw.div`
cursor-pointer pl-12 text-gray-400
`;

const NextButton = tw.div`
cursor-pointer pr-12 text-gray-400
`;

const List = tw.ul`
list-disc
`;

const Footer = tw.div`
  text-sm text-gray-400 py-4
`;
