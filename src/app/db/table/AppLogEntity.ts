import {column, ColumnType, database, Table} from 'websql-orm';
import {DB_NAME} from './TableConfig';

/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:15:10
 */

@database(DB_NAME)
export class AppLogEntity extends Table {
    // tslint:disable-next-line:no-bitwise
    @column(ColumnType.STRING | ColumnType.PRIMARY)
    id: string;
    @column(ColumnType.STRING)
    versionName: string;
    @column(ColumnType.STRING)
    device: string;
    @column(ColumnType.STRING)
    type: string;
    @column(ColumnType.STRING)
    content: string;
    @column(ColumnType.STRING)
    stackTrace: string;
    @column(ColumnType.STRING)
    time: string;
    @column(ColumnType.STRING)
    note: string;
    @column(ColumnType.STRING)
    dirty: string;
}
