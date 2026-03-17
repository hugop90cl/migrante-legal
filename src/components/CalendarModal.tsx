'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import Swal from 'sweetalert2';

const lawyers = [
  {
    id: 1,
    name: 'Elizabeth Acuña Varas',
    role: 'Abogada Migratoria',
  },
  {
    id: 2,
    name: 'Felipe Rivera',
    role: 'Abogado',
  },
];

const availableTimes = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
];

// Calcular fecha de Pascua usando el algoritmo de Computus
// Válido para años 1583-9956
const calculateEaster = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

// Generar feriados de Chile para un año específico (dinámicamente)
const generateChileanHolidays = (year: number): Record<string, string> => {
  const holidays: Record<string, string> = {
    [`${year}-01-01`]: 'Año Nuevo',
    [`${year}-05-01`]: 'Día Nacional del Trabajo',
    [`${year}-05-21`]: 'Día de las Glorias Navales',
    [`${year}-06-21`]: 'Día Nacional de los Pueblos Indígenas',
    [`${year}-06-29`]: 'San Pedro y San Pablo',
    [`${year}-07-16`]: 'Día de la Virgen del Carmen',
    [`${year}-08-15`]: 'Asunción de la Virgen',
    [`${year}-09-18`]: 'Independencia Nacional',
    [`${year}-09-19`]: 'Día de las Glorias del Ejército',
    [`${year}-10-12`]: 'Encuentro de Dos Mundos',
    [`${year}-10-31`]: 'Día de las Iglesias Evangélicas y Protestantes',
    [`${year}-11-01`]: 'Día de Todos los Santos',
    [`${year}-12-08`]: 'Inmaculada Concepción',
    [`${year}-12-25`]: 'Navidad',
  };

  // Calcular Viernes Santo y Sábado Santo usando Pascua
  const easter = calculateEaster(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  const holySaturday = new Date(easter);
  holySaturday.setDate(easter.getDate() - 1);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  holidays[formatDate(goodFriday)] = 'Viernes Santo';
  holidays[formatDate(holySaturday)] = 'Sábado Santo';

  return holidays;
};

// Funciones que generan feriados dinámicamente según el año
const isHoliday = (date: Date): boolean => {
  const dateString = date.toISOString().split('T')[0];
  const year = date.getFullYear();
  const holidays = generateChileanHolidays(year);
  return dateString in holidays;
};

const getHolidayName = (date: Date): string => {
  const dateString = date.toISOString().split('T')[0];
  const year = date.getFullYear();
  const holidays = generateChileanHolidays(year);
  return holidays[dateString] || '';
};

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (appointmentData: AppointmentData) => void;
  userEmail: string;
  userName: string;
}

export interface AppointmentData {
  lawyerId: number;
  lawyerName: string;
  date: Date;
  time: string;
}

