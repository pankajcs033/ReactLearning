import { useRef } from "react";

export default function NewTask({ project, handleAddTask }) {
  const input = useRef();

  function handleAdd() {
    handleAddTask({ text: input.current.value, projectId: project.id });
    input.current.value = "";
  }

  return (
    <li className="flex justify-between">
      <input
        ref={input}
        className="p-2 w-[25rem] border-b-2"
        placeholder="new task"
      />
      <button
        className="text-stone-800 hover:bg-stone-500 rounded-md px-4 hover:text-stone-100"
        onClick={handleAdd}
      >
        Add Task
      </button>
    </li>
  );
}
