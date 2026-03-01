function filterToLowercaseLetters(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}


function checkAlphabeticCharactersOnly(str) {
  const hasNonAlphabetic = /[^a-z]/i.test(str.toLowerCase());

  return !hasNonAlphabetic
}

export {filterToLowercaseLetters, checkAlphabeticCharactersOnly};