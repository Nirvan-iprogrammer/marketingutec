import { ENDPOINT } from 'config/api-endpoints';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GET } from 'services/axios-request-handlers';
import SelectBox from './SelectBox';
import masterJson from "../../assets/DummuApi/master.json";
import masterTableData from "../../assets/DummuApi/masterTableData.json";
import { CustomTable } from 'components/Table/CustomTable';


const MainContent = () => {
    console.log("masterJson", masterJson);
    const [masterData, setMasterData] = useState([]);
    const [masterDataKey, setMasterDataKey] = useState([]);
    const [selectedTable, setSelectedTable] = React.useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [searchString, setSearchString] = useState("");
    console.log('Selected table:', selectedTable);


    const columnData = [
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

    // export const getPresignedUrl = async (payload, file) => {
    //     try {
    //       const resp = await POST(ENDPOINT.GET_PRESIGNED_URL, payload);
    //       let res = resp?.response?.data;
    //       if (res?.data && res?.statusCode === 200) {
    //         const response = res?.data?.data;
    //         return response;
    //       } else {
    //         toast.error("Something went wrong");
    //       }
    //     } catch (error) {
    //       console.log(error?.response);
    //       toast.error(error?.message || "Something went wrong");
    //     }
    //   };


    const getMastTableData = async () => {
        try {
            // let response = await GET(`https://bamfkl31ge.execute-api.ap-south-1.amazonaws.com/production//v1/masters/view/?master_table_id=${selectedTable}`);
            // console.log("resTableData", response);

            console.log("responseMasterTable", masterTableData.data.result, masterTableData.status);
            if (masterTableData.status === 200) { setMasterData(masterTableData.data.result) }


        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    };




    const getMastTableKey = async () => {
        try {
            //   let response = await GET(ENDPOINT.MASTER_TABLE);
            console.log("response", masterJson.data.result, masterJson.status);
            if (masterJson.status === 200) { setMasterDataKey(masterJson.data.result) }

        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        getMastTableKey();
        getMastTableData();
    }, [])

    return (
        <div style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            minHeight: '100vh',
            background: 'inherit'
        }}>
            <SelectBox masterData={masterDataKey} selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
            {/* Header Info */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '4px 0',
                    width: '100%'
                }}>
                    <span style={{
                        color: '#344054',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        fontFamily: 'Inter'
                    }}>
                        Master used in Modules: PR, CX, HS, LNBA
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '4px 0',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <span style={{
                        color: '#344054',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        fontFamily: 'Inter'
                    }}>
                        Last update: : 28-04-2024 00:00
                    </span>

                    <input
                        type="text"
                        placeholder="Search"
                        style={{
                            width: '486px',
                            border: '1px solid #D0D5DD',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            fontSize: '16px',
                            color: '#667085',
                            fontFamily: 'Inter'
                        }}
                    />
                </div>
            </div>

            <CustomTable
                columnData={columnData}
                dataTable={masterData}
                page={page}
                size={size}
                totalRecords={masterData.length}
                paginate={({ page, sizePerPage }) => {
                    setPage(page);
                    setSize(sizePerPage);
                }}
                keyField="product_code"
                showPagination={true}
                showSearchInput={true}
                searchPlaceholder="Search products..."
                setSearchString={setSearchString}
                searchString={searchString}
            />



            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '20px',
                padding: '0 24px'
            }}>
                <div style={{ display: 'flex', gap: '40px' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        color: '#667085',
                        fontSize: '16px',
                        fontWeight: 500,
                        fontFamily: 'Inter',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        <img src={require("../../assets/img/icons/common/Group.png")} alt="edit" style={{ width: '24px', height: '24px' }} />
                        Edit data
                    </button>

                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        color: '#667085',
                        fontSize: '16px',
                        fontWeight: 500,
                        fontFamily: 'Inter',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        <img src={require("../../assets/img/icons/common/octicon_upload-16.png")} alt="upload" style={{ width: '24px', height: '24px' }} />
                        Upload file
                    </button>
                </div>

                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    color: '#667085',
                    fontSize: '16px',
                    fontWeight: 500,
                    fontFamily: 'Inter',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    <img src={require("../../assets/img/icons/common/download.png")} alt="download" style={{ width: '24px', height: '24px' }} />
                    Download file
                </button>
            </div>
        </div>
    );
};

export default MainContent;


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table, Button, Form } from 'react-bootstrap';

