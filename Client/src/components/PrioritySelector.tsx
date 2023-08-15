import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const PrioritySelector = () => {
  const priorityOptions = [
    { value: "1", label: "Low", color: "blue" },
    { value: "2", label: "Normal", color: "green" },
    { value: "3", label: "High", color: "Orange" },
    { value: "4", label: "Urgent", color: "red" },
  ];

  const [selectedPriority, setSelectedPriority] = useState("2");

  const handlePriorityChange = (e) => setSelectedPriority(e.target.value);

  const renderOptionsWithIcon = () => {
    return priorityOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  return (
    <>
      <div className="form-group">
        <div className="priority-container">
          <FontAwesomeIcon
            icon={faSquare}
            style={{
              color: priorityOptions.find(
                (option) => option.value === selectedPriority
              ).color,
              marginRight: "5px",
            }}
          />
          <span className="priority-label">Priority</span>
        </div>
        <select
          id="priority"
          value={selectedPriority}
          onChange={handlePriorityChange}>
          {renderOptionsWithIcon()}
        </select>
      </div>
    </>
  );
};

export default PrioritySelector;
