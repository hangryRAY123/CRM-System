import React, { useState } from "react";

const ComponentSettings = ({ component, onUpdate }) => {
  const [newText, setNewText] = useState(component.text || "");
  const [newUrl, setNewUrl] = useState(component.url || "");

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleUrlChange = (e) => {
    setNewUrl(e.target.value);
  };

  const handleSave = () => {
    onUpdate(component.id, { text: newText, url: newUrl });
  };

  return (
    <div className="component-settings">
      {component.type === "Header" && (
        <div>
          <label>Header Text:</label>
          <input type="text" value={newText} onChange={handleTextChange} />
        </div>
      )}
      {component.type === "ImageBlock" && (
        <div>
          <label>Image URL:</label>
          <input type="text" value={newUrl} onChange={handleUrlChange} />
        </div>
      )}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ComponentSettings;
