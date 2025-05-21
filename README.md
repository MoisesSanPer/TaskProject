
# React + TypeScript + Vite + C# Backend + Azurite + Cosmos DB

Este proyecto combina un frontend moderno construido con **React**, **TypeScript** y **Vite**, junto con un backend robusto desarrollado en **C# (.NET)**. Para la gestión de datos, se utilizan **Azurite** como emulador local de Azure Storage y **Cosmos DB** como base de datos NoSQL en la nube.

## 🧩 Tecnologías utilizadas

### Frontend

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Vite**: Herramienta de desarrollo rápida y moderna.
- **ESLint**: Linter para mantener un código limpio y consistente.

Actualmente, se utilizan dos plugins oficiales para React:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react): Usa Babel para Fast Refresh.
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc): Usa SWC para Fast Refresh.

### Backend

- **C# (.NET)**: Lenguaje y framework para construir APIs RESTful robustas y escalables.
- **ASP.NET Core Web API**: Framework para construir servicios HTTP.

### Base de Datos

- **Azurite**: Emulador local de Azure Storage, ideal para desarrollo y pruebas sin conexión a la nube.
- **Azure Cosmos DB**: Base de datos NoSQL distribuida globalmente, ideal para aplicaciones modernas con alta disponibilidad y baja latencia.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
