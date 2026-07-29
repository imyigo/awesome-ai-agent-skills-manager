<p align="center">
  <img src="https://img.shields.io/badge/Brain_Manager-v2.5-5B5BD6?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/AI対応-19ツール-00C853?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/セットアップ-90秒-FF6D00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ライセンス-MIT-blue?style=for-the-badge" />
</p>

<h1 align="center">🧠 Awesome Universal Agent Brain Manager</h1>
<p align="center"><b>すべての AI コーディングエージェントをひとつのダッシュボードで管理 — スキル、MCP サーバー、プリセットを一元同期。</b></p>

---

<p align="center">
  🌍 <b>言語を選択</b><br><br>
  <a href="../README.md"><b>🇬🇧 English</b></a> &nbsp;•&nbsp;
  <a href="README.tr.md"><b>🇹🇷 Türkçe</b></a> &nbsp;•&nbsp;
  <a href="README.zh.md"><b>🇨🇳 中文</b></a> &nbsp;•&nbsp;
  <a href="README.ja.md"><b>🇯🇵 日本語</b></a> &nbsp;•&nbsp;
  <a href="README.de.md"><b>🇩🇪 Deutsch</b></a> &nbsp;•&nbsp;
  <a href="README.es.md"><b>🇪🇸 Español</b></a>
</p>

---

## 😤 すべての AI 開発者が抱える問題

**Claude Code**、**Cursor**、**Windsurf**、**Copilot** など複数のツールを使っている。  
それぞれのツールが独自の `SKILL.md`、`rules/`、`mcp_config.json`、コマンドフォルダを持つ。

**その結果は？**

```
❌  Claude でスキルを更新する → Cursor は知らない
❌  MCP サーバーを追加する → 5 つのツールで別々に設定しなければならない
❌  新しいスキルリポジトリをインストール → 各エージェントのフォルダへ手動でコピー
❌  プロジェクトを切り替える → すべてのワークフロープリセットが消える
❌  新メンバーが参加 → 「設定ファイルはどこ？」3 時間のオンボーディング
```

**ソフトウェアを書く代わりに、設定管理に追われている。**

---

## ✅ 解決策：ひとつの脳、すべてのエージェント

```
┌─────────────────────────────────────────────────────────────────┐
│               🧠 AGENT BRAIN MANAGER                            │
│                                                                 │
│  📁 repo/skills/          ←  任意のスキルリポをここにクローン    │
│  📋 MCP サーバー          ←  一度設定 → 全ツールに同期          │
│  ⚡ ワークフロープリセット ←  ワンクリックでコンテキスト切替      │
│  🔴 リアルタイム SSE       ←  全エージェントに即時プッシュ       │
│                                                                 │
│  ダッシュボード → http://localhost:3777                         │
└────────────────┬────────────────────────────────────────────────┘
                 │  自動同期（コピーモード）
     ┌───────────┼───────────────────────────────┐
     ▼           ▼           ▼           ▼        ▼
  Claude      Cursor     Windsurf    Copilot   + 15 の
  Code        IDE        IDE         Chat      ツール
  ✅ スキル   ✅ ルール  ✅ スキル   ✅ スキル  ✅ すべて同期
  ✅ MCP      ✅ MCP     ✅ MCP      ✅ MCP
```

**一度更新 → 19 のエージェントすべてに即時反映。**

---

## ⚡ 90 秒でセットアップ

> **必要なもの：** Node.js 18+ と Git。それだけ。

```bash
# 1. クローン
git clone https://github.com/imyigo/awesome-universal-agent-brain-manager.git
cd awesome-universal-agent-brain-manager

# 2. 起動
node gui/gui_server.js

# 3. ブラウザ → http://localhost:3777
```

**Docker 不要。Python 不要。ビルドステップ不要。設定ファイルの編集不要。**  
ダッシュボードを開く → AI ツールの横の「接続」をクリック → 完了。✅

---

## 📋 システム要件

| ツール | 必須 | 備考 |
|--------|------|------|
| **Node.js** | ✅ 必須 | v18 以上 |
| **Git** | ✅ 必須 | スキルリポのクローン用 |
| **Docker CLI** | ❌ 任意 | コアエンジンデーモン用のみ |
| **Python** | ❌ 任意 | 一部のスキル用 |
| **ブラウザ** | ✅ 必須 | Chrome、Firefox、Edge |

---

## 🛠️ 主な機能

- **📦 スキルリポジトリマネージャー** — URL 入力で GitHub リポをインストール、全エージェントへ自動コピー
- **🛍️ スターターパック** — 厳選マルチリポバンドル（フルスタック開発、セキュリティ、クリエイティブ、AI メモリ...）
- **🔌 MCP サーバー管理** — Stdio & HTTP/SSE サーバー、API キー管理内蔵
- **⚡ ワークフロープリセット** — タスクに応じてスキルセットをワンクリックで切替
- **🔴 ライブターミナル** — すべての git/インストール操作を行ごとにストリーミング
- **💾 SQLite バックアップ/リストア** — システム全体を 1 つの JSON にエクスポート
- **🛡️ セキュリティスキャナー** — スキルファイル内の危険なパターンを検出

---

## 📜 ライセンス

MIT — 個人・商業利用無料。

---

<p align="center">
  <b>⭐ AI エージェント管理の時間を節約できたら、スターをお願いします！</b><br><br>
  <a href="../README.md">🇬🇧 English</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a> •
  <a href="README.zh.md">🇨🇳 中文</a> •
  <a href="README.ja.md">🇯🇵 日本語</a> •
  <a href="README.de.md">🇩🇪 Deutsch</a> •
  <a href="README.es.md">🇪🇸 Español</a>
</p>
