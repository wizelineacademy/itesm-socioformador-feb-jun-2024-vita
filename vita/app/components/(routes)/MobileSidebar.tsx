import { SheetContent, SheetTrigger , Sheet} from "@/components/ui/sheet";
import {ButtonNav} from "../ButtonNav";
import { Menu} from "lucide-react"
import SidebarInfo from "./SidebarInfo";

const MobileSidebar = () => {
  return (
    <div className="flex items-center p-4">
        <Sheet>
            <SheetTrigger>
                <ButtonNav variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </ButtonNav>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SidebarInfo />
            </SheetContent>
        </Sheet>
    </div>
  );
};

export default MobileSidebar;
