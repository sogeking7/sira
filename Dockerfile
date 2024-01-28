
# Use the official Node.js 14 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN yarn global add pnpm && pnpm i 

# Copy the rest of the application files to the container
COPY . .

# Build the Next.js app for production
RUN pnpm run build

# Expose the port that Next.js uses (usually 3000)
EXPOSE 3000

# Command to start the Next.js app
CMD ["pnpm", "start"]