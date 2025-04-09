import CardWrapper from "components/Card/CardWrapper";
import Header from "components/Headers/Header";
import React, { useState } from 'react';
import { Button, FormGroup, Alert, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import upload from "../../assets/img/upload.svg";
import "../../components/CustomBanner/style.scss";
import clsx from "clsx";
import { ENDPOINT } from "config/api-endpoints";
import { POST } from "services/axios-request-handlers";
import { generateUniqueID } from "utils/commonFunctions";
import { getPresignedUrl } from "utils/commonFunctions";
import { putUploadUrl } from "utils/commonApiFunctions";
import toast from "react-hot-toast";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { setLoading } from "redux/reducers/GlobalReducer";


const UploadUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showIcon = true;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [failedEmails, setFailedEmails] = useState();
    const toggleModal = () => setOpenModal(!openModal);


    // Handler for drag-and-drop and validation
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setError(""); // Reset previous errors
        if (file) {
            // Check file type
            const fileType = file.type;
            const isExcel = fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                fileType === "application/vnd.ms-excel";
            if (!isExcel) {
                setError("Invalid file type. Please upload an Excel file (.xls or .xlsx).");
                setSelectedFile(null);
                return;
            }
            // Check file size
            if (file.size > MAX_FILE_SIZE) {
                setError("File is too large. Max file size is 5MB.");
                setSelectedFile(null);
                return;
            }
            // If valid, set selectedFile to display in UI
            setSelectedFile(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: [
            'application/vnd.ms-excel',        // .xls files
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  // .xlsx files
        ]
    });


    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setLoading(true));
        try {
            if (selectedFile) {
                const keyName = `${generateUniqueID()}_UserTemplate_${selectedFile.name?.replace(/ /g, "")}`;
                const fileObjects = {
                    folder: "users-fileUpload",
                    key: keyName,
                };

                // Get presigned URL
                const resp = await getPresignedUrl(fileObjects, selectedFile);
                if (resp?.signedUrl) {
                    await putUploadUrl(resp?.signedUrl, selectedFile);
                }

                const fileName = resp?.path.split('/').slice(1).join('/');
                const payload = {
                    foldername: "users-fileUpload",
                    filename: fileName,
                };

                // Make POST request
                const value = await POST(ENDPOINT.UPLOAD_USER, payload);

                // Handle API response
                let output = value?.response?.data;
                if (output?.statusCode === 200) {
                    toast.success(output?.message || "Users data uploaded successfully");
                    navigate("/admin/users");
                } else {
                    // Specific error handling for 400 status code
                    if (output?.statusCode === 400) {
                        console.error(error);
                        // toast.error(output?.message || "Bad Request: Please check the file and try again.");
                    } else {
                        if (output?.message.startsWith("Duplicate")) {
                            setFailedEmails(output?.message || []); // Adjust based on the API response
                            setOpenModal(true);
                        }

                    }
                }
            }
        } catch (error) {
            // Centralized error handling for all exceptions
            if (error.response?.status === 400) {
                toast.error("Bad Request: Please check the uploaded file and try again.");
            } else {
                console.error(error);
                toast.error(error?.message || "Something went wrong");
            }
        } finally {
            dispatch(setLoading(false)); // Ensure loading state is reset
        }
    };



    return (
        <div className="createBanner">
            <Header />
            <CardWrapper title={"Upload excel file"}>
                <Row className="justify-content-end align-items-center mt-3" >
                    <Button
                        color="primary"
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href = "/Users Template File.xlsx";
                            link.download = "Users Template File.xlsx";
                            link.click();
                        }}
                        size="md"
                        className="sample-template-btn"
                    >
                        Sample User Template File
                    </Button>
                </Row>

                <FormGroup>
                    <div className={"uploadBoxWrapper"}>
                        <div {...getRootProps()} className="uploadBoxWrapper">
                            <input {...getInputProps()} />
                            <div
                                className={clsx(
                                    "uploadBox d-flex align-items-center justify-content-center"

                                )}
                            >
                                <div>
                                    {showIcon ? <img src={upload} /> : null}
                                    <h3>
                                        {isDragActive
                                            ? "Drop your file here..."
                                            : selectedFile
                                                ? selectedFile.name
                                                : "Drag and drop or choose the file to upload"}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Modal isOpen={openModal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>Failed Email and Contact Details</ModalHeader>
                        <ModalBody style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {failedEmails ? (
                                <div>
                                    {(failedEmails.match(/Duplicate emails found in Cognito: ([^|]+)/)?.[1]  || failedEmails.match(/Duplicate emails found in the database: ([^|]+)/)?.[1] ) && (
                                        <>
                                            <h5>Duplicate Emails</h5>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(failedEmails
                                                        ?.match(/Duplicate emails found in Cognito: ([^|]+)/)?.[1] || failedEmails.match(/Duplicate emails found in the database: ([^|]+)/)?.[1])
                                                        .split(", ")
                                                        .map((email, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{email}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </>
                                    )}

                                    {failedEmails.match(/Duplicate contact numbers found in the database: (.+)/)?.[1] && (
                                        <>
                                            <h5>Duplicate Contact Numbers</h5>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Contact Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {failedEmails
                                                        ?.match(/Duplicate contact numbers found in the database: (.+)/)?.[1]
                                                        .split(", ")
                                                        .map((number, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{number}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <p>No failed details available</p>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>



                </FormGroup>
                {error && <Alert color="danger">{error}</Alert>}
                <Row className="float-right">
                    <Col>
                        <Button
                            color="secondary"
                            type="cancel"
                            onClick={(e) => {
                                navigate("/admin/users");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!selectedFile}
                        >
                            Upload
                        </Button>
                    </Col>
                </Row>


            </CardWrapper>
        </div>
    )

}

export default UploadUser;