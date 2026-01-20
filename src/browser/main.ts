import { generatePassword } from '../sans/superpwd'

const formEl = document.getElementById('form') as HTMLFormElement
const masterpwdEl = document.getElementById('masterpwd') as HTMLInputElement
const keyEl = document.getElementById('key') as HTMLInputElement
const status = document.getElementById('status') as HTMLParagraphElement

masterpwdEl.value = localStorage.getItem('master-pwd') || ''

masterpwdEl.addEventListener('input', () => {
  localStorage.setItem('master-pwd', masterpwdEl.value)
})

formEl.addEventListener('submit', (event) => {
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
