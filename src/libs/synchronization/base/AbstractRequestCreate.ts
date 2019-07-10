/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:17:06
 */
import {ICreateFlow} from './ICreateFlow';
import {AbstractSyncDownloadModel} from './AbstractSyncDownloadModel';
import {AbstractSyncUploadModel} from './AbstractSyncUploadModel';

export abstract class AbstractRequestCreate<T> implements ICreateFlow<T> {
    protected syncDownloadModel: AbstractSyncDownloadModel;
    protected syncUploadModel: AbstractSyncUploadModel;

    setSyncDownloadModel(syncDownloadModel: AbstractSyncDownloadModel) {
        this.syncDownloadModel = syncDownloadModel;
    }

    setSyncUploadModel(syncUploadModel: AbstractSyncUploadModel) {
        this.syncUploadModel = syncUploadModel;
    }

    abstract create(): Promise<T>;
}
