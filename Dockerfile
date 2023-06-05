#Base image file
FROM node:18-alpine

#App Directory inside image
WORKDIR /usr/src/app

#Copy package.json and package-lock.json and tsconfig.json files to the app
COPY package*.json ./
COPY tsconfig.json ./
COPY ormconfig.json ./



#define env variables
ENV NODE_ENV=dev
ENV PORT=5000
ENV PGHOST=ep-crimson-frost-061795.us-east-2.aws.neon.tech
ENV PGUSER=maadmughal
ENV PGPASSWORD="AraR5dbjC1vk"
ENV PGDATABASE=neondb
ENV JWT_SECRET=abcdefgh
ENV JWT_EXP=1d

#Install dependencies-- clean install is recommended in automated installations
RUN npm ci

#copy files and folders to image
COPY . .

#expose port on which container will listen
EXPOSE 5000

#start command
CMD [ "npm", "run", "dev" ]

