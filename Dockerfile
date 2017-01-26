FROM node:latest

# Create app directorybower install --allow-root 
RUN mkdir -p /usr/src/appbower
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY bower.json /usr/src/app

RUN npm install 
RUN npm install -g bower 
RUN npm install -g gulp-cli  
RUN bower install --allow-root --config.interactive=false

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD [ "gulp", "serve" ]
