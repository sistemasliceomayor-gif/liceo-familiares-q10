# Actualización de familiares Q10 — I.E. Liceo Mayor de Soledad

Aplicativo para que los padres registren los datos de sus familiares y acudientes. Exporta el archivo **«5. Formato Acudientes - Codeudores»** que pide Q10 para el cargue masivo.

Usa la misma arquitectura del aplicativo de ceremonias 2026:

- **GitHub Pages** para las páginas web.
- **Google Apps Script** como servidor.
- **Google Sheet** como base de datos.

## Contenido

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portada para padres (dice si el registro está abierto) |
| `registro.html` | Formulario de 5 pasos: autorizaciones (familiares y menores) → estudiantes → datos de cada estudiante → familiares (un solo acudiente) → revisar |
| `login.html` | Acceso de funcionarios (Administración, Secretaría Académica, Coordinaciones) |
| `panel.html` | Avance por grado y grupo, estudiantes sin registro, registros, anulación, exportación a Q10 y reporte adicional «Datos de estudiantes» (ficha de matrícula) |
| `config.js` | **Único archivo que se edita**: la URL de Apps Script |
| `estilos.css`, `assets/` | Estilos, escudo, foto de fondo y **`plantilla-q10.xlsx`** (el archivo original de Q10, que se usa para exportar) |
| `backend/Codigo.gs` | Código del servidor (va en Apps Script, **no** se sube a GitHub) |

## Instalación (una sola vez)

### 1. Google Sheet y servidor
1. En Drive, cree una hoja de cálculo llamada **Familiares Q10 — Liceo Mayor**.
2. Abra **Extensiones → Apps Script**, borre el código que trae y pegue todo `backend/Codigo.gs`. Guarde.
3. Vuelva a la hoja y recárguela (F5). Aparece el menú **Familiares Q10**.
4. Ejecute **Familiares Q10 → 1. Instalar / reparar hojas** y acepte los permisos.
5. En la hoja **Estudiantes** pegue la base del SIMAT ya convertida (archivo **Estudiantes_Familiares_Q10.xlsx**, hoja «Estudiantes»): **Documento · Nombre completo · Jornada · Grado · Curso**. Péguela desde la fila 2 con **Ctrl+Shift+V** (solo valores). Para actualizarla más adelante, borre las filas 2 en adelante y pegue la nueva. Los registros de familiares no se pierden, porque se guardan en otras hojas.
6. Ejecute **Familiares Q10 → 2. Asignar o cambiar claves de acceso** y cree una clave para cada perfil (mínimo 8 caracteres).
7. En Apps Script haga clic en **Implementar → Nueva implementación** y configure:
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**.

   Copie la URL que termina en `/exec`.

### 2. Páginas web
1. En GitHub (usuario `sistemasliceomayor-gif`) cree el repositorio público **liceo-familiares-q10**.
2. Suba todos los archivos **excepto** la carpeta `backend`.
3. En `config.js` pegue la URL `/exec` entre las comillas de `API_URL`.
4. En **Settings → Pages** elija la rama `main` y la carpeta `/ (root)`.

   El sitio queda en `https://sistemasliceomayor-gif.github.io/liceo-familiares-q10/`.

### 3. Abrir el registro
En la hoja **Configuración**:

- **Registro abierto:** `SI` o `NO`. También se cambia con el menú **Abrir o cerrar el registro de padres**.
- **Fecha de cierre** (opcional): `dd/mm/aaaa`. Después de ese día el registro se cierra solo.
- **Mensaje para padres** (opcional): aparece en el primer paso del formulario.

## Perfiles

| Perfil | Resumen y avance | Estudiantes sin actualización (+ Excel con teléfono SIMAT) | Registros de familiares | Datos de contacto de familiares | Novedades de documento | Exportar a Q10 | Anular |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Administración | ✓ | ✓ | ✓ | ✓ | ✓ (revisar) | ✓ | ✓ |
| Secretaría Académica | ✓ | ✓ | ✓ | ✓ | ✓ (revisar) | ✓ | — |
| Coordinaciones | ✓ | ✓ | Solo nombre y parentesco | — | Solo ver | — | — |
| Docentes (un usuario para todos) | ✓ | ✓ | — | — | — | — | — |

