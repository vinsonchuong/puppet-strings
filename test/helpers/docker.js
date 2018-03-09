/* @flow */
import Docker from 'dockerode'

export async function runInContainer({
  image,
  mount = {},
  command
}: {
  image: string,
  mount: { [string]: string },
  command: Array<string>
}): Promise<string> {
  const docker = new Docker()

  try {
    await docker.pull(image)
  } catch (error) {
    console.log('=======')
    console.log(error)
    console.log('=======')
  }

  const container = await docker.createContainer({
    Image: image,
    Cmd: command,
    WorkingDir: '/root',
    HostConfig: {
      Binds: Object.keys(mount).map(hostDir => `${hostDir}:${mount[hostDir]}`)
    }
  })

  const stream = await container.attach({
    stream: true,
    stdout: true,
    stderr: true
  })

  let output = ''
  stream.setEncoding('utf8')
  stream.on('data', chunk => {
    output += chunk
  })

  await container.start()
  await container.wait()
  await container.remove()

  return output
}
