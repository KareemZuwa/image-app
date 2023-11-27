import { useEffect, useState } from "react";
import "./Snackbar.css";

interface SnackbarProps {
  message: string;
  onClose: () => void;
  error?: boolean;
}

export const Snackbar = ({ message, error, onClose }: SnackbarProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return visible ? (
    <div className={`snackbar ${error ? "error" : ""}`}>
      <div className="snackbar-content">{message}</div>
    </div>
  ) : null;
};
