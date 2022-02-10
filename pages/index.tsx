import type { NextPage } from "next";

import { ChangeEvent, useEffect, useState } from "react";

interface Task {
  id: string;
  todo: string;
  completed: boolean;
}
const myStyleGlobal = {
  padding: "10px",
  fontFamily: "Arial",
  margin: "auto",
  width: "25%",
};

const myStyleTextFinish = {
  fontFamily: "Arial",
  fontSize: 15,
  color: "green",
  margin: 5,
};

const myStyleTextPending = {
  fontFamily: "Arial",
  fontSize: 15,
  color: "red",
  margin: 5,
};
const myStyleButton = {
  fontFamily: "Arial",
  fontSize: 15,
  backgroundColor: "green",
  borderRadius: 15,
  margin: 5,
};

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoValue, setTodoValue] = useState<Task[]>([]);

  useEffect(() => {}, [todoValue]);

  const handleTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const submitValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime().toString(),
      todo: todo,
      completed: false,
    };
    setTodoValue([...todoValue, newTodo]);

    setTodo("");
  };

  function deleteTodo(id: string) {
    const updatedTodos = [...todoValue].filter((todo) => todo.id !== id);
    setTodoValue(updatedTodos);
  }

  function toogleItemCompleted(id: string) {
    const updatedTodos = [...todoValue].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoValue(updatedTodos);
  }

  return (
    <div style={myStyleGlobal}>
      <form onSubmit={submitValue}>
        <input
          required
          type="text"
          placeholder="Todo"
          onChange={handleTodo}
          value={todo}
        />
        <button style={myStyleButton}>Add Task</button>
      </form>
      <div>
        {todoValue.map(
          (todo) =>
            todo.completed === false && (
              <div style={myStyleTextPending} key={todo.id}>
                <input
                  type="checkbox"
                  onChange={() => toogleItemCompleted(todo.id)}
                  checked={todo.completed}
                />
                <button
                  style={myStyleButton}
                  onClick={() => deleteTodo(todo.id)}
                >
                  delete
                </button>
                {todo.todo}
              </div>
            )
        )}
        <div>Finish Todos</div>
        <div style={myStyleTextFinish}>
          {todoValue.map((todo, index) => {
            return (
              <div key={index}>
                {todo.completed && (
                  <ul>
                    <li>{todo.todo}</li>
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
