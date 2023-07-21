import { create } from "zustand";

interface UsePreModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const usePreModal = create<UsePreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))