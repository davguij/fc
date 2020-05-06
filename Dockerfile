FROM node:12.16-alpine

WORKDIR /usr/app
COPY package*.json ./

RUN npm install

# TODO use npm ci instead of npm install conditionally 
# only if we're building a production image
# RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD [ "node", "src/server" ]