import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const ModalWrapper = ({
  title,
  toggleModal,
  modalState,
  children,
  submitBtn,
  cancelBtn,
  handleSubmit,
  handleCancel,
  isSubmitDisabled,
}) => {
  return (
    <div>
      {" "}
      <Modal isOpen={modalState} centered>
        <ModalHeader
          className="align-items-center"
          toggle={() => toggleModal()}
        >
          <h3>{title}</h3>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => handleCancel()}>
            {cancelBtn}
          </Button>
          <Button
            color="primary"
            onClick={(e) => handleSubmit(e)}
            disabled={isSubmitDisabled || false}
          >
            {submitBtn}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalWrapper;
