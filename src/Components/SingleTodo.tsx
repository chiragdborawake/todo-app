import React, { useRef, useState, useEffect } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdFileDownloadDone } from "react-icons/md";
import "./style.css";
import TodoList from "./TodoList";
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [editValue, seteditValue] = useState<string>(todo.todo);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };
  const handleDelete = (id: number) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };
  const handleInputEdit = () => {
    setisEdit(!isEdit);
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: editValue } : todo;
      })
    );
    setisEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {isEdit && !todo.isDone ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => seteditValue(e.target.value)}
          className="todos_single--text"
        ></input>
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}
      <div>
        <span className="icon" onClick={() => handleInputEdit()}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdFileDownloadDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
