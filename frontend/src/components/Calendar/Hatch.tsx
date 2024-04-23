import React from "react";
import { StyledHatch } from "./HatchStyles";

interface HatchProps {
  hatchData: {
    id: string;  
    nr: number;
    text: string;
    img: string;
    open: boolean;
  };
  handleClick: (id: string) => void;  
}

const Hatch: React.FC<HatchProps> = ({ hatchData, handleClick }) => (
  <StyledHatch background={hatchData.img} onClick={() => handleClick(hatchData.id)}>
    <div className={hatchData.open ? "front open" : "front"}>
      <p>{hatchData.nr}</p>
    </div>
    <div className={hatchData.open ? "back open" : "back"}>
      <p>{hatchData.text}</p>
    </div>
  </StyledHatch>
);

export default Hatch;
