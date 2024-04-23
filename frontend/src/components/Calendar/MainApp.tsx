import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { StyledApp } from './AppStyles';
import Hatch from './Hatch';
import db from './firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import DocumentFetcher from './DocumentFetcher';

const GlobalStyle = createGlobalStyle`
  body {
    background: center / cover url("./img/calendar_backdrop.jpg");
    margin: 0;
  }`;

interface HatchData {
  id: string;
  nr: number;
  text: string;
  img: string;
  open: boolean;
}

function MainApp() {
  const [hatches, setHatches] = useState<HatchData[]>([]);

  useEffect(() => {
    const fetchHatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'hatches'));
      const fetchedHatches = querySnapshot.docs.map(doc => {
        const { id, ...data } = doc.data() as HatchData & { id?: string };
        return {
          id: doc.id,
          ...data
        };
      });
      
      setHatches(fetchedHatches);
    };

    fetchHatches();
  }, []);

  const handleFlipHatch = async (id: string) => {
    const updatedHatches = hatches.map(hatch =>
      hatch.id === id ? { ...hatch, open: !hatch.open } : hatch
    );
    setHatches(updatedHatches);

    const hatchRef = doc(db, 'hatches', id);
    await updateDoc(hatchRef, { open: !hatches.find(hatch => hatch.id === id)?.open });
  };

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {hatches.map((hatch) => (
          <Hatch
            key={hatch.id}
            hatchData={hatch}
            handleClick={handleFlipHatch}
          />
        ))}
      </StyledApp>
      <div>
            <DocumentFetcher documentId="gqrvB59W4yUVmiBGvDJS9mkUqK72" />
        </div>
    </>
  );
}

export default MainApp;


// const shuffle = (a: Array<any>) => {
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// };