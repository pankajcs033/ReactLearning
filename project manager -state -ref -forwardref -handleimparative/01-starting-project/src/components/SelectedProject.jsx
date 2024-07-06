import Tasks from "./Tasks";

export default function SelectedProject({
  project,
  tasks,
  handleDeleteProject,
  handleAddTask,
  handleDeleteTask,
}) {
  console.log(project);
  const date = new Date(project["Due Date"]).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.Title}
          </h1>
          <button
            onClick={handleDeleteProject}
            className="text-stone-600 hover:text-stone-950"
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{date}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.Description}
        </p>
      </header>
      <Tasks
        tasks={tasks}
        project={project}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
