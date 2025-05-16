"use client"

import { useState, useEffect } from "react"
import { CallRequestModal } from "@/components/modals/call-request-modal"
import { ContactFormModal } from "@/components/modals/contact-form-modal"

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CallRequestModal />
      <ContactFormModal />
    </>
  )
}
