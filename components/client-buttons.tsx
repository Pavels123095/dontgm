"use client"

import { useModal } from "@/hooks/use-modal"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import type { ReactNode } from "react"

interface ClientButtonsProps extends ButtonProps {
  buttonType: "callRequest" | "contactForm"
  children: ReactNode
}

export default function ClientButtons({ buttonType, children, ...props }: ClientButtonsProps) {
  const { onOpen } = useModal()

  return (
    <Button {...props} onClick={() => onOpen(buttonType)}>
      {children}
    </Button>
  )
}
