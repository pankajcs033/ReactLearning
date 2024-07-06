import Button from "./Button.jsx";
import img from "../assets/no-projects.png";

export default function NoProjectSelected({ handleStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={img}
        alt="empty notes icon"
        className="w-16 h-16 object-contains mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="mb-4 text-stone-400">
        Select a project or get started with new one
      </p>
      <p className="mt-8">
        <Button onClick={handleStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
