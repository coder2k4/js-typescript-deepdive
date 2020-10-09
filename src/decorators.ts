/*

function Log(constructor: Function){
    console.log(constructor)
}

function Log2(target:any, propName:string | Symbol){
    console.log(target, propName)
}

function Log3(target:any, propName:string | Symbol, descriptor: PropertyDescriptor){
    console.log(target, propName, descriptor)
}

*/

interface IComponentDecorator {
    selector: string,
    template: string
}

function Component(config: IComponentDecorator) {
    return function <T extends { new(...args: any[]): object }>
    (constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args)

                const $el = document.querySelector(config.selector)!
                $el.innerHTML = config.template


            }
        }
    }
}

@Component({
    selector: '#card',
    template: `
        <div class="card">
            <div class="card-content">
                <span class="card-title">Card Component</span>
            </div>
        </div>
    `
})
class CardComponent {

    name: string

    constructor(name: string) {
        this.name = name
    }


    logName(): void {
        console.log(`Component ${this.name}`)
    }

}

const card = new CardComponent('Card Component')

////////////////////////////////////////////////////////
/////////// Validator decorator
////////////////////////////////////////////////////////


type ValidatorType = 'required' | 'email'

interface ValidatorConfig {
    [prop: string]: {
        [validateProp: string]: ValidatorType
    }
}


const validators: ValidatorConfig = {}


function Required(target: any, propName: string) {

    // Form : { // target.constructor.name
    //     email: 'required' // propName
    // }
    validators[target.constructor.name] = {
        ...validators[target.constructor.name],
        [propName]: 'required'
    }
}

class Form {
    @Required
    public email: string | void

    constructor(email?: string) {
        this.email = email
    }
}

function validate(obj: any):boolean {
    const objConfig = validators[obj.constructor.name]

    if(!objConfig){
        return true
    }
    let isValid = true
    Object.keys(objConfig).forEach( key => {
        if(objConfig[key] === 'required'){
            isValid = isValid && !!obj[key] // Потсутствует ли поле в объекте
        }
    })
    return isValid
}


const form = new Form('Ebaba')
console.log(form)
console.log(validate(form))