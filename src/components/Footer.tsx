import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0A4D8C] to-[#063d6b] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Columna 1: Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Migrante Legal</h3>
            <p className="text-gray-400 mb-4">
              Expertos en asesoría legal para regularizar tu situación migratoria en Chile.
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                {/* Telefono */}
                <Phone className="w-5 h-5 mr-3 text-blue-300" />
                <a href="tel:+56991381660" className="hover:text-white transition">
                  +56 9 9138 1660
                </a>
              </li>
              <li className="flex items-center">
                {/* Email */}
                <Mail className="w-5 h-5 mr-3 text-blue-300" />
                <a href="mailto:contacto@migrantelegal.cl" className="hover:text-white transition">
                  contacto@migrantelegal.cl
                </a>
              </li>
              <li className="flex items-center">
                {/* Direccion */}
                <MapPin className="w-5 h-5 mr-3 text-blue-300" />
                <span>Santiago, Chile</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horarios */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horario de Atención</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Lunes a Viernes: 9:00 - 18:00</li>
              <li>Sábado: 10:00 - 14:00</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition text-blue-300 hover:text-white"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-3 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition text-blue-300 hover:text-white"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-3 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition text-blue-300 hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-blue-400/30 mt-10 pt-8">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Migrante Legal. Todos los derechos reservados.</p>
            <div className="flex gap-4 md:justify-end">
              <a href="#" className="hover:text-white transition">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-white transition">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
