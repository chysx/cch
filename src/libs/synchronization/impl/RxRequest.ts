/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:17:37
 */
import {SyncDataResponseBean} from '../bean/SyncDataResponseBean';
import {AbstractRequest} from '../base/AbstractRequest';
import {Observable} from 'rxjs';
import {SyncCallBack} from '../sync/SyncCallBack';
import {map} from 'rxjs/operators';
import {AppLogManager} from '../../../app/db/service/AppLogManager';
import {ExceptionType} from '../../exception/ExceptionType';
import {SyncStatus} from '../sync/SyncStatus';

export class RxRequest extends AbstractRequest<SyncDataResponseBean> {
    constructor() {
        super();
        this.isShow = true;
    }

    execute(observable: Observable<SyncDataResponseBean>, syncCallBack: SyncCallBack) {
        AppLogManager.insert(ExceptionType.INFO, this.syncMode.getSyncType());
        observable.pipe(
            map(async syncDataBean => {
                const isSuccess = await this.syncMode.getParser().parse(syncDataBean);
                if (!isSuccess) {
                    AppLogManager.insert(ExceptionType.WARN, JSON.stringify(syncDataBean));
                }
                return isSuccess;
            }),
        )
            .subscribe(async next => {
                const isSuccess = await next;
                console.log('onNext');
                if (isSuccess) {
                    AppLogManager.insert(ExceptionType.INFO, this.syncMode.getSyncType() + ':' + SyncStatus.SYNC_SUCCESS);
                    this.syncMode.onSuccess();
                    if (syncCallBack != null) {
                        syncCallBack.onSuccess();
                    }
                } else {
                    AppLogManager.insert(ExceptionType.INFO, this.syncMode.getSyncType() + ':' + SyncStatus.SYNC_FAIL);
                    this.syncMode.onFail();
                    if (syncCallBack != null) {
                        syncCallBack.onFail(new Error('False'));
                    }
                }

                this.syncMode.onFinish();
            }, error => {
                AppLogManager.insertError(ExceptionType.WARN, error);
                console.error(error);
                try {
                    AppLogManager.insert(ExceptionType.INFO, this.syncMode.getSyncType() + ':' + SyncStatus.SYNC_FAIL);
                    this.syncMode.onFail();
                } catch (ex) {
                    console.error(ex);
                    AppLogManager.insert(ExceptionType.WARN, ex);
                }

                try {
                    if (syncCallBack != null) {
                        syncCallBack.onFail(error);
                    }
                } catch (ex) {
                    console.error(ex);
                    AppLogManager.insert(ExceptionType.WARN, ex);
                }
                this.syncMode.onFinish();
            });

        // complete => {
        //     console.log('onCompleted');
        //     this.syncMode.onFinish();
        // }
    }

}
