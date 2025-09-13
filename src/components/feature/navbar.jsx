import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Logout from "./logout";

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink to="/">Početna stranica</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink to="/transactions-list">
            Lista transakcija
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink to="/create-transaction">
            Kreiraj transakciju
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <Logout />
    </NavigationMenu>
  );
}
