# 📚 Seller Backend API Documentation

## **Base URL**
```
http://localhost:3000/
```

---

## **Authentication**

### **Register**
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "Your Name",
    "email": "your@email.com",
    "password": "yourpassword",
    "role": "seller" // or "admin"
  }
  ```
- **Response:** JWT token and user info

---

### **Login**
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "your@email.com",
    "password": "yourpassword"
  }
  ```
- **Response:** JWT token and user info

---

### **Get Profile**
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** User info

---

### **Update Profile**
- **PUT** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** (any updatable fields, e.g. name, email)
- **Response:** Updated user info

---

## **Categories**

### **Get All Categories**
- **GET** `/api/categories`
- **Headers:** `Authorization: Bearer <token>`

---

### **Get Category by ID**
- **GET** `/api/categories/:id`
- **Headers:** `Authorization: Bearer <token>`

---

### **Create Category** (Admin only)
- **POST** `/api/categories`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
  ```json
  {
    "name": "Electronics",
    "description": "Electronic products"
  }
  ```

---

### **Update Category** (Admin only)
- **PUT** `/api/categories/:id`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:** (fields to update)

---

### **Delete Category** (Admin only)
- **DELETE** `/api/categories/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

---

## **Products**

### **Get Products (Seller's Own)**
- **GET** `/api/products`
- **Headers:** `Authorization: Bearer <seller-token>`
- **Query Params:** `page`, `limit`, `category`, `search`, `active`, `sortBy`, `sortOrder`

---

### **Get Product by ID**
- **GET** `/api/products/:id`
- **Headers:** `Authorization: Bearer <seller-token>`

---

### **Create Product**
- **POST** `/api/products`
- **Headers:** `Authorization: Bearer <seller-token>`
- **Body:**
  ```json
  {
    "sku": "PROD001",
    "name": "Test Product",
    "description": "A test product",
    "single_price": 99.99,
    "stock_quantity": 100,
    "category": "<category-id>"
  }
  ```

---

### **Update Product**
- **PUT** `/api/products/:id`
- **Headers:** `Authorization: Bearer <seller-token>`
- **Body:** (fields to update)

---

### **Delete Product**
- **DELETE** `/api/products/:id`
- **Headers:** `Authorization: Bearer <seller-token>`

---

### **Update Product Stock**
- **PATCH** `/api/products/:id/stock`
- **Headers:** `Authorization: Bearer <seller-token>`
- **Body:**
  ```json
  {
    "stock_quantity": 50
  }
  ```

---

## **Orders**

### **Create Order**
- **POST** `/api/orders`
- **Body:** (order details)

---

### **Get Orders**
- **GET** `/api/orders`

---

### **Update Order**
- **PUT** `/api/orders/:id`
- **Body:** (fields to update)

---

### **Delete Order**
- **DELETE** `/api/orders/:id`

---

## **Reports**

### **Get Sales Report**
- **GET** `/api/reports/sales`

---

## **General Notes**
- All protected routes require a valid JWT in the `Authorization` header.
- Only admins can create/update/delete categories.
- Sellers can only manage their own products. 