import { createHeadlessEditor } from "@lexical/headless";
import {
  $createListItemNode,
  $createListNode,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import {
  $createMarkNode,
  $isMarkNode,
  MarkNode,
  type SerializedMarkNode,
} from "@lexical/mark";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  HeadingNode,
  type SerializedHeadingNode,
} from "@lexical/rich-text";
import { $dfs } from "@lexical/utils";
import {
  $createParagraphNode,
  $createTextNode,
  $getEditor,
  $getRoot,
  $isElementNode,
  ElementNode,
  ParagraphNode,
  TextNode,
  type SerializedLexicalNode,
} from "lexical";
import * as React from "react";
import { mainEditorState } from "../utils/editorStates";

interface StateLoaderPluginProps {
  delay?: number;
}

const StateLoaderPlugin: React.FC<StateLoaderPluginProps> = ({
  delay = 10,
}) => {
  const [editor] = useLexicalComposerContext();
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [nodeList, setNodeList] = React.useState<SerializedLexicalNode[]>([]);
  const [currentElementNode, setCurrentElementNode] = React.useState<
    ElementNode | MarkNode | ListItemNode | undefined
  >();
  const [markCharacterCount, setMarkCharacterCount] = React.useState(0);
  const [markNodeLength, setMarkNodeLength] = React.useState(10000);
  const [markNodeLengths, setMarkNodeLengths] = React.useState<number[]>([]);
  const [currentMarkNodeIndex, setCurrentMarkNodeIndex] = React.useState(0);

  const headlessEditor = createHeadlessEditor({
    namespace: "MyEditor",
    theme: {},
    nodes: [
      HeadingNode,
      ParagraphNode,
      TextNode,
      ListNode,
      ListItemNode,
      MarkNode,
    ],
    onError: (error: Error) => console.error(error),
  });

  React.useEffect(() => {
    headlessEditor.update(
      () => {
        $getEditor().setEditorState(
          $getEditor().parseEditorState(JSON.stringify(mainEditorState))
        );
      },
      {
        onUpdate: () => {
          headlessEditor.update(() => {
            const nodes = $dfs($getRoot()).map((i) => {
              if ($isMarkNode(i.node)) {
                const size = i.node.getTextContentSize();
                setMarkNodeLengths((prev) => [...prev, size]);
              }
              return i.node.exportJSON();
            });
            setNodeList(nodes);
          });
        },
      }
    );
  }, []);

  React.useEffect(() => {
    if (!isInitialized && nodeList.length > 0) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
      });
      setIsInitialized(true);
    }
  }, [editor, isInitialized, nodeList]);

  React.useEffect(() => {
    if (isFinished) {
      editor.update(() => {
        // $getEditor().focus();
      });
    }
  }, [isFinished]);

  React.useEffect(() => {
    if (!isInitialized || isFinished || currentNodeIndex >= nodeList.length)
      return;

    const interval = setInterval(() => {
      editor.update(() => {
        const currentItem = nodeList[currentNodeIndex];
        const currentNode = currentItem;
        if (!currentNode) return;

        if (currentNode.type !== "text") {
          if (currentCharIndex === 0) {
            const root = $getRoot();

            if (currentNode.type === "heading") {
              const headingNode = currentNode as SerializedHeadingNode;
              const newHeadingNode = $createHeadingNode(headingNode.tag);
              root.append(newHeadingNode);
              setCurrentElementNode(newHeadingNode);
            } else if (currentNode.type === "paragraph") {
              const newParagraphNode = $createParagraphNode();
              root.append(newParagraphNode);
              setCurrentElementNode(newParagraphNode);
            } else if (currentNode.type === "mark") {
              const markNode = currentNode as SerializedMarkNode;
              const newMarkNode = $createMarkNode(markNode.ids!);
              currentElementNode!.append(newMarkNode);
              setCurrentElementNode(newMarkNode);
              setMarkCharacterCount(0);
              setMarkNodeLength(markNodeLengths[currentMarkNodeIndex] || 0);
              const newMarkNodeIndex = currentMarkNodeIndex + 1;
              setCurrentMarkNodeIndex(newMarkNodeIndex);
            } else if (currentNode.type === "list") {
              const newListNode = $createListNode("bullet");
              root.append(newListNode);
              setCurrentElementNode(newListNode);
            } else if (currentNode.type === "listitem") {
              const newListItemNode = $createListItemNode();
              const children = root.getChildren();
              const lastNode = children[children.length - 1];
              if ($isElementNode(lastNode)) {
                lastNode.append(newListItemNode);
                setCurrentElementNode(newListItemNode);
              }
            }
          }

          setCurrentNodeIndex((prev) => prev + 1);
        } else {
          const node = currentNode as any;
          const text = node.text!;
          const character = text[currentCharIndex];
          if (character && currentElementNode) {
            if (
              markCharacterCount >= markNodeLength &&
              ($isElementNode(currentElementNode) ||
                $isMarkNode(currentElementNode))
            ) {
              currentElementNode.insertAfter($createTextNode(character));
              setCurrentElementNode(currentElementNode.getParent()!);
              setMarkNodeLength(10000000);
            } else {
              currentElementNode.append($createTextNode(character));
              setMarkCharacterCount((prev) => prev + 1);
            }
          }

          setCurrentCharIndex((prev) => {
            if (prev + 1 >= text.length) {
              const nextIndex = currentNodeIndex + 1;
              if (nextIndex >= nodeList.length) {
                setIsFinished(true);
              }
              setCurrentNodeIndex(nextIndex);
              return 0;
            }
            return prev + 1;
          });
        }
      });
    }, delay);

    return () => clearInterval(interval);
  }, [
    editor,
    isInitialized,
    currentNodeIndex,
    currentCharIndex,
    isFinished,
    nodeList,
    delay,
    currentElementNode,
    markNodeLength,
    headlessEditor,
  ]);

  return <></>;
};

export default StateLoaderPlugin;
