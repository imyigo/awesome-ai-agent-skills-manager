# ⚡ Claude & Antigravity 最佳 Skill 技能/MCP 框架

> **专为 Claude Code 和 Google Antigravity 打造的高效 Token 优化、3 层模块化 Skill 技能与 MCP 基础架构。** 融合 10+ 个顶级开源社区 Skill，具备无冲突架构与 Git Submodules 实时同步能力。

---

## 🌟 核心特性

* **🧠 统一超级技能 (`unified-dev`):** 整合 10+ 社区技能，无指令冲突。
* **⚡ 节省 60-70% Token:** 采用 3 层 **Lazy-Load 按需加载** 架构，仅在触发特定领域（Web、移动端、安全等）时加载详细参考文档。
* **🔄 实时 Git 自动同步:** 通过 **Git Submodules** 直连原版开源仓库，一键更新所有技能！
* **🛡️ 100% 安全开源:** 无硬编码凭据，完全符合 Public 仓库开源安全标准。
* **🖥️ 多设备无缝同步:** 提供 `setup.ps1` 自动化脚本，轻松在多台 PC 之间同步设置。

---

## 🚀 快速开始 (30秒)

### 1. 递归克隆仓库
```bash
git clone --recursive https://github.com/imyigo/claude-antigravity-skills.git ~/.gemini/claude-antigravity-best-skills
```

### 2. 运行安装脚本
```powershell
cd ~/.gemini/claude-antigravity-best-skills
.\setup.ps1
```

### 3. 一键同步上游更新
```powershell
.\update-skills.ps1
```

---

## 📜 开源协议

本项目基于 [MIT](LICENSE) 协议开源。
