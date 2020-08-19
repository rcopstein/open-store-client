# Create builder container
FROM node:alpine as builder

WORKDIR '/app'

COPY ./package-lock.json ./
COPY ./package.json ./
RUN npm install

COPY . .
RUN npm run build-prod

# Create final image
FROM nginx

EXPOSE 80

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/.htpasswd /etc/nginx/.htpasswd

COPY --from=builder /app/dist /usr/share/nginx/html