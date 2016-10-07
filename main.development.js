import { app, BrowserWindow, ipcMain as IPC } from 'electron'
import { exec } from 'child_process'

let mainWindow = null

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer')

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ]
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload)
      } catch (e) {}
    }
  }
}

app.on('ready', async () => {
  await installExtensions()

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720
  })

  mainWindow.loadURL(`file://${__dirname}/app/app.html`)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.maximize()
  } else {
    mainWindow.setFullScreen(true)
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    // mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  }
})

IPC.on('play', (event, movie) => {
  const { location } = movie
  exec(`mpv --no-border --ontop --save-position-on-quit --fullscreen "${location}"`, (err, stdout, stderr) => {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
  })
  // event.sender.send('asynchronous-reply', 'pong')
})
