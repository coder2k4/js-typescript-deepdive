// /// <reference path="nameforimport.ts"/>

namespace Form {
    export type FormType = 'inline' | 'block'
    export type FormState = 'active' | 'disabled'

    export interface FormInfo {
        type: FormType
        state: FormState
    }
}

type FormType = 'inline' | 'block'
type FormState = 'active' | 'disabled'

interface FormInfo {
    type: FormType
    state: FormState
}

class MyForm {
    private type: FormType = 'inline'
    private state: FormState = 'active'

    constructor(public email: string) {

    }

    getInfo(): FormInfo {
        return {
            type: this.type,
            state: this.state
        }
    }

}