// const MainContent = () => {
//   const tableData = [
//     {
//       recordId: 'RC00000001',
//       materialCode: 'BP8D20FWBITPRO20',
//       lob: 'BPD',
//       segmentCode: 'SEG003',
//       segment: 'BPD - Waterproofing',
//       categoryCode: 'CAT036',
//       category: 'Waterproofing',
//       productGroupCode: 'PRDGRP006',
//       productGroup: 'BITUPRO',
//       productCode: 'PRD00005',
//       product: 'BITUPRO',
//       brandProductCode: 'BPROD00012',
//       brandProduct: 'BITUPRO',
//       skuCode: 'SKU000001',
//       sku: 'UKTRATECH BITUPRO 20 L',
//       uom: 'DR',
//       uomDes: 'Trommel',
//       bgp: 'BPD',
//       sapBgp: '....',
//       category2: 'Waterproofing',
//       category2Code: 'CAT036',
//       lob2: 'BPD',
//       lobCode: 'LOB00003'
//     },
//   ];

//   return (
//     <div className="container-fluid p-4">
//       {/* Header Info */}
//       <div className="mb-3">
//         <p className="text-secondary fw-medium">Master used in Modules: PR, CX, HS, LNBA</p>
//         <div className="d-flex justify-content-between align-items-center">
//           <p className="text-secondary fw-medium">Last update: 28-04-2024 00:00</p>
//           <Form.Control type="text" placeholder="Search" className="w-50" />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               {Object.keys(tableData[0]).map((key) => (
//                 <th key={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((value, i) => (
//                   <td key={i}>{value}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Action Buttons */}
//       <div className="d-flex justify-content-between mt-3">
//         <div className="d-flex gap-3">
//           <Button variant="link" className="d-flex align-items-center gap-2 text-secondary">
//             <img src="https://dashboard.codeparrot.ai/api/image/Z-0smuGYgKEKiATf/akar-ico.png" alt="edit" width="24" />
//             Edit data
//           </Button>

//           <Button variant="link" className="d-flex align-items-center gap-2 text-secondary">
//             <img src="https://dashboard.codeparrot.ai/api/image/Z-0smuGYgKEKiATf/octicon.png" alt="upload" width="24" />
//             Upload file
//           </Button>
//         </div>

//         <Button variant="link" className="d-flex align-items-center gap-2 text-secondary">
//           <img src="https://dashboard.codeparrot.ai/api/image/Z-0smuGYgKEKiATf/download.png" alt="download" width="24" />
//           Download file
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MainContent;
// // import React from 'react';
// // import { Table, Button, Form } from 'react-bootstrap';

// // const MainContent = () => {
// //   const tableData = [
// //     {
// //       recordId: 'RC00000001',
// //       materialCode: 'BP8D20FWBITPRO20',
// //       lob: 'BPD',
// //       segmentCode: 'SEG003',
// //       segment: 'BPD - Waterproofing',
// //       categoryCode: 'CAT036',
// //       category: 'Waterproofing',
// //       productGroupCode: 'PRDGRP006',
// //       productGroup: 'BITUPRO',
// //       productCode: 'PRD00005',
// //       product: 'BITUPRO',
// //       brandProductCode: 'BPROD00012',
// //       brandProduct: 'BITUPRO',
// //       skuCode: 'SKU000001',
// //       sku: 'UKTRATECH BITUPRO 20 L',
// //       uom: 'DR',
// //       uomDes: 'Trommel',
// //       bgp: 'BPD',
// //       sapBgp: '....',
// //       category2: 'Waterproofing',
// //       category2Code: 'CAT036',
// //       lob2: 'BPD',
// //       lobCode: 'LOB00003'
// //     },
// //     // Add more data rows as needed
// //   ];

// //   return (
// //     <div style={{
// //       padding: '32px',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       gap: '10px',
// //       width: '100%',
// //       minHeight: '100vh',
// //       background: 'inherit'
// //     }}>
// //       {/* Header Info */}
// //       <div style={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         gap: '12px',
// //         width: '100%'
// //       }}>
// //         <div style={{
// //           display: 'flex',
// //           flexDirection: 'row',
// //           alignItems: 'center',
// //           padding: '4px 0',
// //           width: '100%'
// //         }}>
// //           <span style={{
// //             color: '#344054',
// //             fontSize: '14px',
// //             fontWeight: 500,
// //             lineHeight: '20px',
// //             fontFamily: 'Inter'
// //           }}>
// //             Master used in Modules: PR, CX, HS, LNBA
// //           </span>
// //         </div>

