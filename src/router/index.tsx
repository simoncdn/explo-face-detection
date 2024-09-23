import App from "@/App";
import FaceApi from "@/pages/faceApi";
import XmpMetadata from "@/pages/xmpMetadata";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/xmp",
        element: <XmpMetadata />,
      },
      {
        path: "/face-api",
        element: <FaceApi />,
      },
    ],
  },
]);

export default router;
