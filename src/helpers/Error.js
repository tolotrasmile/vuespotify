export default class Error {
  constructor () {
    this.errors = []
  }

  register (key, message) {
    this.errors[key] = message
  }

  remove (key) {
    if (this.errors[key]) {
      delete this.errors[key]
    }
  }

  clear () {
    this.errors = []
  }
}
