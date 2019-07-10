/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/3:15:14
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SyncDataResponseBean} from '../synchronization/bean/SyncDataResponseBean';
import {SyncDataRequestBean} from '../synchronization/bean/SyncDataRequestBean';
import {Api} from './Api';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private static readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'POST, GET, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        })
    };
    constructor(private http: HttpClient) {
    }
    getSyncDataObservableByDownload(syncDataRequestBean: SyncDataRequestBean): Observable<SyncDataResponseBean> {
        console.log(`url = ${Api.syncDataObservableByDownloadUrl}`);
        return this.http.post<SyncDataResponseBean>(Api.syncDataObservableByDownloadUrl, syncDataRequestBean, HttpService.httpOptions);
    }

    getSyncDataObservableByUpload(syncDataRequestBean: SyncDataRequestBean): Observable<SyncDataResponseBean> {
        return this.http.post<SyncDataResponseBean>(Api.syncDataObservableByUploadUrl, syncDataRequestBean, HttpService.httpOptions);
    }
}
