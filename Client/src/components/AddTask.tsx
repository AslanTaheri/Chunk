import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import PrioritySelector from "./PrioritySelector";

const AddTask = () => {
  return (
    <>
      <form action="">
        <div>
          <input
            type="text"
            placeholder="Task Name"
            maxLength="50"
            aria-label="Task Name"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            maxLength="250"
            aria-label="Task Description"
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faCalendarCheck} size="lg" />
          <input type="date" />
        </div>
        <PrioritySelector />
      </form>
    </>
  );
};

export default AddTask;
