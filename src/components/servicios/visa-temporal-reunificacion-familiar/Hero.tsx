import { ChevronDown } from 'lucide-react';
import { getImagePath } from '@/lib/utils';

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="
                absolute 
                inset-0 
                bg-cover 
                bg-center 
                bg-no-repeat"
        style={{
          backgroundImage: 
          `url('${getImagePath('/images/unificacion.png')}')`,
        }}
      >
        {/* Overlay Oscuro */}
        <div
          className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-red-500/30 
                    to-red-600/80
                    "
        />
      </div>

      {/* Contenido */}
      <div
        className="
            relative
            z-10
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-white
            text-center
            px-4
            "
      >
        <h1
          className="
                text-5xl
                md:text-6xl
                font-bold
                mb-6
                "
        >
          Visa Temporal para Reunificación Familiar
        </h1>
        <p
          className="
                    text-xl 
                    md:text-2xl 
                    mb-8 
                    max-w-2xl
                    "
        >
          Asesoría especializada para obtener tu visa temporal en Chile
        </p>
      </div>
      <div 
        className="
            absolute 
            bottom-8 
            left-1/2 
            transform 
            -translate-x-1/2 
            animate-bounce
            "
        >
            <ChevronDown
                className="
                w-6
                h-6
                text-white
                "
            />
      </div>
    </section>
  );
}
