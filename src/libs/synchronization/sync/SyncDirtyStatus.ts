/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:15:54
 */

export class SyncDirtyStatus {
    public static readonly NAME = 'dirty';
    public static readonly DEFAULT = '-1';
    public static readonly FAIL = '0';
    public static readonly SUCCESS = '1';
    /**
     * 从服务端下载的数据的状态
     */
    public static readonly EXIST = '2';
}
