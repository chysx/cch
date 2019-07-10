/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/9:10:29
 */
import {AbstractSyncDownloadModel} from '../base/AbstractSyncDownloadModel';
import {Observable} from 'rxjs';
import {SyncDataResponseBean} from '../bean/SyncDataResponseBean';
import {TableKeyBean} from '../bean/TableKeyBean';
import {sqlite} from 'websql-orm';
import {SyncDownloadLogic} from '../../../app/db/table/SyncDownloadLogic';
import {MD_Person} from '../../../app/db/table/MD_Person';
import {UuidUtil} from '../../uitls/UuidUtil';
import {AppLogEntity} from '../../../app/db/table/AppLogEntity';

export class SyncInitModel extends AbstractSyncDownloadModel {
    constructor(syncType: string) {
        super(syncType);
    }

    public prepare(): Observable<SyncDataResponseBean> {
        this.logic();
        return super.prepare();
    }

    private async logic() {
        await this.clearDB();
        await this.initDownloadLogic();
    }

    private getTableNameNotClear(): Array<string> {
        const tableList = new Array<string>();
        return tableList;
    }

    private getAllTable(): Array<string> {
        const tableList = [];
        tableList.push('SyncDownloadLogic');
        tableList.push('MD_Person');
        return tableList;
    }

    private async clearDB() {
        await sqlite.init(new MD_Person());
        await sqlite.init(new AppLogEntity());
        await sqlite.init(new SyncDownloadLogic());
        const tableNameNotClear = this.getTableNameNotClear();
        for (const tableName of this.getAllTable()) {
            if (!tableNameNotClear.includes(tableName)) {
                await sqlite.execSql(new SyncDownloadLogic(), `delete from ${tableName}`, []);
            }
        }
    }

    private async initDownloadLogic() {
        let index = 0;
        for (const tableKeyBean of this.getTableKeyList()) {
            const syncDownloadLogic = new SyncDownloadLogic();
            syncDownloadLogic.id = UuidUtil.getGuid();
            syncDownloadLogic.tableName = tableKeyBean.name;
            syncDownloadLogic.tableOrder = ++index + '';
            syncDownloadLogic.timeStamp = null;
            syncDownloadLogic.version = '0.1.0.6';
            syncDownloadLogic.isActive = '1';
            syncDownloadLogic.transferred = '1';
            syncDownloadLogic.keys = tableKeyBean.getKeysStr();
            await sqlite.insert(syncDownloadLogic);
        }
    }


    private getTableKeyList(): Array<TableKeyBean> {
        const tableKeyBeanList = new Array<TableKeyBean>();

        tableKeyBeanList.push(new TableKeyBean('MD_Person', ['UserCode']));

        return tableKeyBeanList;
    }

    public isAllDataAndAllInsert(tableName: string): boolean {
        return true;
    }

    public getTableDownloadList(): Array<string> {
        return null;
    }
}
