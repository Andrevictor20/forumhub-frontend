# Etapa 1: Instalação das dependências
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Etapa 2: Build da aplicação
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Aceita a URL da API como um argumento de build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# Etapa 3: Imagem final de produção
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copia a saída standalone otimizada do Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Corre a aplicação com um utilizador não-root para maior segurança
USER node
EXPOSE 3000

# Inicia o servidor Next.js
CMD ["node", "server.js"]
