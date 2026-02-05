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
    paternal_surname: '',
    maternal_surname: '',
    email: '',
    phone: '',
    document_number: '',
    document_type: '',
    direction: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  {
    /* focus expand */
  }
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          apellidoPaterno: formData.paternal_surname,
          apellidoMaterno: formData.maternal_surname,
          email: formData.email,
          telefono: formData.phone,
          documentNumber: formData.document_number,
          documentType: formData.document_type,
          direction: formData.direction,
          serviceType: service.title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar los datos');
      }

      Swal.fire({
        title: '¡Éxito!',
        text: 'Tu información ha sido guardada. Nos contactaremos contigo en breve.',
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
          setFormData({
            name: '',
            email: '',
            phone: '',
            direction: '',
            paternal_surname: '',
            maternal_surname: '',
            document_number: '',
            document_type: '',
          });
          setIsSubmitting(false);
          onClose();
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar los datos';
      
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#dc2626',
        background: '#f9fafb',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-2xl font-bold text-gray-900',
          htmlContainer: 'text-gray-600',
        },
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay oscuro - SIN animación para evitar parpadeos */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

      {/* Modal con animación */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform max-h-[90vh] overflow-y-auto"
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
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Servicio seleccionado - Mejorado */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Trámite seleccionado
                  </p>
                  <p className="font-bold text-gray-900 text-base leading-tight mt-1">
                    {service.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Fila 1: Nombre y Apellido Paterno */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Nombre - Floating Label */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer"
                  />
                  <motion.label
                    htmlFor="name"
                    animate={{
                      y: focusedField === 'name' || formData.name ? -28 : 0,
                      scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-text flex items-center gap-2 pointer-events-none"
                  >
                    <User className="w-4 h-4 text-blue-600" />
                    Nombres
                  </motion.label>
                </div>

                {/* Apellido Paterno - Floating Label */}
                <div className="relative">
                  <input
                    type="text"
                    id="paternal_surname"
                    name="paternal_surname"
                    value={formData.paternal_surname}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('paternal_surname')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer"
                  />
                  <motion.label
                    htmlFor="paternal_surname"
                    animate={{
                      y: focusedField === 'paternal_surname' || formData.paternal_surname ? -28 : 0,
                      scale: focusedField === 'paternal_surname' || formData.paternal_surname ? 0.85 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-text pointer-events-none"
                  >
                    Apellido Paterno
                  </motion.label>
                </div>
              </div>

              {/* Fila 2: Apellido Materno y Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Apellido Materno - Floating Label */}
                <div className="relative">
                  <input
                    type="text"
                    id="maternal_surname"
                    name="maternal_surname"
                    value={formData.maternal_surname}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('maternal_surname')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer"
                  />
                  <motion.label
                    htmlFor="maternal_surname"
                    animate={{
                      y: focusedField === 'maternal_surname' || formData.maternal_surname ? -28 : 0,
                      scale: focusedField === 'maternal_surname' || formData.maternal_surname ? 0.85 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-text pointer-events-none"
                  >
                    Apellido Materno
                  </motion.label>
                </div>

                {/* Email - Floating Label */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer"
                  />
                  <motion.label
                    htmlFor="email"
                    animate={{
                      y: focusedField === 'email' || formData.email ? -28 : 0,
                      scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-text flex items-center gap-2 pointer-events-none"
                  >
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email
                  </motion.label>
                </div>
              </div>

              {/* Fila 3: Teléfono y Tipo de Documento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Teléfono - Floating Label */}
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer"
                  />
                  <motion.label
                    htmlFor="phone"
                    animate={{
                      y: focusedField === 'phone' || formData.phone ? -28 : 0,
                      scale: focusedField === 'phone' || formData.phone ? 0.85 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-text flex items-center gap-2 pointer-events-none"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                    Teléfono
                  </motion.label>
                </div>

                {/* Tipo de Documento - Floating Label */}
                <div className="relative">
                  <select
                    name="document_type"
                    id="document_type"
                    value={formData.document_type}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('document_type')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer appearance-none"
                  >
                    <option value="">Seleccione</option>
                    <option value="rut">RUT</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="otro">Otro</option>
                    <option value="sin_documento">Sin Documento</option>
                  </select>
                  <motion.label
                    htmlFor="document_type"
                    animate={{
                      y: focusedField === 'document_type' || formData.document_type ? -28 : 0,
                      scale: focusedField === 'document_type' || formData.document_type ? 0.85 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-pointer pointer-events-none"
                  >
                    Tipo de Documento
                  </motion.label>
                </div>
              </div>

              {/* Fila 4: Número de documento */}
              <div className="relative">
                <input
                  type="text"
                  id="document_number"
                  name="document_number"
                  value={formData.document_number}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('document_number')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer"
                />
                <motion.label
                  htmlFor="document_number"
                  animate={{
                    y: focusedField === 'document_number' || formData.document_number ? -28 : 0,
                    scale: focusedField === 'document_number' || formData.document_number ? 0.85 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-text pointer-events-none"
                >
                  Número de documento (opcional)
                </motion.label>
              </div>

              {/* Fila 5: Dirección */}
              <div className="relative">
                <input
                  type="text"
                  id="direction"
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('direction')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder=" "
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 peer"
                />
                <motion.label
                  htmlFor="direction"
                  animate={{
                    y: focusedField === 'direction' || formData.direction ? -28 : 0,
                    scale: focusedField === 'direction' || formData.direction ? 0.85 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute left-4 top-4 text-sm font-semibold text-gray-700 bg-white px-1 cursor-text pointer-events-none"
                >
                  Dirección
                </motion.label>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6">
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
