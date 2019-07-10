/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:18:23
 */
import {AbstractRequest} from '../base/AbstractRequest';
import {SyncDataResponseBean} from '../bean/SyncDataResponseBean';
import {Observable} from 'rxjs';
import {SyncCallBack} from '../sync/SyncCallBack';

export class AllRequest extends AbstractRequest<SyncDataResponseBean> {
    constructor() {
        super();
        this.isShow = true;
    }
    execute(observable: Observable<SyncDataResponseBean>, syncCallBack: SyncCallBack) {
    }

}
