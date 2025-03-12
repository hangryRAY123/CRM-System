import { useDrop } from "react-dnd";

export const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="drop-zone"
      style={{ backgroundColor: isOver ? "lightgray" : "white" }}
    >
      Drag and drop components here
    </div>
  );
};
