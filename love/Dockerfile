# Etapa base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia package.json e instala deps
COPY package.json package-lock.json* ./
RUN npm install

# Copia o restante do app
COPY . .

# Porta usada pelo Vite
EXPOSE 5173

# Comando padrão (sobrescrito pelo docker-compose)
CMD ["npm", "run", "dev"]
