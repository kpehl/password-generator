// Password Generator Javascript Exercise


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Password requirements are initialized in an array. A function is used so values can be re-set.
initialize = function() {
  passwordRequirements = [
    {
      name: "Length",
      request: "How many characters long should the password be?  Enter a value in-between 8 and 128.",
      entry: null
    },
    {
      name: "Upper Case",
      request: "Should the password include upper case letters?  Enter yes or no.",
      entry: null
    },
    {
      name: "Lower Case",
      request: "Should the password include lower case letters? Enter yes or no.",
      entry: null
    },
    {
      name: "Numeric",
      request: "Should the password include numbers?  Enter yes or no",
      entry: null
    },
    {
      name: "Special Characters",
      request: "Should the password include special characters?  Enter yes or no.",
      entry: null
    }
  ];  
}

// A function to get user input for requirements 
var getRequirements = function() {
  initialize();
  // Loop through the array of requirements
  for(var i = 0; i < passwordRequirements.length; i++) {
    // While the values are null, the loop will run
    while (!passwordRequirements[i].entry) {
      passwordRequirements[i].entry = prompt(passwordRequirements[i].request);
    }
    // Change the entry to lower case for all string entries
    passwordRequirements[i].entry = passwordRequirements[i].entry.toLowerCase();
  }

  // Slice the requirements array to remove the password length
  var sliceRequirements = passwordRequirements.slice(1);

  //Print the requirements arrays to the console to check values
  console.log(passwordRequirements);
  console.log(sliceRequirements);

  // Check that at least one option was chosen. 
  var isNo = function (value) {
    return value.entry === "no";
  }
  isValid = function() {
    var charValid;
    var lengthValid;
    var isValidValue;
    charValid = sliceRequirements.every(isNo);
    charValid = !charValid;  // If every selection is no, the entries are not valid
    // Check that the entered length is within the boundaries
    length = parseInt(passwordRequirements[0].entry);
    if (length < 8 || length > 128) {
      lengthValid = false;
    }
    else {
      lengthValid = true;;
    }
    // If both checks are true, the whole entry is valid, otherwise, it is not
    if (charValid === true && lengthValid === true) {
      isValidValue = true;
    }
    else {
      isValidValue = false;
    }
    return isValidValue;
  }
}

// The character sets are defined. The special character set is " !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"  -- the \ escape is used to define the string
var upperCaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerCaseSet = "abcdefghijklmnopqrstuvwxyz";
var numericSet = "0123456789";
var specialSet = " \!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

var charSet = [0,upperCaseSet,lowerCaseSet,numericSet,specialSet];




// A function to generate the password

function generatePassword() {
  // The user is asked for requirements
  getRequirements();

  // Entries are validated
  isValidValue = isValid();
  if (isValidValue === false) {
    window.alert("Please pick at least one option. Press the Generate Password button to try again.");
    initialize();
    return;
  }

  // Pick a value from each required character set and join the required character sets into one set to pull remaining values from
  var requiredChar = "";
  // var requiredCharIndex = "";
  var charList = "";
  for(var i = 1; i < passwordRequirements.length; i++) {
    var charSetLocal = charSet[i];
    // console.log(charSetLocal);
    if (passwordRequirements[i].entry === "no") {
      continue;
    }
    else {
      randomNumber = Math.floor(Math.random() * charSetLocal.length);
      requiredChar += charSetLocal.substring(randomNumber,randomNumber+1);
      // requiredCharIndex += i;
      charList += charSetLocal;
    }
    console.log(requiredChar);
    // console.log(requiredCharIndex);
    console.log(charList);
  }
  // Determine the remaining characters needed
  var remainingLength = passwordRequirements[0].entry - requiredChar.length;
  console.log(remainingLength);

  // Generate the password
  password = requiredChar;
  for(var i = 0; i < remainingLength; i++) {
    randomNumber = Math.floor(Math.random() * charList.length);
    password += charList.substring(randomNumber,randomNumber+1);
  }
  console.log(password);
  return password

}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
