# Cats Ocosta · Web de la asociación

Web bilingüe (español / inglés) de **Cats Ocosta**, asociación de voluntariado que gestiona las colonias felinas de Orihuela Costa mediante el método CER.

- **Next.js 15** (App Router), todo generado de forma estática
- **Blog en ficheros Markdown** (`content/blog/<idioma>/`), sin base de datos ni panel
- **Tailwind CSS 4** y componentes de **shadcn/ui** (`src/components/ui`)
- **next-intl 4** para la internacionalización, con URLs traducidas

## Puesta en marcha

```bash
cp .env.example .env
pnpm install
pnpm dev
```

La web está en `http://localhost:3000` (redirige a `/es` o `/en` según el idioma del navegador).

## Páginas

| Página | Español | Inglés |
| --- | --- | --- |
| Inicio | `/es` | `/en` |
| Método CER | `/es/metodo-cer` | `/en/tnr-method` |
| Hazte voluntario | `/es/hazte-voluntario` | `/en/volunteer` |
| Blog | `/es/blog` (filtro `?category=`) | `/en/blog` |
| Entrada | `/es/blog/[slug]` | `/en/blog/[slug]` |
| Contacto | `/es/contacto` | `/en/contact` |
| Aviso legal | `/es/aviso-legal` | `/en/legal-notice` |
| Privacidad | `/es/privacidad` | `/en/privacy-policy` |
| Cookies | `/es/cookies` | `/en/cookies` |

Además: `sitemap.xml` con alternativas `hreflang`, `robots.txt` y página 404 traducida.

## Dónde se edita cada cosa

- **Datos de la asociación** (correo, WhatsApp, CIF, enlace de Teaming, nº de registro): `src/config/site.ts`.
- **Textos de la web**: `messages/es.json` y `messages/en.json` (misma estructura en ambos).
- **Blog**: ver la sección siguiente.
- **Estilos**: clases de Tailwind en cada componente. La paleta, las tipografías y las texturas (huellas, gato de fondo, trazo ondulado) están en `src/app/globals.css`. Las piezas de maquetación reutilizables (`Section`, `Container`, `H2`, `Lead`…) están en `src/components/layout.tsx`, y los componentes de shadcn/ui (botones, tarjetas, acordeón, menú lateral…) en `src/components/ui`.

## Blog

Cada entrada es un fichero Markdown en `content/blog/es/` o `content/blog/en/`. El nombre del fichero es la URL de la entrada (`recogida-de-pienso.md` → `/es/blog/recogida-de-pienso`). **Usa el mismo nombre de fichero en los dos idiomas** para que el selector de idioma enlace ambas versiones; si una entrada solo existe en un idioma, no aparece en el otro.

```markdown
---
title: Recogida de pienso: así puedes colaborar
excerpt: Una o dos frases para el listado del blog y los buscadores.
category: fundraising      # grants | actions | campaigns | fundraising | news
date: 2026-09-15
cover: /blog/recogida.jpg  # opcional, imagen dentro de public/
coverAlt: Sacos de pienso  # opcional, descripción de la imagen
draft: false               # opcional, true para ocultarla
---

Texto de la entrada en **Markdown**: títulos con `##`, listas, citas con `>`, enlaces…
```

La categoría alimenta el filtro del blog (`/es/blog?category=campaigns`). Las categorías posibles están en `src/lib/categories.ts` y sus nombres traducidos en `messages/*.json` (`categories`). Tras añadir o editar una entrada hay que volver a desplegar la web (se genera en el build).

## Estructura

```
content/blog/es|en/         Entradas del blog en Markdown
messages/                   Textos ES / EN
public/                     Logotipo e imágenes
src/
  app/[locale]/             Páginas públicas
  app/globals.css           Tema de Tailwind: colores, tipografías y texturas
  components/               Cabecera, pie, ilustraciones, tarjetas…
  components/ui/            Componentes de shadcn/ui
  config/site.ts            Datos de la asociación
  i18n/                     Configuración de next-intl y rutas traducidas
  lib/                      Lectura del blog, categorías y metadatos
```

## Protección de datos (RGPD / LOPDGDD / LSSI-CE)

La web se ha construido para no tratar datos personales de quien la visita:

- **Sin formularios** ni cuentas de visitante. El contacto es por enlaces `mailto:` y `wa.me`, que abren la aplicación de la propia persona.
- **Sin cookies**: next-intl está configurado con `localeCookie: false` (el idioma va en la URL). Por eso no hace falta banner de cookies.
- **Sin terceros al cargar**: tipografías autoalojadas con `next/font`, ilustraciones en SVG propio, sin analítica, sin mapas ni vídeos incrustados.
- Enlaces externos con `rel="noopener noreferrer"` y cabecera `Referrer-Policy`.
- Las entradas del blog no tienen campo de autor. No publiques fotos con personas reconocibles ni ubicaciones exactas de colonias.

Textos de aviso legal, privacidad y cookies incluidos en ambos idiomas. Conviene que los revise una persona experta antes de publicar.

## Antes de publicar

- [ ] Poner el **correo real** en `src/config/site.ts` (ahora hay un marcador: `hola@catsocosta.org`).
- [ ] Sustituir el **CIF** provisional `G99999999` si no es el definitivo y añadir el **nº de registro** de la asociación.
- [ ] Revisar los textos legales y el contenido sobre la Ley 7/2023 y la Ley 2/2023 de la Comunitat Valenciana.
- [ ] Sustituir o borrar las entradas de ejemplo de `content/blog/`.
- [ ] Definir `NEXT_PUBLIC_SITE_URL` con el dominio final.

## Despliegue

Funciona en cualquier hosting con Node.js 20+ (Vercel, Netlify, Railway, un VPS…). No necesita base de datos. Única variable: `NEXT_PUBLIC_SITE_URL`.
