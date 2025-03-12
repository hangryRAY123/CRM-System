import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "../components/DraggableItem/DraggableItem";
import { DropZone } from "../components/DropZone/DropZone";
import Header from "../components/UiBuilder/Header";
import Footer from "../components/UiBuilder/Footer";
import Menu from "../components/UiBuilder/Menu";
import ColumnBlock from "../components/UiBuilder/ColumnBlock";
import ImageBlock from "../components/UiBuilder/ImageBlock";
import ComponentSettings from "../components/UiBuilder/ComponentSettings";
import { Component } from "../helpers/types";

interface DraggableItem {
  type: Component["type"];
  name: string;
}

export const UiBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  );

  useEffect(() => {
    const savedComponents = JSON.parse(
      localStorage.getItem("ui-components") || "[]"
    );
    if (savedComponents) {
      setComponents(savedComponents);
    }
  }, []);

  useEffect(() => {
    if (components.length > 0) {
      localStorage.setItem("ui-components", JSON.stringify(components));
    }
  }, [components]);

  const handleDrop = (item: DraggableItem) => {
    const newComponent: Component = { ...item, id: Date.now() };
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const handleSelectComponent = (component: Component) => {
    setSelectedComponent(component);
  };

  const handleUpdateComponent = (id: number, updates: Partial<Component>) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id ? { ...component, ...updates } : component
      )
    );
  };

  const handleDeleteComponent = (id: number) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== id)
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="ui-builder">
        <h1>UI Builder</h1>
        <div className="component-palette">
          <h3>Available Components</h3>
          <DraggableItem type="Header" name="Header" />
          <DraggableItem type="Footer" name="Footer" />
          <DraggableItem type="Menu" name="Menu" />
          <DraggableItem type="ColumnBlock" name="Column Block" />
          <DraggableItem type="ImageBlock" name="Image Block" />
        </div>
        <div className="drop-zone">
          <h3>Drop Zone</h3>
          <DropZone onDrop={handleDrop} />
          <div className="placed-components">
            {components.map((component) => {
              const Component =
                component.type === "Header"
                  ? Header
                  : component.type === "Footer"
                  ? Footer
                  : component.type === "Menu"
                  ? Menu
                  : component.type === "ColumnBlock"
                  ? ColumnBlock
                  : component.type === "ImageBlock"
                  ? ImageBlock
                  : null;

              if (!Component) return null;

              return (
                <div
                  key={component.id}
                  onClick={() => handleSelectComponent(component)}
                  style={{ margin: "10px" }}
                >
                  <Component />
                  <button onClick={() => handleDeleteComponent(component.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {selectedComponent && (
          <div className="component-settings-panel">
            <h3>Component Settings</h3>
            <ComponentSettings
              component={selectedComponent}
              onUpdate={handleUpdateComponent}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};
