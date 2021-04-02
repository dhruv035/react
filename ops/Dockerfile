# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN apk add --update --no-cache bash curl iputils nginx && \
    ln -fs /dev/stdout /var/log/nginx/access.log && \
    ln -fs /dev/stdout /var/log/nginx/error.logRUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY ./ops/nginx.conf /etc/nginx/conf.d/default.confx