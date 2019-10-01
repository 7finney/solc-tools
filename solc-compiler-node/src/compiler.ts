import * as solc from "solc";
export default function nodeCompile(sources: any) {
  const input = {
    language: "Solidity",
    sources,
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"]
        }
      }
    }
  };
  return solc.compile(JSON.stringify(input));
}