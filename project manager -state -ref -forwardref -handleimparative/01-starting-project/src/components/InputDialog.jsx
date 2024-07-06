import Input from "./Input";
import { useRef } from "react";

export default function InputDialog({ handleAddItem, handleCancelAddProject }) {
  const title = useRef();
  const description = useRef();
  const due_date = useRef();

  function handleSave() {
    const newInput = {
      Title: title.current.value,
      Description: description.current.value,
      "Due Date": due_date.current.value,
    };

    // validation

    handleAddItem(newInput);
  }

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            onClick={handleCancelAddProject}
            className="text-stone-600 hover:text-stone-950"
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md text-stone-50 bg-stone-800 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>
      <Input type="text" ref={title} label="Title" />
      <Input ref={description} label="Description" textarea />
      <Input type="date" ref={due_date} label="Due date" />
    </div>
  );
}
