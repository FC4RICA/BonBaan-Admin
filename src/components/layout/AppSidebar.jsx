import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Package,
  House,
  ShoppingBag,
  MessageCircle,
  User,
  Inbox,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { SidebarMenuBadge } from "../ui/sidebar";
import logo from "../../assets/images/logo.svg"
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const menuItems = {
  header: [{ title: "คำขอ", url: "/inbox", icon: Inbox }],
  content: [
    { title: "หน้าหลัก", url: "/home", icon: House, subMenu: [] },
    { title: "คำสั่งซื้อ", url: "/orders", icon: ShoppingBag, subMenu: [] },
    {
      title: "บริการ",
      url: "/services",
      icon: Package,
      subMenu: [
        { title: "บริการทั้งหมด", url: "/services", hasChild: false },
        { title: "เพิ่มบริการ", url: "/services/insert" },
        { title: "หมวดหมู่", url: "/services/categories" },
        { title: "รีวิว", url: "/services/reviews" },
      ],
    },
    { title: "พูดคุย", url: "/chat", icon: MessageCircle, subMenu: [] },
    { title: "ผู้ใช้", url: "/users", icon: User, subMenu: [] }
  ],
  footer: [{ title: "ออกจากระบบ", url: "/logout", icon: LogOut }],
};

const AppSidebar = () => {
  const location = useLocation().pathname;
  const { user } = useContext(UserContext);

  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <img className="h-12 px-3" src={logo} alt="BonBaan" />
        </div>
        <SidebarMenu>
          {menuItems.header.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                variant="secondary"
                asChild
                isActive={location.includes(item.url)}
              >
                <Link to={item.url}>
                  <item.icon size={32} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuBadge className="text-white">24</SidebarMenuBadge>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.content.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.includes(item.url)}
                  >
                    <Link to={item.url}>
                      <item.icon size={32} color="#5B5471" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {location.includes(item.url) ? (
                    <SidebarMenuSub>
                      {item.subMenu.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={
                              location.includes(subItem.url) &&
                              (subItem.hasChild ||
                                location.endsWith(subItem.url))
                                ? true
                                : false
                            }
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : (
                    <></>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User size={32} color="#5B5471" />
                  {user.username}
                  <ChevronRight className="ml-auto" size={32} color="#5B5471" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                sideOffset={16}
                className="z-50 min-w-32 overflow-hidden rounded-md bg-white p-1 text-neutral-950 shadow-md
                data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 slide-in-from-left-2"
              >
                {menuItems.footer.map((item) => (
                  <DropdownMenuItem
                    asChild
                    key={item.url}
                    className="text-[--w] relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
                  >
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon size={24} color="#5B5471" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
