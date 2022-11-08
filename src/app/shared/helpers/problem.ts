import { Messages } from "./messages"

export class Field {
    name: string
    message: string

    static Required(fieldName: string): Field {
        return {
            name: fieldName,
            message: Messages.FIELD_REQUIRED
        }
    }
}

export enum ProblemType {
    integrityFail,
    notFound,
    badRequest
}

export class Problem {
    type?: ProblemType
    message: string
    fields?: Field[]

    static DuplicatedRecord(): Problem {
        return {
            type: ProblemType.integrityFail,
            message: Messages.DUPLICATED_RECORD
        }
    }

    static RecordInUse(): Problem {
        return {
            type: ProblemType.integrityFail,
            message: Messages.RECORD_IN_USE
        }
    }

    static InvalidFields(fields: Field[]): Problem {
        return {
            type: ProblemType.badRequest,
            message: Messages.INVALID_FIELDS,
            fields: [...fields]
        }
    }

    static NotFound(): Problem {
        return {
            type: ProblemType.notFound,
            message: Messages.RECORD_NOT_FOUND,
        }
    }
}