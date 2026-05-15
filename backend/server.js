const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());

// ── Health Check ──────────────────────
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        hostname: os.hostname(),
        platform: os.platform(),
        time: new Date().toISOString(),
        version: '2.0.0',
        uptime: Math.round(os.uptime()),
        memory: {
            total: Math.round(os.totalmem() / 1024 / 1024) + 'MB',
            free: Math.round(os.freemem() / 1024 / 1024) + 'MB',
            used: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024) + 'MB'
        }
    });
});

// ── System Info ───────────────────────
app.get('/system', (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        memory_total: Math.round(os.totalmem() / 1024 / 1024) + 'MB',
        memory_free: Math.round(os.freemem() / 1024 / 1024) + 'MB',
        uptime: Math.round(os.uptime()) + ' seconds',
        node_version: process.version,
        env: process.env.NODE_ENV || 'development'
    });
});

// ── DevOps Stack Info ─────────────────
app.get('/stack', (req, res) => {
    res.json({
        technologies: [
            { name: 'AWS EC2', category: 'Cloud', status: 'active' },
            { name: 'AWS VPC', category: 'Networking', status: 'active' },
            { name: 'AWS S3', category: 'Storage', status: 'active' },
            { name: 'AWS CloudWatch', category: 'Monitoring', status: 'active' },
            { name: 'Docker', category: 'Containers', status: 'active' },
            { name: 'Kubernetes', category: 'Orchestration', status: 'active' },
            { name: 'Terraform', category: 'IaC', status: 'active' },
            { name: 'Ansible', category: 'Config Mgmt', status: 'active' },
            { name: 'GitHub Actions', category: 'CI/CD', status: 'active' },
            { name: 'Nginx', category: 'Web Server', status: 'active' },
            { name: 'Node.js', category: 'Backend', status: 'active' },
            { name: 'MariaDB', category: 'Database', status: 'active' }
        ]
    });
});

// ── Projects Info ─────────────────────
app.get('/projects', (req, res) => {
    res.json({
        projects: [
            {
                name: 'Company AWS Infrastructure',
                description: 'Complete LAMP stack on AWS with VPC, CloudWatch, S3',
                technologies: ['AWS', 'Linux', 'Apache', 'MariaDB', 'PHP'],
                status: 'live',
                github: 'github.com/kbarath670-bot/company-aws-infrastructure'
            },
            {
                name: 'Docker Node.js App',
                description: 'Containerized Node.js app with CI/CD pipeline',
                technologies: ['Docker', 'Node.js', 'GitHub Actions'],
                status: 'live',
                github: 'github.com/kbarath670-bot/company-aws-infrastructure'
            },
            {
                name: 'Terraform Infrastructure',
                description: 'Complete AWS infrastructure as code',
                technologies: ['Terraform', 'AWS', 'VPC', 'EC2'],
                status: 'complete',
                github: 'github.com/kbarath670-bot/company-aws-infrastructure'
            }
        ]
    });
});

// ── Start Server ──────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/health`);
    console.log(`🖥️  System: http://localhost:${PORT}/system`);
    console.log(`🔧 Stack:  http://localhost:${PORT}/stack`);
});