// //         <div style={{
// //           display: 'flex',
// //           flexDirection: 'row',
// //           alignItems: 'center',
// //           padding: '4px 0',
// //           width: '100%',
// //           justifyContent: 'space-between'
// //         }}>
// //           <span style={{
// //             color: '#344054',
// //             fontSize: '14px',
// //             fontWeight: 500,
// //             lineHeight: '20px',
// //             fontFamily: 'Inter'
// //           }}>
// //             Last update: : 28-04-2024 00:00
// //           </span>

// //           <Form.Control 
// //             type="text"
// //             placeholder="Search"
// //             style={{
// //               width: '486px',
// //               border: '1px solid #D0D5DD',
// //               borderRadius: '8px',
// //               padding: '10px 14px',
// //               fontSize: '16px',
// //               color: '#667085',
// //               fontFamily: 'Inter'
// //             }}
// //           />
// //         </div>
// //       </div>

// //       {/* Table Section */}
// //       <div style={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         width: '100%',
// //         marginTop: '20px'
// //       }}>
// //         <Table striped bordered hover responsive>
// //           <thead>
// //             <tr>
// //               <th>Record ID</th>
// //               <th>Material Code</th>
// //               <th>LOB</th>
// //               <th>Segment Code</th>
// //               <th>Segment</th>
// //               <th>Category Code</th>
// //               <th>Category</th>
// //               <th>Product Group Code</th>
// //               <th>Product Group</th>
// //               <th>Product Code</th>
// //               <th>Product</th>
// //               <th>Brand Product Code</th>
// //               <th>Brand Product</th>
// //               <th>SKU Code</th>
// //               <th>SKU</th>
// //               <th>UOM</th>
// //               <th>UOM Des</th>
// //               <th>BGP</th>
// //               <th>SAP BGP</th>
// //               <th>Category 2</th>
// //               <th>Category 2 Code</th>
// //               <th>LOB 2</th>
// //               <th>LOB Code</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {tableData.map((row, index) => (
// //               <tr key={index}>
// //                 <td>{row.recordId}</td>
// //                 <td>{row.materialCode}</td>
// //                 <td>{row.lob}</td>
// //                 <td>{row.segmentCode}</td>
// //                 <td>{row.segment}</td>
// //                 <td>{row.categoryCode}</td>
// //                 <td>{row.category}</td>
// //                 <td>{row.productGroupCode}</td>
// //                 <td>{row.productGroup}</td>
// //                 <td>{row.productCode}</td>
// //                 <td>{row.product}</td>
// //                 <td>{row.brandProductCode}</td>
// //                 <td>{row.brandProduct}</td>
// //                 <td>{row.skuCode}</td>
// //                 <td>{row.sku}</td>
// //                 <td>{row.uom}</td>
// //                 <td>{row.uomDes}</td>
// //                 <td>{row.bgp}</td>
// //                 <td>{row.sapBgp}</td>
// //                 <td>{row.category2}</td>
// //                 <td>{row.category2Code}</td>
// //                 <td>{row.lob2}</td>
// //                 <td>{row.lobCode}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       </div>

// //       {/* Action Buttons */}
// //       <div style={{
// //         display: 'flex',
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         marginTop: '20px',
// //         padding: '0 24px'
// //       }}>
// //         <div style={{display: 'flex', gap: '40px'}}>
// //           <Button variant="link" style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '8px',
// //             padding: '8px 12px',
// //             color: '#667085',
// //             fontSize: '16px',
// //             fontWeight: 500,
// //             fontFamily: 'Inter'
// //           }}>
// //             <img src="https://dashboard.codeparrot.ai/api/image/Z-0smuGYgKEKiATf/akar-ico.png" alt="edit" style={{width: '24px', height: '24px'}} />
// //             Edit data
// //           </Button>

// //           <Button variant="link" style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '8px',
// //             padding: '8px 12px',
// //             color: '#667085',
// //             fontSize: '16px',
// //             fontWeight: 500,
// //             fontFamily: 'Inter'
// //           }}>
// //             <img src="https://dashboard.codeparrot.ai/api/image/Z-0smuGYgKEKiATf/octicon.png" alt="upload" style={{width: '24px', height: '24px'}} />
// //             Upload file
// //           </Button>
// //         </div>

// //         <Button variant="link" style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           gap: '8px',
// //           padding: '8px 12px',
// //           color: '#667085',
// //           fontSize: '16px',
// //           fontWeight: 500,
// //           fontFamily: 'Inter'
// //         }}>
// //           <img src="https://dashboard.codeparrot.ai/api/image/Z-0smuGYgKEKiATf/download.png" alt="download" style={{width: '24px', height: '24px'}} />
// //           Download file
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainContent;