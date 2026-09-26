# TP4 - Sesiones de pago y webhook Stripe

TP de Programación Avanzada. Microservicio en NestJS que crea sesiones de pago con Stripe Checkout y recibe la confirmación del pago mediante un webhook.

## Cómo levantarlo

1. Instalar dependencias

npm install

2. Copiar `.env.template` como `.env` y completar las variables (clave secreta de Stripe y el signing secret del webhook, que lo da la Stripe CLI al correr `stripe listen`).

3. Levantar el servidor

npm run start:dev


Por defecto corre en el puerto 3003.

4. Para probar el webhook en local hay que tener la Stripe CLI instalada y correr, en otra terminal:

stripe listen --events charge.succeeded --forward-to localhost:3003/payments/webhook


Esto imprime un `whsec_...` que va en `STRIPE_ENDPOINT_SECRET` del `.env`.

## Rutas

**POST /payments/create-payment-session**

Recibe el orderId, la moneda y los items del pedido, y crea una Checkout Session en Stripe. Devuelve la sesión completa (lo importante es el campo `url`, que es a donde se redirige al usuario para pagar).

Ejemplo de body:

```json
{
  "orderId": "ord-1",
  "currency": "usd",
  "items": [
    { "name": "Producto", "price": 20, "quantity": 1 }
  ]
}
```

El `orderId` se guarda en `payment_intent_data.metadata` para poder recuperarlo después en el webhook.

También hay dos rutas de apoyo a donde Stripe redirige según el resultado del pago:

- `GET /payments/success`
- `GET /payments/cancel`

**POST /payments/webhook**

Acá le pega Stripe cuando pasa algo con un pago. Se valida la firma con el header `stripe-signature` y el body sin parsear (rawBody). Si la firma no es válida devuelve 400. Si el evento es `charge.succeeded`, se saca el `orderId` de la metadata del charge y se loguea por consola. Cualquier
otro tipo de evento también se loguea (como no manejado) y se responde 200 igual, para que Stripe no lo siga reintentando.

## Cosas que probé

- Crear una sesión con datos válidos → devuelve `url` de Stripe.
- Pagar esa sesión con la tarjeta de test 4242 4242 4242 4242 y ver en la consola del servidor el log `Pago confirmado para orderId: ...` con el
  orderId correcto.
- `stripe trigger charge.succeeded` para probar el webhook sin tener que pagar cada vez.

