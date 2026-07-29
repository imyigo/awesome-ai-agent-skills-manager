<p align="center">
  <img src="https://img.shields.io/badge/Brain_Manager-v2.5-5B5BD6?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/支持的AI工具-19个-00C853?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/安装时间-90秒-FF6D00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/许可证-MIT-blue?style=for-the-badge" />
</p>

<h1 align="center">🧠 Awesome Universal Agent Brain Manager</h1>
<p align="center"><b>一个控制台管理所有 AI 编程助手 — 技能、MCP 服务器和预设，全部统一同步。</b></p>

---

<p align="center">
  🌍 <b>选择语言</b><br><br>
  <a href="../README.md"><b>🇬🇧 English</b></a> &nbsp;•&nbsp;
  <a href="README.tr.md"><b>🇹🇷 Türkçe</b></a> &nbsp;•&nbsp;
  <a href="README.zh.md"><b>🇨🇳 中文</b></a> &nbsp;•&nbsp;
  <a href="README.ja.md"><b>🇯🇵 日本語</b></a> &nbsp;•&nbsp;
  <a href="README.de.md"><b>🇩🇪 Deutsch</b></a> &nbsp;•&nbsp;
  <a href="README.es.md"><b>🇪🇸 Español</b></a>
</p>

---

## 😤 每个 AI 开发者都遇到的问题

你同时使用 **Claude Code**、**Cursor**、**Windsurf**、**Copilot** 等多个工具。  
每个工具都有自己的 `SKILL.md`、`rules/`、`mcp_config.json`、斜杠命令目录。

**结果呢？**

```
❌  你在 Claude 里更新了技能 → Cursor 完全不知道
❌  你添加了一个 MCP 服务器 → 需要在 5 个工具里分别配置
❌  你安装了新技能仓库 → 要手动复制到每个 AI 助手的目录
❌  你切换项目 → 所有工作流预设都消失了
❌  新成员加入团队 → "配置文件在哪？" 3 小时的新人培训
```

**你在管理配置，而不是写软件。**

---

## ✅ 解决方案：一个大脑，管理所有助手

```
┌─────────────────────────────────────────────────────────────────┐
│               🧠 AGENT BRAIN MANAGER                            │
│                                                                 │
│  📁 repo/skills/          ←  在这里 git clone 任意技能仓库      │
│  📋 MCP 服务器            ←  配置一次，自动同步到所有工具        │
│  ⚡ 工作流预设            ←  一键切换上下文                      │
│  🔴 实时 SSE 引擎         ←  实时推送到所有 AI 助手             │
│                                                                 │
│  控制台 → http://localhost:3777                                 │
└────────────────┬────────────────────────────────────────────────┘
                 │  自动同步（复制模式）
     ┌───────────┼───────────────────────────────┐
     ▼           ▼           ▼           ▼        ▼
  Claude      Cursor     Windsurf    Copilot   + 15 个
  Code        IDE        IDE         Chat      更多工具
  ✅ 技能     ✅ 规则    ✅ 技能     ✅ 技能    ✅ 全部同步
  ✅ MCP      ✅ MCP     ✅ MCP      ✅ MCP
```

**更新一次 → 立即同步到全部 19 个 AI 工具。**

---

## ⚡ 90 秒完成安装

> **要求：** Node.js 18+ 和 Git。仅此而已。

```bash
# 1. 克隆仓库
git clone https://github.com/imyigo/awesome-universal-agent-brain-manager.git
cd awesome-universal-agent-brain-manager

# 2. 启动
node gui/gui_server.js

# 3. 打开浏览器 → http://localhost:3777
```

**无需 Docker。无需 Python。无需构建步骤。无需编辑配置文件。**  
打开控制台 → 点击你的 AI 工具旁边的"连接" → 完成。✅

---

## 📋 系统要求

| 工具 | 是否必需 | 说明 |
|------|---------|------|
| **Node.js** | ✅ 必需 | v18 或更高版本 |
| **Git** | ✅ 必需 | 用于克隆技能仓库 |
| **Docker CLI** | ❌ 可选 | 仅用于核心引擎守护进程 |
| **Python** | ❌ 可选 | 部分技能需要 |
| **浏览器** | ✅ 必需 | Chrome、Firefox、Edge |

---

## 🛠️ 功能一览

- **📦 技能仓库管理器** — 输入 URL 安装 GitHub 仓库，自动复制到所有 AI 助手
- **🛍️ 入门套装** — 精选多仓库包（全栈开发、安全审计、创意工作室、AI 记忆引擎...）
- **🔌 MCP 服务器管理** — Stdio 和 HTTP/SSE 服务器，内置 API 密钥管理
- **⚡ 工作流预设** — 根据当前任务一键切换技能集合
- **🔴 实时终端** — 每个 git/安装操作逐行流式输出
- **💾 SQLite 备份/恢复** — 将完整系统状态导出为单个 JSON 文件
- **🛡️ 安全扫描器** — 检测技能文件中的危险模式

---

## 🔌 支持的 19 个 AI 工具

```
1. Google Antigravity    6. Cline          11. OpenCode      16. Pi Agent
2. Claude Code           7. Roo Code       12. Zed Editor    17. Hermes
3. Cursor IDE            8. Continue       13. Augment       18. OpenClaw
4. OpenAI Codex          9. GitHub Copilot 14. Amp           19. 通用 Agents
5. Windsurf             10. Aider          15. Gemini CLI
```

---

## 📜 许可证

MIT — 个人和商业使用免费。

---

<p align="center">
  <b>⭐ 如果这个工具帮你节省了时间，请给仓库点个星！</b><br><br>
  <a href="../README.md">🇬🇧 English</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a> •
  <a href="README.zh.md">🇨🇳 中文</a> •
  <a href="README.ja.md">🇯🇵 日本語</a> •
  <a href="README.de.md">🇩🇪 Deutsch</a> •
  <a href="README.es.md">🇪🇸 Español</a>
</p>
