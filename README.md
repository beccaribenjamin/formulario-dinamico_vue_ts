# 🧾 Formulario Dinámico con Vue 3 + Vuetify + TypeScript

Este proyecto permite generar formularios dinámicamente a partir de un archivo JSON de configuración. Los formularios incluyen validaciones automáticas, persistencia de datos y componentes reutilizables usando la Composition API de Vue.

---

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/beccaribenjamin/formulario-dinamico_vue_ts.git
   cd formulario-dinamico_vue_ts
    ```
2. Instalar dependencia y correr el servidor en local:
   ```bash
   npm install
   npm run dev
    ```

## 🧩 Estructura del JSON de Configuración
El archivo de configuración debe tener la siguiente estructura:

```json
{
  "formTitle": "Título del Formulario",
  "fields": [/* campos aquí */]
}
```
Cada campo define un input del formulario y puede tener múltiples validaciones.

## 🧾 Tipos de Campos Disponibles

| Tipo (`type`)  | Componente  | Descripción breve|
|----------------|----------------------|-----------------------------------------------------|
| `text`         | `TextField.vue`      | Campo de texto libre. Se usa para nombres, direcciones, etc. |
| `email`        | `TextField.vue`      | Campo especializado en correos electrónicos.        |
| `password`     | `PasswordField.vue`  | Campo de contraseña, oculta los caracteres.         |
| `number`       | `TextField.vue`      | Campo para ingresar solo valores numéricos.         |
| `checkbox`     | `CheckboxField.vue`  | Casilla de verificación booleana.                   |
| `selectable`   | `SelectableField.vue`| Menú desplegable con opciones definidas.            |
| `date`         | `DateField.vue`      | Campo para seleccionar una fecha.                   |

⚠️ Nota: Asegurate de que cada tipo de campo tenga un componente correspondiente en components/fields/ y esté correctamente mapeado en el FormularioDinamico.vue

### Ejemplo del mapa de Inputs
```js
// Map de componentes
const componentMap: Record<string, any> = {
  text: TextField,
  email: EmailField,
  number: NumberField,
  selectable: SelectableField,
  checkbox: CheckboxField,
  date: DateField,
  password: PasswordField,
}
```

## ✅ Tipos de Validaciones Soportadas

| Tipo (`type`)   | Parámetros        | Descripción                                                                 |
|-----------------|-------------------|-----------------------------------------------------------------------------|
| `required`      | `message`         | Valida que el campo no esté vacío.                                         |
| `minLength`     | `value`, `message`| Valida que el texto tenga una longitud mínima.                             |
| `maxLength`     | `value`, `message`| Valida que el texto no exceda cierta longitud máxima.                      |
| `regex`         | `pattern`, `message`| Valida que el valor cumpla con una expresión regular.                    |
| `complex`       | `rules`, `message`| Valida mediante reglas personalizadas. Por ejemplo: `{ "noNumbers": true }`|

### Ejemplo de validacion `regex` 
```json
{
  "type": "regex",
  "pattern": "^[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+$",
  "message": "Solo se permiten letras y espacios."
}

```

### Ejemplo de validacion `complex` 
```json
{
  "type": "complex",
  "rules": {
    "noNumbers": true
  },
  "message": "No debe contener números."
}

```

🔍 Nota: Las validaciones se definen en el campo validations dentro del JSON de configuración. Pueden combinarse múltiples validaciones en un solo campo.

## Ejemplo completo de JSON

```json
{
  "formTitle": "Formulario de Registro",
  "fields": [
    {
      "name": "nombreCompleto",
      "label": "Nombre completo",
      "type": "text",
      "default": "",
      "required": true,
      "maxLength": 50,
      "validations": [
        {
          "type": "required",
          "message": "El nombre es obligatorio."
        },
        {
          "type": "minLength",
          "value": 3,
          "message": "Debe tener al menos 3 caracteres."
        },
        {
          "type": "regex",
          "pattern": "^[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+$",
          "message": "Solo se permiten letras y espacios."
        }
      ]
    },
    {
      "name": "correo",
      "label": "Correo electrónico",
      "type": "email",
      "default": "",
      "required": true,
      "maxLength": 40,
      "validations": [
        {
          "type": "required",
          "message": "El correo es obligatorio."
        },
        {
          "type": "regex",
          "pattern": "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
          "message": "El formato del correo es inválido."
        }
      ]
    },
    {
      "name": "telefono",
      "label": "Teléfono",
      "type": "number",
      "default": "",
      "required": true,
      "maxLength": 10,
      "validations": [
        {
          "type": "required",
          "message": "El teléfono es obligatorio."
        },
        {
          "type": "minLength",
          "value": 7,
          "message": "Debe tener al menos 7 dígitos."
        }
      ]
    },
    {
      "name": "tipoVivienda",
      "label": "Tipo de vivienda",
      "type": "selectable",
      "default": "",
      "required": true,
      "options": ["Casa", "Departamento", "Otro"],
      "validations": [
        {
          "type": "required",
          "message": "Debe seleccionar una opción."
        }
      ]
    },
    {
      "name": "fechaNacimiento",
      "label": "Fecha de nacimiento",
      "type": "date",
      "default": "",
      "required": true,
      "minDate": "1950-01-01",
      "maxDate": "2023-12-31",
      "validations": [
        {
          "type": "required",
          "message": "La fecha de nacimiento es obligatoria."
        }
      ]
    },
    {
      "name": "aceptaTerminos",
      "label": "Acepto los términos y condiciones",
      "type": "checkbox",
      "default": false,
      "required": true,
      "validations": [
        {
          "type": "required",
          "message": "Debe aceptar los términos y condiciones."
        }
      ]
    },
    {
      "name": "contrasena",
      "label": "Contraseña",
      "type": "password",
      "default": "",
      "required": true,
      "minLength": 6,
      "validations": [
        {
          "type": "required",
          "message": "La contraseña es obligatoria."
        },
        {
          "type": "minLength",
          "value": 6,
          "message": "Debe tener al menos 6 caracteres."
        }
      ]
    }
  ]
}

```