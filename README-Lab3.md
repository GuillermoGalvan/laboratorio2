# Laboratorio 3

## Escenario 1

Ejemplo:

```typescript
TEST UserAuthentication
  ASSERT_TRUE(authenticate("validUser", "validPass"), "Should succeed with correct credentials")
  ASSERT_FALSE(authenticate("validUser", "wrongPass"), "Should fail with wrong credentials")
END TEST
```

Salucion:

La prueba se puede dividir en dos pruebas específicas, una para cada escenario, proporcionando nombres más descriptivos a los casos de prueba.

```typescript
TEST UserAuthentication_Succeed
  ASSERT_TRUE(authenticate("validUser", "validPass"), "Should succeed with correct credentials")
END TEST

TEST UserAuthentication_Fail
  ASSERT_FALSE(authenticate("validUser", "wrongPass"), "Should fail with wrong credentials")
END TEST
```

## Escenario 2

Ejemplo:

```typescript
TEST DataProcessing
  DATA data = fetchData()
  TRY
    processData(data)
    ASSERT_TRUE(data.processedSuccessfully, "Data should be processed successfully")
  CATCH error
    ASSERT_EQUALS("Data processing error", error.message, "Should handle processing errors")
  END TRY
END TEST
```

Solución:

Este escenario se puede optimizar dividiendo las dos pruebas, la primera validando la parte exitosa y la otra validando la parte capturada. También tendríamos que tener un mejor control de los datos elaborando los datos para cada escenario específico.

```typescript
TEST DataProcessing_successfully
    DATA data = fetchDataSuccessfully()
    processData(data)
    ASSERT_TRUE(data.processedSuccessfully, "Data should be processed successfully")
END TEST

TEST DataProcessing
  DATA data = fetchDataError()

  TRY
    processData(data)
  CATCH error
    ASSERT_EQUALS("Data processing error", error.message, "Should handle processing errors")
  END TRY
END TEST
```

# Escenario 3

Ejemplo

```typescript
TEST UIResponsiveness
  UI_COMPONENT uiComponent = setupUIComponent(1024)
  ASSERT_TRUE(uiComponent.adjustsToScreenSize(1024), "UI should adjust to width of 1024 pixels")
END TEST

```

Solución:

Para mejorar las pruebas se debe pasar el valor inicial y el valor de cambio como parámetros para ver que el componente realmente cambia su ancho.

Ejemplo

```typescript
TEST UIResponsiveness (valueIntial, valueChange)
  UI_COMPONENT uiComponent = setupUIComponent(valueIntial)
  ASSERT_TRUE(uiComponent.adjustsToScreenSize(valueChange), `UI should adjust to width of ${valueChange} pixels`)
END TEST

```
