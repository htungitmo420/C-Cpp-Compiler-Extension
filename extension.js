const path = require('path');
const vscode = require('vscode');

/**
 * This method is called when your extension is activated.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "C/C++ Compiler" is now active!');

    let descriptionCmd = vscode.commands.registerCommand('cpp-compiler.Description-about-C/C++-Compiler', function () {
        const panel = vscode.window.createWebviewPanel(
            'DescriptionAboutC/C++Compiler',
            'Description about C/C++ Compiler',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );
        panel.webview.html = getWebviewContent();
    });
    context.subscriptions.push(descriptionCmd);    

    let runCppCmd = vscode.commands.registerCommand('cpp-compiler.run_cpp', function () {
        let terminal = vscode.window.activeTerminal;
        if (!terminal) {
            terminal = vscode.window.createTerminal("Run C/C++");
        }
        terminal.show();

        let fileUri = vscode.window.activeTextEditor.document.uri;
        let filePath = fileUri.fsPath;
        let fileName = path.basename(filePath);
        let fileNoExt = path.parse(fileName).name;
        let ext = path.extname(fileName);

        let cmd = '';
        let shell = vscode.env.shell;
        let isPowerShell = shell && shell.toLowerCase().includes('powershell');

        if (ext === '.cpp') {
            if (isPowerShell) {
                cmd = `g++ "${filePath}" -o "${fileNoExt}.exe"; .\\"${fileNoExt}.exe"`;
            } else {
                cmd = `g++ "${filePath}" -o "${fileNoExt}.exe" && "${fileNoExt}.exe"`;
            }
        } else if (ext === '.c') {
            if (isPowerShell) {
                cmd = `gcc "${filePath}" -o "${fileNoExt}.exe"; .\\"${fileNoExt}.exe"`;
            } else {
                cmd = `gcc "${filePath}" -o "${fileNoExt}.exe" && "${fileNoExt}.exe"`;
            }
        } else {
            vscode.window.showErrorMessage('Unsupported file extension: ' + ext);
            return;
        }

        terminal.sendText(cmd);
    });
    context.subscriptions.push(runCppCmd);
}

function getWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>C++ Compiler Extension</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 20px;
                    position: relative;
                }
                #langSwitch {
                    padding: 8px 16px;
                    background-color: #007ACC;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
                #langSwitch:hover {
                    background-color: #005fa3;
                }
                h1, h2 {
                    color: #007ACC;
                }
                a {
                    color: #007ACC;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <button id="langSwitch">Switch to Русский</button>
            <div id="content-en">
                <h1>Description about C/C++ Compiler</h1>
                <p>Welcome to the C/C++ Compiler Extension! This extension enhances your C/C++ coding experience in Visual Studio Code.</p>
                <h2>Features</h2>
                <ul>
                    <li>Compile and run C/C++ code directly from VS Code.</li>
                    <li>Supports both C and C++ files.</li>
                    <li>Integrates with the VS Code terminal.</li>
                    <li>Displays error messages for unsupported file types.</li>
                </ul>
                <h2>How to Use</h2>
                <p>To use this extension, follow these steps:</p>
                <ol>
                    <li><strong>Install Compilers:</strong> Ensure that you have GCC and G++ compilers installed on your system and that they are added to your system's PATH environment variable.</li>
                    <li><strong>Open a File:</strong> Open a C or C++ source file (<code>.c</code> or <code>.cpp</code>) in Visual Studio Code.</li>
                    <li><strong>Run the Compiler:</strong> To compile and run your code, you can:
                        <ul>
                            <li>Press <strong><code>F1</code></strong> to open the Command Palette, type <strong><code>Run C/C++ Code</code></strong>, and press <strong><code>Enter</code></strong>.</li>
                            <li>Right-click inside the editor window and select <strong><code>Run C/C++ Code</code></strong> from the context menu.</li>
                            <li>Click on the <strong>Run C/C++</strong> button in the editor title bar (if available).</li>
                        </ul>
                    </li>
                    <li><strong>View Output:</strong> The extension will compile your code and run the executable in the integrated terminal. You can view the output and any compilation errors there.</li>
                </ol>
                <h2>Requirements</h2>
                <p>You need the following installed:</p>
                <ul>
                    <li><a href="https://gcc.gnu.org/" target="_blank">GCC and G++ compilers</a></li>
                    <li><a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a></li>
                </ul>
                <h2>Additional Tips</h2>
                <ul>
                    <li><strong>Setting Up PATH:</strong> Ensure the paths to <code>gcc</code> and <code>g++</code> are included in your system's PATH environment variable so that they can be invoked from any directory.</li>
                    <li><strong>Terminal Selection:</strong> This extension is optimized for PowerShell and cmd.exe on Windows. Adjustments may be needed for other shells.</li>
                    <li><strong>File Saving:</strong> Save your file before running the code to ensure the latest changes are compiled.</li>
                </ul>
                <h2>Known Issues</h2>
                <ul>
                    <li>The extension does not support files with spaces in their directory path. Consider removing spaces or enclosing paths in quotes.</li>
                    <li>Executing compiled binaries may require appropriate permissions.</li>
                </ul>
                <p>Enjoy coding with the C++ Compiler Extension!</p>
                <p>This extension is made by Nguyen Hoang Tung M3109</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/ITMO_University_official_logo_horizontal.png" alt="ITMO University Banner" />
            </div>
            <div id="content-ru" style="display:none;">
                <h1>Описание компилятора C/C++</h1>
                <p>Добро пожаловать в расширение компилятора C/C++! Это расширение улучшает ваш опыт программирования на C/C++ в Visual Studio Code.</p>
                <h2>Основные возможности</h2>
                <ul>
                    <li>Компилируйте и запускайте код C/C++ прямо из VS Code.</li>
                    <li>Поддержка как файлов C, так и C++.</li>
                    <li>Интеграция с терминалом VS Code.</li>
                    <li>Отображает сообщения об ошибках для неподдерживаемых типов файлов.</li>
                </ul>
                <h2>Как использовать</h2>
                <p>Для использования этого расширения выполните следующие шаги:</p>
                <ol>
                    <li><strong>Установите компиляторы:</strong> Убедитесь, что на вашей системе установлены компиляторы GCC и G++, и что они добавлены в переменную окружения PATH.</li>
                    <li><strong>Откройте файл:</strong> Откройте исходный файл C или C++ (<code>.c</code> или <code>.cpp</code>) в Visual Studio Code.</li>
                    <li><strong>Запустите компилятор:</strong> Чтобы скомпилировать и запустить ваш код, вы можете:
                        <ul>
                            <li>Нажмите <strong><code>F1</code></strong>, чтобы открыть палитру команд, введите <strong><code>Run C/C++ Code</code></strong> и нажмите <strong><code>Enter</code></strong>.</li>
                            <li>Щелкните правой кнопкой мыши внутри окна редактора и выберите <strong><code>Run C/C++ Code</code></strong> из контекстного меню.</li>
                            <li>Нажмите на кнопку <strong>Run C/C++</strong> в строке заголовка редактора (если доступно).</li>
                        </ul>
                    </li>
                    <li><strong>Просмотр вывода:</strong> Расширение скомпилирует ваш код и выполнит исполняемый файл в интегрированном терминале. Вы можете просмотреть вывод и любые ошибки компиляции там.</li>
                </ol>
                <h2>Требования</h2>
                <p>Вам необходимо установить следующее:</p>
                <ul>
                    <li><a href="https://gcc.gnu.org/" target="_blank">Компиляторы GCC и G++</a></li>
                    <li><a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a></li>
                </ul>
                <h2>Дополнительные советы</h2>
                <ul>
                    <li><strong>Настройка PATH:</strong> Убедитесь, что пути к <code>gcc</code> и <code>g++</code> включены в переменную окружения PATH, чтобы их можно было вызвать из любого каталога.</li>
                    <li><strong>Выбор терминала:</strong> Это расширение оптимизировано для PowerShell и cmd.exe в Windows. Для других оболочек могут потребоваться настройки.</li>
                    <li><strong>Сохранение файла:</strong> Сохраните файл перед запуском кода, чтобы гарантировать компиляцию последних изменений.</li>
                </ul>
                <h2>Известные проблемы</h2>
                <ul>
                    <li>Расширение не поддерживает файлы с пробелами в пути к каталогу. Рассмотрите возможность удаления пробелов или заключения путей в кавычки.</li>
                    <li>Выполнение скомпилированных бинарных файлов может требовать соответствующих разрешений.</li>
                </ul>
                <p>Приятного кодирования с расширением компилятора C++!</p>
                <p>Это расширение было сделано Нгуен Хоанг Тунг M3109.</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/ITMO_University_official_logo_horizontal.png" alt="ITMO University Banner" />
            </div>

            <script>
                const langSwitch = document.getElementById('langSwitch');
                const contentEn = document.getElementById('content-en');
                const contentRu = document.getElementById('content-ru');

                langSwitch.addEventListener('click', () => {
                    if (contentEn.style.display === 'none') {
                        contentEn.style.display = 'block';
                        contentRu.style.display = 'none';
                        langSwitch.textContent = 'Switch to Русский';
                    } else {
                        contentEn.style.display = 'none';
                        contentRu.style.display = 'block';
                        langSwitch.textContent = 'Switch to English';
                    }
                });
            </script>
        </body>
        </html>
    `;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};