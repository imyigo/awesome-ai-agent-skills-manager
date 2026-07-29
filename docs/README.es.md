<p align="center">
  <img src="https://img.shields.io/badge/Brain_Manager-v2.5-5B5BD6?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Agentes_IA-19_soportados-00C853?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Instalación-90_Segundos-FF6D00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Licencia-MIT-blue?style=for-the-badge" />
</p>

<h1 align="center">🧠 Awesome Universal Agent Brain Manager</h1>
<p align="center"><b>Un panel para todos tus agentes de IA — Habilidades, Servidores MCP y Presets, todo unificado.</b></p>

---

<p align="center">
  🌍 <b>Elige tu idioma</b><br><br>
  <a href="../README.md"><b>🇬🇧 English</b></a> &nbsp;•&nbsp;
  <a href="README.tr.md"><b>🇹🇷 Türkçe</b></a> &nbsp;•&nbsp;
  <a href="README.zh.md"><b>🇨🇳 中文</b></a> &nbsp;•&nbsp;
  <a href="README.ja.md"><b>🇯🇵 日本語</b></a> &nbsp;•&nbsp;
  <a href="README.de.md"><b>🇩🇪 Deutsch</b></a> &nbsp;•&nbsp;
  <a href="README.es.md"><b>🇪🇸 Español</b></a>
</p>

---

## 😤 El problema que conoce todo desarrollador de IA

Usas **Claude Code**, **Cursor**, **Windsurf**, **Copilot** y más herramientas.  
Cada herramienta tiene su propio `SKILL.md`, `rules/`, `mcp_config.json`, carpeta de comandos.

**¿El resultado?**

```
❌  Actualizas una habilidad en Claude → Cursor no lo sabe
❌  Agregas un servidor MCP → tienes que configurarlo en 5 herramientas por separado
❌  Instalas un nuevo repositorio de habilidades → copiar manualmente a cada carpeta
❌  Cambias de proyecto → todos tus presets de flujo de trabajo desaparecen
❌  Un nuevo miembro se une → "¿dónde están las configs?" 3 horas de onboarding
```

**Estás administrando configuraciones en lugar de escribir software.**

---

## ✅ La solución: Un cerebro, todos los agentes

```
┌─────────────────────────────────────────────────────────────────┐
│               🧠 AGENT BRAIN MANAGER                            │
│                                                                 │
│  📁 repo/skills/          ←  haz git clone de cualquier repo   │
│  📋 Servidores MCP        ←  configura una vez, sincroniza todo │
│  ⚡ Presets de flujo      ←  cambia contexto con un clic        │
│  🔴 Motor SSE en vivo     ←  push en tiempo real a todos        │
│                                                                 │
│  Dashboard → http://localhost:3777                              │
└────────────────┬────────────────────────────────────────────────┘
                 │  Auto-sync (Modo copia)
     ┌───────────┼───────────────────────────────┐
     ▼           ▼           ▼           ▼        ▼
  Claude      Cursor     Windsurf    Copilot   + 15 más
  Code        IDE        IDE         Chat      agentes
  ✅ Skills   ✅ Reglas  ✅ Skills   ✅ Skills  ✅ Todo sync
  ✅ MCP      ✅ MCP     ✅ MCP      ✅ MCP
```

**Actualiza una vez → se propaga a los 19 agentes al instante.**

---

## ⚡ Instalación en 90 segundos

> **Requisitos:** Node.js 18+ y Git. Eso es todo.

```bash
# 1. Clonar
git clone https://github.com/imyigo/awesome-universal-agent-brain-manager.git
cd awesome-universal-agent-brain-manager

# 2. Ejecutar
node gui/gui_server.js

# 3. Abrir navegador → http://localhost:3777
```

**Sin Docker. Sin Python. Sin pasos de build. Sin editar archivos de configuración.**  
Abre el panel → haz clic en "Conectar" junto a tus herramientas de IA → listo. ✅

---

## 📋 Requisitos del sistema

| Herramienta | Requerido | Notas |
|-------------|-----------|-------|
| **Node.js** | ✅ Sí | v18 o superior |
| **Git** | ✅ Sí | Para clonar repositorios de habilidades |
| **Docker CLI** | ❌ Opcional | Solo para demonios del Motor Principal |
| **Python** | ❌ Opcional | Solo para ciertas habilidades |
| **Navegador** | ✅ Sí | Chrome, Firefox, Edge |

---

## 🛠️ Funciones principales

- **📦 Gestor de repositorios** — Instala cualquier repositorio GitHub con una URL, copiado automáticamente a todos los agentes
- **🛍️ Paquetes de inicio** — Paquetes multi-repositorio curados (Fullstack, Seguridad, Creativo, Memoria IA...)
- **🔌 Gestión de servidores MCP** — Servidores Stdio y HTTP/SSE, gestión de API keys integrada
- **⚡ Presets de flujo de trabajo** — Cambia el conjunto de habilidades con un clic según la tarea actual
- **🔴 Terminal en vivo** — Cada operación git/instalación transmitida línea por línea
- **💾 Backup/Restauración SQLite** — Exporta el sistema completo a un archivo JSON
- **🛡️ Escáner de seguridad** — Detecta patrones peligrosos en archivos de habilidades

---

## 🔌 19 agentes de IA soportados

```
1. Google Antigravity    6. Cline          11. OpenCode      16. Pi Agent
2. Claude Code           7. Roo Code       12. Zed Editor    17. Hermes
3. Cursor IDE            8. Continue       13. Augment       18. OpenClaw
4. OpenAI Codex          9. GitHub Copilot 14. Amp           19. Agentes genéricos
5. Windsurf             10. Aider          15. Gemini CLI
```

---

## 📜 Licencia

MIT — Gratis para uso personal y comercial.

---

<p align="center">
  <b>⭐ ¡Dale una estrella al repositorio si te ahorra tiempo gestionando configs de agentes IA!</b><br><br>
  <a href="../README.md">🇬🇧 English</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a> •
  <a href="README.zh.md">🇨🇳 中文</a> •
  <a href="README.ja.md">🇯🇵 日本語</a> •
  <a href="README.de.md">🇩🇪 Deutsch</a> •
  <a href="README.es.md">🇪🇸 Español</a>
</p>
