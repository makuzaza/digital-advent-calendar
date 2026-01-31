import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

interface PricingProps {
  data: { value: boolean; text: string }[];
  price: number;
  duration: "y" | "m";
  background?: string;
  shadow?: string;
  buttonContent?: string;
  currency?: string;
  subTitle?: string;
  priceText?: string;
  headerText?: string;
}

const Pricing: React.FC<PricingProps> = ({
  data,
  price,
  duration,
  background,
  shadow = "#a0c5fa",
  buttonContent,
  currency = "$",
  priceText,
  headerText,
}) => {
  return (
    <MainContainer shadow={shadow}>
      <Header background={background}>{headerText}</Header>
      {price !== undefined && (
        <PricingContainer>
          <PriceContainer>
            <CurrencyContainer>
              <span>{currency}</span>
            </CurrencyContainer>
            <Price>
              <span>{price}</span>
            </Price>
            {price > 0 && (
              <Duration>
                <span> {duration === "m" ? "/ mo" : "/ yr"}</span>
              </Duration>
            )}
          </PriceContainer>
          {priceText && (
            <PriceText>
              <h5>{priceText}</h5>
            </PriceText>
          )}
        </PricingContainer>
      )}
     
      {data && (
        <DataContainer>
          <ul>
            {data.map((dt) => (
              <li key={dt.text}>
                {dt.value ? (
                  <FaCheck className="true" />
                ) : (
                  <ImCross className="false" />
                )}
                {dt.text}
              </li>
            ))}
          </ul>
          {buttonContent && (
            <ButtonContainer>
              <Button>{buttonContent}</Button>
            </ButtonContainer>
          )}
        </DataContainer>
      )}
    </MainContainer>
  );
};


export const MainContainer = styled.div<{ shadow: string }>`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap");
  font-family: "Raleway", sans-serif;
  width: 18rem;
  height: max-content;
  background-color: white;
  display: flex;
  flex-direction: column;
  color: black;
  box-shadow: 0 8px 14px -6px ${(props) => props.shadow};
  transition: 0.4s ease-in-out;
  border-radius: 1rem; 
  margin-bottom: 5rem;

  &:hover {
    box-shadow: 0 8px 26px -6px ${(props) => props.shadow};
    margin-bottom: 0.4rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

export const Header = styled.div<{ background?: string }>`
  margin: 0.6rem;
  height: 2.5rem;
  background-color: #ebf3fd;
  background-image: ${(props) => props.background};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  border-radius: 10rem; 
  border: 3px solid purple;

  @media screen and (max-width: 768px) {
    margin: 0.3rem;
  }
`;

export const PricingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CurrencyContainer = styled.div`
  margin-top: 0.5rem;
  margin-right: 0.2rem;

  @media screen and (max-width: 768px) {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

export const Price = styled.div`
  span {
    font-size: 3rem;
  }
`;

export const Duration = styled.div`
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const PriceText = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  text-align: center;
  font-weight: 100;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;

  @media screen and (max-width: 768px) {
    margin: 1rem 0;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border-radius: 0.3rem;
  width: 90%;
  height: 3.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #1d3557;
    color: white;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const DataContainer = styled.div`
  ul {
    list-style-type: none;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .true {
        color: #34f034;
        font-size: 1rem;
      }

      .false {
        color: #f54343;
        font-size: 1rem;
      }

      svg {
        margin-right: 0.5rem;
        font-size: 0.8rem;
      }
    }
  }
`;

export default Pricing;