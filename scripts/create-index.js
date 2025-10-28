const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude Code Anonymous - Agentic Coding Presentations</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            max-width: 900px;
            width: 100%;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 50px;
        }

        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.3em;
            opacity: 0.95;
        }

        .presentations {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }

        .presentation-card {
            background: white;
            border-radius: 15px;
            padding: 35px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-decoration: none;
            color: inherit;
            display: block;
        }

        .presentation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }

        .presentation-card h2 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.8em;
        }

        .presentation-card p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .presentation-card .date {
            color: #999;
            font-size: 0.9em;
            font-style: italic;
        }

        .cta {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 8px 16px;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 10px;
        }

        .footer {
            text-align: center;
            color: white;
            opacity: 0.9;
        }

        .footer a {
            color: white;
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2em;
            }

            .header p {
                font-size: 1.1em;
            }

            .presentations {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Claude Code Anonymous</h1>
            <p>Agentic Coding: Real Talk from the Trenches</p>
        </div>

        <div class="presentations">
            <a href="./round1/" class="presentation-card">
                <h2>Round 1: Intent → Impact</h2>
                <p>My journey from tab completion to building what matters. A 5-minute lightning talk on finding what actually works in AI-powered development.</p>
                <p class="date">September 2024</p>
                <span class="cta">View Slides →</span>
            </a>

            <a href="./round2/" class="presentation-card">
                <h2>Round 2: From Hype to Habits</h2>
                <p>Real learnings from 30 days of refined agentic development. What I stopped doing that made me faster.</p>
                <p class="date">October 2024</p>
                <span class="cta">View Slides →</span>
            </a>

            <a href="./ast-grep/" class="presentation-card">
                <h2>ast-grep + Claude Code</h2>
                <p>Automated architectural enforcement for AI-assisted development. How to prevent pattern drift and security issues.</p>
                <p class="date">October 2024</p>
                <span class="cta">View Slides →</span>
            </a>
        </div>

        <div class="footer">
            <p>Slides available at <a href="https://github.com/plattenschieber/agent-presentation" target="_blank">github.com/plattenschieber/agent-presentation</a></p>
            <p style="margin-top: 20px; font-size: 0.9em;">Built with <a href="https://sli.dev" target="_blank">Slidev</a></p>
        </div>
    </div>
</body>
</html>`;

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Write index.html
fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log('✓ Created index.html in dist directory');

// Create .nojekyll to prevent GitHub Pages from using Jekyll
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('✓ Created .nojekyll file');

// Copy public folder to dist for shared assets
const publicDir = path.join(__dirname, '..', 'public');
const distPublicDir = path.join(distDir, 'public');

function copyDirectoryRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectoryRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

if (fs.existsSync(publicDir)) {
    copyDirectoryRecursive(publicDir, distPublicDir);
    console.log('✓ Copied public assets to dist directory');
}
