import { createCn } from 'cn/config'

/**
 * Une clases de Tailwind resolviendo conflictos. Registra las utilidades propias
 * de globals.css para que no se confundan con colores:
 * - `bg-tone-*` son fondos completos (color + texturas) y sustituyen a cualquier `bg-<color>`.
 * - `bg-paws` solo añade la textura de huellas, compatible con un color de fondo.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      'bg-color': [{ 'bg-tone': ['peach', 'sand', 'green', 'ember', 'footer'] }],
      'bg-image': ['bg-paws'],
    },
  },
})
