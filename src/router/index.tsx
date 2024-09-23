import App from "@/App";
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
      // {
      //   path: "/face-api",
      //   element: <FaceApi />,
      // },
      {
        path: "/tensorFlow",
        element: <TensorFlow />,
      },
    ],
  },
]);

export default router;
