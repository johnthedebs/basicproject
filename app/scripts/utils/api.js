import _ from 'underscore'
import Request from 'superagent'

import getCookie from './getCookie'

const getCSRFToken = () => getCookie('csrftoken')


const API = {
  get(url, options = {}) {
    const p = new Promise((resolve, reject) => {
      const r = Request.get(url)

      _(options.data).each((v, k) => {
        if (_(v).isArray()) {
          _(v).each(item => r.query(`${k}[]`, item))
        } else {
          r.query(`${k}`, v)
        }
      })

      url = r.url
      _(r._query).each((arg, i) => { // eslint-disable-line
        url += `${i === 0 ? '?' : '&'}${arg}`

        return url
      })

      return r.accept('application/json')
                .on('error', () => reject('ERROR'))
                .end((err, res) => {
                  if (err || res.error) {
                    return reject([err, res])
                  }

                  return resolve(res)
                })
    })
    return p.catch(error => console.error(error))
  },


  del(url, options = {}) {
    const p = new Promise((resolve, reject) =>
            Request.del(url)
                .set('X-CSRFToken', getCSRFToken())
                .accept('application/json')
                .send(options.data)
                .on('error', () => reject('ERROR'))
                .end((err, res) => {
                  if (err || res.error) {
                    return reject([err, res])
                  }

                  return resolve(res)
                })
        )
    return p.catch(error => console.error(error))
  },


  post(url, options = {}) {
    const p = new Promise((resolve, reject) => {
      const r = Request.post(url)

      _(options.files).each((file) => {
        console.log('FILE', file)
        return r.attach(file.name, file.file, file.filename)
      })

      _(options.fields).each((field) => {
        console.log('FIELD', field)
        return r.field(field.name, field.data)
      })

      if (options.onProgress) {
        r.on('progress', options.onProgress)
      }

      return r.set('X-CSRFToken', getCSRFToken())
                .accept('application/json')
                .send(options.data)
                .on('error', () => reject('ERROR'))
                .end((err, res) => {
                  console.log('END')
                  if (err || res.error) {
                    return reject([err, res])
                  }

                  return resolve(res)
                })
    })
    return p.catch(error => console.error(error))
  },


  put(url, options = {}) {
    const p = new Promise((resolve, reject) =>
            Request.put(url)
                .set('X-CSRFToken', getCSRFToken())
                .accept('application/json')
                .send(options.data)
                .on('error', () => reject('ERROR'))
                .end((err, res) => {
                  if (err || res.error) {
                    return reject([err, res])
                  }

                  return resolve(res)
                })
        )
    return p.catch(error => console.error(error))
  },
}


export default API
