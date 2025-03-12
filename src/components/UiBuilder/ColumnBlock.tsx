const ColumnBlock = () => {
  return (
    <div className="column-block" style={{ display: "flex", gap: "10px" }}>
      <div style={{ flex: "1", backgroundColor: "#ddd", padding: "20px" }}>
        Column 1
      </div>
      <div style={{ flex: "1", backgroundColor: "#ddd", padding: "20px" }}>
        Column 2
      </div>
    </div>
  );
};

export default ColumnBlock;
