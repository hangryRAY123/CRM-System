import { useDrag } from "react-dnd";

const DraggableItem = ({ name, type }: { name: string; type: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { name, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="draggable-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {name}
    </div>
  );
};

export default DraggableItem;
