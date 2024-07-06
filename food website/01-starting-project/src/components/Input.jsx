export default function Input({ label, id, name, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} required {...props} />
    </div>
  );
}
