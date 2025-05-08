# Squadfit – Your Game, Your Squad

**Squadfit** is a dynamic web application designed to help you and your friends find competitive and friendly matches in sports like football and basketball – with plans to support even more sports in the future. Whether you’re a few players short or simply want a fun, organized game without the hassle, Squadfit has got you covered.

---

## 🚀 Features

- **Match Finder**: Browse and join matches for your favorite sport based on your availability.
- **Google Maps Integration**: Every sport has its own map with courts pinpointed for easy navigation.
- **Match Chat**: Communicate in real-time with other match members via dedicated chat rooms.
- **Achievements & Points**: Earn points by participating in matches and unlock achievements.
- **Email Confirmations**: Receive a confirmation email when you register for a match.
- **Sleek Design**: Enjoy a modern, user-friendly interface that makes it simple to find your next game.

---

## 🧱 Tech Stack

**Frontend**:  
- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- Additional dependencies:
  - React Router for TSX navigation
  - Other common React libraries (e.g., Axios, Redux, etc. as needed)

**Backend**:  
- [Java Spring Boot](https://spring.io/projects/spring-boot) – for robust REST APIs and backend logic

**Database**:  
- PostgreSQL running in Docker for an isolated, reproducible environment

**Additional Tools**:  
- Google Maps API – for mapping courts for every sport
- SMTP or Email Service Integration – to send registration confirmation emails

---

## 🐳 Local Setup

### Prerequisites
- Node.js (v14+ recommended)
- Docker & Docker Compose
- Java 17+ and Maven

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SerbanTudor-Fechete/PolihackV17Squadfit.git
   cd squadfit
