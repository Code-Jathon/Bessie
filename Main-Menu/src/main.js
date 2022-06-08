const {app, BrowserWindow, Menu} = require('electron')
const url = require('url')
const path = require('path')

//ver cambios en las ejecución
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

//Declaración de variables
let mainWindow
let newProductWindow

//Ejecución app
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu);

    //Cerrar app 
    mainWindow.on('closed', ()=> {
        app.quit();
    });
});

//Función crear nueva ventana
function createNewProductWindows()
{
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a New Product'
    });
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/graphics.html'),
        protocol: 'file',
        slashes: true
    }))
    newProductWindow.on('closed', () => {
        newProductWindow = null;
    });
}

//Atajos ventanas en el menu
const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Graficas',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductWindows()
                }
            },
            {
                label: 'Remove all Products',
                click () {

                }
            },
            {
                label: 'Exit',
                //Condicional atajos diferentes sistemas operativos -> Si está en macOS(darwin) ejecuta command+Q, sino, Ctrl+Q
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                } 
            }
        ]
    }

];

//Configuración para MacOS, Atajos ventanas en el menu
if(process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    });
}

//Herramientas de desarrollador
if(process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'Reload'
            }
        ]
    })
}