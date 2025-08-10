// render on client

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";
import { TreeViewWrapper } from "./TreeViewWrapper";

export default function TreeViewPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeViewWrapper
      viewClassName="tree-view-output"
      treeTypeButtonClassName="hide"
      timeTravelPanelClassName="hide"
      timeTravelButtonClassName="hide"
      timeTravelPanelSliderClassName="hide"
      timeTravelPanelButtonClassName="hide"
      editor={editor}
    />
  );
}
