const MicroTasksRunner = () => {
  let taskNumber = 1
  let frameNumber = 1

  let processing = false
  const tasks: any[] = []

  const process = () => {
    processing = true

    requestAnimationFrame(startTime => {
      console.log('frame number: ', frameNumber++)
      do {
        console.log('run task number: ', taskNumber++)
        const task = tasks.pop()

        task()
      } while (tasks.length > 0 && performance.now() - startTime < 5)

      if (tasks.length > 0) {
        process()
      } else {
        processing = false
      }
    })
  }

  return {
    add: <T>(fn: () => Promise<T>): Promise<T> =>
      new Promise((resolve, reject) => {
        tasks.push(() => Promise.resolve(fn()).then(resolve, reject))
        processing || process()
      }),
  }
}

export default MicroTasksRunner
