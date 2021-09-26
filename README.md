# b2b-ecommerce
This is b2b multi tenant ecommerce api using nodejs and expressjs with mongodb as a database.

## Documentation
**A quick start guide :**

API Links starts with -
For **Main Site** - */api/main/*
For **Admin Site** - */api/admin/*
For **User Accounts & Authentication** - */api/accounts/*
Set Headers *Content-Type : application/json*

**Main Site**

### List of available products

GET */api/main/products*

**Sample Response**

```
{
  "ok": 1,
  "products": [
    {
      "_id": "6150992939a4325d43141180",
      "name": "Mobile Phone",
      "brand": "samsung",
      "price": 15000,
      "specs": "1. 12mp + 5mp dual rear camera, 2. 16mp front with flash light camera, 3. 3GB RAM 32GB ROM, 4. 625 snapdragon qualcomm processor.",
      "sellerId": "6150988f39a4325d4314117b"
    },
    ...
  ]
}
```

### Single product details by Id

GET */api/main/products/:id

**Samaple Response**

```
{
  "ok": 1,
  "product": {
    "_id": "6150992939a4325d43141180",
    "name": "Mobile Phone",
    "brand": "samsung",
    "price": 15000,
    "specs": "1. 12mp + 5mp dual rear camera, 2. 16mp front with flash light camera,3. 3GB RAM 32GB ROM, 4. 625 snapdragon qualcomm processor.",
    "sellerId": "6150988f39a4325d4314117b"
  }
}
```

