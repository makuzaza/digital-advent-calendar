import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { db } from "../../auth/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Hatch from "./Hatch";

const GlobalStyle = createGlobalStyle`
  body {
    background: center / cover url("./img/calendar_backdrop.jpg");
    margin: 0;
  }`;

interface HatchData {
  id: string;
  nr: number;
  img: string;
  open: boolean;
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
}

function MainApp() {
  const [hatches, setHatches] = useState<HatchData[]>([]);

  useEffect(() => {
    const fetchHatches = async () => {
      const querySnapshot = await getDocs(collection(db, "hatches"));
      const fetchedHatches: HatchData[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nr: data.nr,
          text: data.text,
          img: data.img,
          open: data.open,
        };
      });
      setHatches(fetchedHatches);
    };

    fetchHatches();
  }, []);

  const handleFlipHatch = async (id: string) => {
    const updatedHatches = hatches.map((hatch) =>
      hatch.id === id ? { ...hatch, open: !hatch.open } : hatch
    );
    setHatches(updatedHatches);

    const hatchRef = doc(db, "hatches", id);
    await updateDoc(hatchRef, {
      open: !hatches.find((hatch) => hatch.id === id)?.open,
    });
  };

  return (
    <>
      <GlobalStyle />
      {hatches.map((hatch) => (
        <Hatch key={hatch.id} hatchData={hatch} handleClick={handleFlipHatch} />
      ))}
    </>
  );
}

export default MainApp;
