import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export default function SidebarFilters({ corte, setCorte }) {
  const cortes = [
    { id: "all", label: "Todos" },
    { id: "res", label: "Res" },
    { id: "cerdo", label: "Cerdo" },
    { id: "pollo", label: "Pollo" },
  ]

  return (
    
      <Sidebar className="w-40 shrink-0 bg-neutral-950 text-white border-r border-neutral-800 **:text-white">
        <SidebarContent className="bg-neutral-950 px-5 py-6">
          {/* HEADER DEL SIDEBAR */}
            <div className="mb-7">
              <h3 className="text-xs uppercase tracking-widest text-neutral-400">
                Filters
              </h3>
              <div className="mt-3 h-px bg-linear-to-r from-red-600 to-transparent" />
            </div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-neutral-400 tracking-widest text-xs">
              Filtro
            </SidebarGroupLabel>

            <SidebarMenu>
              {cortes.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setCorte(item.id)}
                    className={`
                      ${
                        corte === item.id
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-400 hover:text-white"
                      }
                    `} 
                  >
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

        </SidebarContent>
      </Sidebar>
    
  )
}
