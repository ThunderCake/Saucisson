import { Howl } from 'howler'
import { curry } from 'ramda'

const SOUND_TICK = ['./assets/sounds/tick.wav']
const SOUND_CLICK = ['./assets/sounds/click.wav']

const sounds = {
  tick: new Howl({ src: SOUND_TICK }),
  click: new Howl({ src: SOUND_CLICK })
}

export const Sounds = curry((enabled, sound) => {
  if (enabled) sounds[sound].play()
})
