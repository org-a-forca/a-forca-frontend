// Common
export const enum CommonMsg {
    RECORD_NOT_FOUND = 'Registro não encontrado!',
    OPERATION_NOT_PERFORMED = 'Não foi possível realizar esta operação!',
    CONFIRM_DELETE_RECORD = 'Deseja realmente excluir este registro?'
}


// Validation
export const enum ValidationMsg {
    FIELD_REQUIRED = 'Este campo não pode ser vazio.',
    INVALID_FIELDS = 'Um ou mais campos são inválidos!'    
}

// Services
export const enum ServiceMsg {
    DELETED = 'Serviço removido com sucesso!',
    SAVED = 'Serviço salvo com sucesso!'
}

// Employer
export const enum EmployerMsg {
    DELETED = 'Pessoa contratante removida com sucesso!',
    SAVED = 'Pessoa contratante salva com sucesso!'
}

// Employee
export const enum EmployeeMsg {
    DELETED = 'Pessoa que trabalha removida com sucesso!',
    SAVED = 'Pessoa que trabalha salva com sucesso!',
    JOB_ALREADY_ADDED_ERROR = 'Serviço já adicionado!'
}

// Employee
export const enum ContractMsg {
    DELETED = 'Contrato removido com sucesso!',
    SAVED = 'Contrato salvo com sucesso!',
}