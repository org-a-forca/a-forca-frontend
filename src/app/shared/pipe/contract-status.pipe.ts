import { Pipe, PipeTransform } from '@angular/core';
import { ContractStatus } from 'src/app/contract/entities/contract';

@Pipe({
  name: 'contractStatus'
})
export class ContractStatusPipe implements PipeTransform {

  transform(status: ContractStatus): string {
    return status && status == ContractStatus.FINISHED ? 'Finalizado' : 'Em aberto';
  }

}
