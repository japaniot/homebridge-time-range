const packageJson = require('../package.json')
const {parse, format} = require('@tuxsudo/time')

// Lazy-initialized.
let Service, Characteristic

// Called by homebridge.
module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic

  // Register the accessory.
  homebridge.registerAccessory(packageJson.name, "TimeRange", TimeRange)
}

class TimeRange {
  constructor(log, config, api) {
    this.log = log
    this.config = config
    this.api = api

    this._service = new Service.Switch(this.name)
    this._service.updateCharacteristic(Characteristic.On, resultOf(config))
    this._service.getCharacteristic(Characteristic.On)
    .on('set', (on, callback) => callback())
    .on('get', (callback) => callback(null, resultOf(config)))

    setInterval(() => {
      this._service.updateCharacteristic(Characteristic.On, resultOf(config))
    }, 10 * 1000)
  }

  getServices() {
    return [this._service]
  }
}

function compareTime(date, time) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  let diff = hours - time.hours
  if (diff !== 0)
    return diff
  diff = minutes - time.minutes
  if (diff !== 0)
    return diff
  return seconds - time.seconds
}

function inRange(config) {
  const now = new Date
  if (compareTime(now, parse(config.start)) < 0)
    return false
  if (compareTime(now, parse(config.end)) >= 0)
    return false
  return true
}

function resultOf(config) {
  const is = inRange(config)
  return config.reverse ? !is : is
}
