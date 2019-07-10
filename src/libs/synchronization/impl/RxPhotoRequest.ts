/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:18:06
 */
import {AbstractRequest} from '../base/AbstractRequest';
import {Observable} from 'rxjs';
import {SyncCallBack} from '../sync/SyncCallBack';

export class RxPhotoRequest extends AbstractRequest<void> {
    constructor() {
        super();
        this.isShow = false;
    }
    execute(observable: Observable<void>, syncCallBack: SyncCallBack) {
    }
}
