import "../../css/ui/button.css";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
