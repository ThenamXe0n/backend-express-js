import { HomeIcon, Lock } from "lucide-react";
import { Link } from "react-router";
import { routePath } from "../../routes/routePath";


function UnauthorizedPage() {
  return (
    <div className="flex flex-col gap-y-3  items-center justify-center h-screen w-screen">
      <Lock color="red" size={42}/>
      <h5 className="text-2xl font-bold">This Page is Unauthorized !!</h5>
      <Link to={routePath.HOME} className="bg-black gap-x-3  flex items-center p-2 text-white rounded-lg">
        <HomeIcon/> <span>Back to Home</span>
      </Link>
    </div>
  );
}

export default UnauthorizedPage;
