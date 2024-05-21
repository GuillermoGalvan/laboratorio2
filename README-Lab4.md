# Laboratorio 4

## Escenario 1

```typescript
FUNCTION authenticateUser(username, password):
  QUERY database WITH username AND password
  IF found RETURN True
  ELSE RETURN False
```

Para proteger la funcion con los datos de posibles atancantes se tendra que encriptar el password, segundo realizar la busqueda en la base de datos por medio de parametros para evitar sql injection, tambien previo a llegar al metodo se tuvo que haber validado que los datos que se ingresan son los adecuados.

```typescript
FUNCTION authenticateUser(username, password):
  IF NULL OR EMPTY username OR password
    RETURN False

  ENCRIPTION(password);
  QUERY database WITH username AND password WITH PARAMETERS SQL

  IF found RETURN True
  ELSE RETURN False
```

## Escenario 2

```typescript
DEFINE FUNCTION generateJWT(userCredentials):
  IF validateCredentials(userCredentials):
    SET tokenExpiration = currentTime + 3600 // Token expires in one hour
    RETURN encrypt(userCredentials + tokenExpiration, secretKey)
  ELSE:
    RETURN error
```

En este caso se tendria primero se tiene que saber si el cliente que solicita el token es el dice ser, despues ver si los scopes que solicita pertenecen al cliente, posteriormente ver si el usuaior es valido, saber que los scopes que se solicitan pertenecesn al usuario, recuperar los claims del cliente, asignar tiempo de vida al token, generar el token en tres paste header.payload.firma. Para mejorar la seguridad de lo antes descrito se tendria que tener un proceso que este validando los token para ver aquellos que sigan validos y si ya venncieron ponerlos en el status de invalid. Para la parte de logout se tendra que hacer que se busque el token que se esta utilizando para cerrar sesion para buscarlo en la base de datos y ponerlo en status invalid.

```typescript
DEFINE FUNCTION generateJWT(userCredentials):
  IF NOT validateData(userCredentials) RETURN ERROR;

  const scopesByClient = getScopeByClient(userCredentials);

  IF scopesByClient IS NULL OR EMPTY RETURN Error

  IF validateCredentials(userCredentials):
    IF scopesByClient NOT EQUAL getSCOPEByUser(usercredencials) RETURN Error

    SET tokenExpiration = currentTime + 900 // Token expires in 15 minutes
    const header = createHeader(userCredencials)
    const payload = createPayload(useCredencials, tokenExpiration)
    const singing = encrypt(header, payloar)

    const jwt = header.payload.singing;

    QUERY database SAVE jwt PARAMETERS SQL

    RETURN jwt
  ELSE:
    RETURN error

DEFINE FUNCTION jwtDelete()
    QUERY database WITH dateExpiration WITH PARAMETERS SQL

    IF EXISTS Jwt
        QUERY database DELETED jwt PARAMETERS SQL

DEFINE FUNCTION longout(jwt)
    const data = getDataByJWT(jwt)

    QUERY database WITH jwtid WITH PARAMETERS SQL

    IF EXISTS Jwt
        QUERY database DELETED jwt PARAMETERS SQL
```

# Escenario 3

```typescript
PLAN secureDataCommunication:
  IMPLEMENT SSL/TLS for all data in transit
  USE encrypted storage solutions for data at rest
  ENSURE all data exchanges comply with HTTPS protocols
```

Se tendria que agregar que agregar que solo se use canales seguro en las comunicaciones, usar certificados, sanitizar las cadenas de entrada y salida, usar cookies o mecanismos de autheticacion y autorizacion.

```typescript
PLAN secureDataCommunication:
  IMPLEMENT SSL/TLS for all data in transit
  USE encrypted storage solutions for data at rest
  ENSURE all data exchanges comply with HTTPS protocols
  USE httpOnly
  USE tokenAntiFraud
  IMPLEMENT validate data
```
