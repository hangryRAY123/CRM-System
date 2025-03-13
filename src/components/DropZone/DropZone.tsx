import { useDrop } from "react-dnd";
import { FC } from "react";
import { DraggableItemTypes } from "../../helpers/types";

interface DropZoneProps {
  onDrop: (item: DraggableItemTypes) => void;
}

export const DropZone: FC<DropZoneProps> = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: DraggableItemTypes) => onDrop(item),
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
