"use client";

import Image from "next/image";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/use-exit-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_sad.svg" alt="Mascot" width={80} height={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, Don&apos;'t Go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div>
            <Button
              variant="primary"
              size="lg"
              onClick={close}
              className="w-full"
            >
              Keep Learning
            </Button>
            <Button
              variant="dangerOutline"
              size="lg"
              onClick={() => {
                close();
                router.push("/learn");
              }}
              className="w-full"
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
