import React from 'react';
import { Table, Card } from 'reactstrap';
import './QuantityErrorCard_ErrorTable.css';
import '../../../assets/img/icons/common/ArrowDown.png'


const QuantityErrorCard_ErrorTable = () => {
    // Sample data for the table
    const tableData = [
        { sector: '...', subSector: '...', stage: '...', subStage: '...', error: '...', unit: '...', errorPercent: '...' },
        { sector: '...', subSector: '...', stage: '...', subStage: '...', error: '...', unit: '...', errorPercent: '...' },
        { sector: '...', subSector: '...', stage: '...', subStage: '...', error: '...', unit: '...', errorPercent: '...' },
        { sector: '...', subSector: '...', stage: '...', subStage: '...', error: '...', unit: '...', errorPercent: '...' }
    ];

    return (
        <div className="quantity-error-container">
            <Card body className="error-card">
                <div className="error-header">
                    <h2>Quantity Error</h2>
                </div>
                
                <div className="table-container">
                    <Table responsive className="error-table">
                        <thead>
                            <tr>
                                <th>
                                    <div className="header-content">
                                        <span>Sector</span>
                                        <img src={require('../../../assets/img/icons/common/ArrowDown.png')} alt="sort" />
                                    </div>
                                </th>
                                <th>
                                    <div className="header-content">
                                        <span>Sub-sector</span>
                                        <img src={require('../../../assets/img/icons/common/ArrowDown.png')} alt="sort" />
                                    </div>
                                </th>
                                <th>
                                    <div className="header-content">
                                        <span>Stage</span>
                                        <img src={require('../../../assets/img/icons/common/ArrowDown.png')} alt="sort" />
                                    </div>
                                </th>
                                <th>
                                    <div className="header-content">
                                        <span>Sub-stage</span>
                                        <img src={require('../../../assets/img/icons/common/ArrowDown.png')} alt="sort" />
                                    </div>
                                </th>
                                <th>
                                    <div className="header-content">
                                        <span>Error</span>
                                        <img src={require('../../../assets/img/icons/common/ArrowDown.png')} alt="sort" />
                                    </div>
                                </th>
                                <th>
                                    <div className="header-content">
                                        <span>Unit</span>
                                        <img src={require('../../../assets/img/icons/common/ArrowDown.png')} alt="sort" />
                                    </div>
                                </th>
                                <th>
                                    <div className="header-content">
                                        <span>Error (%)</span>
                                        <img src={require('../../../assets/img/icons/common/ArrowDown.png')} alt="sort" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.sector}</td>
                                    <td>{row.subSector}</td>
                                    <td>{row.stage}</td>
                                    <td>{row.subStage}</td>
                                    <td>{row.error}</td>
                                    <td>{row.unit}</td>
                                    <td>{row.errorPercent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div className="accuracy-info">
                    <p>Product Accuracy : XX%</p>
                </div>
            </Card>
        </div>
    );
};

export default QuantityErrorCard_ErrorTable;

