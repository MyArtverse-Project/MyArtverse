// Fix and reorganize imports from .tsx files
// * Automatically removes line 'import React from "react"' as its defined globally for the entire project

// * Import hierarchy
// * 1. React
// * 2. Next stuff
// * 3. 'clsx' 'react-icons' imports
// * 4. Other 3rd Party Libs
// * 5. Components/relative imports
import { readFileSync, readdirSync } from "fs"
