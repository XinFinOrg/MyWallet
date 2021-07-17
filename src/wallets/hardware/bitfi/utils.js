
async function connectBitfi(intervalMsec = 1000, timeoutMsec = 3000) {
  let bitfi = null
  return new Promise(async (res, rej) => {
    try {
      if (bitfi) {
        res(bitfi)
      }

      const deadline = Date.now + timeoutMsec
      const inter = setInterval(() => {
        if (Date.now > deadline) {
          res(bitfi)
        }

        if (window.bitfi) {
          bitfi = window.bitfi
          clearInterval(inter)
          res(bitfi)
        }
      }, intervalMsec)
    }
    catch (exc) {
      console.log(exc)
      res(bitfi)
    }
  })
}

export {
  connectBitfi
}