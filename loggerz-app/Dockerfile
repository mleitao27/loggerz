FROM node:latest
WORKDIR /usr/src/app/loggerz-app
COPY . ./
RUN npm install
RUN chmod -R 777 /usr/src/app/loggerz-app/node_modules/
EXPOSE 8080
CMD ["npm", "run", "dev"]
# CMD ["tail", "-f", "/dev/null"]