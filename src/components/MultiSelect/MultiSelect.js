import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import "./style.scss";

const MultiSelectSearchDropdown = ({
  label,
  options,
  selectedItemIds,
  onSelect,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectedItemIds?.length && options?.length) {
      setSelectedItems(
        options?.filter((item) => selectedItemIds.includes(item.id))
      );
    } else {
      setSelectedItems([]);
    }
  }, [selectedItemIds, options]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setSearchText("");
  };

  const handleItemClick = (item) => {
    const isSelected = selectedItems.some((si) => si.id === item.id);

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
      onSelect(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
      onSelect([...selectedItems, item]);
    }
  };

  const filterOptions = () => {
    return options.filter((option) =>
      option?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleApply = () => {
    setDropdownOpen(false);
    onSelect(selectedItems);
  };

  const handleClear = () => {
    setDropdownOpen(false);
    setSelectedItems([]);
    onSelect([]);
  };

  const isSelectedItem = (id) => {
    const itemIndex = selectedItems?.findIndex((item) => item.id === id);
    if (itemIndex >= 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle className="dropdown-toggle">
        <div className="dropdown-label">
          {selectedItems.map((selectedItem, index) => (
            <div key={index} className="selected-item-wrapper">
              <span>{selectedItem.name}</span>
            </div>
          ))}
          {label}
          {dropdownOpen ? (
            <i class="fas fa-caret-up"></i>
          ) : (
            <i class="fas fa-caret-down"></i>
          )}
        </div>
      </DropdownToggle>

      <DropdownMenu className="p-2 w-100">
        {options?.length ? (
          <>
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="mb-1"
            />
            {/* <DropdownItem header>Select items:</DropdownItem> */}
            <div className="options-wrapper">
              {filterOptions().map((item) => (
                <DropdownItem
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  active={isSelectedItem(item.id)}
                  className="dropdown-item"
                >
                  {item?.name}
                </DropdownItem>
              ))}
            </div>
            <DropdownItem divider />
            <Button color="primary" onClick={handleApply}>
              Apply
            </Button>
            <Button color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </>
        ) : (
          <div className="options-wrapper p-2">No options to select!</div>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MultiSelectSearchDropdown;
