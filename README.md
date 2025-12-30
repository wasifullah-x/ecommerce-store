# Pakistan Bazaar - Modern E-commerce Store

A full-stack e-commerce application featuring a modern, creative UI with Pakistani products. Built with React (frontend) and NestJS (backend).

## 🚀 Features

- **Modern UI**: Clean, professional design with smooth animations
- **Product Catalog**: Browse Pakistani products across multiple categories
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout System**: Complete order placement with delivery details
- **Order Tracking**: View order history and status
- **Responsive Design**: Works seamlessly on all devices
- **REST API**: Full-featured backend API

## 📦 Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management)
- Axios (API calls)
- Lucide React (icons)

### Backend

- NestJS
- MongoDB with Mongoose
- TypeScript
- RESTful API
- CORS enabled

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- Docker (optional, for containerized deployment)

### Local Development

#### 1. Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

Backend will run on http://localhost:5000

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

### 🐳 Docker Deployment

Build and run all services with Docker Compose:

```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### 📦 Build Docker Images Separately

#### Backend Image

```bash
cd backend
docker build -t bazaar-backend:latest .
docker run -p 5000:5000 bazaar-backend:latest
```

#### Frontend Image

```bash
cd frontend
docker build -t bazaar-frontend:latest .
docker run -p 3000:3000 bazaar-frontend:latest
```

## 🌐 API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products/category/:category` - Get products by category
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Orders

- `GET /orders` - Get all orders
- `GET /orders/:id` - Get single order
- `POST /orders` - Create new order
- `PUT /orders/:id/status` - Update order status

## 📱 Product Categories

- Clothing (Traditional wear, shawls, etc.)
- Decor (Truck art, pottery, etc.)
- Food (Honey, chai, traditional foods)
- Accessories (Bags, jewelry, etc.)
- Footwear (Peshawari chappals, etc.)
- Sports (Cricket equipment from Sialkot)

## 🎨 UI Features

- Gradient color schemes
- Glass-morphism effects
- Smooth page transitions
- Hover animations
- Custom scrollbar
- Responsive navigation
- Product filtering and search
- Real-time cart updates

## 🚀 Cloud Deployment Options

### Vercel (Frontend)

```bash
cd frontend
vercel deploy
```

### Heroku (Backend)

```bash
cd backend
heroku create bazaar-backend
git push heroku main
```

### Railway

- Connect your GitHub repo
- Deploy backend and frontend separately
- Add MongoDB service

### AWS/DigitalOcean

- Use Docker images
- Deploy with container services
- Set up load balancer

### Environment Variables

Backend (.env):

```
MONGODB_URI=mongodb://localhost:27017/pakistan-bazaar
PORT=5000
NODE_ENV=production
```

Frontend (.env):

```
VITE_API_URL=http://localhost:5000
```

## 📝 Sample Data

The backend automatically seeds sample data on first run, including:

- 12+ authentic Pakistani products
- Multiple categories
- Product ratings and descriptions
- Stock information

## 🔒 Security Features

- CORS enabled for frontend communication
- Input validation
- Secure payment (COD)
- Environment variable protection

## 📄 License

MIT License - feel free to use for learning and commercial projects

## 👨‍💻 Author

Created as a full-stack e-commerce demonstration project

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

---

Made with ❤️ for Pakistan
