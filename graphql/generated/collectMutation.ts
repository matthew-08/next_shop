/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { readFileSync, appendFile } from 'fs'
import path, { join } from 'path';
import {fileURLToPath} from 'url';
import { object } from 'yup';
import * as GraphQlModule from './graphql'

/* console.log(import.meta.url)
 */
const __file = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__file);

console.log('test\r\nnine')


/* function syncReadFile(filename: string) {
    const result = readFileSync(join(__dirname, filename), 'utf-8');
    const arr = result.split(/\n/);
    const allDocuments:string[] = []

    arr.forEach((line, idx)=> {
        if(line.includes("Document")){
            const findDocument = line
            .split(" ")
            .filter(l => l.includes('Document') && !l.includes(','))

            if(findDocument.length !== 0) {
                allDocuments.push(findDocument[0]);
            }
        }
    });  
    
    const GraphQlDocuments: any = {

    }

    allDocuments.forEach(doc => {
        GraphQlDocuments[doc] = GraphQlModule[doc]
    })

    return GraphQlDocuments
}
 */

  