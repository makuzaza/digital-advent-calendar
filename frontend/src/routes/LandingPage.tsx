import { BannerTop } from '../components/LandingPage/banner/BannerTop'
import Footer from '../components/LandingPage/Footer/Footer'
import { ParallaxProvider } from 'react-scroll-parallax'
import Login from './Login'

function LandingPage() {

  return (
    <div>
      <ParallaxProvider>
          <BannerTop /> 
          <Login />
          <div className="center full">
            <h1 className="headline gray"></h1>
          </div> 
        </ParallaxProvider>
    </div>
  )
}

export default LandingPage
