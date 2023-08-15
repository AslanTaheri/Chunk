import ButtonChunk from "./buttons/ButtonChunk";
import PriorityCheckBox from "./PriorityCheckBox";
import ProgressBar from "./ProgressBar";

const TaskItem = (props) => {
  return (
    <>
      <PriorityCheckBox />
      <section>{props.name}</section>
      <ProgressBar />
      <section>{props.dueDate}</section>
      <ButtonChunk />
    </>
  );
};

export default TaskItem;
