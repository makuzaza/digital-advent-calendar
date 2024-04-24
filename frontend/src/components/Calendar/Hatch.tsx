import React from "react";
import { StyledHatch } from "./HatchStyles";

interface HatchProps {
  hatchData: {
    id: string;
    nr: number;
    text: {  
        title: string;
        titleFont: string;
        titleFontSize: number;
        titleColor: string;
        subtitle: string;
        subtitleFont: string;
        subTitleFontSize: number;
        subtitleColor: string;
    };
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
    </div>
  </StyledHatch>
);

export default Hatch;
