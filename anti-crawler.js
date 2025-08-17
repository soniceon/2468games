/**
 * 高级防爬虫保护系统
 * Advanced Anti-Crawler Protection System
 */

class AdvancedAntiCrawler {
    constructor() {
        this.config = {
            enabled: true,
            strictMode: true,
            rateLimit: {
                requests: 100,
                timeWindow: 3600000, // 1小时
                blockDuration: 86400000 // 24小时
            },
            detection: {
                userAgent: true,
                behavior: true,
                automation: true,
                devTools: true,
                iframe: true,
                honeypot: true
            },
            actions: {
                block: true,
                redirect: false,
                challenge: false,
                log: true
            }
        };
        
        this.stats = {
            blockedRequests: 0,
            suspiciousActivities: 0,
            blockedIPs: new Set(),
            lastBlockTime: 0
        };
        
        this.init();
    }
    
    init() {
        if (!this.config.enabled) return;
        
        this.setupProtection();
        this.startMonitoring();
        this.log('Anti-crawler protection initialized');
    }
    
    setupProtection() {
        // 保护全局对象
        this.protectGlobalObjects();
        
        // 设置请求拦截
        this.interceptRequests();
        
        // 设置行为监控
        this.monitorBehavior();
        
        // 设置蜜罐陷阱
        this.setupHoneypots();
        
        // 设置自动化检测
        this.detectAutomation();
    }
    
    protectGlobalObjects() {
        // 保护window对象
        Object.defineProperty(window, 'antiCrawler', {
            value: this,
            writable: false,
            configurable: false,
            enumerable: false
        });
        
        // 保护document对象
        Object.defineProperty(document, 'antiCrawler', {
            value: this,
            writable: false,
            configurable: false,
            enumerable: false
        });
        
        // 保护navigator对象
        Object.defineProperty(navigator, 'antiCrawler', {
            value: this,
            writable: false,
            configurable: false,
            enumerable: false
        });
    }
    
    interceptRequests() {
        // 拦截fetch请求
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            if (this.isBlocked()) {
                this.log('Blocked fetch request');
                return Promise.reject(new Error('Access blocked'));
            }
            return originalFetch.apply(this, args);
        };
        
        // 拦截XHR请求
        const originalXHROpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(...args) {
            if (window.antiCrawler && window.antiCrawler.isBlocked()) {
                window.antiCrawler.log('Blocked XHR request');
                throw new Error('Access blocked');
            }
            return originalXHROpen.apply(this, args);
        };
        
