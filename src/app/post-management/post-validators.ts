import { FormControl } from "@angular/forms";

export class PostValidators {
    static listOfOffensiveWords: string[] = [
        'shit',
        'fuck',
        'damn',
        'bitch',
        'crap',
        'piss',
        'dick',
        'darn',
        'cock',
        'pussy',
        'asshole',
        'fag',
        'bastard',
        'slut',
        'douche',
        'bloody',
        'cunt',
        'bugger',
        'bollocks',
        'arsehole'
        
    ];
    static offensiveLanguage(fc: FormControl): { [x: string]: boolean } {
        
        let response = null; //if there is no error null must be returned, returning { "offensiveLanguage": false } IS NOT WORKING

        let inputValue : string = fc.value;

        if (inputValue) {
            let inputValueLowerCase = inputValue.toLowerCase();

            let words = inputValueLowerCase.split(" ");

            words.forEach((word:string)=>{

                let foundInputInOffensiveWords = PostValidators.listOfOffensiveWords.find((w: string, ) => {
                    let wasFound: boolean = false;
    
                    if (word == w) {
                        wasFound = true;
                    }
    
                    return wasFound;
                });
    
                if (foundInputInOffensiveWords) {
                    response = { "offensiveLanguage": true };
                }

            });

            

        }
        //console.log(`response : ${JSON.stringify(response) }`);
        return response;
    }
}
