import styled from "styled-components";

interface StyledHatchProps {
  background: string;
}

export const StyledHatch = styled.div<StyledHatchProps>`
  padding-top: 100%;
  position: relative;
  cursor: pointer;
  

  .front {
    background: center / cover url(${(props) => props.background});
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: gray;
    transform-origin: left center;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "open sans";
      color: #fff;
      padding: 20px;
      width: 20%;
      height: 20%;
      background: rgba(0, 0, 0, 0.7);
      font-weight: 700;
      font-size: 2rem;
      transform-origin: left center; 
      transition: transform 0.5s; 
      border-radius: 50%;
    }

    &.open {
      transform: rotateY(90deg);
    }
  }

  .back {
    position: absolute;
    background: center / cover;
    top: 0px;
    left: 0px;
    z-index: 1;
    transform-origin: right center;
    transform: rotateY(-90deg);
    transition: transform 0.5s;     
    

    p {
      font-family: "Open sans";
      color: #fff;
      padding: 10px;
      font-size: 1.4rem;
      text-align: center;
      
    }

    &.open {
      z-index: 2;
      transform: rotateY(0deg);
      
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    transform-style: preserve-3d;
    
  }
`;
