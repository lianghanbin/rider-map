# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

地图笔记 —— 一个地图标记工具。在地图上点一下，标记位置并添加备注。标记存在浏览器本地，下次打开还在。

## 用户背景

梁汉斌，编程零基础，哲学背景。解释技术概念时用类比和生活化语言，避免术语堆砌。代码里的注释用中文写。

## 项目结构

只有一个文件 `index.html`，里面包含 HTML（页面结构）、CSS（样式）、JavaScript（交互逻辑）三部分。用浏览器打开就能用，无需安装、无需服务器。

## 技术依赖

- **Leaflet.js 1.9.4**：地图引擎，通过 bootcdn（国内 CDN）加载
- **高德地图**：底图瓦片，国内加载快，不需要 API Key（`webrd0{1-4}.is.autonavi.com`）
- **localStorage**：浏览器本地存储，key 为 `rider-markets`，存 JSON 数组

## 数据模型

每个标记是一个对象：

```js
{
  lat: 31.23,       // 纬度
  lng: 121.47,      // 经度
  type: "no-entry", // "no-entry" = 完全不让骑车进, "can-walk" = 可以步行进入
  note: "备注文字",
  time: 1719200000000  // 时间戳（毫秒）
}
```

存于 `localStorage['rider-markers']`，为上述对象的 JSON 数组。

## 运行方式

在 VS Code 里右键 `index.html` → "Open with Live Server"，或者直接在文件管理器双击用浏览器打开。

## 关于用户的记忆

用户偏好和功能地址说明存于 `~/.claude/projects/c--AI/memory/`，包括：
- `user-background.md` — 用户背景和沟通方式
- `feature-locations.md` — Claude Code 各项功能配置的物理地址
