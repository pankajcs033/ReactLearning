import NewTask from "./NewTask";

export default function Tasks({
  tasks,
  project,
  handleAddTask,
  handleDeleteTask,
}) {
  console.log(tasks);
  return (
    <>
      <NewTask project={project} handleAddTask={handleAddTask} />
      {tasks.length === 0 && (
        <p className="py-4 ">Tasks are not created yet.</p>
      )}
      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <div
              key={`div_${task.id}`}
              className="flex justify-between p-2 bg-stone-200 my-2"
            >
              <li key={task.id}>{task.text}</li>
              <button
                key={`button_${task.id}`}
                className="taxt-stone-800 hover:text-rose-600"
                onClick={() => handleDeleteTask(task.id)}
              >
                Clear
              </button>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
