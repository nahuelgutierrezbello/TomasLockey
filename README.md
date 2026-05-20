# El Picazo · Tomas Lockey — Landing estática

Versión convertida a landing page de una sola página.

## Estructura

```txt
el-picazo-landing/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── logo.png
│       ├── placeholder-hero.svg
│       ├── placeholder-photo.svg
│       └── og-el-picazo.svg
└── README.md
```

## Cómo abrirlo

Abrir `index.html` directamente en el navegador.

También se puede correr local con Python:

```bash
python -m http.server 3000
```

Y abrir:

```txt
http://localhost:3000
```

## Qué se cambió

- Se eliminó Node: no hay `package.json`, dependencias, npm ni proceso de build.
- Se unificaron las páginas en una landing única.
- El HTML, CSS y JavaScript quedaron separados.
- La navegación funciona por anclas internas: `#curso`, `#consulta`, `#consultoria`, `#contacto`.
- Se mantuvo el diseño base, la paleta, tipografías, animaciones y CTAs a WhatsApp.

## Dónde editar datos clave

### WhatsApp

Editar en `assets/js/main.js`:

```js
const TOMAS_WHATSAPP = '5491167898280';
```

### Imágenes

Reemplazar archivos dentro de `assets/img/` o cambiar los `src` en `index.html`.

### Checkout del curso

Buscar en `index.html`:

```html
data-hotmart-placeholder data-checkout-url="#"
```

Cuando esté el link real, reemplazar `#` por la URL del checkout.
