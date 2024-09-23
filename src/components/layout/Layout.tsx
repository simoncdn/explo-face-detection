import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const navItems = [
  {
    name: "Metadata",
    link: "/xmp",
  },
  {
    name: "face-api",
    link: "/face-api",
  },
  {
    name: "tensor-flow",
    link: "/tensor-flow",
  },
];
export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <div className="absolute top-10 left-10 flex gap-2">
        {navItems.map((item) => (
          <Button
            variant={location.pathname === item.link ? "destructive" : "link"}
            asChild
            className="text-white"
            key={item.link}
          >
            <Link to={item.link}>{item.name}</Link>
          </Button>
        ))}
      </div>
      <h2 className="text-4xl font-bold py-6 text-center">Auto crop explo</h2>
      <Outlet />
    </div>
  );
}