Cada descarga del reporte de estudiantes sin actualización queda en la **Bitácora**, con el perfil, el filtro usado y el número de filas. El Excel trae las columnas «Resultado de la llamada» y «Fecha de la llamada» para que el docente registre su gestión.

## Reglas importantes

- **Cursos por jornada:** en el SIMAT el mismo curso (ej. 601) existe en la mañana y en la tarde. Por eso el panel muestra y filtra los cursos como «601 · Mañana» y «601 · Tarde».
- **Búsqueda del estudiante:** el padre lo busca **por documento o por nombre** (mínimo un nombre y un apellido) y puede vincular **varios hijos** en un mismo registro. Solo aparecen estudiantes de la hoja **Estudiantes**. Por privacidad, el nombre se muestra parcialmente oculto (ej. `VAL•••• ROD••••`), con su jornada, grado y curso. En la búsqueda por nombre, el documento solo muestra los 3 últimos dígitos.
- **Documento que cambió (novedad):** si el padre no encuentra a su hijo por documento (por ejemplo, porque ya tiene TI y en el SIMAT sigue el registro civil), el formulario le sugiere buscarlo por nombre. Al confirmarlo puede marcar «El documento de mi hijo cambió» y escribir el tipo y el número actuales. La novedad se guarda en la hoja **Novedades** y aparece en la pestaña **Novedades de documento** del panel, para que Secretaría la corrija en el SIMAT y la marque como revisada. **El reporte a Q10 sigue usando el documento que tiene el colegio.**
- **Exportación idéntica a Q10:** el panel llena la **plantilla original de Q10** (`assets/plantilla-q10.xlsx`) desde la fila 4. Se conservan la hoja «Acudientes», las notas, los colores, los encabezados, las listas y el orden exacto de las 21 columnas. Todos los valores se escriben como texto, para conservar los ceros a la izquierda.
- **Mayúsculas y minúsculas uniformes:** nombres, apellidos, municipios, barrio y dirección se guardan y se exportan en **tipo título**. Ejemplos: «ANA MARÍA DE LA HOZ» → «Ana María de la Hoz», «cra 34 # 20b-18» → «Cra 34 # 20B-18», «bogotá d.c.» → «Bogotá D.C.». El correo se guarda en minúscula. Las listas de Q10 (tipo de documento, género, parentesco, etc.) no se modifican.
- **Acudiente:** cada registro debe tener **al menos un** acudiente. Si la mamá y el papá se registran por separado y los dos se marcan como acudiente, el panel lo muestra en **«Para revisar»**.
- **Exportación sin duplicados:** sale una fila por cada pareja familiar–estudiante. Si un familiar se registró dos veces para el mismo estudiante, solo sale el registro más reciente. Los registros anulados no salen.
- **Anular no borra:** el registro queda marcado como anulado, con quién lo anuló, cuándo y por qué.
- **Bitácora:** guarda los ingresos, ingresos fallidos, exportaciones y anulaciones.
- **Cambios en el código:** si modifica el código de Apps Script, publique de nuevo en **Implementar → Gestionar implementaciones → Editar → Nueva versión**. Así la URL no cambia.

© 2026 Departamento de Sistemas — I.E. Liceo Mayor de Soledad "Rafael U. Lafaurie Rivera".

## Versión 2 (12/11/2026) — Ficha de matrícula

- **Dos autorizaciones** en el paso 1: datos del familiar (Ley 1581/2012, Decreto 1377/2013) y datos del menor como padre o representante legal (art. 7 Ley 1581, art. 12 Decreto 1377). Tipo de sangre y EPS se tratan como datos sensibles (art. 5 y 6): el padre puede elegir «Prefiero no informarlo».
- **Datos del estudiante**: una vista por cada hijo vinculado con correo, teléfono, barrio, lugar de nacimiento, municipio de expedición, tipo de sangre y EPS. Se guardan en la hoja **«Datos estudiantes»** y **no** alteran el Formato Q10 de familiares.
- **Un solo acudiente** por registro (el formulario y el servidor lo exigen).
- Panel: pestaña **«Datos de estudiantes»** (solo Administración y Secretaría) con filtros y descarga en Excel.
- Al actualizar: pegar el nuevo `Codigo.gs`, ejecutar **1. Instalar / reparar hojas** y publicar una **nueva versión** de la implementación (misma URL).
