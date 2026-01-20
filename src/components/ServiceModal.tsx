'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, Mail, Phone, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

interface Service {
  id: number;
  title: string;
  icon?: React.ComponentType;
  description?: string;
  buttonColor?: string;
  color?: string;
}

interface Props {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Datos del formulario:', formData);
      console.log('Servicio seleccionado:', service);

      Swal.fire({
        title: '¡Éxito!',
        text: 'Tu formulario ha sido enviado. Nos contactaremos contigo en breve.',
        icon: 'success',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0A4D8C',
        background: '#f9fafb',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-2xl font-bold text-gray-900',
          htmlContainer: 'text-gray-600',
        },
        didClose: () => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setIsSubmitting(false);
          onClose();
        },
      });
    }, 500);
  };

  return (
    <>
      {/* Overlay oscuro - SIN animación para evitar parpadeos */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal con animación */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Agendar Reunión</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-500/30 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-5">
            {/* Servicio seleccionado - Mejorado */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Trámite seleccionado</p>
                  <p className="font-bold text-gray-900 text-base leading-tight mt-1">{service.title}</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 placeholder-gray-400"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Teléfono */}
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 placeholder-gray-400"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-200 hover:scale-105 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}