export default function CalendarModal({
  isOpen,
  onClose,
  onConfirm,
  userEmail,
  userName,
}: CalendarModalProps) {
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMonthOffset, setSelectedMonthOffset] = useState(0);

  // Generar meses con sus días disponibles
  const generateCalendarMonths = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const months = [];

    // Generar meses hasta diciembre del año actual
    const monthsToGenerate = 12 - currentMonth; // Desde mes actual hasta diciembre
    for (let monthOffset = 0; monthOffset < monthsToGenerate; monthOffset++) {
      const monthDate = new Date(currentYear, currentMonth + monthOffset, 1);
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();

      // Obtener el primer día del mes y número de días
      const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=domingo, 1=lunes, etc
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const days = [];

      // Ajustar para calendario lunes-domingo (en Chile)
      // getDay: 0=dom, 1=lun, ..., 6=sab
      // En grid lun-dom: 0=lun, 1=mar, ..., 5=sab, 6=dom
      const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

      // Agregar espacios vacíos para los días antes del primer día del mes
      for (let i = 0; i < adjustedFirstDay; i++) {
        days.push(null);
      }

      // Agregar días del mes
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);

        const dayOfWeek = date.getDay(); // 0=domingo, 1=lunes, 5=viernes, 6=sábado
        const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5; // Solo lunes-viernes son seleccionables
        const weekend = dayOfWeek === 0 || dayOfWeek === 6;
        const holiday = isHoliday(date);

        // Determinar estados
        const isAvailable = isWeekday && date >= today && !holiday;
        const isPast = date < today && isWeekday;

        days.push({
          date: date,
          available: isAvailable,
          isPast: isPast,
          isWeekend: weekend,
          isHoliday: holiday,
          dayOfWeek: dayOfWeek,
        });
      }

      months.push({
        monthName: monthDate.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' }),
        monthOffset: monthOffset,
        days: days,
      });
    }

    return months;
  };

  const calendarMonths = generateCalendarMonths();
  const currentMonth = calendarMonths[selectedMonthOffset];

  const handleConfirm = () => {
    if (!selectedLawyer || !selectedDate || !selectedTime) {
      Swal.fire('Error', 'Por favor, selecciona abogado, fecha y hora', 'error');
      return;
    }

    const selectedLawyerData = lawyers.find((l) => l.id === selectedLawyer);

    const appointmentData: AppointmentData = {
      lawyerId: selectedLawyer,
      lawyerName: selectedLawyerData?.name || '',
      date: selectedDate,
      time: selectedTime,
    };

    onConfirm(appointmentData);
    handleClose();
  };

  const handleClose = () => {
    setSelectedLawyer(null);
    setSelectedDate(null);
    setSelectedTime(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 60 }}
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-red-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Agendar Cita</h2>
          </div>
          <button onClick={handleClose} className="text-2xl hover:opacity-80 transition-opacity">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda: Selector de abogado y calendario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seleccionar Abogado */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Selecciona Abogado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lawyers.map((lawyer) => (
                  <button
                    key={lawyer.id}
                    onClick={() => setSelectedLawyer(lawyer.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedLawyer === lawyer.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-blue-400'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{lawyer.name}</p>
                    <p className="text-sm text-gray-600">{lawyer.role}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Seleccionar Fecha */}
            {selectedLawyer && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">2. Selecciona Fecha</h3>
                  {/* Selector de Mes */}
                  <select
                    value={selectedMonthOffset}
                    onChange={(e) => {
                      setSelectedMonthOffset(Number(e.target.value));
                      setSelectedDate(null); // Reset fecha seleccionada al cambiar mes
                    }}
                    className="px-3 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {calendarMonths.map((month) => (
                      <option key={month.monthOffset} value={month.monthOffset}>
                        {month.monthName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calendario del mes seleccionado */}
                {currentMonth && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    {/* Encabezados de días de semana (lunes a domingo - formato Chile) */}
                    <div className="grid grid-cols-7 gap-1 mb-3">
                      {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                        <div key={day} className="text-center text-xs font-semibold text-gray-600">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Días del mes (toda la semana) */}
                    <div className="grid grid-cols-7 gap-1">
                      {currentMonth.days.map((dayData, dayIndex) => (
                        <button
                          key={dayIndex}
                          onClick={() => dayData?.available && setSelectedDate(dayData.date)}
                          disabled={
                            !dayData ||
                            !dayData.available ||
                            dayData.isWeekend ||
                            dayData.isPast ||
                            dayData.isHoliday
                          }
                          className={`aspect-square rounded text-sm font-medium transition-all ${
                            dayData === null
                              ? 'bg-white cursor-default'
                              : dayData.available
                                ? selectedDate?.toDateString() === dayData.date.toDateString()
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                                : dayData.isWeekend || dayData.isPast || dayData.isHoliday
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-white cursor-default'
                          }`}
                          title={
                            dayData?.isHoliday ? `Feriado: ${getHolidayName(dayData.date)}` : ''
                          }
                        >
                          {dayData ? dayData.date.getDate() : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Columna derecha: Resumen */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Seleccionar Hora */}
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Selecciona Hora</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Resumen de Cita - Sticky en pantalla grande */}
              {selectedLawyer && selectedDate && selectedTime ? (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 p-5 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-4 text-center text-lg">Resumen</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-gray-700">Abogado:</span>
                      <span className="text-right text-gray-900 font-medium">
                        {lawyers.find((l) => l.id === selectedLawyer)?.name}
                      </span>
                    </div>
                    <div className="h-px bg-blue-200"></div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-gray-700">Fecha:</span>
                      <span className="text-right text-gray-900 font-medium">
                        {selectedDate.toLocaleDateString('es-CL', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="h-px bg-blue-200"></div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-gray-700">Hora:</span>
                      <span className="text-right text-gray-900 font-medium">{selectedTime}</span>
                    </div>
                    <div className="h-px bg-blue-200"></div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-gray-700">Monto:</span>
                      <span className="text-right text-blue-600 font-bold">$25.000 CLP</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-gray-200 p-5 rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    Completa los datos anteriores para ver el resumen
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 flex gap-3 border-t">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedLawyer || !selectedDate || !selectedTime}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedLawyer && selectedDate && selectedTime
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Ir a Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
