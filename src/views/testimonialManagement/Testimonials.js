import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { CustomTable } from "components";
import GenericBtn from "components/Buttons/GenericBtn";
import Header from "components/Headers/Header";
import ModalWrapper from "components/Modal/ModalWrapper";
import { ENDPOINT } from "config/api-endpoints";
import { DELETE } from "services/axios-request-handlers";
import { GET } from "services/axios-request-handlers";
import { convertPayloadToQueryString } from "utils/commonFunctions";
import { setLoading } from "redux/reducers/GlobalReducer";
import ReactTooltip from "react-tooltip";
import { testimonialConfirmationMsg } from "constants/appConstatnts";
import { convertDateFormat } from "utils/commonFunctions";
import "./style.scss";

const Testimonials = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [testimonialList, setTestimonialList] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const columns = [
    {
      dataField: "author_name",
      text: "Customer Name",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "171px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <div>
            <span data-tip={cell?.length > 20 ? cell?.toString() : ""}>
              {cell?.length > 20
                ? cell?.slice(0, 20)?.toString() + "..."
                : cell?.toString()}
            </span>

            {cell?.length > 20 && (
              <ReactTooltip id="passwordMsg" place="bottom" content={cell} />
            )}
          </div>
        );
      },
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "171px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <div>
            <span data-tip={cell?.length > 30 ? cell?.toString() : ""}>
              {cell ? cell?.length > 30
                ? cell?.slice(0, 30)?.toString() + "..."
                : cell?.toString() : '-'}
            </span>

            {cell?.length > 30 && (
              <ReactTooltip
                place="bottom"
                className="toolTipWrap"
                textColor="#fff"
                backgroundColor="#000000"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "project_name",
      text: "Project Name",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "171px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <div>
            <span data-tip={cell?.length > 30 ? cell?.toString() : ""}>
              {cell?.length > 30
                ? cell?.slice(0, 30)?.toString() + "..."
                : cell?.toString()}
            </span>

            {cell?.length > 30 && (
              <ReactTooltip
                place="bottom"
                className="toolTipWrap"
                textColor="#fff"
                backgroundColor="#000000"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "content",
      text: "Description",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "171px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <div>
            <span data-tip={cell?.length > 30 ? cell?.toString() : ""}>
              {cell?.length > 30
                ? cell?.slice(0, 30)?.toString() + "..."
                : cell?.toString()}
            </span>

            {cell?.length > 30 && (
              <ReactTooltip
                place="bottom"
                className="toolTipWrap"
                textColor="#fff"
                backgroundColor="#000000"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "50px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <>
            {row?.status ? (
              <Badge color="success">Active</Badge>
            ) : (
              <Badge color="danger">Inactive</Badge>
            )}
          </>
        );
      },
    },
    {
      dataField: "created_at",
      text: "Created at",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "250px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return <span>{convertDateFormat(row?.created_at)}</span>;
      },
    },
    {
      dataField: "updated_at",
      text: "Updated at",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "250px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return <span>{row?.updated_at ? convertDateFormat(row?.updated_at) : '-' }</span>;
      },
    },
    {
      text: "Action",
      sort: true,
      style: (colum, colIndex) => {
        return { minWidth: "171px", verticalAlign: "middle" };
      },

      formatter: (cell, row) => {
        return (
          <span className="c-p editUser">
            <GenericBtn
              handleClick={() =>
                navigate(`/admin/testimonialManagement/edit/${row.id}`)
              }
              icon={<i className="fas fa-pen"></i>}
              color="primary"
              operation="update"
              size="sm"
            />
            <GenericBtn
              handleClick={() => {
                setModalState(true);
                setSelectedTestimonial(row);
              }}
              icon={<i class="fas fa-trash-alt"></i>}
              color="danger"
              operation="delete"
              size="sm"
            />
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getTestimonialList();
  }, [page, search]);

  const getTestimonialList = async (customPage) => {
    dispatch(setLoading(true));
    let payload = {
      page: customPage ? customPage : page,
      limit: sizePerPage,
      search: search || "",
    };
    let queryString = convertPayloadToQueryString(payload);

    try {
      let url = `${ENDPOINT.GET_TESTIMONIAL_LIST}${queryString}`;
      const res = await GET(url);
      let resp = res?.response?.data;
      if (resp?.statusCode === 200) {
        setTotalRecords(resp?.data?.count || 0);
        setTestimonialList(resp?.data?.rows || []);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const handleDeleteTestimonial = async () => {
    dispatch(setLoading(true));
    let payload = {
      id: selectedTestimonial?.id,
    };
    try {
      const res = await DELETE(ENDPOINT.DELETE_TESTIMONIAL, payload);
      let resp = res?.response?.data;
      if (resp?.statusCode === 200) {
        dispatch(setLoading(false));
        toast.success(resp?.message || "Testimonial deleted successfully");
        getTestimonialList();
      } else {
        dispatch(setLoading(false));
        toast.error(resp?.message || "Something went wrong");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error?.message || "Something went wrong");
    }
    toggleModal();
  };

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    switch (type) {
      case "pagination":
        setPage(page);
        setSizePerPage(sizePerPage);
        break;
      default:
        break;
    }
  };

  const searchByString = (data) => {
    setSearch(data);
    setPage(1);
  }

  return (
    <div className="iconProjectWrapper">
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Testimonials</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        navigate("/admin/testimonialManagement/create");
                      }}
                    >
                      Create testimonial
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CustomTable
                columnData={columns}
                dataTable={testimonialList}
                remote={true}
                keyField={"id"}
                totalRecords={totalRecords}
                paginate={onTableChange}
                page={page}
                size={sizePerPage}
                showSearchInput
                setSearchString={searchByString}
                searchPlaceholder={'Search by customer name'}
              />
            </Card>
          </Col>
        </Row>
      </Container>
      <ModalWrapper
        toggleModal={toggleModal}
        modalState={modalState}
        title={"Delete confirmation"}
        submitBtn="Yes"
        cancelBtn="No"
        handleSubmit={handleDeleteTestimonial}
        handleCancel={toggleModal}
      >
        <Row>
          <Col lg="12">
            <span>{testimonialConfirmationMsg}</span>
          </Col>
        </Row>
      </ModalWrapper>
    </div>
  );
};

export default Testimonials;
