import React, { createRef, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import upload from "../../assets/img/upload.svg";
import "./style.scss";
import clsx from "clsx";
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { setLoading } from "redux/reducers/GlobalReducer";
const BannerWrapper = ({
  handleFile,
  isUploading,
  allowdedImgExt,
  allowdedVideoExt,
  type,
  showIcon = true,
  allowCropping = false,
  minCropBoxHeight,
  minCropBoxWidth,
  aspectRatio,
  classNames
}) => {
  const data = useSelector((state) => state?.uploadOrder);
  const [showError, setShowError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = createRef();
  const [fileName, setFileName] = useState(null);

  let dispatch = useDispatch();

  useEffect(() => {
    data?.notification.type === "error"
      ? setShowError(true)
      : setShowError(false);
  }, [data?.notification]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles?.length) {
      const selectedFile = acceptedFiles[0];
      if (allowCropping) {
        dispatch(setLoading(true));
        const reader = new FileReader();
        reader.onload = () => {
          setFile(reader.result);
          dispatch(setLoading(false));
        };
        reader.readAsDataURL(selectedFile);
        setOpenModal(true);
        setFileName(acceptedFiles?.[0]?.name);
      } else {
        handleFile(acceptedFiles);
      }
      // handleFile(acceptedFiles);
    } else if (acceptedFiles?.length > 1) {
      toast.error("You can select 1 file at a time");
    } else {
      toast.error("This file format is not supported");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: isUploading,
    accept: type
      ? type === "image"
        ? {
            "image/*": allowdedImgExt || [],
          }
        : {
            "video/*": allowdedVideoExt || [],
          }
      : { "image/*": allowdedImgExt || [], "video/*": allowdedVideoExt || [] },
  });

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCroppedImage(
        cropperRef.current?.cropper.getCroppedCanvas({width:minCropBoxWidth,height:minCropBoxHeight}).toDataURL("image/jpeg")
      );
      setOpenModal(false);
      setFile(null);
      handleFile(
        cropperRef.current?.cropper.getCroppedCanvas({width:minCropBoxWidth,height:minCropBoxHeight}).toDataURL("image/jpeg"),
        fileName
      );
    }
  };

  return (
    <div className={ classNames ? "d-flex justify-content-center" :''}>
      <div className={classNames} {...getRootProps()}>
        <div
          className={clsx(
            "uploadBox d-flex align-items-center justify-content-center",
            {
              disabled: isUploading,
              warning: showError,
              dopzoneFocused: isDragActive,
              'w-100 h-100':classNames
            }
          )}
        >
          <input {...getInputProps()} />
          <div>
            {showIcon ? <img src={upload} /> : null}
            <h3>
              {isDragActive
                ? "Drop your file here...."
                : "Drag and drop or choose the file to upload"}
            </h3>
          </div>
        </div>
      </div>

      {openModal && (
        <Modal
          isOpen={openModal}
          // toggle={() => setOpenModal(false)}
          fullscreen
          // className="modal"
          size="lg"
        >
          <ModalHeader toggle={() => setOpenModal(false)}>
            Crop the Image
          </ModalHeader>
          <ModalBody className="cropper-body">
            <div style={{ width: "100%" }}>
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                // initialAspectRatio={1}
                preview=".img-preview"
                src={file}
                viewMode={1}
                // minCropBoxHeight={minCropBoxHeight}
                // minCropBoxWidth={minCropBoxWidth}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
                aspectRatio={minCropBoxWidth/minCropBoxHeight}
                // aspectRatio={`${minCropBoxWidth/minCropBoxHeight}:${minCropBoxWidth/(minCropBoxWidth/minCropBoxHeight)}`}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={getCropData}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default BannerWrapper;
