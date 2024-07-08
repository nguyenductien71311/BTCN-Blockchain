import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDashboard } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { GrAppsRounded } from "react-icons/gr";
import { FaShuffle } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";

const contents = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
    icon: <MdDashboard size={25} />,
  },
  {
    id: 2,
    name: "Send",
    url: "/dashboard/send",
    icon: <RiCoinsLine size={25} />,
  },
  {
    id: 3,
    name: "History",
    url: "/dashboard/history",
    icon: <FaHistory size={25} />,
  },
];

const Slidebar = () => {
  const pathName = useLocation()?.pathname;

  return (
    <div className="mt-[60px] h-[calc(100vh-60px)] bg-white px-2 py-6 w-[80px] md:w-[250px] fixed">
      {contents?.map((content) => {
        return (
          <TooltipProvider key={content?.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={content?.url}>
                  <div
                    className={`flex items-center justify-center md:justify-start p-4 rounded-md hover:bg-sky-500 hover:text-white ${
                      pathName === content?.url && "bg-sky-500 text-white"
                    }`}
                  >
                    {content?.icon}
                    <p className="ml-3 hidden md:block md:text-md">
                      {content?.name}
                    </p>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{content?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default Slidebar;
