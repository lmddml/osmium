import * as fs from "node:fs/promises";
import { join } from "node:path";

interface EndpointConfig {
  name: string;
  namePlural: string;
}

const endpoints: EndpointConfig[] = [
  { name: "unit", namePlural: "units" },
  { name: "article", namePlural: "articles" },
];

async function generateEndpointFiles(endpoint: EndpointConfig) {
  const sourceFiles = [
    "../server/src/customer/customerRoutes.ts",
    "../server/src/customer/customerService.ts",
    "../server/src/customer/customerModel.ts",
    "../server/tests/customer/customerRoutes.test.ts"
  ];
  
  const targetDir = `../server/src/${endpoint.name}`;
  const targetTestDir = `../server/tests/${endpoint.name}`;

  try {
    // Create target directories
    await fs.mkdir(targetDir, { recursive: true });
    await fs.mkdir(targetTestDir, { recursive: true });
    
    // Process each file
    for (const sourceFile of sourceFiles) {
      const targetFile = sourceFile
        .replace('/customer/', `/${endpoint.name}/`)
        .replace('customer', endpoint.name);
      
      // Read source file
      const sourceContent = await fs.readFile(sourceFile, 'utf-8');
      
      // Generate new auto-generated content
      let newContent = sourceContent
        .replace(/customer/g, endpoint.name)
        .replace(/Customer/g, endpoint.name.charAt(0).toUpperCase() + endpoint.name.slice(1))
        .replace(/customers/g, endpoint.namePlural);
      
      // Extract the auto-generated section from the new content
      const autoGenMatch = newContent.match(/\/\/ begin-auto-generated[\s\S]*?\/\/ end-auto-generated/);
      if (!autoGenMatch) {
        throw new Error(`Source file ${sourceFile} is missing auto-generated markers`);
      }
      const newAutoGenContent = autoGenMatch[0];
      
      // Check if target file exists and has auto-generated markers
      let finalContent: string;
      try {
        const existingContent = await fs.readFile(targetFile, 'utf-8');
        const existingMatch = existingContent.match(/\/\/ begin-auto-generated[\s\S]*?\/\/ end-auto-generated/);
        
        if (existingMatch) {
          // Replace only the auto-generated section
          finalContent = existingContent.replace(existingMatch[0], newAutoGenContent);
        } else {
          // No markers found, use the new content as is
          finalContent = newContent;
        }
      } catch (error) {
        // File doesn't exist or can't be read, use the new content
        finalContent = newContent;
      }
      
      // Write to target file
      await fs.writeFile(targetFile, finalContent, 'utf-8');
      console.log(`Generated: ${targetFile}`);
    }
  } catch (error) {
    console.error(`Error processing ${endpoint.name}:`, error);
    throw error;
  }
}

async function main() {
  try {
    for (const endpoint of endpoints) {
      console.log(`Generating files for ${endpoint.name}...`);
      await generateEndpointFiles(endpoint);
    }
    console.log('All endpoints generated successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main();
