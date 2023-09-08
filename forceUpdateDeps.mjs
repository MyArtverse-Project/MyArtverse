import { readFileSync } from "fs"
/**
 * TODO: cd from the apps folder, look through their package.json's dependencies
 * TODO: and devDependencies and append the `<pkg-name>@latest`
 * TODO: use inquirer to pick from all the packages found or by directory
 *
 * * 1. find all the package.json's exluding from the node_modules directory
 * * 2. use some arg parser to skip inqurer inputs from console
 *
 * TODO: for GitHub Actions, run this script followed by the `build`
 * TODO: command just in case it fuckin' breaks
 */
