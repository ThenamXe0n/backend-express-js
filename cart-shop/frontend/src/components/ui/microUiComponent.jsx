import { ChevronsRight, HomeIcon } from "lucide-react";
import { Link } from "react-router";
import { routePath } from "../../routes/routePath";

export function BreadCrumbs({ path = "shop/bose/BOSE-SLR+-001" }) {
  console.log("path type", path);
  let crumbs = path.split("/").slice(1);
  return (
    <div className="flex items-center gap-x-1 my-4">
      <Link to={routePath.HOME}
        className={`flex items-center gap-x-1 text-black `}
        
      >
        <span>
          <HomeIcon color="black" />
        </span>
        <span>Home</span>
      </Link>
      {crumbs.map((item, itemIndex) => (
        <div
          className={`flex items-center gap-x-1 ${crumbs.length - 1 === itemIndex && "text-cyan-600 font-semibold"} `}
          key={itemIndex}
        >
          <span>
            <ChevronsRight color="black" />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
