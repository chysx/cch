/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/6/24:18:08
 */
import {SyncContentBean} from './SyncContentBean';

export class SyncDataRequestBean {
    LoginName: string;
    Password: string;
    DomainId: string;
    Version: string;
    IsGzip: string;
    ReqContent: SyncContentBean;
}
