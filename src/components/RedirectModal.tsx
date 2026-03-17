'use client';

import React, { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

export default function RedirectModal({ isOpen, onClose, serviceTitle }: RedirectModalProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirigir después de que llegue a 0
          window.open('https://agenda.migrantelegal.cl', '_blank');
          onClose();
          return 3;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm mx-4 animate-fade-in-up">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenido */}
        <div className="text-center">
          {/* Icono */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-4">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Agendar Reunión
          </h2>

          {/* Descripción */}
          <p className="text-gray-600 mb-2">
            Serás redirigido a agendar tu reunión para:
          </p>
          <p className="text-lg font-semibold text-blue-600 mb-6">
            {serviceTitle}
          </p>

          {/* Countdown */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-2">Redirigiendo en:</p>
            <p className="text-4xl font-bold text-blue-600">
              {countdown}
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                window.open('https://agenda.migrantelegal.cl', '_blank');
                onClose();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Ir ahora
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
