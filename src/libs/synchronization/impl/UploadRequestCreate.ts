/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/3:14:13
 */
import {AbstractRequestCreate} from '../base/AbstractRequestCreate';
import {SyncDataRequestBean} from '../bean/SyncDataRequestBean';
import {TableUploadBean} from '../bean/TableUploadBean';
import {sqlite} from 'websql-orm';
import {SyncTableBean} from '../bean/SyncTableBean';
import {SyncConfig} from '../sync/SyncConfig';
import {SyncParameter} from '../sync/SyncParameter';
import {SyncContentBean} from '../bean/SyncContentBean';
import {SyncUtil} from '../utils/SyncUtil';
import {DB_NAME} from '../../../app/db/table/TableConfig';

export class UploadRequestCreate extends AbstractRequestCreate<SyncDataRequestBean> {

    async create(): Promise<SyncDataRequestBean> {
        const uploadBeanList = this.syncUploadModel.getTableUploadList();
        const tableRowsMap = await this.getTableRowsMap(uploadBeanList);
        const syncTableBeanList = this.createSyncTableBeanList(tableRowsMap);
        this.sort(syncTableBeanList, uploadBeanList);
        return this.createSyncDataRequestBean(syncTableBeanList, this.syncUploadModel.getParameter());
    }

    /**
     * 获取要上传的表名和表数据集
     *
     * @param uploadBeanList 需要上传的sql语句封装的对象
     * @return HashMap<key,value> key:表名，value:查询到的数据集（例如："sno1|sname1","sno2|sname2"）
     */
    async getTableRowsMap(uploadBeanList: Array<TableUploadBean>): Promise<Map<string, Array<string>>> {
        const tableRowsMap = new Map<string, Array<string>>();
        for (const uploadBean of uploadBeanList) {
            const cursor = await sqlite.fromSqlByJs(DB_NAME, uploadBean.getSqlFindBuild(), null);
            const rows = new Array<string>();
            for (const item of cursor) {
                let row = '';
                Object.getOwnPropertyNames(item).forEach(key => {
                    if (!key.startsWith('_')) {
                        const content = item[key];
                        const value = content == null ? '' : content; // 后台不接受null，否则会上传失败
                        row = row.concat(value).concat(SyncConfig.ROW_SEPARATOR);
                    }
                });
                rows.push(row.substring(0, row.length - 1));
            }

            tableRowsMap.set(uploadBean.name, rows);
        }
        return tableRowsMap;
    }

    createSyncTableBeanList(tableRowsMap: Map<string, Array<string>>): Array<SyncTableBean> {
        const syncTableBeanList = new Array<SyncTableBean>();
        tableRowsMap.forEach(((value, key) => {
            const tableBean = new SyncTableBean();
            tableBean.Name = key;
            tableBean.Rows = value;
            syncTableBeanList.push(tableBean);
        }));
        return syncTableBeanList;
    }

    createSyncDataRequestBean(syncTableBeanList: Array<SyncTableBean>, syncParameter: SyncParameter): SyncDataRequestBean {
        const syncDataRequestBean = SyncUtil.createSyncDataRequestBean(syncParameter);

        const syncContentBean = new SyncContentBean();
        syncContentBean.Tables = syncTableBeanList;
        syncDataRequestBean.ReqContent = syncContentBean;

        console.log(JSON.stringify(syncDataRequestBean));

        return syncDataRequestBean;
    }

    sort(syncTableBeanList: Array<SyncTableBean>, uploadBeanList: Array<TableUploadBean>) {
        let index = 0;
        for (const uploadBean of uploadBeanList) {
            for (const tableBean of syncTableBeanList) {
                if (uploadBean.name === tableBean.Name) {
                    tableBean.weight = index;
                }
            }
            index++;
        }

        syncTableBeanList.sort((resource: SyncTableBean, other: SyncTableBean) => {
            if (resource.weight > other.weight) {
                return 1;
            } else if (resource.weight < other.weight) {
                return -1;
            } else {
                return 0;
            }
        });
    }
}
