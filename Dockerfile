FROM node:18-alpine

WORKDIR /app

RUN npm install --global pm2

COPY package.json pnpm-lock.yaml ./

RUN npm install

COPY . .

RUN npx prisma generate && npm run build

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# CMD ["pnpm", "start"]
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]