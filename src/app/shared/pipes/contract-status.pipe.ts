import { Pipe, PipeTransform } from '@angular/core';
import { ContractStatus } from 'src/app/contract/entities/contract';

@Pipe({
  name: 'contractStatus'
})
export class ContractStatusPipe implements PipeTransform {

  transform(status: ContractStatus): string {
    if (!status) {
      return ''
    }

    switch (status) {
      case ContractStatus.ABERTO: return 'Aberto'
      case ContractStatus.FEITO: return 'Feito'
      case ContractStatus.DESISTIU: return 'Desistiu'
      case ContractStatus.PARA_DEPOIS: return 'Para depois'
      case ContractStatus.PEGOU_FORA: return 'Pegou fora'
      default: return 'Desconhecido'
    }

  }

}
