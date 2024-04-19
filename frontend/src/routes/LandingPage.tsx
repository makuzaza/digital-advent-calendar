import { BannerTop } from "../components/LandingPage/banner/BannerTop";
import { ParallaxProvider } from "react-scroll-parallax";
import Login from "./Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
// import { useEffect } from 'react';
import Favourite from "./Favourite";

function LandingPage() {
  const [user] = useAuthState(auth);

  // useEffect(() => {
  //   if (user) {  // Redirect logic
  //     console.log("User is logged in");
  //   }
  // }, [user]) // Re-run the effect when the user changes

  return (
    <div>
      <ParallaxProvider>
        <BannerTop />
        <div style={{ marginBottom: '300px'}}>{!user && <Login />}</div>
        {/* <div className="center full">
            <h1 className="headline gray"></h1>
          </div>  */}
        {user && <Favourite />}
      </ParallaxProvider>
    </div>
  );
}

export default LandingPage;
