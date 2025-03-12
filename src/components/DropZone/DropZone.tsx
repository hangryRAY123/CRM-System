import { useDrop } from "react-dnd";
import { FC } from "react";

interface DraggableItem {
  type: string;
  name: string;
}

interface DropZoneProps {
  onDrop: (item: any) => void;
}

export const DropZone: FC<DropZoneProps> = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: DraggableItem) => onDrop(item),
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
