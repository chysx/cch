/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:16:31
 */

export class SyncType {
    public static readonly SYNC_INIT = 'SYNC_INIT';
    public static readonly SYNC_UPDATE = 'SYNC_UPDATE';
    public static readonly SYNC_UPLOAD_START_OF_DAY = 'SYNC_UPLOAD_START_OF_DAY';
    public static readonly SYNC_UPLOAD_CHECKOUT = 'SYNC_UPLOAD_CHECKOUT';
    public static readonly SYNC_UPLOAD_VISIT = 'SYNC_UPLOAD_VISIT';
    public static readonly SYNC_UPLOAD_CHECKIN = 'SYNC_UPLOAD_CHECKIN';
    public static readonly SYNC_UPLOAD_PHOTO = 'SYNC_UPLOAD_PHOTO';
    public static readonly SYNC_UPLOAD_LOG = 'SYNC_UPLOAD_LOG';
    public static readonly SYNC_UPLOAD_CUSTOMER = 'SYNC_UPLOAD_CUSTOMER';
    public static readonly SYNC_DOWNLOAD_CUSTOMER = 'SYNC_DOWNLOAD_CUSTOMER';
    public static readonly SYNC_DOWNLOAD_ROUTE = 'SYNC_DOWNLOAD_ROUTE';
}
