# 诊所需要提供的信息清单

本文档列出了网站中需要诊所提供的所有信息。请填写以下信息以便完善网站内容。

## 1. 联系方式信息（Contact Information）

### 1.1 基本信息
- [ ] **地址（Address）**
  - 完整街道地址
  - 邮政编码
  - 城市
  - 国家（瑞士）
  - 位置：`src/components/Footer.tsx` 和 `src/app/[locale]/contact/page.tsx`

- [ ] **电话（Phone）**
  - 主要联系电话
  - 紧急联系电话（如适用）
  - 位置：`src/components/Footer.tsx` 和 `src/app/[locale]/contact/page.tsx`

- [ ] **邮箱（Email）**
  - 主要联系邮箱
  - 预约专用邮箱（如适用）
  - 位置：`src/components/Footer.tsx` 和 `src/app/[locale]/contact/page.tsx`

### 1.2 营业时间（Opening Hours）
- [ ] **工作日时间**
  - 周一至周五的具体时间
  - 当前显示：09:00 - 18:00（需确认）
  - 位置：`src/app/[locale]/contact/page.tsx`

- [ ] **周末时间**
  - 周六是否营业及时间
  - 周日是否营业及时间
  - 当前显示：周六"Nach Vereinbarung"，周日"Geschlossen"（需确认）
  - 位置：`src/app/[locale]/contact/page.tsx`

### 1.3 交通信息（Transport）
- [ ] **公共交通信息**
  - 附近的地铁/电车/公交线路
  - 最近的车站名称
  - 步行距离
  - 位置：`src/app/[locale]/contact/page.tsx`（当前显示"Öffentliche Verkehrsmittel Informationen werden noch hinzugefügt"）

### 1.4 停车信息（Parking）
- [ ] **停车设施**
  - 是否有停车场
  - 停车场位置
  - 停车费用
  - 附近公共停车场信息
  - 位置：`src/app/[locale]/contact/page.tsx`（当前显示"Parkmöglichkeiten Informationen werden noch hinzugefügt"）

## 2. 关于我们页面（About Page）

### 2.1 资质信息（Qualifications）
- [ ] **教育背景**
  - 具体学位信息（当前显示为占位符）
  - 毕业院校
  - 专业方向
  - 位置：`src/app/[locale]/about/page.tsx`

- [ ] **认证信息**
  - ASCA认证编号（如适用）
  - EMR认证编号（如适用）
  - LCC认证编号（如适用）
  - 其他专业认证
  - 位置：`src/app/[locale]/about/page.tsx`

- [ ] **专业协会会员**
  - TCM专业协会会员信息
  - 其他相关协会会员
  - 位置：`src/app/[locale]/about/page.tsx`

### 2.2 诊所简介
- [ ] **诊所历史**
  - 成立时间
  - 发展历程
  - 位置：可在`src/app/[locale]/about/page.tsx`中添加

- [ ] **医生简介**
  - 医生姓名
  - 专业背景
  - 临床经验
  - 位置：可在`src/app/[locale]/about/page.tsx`中添加

## 3. 服务项目（Services）

### 3.1 服务详情
- [ ] **各项服务的详细描述**
  - 针灸治疗的具体说明
  - 中药调理的详细流程
  - 推拿按摩的服务内容
  - 拔罐疗法的适应症
  - 艾灸治疗的说明
  - 中医咨询的服务范围
  - 位置：`src/i18n/messages/*.json` 中的 `services` 部分

- [ ] **服务价格**
  - 各项服务的收费标准
  - 首次咨询费用
  - 复诊费用
  - 套餐价格（如适用）
  - 位置：`src/app/[locale]/contact/page.tsx`（当前未显示）

## 4. 预约系统（Appointment）

### 4.1 预约配置
- [ ] **Google Calendar集成**
  - Google Calendar ID
  - 预约系统配置
  - 位置：`src/app/[locale]/appointment/page.tsx`（当前有TODO注释）

- [ ] **预约规则**
  - 可预约的时间段
  - 预约提前时间要求
  - 取消政策
  - 位置：可在预约页面添加说明

## 5. 保险信息（Insurance）

### 5.1 保险详情
- [ ] **接受的保险类型**
  - ASCA保险的具体条款
  - EMR保险的具体条款
  - LCC保险的具体条款
  - 其他接受的补充保险
  - 位置：`src/app/[locale]/contact/page.tsx`（当前有基本说明）

- [ ] **保险报销比例**
  - 各项服务的报销比例
  - 自付部分说明
  - 位置：可在联系页面添加

## 6. 其他信息

### 6.1 社交媒体
- [ ] **社交媒体链接**（如适用）
  - Facebook页面
  - Instagram账号
  - LinkedIn页面
  - 其他平台
  - 位置：可在Footer或About页面添加

### 6.2 诊所照片
- [ ] **实景照片**
  - 诊所外观照片
  - 治疗室照片
  - 设备照片
  - 位置：参考 `doc/IMAGE_REQUIREMENTS.md`

### 6.3 患者评价
- [ ] **患者评价**（如适用）
  - 患者推荐信
  - 在线评价链接
  - 位置：可在About页面添加

## 当前状态

### 已填写的信息
- ✅ 版权信息：已更新为 "© 2025 Powered by Tubban.com Agentic AI Services."
- ✅ 基本页面结构：所有页面已创建
- ✅ 多语言支持：德语、英语、中文已配置

### 待填写的信息
- ❌ 所有联系方式（地址、电话、邮箱）
- ❌ 交通和停车信息
- ❌ 详细的资质和认证信息
- ❌ 服务价格信息
- ❌ 预约系统集成配置

## 填写说明

1. **联系方式**：请优先填写，这些信息在多个页面显示
2. **营业时间**：请确认当前显示的时间是否准确
3. **资质信息**：请提供具体的认证编号和会员信息
4. **服务价格**：建议在联系页面添加价格表
5. **预约系统**：如需Google Calendar集成，请提供Calendar ID

填写完成后，请告知开发人员，以便更新网站内容。

