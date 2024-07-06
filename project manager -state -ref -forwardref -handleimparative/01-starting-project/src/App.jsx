import { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import InputDialog from "./components/InputDialog";
import NoProjectSelected from "./components/NoProjectSelected";
import Modal from "./components/Modal";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const modal = useRef();

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: projectState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleSelectProject(selectedId) {
    console.log(selectedId);
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: selectedId,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(newProject) {
    if (
      newProject["Title"].trim() === "" ||
      newProject["Description"].trim() === "" ||
      newProject["Due Date"].trim() === ""
    ) {
      modal.current.open();
      return;
    }
    let newProjectObj = {
      ...newProject,
      id: Math.random(),
    };

    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined, // to get back to fallback screen
        projects: [...prevState.projects, newProjectObj],
      };
    });
  }

  function handleAddTask(newTask) {
    console.log(newTask);
    if (newTask["text"].trim() === "") {
      return;
    }
    let newTaskObj = {
      ...newTask,
      id: Math.random(),
    };

    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTaskObj],
      };
    });
  }

  function handleDeleteTask(taskId) {
    console.log(projectState, taskId);
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: projectState.tasks.filter((task) => task.id !== taskId),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  const selectedProjectTasks = projectState.tasks.filter(
    (task) => task.projectId === selectedProject?.id
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      tasks={selectedProjectTasks}
      handleDeleteProject={handleDeleteProject}
      handleAddTask={handleAddTask}
      handleDeleteTask={handleDeleteTask}
    />
  );
  if (projectState.selectedProjectId === undefined) {
    // if no project selected or created
    content = (
      <NoProjectSelected handleStartAddProject={handleStartAddProject} />
    );
  } else if (projectState.selectedProjectId === null) {
    // if adding project starts
    content = (
      <InputDialog
        handleAddItem={handleAddProject}
        handleCancelAddProject={handleCancelAddProject}
      />
    );
  }

  return (
    <main className="h-screen mt-8 flex gap-8 ">
      <Modal ref={modal} buttonCaption="close">
        <h2 className="text-stone-900 font-bold">Invalid Inputs</h2>
        <p className="font-semibold my-3">
          Looks like you have missed some inputs or invalid inputs.
        </p>
      </Modal>
      <Sidebar
        projects={projectState.projects}
        handleStartAddProject={handleStartAddProject}
        handleSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
