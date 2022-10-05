
const { app, BrowserWindow, Menu, screen } = require('electron');

const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'development'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

let mainWindow

app.whenReady().then(() => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({ 
        width, 
        height, 
        webPreferences: { nodeIntegration: true },
        maximizable: true,
        icon: __dirname + './assets/FondoEditorial_icono.ico'
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
})

const templateMenu = [
    {
        label: 'Opciones',
        submenu: [
            {
                label: 'Salir del programa',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Mostrar/Ocultar las herramientas de desarrollo',
                accelerator: process.platform === 'darwin' ? 'Command+D' : 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                accelerator: process.platform === 'darwin' ? 'Command+R' : 'Ctrl+R',
            }
        ]
    })
}