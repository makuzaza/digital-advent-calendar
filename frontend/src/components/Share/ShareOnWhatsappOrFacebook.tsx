import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

type Props = {
  url: string;
};

const ShareOnFacebook: React.FC<Props> = ({ url }) => {
  return (
    <>
      <FacebookShareButton url={url} hashtag="#YODA">
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title="YODA calendars" separator=" | ">
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <EmailShareButton
        url={url}
        subject="YODA calendars"
        body="We invite you to explore, create, and share joy with YODA!"
        separator=" | "
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </>
  );
};

export default ShareOnFacebook;
