import clsx from "clsx";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { Col, Input, Row } from "reactstrap";

const CustomTable = ({
  columnData,
  dataTable,
  page,
  size,
  showPagination,
  paginate,
  totalRecords,
  selectRow,
  maxHeight,
  rowEvent,
  tableLoading,
  dataSize,
  showPageSize,
  keyField,
  classNames,
  tableWrapperClassName,
  customRowEvent,
  expandRow,
  showSearchInput,
  searchPlaceholder,
  setSearchString,
  searchString,
  cellEditAction,
  defaultSorted,
  remote,
  keyId,
  search,
  addOns
}) => {
  const __rowEvents = {
    onClick: (e, row, rowIndex) => {
      rowEvent && rowEvent(e, row, rowIndex);
    },
  };

  const [debounceSearch, setDebounceSearch] = useState("");

  useEffect(() => {
    search ? setDebounceSearch(search) : setDebounceSearch("");
  }, [search]);
  

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchString && setSearchString(debounceSearch);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debounceSearch]);

  const handleDebounceSearch = (e) => {
    let value = e.target.value; //.replace(/[^a-zA-Z0-9 ]/g, '');
    setDebounceSearch(value);
  };

  console.log("totalRecords", totalRecords, size, page);
  return (
    <>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          page: page,
          sizePerPage: size,
          totalSize: totalRecords,
          hidePageListOnlyOnePage: true,
          disablePageTitle: true,
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <div className="px-4">
            {showSearchInput && (
              <Row className="d-flex justify-content-start mb-4">
                <Col
                  sm={12}
                  md={4}
                  lg={4}
                  className="d-flex statusSearchBarWrap"
                >
                  <Input
                    type="search"
                    name="searchihbpartner"
                    id="searchihbpartner"
                    className={clsx("searchBar", {
                      textBlack: debounceSearch.length,
                    })}
                    autoComplete="off"
                    placeholder={searchPlaceholder || "Search here"}
                    onChange={(e) => handleDebounceSearch(e)}
                    // onKeyDown={(e) => {
                    //   props.onEnter &&
                    //     setSearchString(
                    //       e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''),
                    //       e
                    //     );
                    // }}
                    value={debounceSearch || ""}
                  />
                </Col>
                {addOns && (
                  <Col sm={12} md={4} lg={4}>
                    {addOns}
                  </Col>
                )}
              </Row>
            )}
            <div
              className="tableAndPaginationWraper"
              key={keyId ? keyId : keyField}
            >
              <div
                className={
                  "table-responsive table-hover " + tableWrapperClassName
                    ? tableWrapperClassName
                    : ""
                }
                style={{ maxHeight: maxHeight, overflow: "auto" }}
              >
                <BootstrapTable
                  keyField={keyField ? keyField : "id"}
                  // remote={remote ? remote : totalRecords ? true : false}
                  data={dataTable}
                  selectRow={selectRow}
                  rowEvents={customRowEvent ? customRowEvent : __rowEvents}
                  columns={columnData}
                  bordered={false}
                  onTableChange={paginate}
                  expandRow={expandRow}
                  defaultSorted={defaultSorted}
                  // cellEdit={ cellEditFactory({ mode: 'click' }) }
                  {...paginationTableProps}
                  noDataIndication={
                    <div className="nodata-wrapper position-relative">
                      {tableLoading ? (
                        <div className="nodata-heading text-center">
                          {"Loading..."}
                        </div>
                      ) : (
                        <div className="nodata-heading text-center">
                          {"No records to show"}
                        </div>
                      )}
                    </div>
                  }
                  classes={"mt-1 " + classNames ? classNames : ""}
                  rowClasses="rowClasses"
                  remote={true}
                />
              </div>

              {totalRecords > size
                ? showPagination !== false && (
                    <div className="pagination-wrapper pt-3 d-md-flex justify-content-md-end">
                      <span className="pages-wrapper">
                        <PaginationListStandalone {...paginationProps} />
                      </span>
                    </div>
                  )
                : null}
            </div>
          </div>
        )}
      </PaginationProvider>
    </>
  );
};

export { CustomTable };
