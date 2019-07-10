/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:15:38
 */
import {SyncSqlUtil} from '../../uitls/SyncSqlUtil';

export class TableUploadBean {
    name: string;
    sqlFind: string;
    sqlUpdate: string;
    uniqueIdValues: Array<string>;

    getSqlFindBuild(): string {
        return SyncSqlUtil.buildSql(this.sqlFind, this.uniqueIdValues);
    }

    getSqlUpdateBuild(): string {
        return SyncSqlUtil.buildSql(this.sqlUpdate, this.uniqueIdValues);
    }
}
