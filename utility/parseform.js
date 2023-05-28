
export function extractTextInParenthesis(inputString) {
    const regex = /\[(.*?)\]/g;
    const matches = [];
    let match;
  
    while ((match = regex.exec(inputString)) !== null) {
      matches.push(match[1]);
    }
  
    return matches;
  }

