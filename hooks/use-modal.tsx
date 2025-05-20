"use client"

import { create } from "zustand"

type ModalType = "callRequest" | "contactForm" | null

interface ModalStore {
  type: ModalType
  isOpen: boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}))
