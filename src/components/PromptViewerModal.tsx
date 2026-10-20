import React, { useState } from 'react';
import { X, Copy, Check, FileText, Sparkles } from 'lucide-react';
import { playLoveChime } from '../utils/audio';

interface PromptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptViewerModal: React.FC<PromptViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullPromptText = `PROMPT COMPLETO Y DETALLADO: APLICACIÓN WEB INTERACTIVA & ROMÁNTICA

Actúa como un diseñador de experiencias digitales y desarrollador frontend experto. Desarrolla una página web interactiva, ultra romántica y minimalista para mi novia, construida en React + Tailwind CSS con una cuidada dirección de arte.

1. CONCEPTO VISUAL & PALETA DE COLOR:
- Estilo: Minimalista, editorial, cálido y elegante (estética de diario de amor contemporáneo).
- Paleta: Amarillos suaves y miel (#FFFDF7 canvas neutro, #FEFCE8 marfil suave, #FEF08A amarillo mantequilla, #FDE047 amarillo girasol, #D97706 ámbar dorado y acentos sutiles terracota/rosa).
- Tipografía: Titulares en tipografía serif clásica y poética ('Cormorant Garamond' o 'Playfair Display') y cuerpo de texto en geométrica limpia ('Plus Jakarta Sans').
- Elementos Florales: Siluetas vectoriales delicadas de Girasoles (su flor favorita) y Lirios integradas de forma sutil en esquinas, separadores y sellos de cera.

2. SIMBOLOGÍA CENTRAL: "√-1♡U∞":
- El símbolo del amor: "√-1♡U∞" (donde √-1 = i [número imaginario / yo], ♡ = amor, U = tú, ∞ = infinito; significado: "I Love You Infinitely").
- Debe figurar en el encabezado, en tarjetas emblemáticas y contar con un botón interactivo prominente.
- Al pulsar el botón con "√-1♡U∞": Se dispara una animación sutil con lluvia de pétalos dorados/confeti suave, sonido armónico sintetizado (Web Audio API) y un mensaje aleatorio de amor profundo con contador de amor enviado.

3. CONTADOR DE DÍAS EN VIVO (DESDE EL 21 DE SEPTIEMBRE DE 2024):
- Reloj en tiempo real que contabiliza días, horas, minutos y segundos exactos transcurridos desde el 21 de septiembre de 2024 (fecha de inicio de la relación).
- Continúa sumando y actualizándose cada segundo con dígitos tabulares y animaciones de latido suaves.

4. MENÚ PRINCIPAL E INTERACTIVIDAD EN CADA CLIC:
- Cada vez que el usuario hace clic en una sección o botón del menú, se activa una micro-animación floral y se revela un mensaje de amor personalizado y único para esa categoría.
- Generación de pequeños pétalos flotantes que siguen los clics por toda la pantalla.

5. SECCIONES Y PORTADAS BASADAS EN LAS IMÁGENES PROPORCIONADAS:
- Portada de Categoría 1: "Galería de Fotos & Polaroids"
  * Portada: Ramo de girasoles con polaroids físicos (/assets/aistudio/image_48f99536.png).
  * Contenido: Rejilla masonry con fotos reales, filtros por categoría, visor Lightbox con descripción detallada de cada momento y contador interactivo de corazones.
- Portada de Categoría 2: "Recuerdos Compartidos (Cronología)"
  * Portada: Muro de polaroids con fechas a mano (/assets/aistudio/image_a9b72546.png).
  * Contenido: Línea de tiempo interactiva con hitos: el inicio del 21/09/2024, chapuzón en el río y cascada (/assets/aistudio/image_5df45e9c.png), paseo en barco en Punta Cana (/assets/aistudio/image_d9cc0cad.png), noche de luces (/assets/aistudio/image_f87d6c65.png), y sesión de cumpleaños (/assets/aistudio/image_647ac9a4.png).
- Portada de Categoría 3: "Nuestras Cosas Favoritas para Hacer"
  * Portada: Noche pintando vinilos de La Noche Estrellada (/assets/aistudio/image_73fecbc1.png).
  * Contenido: Tarjetas con nuestras 6 actividades preferidas (pintar arte, ríos/cascadas, hornear pasteles con corazones rojos, regalar girasoles, polaroids, cuddles eternos).
- Portada de Categoría 4: "Mensajes Personalizados & Trofeo"
  * Portada: El beso más tierno y cálido (/assets/aistudio/image_eae802ff.png).
  * Contenido: Carta abierta al amor de mi vida, dispensador de notas aleatorias de amor y la tarjeta interactiva de la copa "#1 Novia Más Preciosa del Mundo" (/assets/aistudio/image_2f085ec6.png) con botón de reclamar caricias.
- Sección 5: "Sección Oculta / Cofre de Notas Secretas"
  * Acceso protegido por clave romántica (código: 2109, alusivo al 21 de septiembre).
  * Permite abrir cartas estilo pergamino con sello de cera floral.
  * Incluye un editor donde el novio puede escribir NUEVAS notas de amor secretas que se guardan persistentemente en localStorage con fecha y sello a elegir (girasol, lirio, corazón, infinito).

6. DETALLES Y TONO:
- Todo en español con redacción dulce, cariñosa, respetuosa y profundamente enamorada.
- Sin textos de relleno ("Lorem ipsum"), utilizando historias basadas en los momentos reales de las imágenes.`;

  const handleCopy = () => {
    playLoveChime();
    navigator.clipboard.writeText(fullPromptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-[#FFFDF9] border border-amber-300 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-950">
                Prompt Completo y Detallado
              </h3>
              <p className="text-xs text-amber-800/80">
                El prompt maestro con toda la arquitectura, paleta, imágenes y requisitos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-amber-100/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto py-4 my-2">
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 text-xs font-mono text-stone-800 whitespace-pre-wrap leading-relaxed select-all">
            {fullPromptText}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-amber-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-amber-800 italic flex items-center gap-1 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Listo para copiar y conservar</span>
          </span>

          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-semibold rounded-xl text-xs shadow-xs transition-all flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar Prompt Completo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
