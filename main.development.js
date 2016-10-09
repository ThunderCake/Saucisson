import { app, BrowserWindow, ipcMain as IPC } from 'electron'
import { exec } from 'child_process'

import { compose, join, keys, filter, map, toPairs } from 'ramda'

import Config from 'electron-config'
const config = new Config()

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

// TODO: move function below to some utils file
const flags = compose(
  join(' '),
  keys,
  filter(value => value === true),
 )

const flagsWithParam = compose(
  join(' '),
  map(join(' ')),
  toPairs,
  filter(value => (typeof value === 'number' || typeof value === 'string')),
)

const build = args => join(' ', map(fn => fn(args), [flags, flagsWithParam]))

IPC.on('play', (event, movie) => {
  const { location } = movie

  const base = 'mpv --no-border --ontop --fullscreen'
  const args = {
    '--save-position-on-quit': config.get('savePositionOnQuit')
  }
  const command = join(' ', [base, build(args), `"${location}"`])

  exec(command, (err, stdout, stderr) => {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
  })
})
