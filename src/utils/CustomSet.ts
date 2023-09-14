export class CustomSet{
    values: any[];

    constructor(initialValue?: any){
        if (initialValue instanceof CustomSet) {
            this.values = [...initialValue.values];
        }
        else{
            if(this.values == undefined){
                this.values = []
            }
            else {
              this.values.push(initialValue);
            }
        }
    }

    add(value: any, key?: string){
        // console.clear()
        if(value){
            const objKeys = Object.keys(value)
            const keys = key?.split('-')
            // console.log(objKeys)
            // console.log(keys)
            let auxKey: any = undefined;

            keys?.forEach(k => {
                auxKey = auxKey == undefined? value[k]:auxKey[k]
            })
            
            let flag = true;
            
            this.values.forEach(el => {
                let aux: any = undefined;
                keys?.forEach(k => {
                    aux = aux == undefined? el[k]:aux[k]
                })

                if(auxKey){
                    if(aux == auxKey){
                        flag = false
                    }
                }else{
                    flag = false
                }
            })


            if(flag){
                this.values.push(value)
            }
        }
    }
}