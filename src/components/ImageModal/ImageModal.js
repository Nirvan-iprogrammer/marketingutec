import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import "./styles.scss";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const ImageModal = (props) => {
  const { imageUrl } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fullscreen-image-container">
      <img
        className="image-preview"
        src={imageUrl}
        alt="Click to enlarge"
        onClick={openModal}
      />
      {/* <Modal
        isOpen={isModalOpen}
        centered
        toggle={closeModal}
        contentLabel="Full Screen Image Modal"
        className="fullscreen-modal"
        overlayClassName="fullscreen-overlay"
      >
        <img src={imageUrl} alt="Full Screen" className="fullscreen-image" />
      </Modal> */}
      <Lightbox
        open={isModalOpen}
        close={closeModal}
        slides={[{ src: imageUrl }]}
      />
    </div>
  );
};

export default ImageModal;
