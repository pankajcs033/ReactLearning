import Button from "./Button";

export default function Sidebar({
  projects,
  handleStartAddProject,
  handleSelectProject,
  selectedProjectId,
}) {
  console.log(projects);
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <p className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </p>
      <Button onClick={handleStartAddProject}>Add Project +</Button>

      <div className="mt-8">
        {projects.map((project, index) => {
          let classes =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          if (project.id === selectedProjectId) {
            // selected project
            classes += " bg-stone-800 text-stone-200";
          } else {
            classes += " text-stone-400";
          }
          return (
            <button
              key={project.id}
              onClick={() => handleSelectProject(project.id)}
              className={classes}
            >
              {project.Title}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
