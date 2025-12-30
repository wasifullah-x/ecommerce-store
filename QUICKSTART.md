# 🚀 Quick Start Guide - Pakistan Bazaar

## Prerequisites

- Node.js 18+ installed
- MongoDB installed (or use MongoDB Atlas)
- Git installed

---

## 📦 Installation

### Step 1: Install Dependencies

Open PowerShell and run:

```powershell
cd "d:\FS Quiz"

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**

```powershell
# Install MongoDB from https://www.mongodb.com/try/download/community
# Start MongoDB service
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update backend connection in `backend\src\app.module.ts`

---

## 🏃 Running the Application

### Option 1: Run with npm (Development)

**Terminal 1 - Backend:**

```powershell
cd "d:\FS Quiz\backend"
npm run start:dev
```

Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**

```powershell
cd "d:\FS Quiz\frontend"
npm run dev
```

Frontend runs on: http://localhost:3000

### Option 2: Run with Docker (Recommended)

```powershell
cd "d:\FS Quiz"

# Build images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

---

## 🎯 Testing the Application

1. **Open Browser**: http://localhost:3000
2. **Browse Products**: Click on products to view details
3. **Add to Cart**: Click "Add to Cart" button
4. **View Cart**: Click cart icon in navbar
5. **Checkout**: Fill form and place order
6. **View Orders**: Navigate to Orders page

---

## 🔧 Configuration

### Backend Configuration

File: `backend\src\main.ts`

```typescript
// Change port if needed
await app.listen(5000);
```

### Frontend Configuration

File: `frontend\src\services\api.js`

```javascript
// Update API URL if backend is on different port/host
const API_URL = "http://localhost:5000";
```

---

## 📁 Project Structure

```
d:\FS Quiz\
├── backend/                # NestJS Backend
│   ├── src/
│   │   ├── products/      # Products module
│   │   ├── orders/        # Orders module
│   │   ├── main.ts        # Entry point
│   │   └── app.module.ts  # App configuration
│   ├── Dockerfile
│   └── package.json
│
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   └── App.jsx        # Main app
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml     # Docker orchestration
├── README.md              # Documentation
└── DEPLOYMENT.md          # Deployment guide
```

---

## 🎨 Features

✅ Modern UI with smooth animations  
✅ Product catalog with categories  
✅ Search and filter functionality  
✅ Shopping cart with quantity control  
✅ Checkout with Pakistani cities  
✅ Order tracking system  
✅ Responsive design  
✅ RESTful API  
✅ MongoDB database  
✅ Docker support

---

## 🐛 Troubleshooting

### Backend won't start

```powershell
# Check if MongoDB is running
mongosh

# Check if port 5000 is free
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F
```

### Frontend won't start

```powershell
# Check if port 3000 is free
netstat -ano | findstr :3000

# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Connection Error

- Ensure backend is running first
- Check MongoDB is accessible
- Verify CORS settings
- Check firewall settings

---

## 🔑 Default Sample Data

The backend automatically seeds these products:

- Handwoven Khaddar Shawl
- Phulkari Dupatta
- Ajrak Sindhi Print
- Truck Art Wall Hanging
- Multan Blue Pottery Set
- Hunza Organic Honey
- Kashmiri Chai Mix
- Peshawari Chappal
- Balochi Mirror Work Bag
- Sialkot Cricket Bat
- Chitral Wool Cap (Pakol)

---

## 📝 API Testing

### Using PowerShell

```powershell
# Get all products
Invoke-RestMethod -Uri "http://localhost:5000/products" -Method Get

# Get single product
Invoke-RestMethod -Uri "http://localhost:5000/products/<product-id>" -Method Get

# Create order
$orderData = @{
    customerName = "Ahmed Khan"
    email = "ahmed@example.com"
    phone = "+92 300 1234567"
    address = "House 123, F-8"
    city = "Islamabad"
    items = @(@{
        productId = "123"
        name = "Product"
        price = 1000
        quantity = 2
    })
    totalAmount = 2000
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/orders" -Method Post -Body $orderData -ContentType "application/json"
```

---

## 🌐 Next Steps

1. ✅ Run application locally
2. ✅ Test all features
3. 📦 Build Docker images
4. 🚀 Deploy to cloud (see DEPLOYMENT.md)
5. 🎨 Customize products and branding
6. 🔐 Add authentication (optional)

---

## 📚 Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Docker Documentation](https://docs.docker.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## 💡 Tips

- Use MongoDB Atlas for easy cloud database
- Deploy frontend on Vercel (free)
- Deploy backend on Railway (free tier)
- Use environment variables for secrets
- Test locally before deploying
- Keep dependencies updated

---

**Happy Coding! 🎉**

Made with ❤️ for Pakistan
