import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

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
        <div className="team">
          <h3>Meat the Team: </h3>
          <p>Kuznetsova Maria</p>
          <a target="_blank" href="">
            <LinkedInIcon />
          </a>
          <a target="_blank" href="">
            <GitHubIcon />
          </a>
          <p>Tahashin Anika</p>
          <a target="_blank" href="">
            <LinkedInIcon />
          </a>
          <a target="_blank" href="">
            <GitHubIcon />
          </a>
          <p>Munsi Mithun</p>
          <a target="_blank" href="">
            <LinkedInIcon />
          </a>
          <a target="_blank" href="">
            <GitHubIcon />
          </a>
          <p>Kivimäki Atte</p>
          <a target="_blank" href="https://www.linkedin.com/in/aj-kivimaki/">
            <LinkedInIcon />
          </a>
          <a target="_blank" href="https://github.com/aj-kivimaki">
            <GitHubIcon />
          </a>
        </div>
        <div className="technologies">
          <h3>Technologies Used:</h3>
          <p>React / Typescript</p>
          <p>Node.js / Express</p>
          <p>Firebase</p>
        </div>
        <div className="last-words">
          <p>We invite you to explore, create, and share joy with YODA!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
