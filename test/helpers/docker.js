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

  await pullImage(docker, image)

  const container = await createContainer(docker, {
    Image: image,
    Cmd: command,
    WorkingDir: '/root',
    HostConfig: {
      Binds: Object.keys(mount).map(hostDir => `${hostDir}:${mount[hostDir]}`)
    }
  })

  const output = await startContainer(container)
  await removeContainer(container)

  return output
}

async function pullImage(docker, image) {
  const stream = await docker.pull(image)
  await new Promise(resolve => {
    docker.modem.followProgress(stream, resolve)
  })
}

function createContainer(docker, config) {
  return docker.createContainer(config)
}

function removeContainer(container) {
  return container.remove()
}

async function startContainer(container) {
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

  return output
}
