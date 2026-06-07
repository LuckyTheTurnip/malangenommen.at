import { readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')
const profilePicsDir = path.join(rootDir, 'Media', 'Leaderboard', 'ProfilePics')
const manifestPath = path.join(rootDir, 'Media', 'Leaderboard', 'profile-pics.json')

await mkdir(profilePicsDir, { recursive: true })

const entries = await readdir(profilePicsDir, { withFileTypes: true })
const images = entries
	.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
	.map((entry) => `Media/Leaderboard/ProfilePics/${entry.name}`)
	.sort((left, right) => left.localeCompare(right))

await writeFile(manifestPath, `${JSON.stringify(images, null, 2)}\n`, 'utf8')
