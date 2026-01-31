import styled from "styled-components";
import Pricing from "./Pricing";

function App() {
  return (
    <>
    <div style={{textAlign: "center",
    fontSize: "25px"}}>
      <h2>Our Pricing</h2>
      <p>Choose the plan that fits your needs</p>
    </div>
    <MainContainer>
      <div className="pricing-component">
        <Pricing
          data={[
            { text: "3 new project / month", value: true },
            { text: "Basic interaction", value: false },
          ]}
          price={0}
          duration="y"
          shadow="#ffffff"
          currency="€"
          buttonContent="Get Started"
          priceText="Create your calendar and share it with the world."
          headerText="free"
        />
      </div>
      <div className="pricing-component">
        <Pricing
          data={[ 
            { text: "Unlimited projects", value: true },
            { text: "Basic interaction", value: true },
          ]}
          price={5}
          duration="m"
          shadow="#ffffff"
          currency="€"
          buttonContent="Get Started"
          priceText="Bring your designs to the next level and export them."
          headerText="Monthly"
        />
      </div>
      <div className="pricing-component">
        <Pricing
          data={[
            { text: "Unlimited projects", value: true },
            { text: "Basic interaction", value: true },
          ]}
          price={55}
          duration="y"
          shadow="#ffffff"          
          currency="€"
          buttonContent="Get Started"
          priceText="Enjoy limitless use with interactive export options."
          headerText="yearly"
        />
      </div>
    </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 9rem 0;
  border-radius: 1.6rem;
  background: black
  @media screen and (max-width: 970px) {
    flex-direction: column;
    padding: 5rem 0;
    height: auto;
    
  }

  @media screen and (min-width: 971px) and (max-width: 1200px) {
    padding: 6rem 0;
  }

  @media screen and (min-width: 1201px) and (max-width: 1600px) {
    padding: 7rem 0;
  }

  @media screen and (min-width: 1601px) {
    padding: 8rem 0;
  }
`;
export default App;