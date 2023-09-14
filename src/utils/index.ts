export function UserCopying(data?: any){
    try {
        navigator.clipboard.writeText(data)
    } catch (error) {
        console.log(error)
    }
}