import { Injectable } from '@angular/core';
import { withRouterConfig } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Messages } from '../helpers/messages';

export enum MessageType {
  ERROR,
  SUCCESS
}

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  async showConfirmDialog(text: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      message: text,
      backdropDismiss: false,
      buttons: [
        { text: 'Não', role: 'cancel' },
        { text: 'Sim', role: 'confirm' },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    return (role === 'confirm')
  }

  async showConfirmDeleteDialog(): Promise<boolean> {
    return this.showConfirmDialog(Messages.CONFIRM_DELETE_RECORD)
  }

  async showToast(text: string, type: MessageType = MessageType.SUCCESS): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: text,
      icon: type == MessageType.SUCCESS ? 'checkmark' : 'alert-outline',
      duration: 2500,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        }
      ],
      cssClass: type == MessageType.SUCCESS ? 'toast-success' : 'toast-error',
    });

    await toast.present();
  }

  async showToastError(text: string): Promise<void> {
    return this.showToast(text, MessageType.ERROR)
  }

  async showToastSuccess(text: string): Promise<void> {
    return this.showToast(text, MessageType.SUCCESS)
  }
}

