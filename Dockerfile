FROM node:18-alpine

WORKDIR /app

RUN npm install --global pm2
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN npx prisma generate && pnpm run build

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]