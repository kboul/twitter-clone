import { SVGProps } from 'react'

interface SidebarRowProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
}

export default function SidebarRow({ Icon, title }: SidebarRowProps) {
  return (
    <div className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 hover:bg-gray-100">
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter">{title}</p>
    </div>
  )
}
