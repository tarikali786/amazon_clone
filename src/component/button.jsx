import "./button.css";
export const Button = ({
  lable,
  onClick,
  disabledButton,
  optionalClassName = "",
}) => {
  return (
    <>
      <button
        className={`button_container ${optionalClassName}`}
        onClick={onClick}
        disabled={disabledButton}
      >
        {lable}
      </button>
    </>
  );
};
