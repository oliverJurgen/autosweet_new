import LoaderGif from "public/assets/img/icons/loading3.gif";
import { Image } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <Image width="200px" height="200px" alt="loader" src={LoaderGif.src} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
