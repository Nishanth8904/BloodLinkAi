# ---- This is the BUILD stage ----
# Use the official Maven image to build the app
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy the build files from the 'backend' subdir
# Docker's build context is the repository root
# Copy the build files (context is already 'backend/')
# Copy the build files (context is already 'backend/')
COPY pom.xml .
COPY src src
# Build the application JAR
RUN mvn -B -e -q -DskipTests package

# ---- This is the FINAL stage ----
# Use a lightweight Java Runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built JAR from the 'build' stage
COPY --from=build /workspace/target/*.jar app.jar

# Set Java options and a default port
ENV JAVA_OPTS=""
ENV PORT 8080
EXPOSE ${PORT}

# Run the application (Render will override $PORT)
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar --server.port=${PORT}"]