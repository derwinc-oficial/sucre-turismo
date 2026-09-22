# Sucre Turístico

## 1.1 Planteamiento del problema

### Descripción de la problemática

El Golfo de Morrosquillo cuenta con una oferta turística amplia y diversa —playas, gastronomía costeña, alojamientos, experiencias náuticas y eventos culturales— distribuida entre municipios como Tolú, Coveñas y sus corregimientos aledaños. Sin embargo, esta información se encuentra dispersa en redes sociales, páginas no oficiales, recomendaciones informales o simplemente no está disponible en ningún canal digital estructurado.

### Situación actual

Actualmente, un turista que planea visitar el Golfo de Morrosquillo debe recurrir a múltiples fuentes no centralizadas: publicaciones sueltas en Facebook o Instagram, referencias de terceros, agencias informales o búsquedas generales en Google que no siempre arrojan resultados actualizados o confiables. No existe una plataforma oficial que integre en un solo lugar los destinos, alojamientos, restaurantes, experiencias y eventos de la región.

### Necesidad identificada

Se requiere un canal digital centralizado, actualizado y de fácil consulta que permita a los visitantes encontrar información turística confiable del Golfo de Morrosquillo, y que a la vez permita a los administradores mantener esa información organizada y vigente.

### Usuarios afectados

• Turistas y visitantes, que enfrentan dificultades para planear su viaje por falta de información centralizada y confiable.

• Prestadores de servicios turísticos locales (hoteles, restaurantes, operadores de experiencias), cuya oferta queda poco visible al no contar con un canal oficial de promoción.

• Entes u organizaciones encargadas de promover el turismo en la región, que no cuentan con una herramienta tecnológica para gestionar y difundir la información.

### Contextualización de la solución tecnológica

Frente a esta situación, se propone el desarrollo de Sucre Turístico, una plataforma web Full Stack que centralice la consulta y gestión de la información turística del Golfo de Morrosquillo, mediante una arquitectura basada en microservicios que garantice escalabilidad, organización modular del sistema y separación clara de responsabilidades entre los distintos componentes (destinos, alojamientos, gastronomía, experiencias y eventos).

### Formulación del problema

**¿Cómo desarrollar una plataforma web que permita centralizar, consultar y gestionar información turística del Golfo de Morrosquillo, facilitando el acceso de los visitantes a destinos, alojamientos, gastronomía, experiencias y eventos?**

---

## 1.2 Justificación

### 1.2.1 Necesidad del proyecto

El desarrollo de **Sucre Turístico** busca facilitar el acceso a información relacionada con la oferta turística del Golfo de Morrosquillo mediante una plataforma web centralizada, dado que actualmente esta información se encuentra dispersa entre redes sociales, páginas no oficiales y recomendaciones informales, sin un canal único que la organice y la mantenga actualizada.

Esta situación dificulta que los turistas encuentren información confiable al momento de planear su visita, y limita la visibilidad de los prestadores de servicios turísticos de la región.

### 1.2.2 Solución propuesta

La plataforma soluciona precisamente esa ausencia de un espacio digital centralizado. Permitirá organizar información sobre:

- Destinos
- Alojamientos
- Gastronomía
- Experiencias
- Eventos

Los turistas podrán realizar consultas y aplicar filtros de acuerdo con sus intereses.

Para los administradores, el sistema ofrecerá mecanismos para gestionar la información registrada y mantener actualizados los contenidos relacionados con la oferta turística, de modo que ambos perfiles de usuario se benefician directamente de su implementación.

### 1.2.3 Importancia para el turismo

Contar con un canal digital propio tiene, además, un impacto directo sobre el turismo del Golfo de Morrosquillo: aumenta la visibilidad de destinos y prestadores locales, incluyendo aquellos menos conocidos, contribuye a dinamizar la actividad económica asociada al turismo en la región, y fortalece una promoción organizada del territorio frente a la oferta dispersa e informal que existe actualmente.

### 1.2.4 Aporte tecnológico

Desde el punto de vista tecnológico, el proyecto permite aplicar conceptos de:

- Desarrollo Full Stack
- Interfaces web
- Servicios REST
- Persistencia de datos
- Mecanismos de búsqueda
- Arquitectura basada en microservicios

La utilización de una arquitectura basada en microservicios permite separar las funcionalidades del sistema —destinos, alojamientos, gastronomía, experiencias y eventos— en componentes independientes, escalables y de fácil mantenimiento.

Estos componentes se comunicarán a través de un **API Gateway desarrollado en Express**, mientras que **React** será utilizado para la interfaz, de acuerdo con la arquitectura solicitada en la guía.

---

## 1.3 Objetivos

### 1.3.1 Objetivo general

Desarrollar una plataforma web Full Stack denominada **Sucre Turístico**, orientada a la promoción, consulta y gestión de información turística del Golfo de Morrosquillo, facilitando el acceso de los visitantes a la oferta turística de la región y proporcionando herramientas de administración para la gestión de la información.

### 1.3.2 Objetivos específicos

1. Diseñar una interfaz web intuitiva que permita consultar información relacionada con destinos, alojamientos, gastronomía, experiencias y eventos turísticos.

2. Definir una arquitectura basada en **Frontend, API Gateway y microservicios independientes**, de acuerdo con los requerimientos funcionales del sistema.

3. Integrar la interfaz web con el Backend mediante servicios **REST**, permitiendo el intercambio de información entre los diferentes componentes de la aplicación.

4. Implementar mecanismos de consulta y filtrado que faciliten la búsqueda de información turística de acuerdo con las necesidades e intereses de los visitantes.

5. Diseñar la arquitectura del sistema considerando mecanismos de despliegue mediante **Docker**, con el propósito de facilitar la ejecución y organización de los diferentes componentes de la plataforma.

---
