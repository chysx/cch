/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/5:17:27
 */
import {AbstractSyncMode} from './base/AbstractSyncMode';
import {SyncType} from './sync/SyncType';
import {SyncInitModel} from './model/SyncInitModel';

export class SyncFactory {
    static createSyncFlow(syncType: string): AbstractSyncMode<any, any> {
        if (syncType === SyncType.SYNC_INIT) {
            return new SyncInitModel(syncType);
        }
        return null;
    }
}
