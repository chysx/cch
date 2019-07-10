import {column, ColumnType, database, Table} from 'websql-orm';
import {DB_NAME} from './TableConfig';

/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/9:11:52
 */

@database(DB_NAME)
// tslint:disable-next-line:class-name
export class MD_Person extends Table {
    // tslint:disable-next-line:no-bitwise
    @column(ColumnType.STRING | ColumnType.PRIMARY)
    UserCode: string;
    @column(ColumnType.STRING)
    Password: string;
    @column(ColumnType.STRING)
    FirstName: string;
    @column(ColumnType.STRING)
    LastName: string;
    @column(ColumnType.STRING)
    Type: string;
    @column(ColumnType.STRING)
    RouteNumber: string;
}
