/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:18:02
 */
import {SyncParameter} from '../sync/SyncParameter';
import {SyncDataRequestBean} from '../bean/SyncDataRequestBean';
import {SyncConstant} from '../sync/SyncConstant';

export class SyncUtil {
    static createSyncDataRequestBean(syncParameter: SyncParameter): SyncDataRequestBean {
        const syncDataRequestBean = new SyncDataRequestBean();
        syncDataRequestBean.LoginName = syncParameter.getCommon(SyncConstant.USER_CODE);
        syncDataRequestBean.Password = syncParameter.getCommon(SyncConstant.PASSWORD);
        syncDataRequestBean.DomainId = '1';
        syncDataRequestBean.Version = '0.1.0.6';
        syncDataRequestBean.IsGzip = '1';
        return syncDataRequestBean;
    }
}
