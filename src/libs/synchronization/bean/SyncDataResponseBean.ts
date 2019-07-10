/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:15:40
 */
import {SyncContentBean} from './SyncContentBean';

export class SyncDataResponseBean {
    LoginName: string;
    Status: number;
    ExceptionCode: string;
    Exception: string;
    SyncType: number;
    Result: SyncContentBean;
}
