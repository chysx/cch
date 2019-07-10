/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/3:11:53
 */
import {AbstractParser} from '../base/AbstractParser';
import {SyncDataResponseBean} from '../bean/SyncDataResponseBean';
import {SyncResponseStatus_SUCCESS} from '../sync/SyncResponseStatus';
import {promise} from 'selenium-webdriver';

export class UploadParser extends AbstractParser<SyncDataResponseBean> {
    constructor() {
        super();
    }

    async parse(syncDataBean: SyncDataResponseBean): Promise<boolean> {
        return await syncDataBean.Status === SyncResponseStatus_SUCCESS;
    }

}
