import { forwardRef, useCallback, useEffect, useRef } from "react";
import { SceneState } from "../lib/types";

type Records = SceneState["records"];

export const RecordsDialog = forwardRef<
  HTMLDialogElement,
  {
    onRequireClosing: () => void;
    records: Records;
    onFavorite: (sceneId: number) => void;
    onUnfavorite: (sceneId: number) => void;
    onUpdateNote: (sceneId: number, note: string) => void;
    isOpen: boolean;
  }
>(
  (
    {
      onFavorite,
      onRequireClosing,
      onUnfavorite,
      onUpdateNote,
      records,
      isOpen,
    },
    ref
  ) => {
    const firstRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (isOpen) {
        if (firstRef.current) {
          firstRef.current.focus();
        }
      }
    }, [isOpen]);

    const stopPropagation = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      },
      []
    );

    return (
      <dialog
        open={isOpen}
        className="portrait:w-full landscape:w-2/4"
        ref={ref}
        style={{ overscrollBehavior: "contain" }}
        onClick={onRequireClosing}
      >
        <div className={"dialog-body"} onClick={stopPropagation}>
          <div className="flex">
            <h3 className="text-lg">Records</h3>
            <div className="ml-auto">
              <button type="button" onClick={onRequireClosing}>
                x
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5">
            <Button ref={firstButtonRef} onClick={clickInc} text={"+1"} />

            <Button onClick={clickEdit} text={"Edit"} />

            <Button onClick={clickReset} text={"Reset"} />
          </div>
        </div>
      </dialog>
    );
  }
);
RecordsDialog.displayName = "RecordsDialog";
