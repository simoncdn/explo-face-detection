import { useState } from "react";

export default function useDisplayContent() {
  const [showContent, setShowContent] = useState(true);

  function toggleShowContent() {
    setShowContent((prev) => !prev);
  }

  return { showContent, toggleShowContent };
}
