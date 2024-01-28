FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN yarn global add pnpm && pnpm i 

COPY . .

RUN npx prisma generate && pnpm run build

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["pnpm", "start"]