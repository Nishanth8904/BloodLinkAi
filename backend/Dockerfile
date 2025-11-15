# ---- This is the BUILD stage ----
# Use the official Maven image which contains Eclipse Temurin (Java 17) to build the app
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy the build files
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY src src

# Build the application JAR
RUN mvn -B -e -q -DskipTests package

# ---- This is the FINAL stage ----
# Use a lightweight Java Runtime Environment
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built JAR from the 'build' stage
COPY --from=build /workspace/target/*.jar app.jar

# Health check (this is a good practice)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Set Java options and port from environment variables
ENV JAVA_OPTS=""
ENV PORT=${PORT:8080}
EXPOSE ${PORT}

# Run the application
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar --server.port=${PORT}"]