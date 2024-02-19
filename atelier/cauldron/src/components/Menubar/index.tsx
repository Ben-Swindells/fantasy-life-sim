import { Link } from "react-router-dom";

type MenubarProps = {
  children: React.ReactNode;
};

type MenubarButtonProps = {
  label: string;
  slug: string;
};

export const Menubar = ({ children }: MenubarProps) => {
  return <div className="w-72 h-full shadow-2xl">{children}</div>;
};

export const MenubarButton = ({ label, slug }: MenubarButtonProps) => {
  return (
    <Link to={slug}>
      <button className="p-2  flex justify-center items-center bg-indigo-700 hover:bg-gradient-to-l from-indigo-500  to-blue-400 w-full text-white hover:text-white">
        {label}
      </button>
    </Link>
  );
};
