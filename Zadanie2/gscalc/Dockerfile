FROM node:latest
WORKDIR /app
COPY . /app
RUN yarn install --production
CMD ["yarn", "start", "run"]