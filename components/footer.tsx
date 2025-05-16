import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
         <footer className="bg-gray-900 text-white">
           <div className="container mx-auto px-4 py-8">
             <div className="flex flex-col md:flex-row justify-between">
               <div className="mb-6 md:mb-0">
                 <h3 className="text-lg font-semibold mb-4">Наши контакты</h3>
                 <div className="space-y-2">
                   <p className="flex items-start">
                     <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                     <span>г. Ростов-на-Дону, ул. Текучева, д. 139</span>
                   </p>
                   <p className="flex items-center">
                     <Phone className="h-5 w-5 text-blue-400 mr-2" />
                     <a href="tel:+78632000000" className="hover:text-blue-400 transition-colors">
                       +7 (863) 200-00-00
                     </a>
                   </p>
                   <p className="flex items-center">
                     <Mail className="h-5 w-5 text-blue-400 mr-2" />
                     <a href="mailto:info@dongidro.ru" className="hover:text-blue-400 transition-colors">
                       info@dongidro.ru
                     </a>
                   </p>
                 </div>
               </div>
               <div>
                 <div className="h-48 relative">
                   <Image
                     src="/images/map.jpg"
                     alt="Карта"
                     width={150}
                     height={150}
                     className=""
                   />
                 </div>
               </div>
             </div>
             <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
               <p>© {new Date().getFullYear()} АО «Донгидрогидромеханизация». Все права защищены.</p>
             </div>
           </div>
         </footer>
  )
}
