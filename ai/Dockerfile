# ---------- build stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /workspace

# copy maven wrapper / pom / sources
COPY pom.xml mvnw ./
COPY .mvn .mvn
# download dependencies (speed up rebuilds)
RUN mvn -B -e -q dependency:go-offline

# copy source and build jar
COPY src ./src
RUN mvn -B -e -q -DskipTests package

# ---------- runtime stage ----------
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# copy the fat jar from build stage (Spring Boot repackage name pattern)
COPY --from=build /workspace/target/*-SNAPSHOT.jar app.jar
# if your jar is not SNAPSHOT use: COPY --from=build /workspace/target/*.jar app.jar

# set the port via environment variable (Render provides $PORT)
ENV JAVA_OPTS=""
ENV PORT=${PORT:-8080}
EXPOSE ${PORT}

# run the app
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar --server.port=${PORT}"]