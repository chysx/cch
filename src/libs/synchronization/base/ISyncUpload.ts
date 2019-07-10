/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/6/24:18:03
 */
import {TableUploadBean} from '../bean/TableUploadBean';

export interface ISyncUpload {
    getTableUploadList(): Array<TableUploadBean>;

    getUploadUniqueIdValues(): string[];
}
