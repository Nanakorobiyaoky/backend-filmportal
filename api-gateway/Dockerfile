FROM node:18.14.0

COPY ./dist ./dist

COPY ./static ./dist/static

COPY ./*.json .

RUN npm install

CMD ["npm", "run", "start:prod"]