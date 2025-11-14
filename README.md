# BloodLinkAI — Advanced Blood Bank Management System

An intelligent blood bank management system built with modern microservices architecture, featuring AI-powered donor matching and comprehensive blood inventory management.

## 🩸 Features

- **AI-Powered Matching**: Machine learning algorithms for optimal donor-patient matching
- **Real-time Inventory**: Live tracking of blood inventory and availability
- **Smart Predictions**: Donor availability prediction based on donation history
- **Modern UI**: Responsive React-based dashboard
- **Microservices Architecture**: Scalable and maintainable system design
- **RESTful APIs**: Well-documented APIs for system integration

## 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Spring Boot     │    │  FastAPI AI     │
│   (Port 3000)    │◄──►│  Backend         │◄──►│  Service        │
│                 │    │  (Port 8080)     │    │  (Port 8001)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  MySQL Database │
                       │  (Port 3306)    │
                       └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Java 17+** (JDK 17 or newer)
- **Maven 3.9+** for backend build management
- **Python 3.10+** for AI service
- **Node.js 18+** for frontend development
- **MySQL 8.0+** (or Docker for containerized MySQL)

### 1. Database Setup

```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS bloodlinkai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 2. Backend Setup

```bash
cd backend

# Configure environment (copy and modify .env.example)
cp ../.env.example .env

# Build and run the Spring Boot application
mvn clean spring-boot:run
```

The backend will:
- Auto-create database tables using `schema.sql`
- Populate initial data using `data.sql`
- Start REST API server on port 8080

### 3. AI Service Setup

```bash
cd ai

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the AI service
uvicorn main:app --reload --port 8001
```

The AI service will:
- Train machine learning model on startup
- Provide prediction API on port 8001
- Generate automatic API documentation at http://localhost:8001/docs

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

## 📡 API Endpoints

### Backend APIs

#### Donors
- `GET /api/donors` — List all donors
- `GET /api/donors/{id}` — Get donor by ID
- `POST /api/donors` — Add new donor
- `GET /api/donors/search` — Search donors by blood group/location

#### Patients
- `GET /api/patients` — List all patients
- `GET /api/patients/{id}` — Get patient by ID
- `POST /api/patients` — Add new patient

#### Blood Requests
- `GET /api/requests` — List all blood requests
- `POST /api/requests` — Create blood request
- `POST /api/match` — Find AI-powered donor matches
- `PUT /api/requests/{id}/status` — Update request status

#### System
- `GET /api/health` — System health check
- `GET /hello` — Simple health endpoint

### AI Service APIs

- `POST /predict` — Predict donor availability
- `GET /health` — AI service health check
- `GET /docs` — Interactive API documentation
- `GET /model/info` — Machine learning model information

## 🤖 Machine Learning Features

The AI service uses a **Logistic Regression** model trained on synthetic data with the following features:

1. **Days Since Last Donation** (normalized by 120 days)
2. **Donation Streak** (normalized by 5 donations)
3. **Blood Group Rarity Weight** (O+: 0.3 → AB-: 0.9)
4. **Units Requested** (normalized by 4 units)
5. **Location Proximity** (same city boolean)

### Blood Group Rarity Weights
- **Common**: O+ (0.3), A+ (0.35), B+ (0.35)
- **Moderate**: AB+ (0.6), A- (0.6), B- (0.6)
- **Rare**: O- (0.7), AB- (0.9)

## 🐳 Docker Support

### AI Service
```bash
cd ai
docker build -t bloodlinkai-ai .
docker run -p 8001:8001 bloodlinkai-ai
```

### Full Stack with Docker Compose
```yaml
# docker-compose.yml (to be created)
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: Nishanth@2004
      MYSQL_DATABASE: bloodlinkai
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql

  ai-service:
    build: ./ai
    ports:
      - "8001:8001"

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

## 📊 Database Schema

### Core Tables

**donors**
- `id` (INT, Primary Key)
- `name`, `blood_group`, `location`
- `last_donation_date`, `streak`
- `phone`, `email`

**patients**
- `id` (INT, Primary Key)
- `name`, `blood_group`, `location`
- `units_needed`, `urgency_level`
- `hospital`, `contact_phone`

**requests**
- `id` (INT, Primary Key)
- `patient_id` (Foreign Key)
- `blood_group`, `units`, `location`
- `status`, `priority_score`

**matches**
- `request_id`, `donor_id` (Foreign Keys)
- `availability_score`, `match_rank`

## 🔧 Configuration

### Backend Configuration (`application.properties`)
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/bloodlinkai
spring.datasource.username=root
spring.datasource.password=Nishanth@2004

# AI Service
app.ai.base-url=http://localhost:8001

# CORS
cors.allowed.origins=http://localhost:3000
```

### Frontend Configuration
```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### AI Service Testing
```bash
cd ai
# Test prediction endpoint
curl -X POST "http://localhost:8001/predict" \
  -H "Content-Type: application/json" \
  -d '{"donorId": 1, "bloodGroup": "O+", "units": 2}'
```

### Frontend Testing
```bash
cd frontend
npm run lint
npm run build
```

## 🚀 Production Deployment

### Security Considerations
1. **Environment Variables**: Store sensitive data in environment variables
2. **HTTPS**: Enable SSL/TLS encryption
3. **Authentication**: Implement JWT-based authentication
4. **Input Validation**: Validate all API inputs
5. **Rate Limiting**: Implement API rate limiting

### Monitoring & Logging
- **Spring Boot Actuator**: Health checks and metrics
- **Application Logs**: Structured logging with correlation IDs
- **Database Monitoring**: Query performance and connection pooling
- **AI Model Monitoring**: Prediction accuracy and drift detection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot** for robust backend framework
- **FastAPI** for high-performance AI service
- **scikit-learn** for machine learning capabilities
- **React** for modern frontend development
- **MySQL** for reliable data storage

## 📞 Support

For support and questions:
- **Email**: support@bloodlinkai.com
- **Documentation**: [Project Wiki](https://github.com/bloodlinkai/docs)
- **Issues**: [GitHub Issues](https://github.com/bloodlinkai/issues)

---

Built with ❤️ for saving lives through technology.