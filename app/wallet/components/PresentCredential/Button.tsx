import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { PresentCredentialDrawerContent } from "./Drawer";

type PresentCredentialButtonProps = {};

export const PresentCredentialButton = ({}: PresentCredentialButtonProps) => {
  return (
    <Drawer>
      <DrawerTrigger
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
      bg-primary text-primary-foreground shadow hover:bg-primary/90 text-white h-9 px-4 py-2 w-full
      "
      >
        証明書の提示
      </DrawerTrigger>
      <PresentCredentialDrawerContent />
    </Drawer>
  );
};
