import App from "@/App";
import FaceApi from "@/pages/faceApi";
import TensorFlow from "@/pages/tensorFlow";
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
      {
        path: "/tensor-flow",
        element: <TensorFlow />,
      },
    ],
  },
]);

export default router;
