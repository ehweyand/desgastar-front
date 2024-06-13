# Build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .

RUN npx patch-package
RUN npm run type-check
RUN npm run build-only

# Production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from the stage 1
COPY --from=build-stage /app/dist /usr/share/nginx/html/desgastar
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]