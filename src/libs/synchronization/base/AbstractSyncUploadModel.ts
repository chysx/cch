/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:18:12
 */
import {AbstractSyncMode} from './AbstractSyncMode';
import {SyncDataRequestBean} from '../bean/SyncDataRequestBean';
import {SyncDataResponseBean} from '../bean/SyncDataResponseBean';
import {ISyncUpload} from './ISyncUpload';
import {UploadParser} from '../impl/UploadParser';
import {UploadRequestCreate} from '../impl/UploadRequestCreate';
import {from, Observable} from 'rxjs';
import {SyncStatus} from '../sync/SyncStatus';
import {TableUploadBean} from '../bean/TableUploadBean';
import {sqlite} from 'websql-orm';
import {SyncUploadEntity} from '../../../app/db/table/SyncUploadEntity';
import {SyncSqlUtil} from '../../uitls/SyncSqlUtil';
import {TimeUtil} from '../../uitls/TimeUtil';
import {SyncUploadEntityManager} from '../../../app/db/service/SyncUploadEntityManager';
import {SyncDirtyStatus} from '../sync/SyncDirtyStatus';
import {merge} from 'rxjs/operators';

export abstract class AbstractSyncUploadModel extends AbstractSyncMode<SyncDataRequestBean, SyncDataResponseBean>
    implements ISyncUpload {

    constructor(syncType: string) {
        super(syncType);
        this.parser = new UploadParser();
        this.parser.setParsePolicy(this);
        this.requestCreate = new UploadRequestCreate();
        this.requestCreate.setSyncUploadModel(this);
    }

    abstract getTableUploadList(): Array<TableUploadBean>;

    prepare(): Observable<SyncDataResponseBean> {
        return from(this.requestCreate.create())
            .pipe<SyncDataResponseBean>(
                merge(requestData => {
                    return this.httpService.getSyncDataObservableByUpload(requestData);
                }));
    }

    onSuccess() {
        super.onSuccess();

        this.updateDirty(SyncDirtyStatus.SUCCESS);
        this.updateStatus(SyncStatus.SYNC_SUCCESS);
    }

    onFail() {
        super.onFail();

        this.updateDirty(SyncDirtyStatus.FAIL);
        this.updateStatus(SyncStatus.SYNC_FAIL);
    }

    onLoad() {
        super.onLoad();

        this.updateStatus(SyncStatus.SYNC_LOAD);
    }

    getUploadUniqueIdValues(): string[] {
        return this.syncParameter.getUploadUniqueIdValues();
    }

    policy() {

    }

    isAllDataAndAllInsert(tableName: string): boolean {
        return false;
    }


    updateDirty(syncDirtyStatus: string) {
        this.updateUploadDirty(this.getTableUploadList(), syncDirtyStatus);
    }

    updateUploadDirty(uploadBeanList: Array<TableUploadBean>, dirty: string) {
        for (const uploadBean of uploadBeanList) {
            sqlite.execSql(new SyncUploadEntity(), uploadBean.getSqlUpdateBuild(), [dirty]);
        }
    }

    updateStatus(syncStatus: string) {
        const syncUploadEntity = new SyncUploadEntity();
        if (this.syncParameter.getUploadUniqueIdValues() == null || this.syncParameter.getUploadUniqueIdValues().length === 0) {
            syncUploadEntity.uniqueIdValues = null;
        } else {
            syncUploadEntity.uniqueIdValues = SyncSqlUtil.getStringByUniqueIdValues(this.syncParameter.getUploadUniqueIdValues());
        }
        syncUploadEntity.name = this.syncParameter.getUploadName();
        syncUploadEntity.status = syncStatus;
        syncUploadEntity.type = this.syncType;
        syncUploadEntity.time = TimeUtil.getNowTimeString(TimeUtil.SECOND);
        SyncUploadEntityManager.deleteAndInsert(syncUploadEntity);
    }

}
