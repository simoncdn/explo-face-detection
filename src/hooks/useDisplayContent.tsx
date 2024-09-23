import { useState } from "react";

export default function useDisplayContent() {
  const [showContent, setShowContent] = useState(false);

  function toggleShowContent() {
    setShowContent((prev) => !prev);
  }

  return { showContent, toggleShowContent };
}
