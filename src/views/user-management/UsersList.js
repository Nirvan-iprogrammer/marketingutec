import { CustomTable } from "components";
import GenericBtn from "components/Buttons/GenericBtn";
import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";


import ModalWrapper from "components/Modal/ModalWrapper";
import { POST } from "services/axios-request-handlers";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/reducers/GlobalReducer";
import { convertPayloadToQueryString } from "utils/commonFunctions";
import { ENDPOINT } from "config/api-endpoints";
import { GET } from "services/axios-request-handlers";
import { DELETE } from "services/axios-request-handlers";
import ReactTooltip from "react-tooltip";
import "./styles.scss";
import { convertDateFormat } from "utils/commonFunctions";
import { getImagePath } from "utils/commonFunctions";
import * as XLSX from "xlsx";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [s3BasePath, setS3BasePath] = useState("");
  const columns = [
    // {
    //   dataField: "user_id",
    //   text: "Sr. no",
    //   sort: true,
    //   // headerStyle: { width: "50px" },
    //   style: (colum, colIndex) => {
    //     return { minWidth: "50px", verticalAlign: "middle" };
    //   },
    //   formatter: (cell, row, rowIndex) => {
    //     return <div>{rowIndex + 1}</div>;
    //   },
    // },
    {
      dataField: "profile_pic",
      text: "Profile picture",
      sort: true,
      // headerStyle: { width: "100px" },
      style: (colum, colIndex) => {
        return {
          minWidth: "100px",
          verticalAlign: "middle",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
      },
      formatter: (cell, row) => {
        return (
          <div className="previewProfileImage">
            {row?.profile_pic ? (
              <img
                src={getImagePath(row?.profile_pic)}
                alt={row.altName}
                width={"100%"}
                height={"100%"}
              />
            ) : (
              <i className="fas fa-user-circle avatar-placeholder"></i>
            )}
          </div>
        );
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      // headerStyle: { width: "260px" },
      style: (colum, colIndex) => {
        return { minWidth: "250px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <div>
            <span data-tip={cell?.length > 15 ? cell?.toString() : ""}>
              {cell?.length > 15
                ? cell?.slice(0, 15)?.toString() + "..."
                : cell?.toString()}
            </span>

            {cell?.length > 15 && (
              <ReactTooltip
                place="bottom"
                className="toolTipWrap"
                textColor="#fff"
                backgroundColor="#000000"
              // effect="float"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      // headerStyle: { width: "250px" },
      style: (colum, colIndex) => {
        return {
          minWidth: "171px",
          maxWidth: "300px",
          verticalAlign: "middle",
        };
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
              // effect="float"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "role_id",
      text: "Role",
      sort: true,
      // headerStyle: { width: "250px" },
      style: (colum, colIndex) => {
        return { minWidth: "250px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <label className="catitalizeFirstLetter">
            {row?.role
              ? row?.role?.role_name
                ? row?.role?.role_name
                : "-"
              : "-"}
          </label>
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
        return (
          <span>
            {row?.updated_at ? convertDateFormat(row?.created_at) : "-"}
          </span>
        );
      },
    },
    {
      dataField: "is_active",
      text: "Status",
      sort: true,
      // headerStyle: { width: "171px" },
      style: (colum, colIndex) => {
        return { minWidth: "50px", verticalAlign: "middle" };
      },
      formatter: (cell, row) => {
        return (
          <>
            {row?.is_active ? (
              <Badge color="success">Active</Badge>
            ) : (
              <Badge color="danger">Inactive</Badge>
            )}
          </>
        );
      },
    },
    {
      text: "Action",
      sort: true,
      style: (colum, colIndex) => {
        return { verticalAlign: "middle", textAlign: "center" };
      },
      formatter: (cell, row) => {
        return (
          <span className="c-p editUser">
            <GenericBtn
              handleClick={() => navigate(`/admin/users/edit/${row.user_id}`)}
              icon={<i className="fas fa-pen"></i>}
              color="primary"
              operation="update"
              size="sm"
            />
            {/* <GenericBtn
              handleClick={() => {
                setModalState(true);
                setSelectedUser(row);
              }}
              icon={<i class="fas fa-trash-alt"></i>}
              color="danger"
              operation="delete"
              size="sm"
            /> */}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getUserList();
  }, [page, search]);

  const getUserList = async () => {
    dispatch(setLoading(true));
    let payload = {
      page,
      limit: sizePerPage,
      search: search,
    };
    if (!search) delete payload.search;
    let queryString = convertPayloadToQueryString(payload);

    try {
      let url = `${ENDPOINT.GET_USER_LIST}${queryString}`;
      const res = await GET(url);
      let resp = res?.response?.data;
      if (resp?.statusCode === 200) {
        let usersList = resp?.data?.rows;
        setTotalRecords(resp?.data?.count || 0);
        setUsersList(usersList || []);
        setS3BasePath(resp?.data?.s3BasePath);
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

  const handleDeleteBanner = async () => {
    let payload = {
      id: selectedUser?.id,
    };
    try {
      const res = await DELETE(ENDPOINT.DELETE_USER, payload);
      let resp = res?.response?.data;
      if (resp?.statusCode === 200) {
        toast.success(resp?.message || "Banner deleted successfully");
        await getUserList();
      } else {
        toast.error(resp?.message || "Something went wrong");
      }
    } catch (error) {
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

  const downloadUsers = async () => {
    dispatch(setLoading(true));
    try {
      const res = await GET(ENDPOINT.DOWNLOAD_USER)
      if (res?.response?.data && res?.status === 200) {
        dispatch(setLoading(false));
        downloadExcel(res?.response?.data?.data?.data);
      } else {
        dispatch(setLoading(false));
        toast.error("Something went wrong");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error?.message || "Something went wrong");
    }
  }

  const downloadExcel = (jsonData) => {    
    // Step 1: Convert JSON to Worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Step 2: Create a Workbook and Append the Worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Step 3: Write the Workbook to a Blob
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Step 4: Create Blob and Trigger Download
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users-data.xlsx";
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  };

  const handleDeleteUser = () => {
    try {
      const res = POST("delete banner api here", selectedUser);
      if (res?.data && res?.status === 200) {
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.message || "Something went wrong");
    }
    toggleModal();
  };
  return (
    <div className="banner">
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Users</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        navigate("/admin/users/create");
                      }}
                      size="md"
                    >
                      Create user
                    </Button>

                    <Button
                      color="primary"
                      onClick={(e) => {
                        navigate("/admin/users/upload");
                      }}
                      size="md"
                    >
                      Upload users
                    </Button>

                    <Button
                      color="primary"
                      onClick={downloadUsers}
                      size="md"
                    >
                      Download users 
                    </Button>

                   

                  </div>
                </Row>
              </CardHeader>
              <CustomTable
                columnData={columns}
                dataTable={usersList}
                remote={true}
                keyField={"id"}
                totalRecords={totalRecords}
                paginate={onTableChange}
                page={page}
                size={sizePerPage}
                showSearchInput
                searchPlaceholder="Search by name or email"
                setSearchString={(data) => setSearch(data)}
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
        handleSubmit={() => {
          handleDeleteUser();
        }}
        handleCancel={toggleModal}
      >
        <Row>
          <Col lg="12">
            <span>Are you sure you want to delete this user?</span>
          </Col>
        </Row>
      </ModalWrapper>
    </div>
  );
};

export default UsersList;
