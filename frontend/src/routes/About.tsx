import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import react from "../assets/react.svg"
import typescript from "../assets/typescript.svg"
import node from "../assets/node.svg"
import express from "../assets/express.svg"
import firebase from "../assets/firebase.svg"

const About = () => {
  return (
    <div className="home">
      <div className="about">
        <div className="title">
          <h1>About the project</h1>
          <h3>
            Welcome to Your Own Digital Advent [ YODA ] calendars platform!
          </h3>
        </div>
        <div className="introduction">
          <p>
            Whether it's counting down to Christmas, celebrating birthdays, or
            marking other special events, users can easily customize their
            calendars to suit their preferences and surprise their audience.
          </p>
        </div>
        <div className="mission">
          <p>
            In this project our mission is to blend the traditional advent
            calendars with the convenience of digital technology.
          </p>
        </div>
        <div className="project-details">
          <p>
            YODA is a Software Development Team Project developed as part of the
            curriculum at Business College Helsinki.
          </p>
          <p>
            It was created in response to the needs of a client, simulating a
            real-life scrum project, to provide a modern solution for digital
            advent calendars.
          </p>
        </div>
        <div>
          <h3>Meet the Team: </h3>
          <div className="team">
          <div className="people">
          <p>Kuznetsova Maria</p>
          <a target="_blank" href="https://www.linkedin.com/in/maria-k-88543a11a">
            <LinkedInIcon className="linkedin"/>
          </a>
          <a target="_blank" href="https://github.com/Makuzaza">
            <GitHubIcon className="github"/>
          </a>
          <p>Tahashin Anika</p>
          <a target="_blank" href="">
            <LinkedInIcon className="linkedin"/>
          </a>
          <a target="_blank" href="">
            <GitHubIcon className="github"/>
          </a>
          </div>
          <div className="people"><p>Munsi Mithun</p>
          <a target="_blank" href="">
            <LinkedInIcon className="linkedin"/>
          </a>
          <a target="_blank" href="">
            <GitHubIcon className="github"/>
          </a>
          <p>Kivimäki Atte</p>
          <a target="_blank" href="https://www.linkedin.com/in/aj-kivimaki/">
            <LinkedInIcon className="linkedin"/>
          </a>
          <a target="_blank" href="https://github.com/aj-kivimaki">
            <GitHubIcon className="github"/>
          </a>
          </div>
          </div>
        </div>
        <div className="technologies">
          <h3>Technologies Used:</h3>     
          <div className="team">
          <div className="pics">
            <img src={react} alt="react"/>
          <p>React</p>
          </div>
          <div className="pics">
            <img src={typescript} alt="typescript"/>
          <p>Typescript</p>
          </div>
          <div className="pics">
            <img src={node} alt="reanodect"/>
          <p>Node.js</p>
          </div>
          <div className="pics">
            <img src={express} alt="express"/>
          <p>Express</p>
          </div>
          <div className="pics">
            <img src={firebase} alt="firebase"/>
          <p>Firebase</p>
          </div>
        </div>
        </div>
        <div className="last-words">
          <p>We invite you to explore, create, and share joy with YODA!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
