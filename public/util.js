export function hasSpecialCharacters(value) {

    console.log(value)

    if (value.match(/\D/)){
        return true
    }else{
        return false
    }

}