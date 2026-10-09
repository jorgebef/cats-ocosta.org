/**
 * Datos de la asociación. Edita aquí cualquier dato de contacto o identificación:
 * se reutilizan en toda la web (cabecera, pie, contacto y textos legales).
 */
export const SITE = {
  name: 'Cats Ocosta',
  legalName: 'Asociación Colonias Felinas Orihuela Costa (Cats Ocosta)',
  cif: 'G99999999',
  area: 'Orihuela Costa (Alicante)',
  // TODO: sustituir por el correo real de la asociación
  email: 'hola@catsocosta.org',
  whatsapp: {
    display: '+34 606 137 952',
    number: '34606137952',
  },
  teamingUrl: 'https://www.teaming.net/cats-ocasociacioncoloniasfelinasorihuelacosta',
  // Nº de inscripción en el Registro de Asociaciones. Si se deja vacío, no se muestra.
  registryNumber: '',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const

/** Enlace de WhatsApp con un mensaje inicial opcional (lo escribe y envía la propia persona). */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
