/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:11:29
 */
import {column, ColumnType, database, Table} from 'websql-orm';
import {DB_NAME} from './TableConfig';

@database(DB_NAME)
export class SyncDownloadLogic extends Table {
    // tslint:disable-next-line:no-bitwise
    @column(ColumnType.STRING | ColumnType.PRIMARY)
    id: string;
    @column(ColumnType.STRING)
    tableName: string;
    @column(ColumnType.STRING)
    tableOrder: string;
    @column(ColumnType.STRING)
    timeStamp: string;
    @column(ColumnType.STRING)
    version: string;
    @column(ColumnType.STRING)
    isActive: string;
    @column(ColumnType.STRING)
    transferred: string;
    @column(ColumnType.STRING)
    keys: string;
}
