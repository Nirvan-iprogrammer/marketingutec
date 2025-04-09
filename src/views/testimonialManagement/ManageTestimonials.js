import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Col, CustomInput, FormGroup, Input, Row } from "reactstrap";
import toast from "react-hot-toast";
import Header from "components/Headers/Header";
import { ENDPOINT } from "config/api-endpoints";
import { POST } from "services/axios-request-handlers";
import CardWrapper from "components/Card/CardWrapper";
import { PUT } from "services/axios-request-handlers";
import { GET } from "services/axios-request-handlers";
import { convertPayloadToQueryString } from "utils/commonFunctions";
import { setLoading } from "redux/reducers/GlobalReducer";
import BannerWrapper from "components/CustomBanner/BannerWrapper";
import { getPresignedUrl } from "utils/commonFunctions";
import { uploadFiles } from "utils/commonApiFunctions";
import { generateUniqueID } from "utils/commonFunctions";
import awsExports from "config/aws-exports";
import { checkImageDimension } from "utils/commonFunctions";
import { base64UrlToFile } from "utils/commonFunctions";

const ManageTestimonials = ({ isEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    status: false
  });
  const [errors, setErrors] = useState({
    authorName: '',
    projectName: '',
    content: '',
    status: ''
  });
  const params = useParams();

  useEffect(() => {
    isEdit && getTestimonialById();
  }, []);

  const getTestimonialById = async () => {
    dispatch(setLoading(true));
    const payload = {
      id: params?.id,
    };
    try {
      let queryString = convertPayloadToQueryString(payload);
      let url = `${ENDPOINT.GET_TESTIMONIALS_BY_ID}${queryString}`;
      const res = await GET(url);
      let resp = res?.response?.data;
      if (resp?.data && resp?.statusCode === 200) {
        let data = resp?.data?.data;
        const imageURL = data?.image ?  `${awsExports?.S3_BASE_URL}${data?.image}` : ''
        setState({
          id: data?.id,
          authorName: data?.author_name,
          projectName: data?.project_name,
          content: data?.content,
          status: data?.status,
          image: imageURL || '',
          edit_Url: data?.image ||'',
          designation: data?.designation || ''
        });
      } else {
        toast.error("Something went wrong");
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error?.response);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleChange = (key, value) => {
    if (key === "authorName" && value?.length > 40) {
      setErrors({ ...errors, [key] : "Max length 40 characters" });
      return
    }
    if (key === "designation" && value?.length > 40) {
      setErrors({ ...errors, [key] : "Max length 40 characters" });
      return
    }

    if (key === "projectName" && value?.length > 40) {
      setErrors({ ...errors, [key] : "Max length 40 characters" });
      return
    }

    if (key === "content" && value?.length > 210) {
      setErrors({ ...errors, [key] : "Max length 210 characters" });
      return
    }
    setState((prev) => ({ ...prev, [key]: value }));
    setErrors({
      ...errors,
      [key]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    let error = {};
    if (!state?.authorName?.trim()) {
      isValid = false;
      error.authorName = "Customer name is required";
    }

    if (!state?.projectName?.trim()) {
      isValid = false;
      error.projectName = "Project name is required";
    }
    if (!state?.content?.trim()) {
      isValid = false;
      error.content = "Description is required";
    }
    if (!state?.designation?.trim()) {
      isValid = false;
      error.designation = "Designation is required";
    }
    setErrors({ ...error });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let isValid = validateForm();
      if (isValid) {
        dispatch(setLoading(true));
        const fileUrl = state?.selectedFile ? await uploadFile(state?.selectedFile) : "";
        isEdit ? handleUpdateTestimonial(fileUrl) : handleCreateTestimonial(fileUrl);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleCreateTestimonial = async (uploadUrl) => {
    dispatch(setLoading(true));
    let payload = {
      authorName: state?.authorName,
      projectName: state?.projectName,
      content: state?.content,
      status: state?.status,
      designation: state?.designation,
      image: uploadUrl ? uploadUrl : null

    };
    try {
      const res = await POST(ENDPOINT.CREATE_TESTIMONIAL, payload);
      let resp = res?.response?.data;
      if (resp?.statusCode === 200) {
        navigate("/admin/testimonialManagement");
        dispatch(setLoading(false));
        toast.success(resp?.message || "Testimonial created successfully");
      } else {
        dispatch(setLoading(false));
        toast.error(resp?.message || "Something went wrong");
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleUpdateTestimonial = async (uploadUrl) => {
    dispatch(setLoading(true));

    let payload = {
      id: state?.id,
      authorName: state?.authorName,
      projectName: state?.projectName,
      content: state?.content,
      status: state?.status,
      designation: state?.designation,
      image: uploadUrl ? uploadUrl : state?.edit_Url ? state?.edit_Url :null
      
    };
    try {
      const res = await PUT(ENDPOINT.UPDATE_TESTIMONIAL, payload);
      let resp = res?.response?.data;
      if (resp?.statusCode === 200) {
        dispatch(setLoading(false));
        toast.success(resp?.message || "Project updated successfully");
        navigate("/admin/testimonialManagement");
      } else {
        dispatch(setLoading(false));
        toast.error("Something went wrong");
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      toast.error(error?.message || "Something went wrong");
      navigate("/admin/testimonialManagement");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === ' ' && (event.target.selectionStart === 0 )) {
      event.preventDefault(); // Prevent the whitespace from being entered
    } else if (event.target.name === 'authorName' && !(/^[A-Za-z. ]+$/.test(event.key))) {
      event.preventDefault();
    }
  };

  const handleActionToggle = (data) => {
    setState({...state, status: data})
    setErrors({
      ...errors,
      status: "",
    });
  }
  const fileValidate = (files) => {
    let isValid = { value: false, message: "" };
    const acceptedFiles = ["png", "jpeg", "jpg"];
    const extension = files?.[0]?.name?.split(".").pop();
    if (acceptedFiles?.includes(extension?.toLowerCase())) {
      isValid.value = true;
      isValid.message = "";
    } else {
      isValid.value = false;
      isValid.message = "Only jpg, jpeg, png files are allowed";
      return isValid;
    }
    return isValid;
  };

  const uploadFile = async (acceptedFiles) => {
    let fileUrl = "";
    try {
      if (acceptedFiles) {
        const selectedFile = acceptedFiles;
        const extension = selectedFile?.name?.split(".").pop();
        const filePath = `upload/${selectedFile.name}`;
        const keyName = `${generateUniqueID()}_TestimonialsFile_${selectedFile.name?.replace(
          / /g,
          ""
        )}`;
        const fileObjects = {
          folder: "testimonials",
          key: keyName,
        };
        const resp = await getPresignedUrl(fileObjects, selectedFile);
        if (resp?.signedUrl) {
          await uploadFiles(resp?.signedUrl, selectedFile);
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

  const handleFileSelect = async (url, filename) => {
    const acceptedFiles = base64UrlToFile(url, filename);
    let isValid = fileValidate(acceptedFiles);
    try {
      if (acceptedFiles.length > 0) {
        if (isValid?.value) {
          //  if (await checkImageDimension(acceptedFiles,  240, 268, true)) {
            setErrors({ ...errors, image: '' })
            setState((prv) => ({
              ...prv,
              image: URL.createObjectURL(acceptedFiles?.[0]),
              selectedFile: acceptedFiles?.[0],
            }));
          //  } else setErrors({ ...errors, image: `Error: Please upload an image with the recommended dimensions of  240 x 268.` });
        } else toast.error(isValid?.message || "Something went wrong");
      } else {
        toast.error("File Format is incorrect");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  


  return (
    <div className="ManageTestimonials">
      <Header />
      <CardWrapper title={isEdit ? "Update testimonial " : "Create testimonial"}>
      <Row className="testimonialImage">
          <Col lg="12" >
            <FormGroup>
              <label className="form-control-label imageLabel">
                Select image
                {/* <span className="text-red"> *</span> */}
              </label>
              {state?.image ? (
                <>
                  <div className="preview">
                    <img
                      src={state?.image}
                      alt="ProjectImage"
                      width={"100%"}
                      height={"100%"}
                      className="object-contain"
                    />
                  </div>
                  <Row className="float-right mt-2">
                    <Col>
                      <span
                        className="text-red c-p "
                        onClick={() => {
                          setState((prev) => ({
                            ...prev,
                            image: "",
                            edit_Url:"",
                          }));
                        }}
                      >
                        <i class="fas fa-trash-alt mr-2"></i> Remove
                      </span>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <BannerWrapper
                    handleFile={handleFileSelect}
                    type="image"
                    allowdedExt={[".jpeg", ".jpg", ".png"]}
                    allowCropping={true}
                    minCropBoxHeight={268}
                    minCropBoxWidth={241}
                    classNames={'testimonialFileUpload'}
                    // aspectRatio={16 / 9}
                  />
                  <label
                    className="form-control-label text-red imageLabel"
                  >
                    {errors?.image}
                  </label>
                </>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="authorName">
                Customer name
                <span className="text-red"> *</span>
              </label>
              <Input
                onKeyPress={handleKeyPress}
                className="form-control-alternative"
                id="authorName"
                placeholder="Enter customer name "
                onChange={(e) => handleChange("authorName", e.target.value)}
                value={state?.authorName}
                type="text"
                name="authorName"
              />
              <label
                className="form-control-label text-red"
                htmlFor="authorName"
              >
                {errors.authorName}
              </label>
            </FormGroup>
          </Col>

          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="designation">
                Designation
                <span className="text-red"> *</span>
              </label>
              <Input
                onKeyPress={handleKeyPress}
                className="form-control-alternative"
                id="designation"
                placeholder="Enter designation"
                onChange={(e) =>{ 
                  let regex = /^[a-zA-Z ]*$/;
                  if(!regex?.test(e.target.value)){
                    return
                  }
                  handleChange("designation", e.target.value)}}
                value={state?.designation}
                type="text"
                name="designation"
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
              <label className="form-control-label" htmlFor="projectName">
                Project name
                <span className="text-red"> *</span>
              </label>
              <Input
                onKeyPress={handleKeyPress}
                className="form-control-alternative"
                id="projectName"
                placeholder="Enter project name "
                onChange={(e) => handleChange("projectName", e.target.value)}
                value={state?.projectName}
                type="text"
                name="projectName"
                // disabled={isEdit}
              />
              <label
                className="form-control-label text-red"
                htmlFor="projectName"
              >
                {errors.projectName}
              </label>
            </FormGroup>
          </Col>

          <Col lg="6">
            <FormGroup switch>
              <label className="form-control-label" htmlFor="content">
                Description
                <span className="text-red"> *</span>
              </label>
              <Input
                onKeyPress={handleKeyPress}
                className="form-control-alternative"
                id="content"
                placeholder="Enter description"
                onChange={(e) => handleChange("content", e.target.value)}
                value={state?.content}
                type="textarea"
                name="content"
                // disabled={isEdit}
              />
              <label
                className="form-control-label text-red"
                htmlFor="content"
              >
                {errors.content}
              </label>
            </FormGroup>
          </Col>

        </Row>
        <Row>
        <Col lg='6'>
            <FormGroup>
            <label className="form-control-label" htmlFor="status">
              Status
            </label>
            <div>
            <CustomInput
                checked={state?.status}
                type="switch"
                id="status"
                className="ml-auto mr-1"
                onChange={() => handleActionToggle(!state?.status)}
              />
          </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className="float-right">
        <Col>
            <Button
              color="secondary"
              type="cancel"
              onClick={(e) => {
                navigate("/admin/testimonialManagement");
              }}
            >
              {"Cancel"}
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {isEdit ? "Update" : "Submit"}
            </Button>
          </Col>
        </Row>
      </CardWrapper>
    </div>
  );
};

export default ManageTestimonials;
