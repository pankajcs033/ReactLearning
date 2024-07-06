export default function Input({ label, id, type, error, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...props} />
      {error && <p className="control-error">{error}</p>}
    </div>
  );
}
