import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  Bold,
  Download,
  Highlighter,
  Italic,
  Redo,
  Underline,
  Undo,
} from "lucide-react";
import * as React from "react";
import styles from "../styles/Hero.module.scss";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { $wrapSelectionInMarkNode } from "@lexical/mark";

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const handleUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const handleRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  const handleBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const handleItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const handleHighlight = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        return;
      }
      $wrapSelectionInMarkNode(selection, selection.isBackward(), "highlight");
    });
  };

  const handleDownload = () => {
    editor.read(() => {
      navigator.clipboard.writeText(
        JSON.stringify(editor.getEditorState().toJSON())
      );
    });
  };

  return (
    <div className={styles.documentToolbar}>
      <Undo className={styles.toolbarButton} onClick={handleUndo} />
      <Redo className={styles.toolbarButton} onClick={handleRedo} />
      <div className={styles.divider} />
      <Bold className={styles.toolbarButton} onClick={handleBold} />
      <Italic className={styles.toolbarButton} onClick={handleItalic} />
      <Highlighter className={styles.toolbarButton} onClick={handleHighlight} />
      <Download className={styles.toolbarButton} onClick={handleDownload} />
    </div>
  );
};

export default ToolbarPlugin;
