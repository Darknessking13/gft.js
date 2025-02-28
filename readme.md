# gft.js

> **Get File Tree (gft.js)** is a lightweight CLI tool and Node.js API for generating a plain-text file tree of a given folder or directory. It provides a clean, customizable output with options to include emojis and line numbers.

---

## Features

- **CLI & API:** Use gft.js as a standalone command-line tool or integrate it into your own Node.js projects.
- **Plain-Text Output:** Generates a plain-text file tree that is ideal for saving to files or further processing.
- **Customizable Options:** Toggle emoji icons and line numbers with simple command-line flags.
- **ASCII Art Banner:** Each CLI run displays an eye-catching ASCII art header along with the package version.

---

## Installation

### Global Installation

Install gft.js globally using npm so that you can use the `gft` command anywhere:

```bash
npm install -g gft.js
```

### Local Installation

Alternatively, install it as a dependency in your project:

```bash
npm install gft.js
```

---

## Usage

### Command-Line Interface (CLI)

After installing globally, you can run gft.js from the terminal. Below are some examples:

- **Basic Usage:**

  ```bash
  gft ./my-folder
  ```

- **With Options:**

  - Disable emojis: `--no-emoji` or `--icon=false`
  - Include line numbers: `--line-numbers`
  - Save output to a file: `--output=output.txt`

  Example:

  ```bash
  gft ./my-folder --line-numbers --output=tree.txt
  ```

When no output file is specified, the CLI prints the file tree to the terminal with colorized directories and an ASCII art header.

### API Usage

You can also use gft.js programmatically in your Node.js projects:

```js
const { generateFileTree } = require('gft.js');

const tree = generateFileTree('./my-folder', { showEmoji: true, showLineNumbers: false });
console.log(tree);
```

The `generateFileTree` function returns a plain-text representation of your folder’s structure.

---

## Example Output

When run without specifying an output file, the CLI displays an ASCII art banner along with the file tree. For example:

```

  ▄████   █████▒▄▄▄█████▓      ▄▄▄██▀▀▀██████
 ██▒ ▀█▒▓██   ▒ ▓  ██▒ ▓▒        ▒██ ▒██    ▒
▒██░▄▄▄░▒████ ░ ▒ ▓██░ ▒░        ░██ ░ ▓██▄
░▓█  ██▓░▓█▒  ░ ░ ▓██▓ ░      ▓██▄██▓  ▒   ██▒
░▒▓███▀▒░▒█░      ▒██▒ ░  ██▓  ▓███▒ ▒██████▒▒
 ░▒   ▒  ▒ ░      ▒ ░░    ▒▓▒  ▒▓▒▒░ ▒ ▒▓▒ ▒ ░
  ░   ░  ░          ░     ░▒   ▒ ░▒░ ░ ░▒  ░ ░
░ ░   ░  ░ ░      ░       ░    ░ ░ ░ ░  ░  ░
      ░                    ░   ░   ░       ░
                           ░

⚠ v0.0.1-alpha

📁 my-folder/
├── 📜 file1.js
├── 📁 sub-folder/
│   ├── 🐍 script.py
│   └── 📑 document.pdf
└── 🎬 video.mp4
```

*Note: The output above is shown with colorized directories in the terminal.*

---

## Contributing

Contributions are welcome! If you have suggestions or improvements, please submit issues or pull requests in the [GFT Js](https://github.com/Darknessking13/gft.js).
