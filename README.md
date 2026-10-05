# BioManta Pozuzo

**“Del pseudotallo del plátano a la protección del suelo”**

Web interactiva para explicar un **econegocio académico propuesto** en Pozuzo, provincia de Oxapampa, Pasco, Perú. `index.html` funciona como sitio estático sin compilación. Puede publicarse en GitHub Pages o importarse en Vercel con el repositorio como directorio raíz, Framework Preset **Other** y Build Command vacío.

## Qué muestra

Problema de erosión superficial → recurso local potencial → prototipo de geomanta → secuencia de fabricación → simulador cualitativo de dos laderas → etapas de uso → hipótesis de desempeño → experimento futuro → variables por validar → modelo de econegocio → visión futura.

Los controles de lluvia, pendiente, vegetación y presencia de BioManta cambian una animación dibujada en `canvas`. **El código no calcula pérdida de suelo, estabilidad de taludes ni eficacia real.** Los gráficos y recipientes del laboratorio son hipótesis visuales sin cifras. La propuesta no aborda deslizamientos profundos ni reemplaza muros, gaviones o evaluación geotécnica. El producto aún no está fabricado ni certificado.

## Fuentes utilizadas

- [Plan Estratégico de Desarrollo Económico Local de Oxapampa 2024–2034](https://sinia.minam.gob.pe/sites/default/files/archivos/public/docs/Plan-Estrategico-de-Desarrollo-Economico-Local-de-la-Provincia-de-Oxapampa-PEDEL-2024-2034-1.pdf), cuadro de cultivo de plátano por distrito. Permite afirmar la presencia del cultivo en Pozuzo; no verifica disponibilidad de fibra utilizable.
- [INDECI, reporte de erosión en Pozuzo, junio de 2026](https://portal.indeci.gob.pe/emergencias/reporte-complementario-n-7609-2-6-2026-coen-indeci-1125-horas-reporte-n-1-erosion-en-el-distrito-de-pozuzo-pasco/). Da contexto local; no demuestra eficacia de BioManta.
- [INDECI, deslizamiento en Pozuzo, marzo de 2026](https://portal.indeci.gob.pe/wp-content/uploads/2026/03/INFORME-DE-EMERGENCIA-N.%C2%BA-0900-14ABR2026-LLUVIAS-INTENSAS-EN-EL-DISTRITO-DE-POZUZO-PASCO-1.pdf). Se cita para diferenciar fenómenos y alcance.
- [Badanayak, Jose y Bose, *Journal of Natural Fibers* (2023)](https://www.tandfonline.com/doi/abs/10.1080/15440478.2023.2168821): revisión de extracción, caracterización y aplicaciones de fibra de pseudotallo.
- [Oyewo et al., *Hybrid Advances* (2023)](https://www.sciencedirect.com/science/article/pii/S2773207X23000842): revisión de métodos de extracción y aplicaciones de fibra.
- [Estudio de material geotextil de pseudotallo (2024)](https://www.hrpub.org/download/20240730/CEA2-14837187.pdf): antecedente tecnológico, no resultado transferible directamente a este prototipo.

**Pozuzo (Pasco) no debe confundirse con Codo del Pozuzo (Huánuco).** La web se fundamenta en fuentes que identifican expresamente el distrito de Pozuzo, Oxapampa.

## Imágenes y créditos

- `assets/biomanta-concepto.png`: imagen generada con imagegen como **render conceptual**, no producto real. Prompt: malla abierta de fibras de pseudotallo, rollo parcialmente desplegado, dos estacas de madera, paisaje montañoso húmedo inspirado en Pozuzo, fotografía editorial de lanzamiento, sin texto.
- `assets/pseudotallo-concepto.png`: imagen generada con imagegen como **ilustración conceptual**, no fotografía de campo. Prompt: planta de plátano madura tras cosecha, corte del pseudotallo mostrando capas vegetales y fibras, paisaje húmedo de la Selva Alta, realismo editorial, sin texto.
- `assets/pozuzo.webp`: adaptación de [“Colinas en Pozuzo”](https://commons.wikimedia.org/wiki/File:Colinas_en_Pozuzo_-_panoramio.jpg), Heiner Amado Cadillo / Wikimedia Commons, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
- Fuentes DM Sans y Manrope con [SIL Open Font License](assets/fonts/LICENSE-dmsans.txt) y [SIL Open Font License](assets/fonts/LICENSE-manrope.txt).

## Desarrollo local

Ejecuta `python -m http.server 4175` en esta carpeta y abre `http://localhost:4175/`. Los archivos HTML, CSS, JS e imágenes son locales; el sitio publicado no depende de APIs externas para las animaciones. Los enlaces a las fuentes sí salen del sitio.

## Alcance por validar

Resistencia a tracción, absorción de agua, comportamiento bajo lluvia e intemperie, densidad de tejido, anclaje, biodegradación, costo por m², demanda y resultados en campo. La primera comparación propuesta son bandejas inclinadas con suelo y lluvia equivalentes. Se medirían masa de suelo perdido, escorrentía, turbidez, retención de semillas, cobertura vegetal y estado físico de la malla.
