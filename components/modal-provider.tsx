"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const CallRequestModal = dynamic(() => import("@/components/modals/call-request-modal").then(mod => mod.CallRequestModal))
const ContactFormModal = dynamic(() => import("@/components/modals/contact-form-modal").then(mod => mod.ContactFormModal))

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
