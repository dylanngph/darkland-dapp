class EventBus {
  emit = (eventName: string, detail?: any) => {
    const event = new CustomEvent(eventName, {
      detail: {
        payload: detail,
      },
    })
    window.dispatchEvent(event)
  }

  on = (eventName: string, callback: any) => {
    window.addEventListener(eventName, callback, false)
  }

  clear = (eventName: string, callback: any) => {
    window.removeEventListener(eventName, callback, false)
  }

  once = (eventName: string, callback: any) => {
    window.addEventListener(eventName, callback, {once: true})
  }
}

const events = new EventBus()

export default events
