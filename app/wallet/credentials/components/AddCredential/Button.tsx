import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { CirclePlus } from "lucide-react";
import { AddCredentialDrawerContent } from "./Drawer";

type AddCredentialButtonProps = {
  onClick: () => void;
};

export const AddCredentialButton = ({}: AddCredentialButtonProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center w-[285px] h-36 border-4 border-dotted border-white text-white font-bold bg-none rounded-lg">
        <CirclePlus className="mr-2" />
        クレデンシャルの受け取り
      </DrawerTrigger>
      <AddCredentialDrawerContent />
    </Drawer>
  );
};
