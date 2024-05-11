import type { Config } from "jest";  
  
const config: Config = {  
  preset: "ts-jest",  
  testEnvironment: "node",  
  testRegex: "/src/.*.(test|spec).(ts|tsx)$",  
}  
  
export default config;
