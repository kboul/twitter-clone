import { SVGProps } from "react";

interface SidebarRowProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  onClick?: () => void;
  title: string;
}

export default function SidebarRow({ Icon, onClick, title }: SidebarRowProps) {
  return (
    <div
      className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 hover:bg-gray-100"
      onClick={onClick}>
      <Icon className="h-6 w-6" />
      <p className="hidden text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  );
}
