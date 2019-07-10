/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:17:11
 */
import {AbstractSyncMode} from './AbstractSyncMode';
import {SyncDataRequestBean} from '../bean/SyncDataRequestBean';
import {SyncDataResponseBean} from '../bean/SyncDataResponseBean';
import {ISyncDownload} from './ISyncDownload';
import {DownloadRequestCreate} from '../impl/DownloadRequestCreate';
import {from, merge, observable, Observable, ObservedValueOf} from 'rxjs';
import {DownloadParser} from '../impl/DownloadParser';
import {concat, flatMap, map} from 'rxjs/operators';

export abstract class AbstractSyncDownloadModel extends AbstractSyncMode<SyncDataRequestBean, SyncDataResponseBean>
    implements ISyncDownload {

    constructor(syncType: string) {
        super(syncType);
        this.parser = new DownloadParser();
        this.parser.setParsePolicy(this);
        this.requestCreate = new DownloadRequestCreate();
        this.requestCreate.setSyncDownloadModel(this);
    }

    abstract getTableDownloadList(): Array<string>;

    prepare(): Observable<SyncDataResponseBean> {
        return from(this.requestCreate.create())
            .pipe<SyncDataResponseBean>(
                flatMap(requestData => {
                    return this.httpService.getSyncDataObservableByDownload(requestData);
                }));
    }

    onSuccess() {
        super.onSuccess();
    }

    onFail() {
        super.onFail();

    }

    public getDownloadParameterValues(): Array<string>[] {
        return this.syncParameter.getDownloadParameterValues();
    }


    policy() {

    }

    isAllDataAndAllInsert(tableName): boolean {
        return false;
    }
}
