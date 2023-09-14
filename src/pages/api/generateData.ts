import fs from 'fs'
import PATH from 'path'

interface ProjectData {
  fullPath: string;
  path: string;
  meta: {};
  images:string[];
}

function getProjectsData(): ProjectData[] {
  const res: ProjectData[] = []
  let index = 0;
  const imagesPath = PATH.join(process.cwd(), 'public', 'images', 'projects')

  const directories = fs.readdirSync(imagesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
    for (const directory of directories){
      const fullPath = PATH.join(imagesPath, directory)
      // console.log(fullPath)
      // console.log(directory)

      const files = fs.readdirSync(fullPath)
      // console.log(files)
      const jsonFile = fs.readFileSync(fullPath+'/'+files[0], 'utf-8')
      const meta = JSON.parse(jsonFile)
      // console.log(meta)
      const images = fs.readdirSync(fullPath+'/'+files[1])
      // console.log(images)
      const path = `public/images/projects/${directory}`

      res.push({fullPath, meta, images, path})
    }

    return res
}

const projectsArray = getProjectsData()
// console.log(projectsArray)
fs.writeFileSync('data.json', JSON.stringify(projectsArray));