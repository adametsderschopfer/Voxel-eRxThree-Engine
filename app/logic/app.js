import path from 'path';
import { app, crashReporter, BrowserWindow, Menu } from 'electron';
import { isDevelopment } from '../constants';

let mainWindow = null;
let forceQuit = false;

crashReporter.start({
    productName: 'YourName',
    companyName: 'YourCompany',
    submitURL: 'https://your-domain.com/url-to-submit',
    uploadToServer: false,
});

app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async() => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 640,
        minHeight: 480,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));

    // show window once on first load
    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.show();
    });

    mainWindow.webContents.on('did-finish-load', () => {
        if (process.platform === 'darwin') {
            mainWindow.on('close', function(e) {
                if (!forceQuit) {
                    e.preventDefault();
                    mainWindow.hide();
                }
            });

            app.on('activate', () => {
                mainWindow.show();
            });

            app.on('before-quit', () => {
                forceQuit = true;
            });
        } else {
            mainWindow.on('closed', () => {
                mainWindow = null;
            });
        }
    });

    if (isDevelopment) {
        // auto-open dev tools
        mainWindow.webContents.openDevTools();

        // add inspect element on right click menu
        mainWindow.webContents.on('context-menu', (e, props) => {
            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click() {
                    mainWindow.inspectElement(props.x, props.y);
                },
            }, ]).popup(mainWindow);
        });
    }
});
