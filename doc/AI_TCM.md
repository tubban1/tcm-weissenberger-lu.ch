# 🟩 **PRD：AI 健康诊断（AI Health Intake – TCM＋ICD-11）功能说明文档**

## 📌 **版本信息**

* Version: 1.0
* Date: 2025
* Product: 瑞士中医诊所网站
* Module: AI 健康诊断（匿名 AI Intake）
* Author: —
* Status: Ready for Development

---

# ✅ **1. 功能目标（Goal）**

为瑞士患者提供一个匿名、简洁、安全、符合中医逻辑且可生成初诊报告的 **AI 健康自助问诊**（TCM Intake Tool），并支持：

* 语言本地化（德语 / 英语 / 中文）
* 全程 GDPR/DSG 合规
* AI 自动分析（基于 TCM + ICD-11）
* 立即可预约治疗（转化目标）

此工具不收集姓名、地址、出生日期，不构成医疗诊断，只用于初步的健康评估。

---

# ✅ **2. 语言系统（Multilanguage Support）**

### **2.1 语言来源**

语言由当前网页语言状态决定，使用全站语言切换器同步：

* **DE (Deutsch) – 默认**
* EN (English)
* ZH (中文)

### **2.2 语言内容**

所有以下内容需多语言：

* 隐私提示
* 操作提示
* 主诉列表
* 问诊问题
* 最终报告（但报告中的 TCM/ICD-11 名称保留原始名词，依语言附带解释）

---

# ✅ **3. 入口与隐私确认（必选步骤）**

### **3.1 用户进入 AI 健康诊断界面**

进入后立即显示隐私说明（按语言）。

**德语示例：**

> ⚠️ *Bitte geben Sie keine persönlichen Daten wie Name, Geburtsdatum oder Adresse ein. Die Analyse erfolgt vollständig anonymisiert.
> Um fortzufahren, akzeptieren Sie bitte die Datenschutzbestimmungen.*

**English:**

> ⚠️ *Please do not enter personal data such as name, date of birth, or address. The analysis is fully anonymized.
> To proceed, please accept the privacy notice.*

**中文：**

> ⚠️ *请勿输入姓名、出生日期、地址等个人信息。本功能为匿名分析。
> 如需继续，请勾选隐私确认。*

### **3.2 必须勾选 CheckBox 才能启用功能**

`[ ] I agree / Ich stimme zu / 我同意`

勾选前：所有输入框和按钮均为 disabled
勾选后：功能激活

---

# ✅ **4. 主诉选择（Chief Complaint Selection）**

用户可以多选主诉。
主诉列表根据瑞士患者高频症状编写：

### 主诉（可多选）

* Migräne / Kopfschmerzen
* Rückenschmerzen
* Schlafstörungen
* Stress / Nervosität
* Verdauungsprobleme
* Müdigkeit / Erschöpfung
* Gelenkschmerzen
* Menstruationsbeschwerden
* Andere (frei eingeben)

选择至少一个主诉后 → “Weiter / Next” 按钮激活。

---

# ✅ **5. 动态追问（Adaptive Follow-up Questions）**

选择主诉后进入动态问诊界面。
所有问题基于 TCM 四诊（望闻问切） + 西医常见评估标准。

### **五大固定模块（按语言显示）**

1. **Seit wann? / Since when? / 症状开始时间（时长）**
2. **Wie oft? / Frequency / 频率**
3. **Wo genau? / Location / 部位**
4. **Begleitsymptome / Accompanying symptoms / 伴随症状**
5. **Schlaf, Verdauung, Stuhlgang, Menstruation（TCM 必问）**
6. **Stresslevel（0–10）**

### **交互设计要求：**

* 尽可能多选题、数字选择器、按钮选择
* 文本框为可选补充
* 每个模块填写后收敛为结构化内容
* 所有问题填写完后 → 进入“对话框合成页”

---

# ✅ **6. 对话框合成页（Review & Edit Screen）**

系统将用户所有回答自动整合成一条自然语言对话（按语言）。

例如（德语示例）：

```
Patient: Ich habe seit 3 Wochen Migräne, etwa 3–4 Mal pro Woche, meist auf der rechten Seite. 
Es kommt mit Übelkeit und Schlafproblemen. Verdauung ist unregelmäßig, Stresslevel ca. 7/10.
```

### 用户可操作：

* 可对文本进行补充/修改（自由编辑）
* 可点击：**„Analyse starten“ / “Start Analysis” / “开始分析”**

---

# ✅ **7. AI 分析逻辑（Backend AI Prompt）**

### **7.1 System Prompt（强制）**

```text
You are a professional TCM doctor. You represent Doctor Lu.
Your task is to analyze the user’s anonymous description based on Traditional Chinese Medicine (TCM),
WHO ICD-11 Traditional Medicine Chapter 26, and Western ICD-11 MMS.
You must follow these rules:
- Output must be fully anonymized.
- Do not infer personal identity.
- Provide a structured initial assessment.
- Provide both TCM pattern classification and ICD-11 TM codes.
- Provide Western ICD-11 MMS codes based on symptoms.
- Provide simple and safe recommendations.
- Avoid giving medical diagnoses; only initial assessment and suggestions.
```

### **7.2 User Prompt（Variable）**

包含用户编辑后的完整对话内容。

---

# ✅ **8. AI 输出内容（Initial Report）**

输出必须结构化，按语言显示（DE/EN/ZH，随页面语言）。

### 报告结构：

```
1. Hauptbeschwerde / Chief Complaint / 主诉
2. TCM Einschätzung（含 ICD-11 TM Code）
3. Western ICD-11 Einschätzung（MMS）
4. Erklärung des Musters（pattern explanation）
5. Behandlungsempfehlung（非医疗诊断）
6. Lifestyle-Empfehlung（睡眠、饮食、运动）
7. Sicherheitshinweis（Red Flags）
```

所有 ICD 仅使用主码，不使用扩展码。

示例：

**TCM ICD-11 TM Code:** *TM8A20.3*
**Western ICD-11 Code:** *8A80.0*（Migräne）

---

# ✅ **9. 报告下方的预约模块**

分析完成后立即显示预约组件：

---

### **模块标题：**

**„Möchten Sie jetzt einen Termin buchen?“**

按钮：

### **„Termin buchen“（跳转日历空位）**

页面调用现有 Google Calendar 接口显示可预约时间。

---

# ✅ **10. 前端流程图**

```
[选择语言] 
      ↓
[进入 AI 健康诊断] 
      ↓
[隐私提示 + 勾选 → 激活功能]
      ↓
[多选主诉]
      ↓
[动态追问（模块化）]
      ↓
[对话框合成页（可修改）]
      ↓
[AI 生成初诊报告]
      ↓
[立即预约按钮]
      ↓
[Google Calendar 预约]
```

---

# 🎯 **11. 技术要求（可交给 Cursor）**

### **前端**

* Next.js / Vue / 静态网站均可
* 语言切换为全局状态
* 所有交互必须无刷新
* 多选与动态问诊使用 JSON config 驱动，便于维护

### **后端 / API**

* OpenAI API 或自建模型
* 不保存用户数据（仅传给 AI）
* 所有输入必须自动脱敏

### **安全**

* 不允许输入姓名/地址/生日（自动 strip 常见模式）
* 不写入数据库

---
