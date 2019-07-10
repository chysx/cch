/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:17:38
 */
import {IRequest} from './IRequest';
import {Observable} from 'rxjs';
import {SyncCallBack} from '../sync/SyncCallBack';
import {AbstractSyncMode} from './AbstractSyncMode';
import {AppLogManager} from '../../../app/db/service/AppLogManager';
import {ExceptionType} from '../../exception/ExceptionType';
import {LoadingController} from '@ionic/angular';

export abstract class AbstractRequest<T> implements IRequest<T> {
    protected syncMode: AbstractSyncMode<any, T>;
    protected isShow: boolean;
    protected loadingController: LoadingController;

    abstract execute(observable: Observable<T>, syncCallBack: SyncCallBack);

    setSyncMode(syncMode: AbstractSyncMode<any, T>) {
        this.syncMode = syncMode;
    }

}
