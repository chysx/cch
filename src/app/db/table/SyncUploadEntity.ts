/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:10:39
 */
import {column, ColumnType, database, Table} from 'websql-orm';
import {DB_NAME} from './TableConfig';

@database(DB_NAME)
export class SyncUploadEntity extends Table {
    // tslint:disable-next-line:no-bitwise
    @column(ColumnType.STRING | ColumnType.PRIMARY)
    id: string;
    @column(ColumnType.STRING)
    uniqueIdValues: string;
    @column(ColumnType.STRING)
    name: string;
    @column(ColumnType.STRING)
    type: string;
    @column(ColumnType.STRING)
    status: string;
    @column(ColumnType.STRING)
    time: string;
}
