import { forwardRef, useCallback, useEffect, useRef } from "react";
import { SceneType } from "../lib/types";
import { Button } from "./Button";

export const Dialog = forwardRef<
  HTMLDialogElement,
  {
    modalType: SceneType;
    currentStatus: string | undefined;
    onRequireClosing: () => void;
    onNewStatus: (status: string) => void;
    isOpen: boolean;
  }
>(
  (
    { onNewStatus, onRequireClosing, modalType, currentStatus, isOpen },
    ref
  ) => {
    const primaryButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (isOpen) {
        if (primaryButtonRef.current) {
          primaryButtonRef.current.focus();
        }
      }
    }, [isOpen]);

    const stopPropagation = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      },
      []
    );

    const clickEdit = () => {
      const r = prompt(`New status for ${modalType}`);
      if (!r) return;
      if (r === "") return;

      onNewStatus(r);
      onRequireClosing();
    };

    const clickReset = () => {
      onNewStatus("1");
      onRequireClosing();
    };

    const clickInc = () => {
      const parsed = parseInt(currentStatus || "0", 10);
      onNewStatus(String(parsed + 1));
      onRequireClosing();
    };

    const clickDec = () => {
      const parsed = parseInt(currentStatus || "0", 10);
      const newVal = parsed - 1;
      if (newVal < 1) return;
      onNewStatus(String(newVal));
      onRequireClosing();
    };

    const title = `${modalType} : ${currentStatus}`;

    return (
      <dialog
        open={isOpen}
        className="portrait:w-full landscape:w-2/4"
        style={{ overscrollBehavior: "contain" }}
        ref={ref}
        onClick={onRequireClosing}
      >
        <div
          className={"dialog-body"}
          style={{ overscrollBehavior: "contain" }}
          onClick={stopPropagation}
        >
          <div className="flex">
            <h3 className="text-lg">{title}</h3>
            <div className="ml-auto">
              <button type="button" onClick={onRequireClosing}>
                [close]
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5">
            <div className="flex gap-2">
              <Button onClick={clickDec} text={"-1"} />
              <Button ref={primaryButtonRef} onClick={clickInc} text={"+1"} />
            </div>

            <Button onClick={clickEdit} text={"Edit"} />

            <Button onClick={clickReset} text={"Reset"} />
          </div>
        </div>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";
