import {Component} from '@angular/core';
import {SyncManager} from '../../libs/synchronization/SyncManager';
import {SyncType} from '../../libs/synchronization/sync/SyncType';
import {SyncCallBack} from '../../libs/synchronization/sync/SyncCallBack';
import {SyncParameter} from '../../libs/synchronization/sync/SyncParameter';
import {SyncDownloadLogic} from '../db/table/SyncDownloadLogic';
import {UuidUtil} from '../../libs/uitls/UuidUtil';
import {sqlite} from 'websql-orm';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [SyncManager]
})
export class HomePage {

    constructor(private syncManager: SyncManager) {
    }

    public testInit() {
        const syncParameter = new SyncParameter();
        this.syncManager.registerSyncModel(SyncType.SYNC_INIT, syncParameter,
            new class implements SyncCallBack {
                onFail(error: Error) {
                    console.log('**************** onFail');
                }

                onSuccess() {
                    console.log('**************** onSuccess');
                }
            }());
    }

}
