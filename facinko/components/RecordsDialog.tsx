import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { SceneState } from "../lib/types";
import { Button } from "./Button";

const EditRecordDialog = forwardRef<
  HTMLDialogElement,
  {
    onRequireClosing: () => void;
    onFavorite: (sceneId: number) => void;
    onUnfavorite: (sceneId: number) => void;
    onUpdateNote: (sceneId: number, note: string) => void;
    isFavorite: boolean;
    isOpen: boolean;
    sceneId: number;
    note: string | null;
  }
>(
  (
    {
      isFavorite,
      onFavorite,
      onRequireClosing,
      onUnfavorite,
      onUpdateNote,
      isOpen,
      sceneId,
      note,
    },
    ref
  ) => {
    const firstRef = useRef<HTMLButtonElement>(null);
    console.log("sceneid", sceneId);

    useEffect(() => {
      if (isOpen) {
        if (firstRef.current) {
          firstRef.current.focus();
        }
      }
    }, [isOpen]);

    const onClickFav = useCallback(() => {
      if (isFavorite) {
        onUnfavorite(sceneId);
      } else {
        onFavorite(sceneId);
      }
    }, [sceneId, onFavorite, onUnfavorite, isFavorite]);

    const stopPropagation = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      },
      []
    );

    const onClickEditNote = useCallback(() => {
      const n = prompt(`Note`, note ?? undefined);
      if (!n) return;

      onUpdateNote(sceneId, n);
    }, [note, onUpdateNote, sceneId]);

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
            <div>
              <Fav isFav={isFavorite} onClick={onClickFav} disabled={false} />
            </div>
            <hr />
            <div>{note}</div>
            <div>
              <Button text={"edit"} onClick={onClickEditNote} />
            </div>
          </div>
        </div>
      </dialog>
    );
  }
);
EditRecordDialog.displayName = "EditRecordDialog";

type FavProps = { isFav: boolean; onClick: () => void; disabled: boolean };

const Fav = forwardRef<HTMLButtonElement, FavProps>((props, ref) => {
  const { isFav, onClick, disabled } = props;

  return (
    <button
      disabled={disabled}
      ref={ref}
      type={"button"}
      onClick={onClick}
      className={`${isFav ? "text-red-700" : "text-gray-700"} `}
    >
      {isFav ? "♥" : "♡"}
    </button>
  );
});
Fav.displayName = "Fav";

export const RecordsDialog = forwardRef<
  HTMLDialogElement,
  {
    onRequireClosing: () => void;
    records: SceneState["records"];
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

    const [currentSceneId, setCurrentSceneId] = useState<number | null>(null);

    const showEditDialog = useCallback(() => {
      if (editDialogRef.current) {
        setIsEditDialogOpen(true);
        editDialogRef.current.showModal();
      }
    }, []);

    const onClickRecord = useCallback(
      (sceneId: number) => {
        console.log(`clicked ${sceneId}`);
        setCurrentSceneId(sceneId);
        showEditDialog();
      },
      [showEditDialog]
    );

    const currentScene = currentSceneId
      ? records.find((r) => r.id === currentSceneId)
      : null;

    const editDialogRef = useRef<HTMLDialogElement | null>(null);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const closeEditDialog = useCallback(() => {
      if (editDialogRef.current) {
        setIsEditDialogOpen(false);
        editDialogRef.current.close();
      }
    }, []);

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
            {records.map((r) => {
              const title = `S${r.scene} C${r.cut} T${r.take}`;

              return (
                <div className="flex mb-2" key={r.id}>
                  <button type="button" onClick={() => onClickRecord(r.id)}>
                    {title}
                  </button>

                  <Fav
                    isFav={r.favorite ?? false}
                    disabled={true}
                    onClick={() => {}}
                  />

                  <div>{r.note ?? ""}</div>
                </div>
              );
            })}
          </div>
        </div>
        <EditRecordDialog
          isOpen={isEditDialogOpen}
          ref={editDialogRef}
          onFavorite={onFavorite}
          onRequireClosing={closeEditDialog}
          onUnfavorite={onUnfavorite}
          onUpdateNote={onUpdateNote}
          isFavorite={currentScene?.favorite ?? false}
          sceneId={currentScene?.id ?? 0}
          note={currentScene?.note ?? null}
        />
      </dialog>
    );
  }
);
RecordsDialog.displayName = "RecordsDialog";
