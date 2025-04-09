import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap";
import "./styles.scss";
// import { getPresignedUrl, uploadFile } from "./awsUtils"; // Functions for AWS interaction

const ImageCropper = () => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3); // Aspect ratio for cropping

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setOpenModal(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleImageCropped = async (croppedArea, croppedAreaPixels) => {
    // Crop the image based on the selected area
    const image = new Image();
    image.src = URL.createObjectURL(file);
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    const croppedImageUrl = canvas.toDataURL("image/jpeg");
    setCroppedImage(croppedImageUrl);
  };

  const handleSave = async () => {
    // Get presigned URL
    // const presignedUrl = await getPresignedUrl();

    // // Upload cropped image
    // await uploadFile(presignedUrl, croppedImage);

    // Close modal and reset states
    setOpenModal(false);
    setFile(null);
    setCroppedImage(null);
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div>
      {openModal && (
        <Modal
          isOpen={openModal}
          toggle={() => setOpenModal(false)}
          fullscreen
          className="cropper-modal"
          size="lg"
        >
          <ModalHeader toggle={() => setOpenModal(false)}>
            Crop the Image
          </ModalHeader>
          <ModalBody className="cropper-body">
            <Cropper
              image={URL.createObjectURL(file)}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={handleCropChange}
              onZoomChange={handleZoomChange}
              onCropComplete={handleImageCropped}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default ImageCropper;
