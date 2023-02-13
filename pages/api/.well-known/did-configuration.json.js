// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'public');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/did-configuration.json');
  console.log(fileContents)
  //Return the content of the data file in json format
  res.send(fileContents)
}