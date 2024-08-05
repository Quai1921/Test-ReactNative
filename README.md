# Test React Native

Esta aplicación React Native, permite ver fotos tomadas por los rovers Curiosity, Opportunity y Spirit en Marte, utilizando la API de la NASA.  
La aplicación brinda la posibilidad de filtrar las fotos por cámara, fecha (Earth Date) y sol (Sol Date), además está paginada dinámicamente.

## Requisitos

- Node.js (>=14.x)
- Expo CLI

## Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Quai1921/Test-ReactNative.git
cd Test-ReactNative
```

2. **Instalar dependencias**

```bash
npm install
```

## Configuración

1. **API Key**
   
La clave de la API de la NASA, está configurada en el archivo utils/config.js:
```bash
export const API_KEY = "K4DqV1zmp9fO2jypgYgKOlRmP5jK8kDBv6RvgMJP";
```
## Ejecución
1. **Iniciar la aplicación**
```bash
npm start
```
La aplicación se iniciará en el puerto 3000.

## Rutas de la API
La API de la NASA se utiliza en el componente RoverScreen, para obtener fotos de Marte.  
La configuración del API y el manejo de solicitudes se realizan en el archivo RoverScreen.js.  

**`RoverScreen.js`**  
**Funcionalidad:** Muestra fotos de Marte tomadas por los distintos rovers (Curiosity, Opportunity y Spirit).  
**Filtros:** Permite filtrar fotos por cámara, fecha y sol.  
**Paginación:** Carga más fotos a medida que el usuario se desplaza hacia abajo.  

## `App.js`
Es el archivo principal que configura la navegación entre las pantallas de los rovers utilizando @react-navigation/native y @react-navigation/bottom-tabs.

## Dependencias
Las principales dependencias de la aplicación son:
- @react-navigation/native
- @react-navigation/bottom-tabs
- axios
- react-native-picker-select
- react-native-vector-icons
- expo








