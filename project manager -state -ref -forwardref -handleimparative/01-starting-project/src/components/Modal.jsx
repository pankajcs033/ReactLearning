import { useImperativeHandle, forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-6 rounded-md shadow-md"
    >
      {children}
      <form className="flex flex-row-reverse">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
