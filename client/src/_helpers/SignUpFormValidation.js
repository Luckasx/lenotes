// reference https://stackoverflow.com/questions/2370015/regular-expression-for-password-validation
// https://www.javascripttutorial.net/javascript-regex/lookahead/

exports.validatePassword = (password) => {    
    return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,120})/.test(password)    

    // (           # Start of group
    //     (?=.*\d)      #   must contains one digit from 0-9
    //     (?=.*[a-z])       #   must contains one lowercase characters
    //     (?=.*[\W])        #   must contains at least one special character
    //     .     #     match anything with previous condition checking
    //      {8,20}  #        length at least 8 characters and maximum of 20 
    //   )    

};