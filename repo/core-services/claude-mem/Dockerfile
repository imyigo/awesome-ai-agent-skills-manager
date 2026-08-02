# Claude Long-Term Memory Engine — izole container.
# Host'a Node/npm kurmadan çalışır. Build: docker build -t brain-core-claude-mem:local .
FROM node:20-slim

# claude-mem paketini global kur.
RUN npm install -g @thedotmack/claude-mem@latest \
    && npm cache clean --force

# Hafıza veritabanı için kalıcı dizin (volume ile mount edilebilir).
ENV CLAUDE_MEM_HOME=/data
RUN mkdir -p /data
VOLUME ["/data"]

EXPOSE 3780

# MCP/HTTP sunucusunu 3780'de başlat.
CMD ["claude-mem", "server", "--port", "3780"]
