FROM nginx:1.21.6
COPY nginx.conf /etc/nginx/sites-available/sira.conf
RUN ln -s /etc/nginx/sites-available/sira.conf /etc/nginx/sites-enabled/sira.conf
RUN rm /etc/nginx/conf.d/default