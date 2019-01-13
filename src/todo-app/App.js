import React, { useReducer, useState } from "react";

const initialState = {
  todos: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return Object.assign({}, { todos: [...state.todos, action.payload] });
    case "complete":
      return Object.assign(
        {},
        {
          todos: state.todos.map((todo, i) => {
            if (i === action.payload) {
              return {
                ...todo,
                complete: !todo.complete
              };
            }
            return todo;
          })
        }
      );
    default:
      return state;
  }
};

export default function App() {
  const [todoValue, setTodoValue] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = event => {
    event.preventDefault();
    dispatch({
      type: "add",
      payload: { content: todoValue, complete: false }
    });
  };

  const toggleTodo = (index) => {
    dispatch({
      type: "complete",
      payload: index
    });
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todoValue}
          onChange={event => setTodoValue(event.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <h2>{state.todos.length} todos</h2>
      <ul>
        {state.todos.map((todo, i) => (
          <li>
            <p style={{textDecoration: todo.complete ? 'line-through' : 'none'}}>{todo.content}</p>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => toggleTodo(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
