interface ButtonProps {
  label?: string;
}

/**
 * Primary UI component for user interaction
 */
const Button: React.FC<ButtonProps> = ({ label = "" }) => {
  return <button className="btn">{label}</button>;
};

export { Button };
