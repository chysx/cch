/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:16:48
 */
import {ISyncFlow} from './ISyncFlow';
import {IParsePolicy} from './IParsePolicy';
import {SyncParameter} from '../sync/SyncParameter';
import {SyncMessage} from '../sync/SyncMessage';
import {SyncType} from '../sync/SyncType';
import {SyncStatus} from '../sync/SyncStatus';
import {SyncCallBack} from '../sync/SyncCallBack';
import {AbstractParser} from './AbstractParser';
import {AbstractRequestCreate} from './AbstractRequestCreate';
import {Observable} from 'rxjs';
import {RxRequest} from '../impl/RxRequest';
import {AbstractRequest} from './AbstractRequest';
import {RxPhotoRequest} from '../impl/RxPhotoRequest';
import {HttpService} from '../../net/HttpService';

export abstract class AbstractSyncMode<RQ, RP> implements ISyncFlow<RP>, IParsePolicy {
    protected parser: AbstractParser<RP>;
    protected requestCreate: AbstractRequestCreate<RQ>;
    protected request: AbstractRequest<any> = new RxRequest();
    protected callBack: SyncCallBack;
    protected syncStatus = SyncStatus.SYNC_INIT;
    protected syncType: string;
    protected syncParameter: SyncParameter = new SyncParameter();
    protected syncMessage: SyncMessage = new SyncMessage();
    protected httpService: HttpService;

    // constructor() {
    //
    // }

    constructor(syncType: string) {
        this.syncType = syncType;
        if (syncType === SyncType.SYNC_UPLOAD_PHOTO) {
            this.request = new RxPhotoRequest();
        }
        this.request.setSyncMode(this);
    }

    setParameter(syncParameter: SyncParameter) {
        if (syncParameter != null) {
            this.syncParameter = syncParameter;
        }
    }

    getParameter(): SyncParameter {
        return this.syncParameter;
    }

    setMessage(syncMessage: SyncMessage) {
        if (syncMessage != null) {
            this.syncMessage = syncMessage;
        }
    }

    getMessage(): SyncMessage {
        return this.syncMessage;
    }

    setParser(parser: AbstractParser<RP>) {
        this.parser = parser;
        this.parser.setParsePolicy(this);
    }

    getParser(): AbstractParser<RP> {
        return this.parser;
    }

    setHttpService(httpService: HttpService) {
        this.httpService = httpService;
    }

    setSyncCallBack(callBack: SyncCallBack) {
        this.callBack = callBack;
    }

    getSyncStatus(): SyncStatus {
        return this.syncStatus;
    }

    getSyncType(): string {
        return this.syncType;
    }

    getRequest(): AbstractRequest<RP> {
        return this.request;
    }

    start() {
        const observable = this.prepare();
        this.request.execute(observable, this.callBack);
    }

    onInit() {
        this.syncStatus = SyncStatus.SYNC_INIT;
    }

    onLoad() {
        this.syncStatus = SyncStatus.SYNC_LOAD;
    }

    onSuccess() {
        this.syncStatus = SyncStatus.SYNC_SUCCESS;
    }

    onFail() {
        this.syncStatus = SyncStatus.SYNC_FAIL;
    }

    onFinish() {
        this.callBack = null;
        this.request = null;
    }

    abstract isAllDataAndAllInsert(tableName: string): boolean;

    abstract policy();

    abstract prepare(): Observable<RP>;
}
