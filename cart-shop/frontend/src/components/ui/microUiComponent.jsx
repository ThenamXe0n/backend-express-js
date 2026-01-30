import { ChevronsRight } from "lucide-react";

export function BreadCrumbs({ path = "shop/bose/BOSE-SLR+-001" }) {
  console.log("path type", path);
  let crumbs = path.split("/").slice(1);
  return (
    <div className="flex items-center gap-x-1 m-4">
      {crumbs.map((item, itemIndex) => (
        <div className={`flex items-center gap-x-1 ${crumbs.length-1===itemIndex && 'text-cyan-600 font-semibold'} `} key={itemIndex}>
          <span>
            <ChevronsRight color="black" />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
