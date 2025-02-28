const fs = require('fs');
const path = require('path');

// Emoji mapping for different file types
const emojiMap = {
    // Programming & Scripts
    '.js': '📜',
    '.py': '🐍',
    '.java': '☕',
    '.cpp': '⚡',
    '.c': '🔌',
    '.cs': '🎮',
    '.rb': '💎',
    '.php': '🐘',
    '.ts': '🔷',
    '.go': '🐹',
    '.rust': '🦀',
    '.swift': '🦅',
    '.kt': '🧩',
    '.sh': '🐚',
    '.bat': '🖥️',
    '.ps1': '💻',
    '.sql': '🗃️',

    // Documents & Text
    '.txt': '📝',
    '.docx': '📘',
    '.doc': '📘',
    '.pdf': '📑',
    '.md': '📖',
    '.rtf': '📄',
    '.tex': '📐',
    '.csv': '📊',
    '.xlsx': '📊',
    '.xls': '📊',
    '.pptx': '📊',
    '.ppt': '📊',
    '.odt': '📝',
    '.ods': '📊',

    // Web Files
    '.html': '🌐',
    '.htm': '🌐',
    '.css': '🎨',
    '.scss': '🎨',
    '.sass': '🎨',
    '.less': '🎨',
    '.json': '📦',
    '.xml': '🧬',
    '.svg': '🔷',
    '.yaml': '📋',
    '.yml': '📋',

    // Images
    '.jpg': '🖼️',
    '.jpeg': '🖼️',
    '.png': '🖼️',
    '.gif': '🖼️',
    '.bmp': '🖼️',
    '.tiff': '🖼️',
    '.webp': '🖼️',
    '.ico': '🏞️',
    '.ai': '🎭',
    '.psd': '🎭',

    // Audio & Video
    '.mp3': '🎵',
    '.wav': '🎵',
    '.flac': '🎵',
    '.ogg': '🎵',
    '.mp4': '🎬',
    '.avi': '🎬',
    '.mov': '🎬',
    '.wmv': '🎬',
    '.mkv': '🎬',
    '.webm': '🎬',

    // Archives
    '.zip': '🗜️',
    '.rar': '🗜️',
    '.7z': '🗜️',
    '.tar': '🗜️',
    '.gz': '🗜️',
    '.tgz': '🗜️',

    // Executables & Binaries
    '.exe': '⚙️',
    '.dll': '🧰',
    '.so': '🧰',
    '.app': '📱',
    '.apk': '📱',
    '.deb': '📦',
    '.rpm': '📦',

    // Configuration Files
    '.ini': '⚙️',
    '.conf': '⚙️',
    '.config': '⚙️',
    '.env': '🔐',
    '.gitignore': '👁️‍🗨️',
    '.lock': '🔒',
    '.toml': '⚙️',
    
    // Font Files
    '.ttf': '🔤',
    '.otf': '🔤',
    '.woff': '🔤',
    '.woff2': '🔤',
    
    // Data Files
    '.db': '🗄️',
    '.sqlite': '🗄️',
    '.bak': '🔄',

    // 3D & CAD
    '.obj': '🧊',
    '.stl': '🧊',
    '.fbx': '🧊',
    '.blend': '🧊',
    '.dwg': '📐',
    
    // Default for other files
    '_default': '📄'
};

// ASCII tree characters
const asciiChars = {
    branch: '├── ',
    lastBranch: '└── ',
    vertical: '│   ',
    space: '    '
};

function getEmoji(extension) {
    return emojiMap[extension] || emojiMap['_default'];
}

function sortItems(items, folderPath) {
    const dirs = [];
    const files = [];
    
    for (const item of items) {
        const itemPath = path.join(folderPath, item);
        if (!fs.existsSync(itemPath)) continue;
        
        try {
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
                dirs.push(item);
            } else {
                files.push(item);
            }
        } catch (error) {
            console.error(`Error accessing ${itemPath}: ${error.message}`);
        }
    }
    
    dirs.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    files.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    return [...dirs, ...files];
}

// A writer that accumulates lines in a string
class StringWriter {
    constructor() {
        this.lines = [];
        this.lineNumber = 1;
    }
    
    write(line, showLineNumbers = false) {
        if (showLineNumbers) {
            const padded = String(this.lineNumber).padStart(4, ' ');
            this.lines.push(`${padded} ${line}`);
        } else {
            this.lines.push(line);
        }
        this.lineNumber++;
    }
    
    toString() {
        return this.lines.join('\n');
    }
}

/**
 * Internal function that recursively generates the file structure.
 * @param {string} folderPath - Folder to scan.
 * @param {object} outputWriter - Writer instance.
 * @param {object} options - Options: { showEmoji, showLineNumbers }.
 * @param {string} prefix - Prefix string for tree branches.
 * @param {boolean} isRoot - Flag for root folder.
 */
function generateFileStructure(folderPath, outputWriter, options = {}, prefix = "", isRoot = true) {
    const { showEmoji = true, showLineNumbers = false } = options;
    
    try {
        if (isRoot) {
            const folderName = path.basename(folderPath);
            // Root folder line (plain text)
            const line = showEmoji ? `📁 ${folderName}/` : `${folderName}/`;
            outputWriter.write(line, showLineNumbers);
        }
        
        let items = fs.readdirSync(folderPath);
        items = sortItems(items, folderPath);
        
        items.forEach((item, index) => {
            const itemPath = path.join(folderPath, item);
            if (!fs.existsSync(itemPath)) return;
            
            try {
                const stats = fs.statSync(itemPath);
                const isLast = index === items.length - 1;
                const branchChar = isLast ? asciiChars.lastBranch : asciiChars.branch;
                const childPrefix = prefix + (isLast ? asciiChars.space : asciiChars.vertical);
                
                if (stats.isDirectory()) {
                    const line = `${prefix}${branchChar}${showEmoji ? '📁 ' : ''}${item}/`;
                    outputWriter.write(line, showLineNumbers);
                    generateFileStructure(itemPath, outputWriter, options, childPrefix, false);
                } else {
                    const ext = path.extname(item).toLowerCase();
                    const line = `${prefix}${branchChar}${showEmoji ? getEmoji(ext) + ' ' : ''}${item}`;
                    outputWriter.write(line, showLineNumbers);
                }
            } catch (error) {
                if (error.code === 'EACCES') {
                    const line = `${prefix}${asciiChars.lastBranch}🚫 Permission denied: ${item}`;
                    outputWriter.write(line, showLineNumbers);
                } else {
                    console.error(`Error processing ${itemPath}: ${error.message}`);
                }
            }
        });
    } catch (error) {
        if (error.code === 'EACCES') {
            const line = `${prefix}${asciiChars.lastBranch}🚫 Permission denied: ${path.basename(folderPath)}`;
            outputWriter.write(line, showLineNumbers);
        } else {
            console.error(`An error occurred: ${error.message}`);
        }
    }
}

/**
 * Generates a plain-text file tree for the given folder.
 * @param {string} folderPath - The directory to scan.
 * @param {object} options - Options for generating the tree.
 *        options.showEmoji {boolean} - (default true) Include emojis/icons.
 *        options.showLineNumbers {boolean} - (default false) Include line numbers.
 * @returns {string} - The generated file tree as a plain-text string.
 */
function generateFileTree(folderPath, options = {}) {
    if (!fs.existsSync(folderPath)) {
        throw new Error("The specified folder does not exist.");
    }
    const writer = new StringWriter();
    generateFileStructure(folderPath, writer, options);
    return writer.toString();
}

module.exports = { generateFileTree };
