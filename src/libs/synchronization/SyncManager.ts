/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/5:17:15
 */
import {Injectable} from '@angular/core';
import {HttpService} from '../net/HttpService';
import {LoadingController} from '@ionic/angular';
import {AbstractSyncMode} from './base/AbstractSyncMode';
import {SyncCallBack} from './sync/SyncCallBack';
import {SyncParameter} from './sync/SyncParameter';
import {AbstractSyncDownloadModel} from './base/AbstractSyncDownloadModel';
import {SyncConstant} from './sync/SyncConstant';
import {AbstractSyncUploadModel} from './base/AbstractSyncUploadModel';
import {SyncFactory} from './SyncFactory';

@Injectable({
    providedIn: 'root'
})
export class SyncManager {
    constructor(
        private httpService: HttpService,
        private loading: LoadingController) {
    }

    registerSyncModel(syncModeOrType: string | AbstractSyncMode<any, any>, syncParameter: SyncParameter, callBackBack: SyncCallBack) {
        let syncMode = null;
        if (typeof syncModeOrType === 'string') {
            syncMode = SyncFactory.createSyncFlow(syncModeOrType as string);
        }

        if (syncMode instanceof AbstractSyncDownloadModel) {
            syncParameter.putCommon(SyncConstant.USER_CODE, 'DRI-20190000')
                .putCommon(SyncConstant.PASSWORD, '111111');
        } else if (syncMode instanceof AbstractSyncUploadModel) {
            if (syncParameter == null) {
                syncMode.getParameter().putCommon(SyncConstant.USER_CODE, '')
                    .putCommon(SyncConstant.PASSWORD, '');
            } else {
                syncParameter.putCommon(SyncConstant.USER_CODE, '')
                    .putCommon(SyncConstant.PASSWORD, '');
            }
        }

        syncMode.setHttpService(this.httpService);
        syncMode.setSyncCallBack(callBackBack);
        syncMode.setParameter(syncParameter);
        this.start(syncMode);
    }

    async start(syncMode: AbstractSyncMode<any, any>) {
        const load = await this.loading.create({
            message: syncMode.getMessage().content
        });
        await load.present();
        await syncMode.start();
        load.dismiss();
    }


}
