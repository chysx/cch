/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:16:41
 */

export interface ISyncDownload {
    getTableDownloadList(): Array<string>;

    getDownloadParameterValues(): Array<string>[];
}
