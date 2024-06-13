'use strict'

const debug = require('debug-logfmt')('vin-decoder')

const worldManufacturingIdentifier = input => {
  switch (input) {
    case '5YJ':
      return 'Fremont, California'
    case '7SA':
      return 'Austin, Texas'
    case 'LRW':
      return 'Shanghai, China'
    case 'XP7':
      return 'Berlin, Germany'
    case 'SFZ':
      return 'UK (Roadster 1)'
    default:
      debug.warn(`Unknown world manufacturing identifier: ${input}`)
      return null
  }
}

const chassis = input => {
  switch (input) {
    case 'A':
    case 'E':
    case 'G':
    case 'C':
      return 'Sedan 4 Door Left-Hand Drive'
    case 'B':
    case 'F':
    case 'H':
      return 'Sedan 4 Door Right-Hand Drive'
    default:
      debug.warn(`Unknown body type: ${input}`)
      return null
  }
}

const restraintSystems = input => {
  switch (input) {
    case '7':
    case 'C':
      return 'Front Airbags, side Inflatable restraints'
    case '1':
    case 'A':
    case 'D':
      return 'Front Airbags, PODS, side Inflatable restraints, Knee Airbags'
    default:
      debug.warn(`Unknown restraintSystems: ${input}`)
      return null
  }
}

const fuelType = input => {
  switch (input) {
    case 'E':
      return 'Nickel Manganese Cobalt (NMC)'
    case 'F':
      return 'Lithium Iron Phosphate Battery (LFP)'
    default:
      debug.warn(`Unknown fuelType: ${input}`)
      return null
  }
}

const motor = input => {
  switch (input) {
    case '2':
      return 'Dual Motor Standard'
    case '5':
      return 'Dual Motor'
    case '6':
      return 'Triple Motor'
    case 'A':
      return 'Single Motor Standard'
    case 'B':
      return 'Dual Motor'
    case 'D':
      return 'Single Motor Standard'
    case 'E':
      return 'Dual Motor Standard'
    case 'F':
      return 'Dual Motor Performance (3DU 800A)'
    case 'J':
      return 'Single Motor Standard'
    case 'K':
      return 'Dual Motor Standard'
    case 'L':
      return 'Dual Motor Performance'
    case 'R':
      return 'Single Motor Standard (3DU 600A)'
    case 'S':
      return 'Single Motor Standard (DUB 600A)'
    default:
      debug.warn(`Unknown motor identifier: ${input}`)
      return null
  }
}

const year = input => {
  switch (input) {
    case 'H':
      return '2017'
    case 'J':
      return '2018'
    case 'K':
      return '2019'
    case 'L':
      return '2020'
    case 'M':
      return '2021'
    case 'N':
      return '2022'
    case 'P':
      return '2023'
    case 'R':
      return '2024'
    default:
      debug.warn(`Unknown year: ${input}`)
      return null
  }
}

const plantOfManufacture = input => {
  switch (input) {
    case 'A':
      return 'Tesla Austin, Texas (USA)'
    case 'B':
      return 'Tesla Berlin, Germany'
    case 'C':
      return 'Tesla Shangai, China'
    case 'F':
      return 'Tesla Fremont, California (USA)'
    default:
      debug.warn(`Unknown Fremont identifier: ${input}`)
      return null
  }
}

const model = input => {
  switch (input) {
    case 'S':
      return 'Tesla Model S'
    case '3':
      return 'Tesla Model 3'
    case 'X':
      return 'Tesla Model X'
    case 'Y':
      return 'Tesla Model Y'
    case 'R':
      return 'Tesla Model R'
    default:
      debug.warn(`Unknown model identifier: ${input}`)
      return null
  }
}

const digit = (input, start, end) => end ? input.slice(start - 1, end) : input[start - 1]

/**
 * - https://service.tesla.com/docs/ModelY/ServiceManual/en-us/GUID-0C797294-574D-4EE4-8017-C339A7D58411.html
 * - https://service.tesla.com/docs/ModelY/ServiceManual/en-us/GUID-0C797294-574D-4EE4-8017-C339A7D58411.html
 * - https://www.findmyelectric.com/tesla-vin-decoder/
 * - https://teslatap.com/vin-decoder/
 * - https://service.tesla.com/docs/ModelY/ServiceManual/en-us/GUID-0C797294-574D-4EE4-8017-C339A7D58411.html
 */
module.exports = vin => {
  const result = {
    model: model(digit(vin, 4)),
    year: year(digit(vin, 10)),
    chassis: chassis(digit(vin, 5)),
    worldManufacturingIdentifier: worldManufacturingIdentifier(digit(vin, 1, 3)),
    restraintSystems: restraintSystems(digit(vin, 6)),
    fuelType: fuelType(digit(vin, 7)),
    motor: motor(digit(vin, 8)),
    plantOfManufacture: plantOfManufacture(digit(vin, 11))
  }

  result.year = `${result.year} (${
    new Date().getFullYear() - result.year
  } years old)`

  debug.warn(
    '\n' +
      JSON.stringify(
        {
          vin,
          result
        },
        null,
        2
      ) +
      '\n'
  )

  return result
}
