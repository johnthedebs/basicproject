import _ from 'underscore'


const getCookie = function (name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    _(cookies).each((cookie) => {
      cookie = cookie.trim()
            // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        return cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
      }
    })
  }
  return cookieValue
}


export default getCookie
