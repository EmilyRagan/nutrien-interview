FROM node

EXPOSE 3000

RUN mkdir /app && chown node:node /app
WORKDIR /app

COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
CMD npm run start
