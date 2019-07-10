/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/6/24:17:56
 */

import {Observable} from 'rxjs';
import {SyncCallBack} from '../sync/SyncCallBack';

export interface IRequest<T> {
    execute(observable: Observable<T> , syncCallBack: SyncCallBack);
}

