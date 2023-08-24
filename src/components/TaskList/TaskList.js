// Importando as bibliotecas e recursos necessários
import React from "react";
import "./tasklist.css";
import PropTypes from "prop-types";
import plusIcon from "../../img/plus-icon.svg";

// Importando o componente TaskItem
import TaskItem from "../TaskItem/TaskItem";

// Componente para exibir a lista de tarefas
export default function TaskList({
  title,
  taskState,
  onAddTask,
  tasks,
  onTaskUpdate,
  onDeleteTask
}) {
  // Função para adicionar uma nova tarefa na lista
  const addTask = () => {
    onAddTask("Nova Tarefa", taskState);
  };

  // Renderização do componente TaskList
  return (
    <div className="tasklist">
      {/* Exibe o título da lista */}
      <div className="title">{title}</div>
      
      {/* Renderiza o conteúdo da lista */}
      <div className="content">
        {/* Mapeia e exibe cada tarefa usando o componente TaskItem */}
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              taskState={task.state}
              onTaskUpdate={onTaskUpdate}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
        
        {/* Exibe uma mensagem se a lista de tarefas estiver vazia */}
        {tasks.length === 0 && <div className="empty-list">Lista Vazia</div>}
        
        {/* Botão para adicionar uma nova tarefa */}
        <button onClick={addTask} className="btn">
          <img src={plusIcon} alt="plus" />
          Adicionar Tarefa
        </button>
      </div>
    </div>
  );
}

// Definição dos tipos esperados das propriedades do componente
TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};
