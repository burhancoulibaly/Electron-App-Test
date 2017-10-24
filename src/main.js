const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let home;

app.on('ready', function(){
    //Create a window
    home = new BrowserWindow({});
    
    //load html
    home.loadURL(url.format({
        pathname: path.join(__dirname, 'home.html'),
        protocol:'file:',
        slashes:true
    }))
})
