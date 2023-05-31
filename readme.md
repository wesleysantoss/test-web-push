Para rodar o front-end
```
npx http-server -c-1
```

Para gerar as keys
```
npx web-push generate-vapid-keys
```

Retorno parecido com isso:
```
❯ npx web-push generate-vapid-keys

=======================================

Public Key:
BOot9m96zNuMo4YZzjIzYxLV7mYcb6tMUu0WVzWQuNPhwQ9Ty1Z3LGWNN5AeMFDRSmnm0FAmP8SpwWowaHuVSdE

Private Key:
zlm_rwmXwvd-nmaombu2ApDOKRlkbvl9BEs0_75Ndtw

=======================================
```

Public Key setar no front-end .js e Private Key no back-end

```
npm start
```