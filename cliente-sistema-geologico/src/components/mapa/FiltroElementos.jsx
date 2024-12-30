import React from "react";

const FiltroElementos = ({ onFilterChange }) => {
  return (
    <div>
      <select
        name="categoria"
        defaultValue="todos"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="fosil">Fósiles</option>
        <option value="roca">Rocas</option>
      </select>
    </div>
  );
};

export default FiltroElementos;