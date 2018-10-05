FROM nginx:alpine
LABEL Author="Charles Stover"
RUN rm -rf /etc/nginx/conf.d
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html index.css index.js /var/www/
EXPOSE 80
