import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createListNode, $createListItemNode } from "@lexical/list";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isElementNode,
} from "lexical";
import * as React from "react";

interface StateLoaderPluginProps {
  predefinedStrings: Array<{ type: string; text: string }>;
  delay?: number;
}

const StateLoaderPlugin: React.FC<StateLoaderPluginProps> = ({
  predefinedStrings,
  delay = 10,
}) => {
  const [editor] = useLexicalComposerContext();
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [currentStringIndex, setCurrentStringIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);

  React.useEffect(() => {
    if (!isInitialized) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        if (delay === 0) {
          predefinedStrings.forEach((item) => {
            if (item.type === "heading") {
              const newNode = $createHeadingNode("h1");
              newNode.append($createTextNode(item.text));
              root.append(newNode);
            } else if (item.type === "paragraph") {
              const paragraphNode = $createParagraphNode();
              paragraphNode.append($createTextNode(item.text));
              root.append(paragraphNode);
            } else if (item.type === "list") {
              const listNode = $createListNode("bullet");
              root.append(listNode);
            } else if (item.type === "listitem") {
              const children = root.getChildren();
              const lastNode = children[children.length - 1];
              const listItemNode = $createListItemNode();
              listItemNode.append($createTextNode(item.text));
              if ($isElementNode(lastNode)) {
                lastNode.append(listItemNode);
              }
            }
          });
          setIsFinished(true);
        }
      });
      setIsInitialized(true);
    }
  }, [editor, isInitialized, delay, predefinedStrings]);

  React.useEffect(() => {
    if (
      !isInitialized ||
      isFinished ||
      delay === 0 ||
      currentStringIndex >= predefinedStrings.length
    )
      return;

    const interval = setInterval(() => {
      editor.update(() => {
        const root = $getRoot();
        const currentItem = predefinedStrings[currentStringIndex];
        if (!currentItem) return;

        const character = currentItem.text[currentCharIndex];

        if (currentCharIndex === 0) {
          if (currentItem.type === "heading") {
            const newNode = $createHeadingNode("h1");
            root.append(newNode);
          } else if (currentItem.type === "paragraph") {
            const paragraphNode = $createParagraphNode();
            root.append(paragraphNode);
          } else if (currentItem.type === "list") {
            const listNode = $createListNode("bullet");
            root.append(listNode);
          } else if (currentItem.type === "listitem") {
            const children = root.getChildren();
            const lastNode = children[children.length - 1];
            const listItemNode = $createListItemNode();
            if ($isElementNode(lastNode)) {
              lastNode.append(listItemNode);
            }
          }
        }

        if (character && currentItem.type !== "list") {
          const children = root.getChildren();
          if (currentItem.type === "listitem") {
            const listNode = children[children.length - 1];
            if ($isElementNode(listNode)) {
              const listItems = listNode.getChildren();
              const currentListItem = listItems[listItems.length - 1];
              if ($isElementNode(currentListItem)) {
                currentListItem.append($createTextNode(character));
              }
            }
          } else {
            const lastNode = children[children.length - 1];
            if ($isElementNode(lastNode)) {
              lastNode.append($createTextNode(character));
            }
          }
        }

        setCurrentCharIndex((prev) => {
          if (prev + 1 >= currentItem.text.length) {
            setCurrentStringIndex((prevIndex) => {
              if (prevIndex + 1 >= predefinedStrings.length) {
                setIsFinished(true);
                return prevIndex;
              }
              return prevIndex + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      });
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [
    editor,
    isInitialized,
    currentStringIndex,
    currentCharIndex,
    isFinished,
    delay,
    predefinedStrings,
  ]);

  return <></>;
};
export default StateLoaderPlugin;
