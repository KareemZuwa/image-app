import "./FormButtons.css";

interface FormButtonsProps {
  onCancelClick: () => void;
}

export const FormButtons = ({ onCancelClick }: FormButtonsProps) => {
  return (
    <div className="form-buttons-section">
      <button className="button primary" type="submit">
        Upload
      </button>
      <button
        className="button secondary"
        type="button"
        onClick={onCancelClick}
      >
        Reset
      </button>
    </div>
  );
};
