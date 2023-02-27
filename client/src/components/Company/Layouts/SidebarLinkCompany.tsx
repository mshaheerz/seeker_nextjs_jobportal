
type objtype={
    text:string,
    active:boolean,
    Icon:any
}
function SidebarLinkCompany({Icon, text,active}:objtype) {
  return (
    <div className={`text-[#d9d9d9] flex items-center justify-center
    
    xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
        <Icon className="h-7 "/>
        <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarLinkCompany