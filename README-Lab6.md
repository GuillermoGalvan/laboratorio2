# Laboratorio 6

- Build Stage:

  - Code Commit: Developers commit code to a version control system, triggering the CI pipeline.

  - Docker Image Creation: Dockerfiles define the environment and dependencies, and Docker builds an image which encapsulates the application and its runtime.
    Test Stage:

  - Automated Testing: Docker images are used to spin up containers where automated tests are conducted, ensuring that the application behaves as expected in an environment identical to production.

  Deployment Stage:

  - Container Registry: Successfully tested Docker images are tagged and pushed to a Docker registry.

  - Orchestration and Deployment: Tools like Kubernetes or Docker Swarm manage the deployment of these images into containers across different environments, handling scaling and load balancing.

- Test Stage:

  - Automated Testing: Docker images are used to spin up containers where automated tests are conducted, ensuring that the application behaves as expected in an environment identical to production.

- Deployment Stage:

  - Container Registry: Successfully tested Docker images are tagged and pushed to a Docker registry.

  Orchestration and Deployment: Tools like Kubernetes or Docker Swarm manage the deployment of these images into containers across different environments, handling scaling and load balancing.

Analyze Enhancements and Potential Issues:

- Enhancements: Consider how Docker’s containerization benefits the build, test, and deployment processes by providing consistency, portability, and scalability.

- Potential Issues: Reflect on any possible challenges that might arise with Docker integration, such as security vulnerabilities in images, complexity in managing large numbers of services, or difficulties in orchestrating containers.

# Reporte

- Cuando el dev lanza un commit se puede implemtar un pre-commit para poder validar que ese commit cumpre con las reglas establecidas.
- Cuando el dev lance un PR se pueden lanzar varios pipiline para ejecutar diversos excenarios levantando dockers para su uso por ejemplo las pruebas unitarias, pruebas de automatizadas de integración, pruebas de estres.
- Cuando se realice el merge a main se puede ejecutar la creacion de las imagenes necesarias para poder desplegar el ambiente asi como colocar las variables de entorno para su despliegue.

Las mejoras detectas son que se puede empezar implementar GitFlow para que se puede desplegar en los diferentes ambientes y tener el control de que contiene cada ambiente, se puede implementar alguna estrategia para despliegue a prodcucción para no afectar a los usuario.
