import { generatePassword } from '../sans/superpwd'

console.log('loaded')

const formEl = document.getElementById('form') as HTMLFormElement
const masterpwdEl = document.getElementById('masterpwd') as HTMLInputElement
const keyEl = document.getElementById('key') as HTMLInputElement
const status = document.getElementById('status') as HTMLParagraphElement

formEl.addEventListener('submit', (event) => {
  console.log('submitted')
  event.preventDefault()

  const masterPwd = masterpwdEl.value
  const key = keyEl.value

  ;(async () => {
    status.textContent = 'Generating password, please wait...'

    const generated = await generatePassword(masterPwd, key, 1)

    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(generated)
      status.textContent = 'Password copied to clipboard!'
    }
  })()
})
