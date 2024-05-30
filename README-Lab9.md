# Monolithic E-Commerce Application Description:

The application is a traditional e-commerce platform that encompasses all functionalities within a single, unified software architecture. The application handles the following key operations:

- User Management: Manages user profiles, authentication, and authorization. It stores personal information, manages login sessions, and handles user preferences.

- Product Catalog: Maintains a comprehensive list of products, including descriptions, pricing, images, and inventory levels. It supports product search and categorization functionalities.

- Order Processing: Manages all aspects of the ordering process, from cart management to order placement, payment processing, and order history tracking.

- Customer Support: Handles customer inquiries, returns, complaints, and feedback through a ticket-based system integrated with the user and order databases.

The application is built on a single relational database that holds all user data, product information, orders, and customer support interactions. It currently operates on a single code base with a web-based frontend that communicates directly with the backend server.

The platform has been experiencing challenges with scaling during high-traffic periods, frequent downtimes during updates, and increasing difficulty in implementing new features without affecting existing functionalities. The goal is to decompose this monolithic architecture into a microservices-based architecture to address these issues and improve overall agility and scalability.

# Solucion

Se propone ir sacando los 4 grandes modulos a microservicios, cada microservicio con su propia base de datos, la comunicacion entre los microservicios seria por medio de eventos en aquellos microservicios que tengan depencias (Product Catalog, Order Processing), para aquellos que tengan que tener información en tiempo real se la comunicación se tendra que hacer por medio de llamados https.

El primero modulo a convertir microservicios seria el de User Management, este
modulo tendra todo lo relacionado al manejo de los usuarios dentro del sitema otorgando el la autentificación y la autorización al mismo.

El segundo modulo a convertir seria el de Customer Support, este modulo tendra su propia base de datos para el manejo del soporte e inicialmente se conectara a la base de datos centralizada, hasta que todos los microservicios esten migrados y esa base de datos deje de utilzarse.

El tercer modulo a convetir es el de Product Catalog, cuando se pase a microservicio este modulo tendra que tener ciertas precauciones por que puede que se vea afectado el modulo Order Processing por la dependencia que existe entre ellos.

El cuarto microservicio seria Order Processing, en la migracion de este microservicio se tendra que tambien volver a realizar ajustes al microservicio Customer Support para que deje de utilizar la base de datos centralizada y empiece haber llamados entre los microservios mediante el protocolo https.

Durante las migraciones de cada modulo se tiene que contemplar que los llamados que se hacian por sp u clases seran sustituidos por llamados https, y estos despues de realizar todas las migraciones a eventos si fueran el caso.

```mermaid
graph TD;
    Apigee-->User Management;
    Apigee-->Product Catalog;
    Product Catalog-->Order Processing
    Order Processing-->Product Catalog
    Apigee-->Order Processing;
    Apigee-->Customer Support
```
