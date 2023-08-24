// Importando as bibliotecas necessárias
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./task-item.css";

// Componente para exibir e editar uma tarefa individual
export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  // Estado para controlar se a tarefa está em modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado para armazenar o título editável da tarefa
  const [editableTitle, setEditableTitle] = useState(title);

  // Função chamada quando o título da tarefa é alterado
  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };

  // Função chamada quando uma tecla é pressionada
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  // Função chamada quando o estado da tarefa é alterado
  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  // Renderização do componente
  if (isEditing) {
    // Modo de edição: input para editar o título
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    // Modo de visualização: exibe o título e permite selecionar o estado da tarefa
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
    );
  }
}

// Definição dos tipos esperados das propriedades do componente
TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};
