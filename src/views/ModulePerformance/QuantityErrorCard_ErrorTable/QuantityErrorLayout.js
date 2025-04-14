import React, { useState } from 'react';
import './QuantityErrorLayout.css';
import QuantityErrorCard_ErrorTable from './QuantityErrorCard_ErrorTable';
import SelectBox from 'components/SelectBox/SelectBox';

const selectData = [
    { id: 1, name: "BOQ Id 1" },
    { id: 2, name: "BOQ Id 2" },
    { id: 3, name: "BOQ Id 3" },
    { id: 4, name: "BOQ Id 4" },
    { id: 5, name: "BOQ Id 5" },
]

const QuantityErrorLayout = () => {
      const [selectedTable, setSelectedTable] = useState('');
    return (
        <div>
             <SelectBox
                tag={"BOQ Id"}
                valueKey={"id"}
                labelKey={"name"}
                masterData={selectData}
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable}
            />
             <div className="quantity-error-layout">
            <div className="quantity-error-card">
                <QuantityErrorCard_ErrorTable />
            </div>
        </div>
        </div>
       
    );
};

export default QuantityErrorLayout;