        // 拦截动态脚本加载
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(this, tagName);
            if (tagName.toLowerCase() === 'script') {
                if (window.antiCrawler && window.antiCrawler.isBlocked()) {
                    window.antiCrawler.log('Blocked script creation');
                    element.src = 'data:text/javascript,console.log("Access blocked");';
                }
            }
            return element;
        };
    }
    
    monitorBehavior() {
        let activityCount = 0;
        let lastActivity = Date.now();
        
        const activities = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        
        activities.forEach(event => {
            document.addEventListener(event, () => {
                activityCount++;
                lastActivity = Date.now();
            }, { passive: true });
        });
        
        // 定期检查用户行为
        setInterval(() => {
            const timeSinceLastActivity = Date.now() - lastActivity;
            const isSuspicious = activityCount < 5 && timeSinceLastActivity > 30000;
            
            if (isSuspicious) {
                this.log('Suspicious behavior detected: low activity');
                this.suspiciousActivities++;
                
                if (this.suspiciousActivities > 3) {
                    this.blockAccess();
                }
            }
        }, 10000);
    }
    
    setupHoneypots() {
        if (!this.config.detection.honeypot) return;
        
        // 创建隐藏的蜜罐链接
        const honeypotLinks = [
            '/admin', '/login', '/api', '/database', '/config',
            '/backup', '/logs', '/phpinfo', '/wp-admin', '/cpanel',
            '/ftp', '/ssh', '/telnet', '/shell', '/root', '/etc'
        ];
        
        honeypotLinks.forEach(link => {
            const honeypot = document.createElement('a');
            honeypot.href = link;
            honeypot.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden;';
            honeypot.textContent = 'Hidden Link';
            
            honeypot.addEventListener('click', (e) => {
                e.preventDefault();
                this.log('Honeypot link clicked: ' + link);
                this.blockAccess();
            });
            
            document.body.appendChild(honeypot);
        });
        
        // 创建隐藏的表单字段
        const honeypotForm = document.createElement('input');
        honeypotForm.type = 'text';
        honeypotForm.name = 'website';
        honeypotForm.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden;';
        honeypotForm.autocomplete = 'off';
        
        honeypotForm.addEventListener('change', () => {
            this.log('Honeypot form field filled');
            this.blockAccess();
        });
        
        document.body.appendChild(honeypotForm);
    }
    
    detectAutomation() {
        if (!this.config.detection.automation) return;
        
        // 检测WebDriver
        if (navigator.webdriver) {
            this.log('WebDriver detected');
            this.blockAccess();
        }
        
        // 检测PhantomJS
        if (window.callPhantom || window._phantom || window.phantom) {
            this.log('PhantomJS detected');
            this.blockAccess();
        }
        
        // 检测Nightmare
        if (window.__nightmare) {
            this.log('Nightmare detected');
            this.blockAccess();
        }
        
        // 检测Selenium
        if (navigator.userAgent.includes('selenium') || navigator.userAgent.includes('webdriver')) {
            this.log('Selenium detected');
            this.blockAccess();
        }
        
        // 检测无头Chrome
        if (navigator.userAgent.includes('HeadlessChrome')) {
            this.log('Headless Chrome detected');
            this.blockAccess();
        }
        
        // 检测自动化工具
        const automationTools = [
            'cypress', 'playwright', 'puppeteer', 'testcafe',
            'protractor', 'webdriverio', 'appium', 'selenium'
        ];
        
        automationTools.forEach(tool => {
            if (navigator.userAgent.toLowerCase().includes(tool)) {
                this.log('Automation tool detected: ' + tool);
                this.blockAccess();
            }
        });
    }
    
    isBlocked() {
        return this.stats.blockedIPs.has(this.getClientIP()) || 
               (Date.now() - this.stats.lastBlockTime) < this.config.rateLimit.blockDuration;
    }
    
    getClientIP() {
        // 简单的客户端标识（实际应用中应该使用真实的IP地址）
        return navigator.userAgent + navigator.language + screen.width + screen.height;
    }
    
    blockAccess() {
        if (this.stats.blockedRequests > this.config.rateLimit.requests) {
            this.stats.blockedIPs.add(this.getClientIP());
            this.stats.lastBlockTime = Date.now();
        }
        
        this.stats.blockedRequests++;
        this.log('Access blocked');
        
        if (this.config.actions.block) {
            this.showBlockPage();
        }
    }
    
    showBlockPage() {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h1 style="color: #e74c3c;">Access Denied</h1>
                <p>This website is protected against automated access.</p>
                <p>If you believe this is an error, please contact support.</p>
                <p><small>Block ID: ${Date.now()}</small></p>
            </div>
        `;
        
        // 禁用所有事件
        document.removeEventListener('keydown', null);
        document.removeEventListener('click', null);
        document.removeEventListener('scroll', null);
        
        throw new Error('Access blocked by anti-crawler protection');
    }
    
    startMonitoring() {
        // 定期清理统计
        setInterval(() => {
            this.stats.blockedRequests = 0;
            this.stats.suspiciousActivities = 0;
        }, this.config.rateLimit.timeWindow);
        
        // 定期检查状态
        setInterval(() => {
            this.log('Protection status: ' + JSON.stringify(this.stats));
        }, 60000);
    }
    
    log(message) {
        if (this.config.actions.log) {
            console.warn('[Anti-Crawler] ' + message);
        }
    }
}

// 导出防爬虫类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedAntiCrawler;
} else {
    window.AdvancedAntiCrawler = AdvancedAntiCrawler;
} 