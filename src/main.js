const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let home;

app.on('ready', function(){
    //Create a window
    home = new BrowserWindow({});
    
    //load html
    home.loadURL(url.format({
        pathname: path.join(__dirname, 'home.html'),
        protocol:'file:',
        slashes:true
    }));

    //build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //adding menu
    Menu.setApplicationMenu(mainMenu);
})

const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add Song'
            },
            {
                label: 'Clear Songs'
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]
