/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:18:49
 */
import {AbstractRequestCreate} from '../base/AbstractRequestCreate';
import {SyncDataRequestBean} from '../bean/SyncDataRequestBean';
import {SyncTableBean} from '../bean/SyncTableBean';
import {SyncUtil} from '../utils/SyncUtil';
import {SyncContentBean} from '../bean/SyncContentBean';
import {SyncDownloadLogic} from '../../../app/db/table/SyncDownloadLogic';
import {SyncParameter} from '../sync/SyncParameter';
import {sqlite} from 'websql-orm';

export class DownloadRequestCreate extends AbstractRequestCreate<SyncDataRequestBean> {
    create(): Promise<SyncDataRequestBean> {
        return this.createSyncDataRequestBean(this.syncDownloadModel.getTableDownloadList());
    }

    async createSyncDataRequestBean(tableList: Array<string>): Promise<SyncDataRequestBean> {
        const syncDataRequestBean = SyncUtil.createSyncDataRequestBean(this.syncDownloadModel.getParameter());

        const syncContentBean = new SyncContentBean();
        if (tableList == null) {// 表示全表请求
            syncContentBean.Tables = await this.createSyncTableBeanList();
        } else {// 表示指定表请求
            syncContentBean.Tables = await this.createSyncTableBeanListTwo(tableList, this.syncDownloadModel.getParameter());
        }
        syncDataRequestBean.ReqContent = syncContentBean;
        console.log(JSON.stringify(syncDataRequestBean));

        return syncDataRequestBean;
    }

    async getSyncDownloadLogicList(): Promise<Array<SyncDownloadLogic>> {
        const sql = 'select * from SyncDownloadLogic where isActive = ? and version = ?';
        return await sqlite.fromSql(new SyncDownloadLogic(), sql, ['1', '0.1.0.6']);
    }

    async createSyncTableBeanListTwo(tableList: Array<string>, syncParameter: SyncParameter): Promise<Array<SyncTableBean>> {

        const hashMap = new Map<string, Array<string>>();
        let index = -1;
        for (const tableName of tableList) {
            hashMap.set(tableName, syncParameter.getDownloadParameterValues()[++index]);
        }

        const entityList = await this.getSyncDownloadLogicList();
        const syncTableBeanList = new Array<SyncTableBean>();

        for (const entity of entityList) {
            if (tableList.includes(entity.tableName)) {
                const tableBean = new SyncTableBean();
                let paramValues = new Array<string>();
                let timeStamp;
                if (this.syncDownloadModel.isAllDataAndAllInsert(entity.tableName)) {
                    timeStamp = null;
                } else {
                    timeStamp = entity.timeStamp;
                }
                paramValues.push(timeStamp);
                paramValues = paramValues.concat(hashMap.get(entity.tableName));
                tableBean.ParamValues = paramValues;
                tableBean.Name = entity.tableName;

                syncTableBeanList.push(tableBean);
            }
        }
        return syncTableBeanList;
    }

    async createSyncTableBeanList(): Promise<Array<SyncTableBean>> {
        const entityList = await this.getSyncDownloadLogicList();
        const syncTableBeanList = new Array<SyncTableBean>();
        for (const entity of entityList) {
            const tableBean = new SyncTableBean();
            const paramValues = new Array<string>();
            let timeStamp;
            if (this.syncDownloadModel.isAllDataAndAllInsert(entity.tableName)) {
                timeStamp = null;
            } else {
                timeStamp = entity.timeStamp;
            }
            paramValues.push(timeStamp);
            tableBean.ParamValues = paramValues;
            tableBean.Name = entity.tableName;

            syncTableBeanList.push(tableBean);
        }
        return syncTableBeanList;
    }

}
