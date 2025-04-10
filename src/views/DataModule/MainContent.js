import { ENDPOINT } from 'config/api-endpoints';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GET } from 'services/axios-request-handlers';
import SelectBox from './SelectBox';
import masterJson from "../../assets/DummuApi/master.json";
import masterTableData from "../../assets/DummuApi/masterTableData.json";
import { CustomTable } from 'components/Table/CustomTable';
import { Form } from 'react-router-dom';
import FormSection from './FormSection';
import { Button } from 'reactstrap';
import './MainContent.css';

const MainContent = () => {
    const [masterData, setMasterData] = useState([]);
    const [masterDataKey, setMasterDataKey] = useState([]);
    const [selectedTable, setSelectedTable] = React.useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [searchString, setSearchString] = useState("");
    const [showForm, setShowForm] = useState(false);



    const handleEditTable = () => {
        // Logic to handle edit table action
        console.log("Edit table clicked");
        setShowForm(showForm => !showForm);
    }

    const columnData = [
        {
            dataField: "actions",
            text: "Actions",
            isDummyField: true,
            formatter: (cell, row) => (
                <div className="d-flex gap-2">
                    <button
                        onClick={() => handleDelete(row.product_code)}
                        className="icon-button"
                    >
                        <img src={require("../../assets/img/icons/common/Icon (3).png")} alt="delete" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
            ),
        },
        {
            dataField: "product_code",
            text: "Product Code",
            sort: true,
        },
        {
            dataField: "product",
            text: "Product Name",
            sort: true,
        },
        {
            dataField: "product_group_code",
            text: "Product Group",
            sort: true,
        },
        {
            dataField: "record_create_time",
            text: "Created At",
            formatter: (cell) => new Date(cell).toLocaleDateString(),
        },
    ];

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure to delete?");
        if (confirm) {
            setMasterData((prev) => prev.filter((item) => item.product_code !== id));
        }
    };

    const getMastTableData = async () => {
        try {
            if (masterTableData.status === 200) {
                setMasterData(masterTableData.data.result);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };

    const getMastTableKey = async () => {
        try {
            if (masterJson.status === 200) {
                setMasterDataKey(masterJson.data.result);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        getMastTableKey();
        getMastTableData();
    }, []);

  
  const lastIndexPage = page * size;
  const firstIndexPage = lastIndexPage - size;
  const displayItems = masterData.slice(firstIndexPage, lastIndexPage);



    return (
        <div className="main-content-table">
            <SelectBox masterData={masterDataKey} selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
            <div className="header-section-table">
                <div className="header-line">
                    <span className="header-text">
                        Master used in Modules: PR, CX, HS, LNBA
                    </span>
                </div>
                <div className="header-line header-line-between">
                    <span className="header-text">Last update: 28-04-2024 00:00</span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                </div>
            </div>
            

            <div className="table-container">
                <CustomTable
                    columnData={columnData}
                    dataTable={displayItems}
                    page={page}
                    size={size}
                    totalRecords={masterData.length}
                    paginate={(type, { page, sizePerPage }) => {
                        console.log("Paginate called:", type, page, sizePerPage);
                        setPage(page);
                        setSize(sizePerPage);
                      }}
                    keyField="product_code"
                    showPagination={true}
                    showSearchInput={false}
                    searchPlaceholder="Search products..."
                    setSearchString={setSearchString}
                    searchString={searchString}
                />
            </div>

            {showForm && (
                <div className="add-row">
                    <Button className="add-button" onClick={() => console.log("Add new row")}>+</Button>
                    <span>Add new row</span>
                </div>
            )}


            <div className="actions-section">
                <div className="action-buttons">
                    <button className="action-button-table" onClick={handleEditTable}>
                        <img src={require("../../assets/img/icons/common/Group.png")} alt="edit" style={{ width: '24px', height: '24px' }} />
                        Edit data
                    </button>
                    <button className="action-button-table">
                        <img src={require("../../assets/img/icons/common/octicon_upload-16.png")} alt="upload" style={{ width: '24px', height: '24px' }} />
                        Upload file
                    </button>
                </div>
                <button className="action-button-table">
                    <img src={require("../../assets/img/icons/common/download.png")} alt="download" style={{ width: '24px', height: '24px' }} />
                    Download file
                </button>
            </div>

            {showForm && (
                <div className="form-section">
                    <FormSection />
                </div>
            )}
        </div>
    );
};

export default MainContent;