import React from "react";

const FiltroElementos = ({ onFilterChange }) => {
  return (
    <div style={{ marginBottom: "10px", textAlign: "center" }}>
      <label>
        <input
          type="radio"
          name="categoria"
          value="todos"
          defaultChecked
          onChange={(e) => onFilterChange(e.target.value)}
        />
        Todos
      </label>
      <label style={{ marginLeft: "10px" }}>
        <input
          type="radio"
          name="categoria"
          value="fosil"
          onChange={(e) => onFilterChange(e.target.value)}
        />
        Fósiles
      </label>
      <label style={{ marginLeft: "10px" }}>
        <input
          type="radio"
          name="categoria"
          value="roca"
          onChange={(e) => onFilterChange(e.target.value)}
        />
        Rocas
      </label>
    </div>
  );
};

export default FiltroElementos;