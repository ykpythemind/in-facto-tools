import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { SceneState } from "../lib/types";
import { Button } from "./Button";
import { Fav } from "./Fav";

export const RecordsDialog = forwardRef<
  HTMLDialogElement,
  {
    onRequireClosing: () => void;
    records: SceneState["records"];
    onFavorite: (sceneId: number) => void;
    onUnfavorite: (sceneId: number) => void;
    onUpdateNote: (sceneId: number, note: string) => void;
    onRequireReset: () => void;
    isOpen: boolean;
  }
>(
  (
    {
      onFavorite,
      onRequireClosing,
      onRequireReset,
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

    const onClickFav = useCallback(
      (isFavorite: boolean, sceneId: number) => {
        if (isFavorite) {
          onUnfavorite(sceneId);
        } else {
          onFavorite(sceneId);
        }
      },
      [onFavorite, onUnfavorite]
    );

    const onClickEditNote = useCallback(
      (note: string | null, sceneId: number) => {
        const n = prompt(`Note`, note ?? undefined);
        if (!n) return;

        onUpdateNote(sceneId, n);
      },
      [onUpdateNote]
    );

    return (
      <dialog
        open={isOpen}
        className="portrait:w-full landscape:w-2/4 h-4/5 py-7"
        ref={ref}
        style={{ overscrollBehavior: "contain" }}
        onClick={onRequireClosing}
      >
        <div className={"dialog-body h-full"} onClick={stopPropagation}>
          <div
            className="grid  gap-3 h-full"
            style={{ gridTemplateRows: "auto 1fr auto" }}
          >
            <div className="flex mb-2">
              <h3 className="text-lg">Records</h3>
              <div className="ml-auto">
                <button type="button" onClick={onRequireClosing}>
                  [close]
                </button>
              </div>
            </div>

            <div className="content-start overflow-y-scroll grid grid-cols-1 pb-3 gap-5 border-b-[1px] border-gray-200">
              {records.map((r) => {
                const title = `S${r.scene} C${r.cut} T${r.take}`;

                return (
                  <div
                    className="self-start grid gap-1 w-full items-center"
                    key={r.id}
                    style={{ gridTemplateColumns: "1fr 2fr auto" }}
                  >
                    <div className="font-bold">{title}</div>

                    <div className="px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onClickEditNote(r.note ?? null, r.id)}
                      >
                        {r.note ? truncate(r.note) : ""}{" "}
                        <span className="text-xl">✎</span>
                      </button>
                    </div>

                    <div className="text-xl">
                      <Fav
                        isFav={r.favorite ?? false}
                        disabled={false}
                        onClick={() => onClickFav(r.favorite ?? false, r.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <Button
                text={"Export"}
                onClick={async () => {
                  const text = exportRecords(records);

                  try {
                    await navigator.share({ text });
                  } catch (err) {
                    console.warn(`Error: ${err}. fallback to clipboard`);
                    // alert(`Error: ${err}`);
                    setClipboard(text);
                  }
                }}
              />
              <div className="mt-2">
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => {
                    if (confirm("Are you sure?")) {
                      onRequireReset();
                      onRequireClosing();
                    }
                  }}
                >
                  Reset records
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
);
RecordsDialog.displayName = "RecordsDialog";

function truncate(str: string): string {
  if (str.length > 8) {
    return str.slice(0, 8) + "...";
  }
  return str;
}

function exportRecords(records: SceneState["records"]) {
  return records
    .map((r) => {
      const title = `S${r.scene} C${r.cut} T${r.take}`;
      const note = r.note ? ` ${r.note}` : "";
      return `${title}${note}${r.favorite ? " ♡" : ""}`;
    })
    .join("\n");
}

function setClipboard(text: string) {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data).then(
    () => {
      /* success */
    },
    () => {
      alert("fail");
      /* failure */
    }
  );
}