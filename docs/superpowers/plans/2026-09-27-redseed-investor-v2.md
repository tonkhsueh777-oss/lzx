# 红薏米 × 柚信使 商业投资官网 V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将现有面向大众的 IP 展示官网重构为面向潜在投资方、战略合作方、政企文旅项目方、渠道方与平台方的商业投资官网。

**Architecture:** 保持 GitHub Pages 纯静态架构，不新增后端。重写 `index.html` 的信息架构，以投资故事为主线；重构现有 CSS 视觉系统为克制的深色企业投资风，并保留轻量滚动动效、手机菜单与锚点导航。

**Tech Stack:** HTML5 / CSS3 / Vanilla JavaScript / GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-27-redseed-investor-v2-design.md`

## Global Constraints

- 商业事实只使用《2026-红薏米&柚信使 介绍.docx》支持的内容。
- 不新增营收、利润、估值、融资金额、回报率、市场份额等未提供数据。
- 图片、影片、人物照片继续使用占位符。
- 必须支持 PC、平板、手机；不得横向溢出。
- GitHub Pages 直接运行，不引入构建工具或后端。
- 视觉比例：70% 企业 / 投资，20% IP 资产，10% AI 科技。

## Review Focus

- 手机 390px 宽度下无横向溢出，导航可正常展开关闭。
- Hero 首屏 10 秒内能看懂公司定位、三项核心数据与商务 CTA。
- G/B/C 商业模式信息在桌面和手机都保持清晰层级。
- IP 资产卡不退化为娱乐化作品墙，应包含定位、形态、验证、延展方向。
- 所有 CTA 均指向真实页面锚点，不虚构 BP 下载链接。

---

### Task 1: 重构首页信息架构

**Files:**
- Modify: `index.html`

**Produces:** Hero、投资逻辑、AI Production Engine、Business Model、IP Portfolio、Traction、Management Team、Investment & Partnership、Footer。

- [ ] 用 V2 导航与投资人叙事完整替换 V1 页面结构。
- [ ] 保留真实数据：40+、300%、3–4 人完成传统约 15 人团队项目工作量。
- [ ] 将 IP 区改成资产组合卡，并加入商业信息字段。
- [ ] 将项目案例区改成“项目验证 / Traction & Cases”。
- [ ] 将合作区改成投资与长期合作伙伴入口。
- [ ] 检查所有文案均有源文件依据。

### Task 2: 重构视觉系统与响应式布局

**Files:**
- Modify: `styles.css`
- Modify: `styles-1.css`
- Modify: `styles-2.css`
- Modify: `styles-3.css`
- Modify: `styles-4.css`
- Modify: `styles-5.css`

**Produces:** 深墨黑 / 深蓝灰 / 纯白 / 暗朱红 / 低饱和金的企业投资视觉；桌面、平板、手机布局。

- [ ] 降低角色感、游戏感与高饱和视觉。
- [ ] Hero 改为数据 + 商业闭环图形占位。
- [ ] 投资逻辑、商业模式、项目验证使用更强的信息层级。
- [ ] 手机端改单列叙事，并保持商务 CTA 明显。
- [ ] 增加 `prefers-reduced-motion` 支持。

### Task 3: 调整交互脚本

**Files:**
- Modify: `script.js`

**Produces:** 手机菜单、锚点平滑滚动、轻量 reveal、资产卡焦点/悬停辅助行为。

- [ ] 检查 V2 新锚点与导航一致。
- [ ] 菜单打开后点击任一导航自动关闭。
- [ ] 保留轻量 reveal；减少娱乐化动画。
- [ ] 尊重 reduced motion。

### Task 4: 发布检查

**Files:**
- Verify: `index.html`, CSS, `script.js`

- [ ] 检查 HTML 关键 section ID 与导航 href 一致。
- [ ] 检查 1440px、1024px、390px 三类布局逻辑。
- [ ] 检查无未闭合标签、无失效本地资源依赖。
- [ ] 检查 GitHub Pages 根目录仍由 `index.html` 启动。
- [ ] 提交后确认仓库已更新并给出线上地址。
