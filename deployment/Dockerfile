FROM node
MAINTAINER Sinogear Group


COPY . /app
WORKDIR /app

RUN npm install sb-mock cross-env -g --registry http://ggjs-app-03.hnisi.com.cn:8090

EXPOSE 8000

ENTRYPOINT sb-mock run -p 8000 -t ./dist-mock
