# Laboratorio 7

- Design Challenges:

  - Global Configuration Management: Design a system that ensures a single, globally accessible configuration object without access conflicts.

  - Dynamic Object Creation Based on User Input: Implement a system to dynamically create various types of user interface elements based on user actions.

  - State Change Notification Across System Components: Ensure components are notified about changes in the state of other parts without creating tight coupling.

  - Efficient Management of Asynchronous Operations: Manage multiple asynchronous operations like API calls which need to be coordinated without blocking the main application workflow.

- Task: Outline solutions that integrate these patterns into a cohesive design to address the challenges.

# Reporte de diseño

- Global Configuration Management: se utilizara el patron de diseño singleton para poder tener un solo lugar la configuración de la aplicación.

- Dynamic Object Creation Based on User Input: podriasmo utilizar el patron de diseño factory para saber que tipo de elemento pintar dependediendo de la interacción del usuario.

- State Change Notification Across System Components: utilizar el patron de diseño obseervador para que los servicios se suscriban y el elemento que realice el cambio de estado de la aplicacion notifique ese cambio a sus observadores.

- Efficient Management of Asynchronous Operations: para el manejos de diferentes peticiones a API, conexion a base de datos, lectura de archivos, ets, se tendra que implementar procesos asincronos para evitar bloqueos en las aplicaciones, tambien considerar que si los hilos se pueden bloquear se tendra implementar alguna estrategia valida solventar estos ecenarios.

# Informe del proyecto

El sistema inicia y carga todas las configuraciones que se necesitan para su buen funcionaniemto, se prensenta la primera pantalla la cual reaccionara a la interaccion del usuario con ella notificando el cambnio de estatus, si es necesaroi renderizar un nuevo fragmente de codigo este se tendra que realizar por medio de la fabrica de componente, todos los componentes pueden utilizar recursos externos o propies pero por ningun motivo tienen que bloquear el hilo principal del sistema.
