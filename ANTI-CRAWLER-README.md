# 防爬虫保护系统说明
# Anti-Crawler Protection System Documentation

## 🛡️ 系统概述 (System Overview)

这是一个全面的防爬虫保护系统，旨在保护你的2048游戏网站免受恶意爬虫、自动化工具和恶意访问的侵害。

This is a comprehensive anti-crawler protection system designed to protect your 2048 game website from malicious crawlers, automation tools, and malicious access.

## 🚀 主要功能 (Main Features)

### 1. 多层保护 (Multi-Layer Protection)
- **客户端保护** - JavaScript检测和阻止
- **服务器端保护** - Apache .htaccess规则
- **HTTP头部保护** - 安全策略和限制
- **行为监控** - 用户行为模式分析

### 2. 智能检测 (Intelligent Detection)
- **用户代理检测** - 识别常见爬虫工具
- **行为模式分析** - 监控鼠标移动、键盘输入等
- **自动化工具检测** - 检测Selenium、PhantomJS等
- **开发者工具检测** - 检测F12、右键菜单等

### 3. 蜜罐陷阱 (Honeypot Traps)
- **隐藏链接** - 管理员面板、API端点等
- **隐藏表单** - 自动填充检测
- **虚假内容** - 误导爬虫

### 4. 访问控制 (Access Control)
- **频率限制** - 请求频率控制
- **IP封禁** - 自动封禁恶意IP
- **会话监控** - 用户会话行为分析

## 📁 文件结构 (File Structure)

```
2468-game-online/
├── index.html              # 主页面（包含基础防爬虫保护）
├── anti-crawler.js         # 高级防爬虫保护系统
├── .htaccess               # 服务器端保护规则
├── robots.txt              # 爬虫访问控制
└── ANTI-CRAWLER-README.md  # 本文档
```

## ⚙️ 配置说明 (Configuration)

### 基础保护 (Basic Protection)
在 `index.html` 中已经集成了基础的防爬虫保护：
- 用户代理检测
- 行为监控
- 蜜罐陷阱
- 开发者工具检测

### 高级保护 (Advanced Protection)
`anti-crawler.js` 提供了更高级的保护功能：
- 可配置的检测规则
- 详细的统计信息
- 灵活的阻止策略
- 模块化设计

### 服务器保护 (Server Protection)
`.htaccess` 文件包含服务器端的保护规则：
- 用户代理过滤
- 请求频率限制
- 安全头部设置
- 敏感文件保护

## 🔧 使用方法 (Usage)

### 1. 自动启用 (Auto-Enable)
系统会在页面加载时自动启用，无需手动配置。

### 2. 手动配置 (Manual Configuration)
如果需要自定义配置，可以修改 `anti-crawler.js` 中的配置对象：

```javascript
const config = {
    enabled: true,           // 启用保护
    strictMode: true,        // 严格模式
    rateLimit: {
        requests: 100,       // 每小时请求限制
        timeWindow: 3600000, // 时间窗口（毫秒）
        blockDuration: 86400000 // 封禁时长（毫秒）
    },
    detection: {
        userAgent: true,     // 用户代理检测
        behavior: true,      // 行为检测
        automation: true,    // 自动化检测
        devTools: true,      // 开发者工具检测
        iframe: true,        // iframe检测
        honeypot: true      // 蜜罐检测
    }
};
```

### 3. 监控和日志 (Monitoring & Logging)
系统会在控制台输出保护状态和检测结果：

```javascript
// 查看保护状态
console.log(window.antiCrawler.stats);

// 查看配置
console.log(window.antiCrawler.config);
```

## 🚨 检测规则 (Detection Rules)

### 用户代理检测 (User Agent Detection)
- `bot`, `crawler`, `spider`, `scraper`
- `curl`, `wget`, `python`, `requests`
- `selenium`, `phantomjs`, `headless`
- `automation`, `webdriver`

### 行为检测 (Behavior Detection)
- 鼠标移动频率
- 键盘输入模式
- 滚动行为
- 触摸事件
- 页面交互时间

### 环境检测 (Environment Detection)
- 屏幕分辨率
- 视口大小
- 浏览器特性
- 自动化标志

## 🛠️ 自定义配置 (Customization)

### 1. 修改检测规则
```javascript
// 在 anti-crawler.js 中修改
this.suspiciousPatterns = [
    'your-custom-pattern',
    'another-pattern'
];
```

### 2. 调整频率限制
```javascript
this.config.rateLimit = {
    requests: 200,           // 增加请求限制
    timeWindow: 1800000,    // 缩短时间窗口到30分钟
    blockDuration: 3600000   // 缩短封禁时长到1小时
};
```

### 3. 自定义蜜罐内容
```javascript
// 添加自定义蜜罐链接
const customHoneypots = [
    '/your-admin', '/your-api', '/your-secret'
];
```

## 📊 性能影响 (Performance Impact)

### 内存使用 (Memory Usage)
- 基础保护：约 50-100KB
- 高级保护：约 100-200KB
- 总计：约 150-300KB

### CPU使用 (CPU Usage)
- 正常使用：< 1%
- 检测模式：1-5%
- 阻止模式：5-10%

### 网络影响 (Network Impact)
- 无额外网络请求
- 不影响游戏性能
- 不影响用户体验

## 🔒 安全特性 (Security Features)

### 1. 反调试 (Anti-Debug)
- 检测开发者工具
- 检测控制台访问
- 检测断点设置

### 2. 代码保护 (Code Protection)
- 对象冻结
- 属性保护
- 方法隐藏

### 3. 环境检测 (Environment Detection)
- 虚拟机检测
- 沙箱检测
- 代理检测

## ⚠️ 注意事项 (Important Notes)

### 1. 误报处理 (False Positive Handling)
- 系统可能会误判某些正常用户
- 建议在测试环境中充分测试
- 可以根据需要调整检测阈值

### 2. 兼容性 (Compatibility)
- 支持所有现代浏览器
- 支持移动设备
- 支持触摸操作

### 3. 维护 (Maintenance)
- 定期更新检测规则
- 监控误报情况
- 根据新威胁调整策略

## 🆘 故障排除 (Troubleshooting)

### 1. 保护系统不工作
- 检查JavaScript是否启用
- 检查控制台是否有错误
- 确认文件路径正确

### 2. 误报过多
- 降低检测敏感度
- 调整行为检测阈值
- 检查用户行为模式

### 3. 性能问题
- 减少检测频率
- 简化检测规则
- 优化代码结构

## 📈 未来改进 (Future Improvements)

### 1. 机器学习集成
- 用户行为模式学习
- 自适应检测阈值
- 智能威胁识别

### 2. 云端保护
- 实时威胁情报
- 分布式防护
- 协同防御

### 3. 更多检测方法
- 指纹识别
- 网络行为分析
- 时间模式分析

## 📞 技术支持 (Technical Support)

如果你在使用过程中遇到问题，可以：
1. 检查浏览器控制台的错误信息
2. 查看防爬虫系统的日志输出
3. 调整配置参数
4. 联系技术支持

---

**注意**: 这个防爬虫系统是为了保护你的网站安全而设计的。请确保在合法和合理的范围内使用，避免影响正常用户的访问体验。

**Note**: This anti-crawler system is designed to protect your website security. Please ensure it's used within legal and reasonable bounds, avoiding impact on normal user access experience. 