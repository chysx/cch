/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/3:17:28
 */
import {Url} from './HttpConfig';

export class Api {
    public static readonly baseUrl = Url.API();
    public static readonly  syncDataObservableByDownloadUrl = Api.baseUrl + '/iSyncService/download.aspx';
    // public static readonly  syncDataObservableByDownloadUrl = 'api/iSyncService/download.aspx';
    public static readonly  syncDataObservableByUploadUrl = Api.baseUrl + '/iSyncService/Upload.aspx';
    public static readonly  loginDataObservable = Api.baseUrl + '/iSyncService/login.aspx';
}
