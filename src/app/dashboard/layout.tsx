import { BiMenu } from "react-icons/bi";
import { CgMoreAlt } from "react-icons/cg";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <BiMenu />
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Dashboard App</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <CgMoreAlt />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
