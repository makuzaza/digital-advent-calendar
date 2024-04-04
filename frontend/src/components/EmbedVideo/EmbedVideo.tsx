type Props = {
  videoURL: string;
};

const EmbedVideo: React.FC<Props> = ({ videoURL }) => {
  const embedURL = videoURL.replace("watch?v=", "embed/");

  return (
    <div
      className="embed-video"
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* 16:9 */,
        paddingTop: 25,
        height: 0,
      }}
    >
      {embedURL && (
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          src={embedURL}
        ></iframe>
      )}
    </div>
  );
};

export default EmbedVideo;
