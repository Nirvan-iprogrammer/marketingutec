import Header from "components/Headers/Header";
import { ENDPOINT } from "../../config/api-endpoints";
import React, {  useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Col,
  FormGroup,
  Input,
  Row,
  Form,
  CustomInput,
  Spinner,
} from "reactstrap";
import { POST } from "services/axios-request-handlers";
import { putUploadUrl } from "utils/commonApiFunctions";
import { generateUniqueID } from "utils/commonFunctions";
import CardWrapper from "components/Card/CardWrapper";
import { GET } from "services/axios-request-handlers";
import { getPresignedUrl } from "utils/commonFunctions";
import { generatePassword } from "utils/commonFunctions";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/reducers/GlobalReducer";
import awsExports from "config/aws-exports";
import { validateImageFile } from "utils/commonFunctions";
import { validateName } from "utils/commonFunctions";

const CreateUser = ({ isEdit }) => {
  const params = useParams();
  let edit = false;
  if (isEdit || params?.id) {
    edit = true;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profilePicRef = useRef(null);
  const [status, setStatus] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    file: null,
    preview: "",
  });
  const [copyState, setCopyState] = useState("Copy");
  const [copiedText, setCopiedText] = useState("");
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile_pic: "",
    role_id: "",
    is_active: true,
    admin_type: null
  });
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [s3BasePath, setS3BasePath] = useState("");

  useEffect(() => {
    edit && getUserDetails();
    if (!edit) {
      const newPass = generatePassword();
      setPassword(newPass);
    }
    getUserRoles();
  }, []);

  const getUserRoles = async () => {
    try {
      let response = await GET(ENDPOINT.GET_USER_ROLE);
      if (response?.response?.data?.statusCode === 200) {
        let newData = response?.response?.data?.data?.data?.map((ele)=>{
          return{
            ...ele,
            role_name :ele?.role_name?.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1?.toUpperCase()+m2?.toLowerCase())
          }
        })
        setRoles(newData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const getUserDetails = async () => {
    dispatch(setLoading(true));
    try {
      const res = await GET(`${ENDPOINT.GET_USER_BY_ID}/${params?.id}`);
      const response = res?.response?.data;
      if (response?.statusCode === 200) {
        let resp = response?.data;
        resp.admin_type = resp?.admin_type ? resp?.admin_type : 1;
        setFormData({...resp, role_name: resp?.role?.role_name});
        setStatus(response?.data?.is_active);
        setS3BasePath(response?.data?.s3BasePath);
        response?.data?.profile_pic &&
          setSelectedImage((prev) => ({
            ...prev,
            preview: `${awsExports.S3_BASE_URL}${response?.data?.profile_pic}`,
          }));
      }
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e, check) => {
    const { name, value } = e.target;
    let formDataState = { ...formData };
    if (value.match(/^\s/)) {
      return;
    }
    if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
    if ((name === "email" || name === "name") && value.length > 40) {
      setErrors({
        ...errors,
        [name]: "Max length is 40 characters",
      });
      return;
    }
    if (name === "designation" && value?.length > 40) {
      setErrors({
        ...errors,
        [name]: "Max length 40 characters",
      });
      return;
    }
    if (name === "contact_number" && value?.length > 10) {
      setErrors({
        ...errors,
        [name]: "Max length 10 characters",
      });
      return;
    }

    if (check === "admin_type") {
        let item = roles?.find((itm)=>itm.id === +value)
        formDataState.role_name = item?.role_name
        if(item?.role_name?.toLowerCase()  === 'super admin'){
          formDataState.admin_type = 2;
        }else{
          formDataState.admin_type = 1;
        }
      
    }
    

    setFormData({
      ...formDataState,
      [name]: value,
    });
    // Reset errors when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    const phoneNumberRegex = /^[6-9]\d{9}$/;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      const res = validateName(formData.name);
      if (res) {
        newErrors.name = res;
        isValid = false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    // Role validation
    if (!formData.role_id) {
      newErrors.role_id = "Role is required";
      isValid = false;
    }

    // if (
    //   !edit &&
    //   !validator.isStrongPassword(password, {
    //     minLength: 8,
    //     maxLength: 20,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //   })
    // ) {
    //   newErrors.password =
    //     "Password must have at least 8 characters with combination of at least 1 upper case, 1 lower case, 1 number and 1 symbol.";
    //   isValid = false;
    // }

    if (!formData?.contact_number?.trim()) {
      newErrors.contact_number = "Contact number is required";
      isValid = false;
    } else {
      if (formData?.contact_number?.length !== 10) {
        newErrors.contact_number = "Contact number  must be 10 digits long";
        isValid = false;
      } else {
        if (!phoneNumberRegex.test(formData?.contact_number)) {
          newErrors.contact_number = "Contact number must be valid";
          isValid = false;
        }
      }
    }

    if (!formData?.designation?.trim()) {
      newErrors.designation = "Designation is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        // Your logic for submitting the form (e.g., API call) goes here
        setSubmitting(true);
        const fileUrl = await uploadFile();
        let payload = {};
        if (edit) {
          payload = {
            id: formData?.user_id,
            name: formData.name,
            role_id: formData.role_id,
            is_active: formData.is_active,
            profile_pic: fileUrl
              ? fileUrl
              : formData.profile_pic
              ? formData.profile_pic
              : "",
            contact_number: formData?.contact_number?.trim(),
            designation: formData?.designation?.trim(),
            admin_type:  formData?.role_name?.toLowerCase() === 'admin' ? formData?.admin_type : formData?.role_name?.toLowerCase() === 'super admin' ? 2 : null
          };
          if (status !== formData?.is_active) {
            payload.editing_cognito_access = true;
          }
        } else {
          payload = {
            name: formData.name,
            email: formData.email,
            role_id: formData.role_id,
            // password: password,
            profile_pic: fileUrl
              ? fileUrl
              : formData.profile_pic
              ? formData.profile_pic
              : "",
            contact_number: formData?.contact_number?.trim(),
            designation: formData?.designation?.trim(),
            admin_type: formData?.role_name?.toLowerCase() === 'admin' ? formData?.admin_type : formData?.role_name?.toLowerCase() === 'super admin' ? 2 : null
          };
          if (payload?.profile_pic === "") delete payload.profile_pic;
        }
        const res = await POST(
          edit ? ENDPOINT.UPDATE_USER : ENDPOINT.CREATE_USER,
          payload
        );
        let resp = res?.response?.data;
        if (resp?.statusCode === 200) {
          toast.success(resp?.message || "User created successfully");
          navigate("/admin/users");
        } else {
          console.log("Error");
          // toast.error(resp?.message || "Something went wrong");
        }
      }
      // else {
      //   toast.warning("Please input valid data!");
      // }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectFile = (e) => {
    if (!e?.target?.files?.length) return;
    const acceptedFiles = e?.target?.files;
    try {
      if (acceptedFiles.length > 0 && validateImageFile(acceptedFiles[0])) {
        setSelectedImage({
          preview: URL.createObjectURL(acceptedFiles[0]),
          file: acceptedFiles[0],
        });
      } else {
        toast.error("File Format is incorrect");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const uploadFile = async () => {
    let fileUrl = "";
    const selectedFile = selectedImage?.file;
    try {
      if (selectedFile) {
        const extension = selectedFile?.name?.split(".").pop();
        const filePath = `upload/${selectedFile.name}`;
        const keyName = `${generateUniqueID()}_UserFile_${selectedFile.name?.replace(
          / /g,
          ""
        )}`;
        const fileObjects = {
          folder: "users",
          key: keyName,
        };

        const resp = await getPresignedUrl(fileObjects);
        if (resp?.signedUrl) {
          await putUploadUrl(resp?.signedUrl, selectedFile);
          fileUrl = resp?.path;
        }
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      // stop all loaders
      return fileUrl;
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage({
      file: null,
      preview: "",
    });
    setFormData((prev) => ({
      ...prev,
      profile_pic: "",
    }));
  };

  return (
    <div className="createBanner">
      <Header />
      <CardWrapper title={edit ? "Update user " : "Create user"}>
        <Form>
          {/* <h6 className="heading-small text-muted mb-4">User information</h6> */}
          <div className="pl-lg-4">
            <Row>
              <Col lg="12">
                <div className="flex-column-center">
                  <input
                    ref={profilePicRef}
                    type="file"
                    accept="image/*"
                    id="profileImage"
                    onChange={handleSelectFile}
                    style={{
                      display: "none",
                    }}
                  />
                  <div
                    className="avatar-container"
                    onClick={() => profilePicRef?.current?.click()}
                  >
                    {selectedImage?.preview ? (
                      <img
                        src={selectedImage.preview}
                        alt="Selected Profile"
                        className="avatar-image"
                      />
                    ) : (
                      <i className="fas fa-user-circle avatar-placeholder"></i>
                    )}
                  </div>
                  {selectedImage.preview && (
                    <label
                      className="form-control-label remove-text-btn"
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </label>
                  )}
                </div>
                <hr className="my-4" />
              </Col>

              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="userName">
                    Name <span className="text-red">*</span>
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="userName"
                    placeholder="Enter user name"
                    type="text"
                    required
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                  />
                  <label
                    className="form-control-label text-red"
                    htmlFor="userName"
                  >
                    {errors.name}
                  </label>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="designation">
                    Designation <span className="text-red">*</span>
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="designation"
                    placeholder="Enter designation"
                    type="text"
                    required
                    name="designation"
                    value={formData?.designation || ""}
                    onChange={(e) => {
                      let regex = /^[a-zA-Z ]*$/;
                      if (!regex?.test(e.target.value)) {
                        return;
                      }
                      handleChange(e);
                    }}
                    // maxLength={40}
                  />
                  <label
                    className="form-control-label text-red"
                    htmlFor="designation"
                  >
                    {errors.designation}
                  </label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="emailAddr">
                    Email address <span className="text-red">*</span>
                  </label>
                  <Input
                    disabled={edit}
                    className="form-control-alternative"
                    id="emailAddr"
                    placeholder="Enter email address"
                    type="email"
                    required
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                  />
                  <label
                    className="form-control-label text-red"
                    htmlFor="emailAddr"
                  >
                    {errors.email}
                  </label>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="contactNo">
                    Contact number <span className="text-red">*</span>
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="contactNo"
                    placeholder="Enter contact number"
                    type="text"
                    required
                    name="contact_number"
                    value={formData?.contact_number || ""}
                    onChange={(e) => {
                      if (isNaN(e.target.value)) {
                        return;
                      }
                      handleChange(e);
                    }}
                    // maxLength={10}
                  />
                  <label
                    className="form-control-label text-red"
                    htmlFor="contactNo"
                  >
                    {errors.contact_number}
                  </label>
                </FormGroup>
              </Col>

              {/* <Col lg="6">
                <FormGroup switch>
                  <label className="form-control-label" htmlFor="altName">
                    Is active ?
                  </label>
                  <CustomInput
                    checked={formData?.is_active}
                    type="switch"
                    id="id-1"
                    className="ml-auto mr-1"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_active: e.target.checked ? 1 : 0,
                      }))
                    }
                  />
                </FormGroup>
              </Col> */}
            </Row>
            <Row className="userRadio mb-4">
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="exampleSelect"
                  >
                    Role <span className="text-red">*</span>
                  </label>
                  <Input
                    className="form-control-alternative custom-select c-p"
                    id="exampleSelect"
                    type="select"
                    required
                    name="role_id"
                    value={formData?.role_id}
                    onChange={(e) => handleChange(e, "admin_type")}
                  >
                    <option className="c-p" value={null}>
                      Select role
                    </option>
                    {roles?.map((role, idx) => (
                      <option className="c-p catitalizeFirstLetter" key={role?.id} value={role?.id}>
                        {role?.role_name}
                      </option>
                    ))}
                  </Input>
                  <label
                    className="form-control-label text-red"
                    htmlFor="exampleSelect"
                  >
                    {errors.role_id}
                  </label>
                </FormGroup>
              </Col>
              {formData?.role_name?.toLowerCase() === 'admin' ? <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-name">
                    Select additional role
                  </label>
                  <div className="d-flex mt-2 radioButton">
                    <FormGroup check className="d-flex">
                      <CustomInput
                        // disabled={Number(formData?.role_id)!== 1}
                        type="radio"
                        id="Author"
                        name="author"
                        checked={formData?.admin_type === 1}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            admin_type: e.target.checked ? 1 : null,
                          }));
                        }}
                        style={{
                          "&:checked": {
                            backgroundColor: "black",
                            borderColor: "black",
                            color: "white",
                          },
                        }}
                      />
                      <label htmlFor={"fileSelection"}>{"Author"}</label>
                    </FormGroup>
                    <FormGroup check className="d-flex">
                      <CustomInput
                        // disabled={Number(formData?.role_id) !== 1}
                        type="radio"
                        id="reviewer"
                        checked={formData?.admin_type === 2}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            admin_type: e.target.checked ? 2 : null,
                          }));
                        }}
                        style={{
                          "&:checked": {
                            backgroundColor: "black",
                            borderColor: "black",
                            color: "white",
                          },
                        }}
                      />
                      <label htmlFor={"reviewer"}>{"Reviewer"}</label>
                    </FormGroup>
                  </div>
                </FormGroup>
              </Col> : null}
            </Row>
            <Row>
              <Col lg="6">
                {edit ? (
                  <FormGroup switch>
                    <label className="form-control-label" htmlFor="isActive">
                      Is active ?
                    </label>
                    <CustomInput
                      checked={formData?.is_active}
                      type="switch"
                      id="isActive"
                      className="ml-auto mr-1"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          is_active: e.target.checked ? 1 : 0,
                        }))
                      }
                    />
                  </FormGroup>
                ) : null
                
                  // <FormGroup>
                  //   <label
                  //     className="form-control-label"
                  //     htmlFor="input-password"
                  //   >
                  //     Password
                  //   </label>
                  //   <Input
                  //     className="form-control-alternative"
                  //     id="input-password"
                  //     type={edit ? "password" : "text"}
                  //     required
                  //     name="password"
                  //     value={password}
                  //     onChange={handlePasswordChange}
                  //   />
                  //   {!edit && !errors?.password && password.length >= 8 && (
                  //     <CopyToClipboard
                  //       text={password}
                  //       onCopy={() => {
                  //         copyState === "Copy" &&
                  //           handleCopyToClipboard(password);
                  //       }}
                  //     >
                  //       <label
                  //         className="form-control-label text-primary c-p"
                  //         htmlFor="input-name"
                  //       >
                  //         {copyState}
                  //       </label>
                  //     </CopyToClipboard>
                  //   )}
                  //   <label
                  //     className="form-control-label text-red"
                  //     htmlFor="input-name"
                  //   >
                  //     {errors?.password}
                  //   </label>
                  // </FormGroup>
                  }
              </Col>
            </Row>
          </div>
          <hr className="my-4" />

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
                disabled={submitting}
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                {submitting ? (
                  <Spinner size="sm">Loading...</Spinner>
                ) : edit ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default CreateUser;
