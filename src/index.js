'use strict'

const debug = require('debug-logfmt')('tesla-vin')

const digit = (input, start, end) => (end ? input.slice(start - 1, end) : input[start - 1])

/**
 * - https://www.findmyelectric.com/tesla-tesla-vin/
 * - https://teslatap.com/tesla-vin/
 * - https://service.tesla.com/docs/ModelS/ServiceManual/en-us/GUID-BED77626-E575-4DB7-8C1F-CFA600EAA082.html
 * - https://service.tesla.com/docs/ModelS/ServiceManual/Palladium/en-us/GUID-C79EB66B-D6DB-4439-BFC4-6AB53FB19E2C.html
 * - https://service.tesla.com/docs/ModelX/ServiceManual/en-us/GUID-B81908BE-D0D7-4E89-BD3A-FC3CA402C54F.html
 * - https://service.tesla.com/docs/ModelX/ServiceManual/Palladium/en-us/GUID-C79EB66B-D6DB-4439-BFC4-6AB53FB19E2C.html
 * - https://service.tesla.com/docs/ModelY/ServiceManual/en-us/GUID-0C797294-574D-4EE4-8017-C339A7D58411.html
 * - https://service.tesla.com/docs/Model3/ServiceManual/en-us/GUID-0C797294-574D-4EE4-8017-C339A7D58411.html
 */
module.exports = vin => {
  const modelLetter = digit(vin, 4)
  const year = require('./year')(digit(vin, 10))
  const result = {
    bateryType: require('./battery-type')(digit(vin, 7)),
    bodyType: require('./body-type')[modelLetter](digit(vin, 5), year),
    model: require('./model')(modelLetter),
    motor: require('./motor')[modelLetter](digit(vin, 8)),
    photos: require('./photos')[modelLetter](year),
    plantOfManufacture: require('./plan-of-manufacture')(digit(vin, 11)),
    restraintSystems: require('./restraint-systems')[modelLetter](digit(vin, 6), year),
    sequenceNumber: Number(digit(vin, 12, 17)),
    worldManufacturingIdentifier: require('./world-manufacturing-identifier')(digit(vin, 1, 3)),
    year
  }

  debug.warn(`\n${JSON.stringify({ vin, result }, null, 2)}\n`)

  return result
}
