
function Input({ id, label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
