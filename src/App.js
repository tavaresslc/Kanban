// Importando as bibliotecas e estilos necessários
import React, { useState } from "react";
import "./styles.css";

// Importando componentes personalizados
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

// Variável para controlar a geração de IDs únicos para as tarefas
let idAcc = 0;

// Função para gerar um ID único para cada nova tarefa
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

// Componente principal da aplicação
export default function App() {
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);

  // Função para adicionar uma nova tarefa à lista
  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  // Função para atualizar os detalhes de uma tarefa existente
  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  // Função para excluir uma tarefa da lista
  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  // Renderização do componente principal
  return (
    <div className="App">
      {/* Renderiza a barra de navegação */}
      <Navbar />

      {/* Container para as listas de tarefas */}
      <div className="container">
        {/* Lista de tarefas pendentes */}
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        {/* Lista de tarefas em progresso */}
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        {/* Lista de tarefas completas */}
        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
