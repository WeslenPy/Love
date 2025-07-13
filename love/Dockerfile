# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa final: servir com NGINX
FROM nginx:stable-alpine AS production

# Copia o build para o diretório público do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
