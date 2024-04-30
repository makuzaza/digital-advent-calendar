import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

type Props = {
  url: string;
};

const ShareOnFacebook: React.FC<Props> = ({ url }) => {
  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </>
  );
};

export default ShareOnFacebook;
