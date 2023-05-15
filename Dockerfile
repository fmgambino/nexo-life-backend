FROM node:16.15.1-alpine

WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install

#RUN npx prisma generate
#RUN npx prisma migrate dev

#CMD ["yarn", "dev"]