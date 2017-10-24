const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

//SET ENV
process.env.NODE_ENV = 'production';

let home;
let addWindow;

app.on('ready', function(){
    //Create a window
    home = new BrowserWindow({});
    
    //load html
    home.loadURL(url.format({
        pathname: path.join(__dirname, 'home.html'),
        protocol:'file:',
        slashes:true
    }));

    //quit app when closed
    home.on('closed', function(){
        app.quit();
    });

    //build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //adding menu
    Menu.setApplicationMenu(mainMenu);
})

//create add window
function createAddWindow(){
    //Create a window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    
    //load addwindow html
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes:true
    }));

    //Garbage Collection
    addWindow.on('close', function(){
        addWindow = null;
    })
}

//catch song:add
ipcMain.on('song:add',function(e,song){
    console.log(song);
    home.webContents.send('song:add', song);
    addWindow.close();
})

let mainMenuTemplate = [
    {
        label:'File',//main menu label name
        submenu:[//submenu items below
            {
                label: 'Add Song',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Songs',
                click(){
                    home.webContents.send('song:clear');
                }
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',//ternary operator to implement key shortcuts
                click(){
                    app.quit();
                }
            }
        ]
    }
]

//If mac add an empty object to window
process.platform == 'darwin' ? mainMenuTemplate.unshift({}) : mainMenuTemplate = mainMenuTemplate;

//add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',//ternary operator to implement key shortcuts 
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}