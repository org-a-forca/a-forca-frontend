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

  constructor(
    private contractService: ContractService,
    private router: Router
  ) { }

  async ionViewDidEnter(): Promise<void> {
    this.contracts = await this.contractService.getAll()
  }

  onAdd(): void {
    this.router.navigate(['contract', 'add'])
  }
}
