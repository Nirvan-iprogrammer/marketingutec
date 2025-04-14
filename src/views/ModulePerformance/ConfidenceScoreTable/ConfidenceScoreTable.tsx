import React from 'react';
import { Table } from 'reactstrap';
import './ConfidenceScoreTable.css';

interface ConfidenceData {
  boqId: string;
  avgCs: string;
  category: string;
}

const defaultData: ConfidenceData[] = [
  { boqId: 'BOQ001', avgCs: '78%', category: 'Moderate' },
  { boqId: 'BOQ002', avgCs: '94%', category: 'High' },
  { boqId: 'BOQ003', avgCs: '68%', category: 'Low' },
];

interface ConfidenceScoreTableProps {
  data?: ConfidenceData[];
}

const ConfidenceScoreTable: React.FC<ConfidenceScoreTableProps> = ({ data = defaultData }) => {
  return (
    <div className="confidence-score-container">
      <h2 className="confidence-score-title">Confidence Score</h2>
      <Table responsive bordered className="confidence-score-table">
        <thead>
          <tr>
            <th>
              <div className="header-content">
                <span>BOQ ID</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z_zfYce6itJWR3fX/arrow-do.png" alt="sort" className="sort-icon" />
              </div>
            </th>
            <th>
              <div className="header-content">
                <span>AVG (CS)</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z_zfYce6itJWR3fX/arrow-do-2.png" alt="sort" className="sort-icon" />
              </div>
            </th>
            <th>
              <div className="header-content">
                <span>Category</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z_zfYce6itJWR3fX/arrow-do-3.png" alt="sort" className="sort-icon" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.boqId}</td>
              <td>{item.avgCs}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ConfidenceScoreTable;

