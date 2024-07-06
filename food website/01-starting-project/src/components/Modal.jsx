import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, children, className = "", onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    }

    return () => dialogRef.current.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
