 export function isValidTemplate(s) {
  var state = 0;
  for (let i = 0; i < s.length; i++) {

    
    if (state === 0) {
      if (s[i] === "[") state = 1;
      if (s[i] === "]")  return false;
    }

    else if (state === 1) {
        if (s[i] === "[") state = 2;
        if (s[i] === "]") return false;
      }

      else if (state === 2) {
        if (s[i] === "[") return false;
        if (s[i] === "]") state = 3;
      }

      else if (state === 3) {
        if (s[i] === "[") return false;
        if (s[i] === "]") state = 0;
      }

  }
  if(state===0) return true;
}

