import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ApplyModal } from "./ApplyModal";

interface Preset { destination?: string; category?: string }
interface Ctx { open: (p?: Preset) => void; close: () => void }

const ApplyCtx = createContext<Ctx | null>(null);

export function ApplyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<Preset>({});

  const open = useCallback((p?: Preset) => { setPreset(p ?? {}); setIsOpen(true); }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const ctx = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ApplyCtx.Provider value={ctx}>
      {children}
      <ApplyModal isOpen={isOpen} onClose={close} preset={preset} />
    </ApplyCtx.Provider>
  );
}

export function useApplyModal() {
  const c = useContext(ApplyCtx);
  if (!c) throw new Error("useApplyModal must be used within ApplyModalProvider");
  return c;
}
