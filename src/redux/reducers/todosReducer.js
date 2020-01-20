import uuid from "uuid/v4";

const initialState = {
  todos: [
    {
      id: uuid(),
      name: "Listen the podcast",
      completed: false
    },
    {
      id: uuid(),
      name: "Watch movie",
      completed: true
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    }
    case "TOGGLE_TODO": {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id != action.payload)
      };
    }
    default:
      return state;
  }
}
