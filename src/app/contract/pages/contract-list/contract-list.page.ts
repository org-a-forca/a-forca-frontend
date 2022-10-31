import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../../entities/contract';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.page.html',
})
export class ContractListPage {

  contracts: Contract[] = []
  contractsCopy: Contract[] = []

  constructor(
    private contractService: ContractService,
    private router: Router
  ) { }

  async ionViewDidEnter(): Promise<void> {
    this.contracts = await this.contractService.getAll()
    this.contractsCopy = [...this.contracts]
  }

  onAdd(): void {
    this.router.navigate(['contract', 'add'])
  }

  onSearch(text: string): void {
    this.contracts = this.contractsCopy.filter(
      contract => this.getTextFromContract(contract).toLowerCase().indexOf(text.toLowerCase()) > -1
    )
  }

  private getTextFromContract(contract: Contract): string {
    return contract.employee.name + ' ' + contract.date.toLocaleDateString() 
  }
}
