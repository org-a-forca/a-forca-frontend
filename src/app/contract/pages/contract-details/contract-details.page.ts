import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMsg, ContractMsg } from 'src/app/shared/helpers/messages';
import { MessageType, UiService } from 'src/app/shared/services/ui.service';
import { Contract, ContractStatus } from '../../entities/contract';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.page.html',
})
export class ContractDetailsPage implements OnInit {

  contract: Contract

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private uiService: UiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.contract = await this.contractService.getById(
      Number.parseInt(this.route.snapshot.paramMap.get('id'))
    )
    if (!this.contract) {
      await this.uiService.showToast(CommonMsg.RECORD_NOT_FOUND, MessageType.ERROR)
      this.router.navigate(['contract'])
    }
  }

  onEdit(): void {
    this.router.navigate(['contract', 'edit', this.contract.id])
  }

  async onDelete(): Promise<void> {
    const result = await this.uiService.showConfirmDialog(CommonMsg.CONFIRM_DELETE_RECORD)
    
    if (result) {
      const problem = await this.contractService.delete(this.contract.id)
      
      if (problem) {
        await this.uiService.showToast(problem.message, MessageType.ERROR)
      } else {
        await this.uiService.showToast(ContractMsg.DELETED)
      }      

      this.router.navigate(['contract'])
    }
  }
}
