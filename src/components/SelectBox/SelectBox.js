import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SelectBox.css'; // Your custom styles here


const SelectBox = ({
    masterData,
    selectedTable,
    setSelectedTable ,
    tag,
    valueKey,
    labelKey ,
    onSubmit,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };
 

    console.log("masterData", masterData,  valueKey, labelKey );


    return (
        <div>
            <form
                className="form-inline justify-content-between align-items-center custom-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group mb-2">
                    <label htmlFor="masterSelect" className="mr-2">
                        {tag}
                    </label>

                    <select
                        id="masterSelect"
                        className="form-control"
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                    >
                        {masterData.map((item, index) => (
                            <option key={index} value={item[valueKey]}>
                                {item[labelKey]}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn custom-submit-btn mb-2">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SelectBox;

// const SelectBox = ({ masterData , selectedTable, setSelectedTable , tag}) => {
  
//     return (
//         <div className="">
//             <form className="form-inline justify-content-between align-items-center custom-form">
//                 <div className="form-group mb-2">
//                     <label htmlFor="masterTable" className="mr-2">
//                         {tag}
//                     </label>

//                     <select
//                         id="masterTable"
//                         className="form-control"
//                         value={selectedTable}
//                         onChange={(e) => setSelectedTable(e.target.value)}
//                     >
//                         {masterData.map((item, index) => (
//                             <option key={index} value={item.table_id}>
//                                 {item.table_name}
//                             </option>
//                         ))}
//                     </select>

//                 </div>
//                 <button type="submit" className="btn custom-submit-btn mb-2">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SelectBox;
